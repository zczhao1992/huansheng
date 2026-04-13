import "dotenv/config";

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PutObjectCommand,
  S3Client,
  type PutObjectCommandInput,
} from "@aws-sdk/client-s3";

import {
  PrismaClient,
  type VoiceCategory,
} from "../src/generated/prisma/client";

import { CANONICAL_SYSTEM_VOICE_NAMES } from "../src/features/voices/data/voice-scoping";

const SYSTEM_VOICES_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "system-voices"
);

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  R2_ACCOUNT_ID: z.string().min(1),
  R2_ACCESS_KEY_ID: z.string().min(1),
  R2_SECRET_ACCESS_KEY: z.string().min(1),
  R2_BUCKET_NAME: z.string().min(1),
});

const env = envSchema.parse(process.env);

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

interface VoiceMetadata {
  description: string;
  category: VoiceCategory;
  language: string;
}

const systemVoiceMetadata: Record<string, VoiceMetadata> = {
  Aaron: {
    description: "Soothing and calm, like a self-help audiobook narrator",
    category: "AUDIOBOOK",
    language: "en-US",
  },
  Abigail: {
    description: "Friendly and conversational with a warm, approachable tone",
    category: "CONVERSATIONAL",
    language: "en-GB",
  },
  Anaya: {
    description: "Polite and professional, suited for customer service",
    category: "CUSTOMER_SERVICE",
    language: "en-IN",
  },
  Andy: {
    description: "Versatile and clear, a reliable all-purpose narrator",
    category: "GENERAL",
    language: "en-US",
  },
  Archer: {
    description: "Laid-back and reflective with a steady, storytelling pace",
    category: "NARRATIVE",
    language: "en-US",
  },
  Brian: {
    description: "Professional and helpful with a clear customer support tone",
    category: "CUSTOMER_SERVICE",
    language: "en-US",
  },
  Chloe: {
    description: "Bright and bubbly with a cheerful, outgoing personality",
    category: "CORPORATE",
    language: "en-AU",
  },
  Dylan: {
    description:
      "Thoughtful and intimate, like a quiet late-night conversation",
    category: "GENERAL",
    language: "en-US",
  },
  Emmanuel: {
    description: "Nasally and distinctive with a quirky, cartoon-like quality",
    category: "CHARACTERS",
    language: "en-US",
  },
  Ethan: {
    description: "Polished and warm with crisp, studio-quality delivery",
    category: "VOICEOVER",
    language: "en-US",
  },
  Evelyn: {
    description: "Warm Southern charm with a heartfelt, down-to-earth feel",
    category: "CONVERSATIONAL",
    language: "en-US",
  },
  Gavin: {
    description: "Calm and reassuring with a smooth, natural flow",
    category: "MEDITATION",
    language: "en-US",
  },
  Gordon: {
    description: "Warm and encouraging with an uplifting, motivational tone",
    category: "MOTIVATIONAL",
    language: "en-US",
  },
  Ivan: {
    description: "Deep and cinematic with a dramatic, movie-character presence",
    category: "CHARACTERS",
    language: "ru-RU",
  },
  Laura: {
    description: "Authentic and warm with a conversational Midwestern tone",
    category: "CONVERSATIONAL",
    language: "en-US",
  },
  Lucy: {
    description: "Direct and composed with a professional phone manner",
    category: "CUSTOMER_SERVICE",
    language: "en-US",
  },
  Madison: {
    description: "Energetic and unfiltered with a casual, chatty vibe",
    category: "PODCAST",
    language: "en-US",
  },
  Marisol: {
    description: "Confident and polished with a persuasive, ad-ready delivery",
    category: "ADVERTISING",
    language: "en-US",
  },
  Meera: {
    description: "Friendly and helpful with a clear, service-oriented tone",
    category: "CUSTOMER_SERVICE",
    language: "en-IN",
  },
  Walter: {
    description: "Old and raspy with deep gravitas, like a wise grandfather",
    category: "NARRATIVE",
    language: "en-US",
  },
  Chen: {
    description:
      "活泼俏皮且极具感染力，带着邻家女孩般的亲切，语速轻快，充满好奇心",
    category: "CUSTOMER_SERVICE",
    language: "zh-CN",
  },
  Li: {
    description: "端庄大气，音色圆润饱满，透着一种处变不惊的专业感与智性美",
    category: "NARRATIVE",
    language: "zh-CN",
  },
  Liu: {
    description:
      "温柔如水，语速舒缓，像是在耳边的低语，能瞬间抚平焦虑的治愈系音色",
    category: "CONVERSATIONAL",
    language: "zh-CN",
  },
  Wu: {
    description: "富有磁性且爆发力极强，节奏感鲜明，自带一种不羁的少年气和冲劲",
    category: "ADVERTISING",
    language: "zh-CN",
  },
  Zhang: {
    description:
      "深沉浑厚，字正腔圆，自带一种令人信服的权威感，声音极具质感和空间感",
    category: "MOTIVATIONAL",
    language: "zh-CN",
  },
  Zhong: {
    description:
      "略带沙哑的烟草嗓，语速沉稳，像是在炉火旁讲述往事的智者，充满了故事感",
    category: "CHARACTERS",
    language: "zh-CN",
  },
};

async function readSystemVoiceAudio(name: string) {
  const filePath = path.join(SYSTEM_VOICES_DIR, `${name}.wav`);
  const buffer = Buffer.from(await fs.readFile(filePath));
  return { buffer, contentType: "audio/wav" };
}

async function uploadSystemVoiceAudio({
  key,
  buffer,
  contentType,
}: {
  key: string;
  buffer: Buffer;
  contentType: string;
}) {
  const commandInput: PutObjectCommandInput = {
    Bucket: env.R2_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  };

  await r2.send(new PutObjectCommand(commandInput));
}

async function seedSystemVoice(name: string) {
  const { buffer, contentType } = await readSystemVoiceAudio(name);

  const existingSystemVoice = await prisma.voice.findFirst({
    where: {
      variant: "SYSTEM",
      name,
    },
    select: { id: true },
  });

  if (existingSystemVoice) {
    const r2ObjectKey = `voices/system/${existingSystemVoice.id}`;
    const meta = systemVoiceMetadata[name];

    await uploadSystemVoiceAudio({
      key: r2ObjectKey,
      buffer,
      contentType,
    });

    await prisma.voice.update({
      where: { id: existingSystemVoice.id },
      data: {
        r2ObjectKey,
        ...(meta && {
          description: meta.description,
          category: meta.category,
          language: meta.language,
        }),
      },
    });
    return;
  }

  const meta = systemVoiceMetadata[name];

  const voice = await prisma.voice.create({
    data: {
      name,
      variant: "SYSTEM",
      orgId: null,
      ...(meta && {
        description: meta.description,
        category: meta.category,
        language: meta.language,
      }),
    },
    select: {
      id: true,
    },
  });

  const r2ObjectKey = `voices/system/${voice.id}`;

  try {
    await uploadSystemVoiceAudio({
      key: r2ObjectKey,
      buffer,
      contentType,
    });

    await prisma.voice.update({
      where: {
        id: voice.id,
      },
      data: {
        r2ObjectKey,
      },
    });
  } catch (error) {
    await prisma.voice
      .delete({
        where: {
          id: voice.id,
        },
      })
      .catch(() => {});

    throw error;
  }
}

async function main() {
  console.log(
    `Seeding ${CANONICAL_SYSTEM_VOICE_NAMES.length} system voices...`
  );

  for (const name of CANONICAL_SYSTEM_VOICE_NAMES) {
    console.log(`- ${name}`);
    await seedSystemVoice(name);
  }

  console.log("System voice seed completed.");
}

main()
  .catch((error) => {
    console.error("Failed to seed system voices:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

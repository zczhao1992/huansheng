"use client";

import {
  BookOpen,
  Smile,
  Mic,
  Languages,
  Clapperboard,
  Gamepad2,
  Podcast,
  Brain,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";

const PROMPT_SUGGESTIONS: {
  labelKey: string;
  promptKey: string;
  icon: LucideIcon;
}[] = [
  { labelKey: "story.label", promptKey: "story.prompt", icon: BookOpen },
  { labelKey: "joke.label", promptKey: "joke.prompt", icon: Smile },
  { labelKey: "ad.label", promptKey: "ad.prompt", icon: Mic },
  {
    labelKey: "languages.label",
    promptKey: "languages.prompt",
    icon: Languages,
  },
  { labelKey: "movie.label", promptKey: "movie.prompt", icon: Clapperboard },
  { labelKey: "game.label", promptKey: "game.prompt", icon: Gamepad2 },
  { labelKey: "podcast.label", promptKey: "podcast.prompt", icon: Podcast },
  { labelKey: "meditation.label", promptKey: "meditation.prompt", icon: Brain },
];

export function PromptSuggestions({
  onSelect,
}: {
  onSelect: (prompt: string) => void;
}) {
  const t = useTranslations("PromptSuggestions");

  return (
    <div className="space-y-2.5">
      <p className="text-sm text-muted-foreground">{t("title")}</p>
      <div className="flex flex-wrap gap-2">
        {PROMPT_SUGGESTIONS.map((suggestion) => (
          <Badge
            key={suggestion.labelKey}
            variant="outline"
            className="cursor-pointer gap-1.5 py-1 px-2.5 text-xs hover:bg-accent rounded-md"
            onClick={() => onSelect(t(suggestion.promptKey))}
          >
            <suggestion.icon className="size-3.5 shrink-0" />
            {t(suggestion.labelKey)}
          </Badge>
        ))}
      </div>
    </div>
  );
}

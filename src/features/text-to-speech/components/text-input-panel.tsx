"use client";

import { Coins } from "lucide-react";
import { useState } from "react";

// import { SettingsDrawer } from "./settings-drawer";
// import { HistoryDrawer } from "./history-drawer";
// import { VoiceSelectorButton } from "./voice-selector-button";

import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
// import { useTypedAppFormContext } from "@/hooks/use-app-form";

import {
  COST_PER_UNIT,
  TEXT_MAX_LENGTH,
} from "@/features/text-to-speech/data/constants";
// import { ttsFormOptions } from "./text-to-speech-form";
// import { GenerateButton } from "./generate-button";
// import { PromptSuggestions } from "./prompt-suggestions";
import { useTranslations } from "next-intl";

export function TextInputPanel() {
  const t = useTranslations();
  const [text, setText] = useState("");

  return (
    <div className="flex h-full min-h-0 flex-col flex-1">
      <div className="relative min-h-0 flex-1">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("TextInput.placeholder")}
          className="absolute inset-0 resize-none border-0 bg-transparent p-4 pb-6 lg:p-6 lg:pb-8 text-base! leading-relaxed tracking-tight shadow-none wrap-break-word focus-visible:ring-0"
          maxLength={TEXT_MAX_LENGTH}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-linear-to-t from-background to-transparent" />
      </div>

      <div className="shrink-0 p-4 lg:p-6">
        <div className="flex flex-col gap-3 lg:hidden">
          <Button className="w-full">{t("TextInput.generateSpeech")}</Button>
        </div>
        {text.length > 0 ? (
          <div className="hidden items-center justify-between lg:flex">
            <Badge variant="outline" className="gap-1.5 border-dashed">
              <Coins className="size-3 text-chart-5" />
              <span className="text-xs">
                <span className="tabular-nums">
                  ${(text.length * COST_PER_UNIT).toFixed(4)}
                </span>
              </span>
              &nbsp;
              {t("TextInput.estimated")}
            </Badge>
            <div className="flex items-center gap-3">
              <p className="text-xs tracking-tight">
                {text.length.toLocaleString()}
                <span className="text-muted-foreground">
                  &nbsp;/&nbsp;{TEXT_MAX_LENGTH.toLocaleString()}&nbsp;
                  {t("TextInput.characters")}
                </span>
              </p>
              <Button size="sm">{t("TextInput.generateSpeech")}</Button>
            </div>
          </div>
        ) : (
          <div className="hidden lg:block">
            <p className="text-sm text-muted-foreground">
              {t("TextInput.bottomText")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

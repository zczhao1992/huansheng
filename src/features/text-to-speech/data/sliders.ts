import { useTranslations } from "next-intl";

interface Slider {
  id: "temperature" | "topP" | "topK" | "repetitionPenalty";
  label: string;
  leftLabel: string;
  rightLabel: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export const sliders = (): Slider[] => {
  const t = useTranslations("Sliders");
  return [
    {
      id: "temperature",
      label: t("temperature.label"),
      leftLabel: t("temperature.leftLabel"),
      rightLabel: t("temperature.rightLabel"),
      min: 0,
      max: 2,
      step: 0.1,
      defaultValue: 0.8,
    },
    {
      id: "topP",
      label: t("topP.label"),
      leftLabel: t("topP.leftLabel"),
      rightLabel: t("topP.rightLabel"),
      min: 0,
      max: 1,
      step: 0.05,
      defaultValue: 0.95,
    },
    {
      id: "topK",
      label: t("topK.label"),
      leftLabel: t("topK.leftLabel"),
      rightLabel: t("topK.rightLabel"),
      min: 1,
      max: 10000,
      step: 100,
      defaultValue: 1000,
    },
    {
      id: "repetitionPenalty",
      label: t("repetitionPenalty.label"),
      leftLabel: t("repetitionPenalty.leftLabel"),
      rightLabel: t("repetitionPenalty.rightLabel"),
      min: 1,
      max: 2,
      step: 0.1,
      defaultValue: 1.2,
    },
  ];
};

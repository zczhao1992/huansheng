"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useTranslations } from "next-intl";

export function GenerateButton({
  size,
  disabled,
  isSubmitting,
  onSubmit,
  className,
}: {
  size?: "default" | "sm";
  disabled: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
  className?: string;
}) {
  const t = useTranslations("VoiceSetting");
  return (
    <Button
      size={size}
      className={className}
      onClick={onSubmit}
      disabled={disabled}
    >
      {isSubmitting ? (
        <>
          <Spinner className="size-3" />
          {t("btnText1")}
        </>
      ) : (
        `${t("btnText2")}`
      )}
    </Button>
  );
}

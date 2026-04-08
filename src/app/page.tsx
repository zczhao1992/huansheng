"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <Button onClick={() => toast.success(t("title"))}>
      {t("title")}111111111
    </Button>
  );
}

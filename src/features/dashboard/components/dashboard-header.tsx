"use client";

import { useUser } from "@clerk/nextjs";
import { Headphones, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const { isLoaded, user } = useUser();
  const t = useTranslations("Header");

  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{t("greeting")}</p>
        <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
          {isLoaded ? user?.fullName ?? user?.firstName ?? "there" : "..."}
        </h1>
      </div>

      <div className="lg:flex items-center gap-3 hidden">
        <Button variant="outline" size="sm" asChild>
          <Link href="mailto:zczhao1992@163.com">
            <ThumbsUp />
            <span className="hidden lg:block">{t("feedback")}</span>
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="mailto:zczhao1992@163.com">
            <Headphones />
            <span className="hidden lg:block">{t("needHelp")}</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

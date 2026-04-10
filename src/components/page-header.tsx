"use client";

// import { Headphones, ThumbsUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
// import { useTranslations } from "next-intl";
// import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LanguageSwitch } from "./language-switch";

export function PageHeader({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  // const t = useTranslations("Header");

  return (
    <div
      className={cn(
        "flex items-center justify-between border-b px-4 py-4",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-5">
        <LanguageSwitch />

        <Link href="https://github.com/zczhao1992/huansheng">
          <Image
            src="/github.svg"
            alt="Resonance"
            width={24}
            height={24}
            className="rounded-sm"
          />
        </Link>

        {/* <Button variant="outline" size="sm" asChild>
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
        </Button> */}
      </div>
    </div>
  );
}

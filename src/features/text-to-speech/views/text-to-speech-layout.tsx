import { PageHeader } from "@/components/page-header";
import { useTranslations } from "next-intl";

export function TextToSpeechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("SideBar");
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <PageHeader title={t("textToSpeech")} />
      {children}
    </div>
  );
}

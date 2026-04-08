import { getRequestConfig } from "next-intl/server";
import { getLocale } from "@/i18n";

export default getRequestConfig(async () => {
  // Static for now, we'll change this later
  const locale = await getLocale();

  return {
    locale,
    messages: (await import(`../../lang/${locale}.json`)).default,
  };
});

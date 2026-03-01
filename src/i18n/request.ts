import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  // This will be used to provide the locale to the request config
  let locale = await requestLocale;

  // If no locale is found, we use 'es' as default
  if (!locale) locale = 'es';

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});

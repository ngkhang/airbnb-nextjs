import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';

import '../assets/styles/globals.css';
import Notification from '@/components/notification';
import StateProvider from '@/components/providers/query-client.provider';
import { airbnb } from '@/lib/fonts';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations(`metaData.default`);
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Config Next-Intl
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={airbnb.variable}>
        <StateProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
            <Notification />
          </NextIntlClientProvider>
        </StateProvider>
      </body>
    </html>
  );
}

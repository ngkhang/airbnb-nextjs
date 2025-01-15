import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';

import '../assets/styles/globals.css';
import Notification from '@/components/notification';
import AuthProvider from '@/components/providers/auth.provider';
import { KEY } from '@/constants/key';
import { getCookie } from '@/lib/cookies';
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

  const token = getCookie(KEY.TOKEN)?.value;
  const user = getCookie(KEY.USER)?.value;

  return (
    <html lang={locale}>
      <body className={airbnb.variable}>
        <NextIntlClientProvider messages={messages}>
          <AuthProvider
            initialState={{
              token,
              user: user && JSON.parse(user),
            }}
          >
            {children}
            <Notification />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

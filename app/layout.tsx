import { auth } from "@/auth";
import "./globals.css";
import {SessionProvider} from 'next-auth/react'
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body>{children}</body>
      </SessionProvider>
      
    </html>
  );
}

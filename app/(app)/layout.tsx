import { LoggedInAppLayout } from '@/components/layout';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LoggedInAppLayout>{children}</LoggedInAppLayout>;
}

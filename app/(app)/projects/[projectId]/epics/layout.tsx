import type { ReactNode } from 'react';

type ProjectEpicsLayoutProps = Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>;

export default function ProjectEpicsLayout({
  children,
  modal,
}: ProjectEpicsLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

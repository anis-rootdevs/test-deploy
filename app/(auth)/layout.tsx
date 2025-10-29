import { Fragment } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/40">
        {children}
      </main>
    </Fragment>
  );
}

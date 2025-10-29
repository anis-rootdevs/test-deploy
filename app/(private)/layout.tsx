export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="flex-1 pt-4">{children}</main>
    </div>
  );
}

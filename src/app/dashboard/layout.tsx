export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Dashboard has its own header - no need for main header/footer
  return <>{children}</>
}

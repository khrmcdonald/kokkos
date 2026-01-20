export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Auth pages have their own minimal layout - no header/footer
  return <>{children}</>
}

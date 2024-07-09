import SiteHeader from "@/components/site-header"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader isAuthPage={true} />
      {children}
    </>
  )
}

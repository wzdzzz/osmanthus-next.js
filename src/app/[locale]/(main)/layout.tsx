import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader />
      <main className="min-h-[calc(100vh-200px)] flex-1">{children}</main>
      <SiteFooter />
    </>
  )
}

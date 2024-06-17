import SiteFooter from "@/components/site-footer"
import SiteHeader from "@/components/site-header"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <SiteHeader />
      <div>{children}</div>
      <SiteFooter />
    </div>
  )
}

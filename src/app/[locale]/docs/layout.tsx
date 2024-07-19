import { siteConfig } from "@/config/site"
import { ScrollArea } from "@/components/ui/scroll-area"
import DocsSideNav from "@/components/docs-side-nav"
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
      <div className="container z-30 flex md:gap-6 lg:gap-10">
        <aside className="top-14 z-30 hidden h-[calc(100vh-3rem)] w-[220px] md:sticky md:block">
          <ScrollArea className="h-full py-6 pr-6 lg:py-8">
            <DocsSideNav items={siteConfig.docsNavList} />
          </ScrollArea>
        </aside>
        <div className="w-full flex-1">
          <div>{children}</div>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}

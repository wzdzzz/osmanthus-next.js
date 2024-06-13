import PageHead from "@/components/layout/page-head"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PageHead />
      {children}
    </>
  )
}

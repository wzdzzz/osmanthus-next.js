import PageHead from "@/components/layout/page-head"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PageHead justLogo={true} />
      {children}
    </>
  )
}

import Sidebar from "./components/sidebar"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid h-[100%] grid-cols-5">
      <Sidebar />

      <div className="col-span-5 flex h-[calc(100vh-200px)] flex-col gap-10 p-10 md:col-span-3 md:border-l">
        {children}
      </div>
    </div>
  )
}

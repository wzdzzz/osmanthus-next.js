import Sidebar from "./components/sidebar"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-[100%]">
      <Sidebar />

      <div className="flex h-[calc(100vh-200px)] flex-1 flex-col gap-10 p-10">
        {children}
      </div>
    </div>
  )
}

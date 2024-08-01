export default function TestLayout({ children, team, box }: any) {
  return (
    <div className="flex flex-col gap-4">
      {children}
      <div className="flex gap-4">
        {team}
        {box}
      </div>
    </div>
  )
}

import React from "react"

import "./index.css"

export default function ColorfulCard({
  children,
}: {
  children: React.ReactElement
}) {
  return (
    <div className="colorful">
      <div className="box">
        <div className="box-mask" />
      </div>
      <div className="content bg-card">{children}</div>
    </div>
  )
}

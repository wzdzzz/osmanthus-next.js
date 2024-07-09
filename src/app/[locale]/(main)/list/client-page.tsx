"use client"

import { useEffect, useState } from "react"

export default function Page({ session }) {
  const [userList, setUserList] = useState<{ name: string; age: string }[]>([])

  useEffect(() => {
    fetch("http://localhost:3000/api/user/list", {
      headers: {
        Authorization: `Bearer ${session?.user?.id}`,
      },
    }).then(async (res) => {
      const list = await res.json()
      setUserList(list)
    })
  }, [session])
  return (
    <div>
      {userList?.map((user) => (
        <div key={user.name}>
          <p>{user.name}</p>
          <p>{user.age}</p>
        </div>
      ))}
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"

import { useToast } from "@/components/ui/use-toast"

export default function Page({ session }) {
  const [userList, setUserList] = useState<{ name: string; age: string }[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetch("http://localhost:3000/api/user/list", {
      headers: {
        Authorization: `Bearer ${session?.user?.id}`,
      },
    })
      .then(async (res) => {
        const list = await res.json()
        setUserList(list)
      })
      .catch((err) => {
        toast({
          title: "获取用户列表失败",
          variant: "destructive",
          description: new Error(err).message,
        })
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

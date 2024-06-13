import { auth } from "@/config/auth.config"

import Client from "./client-page"

export default async function Page() {
  const session = await auth()

  return <Client session={session} />
}

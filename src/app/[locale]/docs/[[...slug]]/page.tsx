import * as fs from "node:fs"
import { join } from "node:path"
import { useMDXComponents } from "@/mdx-components"
import { MDXRemote } from "next-mdx-remote/rsc"

const Page = async ({ params }) => {
  const { locale, slug } = params
  let postDir = join(
    process.cwd(),
    "src/doc",
    locale,
    slug?.join("/") || "",
    "page.mdx"
  )
  if (!fs.existsSync(postDir)) {
    postDir = join(
      process.cwd(),
      "src/doc",
      "en",
      slug?.join("/") || "",
      "page.mdx"
    )
  }
  const fileContents = fs.readFileSync(postDir, "utf8")

  return (
    <div>
      <MDXRemote components={useMDXComponents({})} source={fileContents} />
    </div>
  )
}

export default Page

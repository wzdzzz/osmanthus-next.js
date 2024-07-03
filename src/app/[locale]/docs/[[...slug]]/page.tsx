import * as fs from "node:fs"
import { join } from "node:path"
import { useMDXComponents } from "@/mdx-components"
import { MDXRemote } from "next-mdx-remote/rsc"

const defaultPath = join(process.cwd(), "src/doc")

const Page = async ({ params }) => {
  const { locale, slug } = params
  const realSlug = slug?.join("/") || ""
  let postDir = join(defaultPath, locale, realSlug, "page.mdx")
  if (!fs.existsSync(postDir)) {
    postDir = join(defaultPath, "en", realSlug, "page.mdx")
  }
  const fileContents = fs.readFileSync(postDir, "utf8")

  return (
    <div>
      <MDXRemote components={useMDXComponents({})} source={fileContents} />
    </div>
  )
}

export default Page

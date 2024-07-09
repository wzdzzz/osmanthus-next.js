export const siteConfig = {
  name: "osmanthus",
  url: "http://localhost:3000",
  ogImage: "",
  description: "osmanthus",
  links: {
    github: "https://github.com/wzdzzz/web-nextjs",
  },
  navList: [
    {
      href: "/docs",
      text: "Docs",
    },
    {
      href: "/dashboard",
      text: "Dashboard",
    },
  ],
  docsNavList: [
    {
      title: "gettingStarted",
      items: [
        {
          title: "introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "installation",
          href: "/docs/installation",
          items: [],
        },
      ],
    },
  ],
}

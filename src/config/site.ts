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
    {
      href: "/themes",
      text: "Themes",
    },
    {
      href: "/examples",
      text: "Examples",
    },
    {
      href: "/proxy",
      text: "Proxy",
    },
  ],
  docsNavList: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      href: "/docs/components/accordion",
    },
  ],
}

export const siteConfig = {
  name: "osmanthus",
  url: "http://localhost:3000",
  ogImage: "",
  description: "osmanthus",
  links: {
    github: "https://github.com/wzdzzz/osmanthus-next.js",
  },
  navList: [
    {
      href: "/docs",
      title: "docs",
      children: [
        {
          href: "/docs",
          title: "introduction",
        },
        {
          href: "/docs/installation",
          title: "installation",
        },
      ],
    },
    {
      href: "/dashboard",
      title: "dashboard",
    },
    {
      href: "/pic",
      title: "pic",
    },
    {
      href: "/profile",
      title: "profile",
      isMobileShow: true,
      children: [
        {
          href: "/profile",
          title: "personInformation",
        },
        {
          href: "/profile/change-password",
          title: "changePassword",
        },
      ],
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

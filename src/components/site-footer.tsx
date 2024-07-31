"use client"

import { env } from "@/env.mjs"
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share"

import { siteConfig } from "@/config/site"

const shareList = [
  {
    name: "Twitter",
    icon: TwitterIcon,
    share: TwitterShareButton,
  },
  {
    name: "Facebook",
    icon: FacebookIcon,
    share: FacebookShareButton,
  },
  {
    name: "Whatsapp",
    icon: WhatsappIcon,
    share: WhatsappShareButton,
  },
  {
    name: "Linkedin",
    icon: LinkedinIcon,
    share: LinkedinShareButton,
  },
  {
    name: "Telegram",
    icon: TelegramIcon,
    share: TelegramShareButton,
  },
  {
    name: "Reddit",
    icon: RedditIcon,
    share: RedditShareButton,
  },
]

export default function SiteFooter() {
  const shareUrl = "https://geekai.asia" || env.NEXT_PUBLIC_APP_URL
  return (
    <footer className="md:pyb-6 py-6 md:px-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-ms text-balance text-center leading-loose text-muted-foreground md:text-left">
          &copy; 2024 osmanthus. The source code is available on{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GItHub
          </a>
        </p>
        <div className="flex gap-2">
          {shareList.map((item) => (
            <item.share url={shareUrl} title="osmanthus" key={item.name}>
              <item.icon key={item.name} size={32} round={true} />
            </item.share>
          ))}
        </div>
      </div>
    </footer>
  )
}

"use client"

import { TwitterIcon, TwitterShareButton } from "react-share"

import { siteConfig } from "@/config/site"

export default function SiteFooter() {
  const shareUrl = window.location.href
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
            GItHub11
          </a>
        </p>
        <div>
          <TwitterShareButton url={shareUrl} title="osmanthus" via="osmanthus">
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
        </div>
      </div>
    </footer>
  )
}

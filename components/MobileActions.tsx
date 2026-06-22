"use client";

import { Download, Phone, Share2 } from "lucide-react";
import { brand } from "@/data/site";

async function sharePage() {
  const payload = {
    title: `${brand.nameZh} ${brand.nameEn}`,
    text: brand.tagline,
    url: window.location.href
  };

  if (navigator.share) {
    await navigator.share(payload);
    return;
  }

  await navigator.clipboard.writeText(window.location.href);
  window.alert("已複製分享連結");
}

export function ShareIconButton({
  className = "icon-button",
  showLabel = false
}: {
  className?: string;
  showLabel?: boolean;
}) {
  return (
    <button className={className} type="button" onClick={sharePage} title="分享網站">
      <Share2 size={18} aria-hidden="true" />
      {showLabel ? <span>分享</span> : <span className="sr-only">分享網站</span>}
    </button>
  );
}

export function MobileActions() {
  return (
    <div className="mobile-actions" aria-label="快速操作">
      <a href={brand.phoneHref} className="mobile-actions__button" title="電話預約">
        <Phone size={18} aria-hidden="true" />
        <span>電話</span>
      </a>
      <ShareIconButton className="mobile-actions__button" showLabel />
      <button
        className="mobile-actions__button is-disabled"
        type="button"
        disabled
        title={brand.appStatus}
      >
        <Download size={18} aria-hidden="true" />
        <span>APP</span>
      </button>
    </div>
  );
}

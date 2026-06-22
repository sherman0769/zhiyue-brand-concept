import Image from "next/image";
import { Download, MapPin, Phone, QrCode, Sparkles } from "lucide-react";
import { CuteCalculator } from "@/app/calculator/CuteCalculator";
import { BrandMark } from "@/components/BrandMark";
import { MobileActions, ShareIconButton } from "@/components/MobileActions";
import {
  brand,
  careSteps,
  faqs,
  gallery,
  navItems,
  pillars,
  services,
  stylistPlaceholders
} from "@/data/site";

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <BrandMark />
        <nav className="site-nav" aria-label="主要導覽">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions" aria-label="頁首操作">
          <button type="button" className="icon-button" title="APP 下載待確認" disabled>
            <Download size={18} aria-hidden="true" />
            <span className="sr-only">APP 下載待確認</span>
          </button>
          <ShareIconButton />
          <a className="cta cta--small" href={brand.phoneHref}>
            電話預約
          </a>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <Image
          src="/images/generated/hero-gallery-calm.png"
          alt="自然光下的 Gallery Calm 沙龍概念空間"
          fill
          priority
          sizes="100vw"
          className="hero__image"
        />
        <div className="hero__overlay" />
        <div className="hero__content">
          <p className="eyebrow">{brand.descriptor} / {brand.locationLabel}</p>
          <h1 id="hero-title">{brand.nameZh} {brand.nameEn}</h1>
          <p className="hero__tagline">{brand.tagline}</p>
          <p className="hero__text">
            位於台中美術園道的髮與頭皮美學沙龍，將健康髮質管理、頭皮養護與專屬造型整合成一段被理解、被細心對待的體驗。
          </p>
          <div className="hero__actions">
            <a className="cta" href="#services">查看服務</a>
            <a className="cta cta--ghost" href={brand.phoneHref}>電話預約</a>
          </div>
          <p className="concept-label">AI concept visual / 非真實店內照片</p>
        </div>
      </section>

      <section className="section section--intro" id="essence" aria-labelledby="essence-title">
        <div className="section__inner intro-grid">
          <div>
            <p className="eyebrow">Brand Essence</p>
            <h2 id="essence-title">溫柔但不柔弱，專業但不醫療化。</h2>
          </div>
          <p className="lead">
            質悅的品牌語意來自「質感」與「愉悅」。網站以安靜藝廊感、清晰資訊與低壓力行動路徑，讓初次認識品牌的人快速理解服務與預約方式。
          </p>
        </div>
        <div className="section__inner pillar-grid">
          {pillars.map((pillar) => (
            <article className="panel" key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="services" aria-labelledby="services-title">
        <div className="section__inner section-heading">
          <p className="eyebrow">Services</p>
          <h2 id="services-title">從需求開始，而不是只列服務名稱。</h2>
          <p>
            每個服務都以「困擾、方法、適合對象、預約前準備」呈現，幫助顧客在行動前降低不確定感。
          </p>
        </div>
        <div className="section__inner service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <Sparkles size={18} aria-hidden="true" />
              <h3>{service.title}</h3>
              <p>{service.intro}</p>
              <div className="tag-row">
                {service.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--forest" id="method" aria-labelledby="method-title">
        <div className="section__inner method-grid">
          <div>
            <p className="eyebrow">Care Method</p>
            <h2 id="method-title">先理解，再建立適合你的髮與頭皮照顧路徑。</h2>
          </div>
          <div className="timeline">
            {careSteps.map((item) => (
              <article className="timeline__item" key={item.step}>
                <span>{item.step}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section calculator-showcase" id="calculator" aria-labelledby="calculator-section-title">
        <div className="section__inner calculator-showcase__grid">
          <div className="calculator-showcase__copy">
            <p className="eyebrow">Mini Tool</p>
            <h2 id="calculator-section-title">可愛計算機，直接在主頁使用。</h2>
            <p>
              保留柔和可愛的操作感，適合手機快速計算，也能用鍵盤輸入數字與運算符號。
            </p>
          </div>
          <CuteCalculator variant="embedded" />
        </div>
      </section>

      <section className="section" aria-labelledby="gallery-title">
        <div className="section__inner section-heading">
          <p className="eyebrow">Gallery</p>
          <h2 id="gallery-title">概念視覺先建立氛圍，正式作品等待授權。</h2>
        </div>
        <div className="gallery-grid">
          {gallery.map((item) => (
            <figure className="gallery-item" key={item.src}>
              <Image src={item.src} alt={item.alt} width={900} height={1160} sizes="(min-width: 900px) 33vw, 100vw" />
              <figcaption>
                <span>{item.tag}</span>
                <strong>{item.title}</strong>
                <small>{item.sourceStatus}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section section--split" aria-labelledby="story-title">
        <div className="section__inner story-grid">
          <div>
            <p className="eyebrow">Brand Story</p>
            <h2 id="story-title">原地延續，也重新整理品牌被看見的方式。</h2>
            <p>
              報告指出質悅與舊品牌資訊仍並存。網站第一版會用一致的品牌名稱、服務描述、地址與電話建立新的資訊入口，並將轉換故事保留為待品牌方確認的正式文案。
            </p>
          </div>
          <div className="stylists" aria-label="設計師與作品資訊狀態">
            {stylistPlaceholders.map((item) => (
              <article className="panel panel--light" key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.specialty}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="section__inner faq-grid">
          <div>
            <p className="eyebrow">FAQ</p>
            <h2 id="faq-title">把行動前的疑慮先說清楚。</h2>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--booking" id="booking" aria-labelledby="booking-title">
        <div className="section__inner booking-grid">
          <div>
            <p className="eyebrow">Location / Booking</p>
            <h2 id="booking-title">先用電話完成聯絡，正式預約入口待確認。</h2>
            <p>{brand.bookingStatus}</p>
          </div>
          <div className="booking-actions">
            <a className="cta" href={brand.phoneHref}>
              <Phone size={18} aria-hidden="true" />
              {brand.phoneDisplay}
            </a>
            <a
              className="cta cta--ghost"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.address)}`}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin size={18} aria-hidden="true" />
              地圖導航
            </a>
            <button className="cta cta--disabled" type="button" disabled>
              <Download size={18} aria-hidden="true" />
              APP 下載待確認
            </button>
          </div>
          <aside className="qr-card" aria-label="網站 QR code">
            <div className="qr-card__label">
              <QrCode size={18} aria-hidden="true" />
              <span>手機掃描</span>
            </div>
            <Image
              src="/images/generated/site-qrcode.svg"
              alt="掃描開啟質悅 ZHI YUE 概念網站的 QR code"
              width={220}
              height={220}
              unoptimized
            />
            <p>掃描 QR code 開啟此品牌概念網站。</p>
            <a href={brand.siteUrl}>{brand.siteUrl.replace("https://", "")}</a>
          </aside>
          <dl className="info-list">
            <div>
              <dt>地址</dt>
              <dd>{brand.address}</dd>
            </div>
            <div>
              <dt>電話</dt>
              <dd>{brand.phoneDisplay}</dd>
            </div>
            <div>
              <dt>營業時間</dt>
              <dd>{brand.hoursStatus}</dd>
            </div>
          </dl>
        </div>
      </section>

      <footer className="site-footer" id="share">
        <div>
          <BrandMark />
          <p>{brand.conceptNotice}</p>
        </div>
        <div className="footer-actions">
          <ShareIconButton showLabel />
          <button type="button" className="icon-button" title={brand.appStatus} disabled>
            <Download size={18} aria-hidden="true" />
            <span>APP</span>
          </button>
        </div>
      </footer>

      <MobileActions />
    </main>
  );
}

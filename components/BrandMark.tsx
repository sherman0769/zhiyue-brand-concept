import { brand } from "@/data/site";

export function BrandMark() {
  return (
    <a className="brand-mark" href="#top" aria-label="回到首頁">
      <span className="brand-mark__zh">{brand.nameZh}</span>
      <span className="brand-mark__en">{brand.nameEn}</span>
    </a>
  );
}

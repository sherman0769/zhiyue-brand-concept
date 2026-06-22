import type { Metadata } from "next";
import { CuteCalculator } from "./CuteCalculator";

export const metadata: Metadata = {
  title: "可愛計算機 | ZHI YUE",
  description: "一個柔和可愛風格、支援手機瀏覽的簡易計算機。",
};

export default function CalculatorPage() {
  return <CuteCalculator />;
}

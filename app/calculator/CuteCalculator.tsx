"use client";

import Link from "next/link";
import { Calculator, Delete, Home, RotateCcw, Sparkles } from "lucide-react";
import type { FocusEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./calculator.module.css";

type Operator = "+" | "-" | "×" | "÷";

const MAX_DISPLAY_LENGTH = 14;

function formatNumber(value: number) {
  if (!Number.isFinite(value)) {
    return "錯誤";
  }

  const rounded = Number.parseFloat(value.toFixed(10));
  const text = Math.abs(rounded) >= 1e12 ? rounded.toExponential(6) : String(rounded);

  return text.length > MAX_DISPLAY_LENGTH ? rounded.toPrecision(10) : text;
}

function calculate(left: number, right: number, operator: Operator) {
  switch (operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "×":
      return left * right;
    case "÷":
      if (right === 0) {
        throw new Error("divide-by-zero");
      }
      return left / right;
    default:
      return right;
  }
}

type CuteCalculatorProps = {
  variant?: "page" | "embedded";
};

export function CuteCalculator({ variant = "page" }: CuteCalculatorProps) {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState("準備好了");
  const [isError, setIsError] = useState(false);
  const [keyboardActive, setKeyboardActive] = useState(variant === "page");
  const shellRef = useRef<HTMLElement | null>(null);
  const isEmbedded = variant === "embedded";
  const titleId = isEmbedded ? "home-calculator-title" : "calculator-title";
  const TitleTag = isEmbedded ? "h3" : "h1";

  const clearAll = () => {
    setDisplay("0");
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setHistory("準備好了");
    setIsError(false);
  };

  const inputDigit = (digit: string) => {
    if (isError) {
      setDisplay(digit);
      setIsError(false);
      setHistory("重新開始");
      return;
    }

    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
      return;
    }

    setDisplay((current) => {
      if (current === "0") {
        return digit;
      }

      return current.replace("-", "").length >= MAX_DISPLAY_LENGTH ? current : `${current}${digit}`;
    });
  };

  const inputDecimal = () => {
    if (isError) {
      setDisplay("0.");
      setIsError(false);
      setHistory("重新開始");
      return;
    }

    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }

    setDisplay((current) => (current.includes(".") ? current : `${current}.`));
  };

  const chooseOperator = (nextOperator: Operator) => {
    if (isError) {
      return;
    }

    const inputValue = Number(display);

    if (storedValue === null) {
      setStoredValue(inputValue);
      setHistory(`${display} ${nextOperator}`);
    } else if (operator) {
      try {
        const result = calculate(storedValue, inputValue, operator);
        const formatted = formatNumber(result);
        setStoredValue(result);
        setDisplay(formatted);
        setHistory(`${formatted} ${nextOperator}`);
      } catch {
        setDisplay("不能除以 0");
        setStoredValue(null);
        setOperator(null);
        setHistory("請按 C 重新開始");
        setIsError(true);
        return;
      }
    }

    setOperator(nextOperator);
    setWaitingForOperand(true);
  };

  const runEquals = () => {
    if (!operator || storedValue === null || isError) {
      return;
    }

    const inputValue = Number(display);

    try {
      const result = calculate(storedValue, inputValue, operator);
      setHistory(`${formatNumber(storedValue)} ${operator} ${display} =`);
      setDisplay(formatNumber(result));
      setStoredValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    } catch {
      setDisplay("不能除以 0");
      setStoredValue(null);
      setOperator(null);
      setWaitingForOperand(true);
      setHistory("請按 C 重新開始");
      setIsError(true);
    }
  };

  const backspace = () => {
    if (isError || waitingForOperand) {
      setDisplay("0");
      setIsError(false);
      setWaitingForOperand(false);
      return;
    }

    setDisplay((current) => (current.length <= 1 || current === "-0" ? "0" : current.slice(0, -1)));
  };

  const toggleSign = () => {
    if (isError || display === "0") {
      return;
    }

    setDisplay((current) => (current.startsWith("-") ? current.slice(1) : `-${current}`));
  };

  const applyPercent = () => {
    if (isError) {
      return;
    }

    const percentValue = Number(display) / 100;
    setDisplay(formatNumber(percentValue));
    setHistory(`${display}%`);
    setWaitingForOperand(true);
  };

  useEffect(() => {
    if (isEmbedded && !keyboardActive) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;

      if (/^\d$/.test(key)) {
        event.preventDefault();
        inputDigit(key);
      } else if (key === ".") {
        event.preventDefault();
        inputDecimal();
      } else if (key === "+" || key === "-") {
        event.preventDefault();
        chooseOperator(key);
      } else if (key === "*") {
        event.preventDefault();
        chooseOperator("×");
      } else if (key === "/") {
        event.preventDefault();
        chooseOperator("÷");
      } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        runEquals();
      } else if (key === "Backspace") {
        event.preventDefault();
        backspace();
      } else if (key === "Escape") {
        event.preventDefault();
        clearAll();
      } else if (key === "%") {
        event.preventDefault();
        applyPercent();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleBlurCapture = (event: FocusEvent<HTMLElement>) => {
    if (!isEmbedded) {
      return;
    }

    const nextFocusedElement = event.relatedTarget;
    if (!nextFocusedElement || !event.currentTarget.contains(nextFocusedElement)) {
      setKeyboardActive(false);
    }
  };

  const calculator = (
    <section
      ref={shellRef}
      className={`${styles.shell} ${isEmbedded ? styles.embeddedShell : ""}`}
      aria-labelledby={titleId}
      data-testid={isEmbedded ? "home-calculator" : "calculator-page"}
      onBlurCapture={handleBlurCapture}
      onFocusCapture={() => setKeyboardActive(true)}
    >
      <div className={styles.topBar}>
        {isEmbedded ? (
          <div className={styles.homeLink} aria-hidden="true">
            <Sparkles size={18} />
          </div>
        ) : (
          <Link className={styles.homeLink} href="/" aria-label="回到質悅首頁">
            <Home size={18} aria-hidden="true" />
          </Link>
        )}
        <div className={styles.titleGroup}>
          <span className={styles.kicker}>
            <Sparkles size={16} aria-hidden="true" />
            Soft Tool
          </span>
          <TitleTag id={titleId}>可愛計算機</TitleTag>
        </div>
        <div className={styles.badge} aria-hidden="true">
          <Calculator size={20} />
        </div>
      </div>

      <div className={styles.displayPanel} aria-live="polite">
        <p className={styles.history} data-testid="calculator-history">
          {history}
        </p>
        <output className={styles.display} data-testid="calculator-display">
          {display}
        </output>
      </div>

      <div className={styles.keypad}>
        <CalcButton label="C" tone="soft" onClick={clearAll} testId="calc-clear" ariaLabel="清除">
          <RotateCcw size={19} aria-hidden="true" />
        </CalcButton>
        <CalcButton label="±" tone="soft" onClick={toggleSign} testId="calc-sign" ariaLabel="正負號" />
        <CalcButton label="%" tone="soft" onClick={applyPercent} testId="calc-percent" ariaLabel="百分比" />
        <CalcButton label="÷" tone="operator" onClick={() => chooseOperator("÷")} testId="calc-divide" ariaLabel="除以" />

        <CalcButton label="7" onClick={() => inputDigit("7")} testId="calc-7" />
        <CalcButton label="8" onClick={() => inputDigit("8")} testId="calc-8" />
        <CalcButton label="9" onClick={() => inputDigit("9")} testId="calc-9" />
        <CalcButton label="×" tone="operator" onClick={() => chooseOperator("×")} testId="calc-multiply" ariaLabel="乘以" />

        <CalcButton label="4" onClick={() => inputDigit("4")} testId="calc-4" />
        <CalcButton label="5" onClick={() => inputDigit("5")} testId="calc-5" />
        <CalcButton label="6" onClick={() => inputDigit("6")} testId="calc-6" />
        <CalcButton label="-" tone="operator" onClick={() => chooseOperator("-")} testId="calc-minus" ariaLabel="減去" />

        <CalcButton label="1" onClick={() => inputDigit("1")} testId="calc-1" />
        <CalcButton label="2" onClick={() => inputDigit("2")} testId="calc-2" />
        <CalcButton label="3" onClick={() => inputDigit("3")} testId="calc-3" />
        <CalcButton label="+" tone="operator" onClick={() => chooseOperator("+")} testId="calc-plus" ariaLabel="加上" />

        <CalcButton label="0" onClick={() => inputDigit("0")} testId="calc-0" />
        <CalcButton label="." onClick={inputDecimal} testId="calc-decimal" ariaLabel="小數點" />
        <CalcButton label="backspace" tone="soft" onClick={backspace} testId="calc-backspace" ariaLabel="刪除最後一位">
          <Delete size={21} aria-hidden="true" />
        </CalcButton>
        <CalcButton label="=" tone="equals" onClick={runEquals} testId="calc-equals" ariaLabel="等於" />
      </div>
    </section>
  );

  return isEmbedded ? calculator : <main className={styles.page}>{calculator}</main>;
}

type CalcButtonProps = {
  label: string;
  onClick: () => void;
  testId: string;
  ariaLabel?: string;
  tone?: "number" | "soft" | "operator" | "equals";
  wide?: boolean;
  children?: ReactNode;
};

function CalcButton({
  label,
  onClick,
  testId,
  ariaLabel,
  tone = "number",
  wide = false,
  children,
}: CalcButtonProps) {
  const className = [
    styles.key,
    styles[tone],
    wide ? styles.wide : "",
    label === "backspace" ? styles.iconOnly : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={className} type="button" onClick={onClick} data-testid={testId} aria-label={ariaLabel ?? label}>
      {children ?? label}
    </button>
  );
}

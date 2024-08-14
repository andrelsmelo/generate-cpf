'use client'
import { generateCPF } from "@/lib/utils";
import { ArrowClockwise, Copy } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import clsx from 'clsx';

export default function Home() {
  const [cpf, setCpf] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [autoRegenerate, setAutoRegenerate] = useState(false);

  useEffect(() => {
    setCpf(generateCPF());
    const autoRegen = localStorage.getItem("autoRegenerate");

    if (autoRegen) {
      setAutoRegenerate(true);
    }
  }, []);

  const copyContent = () => {
    if (!cpf) return;
    navigator.clipboard.writeText(cpf);
    setIsBouncing(true);
    toast.success("CPF copiado para a área de transferência");
    setTimeout(() => setIsBouncing(false), 500);
    if (autoRegenerate) {
      setCpf(generateCPF());
    }
  };

  const regenerateCPF = () => {
    setIsRotating(true);
    toast.success("CPF regenerado");
    setTimeout(() => setIsRotating(false), 500);
  };

  const handleCpfClick = () => {
    if (!cpf) return;
    navigator.clipboard.writeText(cpf);
    setIsShaking(true);
    toast.success("CPF copiado para a área de transferência");
    setTimeout(() => setIsShaking(false), 500);
    if (autoRegenerate) {
      setCpf(generateCPF());
    }
  };

  const toggleAutoRegenerate = () => {
    setAutoRegenerate((prev) => {
      localStorage.setItem("autoRegenerate", String(!prev));
      return !prev;
    });
  }

  return (
    <main className="flex h-lvh flex-col items-center justify-between p-10 bg-emerald-800 text-white">
      <div className="w-full flex items-center justify-end">
        <div
          className={clsx(
            "relative inline-block w-32 h-8 rounded-full",
            autoRegenerate ? "bg-black" : "bg-gray-400"
          )}
          onClick={toggleAutoRegenerate}
        >
          <span
            className={clsx(
              "absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform",
              autoRegenerate ? "translate-x-24" : "translate-x-0"
            )}
          />
        </div>

      </div>
      <h1 className="text-[72px] font-bold">Gerador de CPF</h1>
      <p
        className={clsx("text-[144px] font-semibold cursor-pointer", isShaking && "animate-shake")}
        onClick={handleCpfClick}
      >
        {cpf || "-"}
      </p>
      <div className="min-w-[50svw] flex justify-evenly">
        <ArrowClockwise
          size={144}
          onClick={regenerateCPF}
          className={clsx("hover:scale-105", isRotating && "animate-rotate")}
        />
        <Copy
          size={144}
          onClick={copyContent}
          className={clsx("hover:scale-105", isBouncing && "animate-bounce")}
        />
      </div>
    </main>
  );
}

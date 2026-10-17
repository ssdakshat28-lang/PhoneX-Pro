import type { ReactNode } from "react";
import { Battery, Bot, Camera, Gamepad2, Zap, Sparkles, Mic, Send } from "lucide-react";

export const COLORS = [
  { id: "black", name: "Phantom Black", bg: "var(--phone-black)" },
  { id: "silver", name: "Titanium Silver", bg: "var(--phone-silver)" },
  { id: "purple", name: "Deep Purple", bg: "var(--phone-purple)" },
] as const;

export function PhoneFrame({ finish, children, className = "" }: { finish: string; children: ReactNode; className?: string }) {
  return (
    <div className={`relative w-[260px] h-[540px] rounded-[3rem] p-[10px] shadow-glow transition-all duration-700 ${className}`} style={{ background: finish }}>
      <div className="relative h-full w-full overflow-hidden rounded-[2.4rem] bg-screen">
        <div className="absolute left-1/2 top-3 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-background" />
        <div className="flex justify-between px-6 pt-4 text-[10px] font-semibold text-foreground/80">
          <span>9:41</span><span>5G ▮▮▮</span>
        </div>
        <div className="h-[calc(100%-2rem)]">{children}</div>
      </div>
    </div>
  );
}

export function HomeScreen() {
  const apps = [Camera, Gamepad2, Bot, Battery, Zap, Sparkles, Mic, Send];
  return (
    <div className="flex h-full flex-col bg-grid p-5 pt-10">
      <p className="font-display text-4xl font-light">9:41</p>
      <p className="text-xs text-muted-foreground">Saturday, October 17</p>
      <div className="mt-8 grid grid-cols-4 gap-3">
        {apps.map((I, i) => (
          <div key={i} className="glass flex aspect-square items-center justify-center rounded-2xl">
            <I className="h-5 w-5 text-primary" />
          </div>
        ))}
      </div>
      <div className="glass mt-auto mb-4 rounded-2xl p-3 text-xs">
        <p className="text-muted-foreground">Nova AI</p>
        <p>Your day looks clear. 72°F & sunny ☀️</p>
      </div>
    </div>
  );
}

export function CameraScreen() {
  return (
    <div className="relative flex h-full flex-col">
      <div className="relative flex-1 bg-gradient-to-b from-accent via-secondary to-background">
        <div className="absolute inset-6 grid grid-cols-3 grid-rows-3">
          {Array.from({ length: 9 }).map((_, i) => <div key={i} className="border border-foreground/10" />)}
        </div>
        <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-md border-2 border-star" />
        <span className="absolute right-3 top-3 rounded-full bg-background/60 px-2 py-1 text-[10px]">200MP</span>
      </div>
      <div className="flex justify-center gap-4 py-2 text-[10px] text-muted-foreground">
        <span>NIGHT</span><span className="text-star">PHOTO</span><span>VIDEO</span><span>PRO</span>
      </div>
      <div className="flex items-center justify-around pb-6">
        <div className="h-9 w-9 rounded-lg bg-accent" />
        <div className="h-16 w-16 rounded-full border-4 border-foreground p-1"><div className="h-full w-full rounded-full bg-foreground" /></div>
        <div className="h-9 w-9 rounded-full bg-accent" />
      </div>
    </div>
  );
}

export function GamingScreen() {
  return (
    <div className="flex h-full flex-col p-4 pt-8">
      <div className="flex items-center justify-between">
        <span className="font-display text-sm text-gradient">GAME MODE</span>
        <span className="rounded-full bg-gradient-neon px-2 py-0.5 text-[10px] font-bold text-primary-foreground">144 FPS</span>
      </div>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-2xl bg-grid border">
        <div className="absolute bottom-6 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[14px] border-b-[24px] border-x-transparent border-b-primary" />
        {[20, 55, 80].map((l, i) => (
          <div key={i} className="absolute h-3 w-3 rounded-full bg-neon-2" style={{ left: `${l}%`, top: `${15 + i * 18}%` }} />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px]">
        {[["GPU", "98%"], ["TEMP", "38°C"], ["PING", "12ms"]].map(([k, v]) => (
          <div key={k} className="glass rounded-xl p-2"><p className="text-muted-foreground">{k}</p><p className="font-bold">{v}</p></div>
        ))}
      </div>
    </div>
  );
}

export function BatteryScreen() {
  return (
    <div className="flex h-full flex-col items-center p-5 pt-10">
      <p className="text-xs text-muted-foreground">Battery Saver</p>
      <div className="relative mt-6 flex h-40 w-40 items-center justify-center rounded-full" style={{ background: "conic-gradient(var(--neon) 0 87%, var(--muted) 87% 100%)" }}>
        <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-screen">
          <span className="font-display text-3xl">87%</span>
          <span className="text-[10px] text-muted-foreground">~2 days left</span>
        </div>
      </div>
      <div className="mt-6 w-full space-y-2 text-xs">
        {[["Adaptive Saver", true], ["Dark Theme", true], ["Background Sync", false]].map(([k, on]) => (
          <div key={String(k)} className="glass flex items-center justify-between rounded-xl px-3 py-2">
            <span>{k}</span>
            <span className={`h-4 w-7 rounded-full p-0.5 ${on ? "bg-primary" : "bg-muted"}`}><span className={`block h-3 w-3 rounded-full bg-foreground transition ${on ? "translate-x-3" : ""}`} /></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AIScreen() {
  return (
    <div className="flex h-full flex-col p-4 pt-8 text-xs">
      <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /><span className="font-display">Nova AI</span></div>
      <div className="mt-4 flex-1 space-y-3">
        <div className="ml-auto w-4/5 rounded-2xl rounded-br-sm bg-primary p-2.5 text-primary-foreground">Summarize my unread emails</div>
        <div className="w-4/5 rounded-2xl rounded-bl-sm glass p-2.5">3 new: Flight confirmed for Mon ✈️, team sync moved to 3pm, invoice paid.</div>
        <div className="ml-auto w-3/5 rounded-2xl rounded-br-sm bg-primary p-2.5 text-primary-foreground">Translate to Spanish</div>
        <div className="w-4/5 rounded-2xl rounded-bl-sm glass p-2.5">Vuelo confirmado para el lunes…</div>
      </div>
      <div className="glass mb-4 flex items-center gap-2 rounded-full px-3 py-2">
        <span className="flex-1 text-muted-foreground">Ask anything…</span><Mic className="h-4 w-4 text-primary" />
      </div>
    </div>
  );
}

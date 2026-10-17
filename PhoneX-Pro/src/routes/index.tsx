import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Battery, Bot, Camera, Cpu, Gamepad2, MonitorSmartphone, Star, X, Check, Smartphone,
  Twitter, Instagram, Youtube, Facebook, ShieldCheck, ChevronRight,
} from "lucide-react";
import { COLORS, PhoneFrame, HomeScreen, CameraScreen, GamingScreen, BatteryScreen, AIScreen } from "@/components/phone/Phone";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PhoneX Pro — Experience the Future" },
      { name: "description", content: "Discover PhoneX Pro: 120Hz AMOLED, 200MP camera, all-day battery and on-device AI. Pre-order today." },
      { property: "og:title", content: "PhoneX Pro — Experience the Future" },
      { property: "og:description", content: "120Hz AMOLED, 200MP camera, all-day battery and on-device AI. Pre-order today." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STORAGE = [
  { id: "128", label: "128GB", price: 999 },
  { id: "256", label: "256GB", price: 1099 },
  { id: "512", label: "512GB", price: 1299 },
];

function Index() {
  const [color, setColor] = useState<(typeof COLORS)[number]>(COLORS[0]);
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Nav onOrder={() => setOpen(true)} />
      <Hero color={color} setColor={setColor} onOrder={() => setOpen(true)} />
      <Showcase finish={color.bg} />
      <Bento />
      <Specs />
      <Compare />
      <Reviews />
      <FinalCta onOrder={() => setOpen(true)} />
      <Footer />
      {open && <PreOrder color={color} setColor={setColor} onClose={() => setOpen(false)} />}
    </div>
  );
}

function Nav({ onOrder }: { onOrder: () => void }) {
  return (
    <header className="glass fixed inset-x-0 top-0 z-40 border-x-0 border-t-0">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2 font-display text-sm font-bold"><Smartphone className="h-5 w-5 text-primary" />PhoneX</a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          {[["Features", "#features"], ["Showcase", "#showcase"], ["Specs", "#specs"], ["Compare", "#compare"], ["Reviews", "#reviews"]].map(([l, h]) => (
            <a key={h} href={h} className="transition hover:text-foreground">{l}</a>
          ))}
        </nav>
        <button onClick={onOrder} className="rounded-full bg-gradient-neon px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:scale-105 hover:shadow-glow">Pre-Order</button>
      </div>
    </header>
  );
}

function Hero({ color, setColor, onOrder }: { color: (typeof COLORS)[number]; setColor: (c: (typeof COLORS)[number]) => void; onOrder: () => void }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  return (
    <section id="top" className="bg-grid relative px-5 pb-20 pt-28 md:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="text-center md:text-left animate-in fade-in slide-in-from-bottom-6 duration-700">
          <span className="glass inline-block rounded-full px-3 py-1 text-xs text-primary">New · Available Nov 2026</span>
          <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">Experience the Future: <span className="text-gradient">PhoneX Pro</span></h1>
          <p className="mt-5 text-lg text-muted-foreground">A titanium body, a 200MP camera that sees in the dark, and an AI chip that thinks ahead of you.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <button onClick={onOrder} className="rounded-full bg-gradient-neon px-7 py-3 font-semibold text-primary-foreground transition hover:scale-105 hover:shadow-glow">Pre-Order Now</button>
            <a href="#features" className="rounded-full border border-foreground/30 px-7 py-3 font-semibold transition hover:border-primary hover:text-primary">Explore Features</a>
          </div>
          <div className="mt-10">
            <p className="text-sm text-muted-foreground">Finish: <span className="text-foreground">{color.name}</span></p>
            <div className="mt-3 flex justify-center gap-3 md:justify-start">
              {COLORS.map((c) => (
                <button key={c.id} aria-label={c.name} onClick={() => setColor(c)}
                  className={`h-9 w-9 rounded-full transition hover:scale-110 ${color.id === c.id ? "ring-2 ring-primary ring-offset-4 ring-offset-background" : ""}`}
                  style={{ background: c.bg }} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center [perspective:1200px]"
          onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -18, y: ((e.clientX - r.left) / r.width - 0.5) * 22 }); }}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}>
          <div className="transition-transform duration-200" style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}>
            <div className="animate-float"><PhoneFrame finish={color.bg}><HomeScreen /></PhoneFrame></div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SCREENS = [
  { id: "camera", label: "Camera Interface", desc: "200MP Pro sensor with AI night vision.", icon: Camera, C: CameraScreen },
  { id: "gaming", label: "Gaming Mode", desc: "144 FPS with vapor-chamber cooling.", icon: Gamepad2, C: GamingScreen },
  { id: "battery", label: "Battery Saver", desc: "Adaptive saver stretches to 2 days.", icon: Battery, C: BatteryScreen },
  { id: "ai", label: "AI Assistant", desc: "Nova AI runs fully on-device.", icon: Bot, C: AIScreen },
];

function Showcase({ finish }: { finish: string }) {
  const [active, setActive] = useState(SCREENS[0]!);
  const C = active.C;
  return (
    <section id="showcase" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle kicker="Interactive" title="See it in action" />
        <div className="mt-14 grid items-center gap-12 md:grid-cols-[1fr_auto]">
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
            {SCREENS.map((s) => (
              <button key={s.id} onClick={() => setActive(s)}
                className={`glass group flex items-start gap-4 rounded-2xl p-5 text-left transition hover:-translate-y-0.5 ${active.id === s.id ? "border-primary shadow-glow" : ""}`}>
                <s.icon className={`h-6 w-6 shrink-0 ${active.id === s.id ? "text-primary" : "text-muted-foreground"}`} />
                <div><p className="font-semibold">{s.label}</p><p className="text-sm text-muted-foreground">{s.desc}</p></div>
              </button>
            ))}
          </div>
          <div className="flex justify-center">
            <PhoneFrame finish={finish}><div key={active.id} className="h-full animate-in fade-in zoom-in-95 duration-500"><C /></div></PhoneFrame>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-primary">{kicker}</p>
      <h2 className="mt-3 text-3xl font-bold md:text-5xl">{title}</h2>
    </div>
  );
}

function Bento() {
  const card = "glass group relative overflow-hidden rounded-3xl p-7 transition duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow";
  return (
    <section id="features" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle kicker="Features" title="Built beyond limits" />
        <div className="mt-14 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          <div className={`${card} md:col-span-2`}>
            <MonitorSmartphone className="h-8 w-8 text-primary transition group-hover:scale-110" />
            <h3 className="mt-6 text-2xl font-bold">Ultra-Fluid 120Hz AMOLED</h3>
            <p className="mt-2 max-w-md text-muted-foreground">6.8" LTPO display, 3000 nits peak, adaptive 1–120Hz for buttery scrolling.</p>
            <p className="mt-6 font-display text-6xl font-bold text-gradient">120Hz</p>
          </div>
          <div className={`${card} md:row-span-2`}>
            <Camera className="h-8 w-8 text-primary transition group-hover:scale-110" />
            <h3 className="mt-6 text-2xl font-bold">Next-Gen Camera System</h3>
            <p className="mt-2 text-muted-foreground">200MP main, 50MP ultra-wide, 10x periscope zoom and 8K video.</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[0, 1, 2, 3].map((i) => <div key={i} className="aspect-square rounded-full border-4 border-accent bg-screen shadow-glow" />)}
            </div>
          </div>
          <div className={card}>
            <Battery className="h-8 w-8 text-primary transition group-hover:scale-110" />
            <h3 className="mt-6 text-xl font-bold">All-Day Battery</h3>
            <p className="mt-2 text-muted-foreground">5500mAh · 80W wired · 0–100% in 30 min.</p>
          </div>
          <div className={card}>
            <Cpu className="h-8 w-8 text-primary transition group-hover:scale-110" />
            <h3 className="mt-6 text-xl font-bold">AI Processing Chip</h3>
            <p className="mt-2 text-muted-foreground">3nm X1 Neural chip, 45 TOPS of on-device intelligence.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const SPECS: Record<string, [string, string][]> = {
  Display: [["Size", '6.8" LTPO AMOLED'], ["Resolution", "3120 × 1440 (QHD+)"], ["Refresh rate", "1–120Hz adaptive"], ["Brightness", "3000 nits peak"], ["Protection", "Gorilla Glass Armor"]],
  Camera: [["Main", "200MP f/1.7, OIS"], ["Ultra-wide", "50MP, 120° FOV"], ["Telephoto", "50MP 10x periscope"], ["Front", "32MP autofocus"], ["Video", "8K@30 / 4K@120"]],
  Performance: [["Chip", "X1 Neural 3nm"], ["CPU", "8-core up to 3.6GHz"], ["RAM", "12GB LPDDR5X"], ["NPU", "45 TOPS"], ["OS", "PhoneOS 7"]],
  Battery: [["Capacity", "5500mAh"], ["Wired", "80W SuperCharge"], ["Wireless", "25W Qi2"], ["Reverse", "10W"], ["Life", "Up to 36 hrs video"]],
  Connectivity: [["Cellular", "5G mmWave + Sub-6"], ["Wi-Fi", "Wi-Fi 7"], ["Bluetooth", "5.4"], ["Other", "UWB, NFC, Satellite SOS"], ["Port", "USB-C 3.2"]],
};

function Specs() {
  const tabs = Object.keys(SPECS);
  const [tab, setTab] = useState<string>("Display");
  return (
    <section id="specs" className="px-5 py-24">
      <div className="mx-auto max-w-4xl">
        <SectionTitle kicker="Tech Specs" title="Every detail, engineered" />
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${tab === t ? "bg-primary text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}>{t}</button>
          ))}
        </div>
        <div key={tab} className="glass mt-8 divide-y divide-border rounded-3xl animate-in fade-in duration-300">
          {(SPECS[tab] ?? []).map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 px-6 py-4 text-sm md:text-base">
              <span className="text-muted-foreground">{k}</span><span className="text-right font-medium">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const MODELS = {
  standard: { name: "PhoneX", price: 799, rows: ['6.1" 120Hz OLED', "50MP dual camera", "X1 chip · 8GB RAM", "4500mAh · 45W", "Aluminum frame"] },
  pro: { name: "PhoneX Pro", price: 999, rows: ['6.8" 120Hz LTPO AMOLED', "200MP triple + 10x zoom", "X1 Neural · 12GB RAM", "5500mAh · 80W", "Titanium frame"] },
};
const ROW_LABELS = ["Display", "Camera", "Performance", "Battery", "Build"];

function Compare() {
  const [pro, setPro] = useState(true);
  const m = pro ? MODELS.pro : MODELS.standard;
  return (
    <section id="compare" className="px-5 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionTitle kicker="Compare" title="Choose your model" />
        <div className="glass mx-auto mt-10 flex w-fit rounded-full p-1">
          {[false, true].map((p) => (
            <button key={String(p)} onClick={() => setPro(p)}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition ${pro === p ? "bg-gradient-neon text-primary-foreground" : "text-muted-foreground"}`}>{p ? "Pro" : "Standard"}</button>
          ))}
        </div>
        <div key={m.name} className="glass mt-8 rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-end justify-between">
            <h3 className="text-2xl font-bold">{m.name}</h3>
            <p className="text-muted-foreground">from <span className="font-display text-2xl text-foreground">${m.price}</span></p>
          </div>
          <ul className="mt-6 space-y-3">
            {m.rows.map((r, i) => (
              <li key={i} className="flex items-center gap-3 border-t pt-3">
                <Check className="h-4 w-4 text-primary" /><span className="w-28 text-sm text-muted-foreground">{ROW_LABELS[i]}</span><span className="font-medium">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  { name: "Maya Chen", outlet: "TechPulse", rating: 5, quote: "The best smartphone camera I've tested this year. Night shots look like daylight." },
  { name: "Arjun Patel", outlet: "GadgetLab", rating: 5, quote: "That 120Hz panel is gorgeous, and battery life easily stretched to day two." },
  { name: "Lena Brooks", outlet: "The Verge Point", rating: 4, quote: "On-device AI that actually feels useful. A genuinely futuristic flagship." },
];

function Reviews() {
  return (
    <section id="reviews" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle kicker="Reviews" title="Critics are talking" />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="glass rounded-3xl p-7 transition hover:-translate-y-1 hover:shadow-glow">
              <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-star text-star" : "text-muted"}`} />)}</div>
              <blockquote className="mt-4 text-foreground/90">"{r.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-neon text-sm font-bold text-primary-foreground">{r.name.split(" ").map((n) => n[0]).join("")}</span>
                <span><span className="block font-semibold">{r.name}</span><span className="text-sm text-muted-foreground">{r.outlet}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ onOrder }: { onOrder: () => void }) {
  return (
    <section className="px-5 py-20">
      <div className="bg-grid glass mx-auto max-w-5xl rounded-[2.5rem] px-6 py-16 text-center">
        <h2 className="text-3xl font-bold md:text-5xl">The future ships <span className="text-gradient">November 2026</span></h2>
        <p className="mt-4 text-muted-foreground">Reserve yours today. Free shipping and a 2-year warranty included.</p>
        <button onClick={onOrder} className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-neon px-8 py-3 font-semibold text-primary-foreground transition hover:scale-105 hover:shadow-glow">Pre-Order Now <ChevronRight className="h-4 w-4" /></button>
      </div>
    </section>
  );
}

function PreOrder({ color, setColor, onClose }: { color: (typeof COLORS)[number]; setColor: (c: (typeof COLORS)[number]) => void; onClose: () => void }) {
  const [tier, setTier] = useState(STORAGE[1]!);
  const [qty, setQty] = useState(1);
  const [done, setDone] = useState(false);
  const total = tier.price * qty;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm animate-in fade-in" onClick={onClose}>
      <div className="glass relative w-full max-w-md rounded-3xl bg-popover p-7 animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
        <button aria-label="Close" onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        {done ? (
          <div className="py-8 text-center">
            <ShieldCheck className="mx-auto h-12 w-12 text-primary" />
            <h3 className="mt-4 text-xl font-bold">You're on the list!</h3>
            <p className="mt-2 text-muted-foreground">PhoneX Pro {tier.label} in {color.name} is reserved.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold">Pre-order PhoneX Pro</h3>
            <p className="mt-5 text-sm text-muted-foreground">Color: {color.name}</p>
            <div className="mt-2 flex gap-3">
              {COLORS.map((c) => <button key={c.id} aria-label={c.name} onClick={() => setColor(c)} className={`h-8 w-8 rounded-full ${color.id === c.id ? "ring-2 ring-primary ring-offset-2 ring-offset-popover" : ""}`} style={{ background: c.bg }} />)}
            </div>
            <p className="mt-5 text-sm text-muted-foreground">Storage</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {STORAGE.map((s) => (
                <button key={s.id} onClick={() => setTier(s)} className={`rounded-xl border p-3 text-center transition ${tier.id === s.id ? "border-primary bg-primary/10" : "hover:border-foreground/30"}`}>
                  <span className="block font-semibold">{s.label}</span><span className="text-xs text-muted-foreground">${s.price}</span>
                </button>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Quantity</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-8 w-8 rounded-full border">−</button>
                <span className="w-4 text-center">{qty}</span>
                <button onClick={() => setQty(Math.min(5, qty + 1))} className="h-8 w-8 rounded-full border">+</button>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between border-t pt-5">
              <span className="text-muted-foreground">Total</span>
              <span className="font-display text-2xl">${total.toLocaleString()}</span>
            </div>
            <button onClick={() => setDone(true)} className="mt-6 w-full rounded-full bg-gradient-neon py-3 font-semibold text-primary-foreground transition hover:shadow-glow">Reserve Now</button>
          </>
        )}
      </div>
    </div>
  );
}

function Footer() {
  const [sent, setSent] = useState(false);
  return (
    <footer className="border-t px-5 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="flex items-center gap-2 font-display font-bold"><Smartphone className="h-5 w-5 text-primary" />PhoneX</p>
          <p className="mt-3 text-sm text-muted-foreground">Get launch news and exclusive offers.</p>
          <form className="mt-4 flex max-w-sm gap-2" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <input required type="email" placeholder="you@email.com" className="flex-1 rounded-full border bg-input/20 px-4 py-2 text-sm outline-none focus:border-primary" />
            <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">{sent ? "Subscribed ✓" : "Subscribe"}</button>
          </form>
          <div className="mt-6 flex gap-4 text-muted-foreground">
            {[Twitter, Instagram, Youtube, Facebook].map((I, i) => <a key={i} href="#" aria-label="social" className="transition hover:text-primary"><I className="h-5 w-5" /></a>)}
          </div>
        </div>
        <div><p className="font-semibold">Support</p><ul className="mt-3 space-y-2 text-sm text-muted-foreground">{["Help Center", "Warranty", "Repairs", "Contact"].map((l) => <li key={l}><a href="#" className="hover:text-foreground">{l}</a></li>)}</ul></div>
        <div><p className="font-semibold">Company</p><ul className="mt-3 space-y-2 text-sm text-muted-foreground">{["About", "Privacy", "Terms", "Careers"].map((l) => <li key={l}><a href="#" className="hover:text-foreground">{l}</a></li>)}</ul></div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl text-xs text-muted-foreground">© 2026 PhoneX Inc. All rights reserved.</p>
    </footer>
  );
}

import { useEffect, useRef, useState } from "react";
import cam01 from "@/assets/cam-01.jpg";
import cam02 from "@/assets/cam-02.jpg";

/* ---------------- shared chrome ---------------- */

function Deck({
  index,
  label,
  title,
  blurb,
  children,
  hint,
}: {
  index: string;
  label: string;
  title: string;
  blurb: string;
  children: React.ReactNode;
  hint: string;
}) {
  return (
    <article className="rainbow-edge rounded-xl p-px">
      <div className="relative overflow-hidden rounded-[11px] bg-void/95 p-4 sm:p-6">
        <div className="rainbow-bars absolute inset-x-0 top-0 h-[2px] opacity-70" />
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-fog/40">
              {index} · {label}
            </p>
            <h3 className="rainbow-text mt-2 font-crt text-3xl uppercase leading-none sm:text-4xl">
              {title}
            </h3>
          </div>
          <span className="shrink-0 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-fog/50 ring-1 ring-fog/15">
            live
          </span>
        </div>
        <p className="mb-5 max-w-[46ch] text-sm leading-relaxed text-fog/55">
          {blurb}
        </p>
        {children}
        <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-fog/35">
          {hint}
        </p>
      </div>
    </article>
  );
}

function Btn({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-md px-3 py-2 text-[10px] uppercase tracking-[0.25em] transition-colors duration-200 ${
        active
          ? "bg-sick text-void ring-1 ring-sick/50"
          : "text-fog/60 ring-1 ring-fog/15 hover:text-fog"
      }`}
    >
      {children}
    </button>
  );
}

function Meter({ value, caption }: { value: number; caption: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] uppercase tracking-[0.25em] text-fog/40">
        {caption}
      </span>
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-fog/10">
        <div
          className="rainbow-bars h-full transition-[width] duration-500"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
      <span className="font-crt text-base text-fog/60">
        {Math.round(value)}%
      </span>
    </div>
  );
}

/* ---------------- 1. camera ---------------- */

function CameraDemo() {
  const [night, setNight] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [rec, setRec] = useState(true);
  const [tape, setTape] = useState(0);
  const [battery, setBattery] = useState(84);

  useEffect(() => {
    if (!rec) return;
    const id = setInterval(() => {
      setTape((t) => t + 1);
      setBattery((b) => (b <= 2 ? 84 : b - (night ? 0.9 : 0.35)));
    }, 1000);
    return () => clearInterval(id);
  }, [rec, night]);

  const mm = String(Math.floor(tape / 60)).padStart(2, "0");
  const ss = String(tape % 60).padStart(2, "0");

  return (
    <Deck
      index="A"
      label="camera system"
      title="Camcorder"
      blurb="Night vision reveals what the corridor hides — and drains the cell twice as fast. Punch in to read the far end of the hall."
      hint="try — night vision · zoom · pause the tape"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-black ring-1 ring-fog/10">
        <img
          src={cam01}
          alt="Camcorder viewfinder looking down an empty corridor"
          className="absolute inset-0 size-full object-cover transition-all duration-700"
          style={{
            transform: zoom ? "scale(1.7)" : "scale(1.02)",
            filter: night
              ? "grayscale(1) brightness(1.35) contrast(1.25) sepia(1) hue-rotate(75deg) saturate(5)"
              : "brightness(0.85) contrast(1.05) saturate(0.7)",
          }}
        />
        <div className="scanline pointer-events-none absolute inset-0 opacity-30" />
        <div className="vignette pointer-events-none absolute inset-0 opacity-80" />
        {night && (
          <div className="pointer-events-none absolute inset-0 bg-[oklch(0.8_0.2_150_/_10%)] mix-blend-screen" />
        )}

        {/* viewfinder HUD */}
        <div className="pointer-events-none absolute inset-0 p-3 font-crt text-lg text-sick/90 sm:p-4 sm:text-xl">
          <div className="flex items-start justify-between">
            <span className="flex items-center gap-2">
              <span
                className={`size-2 rounded-full bg-[oklch(0.65_0.24_25)] ${rec ? "animate-pulse" : "opacity-30"}`}
              />
              {rec ? "REC" : "PAUSE"}
            </span>
            <span>{night ? "NV ON" : "NV OFF"}</span>
          </div>
          <div className="absolute inset-x-3 bottom-3 flex items-end justify-between sm:inset-x-4 sm:bottom-4">
            <span>
              {mm}:{ss}:00
            </span>
            <span>{zoom ? "×1.7" : "×1.0"}</span>
          </div>
          {/* corner brackets */}
          <span className="absolute left-6 top-1/2 size-5 -translate-y-1/2 border-b-2 border-l-2 border-sick/50" />
          <span className="absolute right-6 top-1/2 size-5 -translate-y-1/2 border-b-2 border-r-2 border-sick/50" />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Btn active={night} onClick={() => setNight((v) => !v)}>
          Night vision
        </Btn>
        <Btn active={zoom} onClick={() => setZoom((v) => !v)}>
          Zoom
        </Btn>
        <Btn active={rec} onClick={() => setRec((v) => !v)}>
          {rec ? "Recording" : "Paused"}
        </Btn>
        <div className="ml-auto">
          <Meter value={battery} caption="cell" />
        </div>
      </div>
    </Deck>
  );
}

/* ---------------- 2. flashlight ---------------- */

function FlashlightDemo() {
  const [pos, setPos] = useState({ x: 50, y: 55 });
  const [on, setOn] = useState(true);
  const [charge, setCharge] = useState(62);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setCharge((c) => (on ? (c <= 2 ? 62 : c - 1) : Math.min(62, c + 0.6)));
    }, 900);
    return () => clearInterval(id);
  }, [on]);

  const move = (cx: number, cy: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({
      x: ((cx - r.left) / r.width) * 100,
      y: ((cy - r.top) / r.height) * 100,
    });
  };

  const radius = on ? (charge < 20 ? 90 : 150) : 0;
  const mask = `radial-gradient(circle ${radius}px at ${pos.x}% ${pos.y}%, #000 0%, rgba(0,0,0,0.75) 55%, transparent 78%)`;
  const nearMark =
    Math.hypot(pos.x - 72, pos.y - 42) < 16 && on && charge > 5;

  return (
    <Deck
      index="B"
      label="flashlight"
      title="Beam"
      blurb="A dying bulb and a corridor that only exists where you point it. Something was scratched into the wall on the right."
      hint="try — move your cursor · tap the frame to kill the light"
    >
      <div
        ref={ref}
        onPointerMove={(e) => move(e.clientX, e.clientY)}
        onClick={() => setOn((v) => !v)}
        className="relative aspect-[16/10] cursor-crosshair touch-none overflow-hidden rounded-lg bg-black ring-1 ring-fog/10"
      >
        <img
          src={cam02}
          alt="Dark doorway at the end of a Backrooms hallway"
          className="absolute inset-0 size-full object-cover opacity-[0.07] grayscale"
        />
        <div
          className="absolute inset-0 transition-opacity duration-200"
          style={{
            WebkitMaskImage: mask,
            maskImage: mask,
            opacity: on ? 1 : 0,
            animation: on && charge < 20 ? "bulb 1.4s infinite" : undefined,
          }}
        >
          <img
            src={cam02}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover"
            style={{ filter: "brightness(1.25) contrast(1.1) saturate(0.85)" }}
          />
          <div className="absolute inset-0 bg-[oklch(0.9_0.09_95_/_12%)] mix-blend-screen" />
          <span
            className={`absolute left-[66%] top-[36%] font-crt text-2xl transition-opacity duration-300 ${
              nearMark ? "rgb-split opacity-100" : "opacity-40"
            } text-sick`}
          >
            NOT ALONE
          </span>
        </div>
        <div className="scanline pointer-events-none absolute inset-0 opacity-25" />
        <div className="vignette pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-end justify-between font-crt text-lg text-sick/80 sm:text-xl">
          <span>{on ? (charge < 20 ? "BULB FAILING" : "LIGHT ON") : "DARK"}</span>
          <span>{Math.round(pos.x)}·{Math.round(pos.y)}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Btn active={on} onClick={() => setOn((v) => !v)}>
          {on ? "Light on" : "Light off"}
        </Btn>
        <div className="ml-auto">
          <Meter value={(charge / 62) * 100} caption="charge" />
        </div>
      </div>
    </Deck>
  );
}

/* ---------------- 3. interactions ---------------- */

type Prop = { id: string; label: string; x: number; y: number };

function InteractionsDemo() {
  const [props_, setProps] = useState<Prop[]>([
    { id: "card", label: "KEYCARD", x: 18, y: 66 },
    { id: "crate", label: "CRATE", x: 44, y: 78 },
    { id: "tape", label: "TAPE 07", x: 30, y: 30 },
  ]);
  const [drag, setDrag] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState("awaiting input");
  const ref = useRef<HTMLDivElement>(null);

  const reader = { x: 78, y: 40 };

  const move = (cx: number, cy: number) => {
    if (!drag) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = Math.max(6, Math.min(94, ((cx - r.left) / r.width) * 100));
    const y = Math.max(10, Math.min(92, ((cy - r.top) / r.height) * 100));
    setProps((p) => p.map((o) => (o.id === drag ? { ...o, x, y } : o)));
    if (drag === "card" && Math.hypot(x - reader.x, y - reader.y) < 12) {
      setOpen(true);
      setLog("keycard accepted — door released");
    }
  };

  return (
    <Deck
      index="C"
      label="interactions system"
      title="Hands"
      blurb="Objects have weight and stay where you drop them. Drag the keycard to the reader and the door lets go — no prompt, no cutscene."
      hint="try — drag the props · drop the keycard on the reader"
    >
      <div
        ref={ref}
        onPointerMove={(e) => move(e.clientX, e.clientY)}
        onPointerUp={() => setDrag(null)}
        onPointerLeave={() => setDrag(null)}
        className="relative aspect-[16/10] touch-none overflow-hidden rounded-lg bg-[oklch(0.19_0.02_95)] ring-1 ring-fog/10"
      >
        {/* room */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0_58px,oklch(0.77_0.015_95_/_6%)_58px_59px)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[oklch(0.16_0.02_60)]" />

        {/* door */}
        <div className="absolute right-[6%] top-[14%] h-[62%] w-[18%] overflow-hidden rounded-sm ring-1 ring-fog/20">
          <div
            className="absolute inset-0 bg-[oklch(0.25_0.02_60)] transition-transform duration-[900ms] ease-out"
            style={{ transform: open ? "translateX(-96%)" : "translateX(0)" }}
          />
          {open && (
            <div className="rainbow-edge absolute inset-0 -z-10 opacity-80" />
          )}
        </div>

        {/* reader */}
        <div
          className="absolute size-9 -translate-x-1/2 -translate-y-1/2 rounded-md ring-1 transition-colors duration-300"
          style={{
            left: `${reader.x}%`,
            top: `${reader.y}%`,
            boxShadow: open ? "0 0 22px oklch(0.8 0.18 155 / 45%)" : undefined,
          }}
        >
          <div
            className={`grid size-full place-items-center rounded-md font-crt text-lg ${
              open
                ? "bg-[oklch(0.8_0.18_155_/_20%)] text-[oklch(0.85_0.18_155)]"
                : "bg-fog/5 text-sick/70"
            }`}
          >
            {open ? "✓" : "◉"}
          </div>
        </div>

        {/* props */}
        {props_.map((p) => (
          <button
            key={p.id}
            type="button"
            onPointerDown={(e) => {
              e.preventDefault();
              setDrag(p.id);
              setLog(`grabbed ${p.label.toLowerCase()}`);
            }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-md bg-void/80 px-3 py-2 font-crt text-base uppercase text-fog/80 ring-1 transition-shadow duration-200 active:cursor-grabbing ${
              drag === p.id
                ? "ring-sick shadow-[0_0_24px_oklch(0.79_0.14_95_/_35%)]"
                : "ring-fog/25 hover:ring-sick/60"
            }`}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            {p.label}
          </button>
        ))}

        <div className="scanline pointer-events-none absolute inset-0 opacity-20" />
        <div className="vignette pointer-events-none absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute inset-x-3 top-3 flex justify-between font-crt text-lg text-sick/80">
          <span>[ HOLD + DRAG ]</span>
          <span>{open ? "DOOR: OPEN" : "DOOR: LOCKED"}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Btn
          onClick={() => {
            setOpen(false);
            setLog("room reset");
            setProps([
              { id: "card", label: "KEYCARD", x: 18, y: 66 },
              { id: "crate", label: "CRATE", x: 44, y: 78 },
              { id: "tape", label: "TAPE 07", x: 30, y: 30 },
            ]);
          }}
        >
          Reset room
        </Btn>
        <span className="font-crt text-base text-fog/50">&gt; {log}</span>
      </div>
    </Deck>
  );
}

/* ---------------- section ---------------- */

export function SystemDemos() {
  return (
    <section
      id="demos"
      className="border-t border-fog/10 px-5 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-sick">
              02 / Playable Modules
            </p>
            <h2 className="rainbow-text font-crt text-4xl uppercase leading-none sm:text-6xl">
              Try the systems
            </h2>
            <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-fog/55">
              Three of the game's core systems, running right here in the
              browser. No download, no install — just the gear you'll be
              holding when the lights go.
            </p>
          </div>
          <div className="rainbow-bars h-1 w-40 rounded-full opacity-70" />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <CameraDemo />
          <FlashlightDemo />
          <div className="lg:col-span-2">
            <InteractionsDemo />
          </div>
        </div>
      </div>
    </section>
  );
}

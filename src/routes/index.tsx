import { createFileRoute } from "@tanstack/react-router";
import cam01 from "@/assets/cam-01.jpg";
import cam02 from "@/assets/cam-02.jpg";
import cam03 from "@/assets/cam-03.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lost Minds — A Backrooms Horror Game" },
      {
        name: "description",
        content:
          "You fell through the floor of a place that was never meant to be empty. Lost Minds is a survival-horror descent into the Backrooms. Wishlist now.",
      },
      { property: "og:title", content: "Lost Minds — A Backrooms Horror Game" },
      {
        property: "og:description",
        content:
          "The hum won't stop. The rooms keep repeating. Find the door before it finds a mind to keep.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Lost Minds — A Backrooms Horror Game" },
      {
        name: "twitter:description",
        content:
          "The hum won't stop. The rooms keep repeating. Find the door before it finds a mind to keep.",
      },
    ],
  }),
  component: Index,
});

const FRAMES = [
  {
    src: cam01,
    cam: "CAM 01",
    caption: "Level 0 — intake corridor. Nothing moves. Something watches.",
  },

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-void font-mono text-fog">
      {/* fixed tape overlays */}
      <div className="scanline pointer-events-none fixed inset-0 z-30 opacity-40" />
      <div className="vignette pointer-events-none fixed inset-0 z-30" />
      <div
        className="grain pointer-events-none fixed -inset-[20%] z-20 opacity-[0.05] mix-blend-screen"
        style={{ animation: "grain-shift 0.6s steps(4) infinite" }}
      />
      <div
        className="pointer-events-none fixed left-0 right-0 top-0 z-30 h-24 bg-gradient-to-b from-sick/10 to-transparent"
        style={{ animation: "scan 7s linear infinite" }}
      />

      <div className="relative z-10">
        {/* HERO */}
        <section className="relative flex min-h-screen flex-col justify-between px-5 py-6 sm:px-10 sm:py-8">
          <div className="flex items-start justify-between text-[11px] uppercase tracking-[0.3em] text-sickdim sm:text-xs">
            <span className="flex items-center gap-2">
              <span className="size-2 animate-pulse rounded-full bg-sick" />
              REC
            </span>
            <div className="text-right leading-relaxed">
              <div>TAP-07 // ARCHIVE 3</div>
              <div>
                LEVEL 0 <span className="text-fog/40">/</span> UNSTABLE
              </div>
            </div>
          </div>

          <div
            className="mx-auto w-full max-w-3xl py-20 text-center"
            style={{ animation: "flick 6s infinite" }}
          >
            <p className="mb-6 text-xs uppercase tracking-[0.4em] text-fog/50 sm:text-sm">
              recovered tape · do not distribute
            </p>
            <h1 className="crt-glow font-crt text-[clamp(4rem,16vw,11rem)] leading-none tracking-tight text-sick">
              LOST MINDS
            </h1>
            <p className="mx-auto mt-6 max-w-[42ch] text-pretty text-sm leading-relaxed text-fog/70 sm:text-base">
              You fell through the floor of a place that was never meant to be
              empty. The hum won't stop. The rooms keep repeating. Find the
              door before it finds a mind to keep.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#wishlist"
                className="inline-flex items-center gap-2 rounded-md bg-sick px-7 py-3 text-sm font-semibold uppercase tracking-widest text-void ring-1 ring-sick/40 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span className="shrink-0">▸</span> Wishlist on Steam
              </a>
              <a
                href="#frames"
                className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm uppercase tracking-widest text-fog/70 ring-1 ring-fog/15 transition-transform duration-300 hover:-translate-y-0.5"
              >
                Recovered frames
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.25em] text-fog/40 sm:text-xs">
            <span>SP 04:00:00</span>
            <span>Ch 03 · Cam B</span>
            <span>03:12 AM</span>
          </div>
        </section>

        {/* PREMISE */}
        <section className="border-t border-fog/10 bg-void/80 px-5 py-20 sm:px-10 sm:py-28">
          <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2 sm:gap-16">
            <div className="self-center">
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-sick">
                01 / The Premise
              </p>
              <h2 className="max-w-[24ch] text-3xl font-medium leading-tight text-balance text-fog sm:text-4xl">
                A corridor that was never meant to be seen empty.
              </h2>
            </div>
            <div className="space-y-5 self-center text-pretty text-sm leading-relaxed text-fog/60 sm:text-base">
              <p>
                There is no exit on the map. There is only the hum of the
                fluorescents, the smell of old carpet, and the slow certainty
                that the walls are listening.
              </p>
              <p>
                Walk far enough and the layout begins to remember you. Lost
                Minds turns that repetition into the enemy — every identical
                room is a wrong turn you almost took.
              </p>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section
          id="frames"
          className="border-t border-fog/10 px-5 py-20 sm:px-10 sm:py-28"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-end justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-sick">
                02 / Found Footage
              </p>
              <p className="text-[11px] uppercase tracking-widest text-fog/40">
                recovering frames…
              </p>
            </div>
            <div
              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
              style={{ animation: "track 5s ease-in-out infinite" }}
            >
              {FRAMES.map((frame) => (
                <div key={frame.cam} className="relative">
                  <img
                    src={frame.src}
                    alt={frame.caption}
                    width={1088}
                    height={608}
                    loading="lazy"
                    className="aspect-[16/9] w-full rounded-md object-cover outline-1 -outline-offset-1 outline-black/5"
                  />
                  <span className="absolute left-2 top-2 text-[10px] tracking-widest text-sick/70">
                    {frame.cam}
                  </span>
                  <p className="mt-2 text-[10px] uppercase leading-relaxed tracking-widest text-fog/35">
                    {frame.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FIELD NOTES */}
        <section className="border-t border-fog/10 px-5 py-20 sm:px-10 sm:py-28">
          <div className="mx-auto max-w-4xl">
            <p className="mb-12 text-xs uppercase tracking-[0.3em] text-sick">
              03 / Field Notes
            </p>
            <div className="space-y-px">
              {NOTES.map((note) => (
                <div
                  key={note.letter}
                  className={`grid grid-cols-[auto_1fr] gap-5 border-t border-fog/10 py-6 sm:grid-cols-[64px_1fr_2fr] ${
                    note.letter === "C" ? "border-b" : ""
                  }`}
                >
                  <span className="text-2xl font-medium text-sickdim">
                    {note.letter}
                  </span>
                  <h3 className="self-center text-base font-medium text-fog">
                    {note.title}
                  </h3>
                  <p className="self-center text-sm leading-relaxed text-fog/55 sm:pl-4">
                    {note.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          id="wishlist"
          className="border-t border-fog/10 px-5 py-24 text-center sm:px-10 sm:py-32"
        >
          <div className="mx-auto max-w-2xl">
            <p className="font-crt text-4xl leading-tight text-fog/60 sm:text-5xl">
              the hum is still on.
            </p>
            <p className="mx-auto mt-6 max-w-[40ch] text-pretty text-sm leading-relaxed text-fog/50 sm:text-base">
              Join the archive before the signal degrades. Wishlist Lost Minds
              and we'll send the next tape when it's found.
            </p>
            <a
              href="#wishlist"
              className="mt-10 inline-flex items-center gap-2 rounded-md bg-sick px-8 py-4 text-sm font-semibold uppercase tracking-widest text-void ring-1 ring-sick/40 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="shrink-0">▸</span> Wishlist now
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-fog/10 px-5 py-8 sm:px-10">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 text-[10px] uppercase tracking-[0.25em] text-fog/35 sm:flex-row sm:justify-between">
            <span>LOST MINDS · a backrooms experience</span>
            <span>© 2026 Nullframe Studio</span>
            <span>End of tape</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

const NOTES = [
  {
    letter: "A",
    title: "Institutional Hum",
    body: "Every room carries the same fluorescent drone. The audio shifts as you lose your footing — but only if you're paying attention.",
  },
  {
    letter: "B",
    title: "The Layout Remembers",
    body: "Turn a corner you've walked before and the corridor changes one thing. Small. Wrong. The map will never catch up to it.",
  },
  {
    letter: "C",
    title: "No Safe Rooms",
    body: "There is no pause that the tape respects. What you carry in stays with you. What you leave behind may not come back the same.",
  },
];

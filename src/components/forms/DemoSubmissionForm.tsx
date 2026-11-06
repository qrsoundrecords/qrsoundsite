import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, TriangleAlert } from "lucide-react";
import { isEmail, isUrl, DEMO_GENRES } from "@/lib/validation";

type State = "idle" | "loading" | "success" | "error" | "not-configured";

const ENDPOINT = "/api/demo-submission";

const initial = {
  artist: "",
  email: "",
  title: "",
  genre: "",
  link: "",
  message: "",
  consent: true,
  website: "", // honeypot — bots fill this, humans never see it
};

export default function DemoSubmissionForm() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<State>("idle");
  const [serverMsg, setServerMsg] = useState("");

  const set = (k: keyof typeof initial, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.artist.trim()) e.artist = "Artist name is required";
    if (!isEmail(form.email)) e.email = "Enter a valid email address";
    if (!form.title.trim()) e.title = "Track title is required";
    if (!form.genre) e.genre = "Select a genre";
    if (!isUrl(form.link)) e.link = "Enter a valid link (https://…)";
    if (!form.consent) e.consent = "Consent is required to submit the demo";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setState("loading");
    setServerMsg("");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artistName: form.artist,
          email: form.email,
          trackTitle: form.title,
          genre: form.genre,
          demoLink: form.link,
          message: form.message,
        }),
      });
      if (res.ok) {
        setState("success");
        setForm(initial);
      } else if (res.status === 501 || res.status === 503 || res.status === 404) {
        const data = await res.json().catch(() => null);
        setState("not-configured");
        setServerMsg(
          data?.error ??
            "The demo-submission endpoint is not deployed yet (HTTP 404). Nothing was sent — deploy the /api/demo-submission function and set the email variables (see README → Email setup).",
        );
      } else {
        setState("error");
        setServerMsg("The submission service returned an error. Please try again later.");
      }
    } catch {
      setState("not-configured");
      setServerMsg(
        "The submission endpoint is not reachable in this environment. The demo could not be sent — configure /api/demo-submission (see README → Email setup). Nothing was delivered yet.",
      );
    }
  };

  const field = (
    key: keyof typeof initial,
    label: string,
    opts: { required?: boolean; type?: string; placeholder?: string } = {},
  ) => (
    <label className="block">
      <span className="mono mb-2 block text-[10px] uppercase tracking-[0.2em] text-faint">
        {label} {opts.required !== false && <span className="text-pink">*</span>}
      </span>
      <input
        type={opts.type ?? "text"}
        value={form[key] as string}
        onChange={(e) => set(key, e.target.value)}
        placeholder={opts.placeholder}
        autoComplete={key === "email" ? "email" : "off"}
        aria-invalid={Boolean(errors[key])}
        className={`w-full border bg-bg2 px-4 py-3.5 text-[15px] text-ink placeholder:text-faint/70 focus-visible:outline ${
          errors[key] ? "border-red/70" : "border-line focus:border-line2"
        }`}
      />
      {errors[key] && (
        <span className="mono mt-1.5 block text-[10px] uppercase tracking-[0.12em] text-red">{errors[key]}</span>
      )}
    </label>
  );

  return (
    <div>
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 border border-line bg-bg2 p-10 text-center"
          >
            <span className="flex h-12 w-12 items-center justify-center border border-pink/60 text-pink">
              <Check size={20} strokeWidth={1.5} />
            </span>
            <p className="display text-xl font-semibold">Demo received.</p>
            <p className="mono max-w-[420px] text-[11px] uppercase leading-[1.8] tracking-[0.16em] text-mute">
              Thank you — your submission arrived at the label inbox. We listen to
              everything and reply when we feel the frequency.
            </p>
            <button onClick={() => setState("idle")} className="btn btn-ghost mt-2">
              Submit another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={submit}
            noValidate
            className="space-y-6"
          >
            {/* honeypot */}
            <input
              type="text"
              value={form.website}
              onChange={(e) => set("website", e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="grid gap-6 md:grid-cols-2">
              {field("artist", "Artist name", { placeholder: "Your project / alias" })}
              {field("email", "Email", { type: "email", placeholder: "you@example.com" })}
              {field("title", "Track title", { placeholder: "Track or EP title" })}

              {/* genre select */}
              <label className="block">
                <span className="mono mb-2 block text-[10px] uppercase tracking-[0.2em] text-faint">
                  Genre <span className="text-pink">*</span>
                </span>
                <select
                  value={form.genre}
                  onChange={(e) => set("genre", e.target.value)}
                  aria-invalid={Boolean(errors.genre)}
                  className={`w-full border bg-bg2 px-4 py-3.5 text-[15px] text-ink ${errors.genre ? "border-red/70" : "border-line focus:border-line2"}`}
                >
                  <option value="">Select genre…</option>
                  {DEMO_GENRES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                {errors.genre && (
                  <span className="mono mt-1.5 block text-[10px] uppercase tracking-[0.12em] text-red">{errors.genre}</span>
                )}
              </label>
            </div>

            {field("link", "Demo link", {
              placeholder: "SoundCloud / Dropbox / Google Drive / WeTransfer URL",
            })}
            <p className="mono -mt-3 text-[10px] leading-[1.7] tracking-[0.08em] text-faint">
              Prefer links over uploads — unlimited streaming services work best.
            </p>

            {/* message */}
            <label className="block">
              <span className="mono mb-2 block text-[10px] uppercase tracking-[0.2em] text-faint">
                Message <span className="text-faint/60">(optional)</span>
              </span>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder="Tell us about the music…"
                className="w-full resize-y border border-line bg-bg2 px-4 py-3.5 text-[15px] text-ink placeholder:text-faint/70 focus-visible:outline"
              />
            </label>

            {/* consent */}
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => set("consent", e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-pink"
              />
              <span className="text-[13px] leading-relaxed text-mute">
                I agree that my email address and demo materials may be stored and
                processed for the purpose of reviewing this submission.
              </span>
            </label>
            {errors.consent && (
              <span className="mono block text-[10px] uppercase tracking-[0.12em] text-red">{errors.consent}</span>
            )}

            {(state === "not-configured" || state === "error") && (
              <div
                role="alert"
                className="flex items-start gap-3 border border-red/40 bg-red/5 p-4 text-[13px] text-ink"
              >
                <TriangleAlert size={16} className="mt-0.5 shrink-0 text-red" />
                <span>{serverMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={state === "loading"}
              className="btn btn-solid w-full justify-center disabled:opacity-60 md:w-auto"
            >
              {state === "loading" ? (
                <>
                  <Loader2 size={14} className="motion-safe:animate-spin" /> Sending…
                </>
              ) : (
                "Submit your demo"
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

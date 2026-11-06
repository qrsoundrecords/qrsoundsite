/**
 * Vercel serverless function: POST /api/demo-submission
 * Delivers demo submissions to the label inbox via Resend.
 *
 * Setup (see README → Email setup):
 *   RESEND_API_KEY   — https://resend.com/api-keys
 *   CONTACT_EMAIL    — label inbox, e.g. qrsoundrecords@gmail.com
 *   FROM_EMAIL       — verified Resend sender, e.g. "QR Sound <demos@domain.com>"
 *
 * Return codes used by the frontend form:
 *   200 — delivered
 *   503 — endpoint reachable but e-mail not configured (shows "not configured")
 *   500 — delivery error
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS for dev servers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const CONTACT_EMAIL = process.env.CONTACT_EMAIL;
  const FROM_EMAIL = process.env.FROM_EMAIL;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  if (!CONTACT_EMAIL || !FROM_EMAIL || !RESEND_API_KEY) {
    return res.status(503).json({
      error:
        "Email delivery is not configured yet. Set RESEND_API_KEY, CONTACT_EMAIL and FROM_EMAIL on the server (see README → Email setup).",
    });
  }

  /* validation */
  const { artistName, email, trackTitle, genre, demoLink, message } = req.body ?? {};
  const problems: string[] = [];
  if (typeof artistName !== "string" || !artistName.trim()) problems.push("artistName");
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) problems.push("email");
  if (typeof trackTitle !== "string" || !trackTitle.trim()) problems.push("trackTitle");
  if (!genre) problems.push("genre");
  if (typeof demoLink !== "string" || !/^https?:\/\//i.test(demoLink)) problems.push("demoLink");
  if (problems.length) {
    return res.status(422).json({ error: `Invalid fields: ${problems.join(", ")}` });
  }

  const escape = (s: string) =>
    String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const html = `
    <div style="font-family:ui-monospace,monospace;font-size:14px;line-height:1.7">
      <h2 style="font-family:sans-serif">New demo submission — QR Sound Records</h2>
      <p><b>Artist:</b> ${escape(artistName)}</p>
      <p><b>Email:</b> ${escape(email)}</p>
      <p><b>Track:</b> ${escape(trackTitle)}</p>
      <p><b>Genre:</b> ${escape(genre)}</p>
      <p><b>Demo link:</b> <a href="${escape(demoLink)}">${escape(demoLink)}</a></p>
      <p><b>Message:</b> ${message ? escape(message) : "—"}</p>
    </div>`;

  try {
    const send = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: `[DEMO] ${artistName} — ${trackTitle}`,
        html,
      }),
    });
    if (!send.ok) throw new Error(`Resend responded ${send.status}`);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Demo delivery failed:", err);
    return res.status(500).json({ error: "Delivery failed. Please try again later." });
  }
}

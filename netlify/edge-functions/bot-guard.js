// Blockiert bekannte Scraper- und KI-Trainings-Bots am Netlify-Edge (403),
// bevor sie die Seite ausliefern. Google, Bing & echte Besucher sind NICHT betroffen –
// es werden nur explizit gelistete User-Agents gesperrt (Allowlist-Prinzip: alles
// Unbekannte wird durchgelassen, damit Googlebot niemals versehentlich blockiert wird).

const BLOCKED_UA_PATTERNS = [
  // KI-Trainings-/Retrieval-Crawler
  /GPTBot/i,
  /ChatGPT-User/i,
  /Google-Extended/i,
  /CCBot/i,
  /ClaudeBot/i,
  /Claude-Web/i,
  /anthropic-ai/i,
  /Bytespider/i,
  /PetalBot/i,
  /Applebot-Extended/i,
  // SEO-/Marketing-Tool-Crawler ohne Mehrwert für die Seite
  /AhrefsBot/i,
  /SemrushBot/i,
  /MJ12bot/i,
  /DotBot/i,
  /BLEXBot/i,
  /SeekportBot/i,
  /DataForSeoBot/i,
  /serpstatbot/i,
  /magpie-crawler/i,
];

export default async (request, context) => {
  const ua = request.headers.get("user-agent") || "";

  if (BLOCKED_UA_PATTERNS.some((pattern) => pattern.test(ua))) {
    return new Response("Access denied", {
      status: 403,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  return context.next();
};

export const config = { path: "/*" };

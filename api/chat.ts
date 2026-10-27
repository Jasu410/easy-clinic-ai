import type { IncomingMessage, ServerResponse } from 'node:http';

type ChatBody = {
  message?: unknown;
  history?: Array<{ role?: unknown; text?: unknown }>;
};

export default async function handler(req: IncomingMessage & { body?: ChatBody }, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.statusCode = 503;
    res.end(JSON.stringify({ error: 'AI is not configured. Set GEMINI_API_KEY in your deployment environment.' }));
    return;
  }

  const body = req.body ?? await readBody(req);
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, 1000) : '';
  if (!message) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Please provide a message.' }));
    return;
  }

  if (/emergency|chest pain|cannot breathe|can't breathe|severe bleeding|suicid/i.test(message)) {
    res.statusCode = 200;
    res.end(JSON.stringify({ reply: 'If this may be an emergency, contact your local emergency number or go to the nearest emergency department now. This demo cannot assess symptoms or provide emergency care.' }));
    return;
  }

  const history = Array.isArray(body.history) ? body.history.slice(-6).map((item) => ({
    role: item?.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: typeof item?.text === 'string' ? item.text.slice(0, 1000) : '' }],
  })).filter((item) => item.parts[0].text) : [];

  const prompt = `You are the information assistant for Easy Clinic, a fictional healthcare website prototype. Explain only general, non-diagnostic health navigation and the sample site's listed services (General Practice, Women's Health, Children's Care). Never diagnose, prescribe, recommend changing medicines, or claim the fictional clinic details are real. Encourage consulting a qualified clinician for personal medical concerns. For urgent or emergency symptoms, tell the user to contact local emergency services. Do not ask for or repeat personal or sensitive medical information. Keep answers concise and clear. User message: ${message}`;

  try {
    const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: 'You are a cautious, non-diagnostic information assistant for a fictional healthcare website prototype. Do not provide medical advice or pretend sample details are real.' }] },
        contents: [...history, { role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 350 },
      }),
    });
    if (!upstream.ok) throw new Error(`Gemini request failed (${upstream.status})`);
    const data = await upstream.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
    const reply = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? '').join('').trim();
    if (!reply) throw new Error('Empty response');
    res.statusCode = 200;
    res.end(JSON.stringify({ reply }));
  } catch {
    res.statusCode = 502;
    res.end(JSON.stringify({ error: 'The AI service could not respond. Please try again.' }));
  }
}

async function readBody(req: IncomingMessage): Promise<ChatBody> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')) as ChatBody; }
  catch { return {}; }
}

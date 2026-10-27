# Easy Clinic — AI Healthcare Website Prototype

Easy Clinic is a healthcare website prototype built with React, TypeScript, and Vite. It demonstrates a responsive clinic landing page, a safety-conscious information assistant, and a clearly labelled appointment-form interaction.

> **Important:** This is a portfolio/assessment prototype, not a real clinic or medical service. Doctor profiles, clinic details, and service descriptions are sample content. The appointment form does not send, store, or book appointments. Do not enter real personal or health information.

## Features

- Responsive healthcare landing page and sample service cards.
- Chat interface with emergency-safety messaging and a fallback demo mode.
- Optional Gemini AI responses through a server-side Vercel function.
- API key kept on the server using `GEMINI_API_KEY`; never expose it in frontend code.
- Appointment-form interaction explicitly explains that no booking is made.
- Prompt documentation template and assessment video outline in `docs/`.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. The site runs without an API key; the assistant then uses a small set of safe demo responses.

## Enable live AI responses

The `/api/chat` endpoint is a Vercel serverless function. To use it:

1. Create a Gemini API key through Google AI Studio.
2. Add `GEMINI_API_KEY` in Vercel Project Settings → Environment Variables.
3. Redeploy the project.
4. Test general questions and confirm that emergency-related prompts return the safety message.

Do not put the key in `src/`, a `VITE_*` variable, GitHub, screenshots, or prompt documentation. The API route returns a service-unavailable response when the key is not configured. The Vercel API function will not run with `vite preview` alone; deploy to Vercel or run it using a compatible serverless-functions development environment.

## Build and checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Deploy to Vercel

Import the repository into Vercel and deploy using the default Vite build settings. The included `api/chat.ts` is detected as a Vercel function. Add the environment variable before testing live AI.

## Assessment evidence

- `docs/PROMPT_DOCUMENTATION.md`: fill in the actual prompts used and revisions made while working on this project. Do not claim prompts you did not use.
- `docs/VIDEO_PRESENTATION.md`: suggested structure for a 2–3 minute demo.
- `.bolt/prompt`: the prompt stored in the supplied Bolt project archive.

## Limitations

- No real appointment backend, database, email notifications, or clinic scheduling integration is included.
- The AI assistant is for general information and navigation, not diagnosis or treatment.
- The live AI route requires a valid Gemini API key and a deployment that supports Vercel functions.

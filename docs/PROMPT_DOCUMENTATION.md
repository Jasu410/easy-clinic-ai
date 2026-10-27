# AI Prompt Documentation — Easy Clinic

**Candidate:** Shaik Jasmine  
**Project:** Easy Clinic — AI Healthcare Website Prototype  
**Purpose:** Record the prompts actually used to plan, build, test, and improve the project for the AI Skills Assessment.

> Be accurate: this file is a template plus the prompt found in the supplied project archive. Add each prompt you actually submit to an AI tool, with the tool, date, result, and any changes you made. Do not present suggested prompts as historical usage unless you really used them.

## 1. Prompt present in the supplied Bolt archive

**Tool:** Bolt (as recorded in `.bolt/prompt`)  
**Prompt text:**

> For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.
>
> By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request it.
>
> Use icons from lucide-react for logos.
>
> Import project modules with the `@/` path alias, which maps to `src/` (e.g. `@/components/Foo` == `src/components/Foo`), instead of deep relative paths like `../../components/Foo`.

## 2. Additional prompts used during improvements

Fill in the table as you work. Replace the examples below with the exact prompt wording and real results from your own sessions.

| Date | AI tool | Exact prompt used | What changed after reviewing the output |
|---|---|---|---|
| 2026-10-27 | ChatGPT | “fix all” — request to review and improve the supplied Easy Clinic project | Reviewed source; added optional server-side AI endpoint, fallback assistant behavior, prototype disclaimers, documentation, and testing instructions. Build verification remains pending because dependency installation timed out in this environment. |
| YYYY-MM-DD | e.g. ChatGPT / Bolt | Paste the exact prompt you actually used | Describe what you accepted, tested, corrected, or rejected |
| YYYY-MM-DD | e.g. ChatGPT / Bolt | Paste the follow-up/revision prompt actually used | Explain how the revision improved the result |

## 3. Prompt refinement notes

For each significant revision, explain:

1. What was missing or incorrect in the first result?
2. What specific instruction did you add or clarify?
3. How did you test the new result?
4. What limitations remain?

## 4. Verification performed

Only mark an item complete after personally testing it.

- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] Test assistant fallback without `GEMINI_API_KEY`
- [ ] Test live assistant after configuring the server-side key
- [ ] Test emergency-safety response
- [ ] Test appointment form and confirm it clearly says no booking is sent
- [ ] Test mobile layout and keyboard navigation
- [ ] Confirm no secrets or real patient data are included in the repository

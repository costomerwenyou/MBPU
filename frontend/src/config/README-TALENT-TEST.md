# MB Talent Test 2027 Announcement Components

This module provides the **MB Talent Test 2027** announcement system for **Maganur Basappa PU Science College (Davanagere, Karnataka)** built with Next.js (App Router), React, TypeScript (strict mode), and Tailwind CSS.

## Architecture

1. **`src/config/talentTest.ts`**
   - Single source of truth containing all text copy, dates, registration URL, facts, and prize details.
   - Fully typed (`TalentTestConfig`) with strict read-only properties.
   - Zero hardcoded text in components.

2. **`src/components/TalentTestHero.tsx`**
   - Responsive hero banner card placed on the home page.
   - Semantic `<section id={talentTestConfig.anchorId}>` with `scroll-mt-24` for smooth scrolling below the fixed navigation bar.
   - Left column: Target student chip, headline, subtext, primary CTA button, and 3 quick facts.
   - Right column: Navy `#0b1f44` prize card displaying `₹10,000` in gold `#ffc233` with live countdown (Days, Hrs, Min, Sec).
   - Prevents SSR hydration mismatch by rendering `"--"` on the server and synchronizing once mounted.
   - Cleans up `setInterval` on unmount and transitions to *"Test day is here"* when the test begins.

3. **`src/components/TalentTestSideTab.tsx`**
   - Persistent floating side tab pinned to the right screen edge (`top: 50%`, `translateY(-50%)`).
   - Uses `writingMode: "vertical-rl"` with a gold "NEW" indicator chip.
   - **Smart Scroll Behavior**:
     - On the home page: stays hidden while the hero banner is visible (via `IntersectionObserver`), then smoothly slides in once the user scrolls past.
     - On all other pages: stays visible and seamlessly navigates to `/#talent-test`.
     - Automatically hides once the test date and time has passed.
   - Mobile optimized (40px width, safe-area padding `env(safe-area-inset-right)`).
   - Respects `prefers-reduced-motion` with simple fade transitions.

4. **Integration Points**:
   - `src/app/page.tsx`: Mounts `<TalentTestHero />` directly on the home page.
   - `src/app/layout.tsx`: Mounts `<TalentTestSideTab />` globally inside `<Providers>`.

---

## How to Edit the Content

Open `src/config/talentTest.ts` to edit any information:

```typescript
export const talentTestConfig: TalentTestConfig = {
  anchorId: "talent-test",
  testDate: "2026-12-13T10:00:00+05:30", // Sunday, 13 December 2026, 10:00 AM IST
  registerHref: "tel:+919180602860",     // Or paste your Google Form / online portal URL
  chip: "For 10th students",
  headline: "Show what you know. Win ₹10,000.",
  subtext: "Take the MB Talent Test and compete for cash prizes and scholarships at MB PU Science College.",
  buttonLabel: "Register now",
  facts: [
    { value: "60", label: "questions" },
    { value: "60 min", label: "OMR based" },
    { value: "4 marks", label: "per correct answer" },
  ],
  prize: {
    chip: "Top 10 students",
    amount: "₹10,000",
    caption: "cash prize and scholarships",
  },
  tabLabel: "Talent Test 2027 · Register",
};
```

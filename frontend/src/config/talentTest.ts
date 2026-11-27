export interface TalentTestFact {
  readonly value: string;
  readonly label: string;
}

export interface TalentTestPrize {
  readonly chip: string;
  readonly amount: string;
  readonly caption: string;
}

export interface TalentTestConfig {
  readonly anchorId: string;
  readonly pagePath: string;
  readonly testDate: string;
  readonly registerHref: string;
  readonly chip: string;
  readonly headline: string;
  readonly subtext: string;
  readonly buttonLabel: string;
  readonly facts: readonly TalentTestFact[];
  readonly prize: TalentTestPrize;
  readonly tabLabel: string;
  readonly activeCountdownHeading: string;
  readonly expiredCountdownHeading: string;
  readonly sideTabAriaLabel: string;
}

/**
 * MB Talent Test 2027 Central Configuration
 * All test copy, schedules, links, and prize metrics are configured here.
 */
export const talentTestConfig: TalentTestConfig = {
  anchorId: "talent-test",
  pagePath: "/talent-test",
  testDate: "2026-12-13T10:00:00+05:30", // Sunday, 13 December 2026, 10:00 AM IST
  registerHref: "https://forms.gle/Pecahxr1MAiJoXmv6", // online registration form 
  chip: "For 10th students",
  headline: "We Care For Results. Win ₹10,000.",
  subtext:
    "Take the MB Talent Test and compete for cash prizes and scholarships at MB PU Science College.",
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
  activeCountdownHeading: "Countdown to Test",
  expiredCountdownHeading: "Test day is here",
  sideTabAriaLabel: "Go to MB Talent Test 2027 registration",
} as const;

export default talentTestConfig;

/**
 * Team members. Only entries with `published: true` are shown anywhere on the site.
 * Default for new entries is `published: false`.
 */

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  /** Statement in the person's own words; must be approved by them. */
  quote?: string;
  /** Path under /public, or null to show a "Foto folgt" placeholder. */
  photo: string | null;
  qualification?: string;
  published: boolean;
};

export const team: TeamMember[] = [
  {
    id: "leon",
    name: "Leon Ellerbrake",
    role: "Elektrotechnikermeister, Betriebsleiter",
    quote: "[ZITAT IN LEONS WORTEN, von Leon freizugeben]",
    photo: null,
    qualification: "Eingetragen in der Handwerksrolle [HWK Düsseldorf]",
    published: true,
  },
];

export const publishedTeam = team.filter((m) => m.published);

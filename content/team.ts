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
  /** Pixel size of the photo file. */
  photoSize?: { width: number; height: number };
  /** Shown next to the name where the person is the customer's contact. */
  contactLine?: string;
  qualification?: string;
  published: boolean;
};

export const team: TeamMember[] = [
  {
    id: "leon",
    name: "Leon Ellerbrake",
    role: "Elektrotechnikermeister, Betriebsleiter",
    quote: "[ZITAT IN LEONS WORTEN, von Leon freizugeben]",
    /** Event photo, cropped; people in the background are blurred. Replace with a portrait shoot later. */
    photo: "/team/leon-ellerbrake.jpg",
    photoSize: { width: 340, height: 425 },
    contactLine: "Ihr persönlicher Ansprechpartner",
    // Add "Eingetragen in der Handwerksrolle …" once the GmbH is registered.
    published: true,
  },
];

export const publishedTeam = team.filter((m) => m.published);

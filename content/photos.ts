/**
 * Photographs on the landing page.
 *
 * All are licensed STAND-INS from Wikimedia Commons until HeyMeister has its own
 * photographs (shot list: a distribution board on site, a test on a device, the testing kit,
 * Leon at work). None shows a face, so nothing implies these are HeyMeister staff or customers.
 * CC BY and CC BY-SA require the credit line in the footer; keep `credit` in sync when swapping.
 */

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** "Author, Licence" for the footer credit line. Empty for CC0 (Pittigrilli). */
  credit: string;
  source: string;
};

export const photos = {
  hero: {
    src: "/photos/duesseldorf-blaue-stunde.jpg",
    width: 2400,
    height: 1800,
    alt: "Düsseldorfer Medienhafen mit Rheinturm zur blauen Stunde",
    credit: "Gerd Sachowsky, CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Medienhafen_D%C3%BCsseldorf_2013_-_Flickr_-_Sacho2000.jpg",
  },
  steps: {
    src: "/photos/unterverteilung-hoch.jpg",
    width: 1850,
    height: 2400,
    alt: "Geöffneter Verteilerschrank mit Schutzschaltern in zwei Feldern",
    credit: "",
    source: "https://commons.wikimedia.org/wiki/File:Fuse_box_with_installation_contactor_and_time_switching_clock_for_outdoor_illumination_in_German_shop,_2024.jpg",
  },
  devices: {
    src: "/photos/steckdosenleiste.jpg",
    width: 2400,
    height: 1800,
    alt: "Steckdosenleiste mit Schutzkontaktstecker auf einem Holzboden",
    credit: "Wikirobert007, CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Pikendusjuhe.jpg",
  },
  installation: {
    src: "/photos/abzweigdose.jpg",
    width: 2400,
    height: 1759,
    alt: "Geöffnete Abzweigdose mit Klemme und Wellrohr neben ihrem Deckel",
    credit: "Dmitry G, CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Wiring_in_wet_rooms.JPG",
  },
} satisfies Record<string, Photo>;

/** One footer line, as the licences require. */
export const photoCreditLine = `Fotos via Wikimedia Commons: ${Object.values(photos)
  .map((p) => p.credit)
  .filter(Boolean)
  .join("; ")}; übrige Pittigrilli, CC0.`;

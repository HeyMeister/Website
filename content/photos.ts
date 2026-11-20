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
    src: "/photos/unterverteilung-quer.jpg",
    width: 1927,
    height: 1003,
    alt: "Unterverteilung mit Fehlerstromschutzschaltern und beschrifteten Leitungsschutzschaltern",
    credit: "",
    source: "https://commons.wikimedia.org/wiki/File:ABB_230V_16A_fuses_in_fuse_box_in_German_shop,_2024.jpg",
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
  kitchen: {
    src: "/photos/gastro-kueche.jpg",
    width: 960,
    height: 1438,
    alt: "Edelstahl-Kühlschränke und Küchengeräte in einer Gastronomieküche",
    credit: "Shixart1985, CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Kitchen_equipment_seen_in_a_commercial_space_highlights_the_tools_used_for_food_preparation_and_storage_in_a_restaurant.jpg",
  },
  bakery: {
    src: "/photos/baeckerei-ofen.jpg",
    width: 1280,
    height: 960,
    alt: "Brotlaibe im beleuchteten Backofen einer Bäckerei",
    credit: "Jeremy Keith, CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Bread_in_the_oven_(5959009561).jpg",
  },
  office: {
    src: "/photos/buero.jpg",
    width: 1280,
    height: 870,
    alt: "Schlichter Büroarbeitsplatz mit Holztisch und Bildschirm",
    credit: "",
    source: "https://commons.wikimedia.org/wiki/File:Clean_minimalist_office_(Unsplash).jpg",
  },
  counter: {
    src: "/photos/theke.jpg",
    width: 960,
    height: 581,
    alt: "Gekühlte Verkaufstheke mit Speisen in mehreren Etagen",
    credit: "",
    source: "https://commons.wikimedia.org/wiki/File:Prepared_food_display_in_an_Italian_deli_in_Rome.jpg",
  },
  hotel: {
    src: "/photos/hotelzimmer.jpg",
    width: 1280,
    height: 960,
    alt: "Hotelzimmer mit Doppelbett, Nachttischlampen und Sessel",
    credit: "",
    source: "https://commons.wikimedia.org/wiki/File:Bed_in_hotel_room_2.jpg",
  },
  practice: {
    src: "/photos/behandlungsraum.jpg",
    width: 1280,
    height: 960,
    alt: "Behandlungsraum mit Behandlungsstuhl, Gerätearm und Röntgenbildbetrachter",
    credit: "Ptrump16, CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Hospital_Dental_Engine.jpg",
  },
  stairwell: {
    src: "/photos/treppenhaus.jpg",
    width: 1280,
    height: 960,
    alt: "Helles Treppenhaus eines Mehrfamilienhauses mit Geländer",
    credit: "Kotivalo, CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Staircase_in_a_1960s_apt_building.jpg",
  },
  cableReel: {
    src: "/photos/kabeltrommel.jpg",
    width: 960,
    height: 976,
    alt: "Kabeltrommel mit Schutzkontakt-Steckdosen und Prüfaufkleber",
    credit: "Florian Schäffer, CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Kabeltrommel_ip97.jpg",
  },
  breakers: {
    src: "/photos/sicherungsreihe.jpg",
    width: 1280,
    height: 992,
    alt: "Reihe von Leitungsschutzschaltern mit Fehlerstromschutzschalter und Beschriftung",
    credit: "",
    source: "https://commons.wikimedia.org/wiki/File:One_row_of_ABB_230V_16A_fuses_in_fuse_box_in_German_shop,_2024.jpg",
  },
  cabinet: {
    src: "/photos/verteilerkasten.jpg",
    width: 1280,
    height: 1604,
    alt: "Geschlossener Verteilerkasten mit Warnzeichen für elektrische Spannung",
    credit: "",
    source: "https://commons.wikimedia.org/wiki/File:Fuse_box_in_German_shop,_2024.jpg",
  },
  workshop: {
    src: "/photos/werkstatt.jpg",
    width: 2000,
    height: 1334,
    alt: "Kfz-Werkstatt mit Neonröhren, einem Auto mit geöffneter Motorhaube und einem Motor am Kettenzug",
    credit: "Martin Vorel, CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Car_repair_shop.jpg",
  },
} satisfies Record<string, Photo>;

/** One footer line, as the licences require (every photograph in this file, used or not). */
export const photoCreditLine = `Fotos via Wikimedia Commons: ${Object.values(photos)
  .map((p) => p.credit)
  .filter(Boolean)
  .join("; ")}; übrige CC0 (u. a. Pittigrilli).`;

export type PhotoKey = keyof typeof photos;

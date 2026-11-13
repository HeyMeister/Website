import { createHmac } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import { formatDate, formatEuro } from "@/lib/format";
import { findPlaceholders, hasPlaceholder, splitPlaceholders } from "@/lib/placeholders";
import { contrastRatio } from "@/lib/contrast";
import { colors, contrastPairs, largeTextAndUiPairs } from "@/styles/tokens";
import { postSignedWebhook, signPayload, SIGNATURE_HEADER } from "@/lib/webhook";
import { contactHref, telHref } from "@/lib/links";
import { lowestMonthlyPrice } from "@/content/pricing";
import { site } from "@/content/site";
import { checkLaunch } from "../scripts/check-launch";

const NBSP = " ";

describe("formatEuro", () => {
  it("formats whole euros without cents and with a space before €", () => {
    expect(formatEuro(29)).toBe(`29${NBSP}€`);
    expect(formatEuro(1234)).toBe(`1.234${NBSP}€`);
  });
  it("uses a decimal comma for cents", () => {
    expect(formatEuro(27.55)).toBe(`27,55${NBSP}€`);
    expect(formatEuro(29, { cents: true })).toBe(`29,00${NBSP}€`);
  });
});

describe("formatDate", () => {
  it("formats as TT.MM.JJJJ", () => {
    expect(formatDate("2027-03-08")).toBe("08.03.2027");
  });
});

describe("placeholders", () => {
  it("detects and splits bracket placeholders", () => {
    expect(hasPlaceholder("Telefon [TELEFON]")).toBe(true);
    expect(hasPlaceholder("Düsseldorf")).toBe(false);
    expect(splitPlaceholders("a [B] c")).toEqual([
      { text: "a ", placeholder: false },
      { text: "[B]", placeholder: true },
      { text: " c", placeholder: false },
    ]);
  });
  it("finds placeholders in nested objects with paths", () => {
    expect(findPlaceholders({ a: { b: ["ok", "[X]"] } })).toEqual([{ path: "a.b[1]", match: "[X]" }]);
  });
});

describe("launch check", () => {
  it("passes while not launched", () => {
    expect(checkLaunch({ PUBLIC_LAUNCH: "false" }).ok).toBe(true);
  });
  it("fails when launching with placeholders in legal.ts", () => {
    const res = checkLaunch({ PUBLIC_LAUNCH: "true" });
    expect(res.ok).toBe(false);
    expect(res.messages.join("\n")).toMatch(/BETREIBER-FIRMA/);
  });
});

describe("design tokens", () => {
  it.each(contrastPairs)("%s on %s reaches 4.5:1", (fg, bg) => {
    expect(contrastRatio(colors[fg], colors[bg])).toBeGreaterThanOrEqual(4.5);
  });
  it.each(largeTextAndUiPairs)("large text / UI element %s on %s reaches 3:1", (fg, bg) => {
    expect(contrastRatio(colors[fg], colors[bg])).toBeGreaterThanOrEqual(3);
  });
});

describe("webhook signature", () => {
  it("signs timestamp.body with HMAC-SHA256", () => {
    const expected = createHmac("sha256", "secret").update('1700000000.{"a":1}').digest("hex");
    expect(signPayload('{"a":1}', "secret", 1700000000)).toBe(`sha256=${expected}`);
  });
  it("sends the signature header and throws on non-2xx", async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response(null, { status: 500 }));
    await expect(postSignedWebhook("https://crm.example/hook", "s", { a: 1 }, { fetchImpl, now: 1700000000000 })).rejects.toThrow(
      /500/,
    );
    const init = fetchImpl.mock.calls[0]![1] as RequestInit;
    expect((init.headers as Record<string, string>)[SIGNATURE_HEADER]).toBe(signPayload('{"a":1}', "s", 1700000000));
  });
});

describe("links and content", () => {
  it("builds tel: links only for real numbers", () => {
    expect(telHref("[TELEFON]")).toBeNull();
    expect(telHref("+49 211 123456-0")).toBe("tel:+492111234560");
  });
  it("points CTAs to the landing page in validation mode", () => {
    expect(contactHref("pilot", "validation")).toBe("/?wunsch=pilot#kontakt");
    expect(contactHref("angebot", "full")).toBe("/kontakt?wunsch=angebot#kontakt");
  });
  it("derives the teaser price from pricing.ts", () => {
    expect(lowestMonthlyPrice()).toBe(29);
  });
  it("keeps SEO defaults within length limits", () => {
    expect(site.seo.defaultTitle.length).toBeLessThanOrEqual(60);
    expect(site.seo.defaultDescription.length).toBeLessThanOrEqual(155);
  });
});

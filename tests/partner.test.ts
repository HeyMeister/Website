import { describe, expect, it, vi } from "vitest";
import { handlePartner, handleTip, type PartnerDeps } from "@/lib/partner-handler";
import { TIP_MAX_FILE_BYTES, validateReport } from "@/lib/partner-schema";
import { partner } from "@/content/partner";
import { site } from "@/content/site";

const NOW = 1_800_000_000_000;

function deps(over: Partial<PartnerDeps> = {}): PartnerDeps {
  return {
    sendPartner: vi.fn(async () => {}),
    sendTip: vi.fn(async () => {}),
    rateLimit: vi.fn(async () => ({ allowed: true })),
    now: () => NOW,
    log: vi.fn(),
    ...over,
  };
}

const validPartner = {
  name: "Maria Muster",
  company: "Muster Versicherungsmakler GmbH",
  role: "gewerbemakler",
  region: "40",
  email: "maria@example.de",
  phone: "",
  customers: "Hotels und Pflegeheime",
  privacy: "on",
  website: "",
  startedAt: NOW - 10_000,
};

const validTip = {
  partnerCode: "HM-0042",
  customerCompany: "Hotel am Rhein GmbH",
  contactPerson: "Herr Beispiel",
  contact: "0211 123456",
  reason: "maengel",
  consent: "on",
  website: "",
  startedAt: String(NOW - 10_000),
};

const pdf = (size = 1000, head = [0x25, 0x50, 0x44, 0x46]) => ({
  name: "Pruefbericht.pdf",
  type: "application/pdf",
  size,
  bytes: async () => {
    const b = new Uint8Array(Math.min(size, 16));
    b.set(head.slice(0, b.length));
    return b;
  },
});

describe("handlePartner", () => {
  it("sends a valid registration", async () => {
    const d = deps();
    const res = await handlePartner(validPartner, "1.2.3.4", d);
    expect(res.status).toBe(200);
    expect(d.sendPartner).toHaveBeenCalledOnce();
  });

  it("silently drops honeypot and too-fast submissions", async () => {
    const d = deps();
    expect((await handlePartner({ ...validPartner, website: "spam" }, "ip", d)).status).toBe(200);
    expect((await handlePartner({ ...validPartner, startedAt: NOW - 500 }, "ip", d)).status).toBe(200);
    expect(d.sendPartner).not.toHaveBeenCalled();
  });

  it("requires the privacy checkbox and a role", async () => {
    const res = await handlePartner({ ...validPartner, privacy: undefined, role: "" }, "ip", deps());
    expect(res.status).toBe(400);
    if (res.status === 400) {
      expect(res.body.fieldErrors.privacy).toBeTruthy();
      expect(res.body.fieldErrors.role).toBeTruthy();
    }
  });

  it("rate limits and reports delivery failures", async () => {
    expect((await handlePartner(validPartner, "ip", deps({ rateLimit: async () => ({ allowed: false }) }))).status).toBe(429);
    const failing = deps({ sendPartner: async () => Promise.reject(new Error("down")) });
    expect((await handlePartner(validPartner, "ip", failing)).status).toBe(502);
  });
});

describe("handleTip", () => {
  it("sends a valid tip without a report", async () => {
    const d = deps();
    expect((await handleTip(validTip, null, "ip", d)).status).toBe(200);
    expect(d.sendTip).toHaveBeenCalledWith(expect.objectContaining({ partnerCode: "HM-0042" }), null, expect.anything());
  });

  it("attaches a valid PDF", async () => {
    const d = deps();
    expect((await handleTip(validTip, pdf(), "ip", d)).status).toBe(200);
    expect(d.sendTip).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ filename: "Pruefbericht.pdf" }), expect.anything());
  });

  it("rejects missing consent, non-PDF content and oversized files", async () => {
    const noConsent = await handleTip({ ...validTip, consent: undefined }, null, "ip", deps());
    expect(noConsent.status).toBe(400);
    const fake = await handleTip(validTip, pdf(1000, [0x4d, 0x5a, 0, 0]), "ip", deps());
    expect(fake.status === 400 && fake.body.fieldErrors.report).toBeTruthy();
    const big = await handleTip(validTip, pdf(TIP_MAX_FILE_BYTES + 1), "ip", deps());
    expect(big.status === 400 && big.body.fieldErrors.report).toBeTruthy();
  });

  it("validates file names and types", () => {
    expect(validateReport({ name: "bericht.docx", type: "application/msword", size: 10 })).toMatch(/PDF/);
    expect(validateReport({ name: "bericht.pdf", type: "application/pdf", size: 10 })).toBeNull();
  });
});

describe("partner SEO", () => {
  it("keeps title and description within limits", () => {
    expect(site.seo.titleTemplate.replace("%s", partner.seo.title).length).toBeLessThanOrEqual(60);
    expect(partner.seo.description.length).toBeLessThanOrEqual(155);
  });
});

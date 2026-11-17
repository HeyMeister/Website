import { describe, expect, it, vi } from "vitest";
import { handlePartner, type PartnerDeps } from "@/lib/partner-handler";
import { partner } from "@/content/partner";
import { site } from "@/content/site";

const NOW = 1_800_000_000_000;

function deps(over: Partial<PartnerDeps> = {}): PartnerDeps {
  return {
    sendPartner: vi.fn(async () => {}),
    rateLimit: vi.fn(async () => ({ allowed: true })),
    now: () => NOW,
    log: vi.fn(),
    ...over,
  };
}

const validPartner = {
  company: "Muster Elektrotechnik GmbH",
  name: "Maria Muster",
  email: "maria@example.de",
  phone: "",
  region: "PLZ 40 bis 42",
  services: "beides-maengel",
  teamSize: "",
  message: "",
  privacy: "on",
  website: "",
  startedAt: NOW - 10_000,
};

describe("handlePartner", () => {
  it("sends a valid application and drops empty optional fields", async () => {
    const d = deps();
    const res = await handlePartner(validPartner, "1.2.3.4", d);
    expect(res.status).toBe(200);
    expect(d.sendPartner).toHaveBeenCalledWith(
      expect.objectContaining({ services: "beides-maengel", teamSize: undefined, message: undefined }),
      expect.anything(),
    );
  });

  it("silently drops honeypot and too-fast submissions", async () => {
    const d = deps();
    expect((await handlePartner({ ...validPartner, website: "spam" }, "ip", d)).status).toBe(200);
    expect((await handlePartner({ ...validPartner, startedAt: NOW - 500 }, "ip", d)).status).toBe(200);
    expect(d.sendPartner).not.toHaveBeenCalled();
  });

  it("requires privacy, services and region", async () => {
    const res = await handlePartner({ ...validPartner, privacy: undefined, services: "", region: "" }, "ip", deps());
    expect(res.status).toBe(400);
    if (res.status === 400) {
      expect(Object.keys(res.body.fieldErrors).sort()).toEqual(["privacy", "region", "services"]);
    }
  });

  it("rejects an unknown team size", async () => {
    const res = await handlePartner({ ...validPartner, teamSize: "1000" }, "ip", deps());
    expect(res.status === 400 && res.body.fieldErrors.teamSize).toBeTruthy();
  });

  it("rate limits and reports delivery failures", async () => {
    expect((await handlePartner(validPartner, "ip", deps({ rateLimit: async () => ({ allowed: false }) }))).status).toBe(429);
    const failing = deps({ sendPartner: async () => Promise.reject(new Error("down")) });
    expect((await handlePartner(validPartner, "ip", failing)).status).toBe(502);
  });
});

describe("partner SEO", () => {
  it("keeps title and description within limits", () => {
    expect(site.seo.titleTemplate.replace("%s", partner.seo.title).length).toBeLessThanOrEqual(60);
    expect(partner.seo.description.length).toBeLessThanOrEqual(155);
  });
});

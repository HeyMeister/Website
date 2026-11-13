import { describe, expect, it, vi } from "vitest";
import { handleLead, MIN_FILL_TIME_MS, type LeadDeps } from "@/lib/lead-handler";

const NOW = 1_800_000_000_000;

const validLead = {
  name: "Erika Beispiel",
  company: "Beispiel Bäckerei GmbH",
  email: "erika@example.de",
  phone: "+49 211 1234567",
  industry: "Bäckerei",
  sites: "7",
  zip: "40210",
  lastCheck: "1-2-jahre",
  message: "",
  wish: "angebot",
  website: "",
  startedAt: NOW - 10_000,
};

function deps(overrides: Partial<LeadDeps> = {}): LeadDeps {
  return {
    sendEmail: vi.fn().mockResolvedValue(undefined),
    postWebhook: vi.fn().mockResolvedValue(undefined),
    rateLimit: vi.fn().mockResolvedValue({ allowed: true }),
    now: () => NOW,
    log: vi.fn(),
    ...overrides,
  };
}

describe("handleLead", () => {
  it("accepts a valid lead and sends email + webhook", async () => {
    const d = deps();
    const res = await handleLead(validLead, "1.2.3.4", d);
    expect(res.status).toBe(200);
    expect(d.sendEmail).toHaveBeenCalledOnce();
    expect(d.postWebhook).toHaveBeenCalledOnce();
    const lead = vi.mocked(d.sendEmail).mock.calls[0]![0];
    expect(lead.sites).toBe(7);
    expect(lead.message).toBeUndefined();
  });

  it("returns field errors for invalid input", async () => {
    const d = deps();
    const res = await handleLead({ ...validLead, name: "", email: "keine-mail", sites: "0", zip: "123" }, "1.2.3.4", d);
    expect(res.status).toBe(400);
    if (res.status !== 400) throw new Error();
    expect(Object.keys(res.body.fieldErrors).sort()).toEqual(["email", "name", "sites", "zip"]);
    expect(res.body.fieldErrors.email).toMatch(/E-Mail/);
    expect(d.sendEmail).not.toHaveBeenCalled();
  });

  it("requires name, company, email, sites and wish", async () => {
    const res = await handleLead({ startedAt: NOW - 10_000 }, "1.2.3.4", deps());
    expect(res.status).toBe(400);
    if (res.status !== 400) throw new Error();
    expect(Object.keys(res.body.fieldErrors).sort()).toEqual(["company", "email", "name", "sites", "wish"]);
    // Every message is German, including for missing fields.
    for (const msg of Object.values(res.body.fieldErrors)) expect(msg).toMatch(/^Bitte|^Mindestens/);
  });

  it("silently discards honeypot submissions", async () => {
    const d = deps();
    const res = await handleLead({ ...validLead, website: "http://spam.example" }, "1.2.3.4", d);
    expect(res.status).toBe(200);
    expect(d.sendEmail).not.toHaveBeenCalled();
    expect(d.postWebhook).not.toHaveBeenCalled();
  });

  it("silently discards submissions faster than 3 seconds", async () => {
    const d = deps();
    const res = await handleLead({ ...validLead, startedAt: NOW - (MIN_FILL_TIME_MS - 1) }, "1.2.3.4", d);
    expect(res.status).toBe(200);
    expect(d.sendEmail).not.toHaveBeenCalled();
  });

  it("discards submissions without a start timestamp", async () => {
    const d = deps();
    const { startedAt: _omit, ...noTs } = validLead;
    void _omit;
    const res = await handleLead(noTs, "1.2.3.4", d);
    expect(res.status).toBe(200);
    expect(d.sendEmail).not.toHaveBeenCalled();
  });

  it("returns 429 when rate limited", async () => {
    const d = deps({ rateLimit: vi.fn().mockResolvedValue({ allowed: false }) });
    const res = await handleLead(validLead, "1.2.3.4", d);
    expect(res.status).toBe(429);
    expect(d.sendEmail).not.toHaveBeenCalled();
  });

  it("still sends the email and reports success when the webhook fails", async () => {
    const d = deps({ postWebhook: vi.fn().mockRejectedValue(new Error("CRM down")) });
    const res = await handleLead(validLead, "1.2.3.4", d);
    expect(res.status).toBe(200);
    expect(d.sendEmail).toHaveBeenCalledOnce();
    expect(d.log).toHaveBeenCalledWith("crm webhook failed", expect.any(Error));
  });

  it("works without a configured webhook", async () => {
    const d = deps({ postWebhook: null });
    const res = await handleLead(validLead, "1.2.3.4", d);
    expect(res.status).toBe(200);
    expect(d.log).not.toHaveBeenCalled();
  });

  it("reports success if email fails but the webhook captured the lead", async () => {
    const d = deps({ sendEmail: vi.fn().mockRejectedValue(new Error("Resend down")) });
    const res = await handleLead(validLead, "1.2.3.4", d);
    expect(res.status).toBe(200);
  });

  it("reports an error if email fails and there is no webhook", async () => {
    const d = deps({ sendEmail: vi.fn().mockRejectedValue(new Error("Resend down")), postWebhook: null });
    const res = await handleLead(validLead, "1.2.3.4", d);
    expect(res.status).toBe(502);
  });
});

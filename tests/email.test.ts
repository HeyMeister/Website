import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

describe("form emails", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("sends every form to info@hey-meister.de from the default sender", async () => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_EMAIL", "");
    vi.stubEnv("RESEND_FROM", "");
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    const { sendViaResend, emailRecipient } = await import("@/lib/server/email");
    expect(emailRecipient()).toBe("info@hey-meister.de");
    await sendViaResend({ subject: "Test", text: "Hallo" });
    const body = JSON.parse(fetchMock.mock.calls[0]![1].body as string);
    expect(body.to).toEqual(["info@hey-meister.de"]);
    expect(body.from).toBe("HeyMeister Website <website@hey-meister.de>");
  });
});

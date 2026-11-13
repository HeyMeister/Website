import { describe, expect, it } from "vitest";
import {
  canAccessDocument,
  formatBytes,
  generatePassword,
  isProfileUsable,
  sanitizeFileName,
  validateUpload,
  MAX_UPLOAD_BYTES,
} from "@/lib/dataroom/rules";

describe("isProfileUsable", () => {
  const now = new Date("2026-11-13T12:00:00Z");
  it("allows active profiles without expiry", () => {
    expect(isProfileUsable({ active: true, expires_at: null }, now)).toBe(true);
  });
  it("blocks inactive profiles", () => {
    expect(isProfileUsable({ active: false, expires_at: null }, now)).toBe(false);
  });
  it("blocks expired profiles and allows future expiry", () => {
    expect(isProfileUsable({ active: true, expires_at: "2026-11-13T11:59:59Z" }, now)).toBe(false);
    expect(isProfileUsable({ active: true, expires_at: "2026-11-14T00:00:00Z" }, now)).toBe(true);
  });
});

describe("canAccessDocument", () => {
  const investor = { id: "p1", role: "investor" as const };
  const admin = { id: "a1", role: "admin" as const };
  const shared = { id: "d1", visibility: "all" as const };
  const restricted = { id: "d2", visibility: "selected" as const };
  it("gives investors documents shared with all", () => {
    expect(canAccessDocument(investor, shared, new Set())).toBe(true);
  });
  it("gives investors restricted documents only when granted", () => {
    expect(canAccessDocument(investor, restricted, new Set())).toBe(false);
    expect(canAccessDocument(investor, restricted, new Set(["d2"]))).toBe(true);
  });
  it("gives admins everything", () => {
    expect(canAccessDocument(admin, restricted, new Set())).toBe(true);
  });
});

describe("generatePassword", () => {
  it("creates 4 groups of 5 unambiguous characters", () => {
    const pw = generatePassword();
    expect(pw).toMatch(/^[a-zA-Z2-9]{5}(-[a-zA-Z2-9]{5}){3}$/);
    expect(pw).not.toMatch(/[01lIO]/);
  });
  it("does not repeat", () => {
    const set = new Set(Array.from({ length: 200 }, () => generatePassword()));
    expect(set.size).toBe(200);
  });
});

describe("uploads", () => {
  it("accepts allowed types and rejects others", () => {
    expect(validateUpload("Pitch Deck.PDF", 1000)).toMatchObject({ ok: true, mime: "application/pdf" });
    expect(validateUpload("tool.exe", 1000).ok).toBe(false);
    expect(validateUpload("deck.pdf", 0).ok).toBe(false);
    expect(validateUpload("deck.pdf", MAX_UPLOAD_BYTES + 1).ok).toBe(false);
  });
  it("sanitizes file names for storage keys", () => {
    expect(sanitizeFileName("Präsentation Q1 / Übersicht (final).pptx")).toBe("praesentation-q1-uebersicht-final.pptx");
    expect(sanitizeFileName("../../etc/passwd")).toBe("etcpasswd");
    expect(sanitizeFileName("???.pdf")).toBe("datei.pdf");
  });
  it("formats sizes in German", () => {
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(1536)).toBe("1,5 KB");
    expect(formatBytes(5 * 1024 * 1024)).toBe("5 MB");
  });
});

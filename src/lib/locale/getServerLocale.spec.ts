import { beforeEach, describe, expect, it, vi } from "vitest";
import { headers } from "next/headers";
import { getServerLocale } from "./getServerLocale";

vi.mock("next/headers", () => ({
  headers: vi.fn(),
}));

const mockHeaders = headers as ReturnType<typeof vi.fn>;

describe("getServerLocale", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("when Accept-Language header is missing", () => {
    it("should return en-US as default", async () => {
      mockHeaders.mockResolvedValue({
        get: vi.fn().mockReturnValue(null),
      } as Partial<Headers>);

      const result = await getServerLocale();
      expect(result).toBe("en-US");
    });

    it("should return en-US when header is empty string", async () => {
      mockHeaders.mockResolvedValue({
        get: vi.fn().mockReturnValue(""),
      } as Partial<Headers>);

      const result = await getServerLocale();
      expect(result).toBe("en-US");
    });
  });

  describe("with simple locale", () => {
    it("should return single locale without quality value", async () => {
      mockHeaders.mockResolvedValue({
        get: vi.fn().mockReturnValue("de"),
      } as Partial<Headers>);

      const result = await getServerLocale();
      expect(result).toBe("de");
    });

    it("should return locale with region code", async () => {
      mockHeaders.mockResolvedValue({
        get: vi.fn().mockReturnValue("de-DE"),
      } as Partial<Headers>);

      const result = await getServerLocale();
      expect(result).toBe("de-DE");
    });

    it("should trim whitespace from locale", async () => {
      mockHeaders.mockResolvedValue({
        get: vi.fn().mockReturnValue("  en-US  "),
      } as Partial<Headers>);

      const result = await getServerLocale();
      expect(result).toBe("en-US");
    });
  });

  describe("with multiple locales", () => {
    it("should return first locale when no quality values specified", async () => {
      mockHeaders.mockResolvedValue({
        get: vi.fn().mockReturnValue("de,en,fr"),
      } as Partial<Headers>);

      const result = await getServerLocale();
      expect(result).toBe("de");
    });

    it("should return locale with highest quality value", async () => {
      mockHeaders.mockResolvedValue({
        get: vi.fn().mockReturnValue("de;q=0.7,en;q=0.9,fr;q=0.5"),
      } as Partial<Headers>);

      const result = await getServerLocale();
      expect(result).toBe("en");
    });

    it("should handle quality value of 1.0 implicitly for first locale", async () => {
      mockHeaders.mockResolvedValue({
        get: vi.fn().mockReturnValue("de,en;q=0.9"),
      } as Partial<Headers>);

      const result = await getServerLocale();
      expect(result).toBe("de");
    });
  });

  describe("with complex Accept-Language headers", () => {
    it("should parse typical browser Accept-Language header", async () => {
      mockHeaders.mockResolvedValue({
        get: vi.fn().mockReturnValue("de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7"),
      } as Partial<Headers>);

      const result = await getServerLocale();
      expect(result).toBe("de-DE");
    });

    it("should handle quality values with varying precision", async () => {
      mockHeaders.mockResolvedValue({
        get: vi.fn().mockReturnValue("fr;q=0.5,de;q=0.8,en;q=0.95,es;q=0.7"),
      } as Partial<Headers>);

      const result = await getServerLocale();
      expect(result).toBe("en");
    });

    it("should handle mixed format with and without quality values", async () => {
      mockHeaders.mockResolvedValue({
        get: vi.fn().mockReturnValue("en-GB,en;q=0.9,de;q=0.8"),
      } as Partial<Headers>);

      const result = await getServerLocale();
      expect(result).toBe("en-GB");
    });

    it("should handle spaces around separators", async () => {
      mockHeaders.mockResolvedValue({
        get: vi.fn().mockReturnValue("de , en ; q=0.9 , fr ; q=0.8"),
      } as Partial<Headers>);

      const result = await getServerLocale();
      expect(result).toBe("de");
    });
  });

  describe("edge cases", () => {
    it("should handle equal quality values (return first one)", async () => {
      mockHeaders.mockResolvedValue({
        get: vi.fn().mockReturnValue("de;q=0.9,en;q=0.9,fr;q=0.9"),
      } as Partial<Headers>);

      const result = await getServerLocale();
      expect(result).toBe("de");
    });

    it("should handle quality value of 0", async () => {
      mockHeaders.mockResolvedValue({
        get: vi.fn().mockReturnValue("de;q=0,en;q=0.5"),
      } as Partial<Headers>);

      const result = await getServerLocale();
      expect(result).toBe("en");
    });

    it("should handle wildcard (*) locale", async () => {
      mockHeaders.mockResolvedValue({
        get: vi.fn().mockReturnValue("*"),
      } as Partial<Headers>);

      const result = await getServerLocale();
      expect(result).toBe("*");
    });

    it("should fallback to en-US if all parsing fails", async () => {
      mockHeaders.mockResolvedValue({
        get: vi.fn().mockReturnValue(";;;"),
      } as Partial<Headers>);

      const result = await getServerLocale();
      expect(result).toBe("en-US");
    });
  });

  describe("real-world examples", () => {
    it("should handle Chrome on macOS (German)", async () => {
      mockHeaders.mockResolvedValue({
        get: vi
          .fn()
          .mockReturnValue(
            "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7,fr;q=0.6,es;q=0.5",
          ),
      } as Partial<Headers>);

      const result = await getServerLocale();
      expect(result).toBe("de-DE");
    });

    it("should handle Firefox on Linux (English UK)", async () => {
      mockHeaders.mockResolvedValue({
        get: vi.fn().mockReturnValue("en-GB,en;q=0.5"),
      } as Partial<Headers>);

      const result = await getServerLocale();
      expect(result).toBe("en-GB");
    });

    it("should handle Safari on iOS (Japanese)", async () => {
      mockHeaders.mockResolvedValue({
        get: vi.fn().mockReturnValue("ja-JP,ja;q=0.9,en-US;q=0.8,en;q=0.7"),
      } as Partial<Headers>);

      const result = await getServerLocale();
      expect(result).toBe("ja-JP");
    });

    it("should handle curl with single locale", async () => {
      mockHeaders.mockResolvedValue({
        get: vi.fn().mockReturnValue("de"),
      } as Partial<Headers>);

      const result = await getServerLocale();
      expect(result).toBe("de");
    });
  });
});

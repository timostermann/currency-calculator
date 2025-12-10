const mockDraftMode = {
  enable: vi.fn(),
  disable: vi.fn(),
  isEnabled: false,
};

const mockCookies = {
  get: vi.fn(),
  set: vi.fn(),
  delete: vi.fn(),
};

vi.mock("next/headers", () => ({
  draftMode: vi.fn(() => mockDraftMode),
  cookies: vi.fn(() => mockCookies),
}));

export class MockSignJWT {
  private payload: unknown;

  constructor(payload: unknown) {
    this.payload = payload;
  }
  setProtectedHeader() {
    return this;
  }
  setIssuer() {
    return this;
  }
  setIssuedAt() {
    return this;
  }
  setSubject() {
    return this;
  }
  setAudience() {
    return this;
  }
  setExpirationTime() {
    return this;
  }
  setNotBefore() {
    return this;
  }
  sign() {
    return "signed JWT";
  }
}

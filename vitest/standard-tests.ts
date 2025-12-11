import type { JSX } from "react";
import { cleanup, render, waitFor } from "@testing-library/react/pure";
import type { RenderOptions } from "@testing-library/react";
import type { ConfigData, MetaElement } from "html-validate/node";
import HTML5 from "html-validate/elements/html5";
import { axe } from "vitest-axe";
import "vitest-axe/extend-expect";
import { expect, vi } from "vitest"; // expect must be imported for html-validate to extend `expect` with `toHTMLValidate`
import "html-validate/vitest";

type RunOptions = Parameters<typeof axe>[1];

type HtmlValidationRules = ConfigData["rules"];
type HtmlValidationElements = Record<string, Partial<MetaElement>>[];

declare global {
  type ItPassesStandardComponentTests = typeof standardComponentTests;
  var itPassesStandardComponentTests: ItPassesStandardComponentTests;
  var HTMLRules: HtmlValidationRules;
}

const globalRules = {
  // React useId generates an id with colons
  "valid-id": [
    "error",
    {
      relaxed: true,
    },
  ],
  // the Next <Image> component sets the "style" attribute with "color", so we have to allow this
  // we use the custom css property --strong-color so we have to allow this
  "no-inline-style": [
    "error",
    {
      allowedProperties: [
        "color",
        "--strong-color",
        "--emphasis-color",
        "--underline-color",
        "--text-shadow-color",
        "--outline-color",
        "--min-height-small",
        "--container-name",
        "--background-color",
        "--background-gradient",
        "--background-image",
        "--background-image-small",
      ],
    },
  ],
} as const satisfies HtmlValidationRules;

const globalElements = [HTML5] as HtmlValidationElements;

global.HTMLRules = globalRules;

type StandardTestOptions = {
  ignoreConsoleErrors?: string[];
  renderOptions?: RenderOptions;
  container?: HTMLElement;
  rules?: HtmlValidationRules;
  elements?: HtmlValidationElements;
  waitFor?: () => void;
  noCleanup?: boolean;
};

const standardComponentTests = (
  element: JSX.Element,
  options: StandardTestOptions = {},
  axeOptions: RunOptions = {},
) => {
  let consoleError: typeof console.error;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let consoleErrors: string[];
  let showConsoleErrors: boolean;

  beforeAll(() => {
    const ignoreConsoleErrors = [
      "A component was suspended by an uncached promise. " +
        "Creating promises inside a Client Component or hook is not yet supported, " +
        "except via a Suspense-compatible library or framework.",
    ];
    if (options.ignoreConsoleErrors)
      ignoreConsoleErrors.push(...options.ignoreConsoleErrors);

    consoleError = console.error;
    consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(
        (message, ...args) =>
          ignoreConsoleErrors.reduce(
            (ignored, ignoreMessage) =>
              ignored || !message.includes(ignoreMessage),
            false,
          ) &&
          consoleErrors.push(message) &&
          showConsoleErrors &&
          consoleError(message, ...args),
      ) as ReturnType<typeof vi.spyOn>;
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  beforeEach(() => {
    showConsoleErrors = false;
    consoleErrors = [];
  });

  afterEach(() => {
    if (!options.noCleanup) cleanup();
  });

  it("renders without crashing", async () => {
    const { container } = render(element, options.renderOptions);
    if (options.waitFor) await waitFor(options.waitFor, { timeout: 10000 });
    await waitFor(() =>
      expect((options.container || container).firstChild).toBeDefined(),
    );
  });

  it("renders without console errors", async () => {
    showConsoleErrors = true;
    render(element, options.renderOptions);
    if (options.waitFor) await waitFor(options.waitFor, { timeout: 10000 });
    await waitFor(() => expect(consoleErrors).toHaveLength(0));
  });

  it("renders expected markup", async () => {
    const { container } = render(element, options.renderOptions);
    if (options.waitFor) await waitFor(options.waitFor, { timeout: 10000 });
    await waitFor(() => expect(container).toMatchSnapshot());
  });

  it("renders valid HTML", async () => {
    const { container } = render(element, options.renderOptions);
    if (options.waitFor) await waitFor(options.waitFor, { timeout: 10000 });
    const rules = { ...globalRules, ...options.rules };
    const elements = options.elements
      ? [...globalElements, ...options.elements]
      : undefined;
    await waitFor(() => {
      expect(container.innerHTML).toHTMLValidate({ rules, elements });
    });
  });

  it("renders axe conform HTML", async () => {
    const { container } = render(element, options.renderOptions);
    if (options.waitFor) await waitFor(options.waitFor, { timeout: 10000 });
    const results = await axe(container, axeOptions);
    expect(results).toHaveNoViolations();
  });
};

global.itPassesStandardComponentTests = standardComponentTests;

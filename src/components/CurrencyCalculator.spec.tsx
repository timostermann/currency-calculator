import { render, screen } from "@testing-library/react/pure";
import userEvent from "@testing-library/user-event";
import { CurrencyCalculator } from "./CurrencyCalculator";

describe("CurrencyCalculator", () => {
  const mockRates = {
    EUR: 0.92,
    CHF: 0.88,
  };

  itPassesStandardComponentTests(
    <CurrencyCalculator rates={mockRates} locale="en-US" />,
  );

  it("renders with both EUR and CHF rates", () => {
    render(<CurrencyCalculator rates={mockRates} locale="en-US" />);

    expect(screen.getByText("EUR")).toBeInTheDocument();
    expect(screen.getByText("CHF")).toBeInTheDocument();
    expect(screen.getByText("0.9200")).toBeInTheDocument();
    expect(screen.getByText("0.8800")).toBeInTheDocument();
  });

  it("renders with only EUR rate", () => {
    render(<CurrencyCalculator rates={{ EUR: 0.92 }} locale="en-US" />);

    expect(screen.getByText("EUR")).toBeInTheDocument();
    expect(screen.queryByText("CHF")).not.toBeInTheDocument();
  });

  it("renders with only CHF rate", () => {
    render(<CurrencyCalculator rates={{ CHF: 0.88 }} locale="en-US" />);

    expect(screen.queryByText("EUR")).not.toBeInTheDocument();
    expect(screen.getByText("CHF")).toBeInTheDocument();
  });

  it("converts USD to EUR and CHF when amount is entered", async () => {
    const user = userEvent.setup();

    render(<CurrencyCalculator rates={mockRates} locale="en-US" />);

    const input = screen.getByLabelText("Amount in USD");
    await user.type(input, "100");

    const outputs = screen.getAllByRole("status");
    expect(outputs[0]).toHaveTextContent("€92.00"); // EUR: 100 * 0.92 = 92
    expect(outputs[1]).toHaveTextContent("CHF 88.00"); // CHF: 100 * 0.88 = 88
  });

  it("activates preset button when clicked", async () => {
    const user = userEvent.setup();

    render(<CurrencyCalculator rates={mockRates} locale="en-US" />);

    const preset100Button = screen.getByLabelText(/Set amount to 100 USD/);
    await user.click(preset100Button);

    expect(preset100Button).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByLabelText("Amount in USD")).toHaveValue("100");
  });

  it("deactivates preset when manual input is entered", async () => {
    const user = userEvent.setup();

    render(<CurrencyCalculator rates={mockRates} locale="en-US" />);

    const preset100Button = screen.getByLabelText(/Set amount to 100 USD/);
    await user.click(preset100Button);

    expect(preset100Button).toHaveAttribute("aria-pressed", "true");

    const input = screen.getByLabelText("Amount in USD");
    await user.clear(input);
    await user.type(input, "50");

    expect(preset100Button).toHaveAttribute("aria-pressed", "false");
  });

  it("updates converted amounts when preset is clicked", async () => {
    const user = userEvent.setup();

    render(<CurrencyCalculator rates={mockRates} locale="en-US" />);

    const preset1000Button = screen.getByLabelText(/Set amount to 1000 USD/);
    await user.click(preset1000Button);

    const outputs = screen.getAllByRole("status");
    expect(outputs[0]).toHaveTextContent("€920.00"); // EUR: 1000 * 0.92 = 920
    expect(outputs[1]).toHaveTextContent("CHF 880.00"); // CHF: 1000 * 0.88 = 880
  });

  it("formats locale-specific numbers for de-DE", async () => {
    const user = userEvent.setup();

    render(<CurrencyCalculator rates={mockRates} locale="de-DE" />);

    const preset1000Button = screen.getByLabelText(/Set amount to 1000 USD/);
    await user.click(preset1000Button);

    const outputs = screen.getAllByRole("status");
    expect(outputs[0]).toHaveTextContent("920,00 €");
    expect(outputs[1]).toHaveTextContent("880,00 CHF");
  });
});

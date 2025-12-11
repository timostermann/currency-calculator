import { render, screen } from "@testing-library/react/pure";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
  itPassesStandardComponentTests(<Input label="Test" />);

  it("renders with label", () => {
    render(<Input label="Amount" id="amount" />);
    expect(screen.getByLabelText("Amount")).toBeInTheDocument();
  });

  it("renders with prefix", () => {
    render(<Input label="Amount" id="amount" prefix="$" />);
    expect(screen.getByText("$")).toBeInTheDocument();
  });

  it("renders with suffix", () => {
    render(<Input label="Amount" id="amount" suffix="USD" />);
    expect(screen.getByText("USD")).toBeInTheDocument();
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Input label="Amount" id="amount" onChange={handleChange} />);

    const input = screen.getByLabelText("Amount");
    await user.type(input, "123");

    expect(handleChange).toHaveBeenCalled();
  });

  it("forwards other input props", () => {
    render(
      <Input label="Amount" id="amount" placeholder="Enter amount" disabled />,
    );
    const input = screen.getByLabelText("Amount");
    expect(input).toHaveAttribute("placeholder", "Enter amount");
    expect(input).toBeDisabled();
  });

  describe("Error handling", () => {
    it("displays error message", () => {
      render(<Input label="Amount" id="amount" error="Invalid amount" />);
      expect(screen.getByRole("alert")).toHaveTextContent("Invalid amount");
    });

    it("sets aria-invalid when error is present", () => {
      render(<Input label="Amount" id="amount" error="Invalid amount" />);
      expect(screen.getByLabelText("Amount")).toHaveAttribute(
        "aria-invalid",
        "true",
      );
    });

    it("sets aria-describedby when error is present", () => {
      render(<Input label="Amount" id="amount" error="Invalid amount" />);
      expect(screen.getByLabelText("Amount")).toHaveAttribute(
        "aria-describedby",
        "amount-error",
      );
    });
  });
});

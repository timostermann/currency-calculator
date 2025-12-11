import { render, screen } from "@testing-library/react/pure";
import userEvent from "@testing-library/user-event";
import { PresetButton } from "./PresetButton";

describe("PresetButton", () => {
  itPassesStandardComponentTests(<PresetButton>Test Button</PresetButton>);

  itPassesStandardComponentTests(
    <PresetButton isActive>Active Button</PresetButton>,
  );

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<PresetButton onClick={handleClick}>$100</PresetButton>);

    await user.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("sets aria-pressed to false when not active", () => {
    render(<PresetButton isActive={false}>$100</PresetButton>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  });

  it("sets aria-pressed to true when active", () => {
    render(<PresetButton isActive>$100</PresetButton>);
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
  });

  it("applies custom className", () => {
    render(<PresetButton className="custom-class">$100</PresetButton>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("forwards other button props", () => {
    render(
      <PresetButton disabled aria-label="Set to 100 dollars">
        $100
      </PresetButton>,
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-label", "Set to 100 dollars");
  });
});

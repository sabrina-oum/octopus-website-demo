import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Accordion } from "./Accordion";

const items = [
  { title: "Technical specifications", content: "Power: 1500W" },
  { title: "Dimensions & weight", content: "Weight: 4.2 kg" },
];

function header(name: string) {
  return screen.getByRole("button", { name });
}

describe("Accordion", () => {
  it("starts with every section open, each named by its title", () => {
    render(<Accordion items={items} />);

    for (const { title, content } of items) {
      expect(header(title)).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("region", { name: title })).toHaveTextContent(
        content,
      );
    }
  });

  it("closes a section on click and opens it again, leaving the others open", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    await user.click(header("Technical specifications"));

    expect(header("Technical specifications")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.queryByText("Power: 1500W")).not.toBeInTheDocument();
    expect(header("Dimensions & weight")).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    await user.click(header("Technical specifications"));

    expect(header("Technical specifications")).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByText("Power: 1500W")).toBeVisible();
  });

  it("works with the keyboard: Tab reaches each title, Enter and Space toggle it", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    await user.tab();
    expect(header("Technical specifications")).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(header("Technical specifications")).toHaveAttribute(
      "aria-expanded",
      "false",
    );

    await user.keyboard(" ");
    expect(header("Technical specifications")).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    await user.tab();
    expect(header("Dimensions & weight")).toHaveFocus();
  });
});

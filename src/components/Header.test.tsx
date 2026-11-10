import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

const categoryNames = ["Kitchen", "Home Security", "Hair Care", "Accessories"];

// The page behind the open menu is hidden from assistive technology.
function menuButton(options: { hidden?: boolean } = {}) {
  return screen.getByRole("button", { name: "Open menu", ...options });
}

describe("Header", () => {
  it("shows the main navigation and « Where to buy », all leading to Coming soon", () => {
    render(<Header />);

    const nav = screen.getByRole("navigation", { name: "Main" });
    const links = within(nav).getAllByRole("link");

    expect(links.map((link) => link.textContent)).toEqual([
      ...categoryNames,
      "Where to buy",
    ]);
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/coming-soon");
    }
  });

  it("links the logo to the homepage", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: "Octopus home" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  describe("menu below 1200 px", () => {
    it("starts closed and says so", () => {
      render(<Header />);

      expect(menuButton()).toHaveAttribute("aria-expanded", "false");
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("opens on click and lists the navigation and « Where to buy »", async () => {
      const user = userEvent.setup();
      render(<Header />);

      await user.click(menuButton());

      const menu = screen.getByRole("dialog", { name: "Menu" });
      expect(
        within(menu)
          .getAllByRole("link")
          .map((link) => link.textContent),
      ).toEqual(expect.arrayContaining([...categoryNames, "Where to buy"]));
      for (const link of within(menu).getAllByRole("link")) {
        expect(link).not.toHaveAttribute("type");
      }
      expect(menuButton({ hidden: true })).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });

    it("closes with its close button and gives focus back to the menu button", async () => {
      const user = userEvent.setup();
      render(<Header />);

      await user.click(menuButton());
      await user.click(screen.getByRole("button", { name: "Close menu" }));

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(menuButton()).toHaveAttribute("aria-expanded", "false");
      expect(menuButton()).toHaveFocus();
    });

    it("closes on Escape and gives focus back to the menu button", async () => {
      const user = userEvent.setup();
      render(<Header />);

      await user.click(menuButton());
      await user.keyboard("{Escape}");

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      expect(menuButton()).toHaveFocus();
    });

    it("opens with the keyboard and keeps Tab inside the menu", async () => {
      const user = userEvent.setup();
      render(<Header />);

      menuButton().focus();
      await user.keyboard("{Enter}");

      const menu = screen.getByRole("dialog", { name: "Menu" });
      const focusable = [
        ...within(menu).getAllByRole("link"),
        ...within(menu).getAllByRole("button"),
      ];
      for (let step = 0; step <= focusable.length; step += 1) {
        expect(menu).toContainElement(document.activeElement as HTMLElement);
        await user.tab();
      }
    });

    it("closes once a link is chosen with the keyboard", async () => {
      const user = userEvent.setup();
      render(<Header />);

      await user.click(menuButton());
      within(screen.getByRole("dialog"))
        .getByRole("link", { name: "Kitchen" })
        .focus();
      await user.keyboard("{Enter}");

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes once the logo is chosen to go home", async () => {
      const user = userEvent.setup();
      render(<Header />);

      await user.click(menuButton());
      within(screen.getByRole("dialog"))
        .getByRole("link", { name: "Octopus home" })
        .focus();
      await user.keyboard("{Enter}");

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});

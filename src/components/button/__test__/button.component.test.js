import { render, screen } from "@testing-library/react";
import Button from "../button.component";

describe("button test", () => {
  test("should render base button when nothing is passed to it", () => {
    render(<Button>Test</Button>);
    const buttonEl = screen.getByText(/test/i);
    console.log("buttonEl:", buttonEl);

    // Get the computed style of the element
    const buttonStyles = window.getComputedStyle(buttonEl);
    // console.log("buttonStyles:", buttonStyles);

    // Check if the background color is either "black" or "ButtonFace"
    const backgroundColor = buttonStyles.backgroundColor.toLowerCase();
    expect(
      backgroundColor === "black" || backgroundColor === "buttonface"
    ).toBeTruthy();
    expect(screen.getByRole("button")).not.toBeDisabled();
  });
});

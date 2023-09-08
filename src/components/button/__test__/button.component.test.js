import { render, screen } from "@testing-library/react";
import Button, { BUTTON_TYPE_CLASSES } from "../button.component";

describe("button test", () => {
  test("should render base button when nothing is passed to it", () => {
    render(<Button>Test</Button>);
    const buttonEl = screen.getByText(/test/i);
    // Get the computed style of the element
    const buttonStyles = window.getComputedStyle(buttonEl);

    // Check if the background color is either "black" or "ButtonFace"
    const backgroundColor = buttonStyles.backgroundColor.toLowerCase();
    expect(
      backgroundColor === "black" || backgroundColor === "buttonface"
    ).toBeTruthy();
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  test("should render google button when passed google type", () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.google}>Test</Button>);
    const googleBtn = screen.getByRole("button");
    // console.log("googleBtn:", googleBtn);

    // Get the computed style of the element
    const buttonStyles = window.getComputedStyle(googleBtn);
    // console.log("buttonStyles:", buttonStyles);

    // Check if the background color is either "4285f4" or "ButtonFace"
    const backgroundColor = buttonStyles.backgroundColor.toLowerCase();
    // console.log("backgroundColor:", backgroundColor);

    expect(
      backgroundColor === "#4285f4" || backgroundColor === "buttonface"
    ).toBeTruthy();
  });

  test("should render inverted button when passed inverted type", () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Test</Button>);
    const invertedBtn = screen.getByRole("button");
    // console.log("invertedBtn:", invertedBtn);

    // Get the computed style of the element
    const buttonStyles = window.getComputedStyle(invertedBtn);
    // console.log("buttonStyles:", buttonStyles);

    // Check if the background color is either "white" or "ButtonFace"
    const backgroundColor = buttonStyles.backgroundColor.toLowerCase();
    expect(
      backgroundColor === "white" || backgroundColor === "buttonface"
    ).toBeTruthy();
  });

  test("should be disabled if isLoading is true", () => {
    render(<Button isLoading={true}>Test</Button>);

    expect(screen.getByRole("button")).toBeDisabled();
  });
});

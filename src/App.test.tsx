import { test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("Capacitor React App with Map Tracking present", async () => {
  render(<App />);
  const text = await screen.getByText("Capacitor React App with Map Tracking");
  expect(text).toBeInTheDocument();
});

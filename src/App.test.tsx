import { test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("Hello world present", async () => {
  render(<App />);
  const text = await screen.getByText("Hello World");
  expect(text).toBeInTheDocument();
});

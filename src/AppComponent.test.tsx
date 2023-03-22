import { test } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import AppContent, { SuspendedRoute } from "./AppContent";

test("AppContent", () => {
  test("renders the home page by default", () => {
    const { getByText } = render(<AppContent />);
    expect(getByText("Hdome")).toBeTruthy();
  });

  test("renders the map page when the map tab is clicked", async () => {
    const { getByText, findByText } = render(<AppContent />);
    const mapTab = getByText("Map");
    expect(mapTab).toBeInTheDocument();

    // Click the tab and wait for the component to load
    mapTab.click();
    const mapPageTitle = await findByText("Map Page");
    expect(mapPageTitle).toBeInTheDocument();
  });

  test("renders the game page when the game tab is clicked", async () => {
    const { getByText, findByText } = render(<AppContent />);
    const gameTab = getByText("Charades");
    expect(gameTab).toBeInTheDocument();

    // Click the tab and wait for the component to load
    gameTab.click();
    const gamePageTitle = await findByText("Game Page");
    expect(gamePageTitle).toBeInTheDocument();
  });
});

test("SuspendedRoute", () => {
  test("renders the loading animation when the component is loading", () => {
    const { getByText } = render(
      <SuspendedRoute>
        <div>Component</div>
      </SuspendedRoute>
    );
    expect(getByText("Loading")).toBeInTheDocument();
  });

  test("renders the component when it is loaded", async () => {
    const Component = () => <div>Component</div>;
    const { getByText, findByText } = render(
      <SuspendedRoute>
        <Component />
      </SuspendedRoute>
    );
    const loadingText = getByText("Loading");
    expect(loadingText).toBeInTheDocument();

    const component = await findByText("Component");
    expect(component).toBeInTheDocument();
  });
});

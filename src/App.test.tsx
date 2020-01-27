import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

test("renders about link", () => {
  const { getByText } = render(
    <Router>
      <App />
    </Router>
  );
  const linkElement = getByText(/about/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders home link", () => {
  const { getByText } = render(
    <Router>
      <App />
    </Router>
  );
  const linkElement = getByText(/home/i);
  expect(linkElement).toBeInTheDocument();
});

import React from "react";
import { render } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import App from "../../App";

test("App starts and renders without error", () => {
  render(<App />);
});

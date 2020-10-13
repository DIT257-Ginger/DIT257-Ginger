import React from "react";
import { render } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import History from "../screens/History";

test("history screen renders without error", () => {
  render(<History />);
});

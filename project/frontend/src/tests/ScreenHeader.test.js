import React from "react";
import { Text, View } from "react-native";
import { render, waitFor } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import ScreenHeader from "../components/ScreenHeader";

test("children are displayed", async () => {
  const { getByText } = render(
    <ScreenHeader>
      <Text>Test</Text>
      <View>
        <Text>Hello</Text>
      </View>
    </ScreenHeader>
  );

  expect(getByText("Test")).toBeTruthy();
  expect(getByText("Hello")).toBeTruthy();
});

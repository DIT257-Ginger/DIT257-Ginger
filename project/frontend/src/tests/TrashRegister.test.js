import { render, fireEvent, waitFor } from "@testing-library/react-native";
import {
  writeTrashCount,
  readTrashCount,
} from "../persistence/local/trashCount";
import React from "react";
import TrashRegister from "../components/TrashRegister";
import { act } from "react-test-renderer";

test("pressing add bag increments persistent trash count", async () => {
  const initialTrashCount = 10;
  await writeTrashCount(initialTrashCount);

  const { getByText, getByTestId } = render(<TrashRegister />);
  await waitFor(() => {
    expect(getByTestId("increment-btn")).toBeTruthy();
  });
  await act(async () => fireEvent.press(getByTestId("increment-btn")));

  const savedTrashCount = await readTrashCount();

  expect(savedTrashCount).toBe(initialTrashCount + 1);
});

test("pressing clear will reset collected trash to 0", async () => {
  const initialTrashCount = 172;
  await writeTrashCount(initialTrashCount);

  const { getByText, getByTestId } = render(<TrashRegister />);
  await waitFor(() => {
    expect(getByTestId("clear-btn")).toBeTruthy();
  });
  await act(async () => fireEvent.press(getByTestId("clear-btn")));

  const savedTrashCount = await readTrashCount();

  expect(savedTrashCount).toBe(0);
});

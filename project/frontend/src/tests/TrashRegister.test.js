import { render, fireEvent, waitFor } from "@testing-library/react-native";
import {
  writeTrashCount,
  readTrashCount,
} from "../persistence/local/trashCount";
import { writeCollectedTrash } from "../persistence/local/collectedTrash";
import { collect } from "../features/trashCollection";
import React from "react";
import TrashRegister from "../components/TrashRegister";

//Reset to Default Value before each test.
beforeEach(async () => {
  await writeTrashCount(0);
  await writeCollectedTrash([]);
});

//Tests if the add button works
test("pressing add bag increments persistent trash count", async () => {
  const initialTrashCount = 10;
  await writeTrashCount(initialTrashCount);

  const { findByTestId } = render(<TrashRegister />);
  const button = await findByTestId("add-bag-btn");
  fireEvent.press(button);

  await waitFor(async () =>
    expect(readTrashCount()).resolves.toBe(initialTrashCount + 1)
  );
});

//Tests if the remove button works
test("pressing remove bag decrements persistent trash count", async () => {
  await collect("bag", 1);
  await collect("bag", 3);
  await collect("bag", 2);
  await collect("bag", 1);

  const { findByTestId } = render(<TrashRegister />);
  const button = await findByTestId("remove-bag-btn");
  fireEvent.press(button);

  await waitFor(async () => expect(readTrashCount()).resolves.toBe(6));
});

//Tests if the collect type button shows the modal view
test("pressing collect type button opens modal", async () => {
  const { getByTestId, findByTestId } = render(<TrashRegister />);
  const button = getByTestId("collect-type-btn");
  fireEvent.press(button);

  const modal = await findByTestId("collect-modal");
  waitFor(() => expect(modal.props.visible).toBe(true));
});

//Tests if the cancel button hides the modal view
test("pressing cancel button hides modal", async () => {
  const { getByTestId, findByTestId } = render(<TrashRegister />);
  const collectTypeButton = getByTestId("collect-type-btn");
  fireEvent.press(collectTypeButton);

  const cancelButton = getByTestId("cancel-btn");
  fireEvent.press(cancelButton);

  const modal = await findByTestId("collect-modal");
  waitFor(() => expect(modal.props.visible).toBe(false));
});

//Tests if the collect button hides the modal view
test("pressing collect button hides modal", async () => {
  const { getByTestId, findByTestId } = render(<TrashRegister />);
  const collectTypeButton = getByTestId("collect-type-btn");
  fireEvent.press(collectTypeButton);

  const collectButton = getByTestId("collect-btn");
  fireEvent.press(collectButton);

  const modal = await findByTestId("collect-modal");
  waitFor(() => expect(modal.props.visible).toBe(false));
});

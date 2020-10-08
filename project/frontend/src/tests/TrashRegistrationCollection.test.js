import { render, fireEvent, waitFor } from "@testing-library/react-native";
import {
  writeTrashCount,
  readTrashCount,
} from "../persistence/local/trashCount";
import { writeCollectedTrash } from "../persistence/local/collectedTrash";
import { getTrashTypes } from "../features/trashCollection";
import React from "react";
import TrashRegistrationSelection from "../components/TrashRegistrationSelection";

//Reset to Default Value before each test.
beforeEach(async () => {
  await writeTrashCount(0);
  await writeCollectedTrash([]);
});

//TODO Test so that all trash type values get added to the expected sum
const trashTypes = getTrashTypes();
test("set each trash type to 1 and press collect, then check that trash count has the right value", async () => {
  const { getAllByDisplayValue, getByTestId } = render(
    <TrashRegistrationSelection />
  );

  const textinputs = getAllByDisplayValue("0");
  for (const input of textinputs) {
    fireEvent.changeText(input, "1");
  }

  const collectBtn = getByTestId("collect-btn");
  fireEvent.press(collectBtn);

  const trashSum = trashTypes
    .map((type) => type.value)
    .reduce((a, b) => a + b, 0);
  await waitFor(async () => expect(await readTrashCount()).toBe(trashSum));
});

//Test and see if the cancelled button has run.
test("press cancel and check that onCancelled is run", async () => {
  const onCancelledMock = jest.fn();
  const { getByTestId } = render(
    <TrashRegistrationSelection onCancelled={onCancelledMock} />
  );

  const cancelBtn = getByTestId("cancel-btn");
  fireEvent.press(cancelBtn);

  expect(onCancelledMock).toHaveBeenCalledTimes(1);
});

//Test and see if the collected button has run.
test("press collect and check that onTrashCollected is run", async () => {
  const onCollectMock = jest.fn();
  const { getByTestId } = render(
    <TrashRegistrationSelection onTrashCollected={onCollectMock} />
  );

  const collectBtn = getByTestId("collect-btn");
  fireEvent.press(collectBtn);

  expect(onCollectMock).toHaveBeenCalledTimes(1);
});
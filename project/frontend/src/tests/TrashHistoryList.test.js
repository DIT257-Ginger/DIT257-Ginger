import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import TrashHistoryList from "../components/TrashHistoryList";
import {
  writeTrashCount,
  readTrashCount,
} from "../persistence/local/trashCount";
import {
  readCollectedTrash,
  writeCollectedTrash,
} from "../persistence/local/collectedTrash";
import {
  collect,
  getTrashTypes,
  TrashCollectionEntry,
} from "../features/trashCollection";

const trashTypesById = getTrashTypes().reduce((trashValObj, type) => {
  trashValObj[type.id] = type;
  return trashValObj;
}, {});

//Reset to Default Value before each test.
beforeEach(async () => {
  await writeTrashCount(0);
  await writeCollectedTrash([]);
});

test("all collected trash is displayed in history list", async () => {
  await collect("bag", 10);
  await collect("bag", 3);
  await collect("bag", 100);
  await collect("bag", 20);
  const collectedTrash = await readCollectedTrash();
  collectedTrash.sort((e1, e2) => e2.time - e1.time);

  const { getAllByTestId } = render(<TrashHistoryList />);
  const rows = await waitFor(() => getAllByTestId("trash-row"));

  expect(rows).toHaveLength(collectedTrash.length);
  rows.forEach((row, index) => {
    const expectedTrash = collectedTrash[index];
    expect(within(row).getByText("" + expectedTrash.amount)).toBeTruthy();
    expect(
      within(row).getByText(trashTypesById[expectedTrash.type].name)
    ).toBeTruthy();
  });
});

test("pressing undo removes trash entry from storage", async () => {
  await writeCollectedTrash([
    new TrashCollectionEntry("1", "bag", 10, 1),
    new TrashCollectionEntry("2", "bag", 3, 2),
    new TrashCollectionEntry("3", "bag", 100, 3),
    new TrashCollectionEntry("4", "bag", 20, 4),
  ]);

  const { getAllByTestId } = render(<TrashHistoryList />);
  const rows = await waitFor(() => getAllByTestId("trash-row"));

  const thirdRowDeleteButton = within(rows[2]).getByTestId("delete-btn");
  fireEvent.press(thirdRowDeleteButton);

  await waitFor(async () => {
    const collectedIds = (await readCollectedTrash()).map((entry) => entry.id);
    expect(collectedIds).toEqual(["1", "3", "4"]);
  });
});

test("pressing undo removes trash row from list", async () => {
  await writeCollectedTrash([
    new TrashCollectionEntry("1", "bag", 10, 1),
    new TrashCollectionEntry("2", "bag", 3, 2),
    new TrashCollectionEntry("3", "bag", 100, 3),
    new TrashCollectionEntry("4", "bag", 20, 4),
  ]);

  const { getAllByTestId, queryAllByTestId } = render(<TrashHistoryList />);
  const rows = await waitFor(() => getAllByTestId("trash-row"));

  const thirdRowDeleteButton = within(rows[2]).getByTestId("delete-btn");
  fireEvent.press(thirdRowDeleteButton);

  await waitFor(() => {
    expect(queryAllByTestId("trash-row")).toHaveLength(3);
  });
});

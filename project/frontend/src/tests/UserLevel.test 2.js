import { render, waitFor } from "@testing-library/react-native";
import { writeTrashCount } from "../persistence/local/trashCount";
import { getLevel, getPercentProgressToNextLevel } from "../features/leveling";
import React from "react";
import UserLevel from "../components/UserLevel";

test("UserLevel displays the correct user level", async () => {
  const trashCounts = [...Array(100).keys()];
  trashCounts.forEach(async (trashCount) => {
    await writeTrashCount(trashCount);
    const actualLevel = await getLevel();

    const { getByTestId } = render(<UserLevel />);
    await waitFor(() => {
      expect(getByTestId("level-text")).toBeTruthy();
    });

    expect(getByTestId("level-text").props.children).toEqual(actualLevel);
  });
});

test("UserLevel displays the correct progress", async () => {
  const trashCounts = [...Array(100).keys()];
  trashCounts.forEach(async (trashCount) => {
    await writeTrashCount(trashCount);
    const actualProgress = await getPercentProgressToNextLevel();

    const { getByTestId } = render(<UserLevel />);
    await waitFor(() => {
      expect(getByTestId("level-progress")).toBeTruthy();
    });

    expect(getByTestId("level-progress").props.percent).toEqual(actualProgress);
  });
});

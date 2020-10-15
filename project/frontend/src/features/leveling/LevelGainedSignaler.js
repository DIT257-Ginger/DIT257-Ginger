import { getLevel, trashCountToLevel } from "./leveling";
import { TrashCountChangedSignaler } from "../trashCollection/TrashCountChangedSignaler";

export const LevelGainedSignaler = {
  subscribe: (fn, callWithLevel = true) => {
    const fnObj = { fn: fn, callWithLevel: callWithLevel };
    if (!LevelGainedSignaler.handlers.includes(fnObj)) {
      LevelGainedSignaler.handlers.push(fnObj);
    }
  },
  unSubscribe: (fn) => {
    LevelGainedSignaler.handlers = this.functions.filter((item) => {
      if (item.fn !== fn) {
        return item;
      }
    });
  },
  handlers: [],
  signal: (level) => {
    LevelGainedSignaler.handlers.forEach((item) => {
      if (item.callWithLevel) {
        item.fn(level);
      } else {
        item.fn();
      }
    });
  },
};

export async function signalPotentialLevelUp(newTrashCount) {
  const newLevel = trashCountToLevel(newTrashCount);
  if ((await getLevel()) < newLevel) {
    LevelGainedSignaler.signal(newLevel);
  }
}

TrashCountChangedSignaler.subscribe(signalPotentialLevelUp);

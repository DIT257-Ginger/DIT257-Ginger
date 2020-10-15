export const TrashCountChangedSignaler = {
  subscribe: (fn, callWithNewTrashCount = true) => {
    const fnObj = { fn: fn, callWithNewTrashCount: callWithNewTrashCount };
    if (!TrashCountChangedSignaler.handlers.includes(fnObj)) {
      TrashCountChangedSignaler.handlers.push(fnObj);
    }
  },
  unSubscribe: (fn) => {
    TrashCountChangedSignaler.handlers = this.functions.filter((item) => {
      if (item.fn !== fn) {
        return item;
      }
    });
  },
  handlers: [],
  signal: (newTrashCount) => {
    TrashCountChangedSignaler.handlers.forEach((item) => {
      if (item.callWithNewTrashCount) {
        item.fn(newTrashCount);
      } else {
        item.fn();
      }
    });
  },
};

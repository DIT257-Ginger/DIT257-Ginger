export const AchievementGainedSignaler = {
  subscribe: (fn, callWithId = true) => {
    const fnObj = { fn: fn, callWithId: callWithId };
    if (!AchievementGainedSignaler.handlers.includes(fnObj)) {
      AchievementGainedSignaler.handlers.push(fnObj);
    }
  },
  unSubscribe: (fn) => {
    AchievementGainedSignaler.handlers = AchievementGainedSignaler.handlers.filter(
      (item) => {
        if (item.fn !== fn) {
          return item;
        }
      }
    );
  },
  handlers: [],
  signal: (id) => {
    //console.log("AchievementGainedSignaler functions:");
    //console.log(this);
    AchievementGainedSignaler.handlers.forEach((item) => {
      if (item.callWithId) {
        item.fn(id);
      } else {
        item.fn();
      }
    });
  },
};

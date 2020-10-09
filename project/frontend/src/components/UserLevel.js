import React, { useState, useEffect } from "react";
import { getPercentProgressToNextLevel, getLevel } from "../features/leveling";
import { Text, View } from "react-native";
import ProgressCircle from "react-native-progress-circle";

export default function UserLevel({ trashCount, style }) {
  const [level, setLevel] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    async function fetchLevelData() {
      const newLevel = await getLevel();
      const newProgress = await getPercentProgressToNextLevel();
      setLevel(newLevel);
      setProgressPercent(newProgress);
    }
    fetchLevelData();
  });

  return (
    <View style={style}>
      <ProgressCircle
        percent={progressPercent}
        radius={40}
        borderWidth={7}
        color="#00D084"
        shadowColor="#C4DEF6"
        bgColor="#FFF"
        testID="level-progress"
      >
        <Text style={{ fontSize: 14, color: "#607D8B" }}>level</Text>
        <Text style={{ fontSize: 30 }} testID="level-text">
          {level}
        </Text>
      </ProgressCircle>
    </View>
  );
}

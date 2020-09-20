import React, { useState, useEffect } from "react";
import {
  getPercentProgressToNextLevel,
  getTrashRequiredForNextLevel,
  getLevel,
} from "../features/leveling";
import { View, Text } from "react-native";
import ProgressCircle from "react-native-progress-circle";

export default function UserLevel() {
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
    <ProgressCircle
      percent={progressPercent}
      radius={40}
      borderWidth={7}
      color="#00D084"
      shadowColor="#C4DEF6"
      bgColor="#FFF"
    >
      <Text style={{ fontSize: 14, color: "#607D8B" }}>level</Text>
      <Text style={{ fontSize: 30 }}>{level}</Text>
    </ProgressCircle>
  );
}

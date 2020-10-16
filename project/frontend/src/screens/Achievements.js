import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import Icon from "react-native-vector-icons/FontAwesome";
import ProgressCircle from "react-native-progress-circle";
import { allAchievements } from "../features/achievements/AllAchievements";
import { getAchievements } from "../features/achievements/";
import { AchievementGainedSignaler } from "../features/achievements/";

export function Achievements({ navigation }) {
  const [collectedAchievements, setcollectedAchievements] = useState([]);
  const [loaded, setLoaded] = useState(false);

  function reload() {
    setLoaded(false);
  }

  async function fetchAchievement() {
    const achievements = await getAchievements();
    setcollectedAchievements(achievements);
    setLoaded(true);
  }

  if (!loaded) {
    fetchAchievement();
  }

  // Subscribe to my youtube channel
  useEffect(() => {
    AchievementGainedSignaler.subscribe(reload, false);
  }, []);

  const displayedAchivements = allAchievements.map((achievement) => {
    return {
      ...achievement,
      collected: collectedAchievements.some(
        (item) => item.id === achievement.id
      ),
      //collected: collectedAchievements.includes(allAchievements.id),
    };
  });

  return (
    <View style={styles.screenContainer}>
      <Header
        numCollected={collectedAchievements.length}
        totalAvailable={allAchievements.length}
      />

      <FlatList
        data={displayedAchivements}
        keyExtractor={(a) => a.id}
        renderItem={({ item }) => (
          <AchievementRow
            title={item.title}
            description={item.description}
            icon={item.icon}
            secret={item.secret}
            collected={item.collected}
          />
        )}
        style={{ overflow: "visible", marginTop: 5 }}
      />
    </View>
  );
}

const Header = ({ numCollected, totalAvailable }) => (
  <ScreenHeader>
    <Text style={styles.headerTitle}>Achievements</Text>
    <ProgressCircle
      percent={(numCollected / totalAvailable) * 100}
      radius={20}
      borderWidth={3}
      color="white"
      shadowColor="#2e9e8d"
      bgColor="#31A896"
    >
      <Text style={styles.headerCounter}>
        {numCollected}/{totalAvailable}
      </Text>
    </ProgressCircle>
  </ScreenHeader>
);

const AchievementRow = ({ title, description, icon, secret, collected }) => (
  <View style={styles.achievementRow}>
    <View
      style={[
        styles.achievementIconContainer,
        !collected && styles.achievementIconContainerNotCollected,
      ]}
    >
      {!collected && secret ? (
        <Icon
          name="question"
          size={40}
          color="white"
          style={styles.achievementIconSecret}
        />
      ) : (
        <Image
          source={icon}
          style={[
            styles.achievementIcon,
            !collected && styles.achievementIconNotCollected,
          ]}
        />
      )}
    </View>
    <View style={styles.achievementInfoContainer}>
      <Text
        style={[
          styles.achievementTitle,
          !collected && styles.achievementTitleNotCollected,
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.achievementDescription,
          !collected && styles.achievementDescriptionNotCollected,
        ]}
      >
        {!collected && secret ? "???" : description}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#8EE1FF",
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  headerCounter: {
    color: "white",
    fontSize: 15,
  },
  achievementRow: {
    flexDirection: "row",
    flexShrink: 1,
    marginVertical: 3,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 20,
    backgroundColor: "#31A896",
    borderRadius: 40,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    // Android shadow
    elevation: 4,
  },
  achievementIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 1000,
    backgroundColor: "rgba(0,0,0,0.25)",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "white",
  },
  achievementIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  achievementIconSecret: {
    color: "rgba(0,0,0,0.3)",
  },
  achievementInfoContainer: {
    flex: 1,
    alignSelf: "center",
    marginLeft: 10,
    color: "black",
  },
  achievementTitle: {
    fontSize: 20,
    color: "white",
  },
  achievementDescription: {
    color: "rgba(0,0,0,0.9)",
  },
  achievementIconContainerNotCollected: {
    borderWidth: 0,
  },
  achievementIconNotCollected: {
    opacity: 0.3,
  },
  achievementTitleNotCollected: {
    color: "rgba(0,0,0,0.5)",
  },
  achievementDescriptionNotCollected: {
    color: "rgba(0,0,0,0.5)",
  },
});

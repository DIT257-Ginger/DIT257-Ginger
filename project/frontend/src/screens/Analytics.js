import collectedTrash, {
  readCollectedTrash,
} from "../persistence/local/collectedTrash";

import { color, max, set, Value } from "react-native-reanimated";

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import ScreenHeader from "../components/ScreenHeader";
import { PieChart, BarChart, Grid, YAxis } from "react-native-svg-charts";
import { Circle, G, Image } from "react-native-svg";

import { readTrashCount } from "../persistence";
import {
  calculateTrashCountOfType,
  getTrashTypes,
} from "../features/trashCollection";
import * as scale from "d3-scale";
import { TrashCountChangedSignaler } from "../features/trashCollection";

export default function Analytics({ navigation }) {
  const [collectedTrash, setCollectedTrash] = useState(0);

  const [trashTypeValues, setTrashTypes] = useState([]);

  useEffect(() => {
    async function fetchTrashCount() {
      const collectedTrash = await readTrashCount();

      setCollectedTrash(collectedTrash);
    }
    async function fetchTrashTypes() {
      const trashTypes = getTrashTypes();

      const newTrashTypes = await Promise.all(
        trashTypes.map(async (type) => {
          return {
            type: type.id,

            count: await calculateTrashCountOfType(type.id),
          };
        })
      );
      setTrashTypes(newTrashTypes);
    }
    const fetchState = () => {
      fetchTrashCount();
      fetchTrashTypes();
    };
    const unsubscribe = navigation.addListener("focus", () => {
      fetchState();
    });
    return unsubscribe;
  }, []);

  /**
   * function that checks if the values in the array are not null
   * @param {array<TrashTypes>} array - Array of trash objects
   * @param {String} type - type of trash
   * @returns {number} - amount of a certain trash type
   */

  function checkValueofArray(array, type) {
    const bool = array
      .map((objekt) => objekt.type === type)
      .reduce((a, b) => a || b, false);

    if (!bool) {
      return 0;
    }
    return trashTypeValues.find((p) => p.type === type).count;
  }

  /**
   * function for calculating random colors, to use then in PieChart
   */
  const randomColor = () =>
    ("#" + ((Math.random() * 0xffffff) << 0).toString(16) + "000000").slice(
      0,
      7
    );

  /**
   * Array of trash types objects, used in PieChart
   * the labels are there just to make it clearer which trash type belongs to
   */

  const trashTypeData = [
    {
      key: 1,
      amount: checkValueofArray(trashTypeValues, "bag"),
      svg: { fill: randomColor() },
    },
    {
      key: 2,
      amount: checkValueofArray(trashTypeValues, "battery"),
      svg: { fill: randomColor() },
    },
    {
      key: 3,
      amount: checkValueofArray(trashTypeValues, "cigarette"),
      svg: { fill: randomColor() },
    },
    {
      key: 4,
      amount: checkValueofArray(trashTypeValues, "candyWrapper"),
      svg: { fill: randomColor() },
    },
    {
      key: 5,
      amount: checkValueofArray(trashTypeValues, "metalCan"),
      svg: { fill: randomColor() },
    },
  ];

  /**
   * Used to calculate the highest number of certain trash type
   * this to make the ChartBar more proportionate
   */
  const findMaxValueScaleYAxis = trashTypeValues
    .map((id) => id.count)
    .reduce((p, v) => (p > v ? p : v), 0);

  /**
   * Filters the trash types that haven't been collected yet e.g with zero values
   *
   */
  const pieData = trashTypeData.filter((value) => value.amount > 0);

  const amountOfWholeTrash = collectedTrash;

  /**
   * Used to get the chosen Images from trashTypes module
   */
  const trashImages = getTrashTypes().map((image) => image.image);

  /**
   * Function to draw the PieSlices and place the images on every slice
   */
  const Labels = ({ slices, height, width }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <G key={index} x={labelCentroid[0]} y={labelCentroid[1]}>
          <Circle r={17} fill={"white"} />
          <Image
            x={-15}
            y={-15}
            width={30}
            height={30}
            preserveAspectRatio="xMidYMid slice"
            opacity="1"
            href={trashImages[index]}
          />
        </G>
      );
    });
  };

  /**
   * Drawing the Charts components
   * @component {pieChart}
   * @component {BarChart}
   */

  return (
    <View style={styles.screenContainer}>
      <ScreenHeader>
        <Text style={styles.headerTitle}>Analytics</Text>
      </ScreenHeader>
      <View>
        <PieChart
          style={{ height: 350 }}
          valueAccessor={({ item }) => item.amount}
          data={pieData}
          spacing={0}
          innerRadius="25"
          outerRadius={"70"}
        >
          <Labels />
        </PieChart>
        <Text
          style={{
            color: randomColor(),
            alignSelf: "center",
            marginBottom: 10,
            paddingHorizontal: 20,
            fontSize: 25,
          }}
        >
          {collectedTrash} Trash Bags
        </Text>
      </View>

      <View style={{ flexDirection: "row", flex: 1, paddingVertical: 14 }}>
        <YAxis
          data={trashTypeData}
          yAccessor={({ index }) => index}
          scale={scale.scaleBand}
          contentInset={{ top: 20, bottom: 1 }}
          spacing={100}
          svg={{
            fill: "black",
            fontWeight: "900",
            fontSize: 16,
            strokeWidth: 5.1,
            baselineShift: 10,
          }}
          style={{ marginLeft: 10, width: 35 }}
          numberOfTicks={3}
          formatLabel={(_, index) => trashTypeData[index].amount}
        />
        <BarChart
          style={{ flex: 1 }}
          data={trashTypeData}
          horizontal={true}
          yAccessor={({ item }) => item.amount}
          yMax={findMaxValueScaleYAxis + 2}
          svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
          animate={true}
          animationDuration={600}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          gridMin={1}
        >
          <Grid direction={Grid.Direction.VERTICAL} />
        </BarChart>
      </View>
    </View>
  );
}

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
});

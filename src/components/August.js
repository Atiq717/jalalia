import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const API_URL = process.env.REACT_APP_AUG_API_URL;

export default function August() {
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    async function fetchTimetable() {
      try {
        const response = await axios.get(API_URL);
        console.log("API response:", response.data);
        const formattedData = response.data.map((entry) => ({
          ...entry,
          date: formatDate(entry.date),
        }));
        setTimetable(formattedData);
      } catch (error) {
        console.error("Error fetching timetable", error);
      }
    }

    fetchTimetable();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.toLocaleString("en-US", { weekday: "short" });
    const dayOfMonth = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day} ${dayOfMonth}-${month}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <View>
          {/* Table Header */}
          <View style={styles.header}>
            <Text style={[styles.headerText, styles.stickyHeader]}>Date</Text>
            <Text style={styles.headerText}>Fajr</Text>
            <Text style={styles.headerText}>Fajr Jamaah</Text>
            <Text style={styles.headerText}>Sunrise</Text>
            <Text style={styles.headerText}>Dhuhr</Text>
            <Text style={styles.headerText}>Dhuhr Jamaah</Text>
            <Text style={styles.headerText}>Asr</Text>
            <Text style={styles.headerText}>Asr Jamaah</Text>
            <Text style={styles.headerText}>Sunset</Text>
            <Text style={styles.headerText}>Maghrib Jamaah</Text>
            <Text style={styles.headerText}>Isha</Text>
            <Text style={styles.headerText}>Isha Jamaah</Text>
          </View>

          <ScrollView style={styles.scrollView}>
            {/* Table Rows */}
            {Array.isArray(timetable) &&
              timetable.map((entry, index) => {
                const day = entry.date.split(" ")[0];
                const isFriday = day === "Fri";
                const isWeekend = day === "Sat" || day === "Sun";
                return (
                  <View
                    key={index}
                    style={[
                      styles.row,
                      isFriday && styles.highlightedRow,
                      isWeekend && styles.weekendRow,
                    ]}
                  >
                    <Text
                      style={[
                        styles.cell,
                        styles.stickyColumn,
                        (isFriday || isWeekend) && styles.highlightedText,
                      ]}
                    >
                      {entry.date}
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        (isFriday || isWeekend) && styles.highlightedText,
                      ]}
                    >
                      {entry.fajr}
                    </Text>
                    <Text style={[styles.cell, styles.highlightedCell]}>
                      {entry.fajr_jamah}
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        (isFriday || isWeekend) && styles.highlightedText,
                      ]}
                    >
                      {entry.sunrise}
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        (isFriday || isWeekend) && styles.highlightedText,
                      ]}
                    >
                      {entry.dhuhr}
                    </Text>
                    <Text style={[styles.cell, styles.highlightedCell]}>
                      {entry.dhuhr_jamah}
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        (isFriday || isWeekend) && styles.highlightedText,
                      ]}
                    >
                      {entry.asr}
                    </Text>
                    <Text style={[styles.cell, styles.highlightedCell]}>
                      {entry.asr_jamah}
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        (isFriday || isWeekend) && styles.highlightedText,
                      ]}
                    >
                      {entry.sunset}
                    </Text>
                    <Text style={[styles.cell, styles.highlightedCell]}>
                      {entry.maghrib_jamah}
                    </Text>
                    <Text
                      style={[
                        styles.cell,
                        (isFriday || isWeekend) && styles.highlightedText,
                      ]}
                    >
                      {entry.isha}
                    </Text>
                    <Text style={[styles.cell, styles.highlightedCell]}>
                      {entry.isha_jamah}
                    </Text>
                  </View>
                );
              })}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8ff",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#e6f7ff",
    padding: 8,
    zIndex: 2, // Ensures header is above the rows
  },
  headerText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollView: {
    marginTop: -8, // Adjusts for header height
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  cell: {
    flex: 1,
    padding: 8,
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  highlightedCell: {
    backgroundColor: "#ffbc00",
    zIndex: 1, // Lower zIndex to be overlapped by highlightedRow
  },
  highlightedRow: {
    backgroundColor: "#006b52",
    zIndex: 2, // Higher zIndex to overlap highlightedCell
  },
  weekendRow: {
    backgroundColor: "#ffebb3",
    zIndex: 2, // Higher zIndex to overlap highlightedCell
  },
  stickyHeader: {
    position: "relative",
    top: 0,
    zIndex: 3, // Ensures it is above the rest of the table
    backgroundColor: "#e6f7ff",
  },
  stickyColumn: {
    backgroundColor: "#e6f7ff",
    position: "relative",
    left: 0,
    zIndex: 1, // Ensures it is above other cells in the same row
  },
  highlightedText: {
    color: "#000", // Text color for highlighted rows
  },
});

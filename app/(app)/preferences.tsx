import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker, PickerIOS } from "@react-native-picker/picker";
import statesAndCounties from "@/assets/statesAndCounties.json";
import { useSession } from "@/ctx";
import Button from "@/components/ui/Button";
import Colors from "@/constants/Colors";
import Styles from "@/constants/Styles";

import { Severity } from "@/constants/types";

type Props = {};

const preferences = () => {
  const { session } = useSession();

  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [selectedSeverity, setSelectedSeverityy] = useState<Severity | null>(
    null
  );
  const [counties, setCounties] = useState<string[]>([]);

  const filterCountiesBasedOnState = (state: string) => {
    const filteredCounties = statesAndCounties
      .filter((item) => item.state_name === state)
      .map((item) => item.county_full);
    setCounties(filteredCounties);
  };

  const fetchUserPreferences = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BACKEND_URI}/api/user/me/alertpref`,
        {
          headers: { Authorization: `Bearer ${session}` },
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      setSelectedState(data.preferences?.state);
      setSelectedCounty(data.preferences?.county);
      setSelectedSeverityy(data.preferences?.severity);
      filterCountiesBasedOnState(data.preferences?.state);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserPreferences();
  }, [session]);

  const handleStateChange = (state: string | " " | null) => {
    if (!state || state === " ") {
      setSelectedState(null);
    } else {
      setSelectedState(state);
      filterCountiesBasedOnState(state);
      setSelectedCounty(null);
    }
  };

  const handleSeverityChange = (severity: Severity | " " | null) => {
    if (!severity || severity == " ") {
      setSelectedSeverityy(null);
    } else {
      setSelectedSeverityy(severity);
    }
  };
  const handleCountyChange = (county: string | " " | null) => {
    if (!county || county == " ") {
      setSelectedCounty(null);
    } else {
      setSelectedCounty(county);
    }
  };

  const handleSave = async () => {
    if (!selectedState || selectedState === " ") {
      Alert.alert("Error", "Please select at least a state");
      return;
    }

    try {
      console.log({
        state: selectedState,
        county: selectedCounty,
        severity: selectedSeverity,
      });

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_BACKEND_URI}/api/user/me/alertpref`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            state: selectedState,
            county: selectedCounty,
            severity: selectedSeverity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save preferences.");
      }

      console.log("Alert preferences saved successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={Styles.pageContainer}>
      <View style={{}}>
        <Text style={Styles.pageTitle}>Preferences</Text>

        <View style={[styles.dropwdownContainer, Styles.card]}>
          <Text style={styles.title}>State</Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedState}
              onValueChange={(value) => handleStateChange(value)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              mode="dropdown"
            >
              <Picker.Item label="Select a state" value={" "} />
              {Array.from(
                new Set(statesAndCounties.map((item) => item.state_name))
              )
                .slice() // Create a copy to avoid mutating the original array
                .sort((a, b) => a.localeCompare(b)) // Sort alphabetically
                .map((state) => (
                  <Picker.Item key={state} label={state} value={state} />
                ))}
            </Picker>
          </View>
        </View>

        <View style={[styles.dropwdownContainer, Styles.card]}>
          <Text style={styles.title}>County</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCounty}
              onValueChange={(value) => handleCountyChange(value)}
              style={styles.picker}
              enabled={!!selectedState}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Select a county" value={" "} />
              {counties
                .slice() // Create a copy to avoid mutating the original array
                .sort((a, b) => a.localeCompare(b)) // Sort alphabetically
                .map((county) => (
                  <Picker.Item key={county} label={county} value={county} />
                ))}
            </Picker>
          </View>
        </View>

        <View style={[styles.dropwdownContainer, Styles.card]}>
          <Text style={styles.title}>Severity</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedSeverity}
              onValueChange={(value) => handleSeverityChange(value)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              mode="dropdown"
            >
              <Picker.Item label="Select a severity level" value={" "} />
              <Picker.Item label="Minor" value="Minor" />
              <Picker.Item label="Moderate" value="Moderate" />
              <Picker.Item label="Severe" value="Severe" />
              <Picker.Item label="Extreme" value="Extreme" />
            </Picker>
          </View>
        </View>

        <Button text="Save" onPress={handleSave} />
        <Button
          text="Reset"
          onPress={fetchUserPreferences}
          color={Colors.secondary}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textPrimary,
  },
  dropwdownContainer: {
    width: "100%",
    marginTop: 30,
    paddingBottom: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  pickerContainer: {
    width: "60%",
    height: 160,
    overflow: "hidden",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: Colors.surface,
  },
  picker: {
    height: 250,
    width: "100%",
  },
  pickerItem: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
  },
});

export default preferences;

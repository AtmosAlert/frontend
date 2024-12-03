import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useEffect, useState } from "react";
import { useSession } from "@/ctx";

import Styles from "@/constants/Styles";
import { Preferences } from "@/constants/types";

import AlertCard from "@/components/pages/alerts/alertCard";

import { Alert } from "@/constants/types";
import timeAgo from "@/utils/timeAgo";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Colors from "@/constants/Colors";

type Props = {};

const Alerts = (props: Props) => {
  const { session } = useSession();
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [alerts, setAlerts] = useState<Alert[] | null>(null);
  const [lastFetch, setLastFetch] = useState<Date>(new Date());
  const [timeSinceLastFetch, settimeSinceLastFetch] = useState<String>("");

  const [refreshing, setRefreshing] = useState(false);

  const fetchAlerts = async () => {
    if (session && preferences) {
      try {
        const params = {
          state: preferences.state,
          ...(preferences.county && { county: preferences.county }),
          ...(preferences.severity && { severity: preferences.severity }),
        };
        const queryString = new URLSearchParams(params).toString();

        const response = await fetch(
          `${process.env.EXPO_PUBLIC_BACKEND_URI}/api/weather/alerts?${queryString}`,
          {
            headers: { Authorization: `Bearer ${session}` },
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setAlerts(data.data);
        setLastFetch(new Date());
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    }
  };

  const fetchUserPreferences = async () => {
    if (session) {
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
        setPreferences(data.preferences);
      } catch (error) {
        console.error("Error fetching user preferences:", error);
      }
    }
  };

  useEffect(() => {
    if (session) {
      fetchUserPreferences();
    }
  }, [session]);

  useEffect(() => {
    if (preferences) {
      fetchAlerts();
    }
  }, [preferences]);

  useEffect(() => {
    const interval = setInterval(() => {
      settimeSinceLastFetch(timeAgo(lastFetch));
    }, 1000);

    return () => clearInterval(interval);
  }, [lastFetch]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      fetchUserPreferences();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      style={Styles.pageContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={Styles.pageTitle}>Alerts</Text>

      <View style={{borderWidth:1, borderColor:Colors.border,padding:20,borderRadius:10}}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text1}>State: </Text>
          <Text style={styles.text2}>{preferences?.state}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text1}>County: </Text>
          <Text style={styles.text2}>
            {preferences?.county ? preferences.county : "N/A"}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text1}>Severity Threshold: </Text>
          <Text style={styles.text2}>
            {preferences?.severity ? preferences.severity : "N/A"}
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text1}>Last Updated: </Text>
          <Text style={styles.text2}>{timeSinceLastFetch}</Text>
        </View>
      </View>

      {alerts && alerts.length > 0 ? (
        <>
          {/* Current Alerts */}
          <Text style={[Styles.heading1, { marginTop: 10 }]}>
            Current Alerts
          </Text>
          {alerts.some((alert) => alert.active) ? (
            alerts
              .filter((alert) => alert.active)
              .map((alert) => <AlertCard key={alert.id} alert={alert} />)
          ) : (
            <Text style={Styles.normalText}>There are no current alerts</Text>
          )}

          {/* Past Alerts */}
          <Text style={[Styles.heading1, { marginTop: 10 }]}>Past Alerts</Text>
          {alerts.some((alert) => !alert.active) ? (
            alerts
              .filter((alert) => !alert.active)
              .map((alert) => <AlertCard key={alert.id} alert={alert} />)
          ) : (
            <Text style={Styles.normalText}>There are no past alerts</Text>
          )}
        </>
      ) : (
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconSymbol size={120} name="cloud.sun" color={Colors.info} />
          <Text style={Styles.heading1}>Clear Skies, No Alerts!</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Alerts;

const styles = StyleSheet.create({
  text1: {
    fontWeight: "700",
    fontSize: 16,
  },
  text2: {
    fontSize: 16,
  },
});

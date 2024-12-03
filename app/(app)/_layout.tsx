import { Text,Platform } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/misc/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useSession } from '@/ctx';
import Colors from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AppLayout() {
  const { session, isLoading,signOut } = useSession();
  const insets = useSafeAreaInsets();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  const verifySession = async () => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URI}/verifyToken`, {
      headers: { Authorization: `Bearer ${session}` },
      method: 'GET',
    });
    if (response.status !== 200) {
      signOut()
      return <Redirect href="/sign-in" />;
    }
  }

  verifySession()

  return (
  <Tabs screenOptions={{
    sceneStyle:{backgroundColor:Colors.background,paddingTop:insets.top,paddingBottom:insets.bottom},
    tabBarActiveTintColor: Colors.white,
    tabBarInactiveTintColor:Colors.disabled,
    headerShown: false,
    tabBarButton: HapticTab,
    tabBarBackground: TabBarBackground,
    tabBarStyle: Platform.select({
      ios: {
        // Use a transparent background on iOS to show the blur effect
        position: 'absolute',
        backgroundColor: Colors.primary
      },
      default: {
         backgroundColor: Colors.primary,
      },
    }),
  }}>
    <Tabs.Screen name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house" color={color} />,
        }} />
    <Tabs.Screen name="alerts"
        options={{
          title: 'My Alerts',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bell.fill" color={color} />,
        }} />
    <Tabs.Screen name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle.fill" color={color} />,
        }} />
    <Tabs.Screen name="preferences"
        options={{
          title: 'Preferences',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
        }} />
  </Tabs>)
}

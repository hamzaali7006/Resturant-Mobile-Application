import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../screens/manager/DashboardScreen';
import ReservationsScreen from '../screens/manager/ReservationsScreen';
import { colors } from '../theme/theme';

const Tab = createBottomTabNavigator();

export default function ManagerNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: { borderTopColor: colors.border },
        tabBarIcon: ({ color, size }) => {
          const icons = { DashboardTab: 'stats-chart-outline', ReservationsTab: 'calendar-outline' };
          return <Ionicons name={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="DashboardTab" component={DashboardScreen} options={{ title: 'Dashboard' }} />
      <Tab.Screen name="ReservationsTab" component={ReservationsScreen} options={{ title: 'Reservations' }} />
    </Tab.Navigator>
  );
}

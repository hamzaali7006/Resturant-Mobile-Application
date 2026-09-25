import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius, typography } from '../theme/theme';

export default function RoleSelectScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bistro Nova</Text>
        <Text style={typography.caption}>Who's using the app?</Text>
      </View>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.replace('CustomerTabs')}
        activeOpacity={0.85}
      >
        <Ionicons name="restaurant-outline" size={32} color={colors.primary} />
        <View style={{ flex: 1, marginLeft: spacing.md }}>
          <Text style={typography.h2}>Customer</Text>
          <Text style={typography.caption}>Browse menu, order, track status</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color={colors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.replace('ManagerTabs')}
        activeOpacity={0.85}
      >
        <Ionicons name="stats-chart-outline" size={32} color={colors.secondary} />
        <View style={{ flex: 1, marginLeft: spacing.md }}>
          <Text style={typography.h2}>Manager</Text>
          <Text style={typography.caption}>Dashboard & reservations</Text>
        </View>
        <Ionicons name="chevron-forward" size={22} color={colors.textSecondary} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg, justifyContent: 'center' },
  header: { marginBottom: spacing.xl },
  title: { fontSize: 32, fontWeight: '800', color: colors.textPrimary, marginBottom: spacing.xs },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

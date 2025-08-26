import { StyleSheet, ScrollView, View } from 'react-native';
import { ExternalLink } from '@/components/ExternalLink';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';

export default function ExploreScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>Workshop Overview</ThemedText>
        </View>
        
        <View style={styles.content}>
          <Collapsible title="About This Workshop">
            <ThemedText style={styles.description}>
              The Chicago Vibe Coding Workshop demonstrates how to build modern data applications 
              with Databricks, featuring real-time device tracking and gyroscope data collection.
            </ThemedText>
          </Collapsible>

          <Collapsible title="App Architecture">
            <ThemedText>
              This mobile app connects to a{' '}
              <ThemedText type="defaultSemiBold">Databricks PostgreSQL</ThemedText> database using{' '}
              <ThemedText type="defaultSemiBold">Drizzle ORM</ThemedText> for data persistence.
            </ThemedText>
            <ThemedText style={styles.spacing}>
              Device data including gyroscope readings are stored in real-time for analysis.
            </ThemedText>
          </Collapsible>

          <Collapsible title="Technologies Used">
            <ThemedText>• <ThemedText type="defaultSemiBold">React Native + Expo</ThemedText> - Mobile framework</ThemedText>
            <ThemedText>• <ThemedText type="defaultSemiBold">Databricks</ThemedText> - Data platform and PostgreSQL</ThemedText>
            <ThemedText>• <ThemedText type="defaultSemiBold">Drizzle ORM</ThemedText> - Type-safe database toolkit</ThemedText>
            <ThemedText>• <ThemedText type="defaultSemiBold">Device Motion API</ThemedText> - Gyroscope data collection</ThemedText>
          </Collapsible>

          <Collapsible title="Learn More">
            <ExternalLink href="https://databricks.com">
              <ThemedText type="link">Databricks Platform</ThemedText>
            </ExternalLink>
            <ExternalLink href="https://docs.expo.dev">
              <ThemedText type="link">Expo Documentation</ThemedText>
            </ExternalLink>
            <ExternalLink href="https://orm.drizzle.team">
              <ThemedText type="link">Drizzle ORM</ThemedText>
            </ExternalLink>
          </Collapsible>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 54, 33, 0.1)',
  },
  title: {
    color: '#1B3139',
    marginBottom: 10,
  },
  content: {
    padding: 20,
  },
  description: {
    lineHeight: 22,
    marginBottom: 10,
  },
  spacing: {
    marginTop: 10,
    lineHeight: 22,
  },
});

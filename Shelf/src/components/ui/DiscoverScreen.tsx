// DiscoverScreen.tsx
// A single static "Discover" page for a reading app called Shelf.
// UI/layout only — no navigation, no network calls, no state that needs persistence.

import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {
  currentlyReading,
  currentlyReadingProgress,
  genres,
  shelfStats,
  staffPicks,
} from './data'
import { colors, radius, space, type } from './theme'
import { Book } from './types'

function Spine({
  book,
  width = 108,
  height = 152,
}: {
  book: Book
  width?: number
  height?: number
}) {
  return (
    <View
      style={[
        styles.spine,
        { backgroundColor: book.spineColor, width, height },
      ]}
    >
      <Text style={styles.spineInitials}>{book.initials}</Text>
      <View style={styles.spineFootline} />
    </View>
  )
}

export default function DiscoverScreen() {
  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.ink} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Hello, Reader!</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitial}>R</Text>
          </View>
        </View>

        {/* Hero: currently reading */}
        <View style={styles.heroCard}>
          <Spine book={currentlyReading} width={84} height={122} />
          <View style={styles.heroText}>
            <Text style={styles.heroLabel}>Currently reading</Text>
            <Text style={styles.heroTitle}>{currentlyReading.title}</Text>
            <Text style={styles.heroAuthor}>{currentlyReading.author}</Text>

            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${Math.round(currentlyReadingProgress * 100)}%` },
                ]}
              />
            </View>
            <Text style={styles.progressLabel}>
              {Math.round(currentlyReadingProgress * 100)}% · about 2 hrs left
            </Text>
          </View>
        </View>

        {/* Genres */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by mood</Text>
          <View style={styles.chipRow}>
            {genres.map((g) => (
              <View key={g.id} style={styles.chip}>
                <Text style={styles.chipText}>{g.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Staff picks */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Staff picks</Text>
            <Text style={styles.sectionLink}>See all</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.picksRow}
          >
            {staffPicks.map((book) => (
              <View key={book.id} style={styles.pickCard}>
                <Spine book={book} />
                <Text style={styles.pickTitle} numberOfLines={2}>
                  {book.title}
                </Text>
                <Text style={styles.pickAuthor} numberOfLines={1}>
                  {book.author}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Shelf stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your shelf</Text>
          <View style={styles.statsRow}>
            {shelfStats.map((stat) => (
              <View key={stat.id} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: space.xxl }} />
      </ScrollView>

      {/* Bottom tab bar */}
      <View style={styles.tabBar}>
        {[
          { key: 'discover', label: 'Discover', active: true },
          { key: 'shelf', label: 'Shelf', active: false },
          { key: 'lists', label: 'Lists', active: false },
          { key: 'profile', label: 'Profile', active: false },
        ].map((tab) => (
          <View key={tab.key} style={styles.tabItem}>
            <View
              style={[
                styles.tabDot,
                { backgroundColor: tab.active ? colors.brass : 'transparent' },
              ]}
            />
            <Text
              style={[styles.tabLabel, tab.active && styles.tabLabelActive]}
            >
              {tab.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.ink,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: space.lg,
    paddingTop: Platform.OS === 'android' ? space.xl : space.lg,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: space.lg,
  },
  eyebrow: {
    color: colors.parchmentMuted,
    fontSize: 13,
    marginBottom: 2,
    fontFamily: type.body.fontFamily,
  },
  headerTitle: {
    color: colors.parchment,
    fontSize: 24,
    fontFamily: type.display.fontFamily,
    letterSpacing: type.display.letterSpacing,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.brassMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: {
    color: colors.ink,
    fontSize: 17,
    fontFamily: type.display.fontFamily,
  },

  // Hero
  heroCard: {
    flexDirection: 'row',
    backgroundColor: colors.inkRaised,
    borderRadius: radius.lg,
    padding: space.md,
    marginBottom: space.xl,
    borderWidth: 1,
    borderColor: colors.inkLine,
  },
  heroText: {
    flex: 1,
    marginLeft: space.md,
    justifyContent: 'center',
  },
  heroLabel: {
    color: colors.brass,
    fontSize: 12,
    marginBottom: space.xs,
    fontFamily: type.body.fontFamily,
  },
  heroTitle: {
    color: colors.parchment,
    fontSize: 19,
    fontFamily: type.display.fontFamily,
    marginBottom: 2,
  },
  heroAuthor: {
    color: colors.parchmentMuted,
    fontSize: 13,
    marginBottom: space.md,
    fontFamily: type.body.fontFamily,
  },
  progressTrack: {
    height: 4,
    borderRadius: radius.sm,
    backgroundColor: colors.inkLine,
    overflow: 'hidden',
    marginBottom: space.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.brass,
    borderRadius: radius.sm,
  },
  progressLabel: {
    color: colors.parchmentMuted,
    fontSize: 11,
    fontFamily: type.body.fontFamily,
  },

  // Sections
  section: {
    marginBottom: space.xl,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: space.md,
  },
  sectionTitle: {
    color: colors.parchment,
    fontSize: 17,
    fontFamily: type.display.fontFamily,
    marginBottom: space.md,
  },
  sectionLink: {
    color: colors.brass,
    fontSize: 13,
    fontFamily: type.body.fontFamily,
  },

  // Genre chips
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: space.sm,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.mossDeep,
    backgroundColor: 'rgba(92,122,102,0.12)',
    paddingVertical: space.sm,
    paddingHorizontal: space.md,
    borderRadius: radius.pill,
  },
  chipText: {
    color: colors.moss,
    fontSize: 13,
    fontFamily: type.body.fontFamily,
  },

  // Staff picks
  picksRow: {
    gap: space.md,
    paddingRight: space.md,
  },
  pickCard: {
    width: 108,
  },
  pickTitle: {
    color: colors.parchment,
    fontSize: 13,
    marginTop: space.sm,
    fontFamily: type.body.fontFamily,
    lineHeight: 17,
  },
  pickAuthor: {
    color: colors.parchmentMuted,
    fontSize: 11,
    marginTop: 2,
    fontFamily: type.body.fontFamily,
  },
  spine: {
    borderRadius: radius.sm,
    padding: space.sm,
    justifyContent: 'space-between',
  },
  spineInitials: {
    color: 'rgba(239,233,221,0.85)',
    fontSize: 13,
    fontFamily: type.display.fontFamily,
  },
  spineFootline: {
    height: 2,
    width: '40%',
    backgroundColor: 'rgba(239,233,221,0.35)',
    borderRadius: 1,
  },

  // Shelf stats
  statsRow: {
    flexDirection: 'row',
    gap: space.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.paper,
    borderRadius: radius.md,
    paddingVertical: space.md,
    paddingHorizontal: space.sm,
    alignItems: 'center',
  },
  statValue: {
    color: colors.paperInk,
    fontSize: 20,
    fontFamily: type.display.fontFamily,
    marginBottom: 2,
  },
  statLabel: {
    color: colors.paperInk,
    fontSize: 11,
    textAlign: 'center',
    opacity: 0.65,
    fontFamily: type.body.fontFamily,
  },

  // Tab bar
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.inkLine,
    backgroundColor: colors.ink,
    paddingTop: space.sm,
    paddingBottom: Platform.OS === 'ios' ? space.lg : space.sm,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabDot: {
    width: 4,
    height: 4,
    borderRadius: radius.pill,
    marginBottom: space.xs,
  },
  tabLabel: {
    color: colors.parchmentMuted,
    fontSize: 11,
    fontFamily: type.body.fontFamily,
  },
  tabLabelActive: {
    color: colors.parchment,
  },
})

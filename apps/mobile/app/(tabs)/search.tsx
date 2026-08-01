import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import { useState } from 'react'
import { Colors } from '../../constants/colors'

// ─── Data ────────────────────────────────────────────────────────────────────

const POPULAR_SEARCHES = [
  'cimento',
  'tinta coral',
  'fio elétrico',
  'vergalhão',
  'argamassa',
]

const CATEGORIES = [
  { id: '1', icon: '⚡', label: 'Elétrica', bg: '#FFF0E8' },
  { id: '2', icon: '💧', label: 'Hidráulica', bg: '#E8F4FF' },
  { id: '3', icon: '🧱', label: 'Cimento', bg: '#F2F2F2' },
  { id: '4', icon: '🪵', label: 'Madeira', bg: '#FFF8E8' },
  { id: '5', icon: '🔩', label: 'Ferragens', bg: '#F2F2F2' },
  { id: '6', icon: '🎨', label: 'Tintas', bg: '#F0FFF4' },
  { id: '7', icon: '🪟', label: 'Esquadrias', bg: '#F8F0FF' },
]

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function SearchScreen() {
  const [query, setQuery] = useState('')

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <SafeAreaView>
          <Text style={styles.headerTitle}>Buscar</Text>
          <View style={styles.searchBar}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="O que você está procurando?"
              placeholderTextColor={Colors.grayMid}
              value={query}
              onChangeText={setQuery}
              autoCapitalize="none"
              returnKeyType="search"
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </View>

      {query.length > 0 ? (
        /* Results state */
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsPlaceholder}>
            Buscando por "{query}"...
          </Text>
          <Text style={styles.resultsHint}>
            Os resultados aparecerão aqui
          </Text>
        </View>
      ) : (
        /* Discovery state */
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Popular searches */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Buscas populares</Text>
            <View style={styles.chipsRow}>
              {POPULAR_SEARCHES.map((term) => (
                <TouchableOpacity
                  key={term}
                  style={styles.chip}
                  onPress={() => setQuery(term)}
                >
                  <Text style={styles.chipText}>{term}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Categories grid */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categorias</Text>
            <View style={styles.categoryGrid}>
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={styles.categoryCard}
                  activeOpacity={0.8}
                >
                  <View style={[styles.categoryIcon, { backgroundColor: cat.bg }]}>
                    <Text style={styles.categoryEmoji}>{cat.icon}</Text>
                  </View>
                  <Text style={styles.categoryLabel}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      )}
    </View>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.grayLight,
  },

  // Header
  header: {
    backgroundColor: Colors.black,
    paddingTop: 44,
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 14,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    gap: 10,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    color: Colors.black,
    fontSize: 14,
  },
  clearButton: {
    padding: 2,
  },
  clearButtonText: {
    color: Colors.grayMid,
    fontSize: 13,
    fontWeight: '600',
  },

  // Content
  content: {
    flex: 1,
  },

  // Section
  section: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 14,
  },

  // Chips
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
  },
  chipText: {
    color: Colors.black,
    fontSize: 13,
    fontWeight: '600',
  },

  // Category Grid (3 columns)
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  categoryCard: {
    width: '33.33%',
    paddingHorizontal: 6,
    marginBottom: 14,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 80,
    height: 80,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 32,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.black,
    textAlign: 'center',
  },

  // Results
  resultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  resultsPlaceholder: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 8,
  },
  resultsHint: {
    fontSize: 13,
    color: Colors.grayMid,
    textAlign: 'center',
  },

  bottomSpacer: {
    height: 20,
  },
})

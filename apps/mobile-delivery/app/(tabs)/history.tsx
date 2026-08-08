import { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { Colors } from '@/constants/colors'
import { deliveryService } from '@/services/delivery'
import { useDeliveryStore } from '@/store/delivery.store'
import type { DeliveryHistoryItem, DriverStats } from '@/types/delivery'

type FilterTab = 'Hoje' | 'Semana' | 'Mês'

function formatTime(iso: string | null): string {
  if (!iso) return '—'
  const d = new Date(iso)
  return `${String(d.getHours()).padStart(2, '0')}h${String(d.getMinutes()).padStart(2, '0')}`
}

function formatDate(iso: string | null): string {
  if (!iso) return '—'
  const d = new Date(iso)
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
}

function formatCurrency(value: number): string {
  return `R$ ${value.toFixed(2).replace('.', ',')}`
}

export default function HistoryScreen() {
  const { setHistory, setStats, history, stats } = useDeliveryStore()
  const [activeFilter, setActiveFilter] = useState<FilterTab>('Semana')
  const filters: FilterTab[] = ['Hoje', 'Semana', 'Mês']

  const { isLoading } = useQuery({
    queryKey: ['delivery', 'history'],
    queryFn: async () => {
      const [historyData, statsData] = await Promise.all([
        deliveryService.getHistory(),
        deliveryService.getStats(),
      ])
      setHistory(historyData)
      setStats(statsData)
      return { historyData, statsData }
    },
  })

  function filterHistory(items: DeliveryHistoryItem[]): DeliveryHistoryItem[] {
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfWeek = new Date(startOfDay)
    startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay())
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    if (activeFilter === 'Hoje') {
      return items.filter(d => new Date(d.createdAt) >= startOfDay)
    }
    if (activeFilter === 'Semana') {
      return items.filter(d => new Date(d.createdAt) >= startOfWeek)
    }
    return items.filter(d => new Date(d.createdAt) >= startOfMonth)
  }

  const filtered = filterHistory(history)

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Histórico</Text>
        {stats && (
          <View style={styles.earningsBadge}>
            <Text style={styles.earningsBadgeText}>
              Semana: {formatCurrency(stats.earningsThisWeek)}
            </Text>
          </View>
        )}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryCard}>
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{formatCurrency(stats?.earningsToday ?? 0)}</Text>
            <Text style={styles.metricLabel}>Hoje</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{formatCurrency(stats?.earningsThisWeek ?? 0)}</Text>
            <Text style={styles.metricLabel}>Semana</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricValue}>{formatCurrency(stats?.earningsThisMonth ?? 0)}</Text>
            <Text style={styles.metricLabel}>Mês</Text>
          </View>
        </View>

        <View style={styles.filterRow}>
          {filters.map(f => (
            <TouchableOpacity
              key={f}
              style={styles.filterTab}
              onPress={() => setActiveFilter(f)}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>
                {f}
              </Text>
              {activeFilter === f && <View style={styles.filterUnderline} />}
            </TouchableOpacity>
          ))}
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : filtered.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>📊</Text>
            <Text style={styles.emptyText}>Nenhuma entrega neste período</Text>
          </View>
        ) : (
          filtered.map(delivery => (
            <View key={delivery.id} style={styles.deliveryCard}>
              <View style={styles.deliveryTop}>
                <Text style={styles.deliveryStore}>{delivery.storeName}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    delivery.status === 'delivered' ? styles.statusBadgeGreen : styles.statusBadgeRed,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      delivery.status === 'delivered' ? styles.statusTextGreen : styles.statusTextRed,
                    ]}
                  >
                    {delivery.status === 'delivered' ? '✅ Entregue' : '❌ Cancelado'}
                  </Text>
                </View>
              </View>

              <Text style={styles.deliveryAddress} numberOfLines={1}>
                De: {delivery.storeAddress}
              </Text>
              <Text style={styles.deliveryAddress} numberOfLines={1}>
                Para: {delivery.deliveryAddress}
              </Text>

              <View style={styles.deliveryBottom}>
                <Text style={styles.deliveryMeta}>
                  {formatTime(delivery.deliveredAt ?? delivery.createdAt)} · {formatDate(delivery.createdAt)}
                </Text>
                <Text style={styles.deliveryMeta}>{delivery.distanceKm.toFixed(1)} km</Text>
                <Text style={styles.deliveryEarning}>{formatCurrency(Number(delivery.earningTotal))}</Text>
              </View>
            </View>
          ))
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.grayLight },
  header: {
    backgroundColor: Colors.black,
    paddingTop: 52,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: { color: Colors.white, fontSize: 22, fontWeight: '700' },
  earningsBadge: { backgroundColor: Colors.primary, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  earningsBadgeText: { color: Colors.white, fontSize: 12, fontWeight: '700' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 },
  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  metricItem: { flex: 1, alignItems: 'center' },
  metricValue: { fontSize: 14, fontWeight: '800', color: Colors.primary, marginBottom: 4 },
  metricLabel: { fontSize: 12, color: Colors.grayMid, fontWeight: '600' },
  metricDivider: { width: 1, height: 36, backgroundColor: Colors.grayBorder },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 16,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  filterTab: { flex: 1, alignItems: 'center', paddingVertical: 10, position: 'relative' },
  filterText: { fontSize: 14, fontWeight: '600', color: Colors.grayMid },
  filterTextActive: { color: Colors.black },
  filterUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '60%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  loadingContainer: { alignItems: 'center', paddingTop: 40 },
  emptyContainer: { alignItems: 'center', paddingTop: 40 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyText: { fontSize: 15, color: Colors.grayMid, fontWeight: '600' },
  deliveryCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  deliveryTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  deliveryStore: { fontSize: 15, fontWeight: '700', color: Colors.black, flex: 1, marginRight: 8 },
  statusBadge: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
  statusBadgeGreen: { backgroundColor: '#DCFCE7' },
  statusBadgeRed: { backgroundColor: '#FEE2E2' },
  statusText: { fontSize: 12, fontWeight: '700' },
  statusTextGreen: { color: Colors.success },
  statusTextRed: { color: Colors.danger },
  deliveryAddress: { fontSize: 13, color: Colors.grayMid, marginBottom: 3, lineHeight: 18 },
  deliveryBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.grayBorder,
  },
  deliveryMeta: { fontSize: 13, color: Colors.grayMid },
  deliveryEarning: { fontSize: 15, fontWeight: '800', color: Colors.primary },
  bottomSpacer: { height: 16 },
})

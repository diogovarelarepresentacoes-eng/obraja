import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import { Colors } from '../../constants/colors'

// ─── Types & Data ─────────────────────────────────────────────────────────────

type OrderStatus = 'Saiu para entrega' | 'Em separação' | 'Entregue' | 'Cancelado'

interface Order {
  id: string
  number: string
  store: string
  items: string
  total: string
  date: string
  delivery: string
  status: OrderStatus
}

const ACTIVE_ORDERS: Order[] = [
  {
    id: '8821',
    number: '#8821',
    store: 'Materiais Belo',
    items: 'Cimento CP-II (5sc), Areia...',
    total: 'R$ 278,50',
    date: 'Hoje, 10:42',
    delivery: 'Entrega expressa',
    status: 'Saiu para entrega',
  },
  {
    id: '8820',
    number: '#8820',
    store: 'DepósitoMax',
    items: 'Tinta Acrílica 18L (2un)',
    total: 'R$ 439,80',
    date: 'Hoje, 09:15',
    delivery: 'Entrega padrão',
    status: 'Em separação',
  },
]

const DELIVERED_ORDERS: Order[] = [
  {
    id: '8817',
    number: '#8817',
    store: 'Construfácil Sul',
    items: 'Fio Elétrico 2,5mm (3rl), Disjuntor...',
    total: 'R$ 612,00',
    date: 'Ontem, 14:30',
    delivery: 'Entrega expressa',
    status: 'Entregue',
  },
  {
    id: '8814',
    number: '#8814',
    store: 'Materiais Belo',
    items: 'Cimento CP-II (10sc)',
    total: 'R$ 329,00',
    date: '28/07, 09:00',
    delivery: 'Entrega padrão',
    status: 'Entregue',
  },
  {
    id: '8810',
    number: '#8810',
    store: 'DepósitoMax',
    items: 'Vergalhão CA-50 10mm (5br)',
    total: 'R$ 272,50',
    date: '25/07, 16:45',
    delivery: 'Retirada na loja',
    status: 'Entregue',
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function statusBadgeStyle(status: OrderStatus) {
  switch (status) {
    case 'Saiu para entrega': return { bg: '#EFF6FF', text: Colors.info }
    case 'Em separação':      return { bg: '#FFF7ED', text: Colors.warning }
    case 'Entregue':          return { bg: '#F0FDF4', text: Colors.success }
    case 'Cancelado':         return { bg: '#FEF2F2', text: Colors.danger }
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function OrderCard({ order, onAction }: { order: Order; onAction: () => void }) {
  const badge = statusBadgeStyle(order.status)
  const isDelivered = order.status === 'Entregue'
  const isActive = order.status === 'Saiu para entrega'

  return (
    <View style={styles.card}>
      {/* Top row */}
      <View style={styles.cardTop}>
        <Text style={styles.cardTitle}>{order.number} · {order.store}</Text>
        <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
          <Text style={[styles.statusText, { color: badge.text }]}>{order.status}</Text>
        </View>
      </View>

      {/* Items summary */}
      <Text style={styles.cardItems} numberOfLines={1}>{order.items}</Text>

      {/* Date + delivery */}
      <View style={styles.cardMeta}>
        <Text style={styles.cardMetaText}>🕐 {order.date}</Text>
        <Text style={styles.cardMetaDot}>·</Text>
        <Text style={styles.cardMetaText}>🚚 {order.delivery}</Text>
      </View>

      <View style={styles.cardDivider} />

      {/* Bottom row */}
      <View style={styles.cardBottom}>
        <Text style={styles.cardTotal}>{order.total}</Text>
        <TouchableOpacity
          style={[
            styles.actionButton,
            isActive && styles.actionButtonBlue,
            !isActive && !isDelivered && styles.actionButtonGray,
            isDelivered && styles.actionButtonOutline,
          ]}
          onPress={onAction}
        >
          <Text
            style={[
              styles.actionButtonText,
              isActive && styles.actionButtonTextWhite,
              !isActive && !isDelivered && styles.actionButtonTextGray,
              isDelivered && styles.actionButtonTextOutline,
            ]}
          >
            {isActive ? 'Rastrear' : isDelivered ? 'Repetir pedido' : 'Ver detalhes'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>📦</Text>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────

const TABS = ['Ativos', 'Entregues', 'Cancelados'] as const
type TabKey = typeof TABS[number]

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('Ativos')
  const router = useRouter()

  function getOrders(): Order[] {
    if (activeTab === 'Ativos') return ACTIVE_ORDERS
    if (activeTab === 'Entregues') return DELIVERED_ORDERS
    return []
  }

  function handleAction(order: Order) {
    if (order.status === 'Saiu para entrega') {
      router.push(`/tracking/${order.id}`)
    }
  }

  const orders = getOrders()

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <SafeAreaView>
          <Text style={styles.headerTitle}>Meus Pedidos</Text>
        </SafeAreaView>
      </View>

      {/* Filter tabs */}
      <View style={styles.filterBar}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.filterTab}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.filterTabText, activeTab === tab && styles.filterTabTextActive]}>
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.filterTabUnderline} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders list */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {orders.length === 0 ? (
          <EmptyState
            message={
              activeTab === 'Cancelados'
                ? 'Nenhum pedido cancelado'
                : 'Nenhum pedido encontrado'
            }
          />
        ) : (
          <>
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onAction={() => handleAction(order)}
              />
            ))}
          </>
        )}
        <View style={styles.bottomSpacer} />
      </ScrollView>
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
  },

  // Filter tabs
  filterBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBorder,
  },
  filterTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    position: 'relative',
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.grayMid,
  },
  filterTabTextActive: {
    color: Colors.black,
    fontWeight: '700',
  },
  filterTabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    height: 2,
    backgroundColor: Colors.primary,
    borderRadius: 1,
  },

  // Content
  content: {
    flex: 1,
    paddingTop: 12,
  },

  // Order card
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.black,
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  cardItems: {
    fontSize: 12,
    color: Colors.grayMid,
    marginBottom: 8,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  cardMetaText: {
    fontSize: 11,
    color: Colors.grayMid,
  },
  cardMetaDot: {
    color: Colors.grayBorder,
    fontSize: 11,
  },
  cardDivider: {
    height: 1,
    backgroundColor: Colors.grayBorder,
    marginBottom: 14,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  actionButton: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  actionButtonBlue: {
    backgroundColor: Colors.info,
  },
  actionButtonGray: {
    backgroundColor: Colors.grayLight,
  },
  actionButtonOutline: {
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '700',
  },
  actionButtonTextWhite: {
    color: Colors.white,
  },
  actionButtonTextGray: {
    color: Colors.grayMid,
  },
  actionButtonTextOutline: {
    color: Colors.primary,
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 52,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.grayMid,
    textAlign: 'center',
  },

  bottomSpacer: {
    height: 20,
  },
})

import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform, ActivityIndicator,
} from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { Colors } from '@/constants/colors'
import { sellerService } from '@/services/orders'
import { useAuthStore } from '@/store/auth.store'

const MOCK_METRICS = {
  ordersToday: 12,
  revenueToday: 8540,
  pendingOrders: 4,
  lowStockCount: 3,
  activeDeliveries: 2,
  revenueMonth: 142800,
}

const currency = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function DashboardScreen() {
  const user = useAuthStore((s) => s.user)

  const { data: metrics, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: sellerService.getDashboard,
    placeholderData: MOCK_METRICS,
    retry: false,
  })

  const m = metrics ?? MOCK_METRICS

  return (
    <View style={s.container}>
      <View style={s.header}>
        <View>
          <Text style={s.greeting}>Olá, {user?.name?.split(' ')[0] ?? 'Vendedor'} 👋</Text>
          <Text style={s.headerSub}>
            {user?.role === 'industry' ? 'Indústria / Fábrica' : 'Loja de Materiais'}
          </Text>
        </View>
        <View style={s.avatarCircle}>
          <Text style={s.avatarText}>{user?.name?.[0] ?? 'V'}</Text>
        </View>
      </View>

      <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        {isLoading && (
          <View style={s.loadingRow}>
            <ActivityIndicator color={Colors.primary} />
            <Text style={s.loadingText}>Carregando métricas...</Text>
          </View>
        )}

        {/* KPI row */}
        <View style={s.kpiRow}>
          <KpiCard label="Pedidos Hoje" value={String(m.ordersToday)} emoji="🛒" color={Colors.primary} />
          <KpiCard label="Receita Hoje" value={currency(m.revenueToday)} emoji="💰" color={Colors.success} />
        </View>
        <View style={s.kpiRow}>
          <KpiCard label="Pendentes" value={String(m.pendingOrders)} emoji="⏳" color={Colors.warning} />
          <KpiCard label="Estoque Baixo" value={String(m.lowStockCount)} emoji="⚠️" color={Colors.danger} />
        </View>

        {/* Revenue month */}
        <View style={s.revenueCard}>
          <Text style={s.revenueLabel}>Receita do Mês</Text>
          <Text style={s.revenueValue}>{currency(m.revenueMonth)}</Text>
          <View style={s.revenueMeta}>
            <Text style={s.revenueMetaText}>📦 {m.activeDeliveries} entregas em andamento</Text>
          </View>
        </View>

        {/* Quick actions */}
        <Text style={s.sectionTitle}>Ações Rápidas</Text>
        <View style={s.actionsGrid}>
          {[
            { emoji: '🛒', label: 'Novo Pedido' },
            { emoji: '📦', label: 'Adicionar Produto' },
            { emoji: '🚚', label: 'Ver Entregas' },
            { emoji: '📊', label: 'Relatórios' },
          ].map(a => (
            <TouchableOpacity key={a.label} style={s.actionCard} activeOpacity={0.8}>
              <Text style={s.actionEmoji}>{a.emoji}</Text>
              <Text style={s.actionLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Alerts */}
        {m.lowStockCount > 0 && (
          <View style={s.alertCard}>
            <Text style={s.alertEmoji}>⚠️</Text>
            <View style={s.alertBody}>
              <Text style={s.alertTitle}>{m.lowStockCount} produtos com estoque baixo</Text>
              <Text style={s.alertSub}>Reponha antes de receber novos pedidos</Text>
            </View>
          </View>
        )}
        {m.pendingOrders > 0 && (
          <View style={[s.alertCard, s.alertOrange]}>
            <Text style={s.alertEmoji}>🛒</Text>
            <View style={s.alertBody}>
              <Text style={[s.alertTitle, { color: Colors.primary }]}>
                {m.pendingOrders} pedidos aguardando confirmação
              </Text>
              <Text style={s.alertSub}>Confirme para iniciar o preparo</Text>
            </View>
          </View>
        )}

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  )
}

function KpiCard({ label, value, emoji, color }: { label: string; value: string; emoji: string; color: string }) {
  return (
    <View style={[s.kpiCard, { borderLeftColor: color }]}>
      <Text style={s.kpiEmoji}>{emoji}</Text>
      <Text style={[s.kpiValue, { color }]}>{value}</Text>
      <Text style={s.kpiLabel}>{label}</Text>
    </View>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.grayLight },
  header: {
    backgroundColor: Colors.black,
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: { fontSize: 20, fontWeight: '800', color: Colors.white },
  headerSub: { fontSize: 13, color: Colors.grayMid, marginTop: 2 },
  avatarCircle: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: Colors.white, fontSize: 16, fontWeight: '800' },
  scroll: { flex: 1 },
  content: { padding: 16 },
  loadingRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  loadingText: { color: Colors.grayMid, fontSize: 13 },
  kpiRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  kpiCard: {
    flex: 1, backgroundColor: Colors.white, borderRadius: 14, padding: 14,
    borderLeftWidth: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  kpiEmoji: { fontSize: 22, marginBottom: 6 },
  kpiValue: { fontSize: 18, fontWeight: '900', marginBottom: 2 },
  kpiLabel: { fontSize: 11, color: Colors.grayMid, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  revenueCard: {
    backgroundColor: Colors.black, borderRadius: 16, padding: 20, marginBottom: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 4,
  },
  revenueLabel: { color: Colors.grayMid, fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 },
  revenueValue: { color: Colors.primary, fontSize: 28, fontWeight: '900', marginBottom: 10 },
  revenueMeta: { borderTopWidth: 1, borderTopColor: '#2A2A2A', paddingTop: 10 },
  revenueMetaText: { color: Colors.grayMid, fontSize: 13 },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: Colors.black, marginBottom: 12 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  actionCard: {
    width: '47%', backgroundColor: Colors.white, borderRadius: 12, padding: 16,
    alignItems: 'center', gap: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  actionEmoji: { fontSize: 28 },
  actionLabel: { fontSize: 13, fontWeight: '600', color: Colors.black, textAlign: 'center' },
  alertCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: Colors.dangerBg, borderRadius: 12, padding: 14,
    borderLeftWidth: 4, borderLeftColor: Colors.danger, marginBottom: 10,
  },
  alertOrange: { backgroundColor: '#fff5f1', borderLeftColor: Colors.primary },
  alertEmoji: { fontSize: 22 },
  alertBody: { flex: 1 },
  alertTitle: { fontSize: 13, fontWeight: '700', color: Colors.danger, marginBottom: 2 },
  alertSub: { fontSize: 12, color: Colors.grayMid },
})

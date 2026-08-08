import { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform, Alert,
} from 'react-native'
import { Colors } from '@/constants/colors'

type DeliveryStatus = 'waiting_driver' | 'in_delivery' | 'delivered' | 'failed'

interface Delivery {
  id: string
  orderId: string
  buyer: string
  address: string
  driver: string | null
  driverPhone: string | null
  status: DeliveryStatus
  estimatedTime: string
  products: string
  value: number
}

const STATUS_CFG: Record<DeliveryStatus, { label: string; color: string; bg: string }> = {
  waiting_driver: { label: 'Aguardando Motoboy', color: Colors.warning,  bg: '#fffbeb' },
  in_delivery:    { label: 'Em Entrega',          color: '#f97316',       bg: '#fff7ed' },
  delivered:      { label: 'Entregue',            color: Colors.success,  bg: Colors.successBg },
  failed:         { label: 'Falha na Entrega',    color: Colors.danger,   bg: Colors.dangerBg },
}

const MOCK: Delivery[] = [
  { id: 'd1', orderId: '#2891', buyer: 'Construtora Horizonte', address: 'Rua das Acácias, 234 — Jardim Primavera, SP', driver: 'João Mendes', driverPhone: '(11) 91234-5678', status: 'in_delivery', estimatedTime: '14:30', products: 'Cimento CP-II (500 sacos)', value: 15950 },
  { id: 'd2', orderId: '#2889', buyer: 'Reforma Fácil Ltda', address: 'Rua das Flores, 89 — Centro, SP', driver: null, driverPhone: null, status: 'waiting_driver', estimatedTime: '15:00', products: 'Argamassa AC-II (40 cx)', value: 2100 },
  { id: 'd3', orderId: '#2886', buyer: 'João Consumidor', address: 'Av. Brasil, 567 — Bela Vista, SP', driver: 'Maria Santos', driverPhone: '(11) 99876-5432', status: 'delivered', estimatedTime: '11:00', products: 'Tinta Acrílica (4 latas)', value: 760 },
]

const currency = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

type Tab = 'all' | 'active' | 'waiting' | 'done'
const TABS: { key: Tab; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'active', label: 'Em Rota' },
  { key: 'waiting', label: 'Aguardando' },
  { key: 'done', label: 'Entregues' },
]

export default function DeliveriesScreen() {
  const [tab, setTab] = useState<Tab>('all')

  const deliveries = MOCK.filter(d => {
    if (tab === 'active') return d.status === 'in_delivery'
    if (tab === 'waiting') return d.status === 'waiting_driver'
    if (tab === 'done') return d.status === 'delivered'
    return true
  })

  const active = MOCK.filter(d => d.status === 'in_delivery').length
  const waiting = MOCK.filter(d => d.status === 'waiting_driver').length

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.headerTitle}>Entregas</Text>
        <View style={s.headerBadges}>
          {active > 0 && (
            <View style={s.badge}>
              <Text style={s.badgeText}>{active} em rota</Text>
            </View>
          )}
          {waiting > 0 && (
            <View style={[s.badge, s.badgeWarning]}>
              <Text style={[s.badgeText, { color: '#b45309' }]}>{waiting} aguard.</Text>
            </View>
          )}
        </View>
      </View>

      <View style={s.tabBar}>
        {TABS.map(t => (
          <TouchableOpacity key={t.key} style={[s.tabChip, tab === t.key && s.tabChipActive]}
            onPress={() => setTab(t.key)} activeOpacity={0.8}>
            <Text style={[s.tabChipText, tab === t.key && s.tabChipTextActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={s.list} contentContainerStyle={s.listContent} showsVerticalScrollIndicator={false}>
        {deliveries.length === 0 ? (
          <View style={s.empty}>
            <Text style={s.emptyEmoji}>🚚</Text>
            <Text style={s.emptyTitle}>Nenhuma entrega aqui</Text>
          </View>
        ) : (
          deliveries.map(d => {
            const st = STATUS_CFG[d.status]
            return (
              <View key={d.id} style={s.card}>
                <View style={s.cardRow}>
                  <Text style={s.orderId}>{d.orderId}</Text>
                  <View style={[s.statusBadge, { backgroundColor: st.bg }]}>
                    <Text style={[s.statusText, { color: st.color }]}>{st.label}</Text>
                  </View>
                </View>

                <Text style={s.buyerName}>{d.buyer}</Text>
                <Text style={s.address} numberOfLines={2}>{d.address}</Text>
                <Text style={s.products}>{d.products}</Text>

                {d.driver ? (
                  <View style={s.driverRow}>
                    <View style={s.driverAvatar}>
                      <Text style={s.driverAvatarText}>{d.driver[0]}</Text>
                    </View>
                    <View style={s.driverInfo}>
                      <Text style={s.driverName}>{d.driver}</Text>
                      <Text style={s.driverPhone}>{d.driverPhone}</Text>
                    </View>
                    <TouchableOpacity
                      style={s.callBtn}
                      onPress={() => Alert.alert('Ligar', `Ligar para ${d.driver}?`)}
                    >
                      <Text style={s.callBtnText}>📞 Ligar</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={s.noDriverRow}>
                    <Text style={s.noDriverText}>🔍 Buscando entregador disponível...</Text>
                  </View>
                )}

                <View style={s.cardBottom}>
                  <Text style={s.valueText}>{currency(d.value)}</Text>
                  {d.status === 'in_delivery' && (
                    <Text style={s.etaText}>Previsão: {d.estimatedTime}</Text>
                  )}
                </View>
              </View>
            )
          })
        )}
        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.grayLight },
  header: {
    backgroundColor: Colors.black, paddingTop: Platform.OS === 'ios' ? 56 : 40, paddingBottom: 16,
    paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  headerTitle: { color: Colors.white, fontSize: 20, fontWeight: '800' },
  headerBadges: { flexDirection: 'row', gap: 6 },
  badge: { backgroundColor: '#fff5f1', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4 },
  badgeWarning: { backgroundColor: '#fffbeb' },
  badgeText: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  tabBar: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.grayBorder },
  tabChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: Colors.grayLight, borderWidth: 1.5, borderColor: Colors.grayBorder },
  tabChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  tabChipText: { fontSize: 12, fontWeight: '600', color: Colors.grayMid },
  tabChipTextActive: { color: Colors.white },
  list: { flex: 1 },
  listContent: { padding: 16, gap: 12 },
  empty: { alignItems: 'center', paddingTop: 80 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: Colors.grayMid },
  card: { backgroundColor: Colors.white, borderRadius: 14, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 3 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  orderId: { fontSize: 14, fontWeight: '800', color: Colors.black, fontVariant: ['tabular-nums'] },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusText: { fontSize: 11, fontWeight: '700' },
  buyerName: { fontSize: 14, fontWeight: '600', color: Colors.black, marginBottom: 2 },
  address: { fontSize: 12, color: Colors.grayMid, marginBottom: 4 },
  products: { fontSize: 12, color: Colors.black, marginBottom: 10 },
  driverRow: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: Colors.grayLight, borderRadius: 10, padding: 10, marginBottom: 10 },
  driverAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.black, alignItems: 'center', justifyContent: 'center' },
  driverAvatarText: { color: Colors.white, fontWeight: '800', fontSize: 14 },
  driverInfo: { flex: 1 },
  driverName: { fontSize: 13, fontWeight: '700', color: Colors.black },
  driverPhone: { fontSize: 11, color: Colors.grayMid },
  callBtn: { backgroundColor: Colors.successBg, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  callBtnText: { fontSize: 12, fontWeight: '600', color: Colors.success },
  noDriverRow: { backgroundColor: '#fffbeb', borderRadius: 10, padding: 10, marginBottom: 10 },
  noDriverText: { fontSize: 12, color: '#b45309', fontWeight: '500' },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  valueText: { fontSize: 15, fontWeight: '800', color: Colors.primary },
  etaText: { fontSize: 12, color: Colors.grayMid, fontWeight: '500' },
})

import { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Platform, ActivityIndicator, Alert,
} from 'react-native'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Colors } from '@/constants/colors'
import { sellerService } from '@/services/orders'
import type { Order, OrderStatus } from '@/types/seller'

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  pending:         { label: 'Pendente',    color: Colors.warning,  bg: '#fffbeb' },
  confirmed:       { label: 'Confirmado',  color: Colors.info,     bg: '#eff6ff' },
  preparing:       { label: 'Preparando',  color: Colors.primary,  bg: '#fff5f1' },
  ready_for_pickup:{ label: 'Pronto',      color: Colors.success,  bg: Colors.successBg },
  in_delivery:     { label: 'Em Entrega',  color: '#f97316',       bg: '#fff7ed' },
  delivered:       { label: 'Entregue',    color: Colors.success,  bg: Colors.successBg },
  cancelled:       { label: 'Cancelado',   color: Colors.danger,   bg: Colors.dangerBg },
}

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  pending: 'confirmed',
  confirmed: 'preparing',
  preparing: 'ready_for_pickup',
  ready_for_pickup: 'in_delivery',
}

const NEXT_LABEL: Partial<Record<OrderStatus, string>> = {
  pending: 'Confirmar',
  confirmed: 'Iniciar Preparo',
  preparing: 'Marcar Pronto',
  ready_for_pickup: 'Saiu p/ Entrega',
}

const MOCK_ORDERS: Order[] = [
  { id: '#2891', buyerName: 'Construtora Horizonte', status: 'pending', total: 15950, paymentMethod: 'Faturamento 30d', createdAt: '2026-08-02T09:14:00Z', address: 'Rua das Acácias, 234 — SP', items: [{ id: '1', productName: 'Cimento CP-II 50kg', quantity: 500, unitPrice: 31.9, total: 15950 }] },
  { id: '#2890', buyerName: 'João Consumidor', status: 'confirmed', total: 3480, paymentMethod: 'Pix', createdAt: '2026-08-02T08:30:00Z', address: 'Av. Brasil, 567 — SP', items: [{ id: '2', productName: 'Tinta Acrílica 18L', quantity: 4, unitPrice: 870, total: 3480 }] },
  { id: '#2889', buyerName: 'Reforma Fácil Ltda', status: 'preparing', total: 2100, paymentMethod: 'Cartão', createdAt: '2026-08-01T17:00:00Z', address: 'Rua Flores, 89 — SP', items: [{ id: '3', productName: 'Argamassa AC-II 20kg', quantity: 40, unitPrice: 52.5, total: 2100 }] },
  { id: '#2888', buyerName: 'Construtora ABC', status: 'delivered', total: 61800, paymentMethod: 'Faturamento 60d', createdAt: '2026-07-31T10:00:00Z', address: 'Av. Paulista, 1000 — SP', items: [{ id: '4', productName: 'Cimento CP-V 50kg', quantity: 2000, unitPrice: 30.9, total: 61800 }] },
]

const currency = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

type FilterTab = 'all' | 'pending' | 'active' | 'delivered'
const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'pending', label: 'Pendentes' },
  { key: 'active', label: 'Em Andamento' },
  { key: 'delivered', label: 'Entregues' },
]

export default function OrdersScreen() {
  const [filter, setFilter] = useState<FilterTab>('all')
  const qc = useQueryClient()

  const { data: orders = MOCK_ORDERS, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: sellerService.getOrders,
    placeholderData: MOCK_ORDERS,
    retry: false,
  })

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) =>
      sellerService.updateOrderStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['orders'] }),
    onError: () => Alert.alert('Erro', 'Não foi possível atualizar o pedido'),
  })

  const filtered = orders.filter(o => {
    if (filter === 'pending') return o.status === 'pending'
    if (filter === 'active') return ['confirmed', 'preparing', 'ready_for_pickup', 'in_delivery'].includes(o.status)
    if (filter === 'delivered') return o.status === 'delivered'
    return true
  })

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.headerTitle}>Pedidos</Text>
        {isLoading && <ActivityIndicator color={Colors.white} />}
      </View>

      <View style={s.filterBar}>
        {FILTER_TABS.map(t => (
          <TouchableOpacity key={t.key} style={[s.filterChip, filter === t.key && s.filterChipActive]}
            onPress={() => setFilter(t.key)} activeOpacity={0.8}>
            <Text style={[s.filterChipText, filter === t.key && s.filterChipTextActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={s.list} contentContainerStyle={s.listContent} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={s.empty}>
            <Text style={s.emptyEmoji}>📋</Text>
            <Text style={s.emptyTitle}>Nenhum pedido encontrado</Text>
          </View>
        ) : (
          filtered.map(order => {
            const st = STATUS_CONFIG[order.status]
            const nextStatus = NEXT_STATUS[order.status]
            const nextLabel = NEXT_LABEL[order.status]
            return (
              <View key={order.id} style={s.card}>
                <View style={s.cardRow}>
                  <Text style={s.orderId}>{order.id}</Text>
                  <View style={[s.statusBadge, { backgroundColor: st.bg }]}>
                    <Text style={[s.statusText, { color: st.color }]}>{st.label}</Text>
                  </View>
                </View>

                <Text style={s.buyerName}>{order.buyerName}</Text>
                <Text style={s.address} numberOfLines={1}>{order.address}</Text>

                <View style={s.itemsList}>
                  {order.items.map(item => (
                    <Text key={item.id} style={s.itemText}>
                      {item.quantity}x {item.productName}
                    </Text>
                  ))}
                </View>

                <View style={s.cardBottom}>
                  <View>
                    <Text style={s.totalValue}>{currency(order.total)}</Text>
                    <Text style={s.paymentMethod}>{order.paymentMethod}</Text>
                  </View>
                  {nextStatus && nextLabel && (
                    <TouchableOpacity
                      style={[s.actionBtn, isPending && s.actionBtnDisabled]}
                      onPress={() => updateStatus({ id: order.id, status: nextStatus })}
                      disabled={isPending}
                      activeOpacity={0.85}
                    >
                      <Text style={s.actionBtnText}>{nextLabel}</Text>
                    </TouchableOpacity>
                  )}
                  {order.status === 'pending' && (
                    <TouchableOpacity
                      style={s.cancelBtn}
                      onPress={() => Alert.alert('Cancelar pedido?', 'Esta ação não pode ser desfeita.', [
                        { text: 'Manter', style: 'cancel' },
                        { text: 'Cancelar', style: 'destructive', onPress: () => updateStatus({ id: order.id, status: 'cancelled' }) },
                      ])}
                    >
                      <Text style={s.cancelBtnText}>Recusar</Text>
                    </TouchableOpacity>
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
    backgroundColor: Colors.black, paddingTop: Platform.OS === 'ios' ? 56 : 40,
    paddingBottom: 16, paddingHorizontal: 16, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between',
  },
  headerTitle: { color: Colors.white, fontSize: 20, fontWeight: '800' },
  filterBar: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingVertical: 12, backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.grayBorder },
  filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: Colors.grayLight, borderWidth: 1.5, borderColor: Colors.grayBorder },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterChipText: { fontSize: 12, fontWeight: '600', color: Colors.grayMid },
  filterChipTextActive: { color: Colors.white },
  list: { flex: 1 },
  listContent: { padding: 16, gap: 14 },
  empty: { alignItems: 'center', paddingTop: 80 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: Colors.grayMid },
  card: { backgroundColor: Colors.white, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  orderId: { fontSize: 15, fontWeight: '800', color: Colors.black, fontVariant: ['tabular-nums'] },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusText: { fontSize: 12, fontWeight: '700' },
  buyerName: { fontSize: 14, fontWeight: '600', color: Colors.black, marginBottom: 2 },
  address: { fontSize: 12, color: Colors.grayMid, marginBottom: 10 },
  itemsList: { backgroundColor: Colors.grayLight, borderRadius: 8, padding: 10, marginBottom: 12, gap: 2 },
  itemText: { fontSize: 13, color: Colors.black },
  cardBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  totalValue: { fontSize: 16, fontWeight: '900', color: Colors.primary },
  paymentMethod: { fontSize: 11, color: Colors.grayMid },
  actionBtn: { backgroundColor: Colors.primary, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10 },
  actionBtnDisabled: { opacity: 0.6 },
  actionBtnText: { color: Colors.white, fontSize: 13, fontWeight: '700' },
  cancelBtn: { paddingHorizontal: 14, paddingVertical: 10 },
  cancelBtnText: { color: Colors.danger, fontSize: 13, fontWeight: '600' },
})

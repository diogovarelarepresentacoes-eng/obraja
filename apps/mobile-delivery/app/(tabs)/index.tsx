import { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native'
import { useRouter } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { Colors } from '@/constants/colors'
import { deliveryService } from '@/services/delivery'
import { useDeliveryStore } from '@/store/delivery.store'
import type { AvailableDelivery } from '@/types/delivery'

type Filtro = 'Todos' | 'Próximos' | 'Alto valor'

interface EntregaCard {
  id: string
  loja: string
  distanciaLoja: string
  valor: string
  enderecoRetirada: string
  enderecoEntrega: string
  distanciaRota: string
  tempoEstimado: string
  produtos: string
}

function mapToCard(d: AvailableDelivery): EntregaCard {
  const km = (d.distanceFromDriverKm ?? d.distanceKm).toFixed(1)
  return {
    id: d.id,
    loja: d.storeName,
    distanciaLoja: `${km} km`,
    valor: `R$ ${Number(d.earningTotal).toFixed(2).replace('.', ',')}`,
    enderecoRetirada: `${d.storeName} — ${d.storeAddress}`,
    enderecoEntrega: d.deliveryAddress,
    distanciaRota: `${d.distanceKm.toFixed(1)} km`,
    tempoEstimado: `~${d.estimatedMinutes} min`,
    produtos: d.products,
  }
}

const FILTROS: Filtro[] = ['Todos', 'Próximos', 'Alto valor']

export default function DisponiveisScreen() {
  const router = useRouter()
  const { available, setAvailable, isOnline, setOnline } = useDeliveryStore()
  const [filtroAtivo, setFiltroAtivo] = useState<Filtro>('Todos')

  const { isLoading, error } = useQuery({
    queryKey: ['delivery', 'available'],
    queryFn: async () => {
      const data = await deliveryService.getAvailable()
      setAvailable(data)
      return data
    },
    enabled: isOnline,
    refetchInterval: isOnline ? 30000 : false,
  })

  async function toggleOnline() {
    const next = !isOnline
    setOnline(next)
    try {
      await deliveryService.setOnlineStatus(next)
    } catch {
      setOnline(!next)
    }
  }

  const cards = available.map(mapToCard)
  const entregasFiltradas = cards.filter(e => {
    if (filtroAtivo === 'Próximos') return parseFloat(e.distanciaLoja) <= 1.5
    if (filtroAtivo === 'Alto valor') {
      const valor = parseFloat(e.valor.replace('R$ ', '').replace(',', '.'))
      return valor >= 25
    }
    return true
  })

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>ObraJá Entregador</Text>
        <TouchableOpacity
          style={[styles.togglePill, isOnline ? styles.toggleOnline : styles.toggleOffline]}
          onPress={toggleOnline}
          activeOpacity={0.85}
          accessibilityLabel={isOnline ? 'Ficar offline' : 'Ficar online'}
        >
          <View style={[styles.toggleThumb, isOnline ? styles.thumbRight : styles.thumbLeft]} />
          <Text style={styles.toggleLabel}>{isOnline ? 'Online' : 'Offline'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterBar}>
        {FILTROS.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, filtroAtivo === f && styles.filterChipActive]}
            onPress={() => setFiltroAtivo(f)}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterChipText, filtroAtivo === f && styles.filterChipTextActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {!isOnline ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📵</Text>
            <Text style={styles.emptyTitle}>Você está offline</Text>
            <Text style={styles.emptySubtitle}>Ative o modo online para receber pedidos</Text>
          </View>
        ) : isLoading ? (
          <View style={styles.emptyState}>
            <ActivityIndicator size="large" color={Colors.primary} style={{ marginBottom: 16 }} />
            <Text style={styles.emptyTitle}>Buscando entregas...</Text>
          </View>
        ) : error ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>⚠️</Text>
            <Text style={styles.emptyTitle}>Erro ao carregar entregas</Text>
            <Text style={styles.emptySubtitle}>Verifique sua conexão</Text>
          </View>
        ) : entregasFiltradas.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📋</Text>
            <Text style={styles.emptyTitle}>Nenhuma entrega disponível</Text>
            <Text style={styles.emptySubtitle}>Aguarde novos pedidos</Text>
          </View>
        ) : (
          entregasFiltradas.map(entrega => (
            <View key={entrega.id} style={styles.card}>
              <View style={styles.cardTopRow}>
                <View style={styles.lojaRow}>
                  <Text style={styles.lojaEmoji}>🏪</Text>
                  <Text style={styles.lojaNome}>{entrega.loja}</Text>
                </View>
                <View style={styles.badgesRow}>
                  <View style={styles.distBadge}>
                    <Text style={styles.distBadgeText}>{entrega.distanciaLoja}</Text>
                  </View>
                  <View style={styles.valorBadge}>
                    <Text style={styles.valorBadgeText}>{entrega.valor}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.addressBlock}>
                <View style={styles.addressRow}>
                  <View style={[styles.dotIndicator, styles.dotOrange]} />
                  <Text style={styles.addressLabel}>Retirada: </Text>
                  <Text style={styles.addressText} numberOfLines={1}>
                    {entrega.enderecoRetirada}
                  </Text>
                </View>
                <View style={styles.addressConnector} />
                <View style={styles.addressRow}>
                  <View style={[styles.dotIndicator, styles.dotGreen]} />
                  <Text style={styles.addressLabel}>Entrega: </Text>
                  <Text style={styles.addressText} numberOfLines={1}>
                    {entrega.enderecoEntrega}
                  </Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoText}>
                  {entrega.distanciaRota} • {entrega.tempoEstimado}
                </Text>
              </View>

              <View style={styles.produtosRow}>
                <Text style={styles.produtosLabel}>Produtos: </Text>
                <Text style={styles.produtosText}>{entrega.produtos}</Text>
              </View>

              <TouchableOpacity
                style={styles.btnAceitar}
                onPress={() => router.push(`/delivery/${entrega.id}` as never)}
                activeOpacity={0.85}
              >
                <Text style={styles.btnAceitarText}>Aceitar Entrega</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.grayLight },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.black,
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  topBarTitle: { color: Colors.white, fontSize: 18, fontWeight: '800', letterSpacing: 0.2 },
  togglePill: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 90,
    height: 34,
    borderRadius: 17,
    paddingHorizontal: 4,
    position: 'relative',
  },
  toggleOnline: { backgroundColor: Colors.primary },
  toggleOffline: { backgroundColor: Colors.grayMid },
  toggleThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.white,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbRight: { right: 4 },
  thumbLeft: { left: 4 },
  toggleLabel: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  filterBar: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBorder,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.grayLight,
    borderWidth: 1.5,
    borderColor: Colors.grayBorder,
  },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterChipText: { fontSize: 13, fontWeight: '600', color: Colors.grayMid },
  filterChipTextActive: { color: Colors.white },
  list: { flex: 1 },
  listContent: { padding: 16, gap: 14 },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 32,
  },
  emptyEmoji: { fontSize: 56, marginBottom: 16 },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: Colors.grayMid, textAlign: 'center', marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: Colors.grayMid, textAlign: 'center' },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  lojaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 },
  lojaEmoji: { fontSize: 18 },
  lojaNome: { fontSize: 15, fontWeight: '700', color: Colors.black, flex: 1 },
  badgesRow: { flexDirection: 'row', gap: 6, alignItems: 'center' },
  distBadge: { backgroundColor: Colors.grayLight, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  distBadgeText: { fontSize: 12, fontWeight: '600', color: Colors.grayMid },
  valorBadge: { backgroundColor: '#FFF3EF', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  valorBadgeText: { fontSize: 13, fontWeight: '700', color: Colors.primary },
  addressBlock: { backgroundColor: Colors.grayLight, borderRadius: 10, padding: 10, marginBottom: 10, gap: 4 },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dotIndicator: { width: 10, height: 10, borderRadius: 5, flexShrink: 0 },
  dotOrange: { backgroundColor: Colors.primary },
  dotGreen: { backgroundColor: Colors.success },
  addressConnector: { width: 1, height: 8, backgroundColor: Colors.grayBorder, marginLeft: 4 },
  addressLabel: { fontSize: 12, fontWeight: '600', color: Colors.grayMid, flexShrink: 0 },
  addressText: { fontSize: 12, color: Colors.black, flex: 1 },
  infoRow: { marginBottom: 6 },
  infoText: { fontSize: 13, color: Colors.grayMid, fontWeight: '500' },
  produtosRow: { flexDirection: 'row', marginBottom: 14, flexWrap: 'wrap' },
  produtosLabel: { fontSize: 13, fontWeight: '600', color: Colors.grayMid },
  produtosText: { fontSize: 13, color: Colors.black, flex: 1 },
  btnAceitar: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnAceitarText: { color: Colors.white, fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
})

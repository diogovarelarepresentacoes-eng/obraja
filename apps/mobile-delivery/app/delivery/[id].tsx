import { useState } from 'react'
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { Colors } from '@/constants/colors'
import { deliveryService } from '@/services/delivery'
import { useDeliveryStore } from '@/store/delivery.store'

export default function DeliveryDetailScreen() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()
  const { available, setActive } = useDeliveryStore()
  const [accepting, setAccepting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const delivery = available.find(d => d.id === id)

  async function handleAccept() {
    if (!id) return
    setError(null)
    setAccepting(true)
    try {
      const active = await deliveryService.accept(id)
      setActive(active)
      router.replace('/(tabs)/active')
    } catch (e: any) {
      setError(e?.response?.data?.message ?? 'Erro ao aceitar entrega')
    } finally {
      setAccepting(false)
    }
  }

  if (!delivery) {
    return (
      <View style={styles.root}>
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.emptyText}>Carregando entrega...</Text>
        </View>
      </View>
    )
  }

  const earningTotal = Number(delivery.earningTotal)
  const earningBase = Number(delivery.earningBase)
  const earningBonus = Number(delivery.earningBonus)

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mapCard}>
          <View style={styles.mapInner}>
            <View style={styles.mapPinRow}>
              <View style={styles.pinOrange}>
                <Text style={styles.pinIcon}>📍</Text>
                <Text style={styles.pinLabel}>Retirada</Text>
              </View>
              <View style={styles.dashedLineContainer}>
                <View style={styles.dashedLine} />
              </View>
              <View style={styles.pinGreen}>
                <Text style={styles.pinIcon}>📍</Text>
                <Text style={styles.pinLabelGreen}>Entrega</Text>
              </View>
            </View>
            <Text style={styles.routeText}>
              Rota: {delivery.distanceKm.toFixed(1)} km • ~{delivery.estimatedMinutes} min
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalhes da Coleta</Text>
          <View style={styles.storeRow}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>
                {delivery.storeName.slice(0, 2).toUpperCase()}
              </Text>
            </View>
            <View style={styles.storeInfo}>
              <Text style={styles.storeName}>{delivery.storeName}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📍</Text>
            <Text style={styles.infoText}>{delivery.storeAddress}</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.itemsTitle}>Itens do pedido</Text>
          <Text style={styles.itemLine}>{delivery.products}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detalhes da Entrega</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>👤</Text>
            <Text style={styles.infoText}>{delivery.customerName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📍</Text>
            <Text style={styles.infoText}>{delivery.deliveryAddress}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📏</Text>
            <Text style={styles.infoText}>{delivery.distanceKm.toFixed(1)} km do ponto de retirada</Text>
          </View>
        </View>

        <View style={[styles.card, styles.earningsCard]}>
          <Text style={styles.cardTitle}>Ganhos desta Entrega</Text>
          <View style={styles.earningsRow}>
            <Text style={styles.earningsLabel}>Valor base:</Text>
            <Text style={styles.earningsValue}>R$ {earningBase.toFixed(2).replace('.', ',')}</Text>
          </View>
          {earningBonus > 0 && (
            <View style={styles.earningsRow}>
              <Text style={styles.earningsLabel}>Bônus de distância:</Text>
              <Text style={styles.earningsValue}>R$ {earningBonus.toFixed(2).replace('.', ',')}</Text>
            </View>
          )}
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>R$ {earningTotal.toFixed(2).replace('.', ',')}</Text>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <View style={styles.bottomBar}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity
          style={[styles.acceptButton, accepting && styles.btnDisabled]}
          onPress={handleAccept}
          disabled={accepting}
          activeOpacity={0.85}
        >
          {accepting
            ? <ActivityIndicator color={Colors.white} />
            : <Text style={styles.acceptButtonText}>Aceitar e Iniciar</Text>
          }
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.grayLight },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  emptyText: { fontSize: 15, color: Colors.grayMid, fontWeight: '600' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 100 },
  mapCard: {
    backgroundColor: Colors.black,
    borderRadius: 16,
    height: 200,
    marginBottom: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapInner: { width: '100%', paddingHorizontal: 24, alignItems: 'center' },
  mapPinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  pinOrange: { alignItems: 'center' },
  pinGreen: { alignItems: 'center' },
  pinIcon: { fontSize: 28 },
  pinLabel: { color: Colors.primary, fontSize: 12, fontWeight: '700', marginTop: 4 },
  pinLabelGreen: { color: Colors.success, fontSize: 12, fontWeight: '700', marginTop: 4 },
  dashedLineContainer: { flex: 1, marginHorizontal: 8, alignItems: 'center' },
  dashedLine: { height: 2, width: '100%', borderWidth: 1, borderColor: Colors.white, borderStyle: 'dashed' },
  routeText: { color: Colors.grayMid, fontSize: 13, textAlign: 'center' },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  earningsCard: { borderLeftWidth: 4, borderLeftColor: Colors.primary },
  cardTitle: { fontSize: 15, fontWeight: '700', color: Colors.black, marginBottom: 14 },
  storeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: { color: Colors.white, fontSize: 15, fontWeight: '800' },
  storeInfo: { flex: 1 },
  storeName: { fontSize: 15, fontWeight: '700', color: Colors.black },
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  infoIcon: { fontSize: 15, marginRight: 8, marginTop: 1 },
  infoText: { fontSize: 14, color: Colors.black, flex: 1, lineHeight: 20 },
  divider: { height: 1, backgroundColor: Colors.grayBorder, marginVertical: 12 },
  itemsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.grayMid,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  itemLine: { fontSize: 14, color: Colors.black, marginBottom: 4, lineHeight: 20 },
  earningsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  earningsLabel: { fontSize: 14, color: Colors.grayMid },
  earningsValue: { fontSize: 14, color: Colors.black, fontWeight: '600' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 18, fontWeight: '700', color: Colors.black },
  totalValue: { fontSize: 22, fontWeight: '800', color: Colors.primary },
  bottomSpacer: { height: 16 },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderTopColor: Colors.grayBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 10,
  },
  errorText: { color: Colors.danger, fontSize: 13, textAlign: 'center', marginBottom: 8 },
  acceptButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisabled: { opacity: 0.7 },
  acceptButtonText: { color: Colors.white, fontSize: 17, fontWeight: '700', letterSpacing: 0.3 },
})

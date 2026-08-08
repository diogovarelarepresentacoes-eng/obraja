import { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { useRouter } from 'expo-router'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location'
import { Colors } from '@/constants/colors'
import { deliveryService } from '@/services/delivery'
import { useDeliveryStore } from '@/store/delivery.store'

type DeliveryStep = 'pickup' | 'transit' | 'delivered'

export default function ActiveDeliveryScreen() {
  const router = useRouter()
  const { active, setActive } = useDeliveryStore()
  const [step, setStep] = useState<DeliveryStep>('pickup')
  const [actionLoading, setActionLoading] = useState(false)
  const locationRef = useRef<Location.LocationSubscription | null>(null)

  const steps: { key: DeliveryStep; icon: string; label: string }[] = [
    { key: 'pickup', icon: '🏪', label: 'Em busca' },
    { key: 'transit', icon: '📦', label: 'Coletado' },
    { key: 'delivered', icon: '✅', label: 'Entregue' },
  ]
  const stepIndex = steps.findIndex(s => s.key === step)

  useEffect(() => {
    if (active) {
      if (active.status === 'pickup_confirmed' || active.status === 'in_transit') {
        setStep('transit')
      } else if (active.status === 'delivered') {
        setStep('delivered')
      } else {
        setStep('pickup')
      }
    }
  }, [active])

  useEffect(() => {
    let sub: Location.LocationSubscription | null = null

    async function startTracking() {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') return
      sub = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 10000, distanceInterval: 20 },
        async (loc) => {
          try {
            await deliveryService.updateLocation(loc.coords.latitude, loc.coords.longitude)
          } catch {}
        },
      )
      locationRef.current = sub
    }

    if (active) startTracking()
    return () => { locationRef.current?.remove() }
  }, [active?.id])

  async function confirmPickup() {
    if (!active) return
    setActionLoading(true)
    try {
      const updated = await deliveryService.updateStatus(active.id, 'pickup_confirmed')
      setActive(updated)
      setStep('transit')
    } catch {}
    setActionLoading(false)
  }

  async function confirmDelivery() {
    if (!active) return
    setActionLoading(true)
    try {
      const updated = await deliveryService.updateStatus(active.id, 'delivered')
      setActive(updated)
      setStep('delivered')
    } catch {}
    setActionLoading(false)
  }

  if (!active) {
    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Entrega Ativa</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛵</Text>
          <Text style={styles.emptyTitle}>Nenhuma entrega ativa</Text>
          <Text style={styles.emptySubtitle}>
            Aceite uma entrega na aba Disponíveis
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Entrega Ativa</Text>
        <View style={styles.headerBadge}>
          <Text style={styles.headerBadgeText}>Ao vivo</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mapCard}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            showsUserLocation
            showsMyLocationButton
            initialRegion={{
              latitude: -5.09,
              longitude: -42.80,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              coordinate={{ latitude: -5.085, longitude: -42.805 }}
              title={active.storeName}
              description={active.storeAddress}
              pinColor={Colors.primary}
            />
            <Marker
              coordinate={{ latitude: -5.095, longitude: -42.795 }}
              title={active.customerName}
              description={active.deliveryAddress}
              pinColor={Colors.success}
            />
          </MapView>
          <View style={styles.gpsIndicator}>
            <View style={styles.gpsDot} />
            <Text style={styles.gpsText}>GPS Ativo</Text>
          </View>
        </View>

        <View style={styles.stepsCard}>
          <View style={styles.stepsRow}>
            {steps.map((s, idx) => {
              const isActive = s.key === step
              const isDone = idx < stepIndex
              const isPending = idx > stepIndex
              return (
                <View key={s.key} style={styles.stepWrapper}>
                  <View
                    style={[
                      styles.stepCircle,
                      isDone && styles.stepCircleDone,
                      isActive && styles.stepCircleActive,
                      isPending && styles.stepCirclePending,
                    ]}
                  >
                    {isActive && <View style={styles.stepActiveDot} />}
                    <Text style={styles.stepIcon}>{s.icon}</Text>
                  </View>
                  <Text
                    style={[
                      styles.stepLabel,
                      (isActive || isDone) && styles.stepLabelActive,
                      isPending && styles.stepLabelPending,
                    ]}
                  >
                    {s.label}
                  </Text>
                  {idx < steps.length - 1 && (
                    <View style={[styles.stepLine, idx < stepIndex && styles.stepLineDone]} />
                  )}
                </View>
              )
            })}
          </View>
        </View>

        {step === 'pickup' && (
          <View style={styles.actionCard}>
            <Text style={styles.actionTitle}>Retirar em:</Text>
            <Text style={styles.actionStore}>{active.storeName}</Text>
            <Text style={styles.actionAddress}>📍 {active.storeAddress}</Text>
            <Text style={styles.actionHint}>Toque quando chegar à loja</Text>
            <TouchableOpacity
              style={[styles.actionButton, actionLoading && styles.btnDisabled]}
              onPress={confirmPickup}
              disabled={actionLoading}
              activeOpacity={0.85}
            >
              {actionLoading
                ? <ActivityIndicator color={Colors.white} />
                : <Text style={styles.actionButtonText}>Confirmar Retirada</Text>
              }
            </TouchableOpacity>
          </View>
        )}

        {step === 'transit' && (
          <View style={styles.actionCard}>
            <Text style={styles.actionTitle}>Entregar em:</Text>
            <Text style={styles.actionStore}>{active.customerName}</Text>
            <Text style={styles.actionAddress}>📍 {active.deliveryAddress}</Text>
            <Text style={styles.actionHint}>Aguardando entrega</Text>
            <TouchableOpacity
              style={[styles.actionButton, actionLoading && styles.btnDisabled]}
              onPress={confirmDelivery}
              disabled={actionLoading}
              activeOpacity={0.85}
            >
              {actionLoading
                ? <ActivityIndicator color={Colors.white} />
                : <Text style={styles.actionButtonText}>Confirmar Entrega</Text>
              }
            </TouchableOpacity>
          </View>
        )}

        {step === 'delivered' && (
          <View style={styles.deliveredCard}>
            <Text style={styles.deliveredEmoji}>✅</Text>
            <Text style={styles.deliveredTitle}>Entrega Confirmada!</Text>
            <Text style={styles.deliveredEarning}>
              +R$ {Number(active.earningTotal).toFixed(2).replace('.', ',')} adicionados aos seus ganhos
            </Text>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => {
                setActive(null)
                router.replace('/(tabs)')
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.nextButtonText}>Ver próximas entregas</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumo do Pedido</Text>
          <Text style={styles.summaryItem}>{active.products}</Text>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryEarningRow}>
            <Text style={styles.summaryEarningLabel}>Valor a receber:</Text>
            <Text style={styles.summaryEarningValue}>
              R$ {Number(active.earningTotal).toFixed(2).replace('.', ',')}
            </Text>
          </View>
        </View>

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
  headerTitle: { color: Colors.white, fontSize: 20, fontWeight: '700' },
  headerBadge: { backgroundColor: Colors.danger, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  headerBadgeText: { color: Colors.white, fontSize: 12, fontWeight: '700' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  emptyEmoji: { fontSize: 56, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: Colors.grayMid, textAlign: 'center', marginBottom: 8 },
  emptySubtitle: { fontSize: 14, color: Colors.grayMid, textAlign: 'center' },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32 },
  mapCard: { borderRadius: 16, height: 220, marginBottom: 16, overflow: 'hidden', position: 'relative' },
  map: { width: '100%', height: 220 },
  gpsIndicator: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26,26,26,0.8)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  gpsDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary, marginRight: 6 },
  gpsText: { color: Colors.primary, fontSize: 11, fontWeight: '600' },
  stepsCard: {
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
  stepsRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  stepWrapper: { alignItems: 'center', flex: 1, position: 'relative' },
  stepCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.grayLight,
    marginBottom: 6,
    position: 'relative',
  },
  stepCircleDone: { backgroundColor: Colors.primary },
  stepCircleActive: { backgroundColor: Colors.grayLight, borderWidth: 3, borderColor: Colors.primary },
  stepCirclePending: { backgroundColor: Colors.grayLight },
  stepActiveDot: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  stepIcon: { fontSize: 18 },
  stepLabel: { fontSize: 11, fontWeight: '600', color: Colors.black, textAlign: 'center' },
  stepLabelActive: { color: Colors.black },
  stepLabelPending: { color: Colors.grayMid },
  stepLine: {
    position: 'absolute',
    top: 22,
    right: -32,
    width: 64,
    height: 2,
    backgroundColor: Colors.grayBorder,
    zIndex: -1,
  },
  stepLineDone: { backgroundColor: Colors.primary },
  actionCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  actionTitle: { fontSize: 13, fontWeight: '600', color: Colors.grayMid, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  actionStore: { fontSize: 18, fontWeight: '800', color: Colors.black, marginBottom: 6 },
  actionAddress: { fontSize: 14, color: Colors.black, marginBottom: 12, lineHeight: 20 },
  actionHint: { fontSize: 13, color: Colors.grayMid, marginBottom: 16, fontStyle: 'italic' },
  actionButton: { backgroundColor: Colors.primary, borderRadius: 12, height: 50, alignItems: 'center', justifyContent: 'center' },
  btnDisabled: { opacity: 0.7 },
  actionButtonText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
  deliveredCard: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 28,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  deliveredEmoji: { fontSize: 48, marginBottom: 12 },
  deliveredTitle: { fontSize: 22, fontWeight: '800', color: Colors.white, marginBottom: 8, textAlign: 'center' },
  deliveredEarning: { fontSize: 15, color: Colors.white, textAlign: 'center', marginBottom: 24, opacity: 0.9 },
  nextButton: { borderWidth: 2, borderColor: Colors.white, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12 },
  nextButtonText: { color: Colors.white, fontSize: 15, fontWeight: '700' },
  summaryCard: {
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
  summaryTitle: { fontSize: 14, fontWeight: '700', color: Colors.black, marginBottom: 10 },
  summaryItem: { fontSize: 14, color: Colors.black, marginBottom: 4, lineHeight: 20 },
  summaryDivider: { height: 1, backgroundColor: Colors.grayBorder, marginVertical: 10 },
  summaryEarningRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryEarningLabel: { fontSize: 14, color: Colors.grayMid, fontWeight: '600' },
  summaryEarningValue: { fontSize: 18, fontWeight: '800', color: Colors.primary },
  bottomSpacer: { height: 16 },
})

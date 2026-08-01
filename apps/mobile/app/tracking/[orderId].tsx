import { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native'

type StepStatus = 'done' | 'current' | 'pending'

type TrackingStep = {
  label: string
  status: StepStatus
  detail: string
}

const STEPS: TrackingStep[] = [
  {
    label: 'Pedido Confirmado',
    status: 'done',
    detail: '01/08/2026 às 13h45',
  },
  {
    label: 'Em Separação',
    status: 'done',
    detail: '01/08/2026 às 14h10',
  },
  {
    label: 'Saiu para Entrega',
    status: 'current',
    detail: 'Entregador: Carlos Mendes · Honda CG · ABC-1234',
  },
  {
    label: 'Entregue',
    status: 'pending',
    detail: 'Previsto: até 15h00',
  },
]

const ORDER_ITEMS = [
  { emoji: '🏗️', name: 'Cimento CP-II 50kg', qty: 5 },
  { emoji: '⚡', name: 'Fio Elétrico 2,5mm 100m', qty: 1 },
  { emoji: '🪣', name: 'Tinta Coral 18L', qty: 2 },
]

export default function TrackingScreen() {
  const [delivered, setDelivered] = useState(false)

  function stepCircleStyle(status: StepStatus) {
    if (status === 'done') return styles.stepCircleDone
    if (status === 'current') return styles.stepCircleCurrent
    return styles.stepCirclePending
  }

  function stepIconText(status: StepStatus) {
    if (status === 'done') return '✓'
    if (status === 'current') return '●'
    return ''
  }

  function stepIconStyle(status: StepStatus) {
    if (status === 'done') return styles.stepIconDone
    if (status === 'current') return styles.stepIconCurrent
    return styles.stepIconPending
  }

  function connectorStyle(status: StepStatus) {
    if (status === 'done') return styles.connectorDone
    return styles.connectorPending
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Timeline */}
        <View style={styles.timelineCard}>
          <Text style={styles.sectionTitle}>Status do Pedido #8821</Text>

          {STEPS.map((step, i) => (
            <View key={i} style={styles.stepRow}>
              {/* Circle + connector column */}
              <View style={styles.stepLeft}>
                <View style={[styles.stepCircle, stepCircleStyle(step.status)]}>
                  <Text style={[styles.stepIcon, stepIconStyle(step.status)]}>
                    {stepIconText(step.status)}
                  </Text>
                </View>
                {i < STEPS.length - 1 && (
                  <View
                    style={[
                      styles.connector,
                      connectorStyle(STEPS[i + 1].status === 'pending' ? 'pending' : 'done'),
                    ]}
                  />
                )}
              </View>

              {/* Step info */}
              <View style={styles.stepContent}>
                <Text
                  style={[
                    styles.stepLabel,
                    step.status === 'current' && styles.stepLabelCurrent,
                    step.status === 'pending' && styles.stepLabelPending,
                  ]}
                >
                  {step.label}
                </Text>
                <Text
                  style={[
                    styles.stepDetail,
                    step.status === 'current' && styles.stepDetailCurrent,
                  ]}
                >
                  {step.detail}
                </Text>
                {step.status === 'current' && (
                  <View style={styles.pulsingDot}>
                    <View style={styles.pulsingDotInner} />
                    <Text style={styles.pulsingLabel}>Em rota</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Map Placeholder */}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPin}>📍</Text>
          <Text style={styles.mapTitle}>Rastreamento em tempo real</Text>
          <Text style={styles.mapSub}>Carlos Mendes está a ~1,2 km de você</Text>
        </View>

        {/* Delivery Info Card */}
        <View style={styles.card}>
          <View style={styles.deliveryInfoRow}>
            <View style={styles.driverAvatar}>
              <Text style={styles.driverAvatarText}>CM</Text>
            </View>
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>Carlos Mendes</Text>
              <Text style={styles.driverRating}>⭐ 4.8</Text>
            </View>
            <TouchableOpacity style={styles.phoneButton}>
              <Text style={styles.phoneIcon}>📞</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoDetailRow}>
            <Text style={styles.infoDetailText}>🚗 Honda CG 160 · Placa ABC-1234</Text>
          </View>
          <View style={styles.infoDetailRow}>
            <Text style={styles.infoDetailText}>📦 Pedido #8821 · 3 itens</Text>
          </View>
        </View>

        {/* Order Summary Mini */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Itens do Pedido</Text>
          {ORDER_ITEMS.map((item, i) => (
            <View key={i} style={styles.orderItemRow}>
              <Text style={styles.orderItemEmoji}>{item.emoji}</Text>
              <Text style={styles.orderItemName}>{item.name}</Text>
              <Text style={styles.orderItemQty}>×{item.qty}</Text>
            </View>
          ))}
          <View style={styles.orderTotalRow}>
            <Text style={styles.orderTotalLabel}>Total</Text>
            <Text style={styles.orderTotalValue}>R$ 753,63</Text>
          </View>
        </View>

        {/* Bottom Action */}
        {!delivered && (
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => setDelivered(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.confirmButtonText}>Confirmar Recebimento</Text>
          </TouchableOpacity>
        )}

        {delivered && (
          <View style={styles.deliveredBanner}>
            <Text style={styles.deliveredBannerText}>✓ Recebimento confirmado!</Text>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16,
  },
  // Timeline Card
  timelineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 15,
    color: '#1A1A1A',
    marginBottom: 20,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 12,
  },
  stepLeft: {
    alignItems: 'center',
    width: 28,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleDone: {
    backgroundColor: '#22C55E',
  },
  stepCircleCurrent: {
    backgroundColor: '#F1591D',
  },
  stepCirclePending: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  stepIcon: {
    fontSize: 13,
    fontWeight: '700',
  },
  stepIconDone: {
    color: '#FFFFFF',
  },
  stepIconCurrent: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  stepIconPending: {
    color: '#E0E0E0',
  },
  connector: {
    width: 2,
    flex: 1,
    minHeight: 36,
    marginTop: 2,
  },
  connectorDone: {
    backgroundColor: '#22C55E',
  },
  connectorPending: {
    backgroundColor: '#E0E0E0',
  },
  stepContent: {
    flex: 1,
    paddingBottom: 24,
  },
  stepLabel: {
    fontWeight: '700',
    fontSize: 14,
    color: '#1A1A1A',
    marginBottom: 2,
  },
  stepLabelCurrent: {
    color: '#F1591D',
  },
  stepLabelPending: {
    color: '#9E9E9E',
    fontWeight: '500',
  },
  stepDetail: {
    fontSize: 12,
    color: '#9E9E9E',
    lineHeight: 17,
  },
  stepDetailCurrent: {
    color: '#1A1A1A',
  },
  pulsingDot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  pulsingDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F1591D',
  },
  pulsingLabel: {
    fontSize: 11,
    color: '#F1591D',
    fontWeight: '600',
  },
  // Map
  mapPlaceholder: {
    backgroundColor: '#1A1A1A',
    height: 220,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  mapPin: {
    fontSize: 36,
    marginBottom: 10,
  },
  mapTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  mapSub: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.7,
  },
  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 15,
    color: '#1A1A1A',
    marginBottom: 12,
  },
  // Delivery info
  deliveryInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  driverAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F1591D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverAvatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontWeight: '700',
    fontSize: 15,
    color: '#1A1A1A',
  },
  driverRating: {
    fontSize: 13,
    color: '#F59E0B',
    marginTop: 2,
  },
  phoneButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneIcon: {
    fontSize: 18,
  },
  infoDetailRow: {
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
  },
  infoDetailText: {
    fontSize: 13,
    color: '#9E9E9E',
    fontWeight: '500',
  },
  // Order items
  orderItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  orderItemEmoji: {
    fontSize: 20,
  },
  orderItemName: {
    flex: 1,
    fontSize: 13,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  orderItemQty: {
    fontSize: 13,
    color: '#9E9E9E',
    fontWeight: '600',
  },
  orderTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  orderTotalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  orderTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F1591D',
  },
  // Bottom action
  confirmButton: {
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#22C55E',
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  confirmButtonText: {
    color: '#22C55E',
    fontWeight: '700',
    fontSize: 15,
  },
  deliveredBanner: {
    marginHorizontal: 16,
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#22C55E',
    marginBottom: 12,
  },
  deliveredBannerText: {
    color: '#166534',
    fontWeight: '700',
    fontSize: 15,
  },
  bottomSpacer: {
    height: 32,
  },
})

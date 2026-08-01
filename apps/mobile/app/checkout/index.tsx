import { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import { useRouter } from 'expo-router'

type DeliveryMode = 'frota' | 'expressa' | 'retirada'
type PaymentMethod = 'pix' | 'cartao' | 'boleto'

const DELIVERY_OPTIONS: { id: DeliveryMode; icon: string; label: string; time: string; price: string; free: boolean }[] = [
  { id: 'frota', icon: '🚚', label: 'Frota da Loja', time: 'Hoje 14h–18h', price: 'Grátis', free: true },
  { id: 'expressa', icon: '⚡', label: 'Entrega Expressa', time: 'Hoje em até 2h', price: '+ R$ 28,90', free: false },
  { id: 'retirada', icon: '🏪', label: 'Retirada na Loja', time: 'Av. Brasil 1200', price: 'Grátis', free: true },
]

const PAYMENT_OPTIONS: { id: PaymentMethod; icon: string; label: string; sub: string }[] = [
  { id: 'pix', icon: '🟢', label: 'PIX', sub: 'Aprovação instantânea' },
  { id: 'cartao', icon: '💳', label: 'Cartão', sub: 'Até 12× sem juros' },
  { id: 'boleto', icon: '🧾', label: 'Boleto', sub: 'Vence em 3 dias' },
]

export default function CheckoutScreen() {
  const router = useRouter()
  const [delivery, setDelivery] = useState<DeliveryMode>('frota')
  const [payment, setPayment] = useState<PaymentMethod>('pix')

  const subtotal = 793.30
  const pixDiscount = 39.67
  const total = 753.63

  function fmt(v: number) {
    return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabelDone}>Carrinho</Text>
            <Text style={styles.progressLabelActive}>Entrega</Text>
            <Text style={styles.progressLabelPending}>Confirmação</Text>
          </View>
        </View>

        {/* Section 1 — Itens */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View>
              <Text style={styles.cardTitle}>Itens</Text>
              <Text style={styles.cardSub}>3 itens no carrinho — R$ {fmt(subtotal)}</Text>
            </View>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.linkText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section 2 — Entrega */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Modo de Entrega</Text>

          <View style={styles.deliveryOptions}>
            {DELIVERY_OPTIONS.map(option => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.deliveryOption,
                  delivery === option.id && styles.deliveryOptionSelected,
                ]}
                onPress={() => setDelivery(option.id)}
                activeOpacity={0.7}
              >
                <View style={styles.radioOuter}>
                  {delivery === option.id && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.deliveryIcon}>{option.icon}</Text>
                <View style={styles.deliveryInfo}>
                  <Text style={styles.deliveryLabel}>{option.label}</Text>
                  <Text style={styles.deliveryTime}>{option.time}</Text>
                </View>
                <Text style={[styles.deliveryPrice, option.free && styles.deliveryPriceFree]}>
                  {option.price}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Address box */}
          <View style={styles.addressBox}>
            <Text style={styles.addressIcon}>📍</Text>
            <Text style={styles.addressText}>Rua das Flores, 142 — Apt. 31</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>Trocar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section 3 — Pagamento */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pagamento</Text>

          <View style={styles.paymentTabs}>
            {PAYMENT_OPTIONS.map(option => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.paymentTab,
                  payment === option.id && styles.paymentTabSelected,
                ]}
                onPress={() => setPayment(option.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.paymentTabIcon}>{option.icon}</Text>
                <Text
                  style={[
                    styles.paymentTabLabel,
                    payment === option.id && styles.paymentTabLabelSelected,
                  ]}
                >
                  {option.label}
                </Text>
                <Text style={styles.paymentTabSub}>{option.sub}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {payment === 'pix' && (
            <View style={styles.pixBanner}>
              <Text style={styles.pixBannerText}>
                🎉 5% de desconto no pagamento via PIX
              </Text>
            </View>
          )}
        </View>

        {/* Section 4 — Resumo */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumo</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>R$ {fmt(subtotal)}</Text>
          </View>

          {payment === 'pix' && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Desconto PIX</Text>
              <Text style={styles.summaryDiscount}>− R$ {fmt(pixDiscount)}</Text>
            </View>
          )}

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Entrega</Text>
            <Text style={styles.summaryFree}>Grátis</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalValue}>
              R$ {fmt(payment === 'pix' ? total : subtotal)}
            </Text>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomLeft}>
          <Text style={styles.bottomTotal}>
            Total: R$ {fmt(payment === 'pix' ? total : subtotal)}
          </Text>
          <Text style={styles.bottomSub}>
            pagamento via {PAYMENT_OPTIONS.find(p => p.id === payment)?.label}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => router.push('/tracking/8821')}
          activeOpacity={0.85}
        >
          <Text style={styles.confirmButtonText}>Confirmar Pedido</Text>
        </TouchableOpacity>
      </View>
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
  // Progress
  progressContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    width: '66%',
    height: 4,
    backgroundColor: '#F1591D',
    borderRadius: 2,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelDone: {
    fontSize: 11,
    color: '#22C55E',
    fontWeight: '600',
  },
  progressLabelActive: {
    fontSize: 11,
    color: '#F1591D',
    fontWeight: '700',
  },
  progressLabelPending: {
    fontSize: 11,
    color: '#9E9E9E',
  },
  // Card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 15,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 13,
    color: '#9E9E9E',
  },
  linkText: {
    color: '#F1591D',
    fontWeight: '600',
    fontSize: 13,
  },
  // Delivery
  deliveryOptions: {
    marginTop: 12,
    gap: 8,
  },
  deliveryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  deliveryOptionSelected: {
    borderColor: '#F1591D',
    backgroundColor: '#FFF5F2',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F1591D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F1591D',
  },
  deliveryIcon: {
    fontSize: 20,
  },
  deliveryInfo: {
    flex: 1,
  },
  deliveryLabel: {
    fontWeight: '600',
    fontSize: 13,
    color: '#1A1A1A',
  },
  deliveryTime: {
    fontSize: 11,
    color: '#9E9E9E',
    marginTop: 1,
  },
  deliveryPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  deliveryPriceFree: {
    color: '#22C55E',
  },
  // Address
  addressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
  },
  addressIcon: {
    fontSize: 16,
  },
  addressText: {
    flex: 1,
    fontSize: 13,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  // Payment
  paymentTabs: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  paymentTab: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  paymentTabSelected: {
    borderColor: '#F1591D',
    backgroundColor: '#FFF5F2',
  },
  paymentTabIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  paymentTabLabel: {
    fontWeight: '700',
    fontSize: 13,
    color: '#9E9E9E',
  },
  paymentTabLabelSelected: {
    color: '#F1591D',
  },
  paymentTabSub: {
    fontSize: 10,
    color: '#9E9E9E',
    textAlign: 'center',
    marginTop: 2,
  },
  pixBanner: {
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#22C55E',
  },
  pixBannerText: {
    fontSize: 13,
    color: '#166534',
    fontWeight: '600',
  },
  // Summary
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  summaryDiscount: {
    fontSize: 14,
    color: '#22C55E',
    fontWeight: '600',
  },
  summaryFree: {
    fontSize: 14,
    color: '#22C55E',
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#F2F2F2',
    marginTop: 12,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  summaryTotalValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F1591D',
  },
  bottomSpacer: {
    height: 110,
  },
  // Bottom Bar
  bottomBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 12,
  },
  bottomLeft: {
    flex: 1,
  },
  bottomTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  bottomSub: {
    fontSize: 11,
    color: '#9E9E9E',
    marginTop: 2,
  },
  confirmButton: {
    backgroundColor: '#F1591D',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
})

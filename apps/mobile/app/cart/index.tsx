import { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import { useRouter } from 'expo-router'

type CartItem = {
  id: string
  emoji: string
  emojiBg: string
  name: string
  store: string
  unit: string
  quantity: number
  unitPrice: number
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: '1',
    emoji: '🏗️',
    emojiBg: '#F1591D',
    name: 'Cimento CP-II E 50kg',
    store: 'Materiais Belo',
    unit: 'por saco (50 kg)',
    quantity: 5,
    unitPrice: 32.9,
  },
  {
    id: '2',
    emoji: '⚡',
    emojiBg: '#F59E0B',
    name: 'Fio Elétrico 2,5mm 100m',
    store: 'Construfácil Sul',
    unit: 'por rolo (100 m)',
    quantity: 1,
    unitPrice: 189.0,
  },
  {
    id: '3',
    emoji: '🪣',
    emojiBg: '#22C55E',
    name: 'Tinta Acrílica 18L Coral',
    store: 'DepósitoMax',
    unit: 'por lata (18 L)',
    quantity: 2,
    unitPrice: 219.9,
  },
]

export default function CartScreen() {
  const router = useRouter()
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS)
  const [coupon, setCoupon] = useState('')

  function increment(id: string) {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    )
  }

  function decrement(id: string) {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
    )
  }

  function removeItem(id: string) {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const pixDiscount = subtotal * 0.05
  const total = subtotal - pixDiscount

  function fmt(value: number) {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cart Items */}
        {items.map(item => (
          <View key={item.id} style={styles.itemCard}>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => removeItem(item.id)}>
              <Text style={styles.deleteBtnText}>✕</Text>
            </TouchableOpacity>

            <View style={styles.itemRow}>
              <View style={[styles.itemEmoji, { backgroundColor: item.emojiBg }]}>
                <Text style={styles.itemEmojiText}>{item.emoji}</Text>
              </View>

              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.itemStore}>{item.store}</Text>
                <Text style={styles.itemUnit}>{item.unit}</Text>

                <View style={styles.itemBottom}>
                  <View style={styles.qtyRow}>
                    <TouchableOpacity
                      style={styles.qtyMinus}
                      onPress={() => decrement(item.id)}
                    >
                      <Text style={styles.qtyMinusText}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyNum}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.qtyPlus}
                      onPress={() => increment(item.id)}
                    >
                      <Text style={styles.qtyPlusText}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.itemPrice}>
                    R$ {fmt(item.unitPrice * item.quantity)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}

        {/* Coupon Row */}
        <View style={styles.couponCard}>
          <Text style={styles.couponIcon}>🏷️</Text>
          <TextInput
            style={styles.couponInput}
            placeholder="Adicionar cupom"
            placeholderTextColor="#9E9E9E"
            value={coupon}
            onChangeText={setCoupon}
            autoCapitalize="characters"
          />
          <TouchableOpacity style={styles.couponButton}>
            <Text style={styles.couponButtonText}>Aplicar</Text>
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumo do pedido</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>R$ {fmt(subtotal)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Desconto PIX (5%)</Text>
            <Text style={styles.summaryDiscount}>− R$ {fmt(pixDiscount)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Entrega</Text>
            <Text style={styles.summaryFree}>Grátis</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalValue}>R$ {fmt(total)}</Text>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.bottomBarInner}>
          <Text style={styles.bottomPrice}>R$ {fmt(total)}</Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => router.push('/checkout')}
            activeOpacity={0.85}
          >
            <Text style={styles.checkoutButtonText}>Ir para o checkout</Text>
          </TouchableOpacity>
        </View>
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
    paddingTop: 12,
  },
  // Item Card
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    position: 'relative',
  },
  deleteBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 4,
  },
  deleteBtnText: {
    color: '#9E9E9E',
    fontSize: 14,
    fontWeight: '600',
  },
  itemRow: {
    flexDirection: 'row',
    gap: 12,
  },
  itemEmoji: {
    width: 56,
    height: 56,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  itemEmojiText: {
    fontSize: 26,
  },
  itemInfo: {
    flex: 1,
    paddingRight: 20,
  },
  itemName: {
    fontWeight: '700',
    fontSize: 13,
    color: '#1A1A1A',
    lineHeight: 18,
    marginBottom: 2,
  },
  itemStore: {
    fontSize: 11,
    color: '#F1591D',
    fontWeight: '600',
    marginBottom: 2,
  },
  itemUnit: {
    fontSize: 10,
    color: '#9E9E9E',
    marginBottom: 10,
  },
  itemBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyMinus: {
    width: 28,
    height: 28,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyMinusText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
    lineHeight: 18,
  },
  qtyNum: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    minWidth: 20,
    textAlign: 'center',
  },
  qtyPlus: {
    width: 28,
    height: 28,
    backgroundColor: '#F1591D',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyPlusText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 18,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F1591D',
  },
  // Coupon
  couponCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  couponIcon: {
    fontSize: 18,
  },
  couponInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
    padding: 0,
  },
  couponButton: {
    backgroundColor: '#F1591D',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  couponButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  // Summary
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
  },
  summaryTitle: {
    fontWeight: '700',
    fontSize: 15,
    color: '#1A1A1A',
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
    marginBottom: 10,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  summaryTotalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F1591D',
  },
  bottomSpacer: {
    height: 100,
  },
  // Bottom Bar
  bottomBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 12,
  },
  bottomBarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bottomPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  checkoutButton: {
    flex: 1,
    backgroundColor: '#F1591D',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
})

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

export default function ProductDetail() {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [specsExpanded, setSpecsExpanded] = useState(false)
  const [cep, setCep] = useState('')
  const [added, setAdded] = useState(false)

  function increment() {
    setQuantity(q => q + 1)
  }

  function decrement() {
    setQuantity(q => (q > 1 ? q - 1 : 1))
  }

  function handleAddToCart() {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const specs = [
    { label: 'Tipo', value: 'CP-II E (Composto com Escória)' },
    { label: 'Resistência', value: '32 MPa' },
    { label: 'Peso', value: '50 kg por saco' },
    { label: 'Embalagem', value: 'Saco de papel kraft' },
    { label: 'Norma', value: 'ABNT NBR 11578' },
    { label: 'Fabricante', value: 'Votorantim Cimentos' },
  ]

  const reviews = [
    {
      name: 'João S.',
      date: '28/07/2026',
      stars: 5,
      comment: 'Produto de ótima qualidade, chegou no prazo e bem embalado.',
    },
    {
      name: 'Maria L.',
      date: '15/07/2026',
      stars: 4,
      comment: 'Cimento de boa resistência, recomendo para obras estruturais.',
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Images Area */}
        <View style={styles.imageArea}>
          <Text style={styles.mainEmoji}>🏗️</Text>
          <View style={styles.discountBadgeImg}>
            <Text style={styles.discountBadgeImgText}>-20%</Text>
          </View>
          <View style={styles.thumbnailRow}>
            {['#F1591D', '#CC4010', '#9E9E9E'].map((color, i) => (
              <View
                key={i}
                style={[styles.thumbnail, { backgroundColor: color, opacity: i === 0 ? 1 : 0.5 }]}
              />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.infoSection}>
          {/* Store Row */}
          <View style={styles.storeRow}>
            <View style={styles.storeAvatar}>
              <Text style={styles.storeAvatarText}>MB</Text>
            </View>
            <Text style={styles.storeName}>Materiais Belo</Text>
            <Text style={styles.storeRating}>★4.8</Text>
            <TouchableOpacity>
              <Text style={styles.storeLinkText}>Ver loja →</Text>
            </TouchableOpacity>
          </View>

          {/* Product Name */}
          <Text style={styles.productName}>Cimento CP-II E 50kg Votorantim</Text>

          {/* Category Badge */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>Cimento</Text>
          </View>

          {/* Price Row */}
          <View style={styles.priceBlock}>
            <View style={styles.priceRow}>
              <Text style={styles.priceMain}>R$ 32,90</Text>
              <Text style={styles.priceOld}>R$ 41,00</Text>
              <View style={styles.discountBadge}>
                <Text style={styles.discountBadgeText}>-20%</Text>
              </View>
            </View>
            <Text style={styles.priceUnit}>por saco (50 kg)</Text>
          </View>

          {/* Especificações Técnicas */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardHeader}
              onPress={() => setSpecsExpanded(v => !v)}
              activeOpacity={0.7}
            >
              <Text style={styles.cardTitle}>Especificações</Text>
              <Text style={styles.chevron}>{specsExpanded ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {specsExpanded && (
              <View style={styles.specsTable}>
                {specs.map((spec, i) => (
                  <View
                    key={i}
                    style={[styles.specRow, i < specs.length - 1 && styles.specRowBorder]}
                  >
                    <Text style={styles.specLabel}>{spec.label}</Text>
                    <Text style={styles.specValue}>{spec.value}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Quantidade */}
          <View style={styles.quantitySection}>
            <Text style={styles.sectionLabel}>Quantidade</Text>
            <View style={styles.quantityRow}>
              <TouchableOpacity style={styles.qtyBtnMinus} onPress={decrement}>
                <Text style={styles.qtyBtnMinusText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyNumber}>{quantity}</Text>
              <TouchableOpacity style={styles.qtyBtnPlus} onPress={increment}>
                <Text style={styles.qtyBtnPlusText}>+</Text>
              </TouchableOpacity>
              <Text style={styles.qtyUnit}>por saco</Text>
            </View>
          </View>

          {/* Entrega */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Entrega</Text>
            <View style={styles.cepRow}>
              <TextInput
                style={styles.cepInput}
                placeholder="Calcular frete"
                placeholderTextColor="#9E9E9E"
                value={cep}
                onChangeText={setCep}
                keyboardType="numeric"
                maxLength={9}
              />
              <TouchableOpacity style={styles.cepButton}>
                <Text style={styles.cepButtonText}>Calcular</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.deliveryOption}>
              <Text style={styles.deliveryFree}>🚚 Frota própria — Grátis — Hoje até 18h</Text>
            </View>
            <View style={styles.deliveryOption}>
              <Text style={styles.deliveryPaid}>⚡ Entrega expressa — R$ 28,90 — Hoje até 2h</Text>
            </View>
          </View>

          {/* Avaliações */}
          <View style={styles.reviewsSection}>
            <Text style={styles.sectionLabel}>Avaliações</Text>
            <View style={styles.ratingHeader}>
              <Text style={styles.ratingScore}>★ 4.8</Text>
              <Text style={styles.ratingCount}>(127 avaliações)</Text>
              <Text style={styles.starsDisplay}>★★★★★</Text>
            </View>
            {reviews.map((review, i) => (
              <View key={i} style={styles.reviewCard}>
                <View style={styles.reviewTop}>
                  <Text style={styles.reviewName}>{review.name}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <Text style={styles.reviewStars}>{'★'.repeat(review.stars)}</Text>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>

          {/* Bottom spacer for fixed bar */}
          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>

      {/* Fixed Bottom Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.addToCartButton, added && styles.addedButton]}
          onPress={handleAddToCart}
          activeOpacity={0.85}
        >
          <Text style={styles.addToCartIcon}>🛒</Text>
          <Text style={styles.addToCartText}>
            {added ? 'Adicionado! ✓' : 'Adicionar ao carrinho'}
          </Text>
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
    paddingBottom: 0,
  },
  // Image Area
  imageArea: {
    backgroundColor: '#F2F2F2',
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  mainEmoji: {
    fontSize: 56,
  },
  discountBadgeImg: {
    position: 'absolute',
    bottom: 48,
    left: 16,
    backgroundColor: '#F1591D',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  discountBadgeImgText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  thumbnailRow: {
    position: 'absolute',
    bottom: 12,
    flexDirection: 'row',
    gap: 8,
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  // Info Section
  infoSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  storeAvatar: {
    width: 32,
    height: 32,
    backgroundColor: '#F1591D',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storeAvatarText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
  },
  storeName: {
    fontWeight: '700',
    fontSize: 13,
    color: '#1A1A1A',
    flex: 1,
  },
  storeRating: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
  },
  storeLinkText: {
    color: '#F1591D',
    fontWeight: '600',
    fontSize: 12,
  },
  productName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    lineHeight: 28,
    marginBottom: 10,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F2F2F2',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 14,
  },
  categoryBadgeText: {
    fontSize: 11,
    color: '#9E9E9E',
    fontWeight: '500',
  },
  // Price
  priceBlock: {
    marginBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  priceMain: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F1591D',
  },
  priceOld: {
    fontSize: 14,
    color: '#9E9E9E',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#F1591D',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  priceUnit: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 2,
  },
  // Card
  card: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 15,
    color: '#1A1A1A',
  },
  chevron: {
    color: '#9E9E9E',
    fontSize: 12,
  },
  specsTable: {
    marginTop: 12,
  },
  specRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    gap: 8,
  },
  specRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  specLabel: {
    width: 100,
    fontSize: 13,
    color: '#9E9E9E',
    fontWeight: '500',
  },
  specValue: {
    flex: 1,
    fontSize: 13,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  // Quantity
  quantitySection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontWeight: '700',
    fontSize: 15,
    color: '#1A1A1A',
    marginBottom: 12,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  qtyBtnMinus: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnMinusText: {
    fontSize: 18,
    color: '#1A1A1A',
    fontWeight: '600',
    lineHeight: 20,
  },
  qtyNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    minWidth: 28,
    textAlign: 'center',
  },
  qtyBtnPlus: {
    width: 36,
    height: 36,
    backgroundColor: '#F1591D',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnPlusText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    lineHeight: 20,
  },
  qtyUnit: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  // Delivery
  cepRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    marginBottom: 12,
  },
  cepInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#1A1A1A',
  },
  cepButton: {
    backgroundColor: '#F1591D',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cepButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  deliveryOption: {
    paddingVertical: 6,
  },
  deliveryFree: {
    fontSize: 13,
    color: '#22C55E',
    fontWeight: '500',
  },
  deliveryPaid: {
    fontSize: 13,
    color: '#9E9E9E',
    fontWeight: '500',
  },
  // Reviews
  reviewsSection: {
    marginBottom: 20,
  },
  ratingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  ratingScore: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F59E0B',
  },
  ratingCount: {
    fontSize: 13,
    color: '#9E9E9E',
    flex: 1,
  },
  starsDisplay: {
    fontSize: 16,
    color: '#F59E0B',
  },
  reviewCard: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },
  reviewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reviewName: {
    fontWeight: '700',
    fontSize: 13,
    color: '#1A1A1A',
  },
  reviewDate: {
    fontSize: 11,
    color: '#9E9E9E',
  },
  reviewStars: {
    color: '#F59E0B',
    fontSize: 13,
    marginBottom: 6,
  },
  reviewComment: {
    fontSize: 13,
    color: '#1A1A1A',
    lineHeight: 19,
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
  addToCartButton: {
    backgroundColor: '#F1591D',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  addedButton: {
    backgroundColor: '#22C55E',
  },
  addToCartIcon: {
    fontSize: 18,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
})

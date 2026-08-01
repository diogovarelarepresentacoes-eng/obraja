import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '../../constants/colors'

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: '1', icon: '⚡', label: 'Elétrica', bg: '#FFF0E8' },
  { id: '2', icon: '💧', label: 'Hidráulica', bg: '#E8F4FF' },
  { id: '3', icon: '🧱', label: 'Cimento', bg: '#F2F2F2' },
  { id: '4', icon: '🪵', label: 'Madeira', bg: '#FFF8E8' },
  { id: '5', icon: '🔩', label: 'Ferragens', bg: '#F2F2F2' },
  { id: '6', icon: '🎨', label: 'Tintas', bg: '#F0FFF4' },
  { id: '7', icon: '🪟', label: 'Esquadrias', bg: '#F8F0FF' },
]

const STORES = [
  { id: '1', name: 'Materiais Belo', initials: 'MB', avatarBg: Colors.primary, rating: '4.8', distance: '1,2 km', time: '35 min' },
  { id: '2', name: 'Construfácil Sul', initials: 'CS', avatarBg: Colors.black, rating: '4.6', distance: '2,4 km', time: '45 min' },
  { id: '3', name: 'DepósitoMax', initials: 'DM', avatarBg: Colors.primary, rating: '4.9', distance: '0,8 km', time: '25 min' },
]

const PRODUCTS = [
  {
    id: '1',
    icon: '🏗️',
    name: 'Cimento CP-II 50kg Votorantim',
    unit: 'saco',
    price: 'R$ 32,90',
    oldPrice: 'R$ 41,00',
    store: 'Materiais Belo',
    badge: '-20%',
  },
  {
    id: '2',
    icon: '⚡',
    name: 'Fio Elétrico 2,5mm 100m',
    unit: 'rolo',
    price: 'R$ 189,00',
    oldPrice: null,
    store: 'Construfácil Sul',
    badge: null,
  },
  {
    id: '3',
    icon: '🪣',
    name: 'Tinta Acrílica 18L Coral',
    unit: 'lata',
    price: 'R$ 219,90',
    oldPrice: 'R$ 259,00',
    store: 'DepósitoMax',
    badge: '-15%',
  },
  {
    id: '4',
    icon: '🔩',
    name: 'Vergalhão CA-50 10mm 12m',
    unit: 'barra',
    price: 'R$ 54,50',
    oldPrice: null,
    store: 'Materiais Belo',
    badge: null,
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ title, link }: { title: string; link: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.sectionLink}>{link}</Text>
      </TouchableOpacity>
    </View>
  )
}

function CategoryItem({ item }: { item: typeof CATEGORIES[0] }) {
  return (
    <View style={styles.categoryItem}>
      <View style={[styles.categoryIcon, { backgroundColor: item.bg }]}>
        <Text style={styles.categoryEmoji}>{item.icon}</Text>
      </View>
      <Text style={styles.categoryLabel}>{item.label}</Text>
    </View>
  )
}

function StoreCard({ store, onPress }: { store: typeof STORES[0]; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.storeCard} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.storeCover}>
        <View style={[styles.storeAvatar, { backgroundColor: store.avatarBg }]}>
          <Text style={styles.storeInitials}>{store.initials}</Text>
        </View>
        <View style={styles.openBadge}>
          <Text style={styles.openBadgeText}>Aberta</Text>
        </View>
      </View>
      <View style={styles.storeInfo}>
        <Text style={styles.storeName}>{store.name}</Text>
        <Text style={styles.storeMeta}>⭐ {store.rating}  ·  {store.distance}  ·  {store.time}</Text>
      </View>
    </TouchableOpacity>
  )
}

function ProductCard({ product, onPress }: { product: typeof PRODUCTS[0]; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.productCard} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.productImageArea}>
        <Text style={styles.productEmoji}>{product.icon}</Text>
        {product.badge && (
          <View style={styles.productBadge}>
            <Text style={styles.productBadgeText}>{product.badge}</Text>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.productUnit}>{product.unit}</Text>
        <View style={styles.productPriceRow}>
          <View>
            <Text style={styles.productPrice}>{product.price}</Text>
            {product.oldPrice && (
              <Text style={styles.productOldPrice}>{product.oldPrice}</Text>
            )}
          </View>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.productStore}>{product.store}</Text>
      </View>
    </TouchableOpacity>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const router = useRouter()

  const productPairs = [
    [PRODUCTS[0], PRODUCTS[1]],
    [PRODUCTS[2], PRODUCTS[3]],
  ]

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.locationRow}>
            <Text style={styles.locationIcon}>📍</Text>
            <View>
              <Text style={styles.locationLabel}>Entregar em</Text>
              <Text style={styles.locationAddress}>Rua das Flores, 142 ▾</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.headerLogo}>
            <Text style={styles.logoObra}>Obra</Text>
            <Text style={styles.logoJa}>Já</Text>
          </View>

          <TouchableOpacity style={styles.cartButton} onPress={() => router.push('/cart')}>
            <Text style={styles.cartIcon}>🛒</Text>
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar produtos, lojas..."
            placeholderTextColor="rgba(255,255,255,0.45)"
          />
        </View>
      </View>

      {/* ── Categories ── */}
      <View style={styles.section}>
        <SectionHeader title="Categorias" link="Ver todas →" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {CATEGORIES.map((cat) => (
            <CategoryItem key={cat.id} item={cat} />
          ))}
        </ScrollView>
      </View>

      {/* ── Promo Banner ── */}
      <View style={styles.promoBanner}>
        <View style={styles.promoContent}>
          <View style={styles.promoTag}>
            <Text style={styles.promoTagText}>OFERTA DA SEMANA</Text>
          </View>
          <Text style={styles.promoTitle}>Cimento até 25% OFF</Text>
          <Text style={styles.promoSubtitle}>Votorantim, Itambé, Lafarge</Text>
          <TouchableOpacity style={styles.promoButton}>
            <Text style={styles.promoButtonText}>Ver ofertas →</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.promoDots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      {/* ── Lojas Próximas ── */}
      <View style={styles.section}>
        <SectionHeader title="Lojas Próximas" link="Ver todas →" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storesScroll}>
          {STORES.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              onPress={() => router.push('/store/1')}
            />
          ))}
        </ScrollView>
      </View>

      {/* ── Mais Vendidos ── */}
      <View style={styles.section}>
        <SectionHeader title="Mais Vendidos" link="Ver todos →" />
        {productPairs.map((pair, rowIdx) => (
          <View key={rowIdx} style={styles.productRow}>
            {pair.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPress={() => router.push('/product/1')}
              />
            ))}
          </View>
        ))}
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  // Header
  header: {
    backgroundColor: Colors.black,
    paddingTop: 44,
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  locationIcon: {
    fontSize: 16,
  },
  locationLabel: {
    color: Colors.grayMid,
    fontSize: 10,
    fontWeight: '500',
  },
  locationAddress: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  headerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoObra: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '800',
  },
  logoJa: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: '800',
  },
  cartButton: {
    flex: 1,
    alignItems: 'flex-end',
    position: 'relative',
  },
  cartIcon: {
    fontSize: 22,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: '800',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
  },
  searchIcon: {
    fontSize: 15,
  },
  searchInput: {
    flex: 1,
    color: Colors.white,
    fontSize: 13,
  },

  // Section
  section: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.black,
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },

  // Categories
  categoriesScroll: {
    gap: 12,
  },
  categoryItem: {
    alignItems: 'center',
    gap: 6,
  },
  categoryIcon: {
    width: 58,
    height: 58,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryEmoji: {
    fontSize: 26,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.black,
    textAlign: 'center',
  },

  // Promo Banner
  promoBanner: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: Colors.primary,
    borderRadius: 14,
    padding: 20,
    overflow: 'hidden',
  },
  promoContent: {
    flex: 1,
  },
  promoTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 8,
  },
  promoTagText: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  promoTitle: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  promoSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
    marginBottom: 14,
  },
  promoButton: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  promoButtonText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  promoDots: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 14,
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  dotActive: {
    width: 18,
    backgroundColor: Colors.white,
  },

  // Stores
  storesScroll: {
    gap: 12,
  },
  storeCard: {
    width: 170,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  storeCover: {
    height: 80,
    backgroundColor: Colors.black,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    padding: 8,
  },
  storeAvatar: {
    position: 'absolute',
    bottom: -20,
    left: 12,
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  storeInitials: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
  openBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  openBadgeText: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: '700',
  },
  storeInfo: {
    padding: 12,
    paddingTop: 26,
  },
  storeName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 4,
  },
  storeMeta: {
    fontSize: 11,
    color: Colors.grayMid,
  },

  // Products
  productRow: {
    flexDirection: 'row',
    marginHorizontal: -6,
    marginBottom: 0,
  },
  productCard: {
    flex: 1,
    margin: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  productImageArea: {
    height: 100,
    backgroundColor: Colors.grayLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productEmoji: {
    fontSize: 40,
  },
  productBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  productBadgeText: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: '800',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 2,
  },
  productUnit: {
    fontSize: 10,
    color: Colors.grayMid,
    marginBottom: 6,
  },
  productPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
  productOldPrice: {
    fontSize: 10,
    color: Colors.grayMid,
    textDecorationLine: 'line-through',
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
  },
  productStore: {
    fontSize: 9,
    color: Colors.grayMid,
  },

  bottomSpacer: {
    height: 20,
  },
})

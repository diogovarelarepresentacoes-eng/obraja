import { useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  Platform, TextInput, ActivityIndicator, Alert,
} from 'react-native'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Colors } from '@/constants/colors'
import { sellerService } from '@/services/orders'
import type { Product } from '@/types/seller'

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Cimento CP-II 50kg', sku: 'CIM-CPII-50', price: 31.90, priceB2B: 28.50, stock: 2400, unit: 'sacos', category: 'Cimento e Argamassa', isActive: true },
  { id: '2', name: 'Tinta Acrílica 18L', sku: 'TIN-ACR-18', price: 189.90, priceB2B: 165.00, stock: 84, unit: 'latas', category: 'Tintas', isActive: true },
  { id: '3', name: 'Argamassa AC-II 20kg', sku: 'ARG-ACII-20', price: 52.50, priceB2B: 45.00, stock: 7, unit: 'caixas', category: 'Cimento e Argamassa', isActive: true },
  { id: '4', name: 'Cerâmica 60x60cm', sku: 'CER-6060', price: 48.00, priceB2B: 42.00, stock: 320, unit: 'm²', category: 'Cerâmica e Pisos', isActive: true },
  { id: '5', name: 'Fio Elétrico 2,5mm 100m', sku: 'FIO-25-100', price: 189.00, priceB2B: 172.00, stock: 0, unit: 'rolos', category: 'Elétrica', isActive: false },
]

const currency = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function CatalogScreen() {
  const [search, setSearch] = useState('')
  const qc = useQueryClient()

  const { data: products = MOCK_PRODUCTS, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: sellerService.getProducts,
    placeholderData: MOCK_PRODUCTS,
    retry: false,
  })

  const { mutate: toggleActive } = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      sellerService.toggleProductActive(id, isActive),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
    onError: () => Alert.alert('Erro', 'Não foi possível atualizar o produto'),
  })

  const { mutate: updateStock } = useMutation({
    mutationFn: ({ id, stock }: { id: string; stock: number }) =>
      sellerService.updateStock(id, stock),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['products'] }),
  })

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  )

  const lowStockItems = products.filter(p => p.stock <= 10 && p.isActive)

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.headerTitle}>Catálogo</Text>
        <TouchableOpacity style={s.addBtn} activeOpacity={0.85}>
          <Text style={s.addBtnText}>+ Produto</Text>
        </TouchableOpacity>
      </View>

      <View style={s.searchBar}>
        <TextInput
          style={s.searchInput}
          placeholder="Buscar produto ou SKU..."
          placeholderTextColor={Colors.grayMid}
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
        />
        {isLoading && <ActivityIndicator color={Colors.primary} style={{ marginLeft: 8 }} />}
      </View>

      {lowStockItems.length > 0 && (
        <View style={s.alertBanner}>
          <Text style={s.alertBannerText}>
            ⚠️ {lowStockItems.length} produto{lowStockItems.length > 1 ? 's' : ''} com estoque baixo
          </Text>
        </View>
      )}

      <ScrollView style={s.list} contentContainerStyle={s.listContent} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={s.empty}>
            <Text style={s.emptyEmoji}>📦</Text>
            <Text style={s.emptyTitle}>Nenhum produto encontrado</Text>
          </View>
        ) : (
          filtered.map(product => {
            const isLowStock = product.stock <= 10 && product.isActive
            return (
              <View key={product.id} style={[s.card, !product.isActive && s.cardInactive]}>
                <View style={s.cardTop}>
                  <View style={s.productInfo}>
                    <Text style={s.productName}>{product.name}</Text>
                    <Text style={s.productSku}>{product.sku} · {product.category}</Text>
                  </View>
                  <TouchableOpacity
                    style={[s.toggle, product.isActive ? s.toggleOn : s.toggleOff]}
                    onPress={() => toggleActive({ id: product.id, isActive: !product.isActive })}
                    activeOpacity={0.8}
                  >
                    <Text style={s.toggleText}>{product.isActive ? 'Ativo' : 'Inativo'}</Text>
                  </TouchableOpacity>
                </View>

                <View style={s.priceRow}>
                  <View style={s.priceBlock}>
                    <Text style={s.priceLabel}>B2C</Text>
                    <Text style={s.priceValue}>{currency(product.price)}</Text>
                  </View>
                  {product.priceB2B && (
                    <View style={s.priceBlock}>
                      <Text style={s.priceLabel}>B2B</Text>
                      <Text style={[s.priceValue, { color: Colors.info }]}>{currency(product.priceB2B)}</Text>
                    </View>
                  )}
                  <View style={s.priceBlock}>
                    <Text style={s.priceLabel}>Unidade</Text>
                    <Text style={s.priceValue}>{product.unit}</Text>
                  </View>
                </View>

                <View style={s.stockRow}>
                  <View style={s.stockInfo}>
                    <Text style={s.stockLabel}>Estoque</Text>
                    <Text style={[s.stockValue, isLowStock && { color: Colors.danger }]}>
                      {product.stock} {product.unit}
                      {isLowStock && ' ⚠️'}
                    </Text>
                  </View>
                  <View style={s.stockActions}>
                    <TouchableOpacity
                      style={s.stockBtn}
                      onPress={() => product.stock > 0 && updateStock({ id: product.id, stock: product.stock - 1 })}
                    >
                      <Text style={s.stockBtnText}>−</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[s.stockBtn, s.stockBtnAdd]}
                      onPress={() => updateStock({ id: product.id, stock: product.stock + 10 })}
                    >
                      <Text style={[s.stockBtnText, { color: Colors.white }]}>+10</Text>
                    </TouchableOpacity>
                  </View>
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
  addBtn: { backgroundColor: Colors.primary, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 },
  addBtnText: { color: Colors.white, fontSize: 14, fontWeight: '700' },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10,
    backgroundColor: Colors.white, borderBottomWidth: 1, borderBottomColor: Colors.grayBorder,
  },
  searchInput: { flex: 1, height: 40, backgroundColor: Colors.grayLight, borderRadius: 10, paddingHorizontal: 14, fontSize: 14, color: Colors.black },
  alertBanner: { backgroundColor: '#fffbeb', paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#fde68a' },
  alertBannerText: { color: '#b45309', fontSize: 13, fontWeight: '600' },
  list: { flex: 1 },
  listContent: { padding: 16, gap: 12 },
  empty: { alignItems: 'center', paddingTop: 80 },
  emptyEmoji: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '600', color: Colors.grayMid },
  card: { backgroundColor: Colors.white, borderRadius: 14, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 2 },
  cardInactive: { opacity: 0.6 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  productInfo: { flex: 1, marginRight: 8 },
  productName: { fontSize: 14, fontWeight: '700', color: Colors.black, marginBottom: 2 },
  productSku: { fontSize: 11, color: Colors.grayMid },
  toggle: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  toggleOn: { backgroundColor: Colors.successBg },
  toggleOff: { backgroundColor: Colors.dangerBg },
  toggleText: { fontSize: 12, fontWeight: '600', color: Colors.black },
  priceRow: { flexDirection: 'row', gap: 16, marginBottom: 10, backgroundColor: Colors.grayLight, borderRadius: 8, padding: 10 },
  priceBlock: { flex: 1 },
  priceLabel: { fontSize: 10, color: Colors.grayMid, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  priceValue: { fontSize: 14, fontWeight: '700', color: Colors.black },
  stockRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  stockInfo: {},
  stockLabel: { fontSize: 11, color: Colors.grayMid, fontWeight: '600', textTransform: 'uppercase' },
  stockValue: { fontSize: 14, fontWeight: '700', color: Colors.black },
  stockActions: { flexDirection: 'row', gap: 8 },
  stockBtn: { width: 36, height: 36, borderRadius: 8, backgroundColor: Colors.grayLight, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.grayBorder },
  stockBtnAdd: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  stockBtnText: { fontSize: 14, fontWeight: '700', color: Colors.black },
})

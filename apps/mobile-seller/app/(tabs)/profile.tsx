import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform, Alert,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/colors'
import { useAuthStore } from '@/store/auth.store'

interface MenuItem {
  emoji: string
  label: string
  sub?: string
  onPress: () => void
  danger?: boolean
}

export default function ProfileScreen() {
  const router = useRouter()
  const { user, clearAuth } = useAuthStore()

  function handleLogout() {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair', style: 'destructive',
          onPress: async () => {
            await clearAuth()
            router.replace('/(auth)')
          },
        },
      ]
    )
  }

  const menuItems: MenuItem[] = [
    { emoji: '🏪', label: 'Dados da Empresa', sub: 'CNPJ, razão social, endereço', onPress: () => {} },
    { emoji: '✉️', label: 'E-mail e Contato', sub: user?.email ?? '', onPress: () => {} },
    { emoji: '🔒', label: 'Alterar Senha', sub: 'Atualize sua senha de acesso', onPress: () => {} },
    { emoji: '🔔', label: 'Notificações', sub: 'Pedidos, entregas, promoções', onPress: () => {} },
    { emoji: '💳', label: 'Dados Bancários', sub: 'Chave Pix para recebimento', onPress: () => {} },
    { emoji: '📊', label: 'Relatórios', sub: 'Vendas, comissões, repasses', onPress: () => {} },
    { emoji: '❓', label: 'Ajuda e Suporte', sub: 'FAQ, chat, telefone', onPress: () => {} },
    { emoji: '📄', label: 'Termos de Uso', sub: 'Políticas ObraJá', onPress: () => {} },
  ]

  const roleLabel = user?.role === 'industry' ? 'Indústria / Fábrica' : 'Loja de Materiais'
  const roleEmoji = user?.role === 'industry' ? '🏭' : '🏪'

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.headerTitle}>Perfil</Text>
      </View>

      <ScrollView style={s.scroll} contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        {/* Profile card */}
        <View style={s.profileCard}>
          <View style={s.avatarCircle}>
            <Text style={s.avatarText}>{user?.name?.[0] ?? 'V'}</Text>
          </View>
          <View style={s.profileInfo}>
            <Text style={s.profileName}>{user?.name ?? 'Vendedor'}</Text>
            <View style={s.rolePill}>
              <Text style={s.rolePillText}>{roleEmoji} {roleLabel}</Text>
            </View>
            {!user?.isVerified && (
              <View style={s.verifyBanner}>
                <Text style={s.verifyText}>⏳ Conta em análise — aguarde aprovação ObraJá</Text>
              </View>
            )}
            {user?.isVerified && (
              <View style={[s.verifyBanner, s.verifyBannerOk]}>
                <Text style={[s.verifyText, { color: Colors.success }]}>✓ Conta verificada</Text>
              </View>
            )}
          </View>
        </View>

        {/* Stats row */}
        <View style={s.statsRow}>
          {[
            { label: 'Pedidos', value: '89' },
            { label: 'Produtos', value: '34' },
            { label: 'Avaliação', value: '4.8 ⭐' },
          ].map(stat => (
            <View key={stat.label} style={s.statItem}>
              <Text style={s.statValue}>{stat.value}</Text>
              <Text style={s.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu */}
        <View style={s.menuCard}>
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[s.menuItem, i < menuItems.length - 1 && s.menuItemBorder]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <Text style={s.menuEmoji}>{item.emoji}</Text>
              <View style={s.menuText}>
                <Text style={[s.menuLabel, item.danger && { color: Colors.danger }]}>{item.label}</Text>
                {item.sub && <Text style={s.menuSub} numberOfLines={1}>{item.sub}</Text>}
              </View>
              <Text style={s.menuChevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={s.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
          <Text style={s.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

        <Text style={s.version}>ObraJá Vendedor v1.0.0</Text>
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.grayLight },
  header: {
    backgroundColor: Colors.black, paddingTop: Platform.OS === 'ios' ? 56 : 40,
    paddingBottom: 16, paddingHorizontal: 16,
  },
  headerTitle: { color: Colors.white, fontSize: 20, fontWeight: '800' },
  scroll: { flex: 1 },
  content: { padding: 16 },
  profileCard: {
    backgroundColor: Colors.white, borderRadius: 16, padding: 20,
    flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3,
  },
  avatarCircle: {
    width: 60, height: 60, borderRadius: 30,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: Colors.white, fontSize: 26, fontWeight: '900' },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 17, fontWeight: '800', color: Colors.black, marginBottom: 4 },
  rolePill: { backgroundColor: '#fff5f1', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start', marginBottom: 6 },
  rolePillText: { color: Colors.primary, fontSize: 12, fontWeight: '700' },
  verifyBanner: { backgroundColor: '#fffbeb', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  verifyBannerOk: { backgroundColor: Colors.successBg },
  verifyText: { color: '#b45309', fontSize: 11, fontWeight: '500' },
  statsRow: {
    backgroundColor: Colors.white, borderRadius: 14, padding: 16, flexDirection: 'row',
    justifyContent: 'space-around', marginBottom: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '900', color: Colors.black, marginBottom: 2 },
  statLabel: { fontSize: 11, color: Colors.grayMid, fontWeight: '600' },
  menuCard: { backgroundColor: Colors.white, borderRadius: 14, overflow: 'hidden', marginBottom: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: Colors.grayBorder },
  menuEmoji: { fontSize: 20 },
  menuText: { flex: 1 },
  menuLabel: { fontSize: 14, fontWeight: '600', color: Colors.black, marginBottom: 1 },
  menuSub: { fontSize: 11, color: Colors.grayMid },
  menuChevron: { fontSize: 20, color: Colors.grayMid, fontWeight: '300' },
  logoutBtn: {
    borderWidth: 2, borderColor: Colors.danger, borderRadius: 14,
    paddingVertical: 14, alignItems: 'center', marginBottom: 16,
  },
  logoutText: { color: Colors.danger, fontSize: 15, fontWeight: '700' },
  version: { textAlign: 'center', color: Colors.grayMid, fontSize: 12 },
})

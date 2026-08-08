import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { Colors } from '@/constants/colors'
import { deliveryService } from '@/services/delivery'
import { useAuthStore } from '@/store/auth.store'
import { useDeliveryStore } from '@/store/delivery.store'

export default function ProfileScreen() {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const clearAuth = useAuthStore((s) => s.clearAuth)
  const { setStats, stats } = useDeliveryStore()

  const { isLoading } = useQuery({
    queryKey: ['delivery', 'stats'],
    queryFn: async () => {
      const data = await deliveryService.getStats()
      setStats(data)
      return data
    },
  })

  async function handleLogout() {
    await clearAuth()
    router.replace('/(auth)')
  }

  const initials = user?.name
    ? user.name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
    : '?'

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.name}>{user?.name ?? '—'}</Text>
        <Text style={styles.email}>{user?.email ?? '—'}</Text>
        {isLoading ? (
          <ActivityIndicator color={Colors.white} style={{ marginTop: 8 }} />
        ) : (
          <View style={styles.ratingRow}>
            <Text style={styles.rating}>★ {(stats?.rating ?? 5.0).toFixed(1)}</Text>
            <Text style={styles.ratingCount}> ({stats?.totalDeliveries ?? 0} entregas)</Text>
          </View>
        )}
      </View>

      <View style={styles.body}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              R$ {(stats?.earningsThisMonth ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </Text>
            <Text style={styles.statLabel}>Este mês</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats?.totalDeliveries ?? 0}</Text>
            <Text style={styles.statLabel}>Entregas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{(stats?.rating ?? 5.0).toFixed(1)}★</Text>
            <Text style={styles.statLabel}>Avaliação</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuEmoji}>🚗</Text>
            <Text style={styles.menuText}>Meu veículo</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuEmoji}>🔔</Text>
            <Text style={styles.menuText}>Notificações</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuEmoji}>💳</Text>
            <Text style={styles.menuText}>Dados bancários</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.grayLight },
  header: {
    backgroundColor: Colors.black,
    paddingTop: 52,
    paddingBottom: 28,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 28, fontWeight: '800', color: Colors.white },
  name: { color: Colors.white, fontSize: 20, fontWeight: '700', marginBottom: 4 },
  email: { color: Colors.grayMid, fontSize: 14, marginBottom: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  rating: { color: Colors.warning, fontSize: 16, fontWeight: '700' },
  ratingCount: { color: Colors.grayMid, fontSize: 13 },
  body: { flex: 1, padding: 16 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: { fontSize: 15, fontWeight: '800', color: Colors.black, marginBottom: 4 },
  statLabel: { fontSize: 12, color: Colors.grayMid, fontWeight: '500' },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingVertical: 4,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.grayMid,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.grayBorder,
  },
  menuEmoji: { fontSize: 18, marginRight: 12 },
  menuText: { flex: 1, fontSize: 15, color: Colors.black, fontWeight: '500' },
  menuArrow: { fontSize: 20, color: Colors.grayMid, fontWeight: '300' },
  logoutBtn: {
    borderWidth: 2,
    borderColor: Colors.danger,
    borderRadius: 12,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: { color: Colors.danger, fontSize: 15, fontWeight: '700' },
})

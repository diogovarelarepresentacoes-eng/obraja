import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '../../constants/colors'

// ─── Types & Data ─────────────────────────────────────────────────────────────

interface MenuItem {
  icon: string
  label: string
  route?: string
  badge?: string
  danger?: boolean
}

interface MenuSection {
  title: string
  items: MenuItem[]
}

const MENU_SECTIONS: MenuSection[] = [
  {
    title: 'Conta',
    items: [
      { icon: '👤', label: 'Dados pessoais', route: '/profile/personal' },
      { icon: '📍', label: 'Endereços', route: '/profile/addresses' },
      { icon: '💳', label: 'Formas de pagamento', route: '/profile/payment' },
    ],
  },
  {
    title: 'Pedidos',
    items: [
      { icon: '📦', label: 'Histórico de pedidos', route: '/orders' },
      { icon: '⭐', label: 'Avaliações', route: '/profile/reviews' },
    ],
  },
  {
    title: 'Preferências',
    items: [
      { icon: '🔔', label: 'Notificações', route: '/profile/notifications', badge: '2' },
      { icon: '🔒', label: 'Privacidade', route: '/profile/privacy' },
    ],
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function MenuRow({
  item,
  isLast,
  onPress,
}: {
  item: MenuItem
  isLast: boolean
  onPress: () => void
}) {
  return (
    <TouchableOpacity
      style={[styles.menuRow, isLast && styles.menuRowLast]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.menuRowLeft}>
        <Text style={styles.menuRowIcon}>{item.icon}</Text>
        <Text style={[styles.menuRowLabel, item.danger && styles.menuRowLabelDanger]}>
          {item.label}
        </Text>
      </View>
      <View style={styles.menuRowRight}>
        {item.badge && (
          <View style={styles.menuBadge}>
            <Text style={styles.menuBadgeText}>{item.badge}</Text>
          </View>
        )}
        <Text style={styles.menuChevron}>›</Text>
      </View>
    </TouchableOpacity>
  )
}

function MenuSection({ section }: { section: MenuSection }) {
  const router = useRouter()

  return (
    <View style={styles.menuSection}>
      <Text style={styles.menuSectionTitle}>{section.title}</Text>
      <View style={styles.menuCard}>
        {section.items.map((item, index) => (
          <MenuRow
            key={item.label}
            item={item}
            isLast={index === section.items.length - 1}
            onPress={() => {
              if (item.route) {
                router.push(item.route as Parameters<typeof router.push>[0])
              }
            }}
          />
        ))}
      </View>
    </View>
  )
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ProfileScreen() {
  function handleLogout() {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', style: 'destructive', onPress: () => {} },
      ]
    )
  }

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            {/* Avatar */}
            <View style={styles.avatar}>
              <Text style={styles.avatarInitials}>JS</Text>
            </View>

            {/* User info */}
            <View style={styles.userInfo}>
              <Text style={styles.userName}>João Silva</Text>
              <Text style={styles.userEmail}>joao.silva@email.com</Text>
              <View style={styles.roleBadge}>
                <Text style={styles.roleBadgeText}>Consumidor Final</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>

      {/* Menu */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {MENU_SECTIONS.map((section) => (
          <MenuSection key={section.title} section={section} />
        ))}

        {/* Logout section */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
            <Text style={styles.logoutButtonText}>Sair da conta</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.grayLight,
  },

  // Header
  header: {
    backgroundColor: Colors.black,
    paddingTop: 44,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '800',
  },
  userInfo: {
    flex: 1,
    gap: 4,
  },
  userName: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  userEmail: {
    color: Colors.grayMid,
    fontSize: 13,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.blackSoft,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 2,
  },
  roleBadgeText: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '700',
  },

  // Content
  content: {
    flex: 1,
  },

  // Menu sections
  menuSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  menuSectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.grayMid,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 4,
  },
  menuCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.grayBorder,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBorder,
  },
  menuRowLast: {
    borderBottomWidth: 0,
  },
  menuRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuRowIcon: {
    fontSize: 18,
    width: 24,
    textAlign: 'center',
  },
  menuRowLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
  },
  menuRowLabelDanger: {
    color: Colors.danger,
  },
  menuRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  menuBadgeText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '800',
  },
  menuChevron: {
    fontSize: 20,
    color: Colors.grayMid,
    fontWeight: '300',
  },

  // Logout
  logoutButton: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  logoutButtonText: {
    color: Colors.danger,
    fontSize: 15,
    fontWeight: '700',
  },

  bottomSpacer: {
    height: 24,
  },
})

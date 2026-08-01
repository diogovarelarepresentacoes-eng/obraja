import { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '../../constants/colors'

type ProfileKey = 'consumer' | 'builder' | 'store' | 'industry'

interface Profile {
  key: ProfileKey
  emoji: string
  name: string
  description: string
}

const PROFILES: Profile[] = [
  {
    key: 'consumer',
    emoji: '🧑‍💼',
    name: 'Consumidor Final',
    description: 'Compre materiais para sua casa',
  },
  {
    key: 'builder',
    emoji: '🏗️',
    name: 'Construtora',
    description: 'Compras em volume para obras',
  },
  {
    key: 'store',
    emoji: '🏪',
    name: 'Loja',
    description: 'Venda materiais de construção',
  },
  {
    key: 'industry',
    emoji: '🏭',
    name: 'Indústria',
    description: 'Distribua para lojas e construtoras',
  },
]

export default function OnboardingScreen() {
  const router = useRouter()
  const [selected, setSelected] = useState<ProfileKey | null>(null)

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoArea}>
          <Text style={styles.logoText}>
            <Text style={styles.logoWhite}>Obra</Text>
            <Text style={styles.logoOrange}>Já</Text>
          </Text>
          <Text style={styles.subtitle}>O marketplace da construção civil</Text>
        </View>

        <Text style={styles.sectionLabel}>Qual é o seu perfil?</Text>

        <View style={styles.grid}>
          {PROFILES.map((profile) => {
            const isActive = selected === profile.key
            return (
              <TouchableOpacity
                key={profile.key}
                style={[styles.card, isActive && styles.cardActive]}
                onPress={() => setSelected(profile.key)}
                activeOpacity={0.8}
              >
                <Text style={styles.cardEmoji}>{profile.emoji}</Text>
                <Text style={styles.cardName}>{profile.name}</Text>
                <Text style={styles.cardDescription}>{profile.description}</Text>
              </TouchableOpacity>
            )
          })}
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.push('/(auth)/login')}
          activeOpacity={0.85}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push('/(auth)/login')}
          activeOpacity={0.7}
        >
          <Text style={styles.loginButtonText}>Já tenho conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
    alignItems: 'center',
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -1,
    marginBottom: 8,
  },
  logoWhite: {
    color: Colors.white,
  },
  logoOrange: {
    color: Colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.white,
    opacity: 0.7,
    textAlign: 'center',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.grayMid,
    textTransform: 'uppercase',
    letterSpacing: 1,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    width: '100%',
    marginBottom: 32,
  },
  card: {
    width: '47%',
    backgroundColor: Colors.blackSoft,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.blackSoft,
    padding: 16,
    alignItems: 'center',
  },
  cardActive: {
    borderColor: Colors.primary,
  },
  cardEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 11,
    color: Colors.grayMid,
    textAlign: 'center',
    lineHeight: 15,
  },
  continueButton: {
    width: '100%',
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  continueButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  loginButton: {
    paddingVertical: 8,
  },
  loginButtonText: {
    color: Colors.grayMid,
    fontSize: 14,
    fontWeight: '600',
  },
})

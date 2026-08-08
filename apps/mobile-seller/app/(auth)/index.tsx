import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/colors'
import { authService } from '@/services/auth'
import { useAuthStore } from '@/store/auth.store'

export default function LoginScreen() {
  const router = useRouter()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [showSenha, setShowSenha] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin() {
    setError(null)
    if (!email.trim() || !senha.trim()) {
      setError('Preencha todos os campos')
      return
    }
    setLoading(true)
    try {
      const data = await authService.login(email.trim(), senha)
      await setAuth(data.user, data.accessToken)
      router.replace('/(tabs)')
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'E-mail ou senha incorretos'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={s.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
        <View style={s.logoArea}>
          <Text style={s.logo}>
            <Text style={s.logoWhite}>Obra</Text>
            <Text style={s.logoOrange}>Já</Text>
          </Text>
          <Text style={s.subtitle}>Portal do Vendedor</Text>
        </View>

        <View style={s.card}>
          <Text style={s.cardTitle}>Entrar na sua conta</Text>

          <View style={s.field}>
            <Text style={s.label}>E-mail</Text>
            <TextInput
              style={s.input}
              placeholder="vendas@loja.com.br"
              placeholderTextColor={Colors.grayMid}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={s.field}>
            <Text style={s.label}>Senha</Text>
            <View style={s.senhaRow}>
              <TextInput
                style={[s.input, s.senhaInput]}
                placeholder="••••••••"
                placeholderTextColor={Colors.grayMid}
                secureTextEntry={!showSenha}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity
                style={s.eyeBtn}
                onPress={() => setShowSenha(v => !v)}
                accessibilityLabel={showSenha ? 'Ocultar senha' : 'Mostrar senha'}
              >
                <Text style={s.eyeIcon}>{showSenha ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {error && <Text style={s.errorText}>{error}</Text>}

          <TouchableOpacity
            style={[s.btnPrimary, loading && s.btnDisabled]}
            onPress={handleLogin}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color={Colors.white} />
              : <Text style={s.btnPrimaryText}>Entrar</Text>}
          </TouchableOpacity>

          <TouchableOpacity
            style={s.btnOutline}
            onPress={() => router.push('/(auth)/register')}
            activeOpacity={0.85}
            disabled={loading}
          >
            <Text style={s.btnOutlineText}>Criar conta de vendedor</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.black },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 },
  logoArea: { alignItems: 'center', marginBottom: 36 },
  logo: { fontSize: 52, fontWeight: '900', letterSpacing: -1 },
  logoWhite: { color: Colors.white },
  logoOrange: { color: Colors.primary },
  subtitle: { fontSize: 16, color: Colors.grayMid, marginTop: 6, letterSpacing: 0.5 },
  card: {
    backgroundColor: Colors.white, borderRadius: 20, padding: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.18, shadowRadius: 12, elevation: 8,
  },
  cardTitle: { fontSize: 18, fontWeight: '700', color: Colors.black, marginBottom: 20, textAlign: 'center' },
  field: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: Colors.black, marginBottom: 6 },
  input: {
    height: 48, borderWidth: 1.5, borderColor: Colors.grayBorder, borderRadius: 10,
    paddingHorizontal: 14, fontSize: 15, color: Colors.black, backgroundColor: Colors.grayLight,
  },
  senhaRow: { flexDirection: 'row', alignItems: 'center' },
  senhaInput: { flex: 1 },
  eyeBtn: { position: 'absolute', right: 12, height: 48, justifyContent: 'center', paddingHorizontal: 4 },
  eyeIcon: { fontSize: 18 },
  errorText: { color: Colors.danger, fontSize: 13, textAlign: 'center', marginBottom: 8 },
  btnPrimary: {
    backgroundColor: Colors.primary, borderRadius: 12, height: 52,
    alignItems: 'center', justifyContent: 'center', marginTop: 8, marginBottom: 12,
  },
  btnDisabled: { opacity: 0.7 },
  btnPrimaryText: { color: Colors.white, fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
  btnOutline: {
    borderWidth: 2, borderColor: Colors.primary, borderRadius: 12,
    height: 52, alignItems: 'center', justifyContent: 'center',
  },
  btnOutlineText: { color: Colors.primary, fontSize: 15, fontWeight: '600' },
})

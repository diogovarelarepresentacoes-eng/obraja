import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/colors'
import { authService } from '@/services/auth'
import { useAuthStore } from '@/store/auth.store'
import type { SellerRole } from '@/types/seller'

type Step = 'role' | 'dados'

function formatCnpj(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 14)
  if (d.length <= 2) return d
  if (d.length <= 5) return `${d.slice(0,2)}.${d.slice(2)}`
  if (d.length <= 8) return `${d.slice(0,2)}.${d.slice(2,5)}.${d.slice(5)}`
  if (d.length <= 12) return `${d.slice(0,2)}.${d.slice(2,5)}.${d.slice(5,8)}/${d.slice(8)}`
  return `${d.slice(0,2)}.${d.slice(2,5)}.${d.slice(5,8)}/${d.slice(8,12)}-${d.slice(12)}`
}

export default function RegisterScreen() {
  const router = useRouter()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [step, setStep] = useState<Step>('role')
  const [role, setRole] = useState<SellerRole | null>(null)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleRegister() {
    setError(null)
    if (!nome.trim()) return setError('Informe o nome')
    if (!email.trim()) return setError('Informe o e-mail')
    if (!telefone.trim()) return setError('Informe o telefone')
    if (cnpj.replace(/\D/g, '').length < 14) return setError('CNPJ inválido')
    if (senha.length < 8) return setError('Senha deve ter mínimo 8 caracteres')
    if (senha !== confirmar) return setError('As senhas não coincidem')
    if (!role) return

    setLoading(true)
    try {
      const data = await authService.register({ name: nome, email, phone: telefone, password: senha, role, cnpj })
      await setAuth(data.user, data.accessToken)
      router.replace('/(tabs)')
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } } }
      setError(err?.response?.data?.message ?? 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  if (step === 'role') {
    return (
      <View style={s.container}>
        <View style={s.roleHeader}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <Text style={s.backText}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={s.roleTitle}>Qual é o seu perfil?</Text>
          <Text style={s.roleSubtitle}>Selecione como você vende na ObraJá</Text>
        </View>
        <View style={s.roleCards}>
          <TouchableOpacity
            style={[s.roleCard, role === 'store' && s.roleCardActive]}
            onPress={() => setRole('store')}
            activeOpacity={0.8}
          >
            <Text style={s.roleEmoji}>🏪</Text>
            <Text style={s.roleName}>Loja de Materiais</Text>
            <Text style={s.roleDesc}>Vendo para construtoras e consumidores finais</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.roleCard, role === 'industry' && s.roleCardActive]}
            onPress={() => setRole('industry')}
            activeOpacity={0.8}
          >
            <Text style={s.roleEmoji}>🏭</Text>
            <Text style={s.roleName}>Indústria / Fábrica</Text>
            <Text style={s.roleDesc}>Vendo diretamente para lojas e construtoras</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[s.btnPrimary, !role && s.btnDisabled]}
          onPress={() => role && setStep('dados')}
          disabled={!role}
          activeOpacity={0.85}
        >
          <Text style={s.btnPrimaryText}>Continuar →</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView style={s.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
        <View style={s.formHeader}>
          <TouchableOpacity onPress={() => setStep('role')}>
            <Text style={s.backText}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={s.formTitle}>
            {role === 'store' ? '🏪 Loja de Materiais' : '🏭 Indústria / Fábrica'}
          </Text>
        </View>

        <View style={s.card}>
          {([
            { label: 'Nome fantasia', value: nome, setter: setNome, placeholder: 'Nome da empresa' },
            { label: 'E-mail', value: email, setter: setEmail, placeholder: 'contato@empresa.com', type: 'email-address' as const },
            { label: 'Telefone', value: telefone, setter: setTelefone, placeholder: '(00) 00000-0000', type: 'phone-pad' as const },
          ] as const).map(field => (
            <View key={field.label} style={s.field}>
              <Text style={s.label}>{field.label}</Text>
              <TextInput
                style={s.input}
                placeholder={field.placeholder}
                placeholderTextColor={Colors.grayMid}
                keyboardType={field.type ?? 'default'}
                autoCapitalize="none"
                autoCorrect={false}
                value={field.value}
                onChangeText={(t) => field.setter(t)}
              />
            </View>
          ))}

          <View style={s.field}>
            <Text style={s.label}>CNPJ</Text>
            <TextInput
              style={s.input}
              placeholder="00.000.000/0000-00"
              placeholderTextColor={Colors.grayMid}
              keyboardType="numeric"
              value={cnpj}
              onChangeText={(t) => setCnpj(formatCnpj(t))}
            />
          </View>

          <View style={s.field}>
            <Text style={s.label}>Senha</Text>
            <TextInput style={s.input} placeholder="Mínimo 8 caracteres" placeholderTextColor={Colors.grayMid}
              secureTextEntry value={senha} onChangeText={setSenha} />
          </View>

          <View style={s.field}>
            <Text style={s.label}>Confirmar senha</Text>
            <TextInput style={s.input} placeholder="Repita a senha" placeholderTextColor={Colors.grayMid}
              secureTextEntry value={confirmar} onChangeText={setConfirmar} />
          </View>

          {error && <Text style={s.errorText}>{error}</Text>}

          <TouchableOpacity
            style={[s.btnPrimary, loading && s.btnDisabled]}
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color={Colors.white} />
              : <Text style={s.btnPrimaryText}>Criar minha conta 🚀</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.black },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingVertical: 48 },
  roleHeader: { paddingTop: Platform.OS === 'ios' ? 56 : 40, paddingHorizontal: 24, paddingBottom: 32 },
  backBtn: { marginBottom: 24 },
  backText: { color: Colors.grayMid, fontSize: 15, fontWeight: '500' },
  roleTitle: { fontSize: 26, fontWeight: '900', color: Colors.white, marginBottom: 8 },
  roleSubtitle: { fontSize: 15, color: Colors.grayMid },
  roleCards: { flexDirection: 'column', gap: 14, paddingHorizontal: 24, marginBottom: 32 },
  roleCard: {
    backgroundColor: '#2A2A2A', borderRadius: 16, padding: 20,
    borderWidth: 2, borderColor: '#2A2A2A',
  },
  roleCardActive: { borderColor: Colors.primary, backgroundColor: '#1A1A1A' },
  roleEmoji: { fontSize: 32, marginBottom: 10 },
  roleName: { fontSize: 17, fontWeight: '800', color: Colors.white, marginBottom: 4 },
  roleDesc: { fontSize: 13, color: Colors.grayMid },
  formHeader: { marginBottom: 24 },
  formTitle: { fontSize: 22, fontWeight: '800', color: Colors.white, marginTop: 8 },
  card: { backgroundColor: Colors.white, borderRadius: 20, padding: 24 },
  field: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', color: Colors.black, marginBottom: 6 },
  input: {
    height: 48, borderWidth: 1.5, borderColor: Colors.grayBorder, borderRadius: 10,
    paddingHorizontal: 14, fontSize: 15, color: Colors.black, backgroundColor: Colors.grayLight,
  },
  errorText: { color: Colors.danger, fontSize: 13, textAlign: 'center', marginBottom: 8 },
  btnPrimary: {
    backgroundColor: Colors.primary, borderRadius: 12, height: 52,
    alignItems: 'center', justifyContent: 'center', marginTop: 8,
  },
  btnDisabled: { opacity: 0.5 },
  btnPrimaryText: { color: Colors.white, fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
})

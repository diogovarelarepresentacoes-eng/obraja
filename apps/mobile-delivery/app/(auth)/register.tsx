import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/colors'
import { authService } from '@/services/auth'
import { useAuthStore } from '@/store/auth.store'

type Veiculo = 'bicycle' | 'motorcycle' | 'car' | 'van' | 'truck'

const VEICULOS: { label: string; emoji: string; value: Veiculo }[] = [
  { label: 'Bicicleta', emoji: '🚲', value: 'bicycle' },
  { label: 'Moto', emoji: '🏍️', value: 'motorcycle' },
  { label: 'Carro', emoji: '🚗', value: 'car' },
  { label: 'Van', emoji: '🚐', value: 'van' },
  { label: 'Caminhão', emoji: '🚚', value: 'truck' },
]

export default function RegisterScreen() {
  const router = useRouter()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [veiculo, setVeiculo] = useState<Veiculo | null>(null)
  const [placa, setPlaca] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function formatCpf(text: string) {
    const digits = text.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
  }

  function formatTelefone(text: string) {
    const digits = text.replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 2) return digits
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }

  async function handleRegister() {
    setError(null)
    const cpfDigits = cpf.replace(/\D/g, '')
    const phoneDigits = telefone.replace(/\D/g, '')

    if (!nome.trim()) return setError('Informe seu nome')
    if (cpfDigits.length !== 11) return setError('CPF inválido')
    if (!email.trim()) return setError('Informe seu e-mail')
    if (phoneDigits.length < 10) return setError('Telefone inválido')
    if (!veiculo) return setError('Selecione o tipo de veículo')
    if (senha.length < 8) return setError('Senha deve ter mínimo 8 caracteres')
    if (senha !== confirmarSenha) return setError('As senhas não coincidem')

    setLoading(true)
    try {
      const data = await authService.register({
        name: nome.trim(),
        email: email.trim(),
        phone: phoneDigits,
        password: senha,
        role: 'delivery_own',
        cpf: cpfDigits,
        vehicleType: veiculo,
        vehiclePlate: placa.trim() || undefined,
      })
      await setAuth(data.user, data.accessToken)
      router.replace('/(tabs)')
    } catch (e: any) {
      setError(e?.response?.data?.message ?? 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastro de Entregador</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados Pessoais</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu nome completo"
              placeholderTextColor={Colors.grayMid}
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>CPF</Text>
            <TextInput
              style={styles.input}
              placeholder="000.000.000-00"
              placeholderTextColor={Colors.grayMid}
              keyboardType="numeric"
              maxLength={14}
              value={cpf}
              onChangeText={t => setCpf(formatCpf(t))}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              placeholderTextColor={Colors.grayMid}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              placeholder="(00) 00000-0000"
              placeholderTextColor={Colors.grayMid}
              keyboardType="numeric"
              maxLength={15}
              value={telefone}
              onChangeText={t => setTelefone(formatTelefone(t))}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados do Veículo</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Tipo de veículo</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipRow}
            >
              {VEICULOS.map(v => (
                <TouchableOpacity
                  key={v.value}
                  style={[styles.chip, veiculo === v.value && styles.chipActive]}
                  onPress={() => setVeiculo(v.value)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.chipEmoji}>{v.emoji}</Text>
                  <Text style={[styles.chipLabel, veiculo === v.value && styles.chipLabelActive]}>
                    {v.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Placa do veículo</Text>
            <TextInput
              style={styles.input}
              placeholder="ABC-1234"
              placeholderTextColor={Colors.grayMid}
              autoCapitalize="characters"
              maxLength={8}
              value={placa}
              onChangeText={t => setPlaca(t.toUpperCase())}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Segurança</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.senhaRow}>
              <TextInput
                style={[styles.input, styles.senhaInput]}
                placeholder="Mínimo 8 caracteres"
                placeholderTextColor={Colors.grayMid}
                secureTextEntry={!mostrarSenha}
                value={senha}
                onChangeText={setSenha}
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setMostrarSenha(v => !v)}
                accessibilityLabel={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
              >
                <Text style={styles.eyeIcon}>{mostrarSenha ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Confirmar senha</Text>
            <View style={styles.senhaRow}>
              <TextInput
                style={[styles.input, styles.senhaInput]}
                placeholder="Repita a senha"
                placeholderTextColor={Colors.grayMid}
                secureTextEntry={!mostrarConfirmar}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setMostrarConfirmar(v => !v)}
                accessibilityLabel={mostrarConfirmar ? 'Ocultar senha' : 'Mostrar senha'}
              >
                <Text style={styles.eyeIcon}>{mostrarConfirmar ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={[styles.btnCadastrar, loading && styles.btnDisabled]}
          onPress={handleRegister}
          activeOpacity={0.85}
          disabled={loading}
        >
          <Text style={styles.btnCadastrarText}>
            {loading ? 'Criando conta...' : 'Cadastrar'}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grayLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.black,
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '700',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: 16,
  },
  section: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBorder,
    paddingBottom: 10,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1.5,
    borderColor: Colors.grayBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: Colors.black,
    backgroundColor: Colors.grayLight,
  },
  chipRow: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.grayBorder,
    backgroundColor: Colors.grayLight,
  },
  chipActive: {
    borderColor: Colors.primary,
    backgroundColor: '#FFF3EF',
  },
  chipEmoji: {
    fontSize: 16,
  },
  chipLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.grayMid,
  },
  chipLabelActive: {
    color: Colors.primary,
  },
  senhaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  senhaInput: {
    flex: 1,
  },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  eyeIcon: {
    fontSize: 18,
  },
  errorText: {
    color: Colors.danger,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 12,
  },
  btnCadastrar: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  btnDisabled: {
    opacity: 0.7,
  },
  btnCadastrarText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
})

import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Colors } from '../../constants/colors'

type RoleKey = 'consumer' | 'builder' | 'store' | 'industry'

interface Role {
  key: RoleKey
  label: string
}

const ROLES: Role[] = [
  { key: 'consumer', label: 'Consumidor' },
  { key: 'builder', label: 'Construtora' },
  { key: 'store', label: 'Loja' },
  { key: 'industry', label: 'Indústria' },
]

export default function RegisterScreen() {
  const router = useRouter()
  const [role, setRole] = useState<RoleKey>('consumer')
  const [name, setName] = useState('')
  const [document, setDocument] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const isConsumer = role === 'consumer'
  const documentLabel = isConsumer ? 'CPF' : 'CNPJ'
  const documentPlaceholder = isConsumer ? 'XXX.XXX.XXX-XX' : 'XX.XXX.XXX/0001-XX'
  const nameLabel = isConsumer ? 'Nome completo' : 'Razão social'

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerLogo}>
          <Text style={styles.headerLogoWhite}>Obra</Text>
          <Text style={styles.headerLogoOrange}>Já</Text>
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.body}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Criar conta</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.roleTabs}
          >
            {ROLES.map((r) => {
              const isActive = role === r.key
              return (
                <TouchableOpacity
                  key={r.key}
                  style={[styles.roleTab, isActive && styles.roleTabActive]}
                  onPress={() => setRole(r.key)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.roleTabText, isActive && styles.roleTabTextActive]}>
                    {r.label}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </ScrollView>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>{nameLabel}</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder={isConsumer ? 'João da Silva' : 'Empresa Ltda.'}
              placeholderTextColor={Colors.grayMid}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>{documentLabel}</Text>
            <TextInput
              style={styles.input}
              value={document}
              onChangeText={setDocument}
              placeholder={documentPlaceholder}
              placeholderTextColor={Colors.grayMid}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="seu@email.com"
              placeholderTextColor={Colors.grayMid}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="(XX) 9XXXX-XXXX"
              placeholderTextColor={Colors.grayMid}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Mínimo 8 caracteres"
              placeholderTextColor={Colors.grayMid}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Confirmar senha</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Repita a senha"
              placeholderTextColor={Colors.grayMid}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => router.push('/(tabs)')}
            activeOpacity={0.85}
          >
            <Text style={styles.submitButtonText}>Cadastrar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flex: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.black,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '700',
  },
  headerLogo: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '900',
  },
  headerLogoWhite: {
    color: Colors.white,
  },
  headerLogoOrange: {
    color: Colors.primary,
  },
  headerSpacer: {
    width: 36,
  },
  body: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.black,
    marginBottom: 20,
  },
  roleTabs: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 28,
    paddingRight: 8,
  },
  roleTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.grayLight,
  },
  roleTabActive: {
    backgroundColor: Colors.primary,
  },
  roleTabText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.black,
  },
  roleTabTextActive: {
    color: Colors.white,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    height: 48,
    borderWidth: 1.5,
    borderColor: Colors.grayBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: Colors.black,
    backgroundColor: Colors.white,
  },
  submitButton: {
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
})

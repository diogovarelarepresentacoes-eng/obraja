'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

const TIPOS_VEICULO = [
  { value: 'moto', label: 'Motocicleta', desc: 'Entregas ágeis em área urbana' },
  { value: 'carro', label: 'Carro', desc: 'Cargas pequenas e médias' },
  { value: 'van', label: 'Van / Utilitário', desc: 'Cargas médias e paletes' },
  { value: 'caminhao_leve', label: 'Caminhão leve', desc: 'Cargas pesadas até 3,5t' },
]

function validateCpf(cpf: string): boolean {
  const d = cpf.replace(/\D/g, '')
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false
  const calc = (s: string, n: number) => {
    const sum = s.split('').reduce((acc, c, i) => acc + parseInt(c) * (n - i), 0)
    const rem = (sum * 10) % 11
    return rem >= 10 ? 0 : rem
  }
  return calc(d.slice(0, 9), 10) === parseInt(d[9]) && calc(d.slice(0, 10), 11) === parseInt(d[10])
}

function formatCpf(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 3) return d
  if (d.length <= 6) return `${d.slice(0,3)}.${d.slice(3)}`
  if (d.length <= 9) return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6)}`
  return `${d.slice(0,3)}.${d.slice(3,6)}.${d.slice(6,9)}-${d.slice(9)}`
}

function formatPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 7) return `(${d.slice(0,2)}) ${d.slice(2)}`
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`
}

function formatCep(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 8)
  return d.length > 5 ? `${d.slice(0,5)}-${d.slice(5)}` : d
}

function formatPlate(v: string) {
  return v.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7)
}

function validateFile(file: File): string | null {
  const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
  if (!allowed.includes(file.type)) return 'Formato inválido. Use PDF, JPG ou PNG.'
  if (file.size > 10 * 1024 * 1024) return 'Arquivo muito grande. Máximo 10 MB.'
  return null
}

interface DocFile { file: File | null; error?: string }

export default function CadastroEntregadorPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    cpf: '', nome: '', email: '', telefone: '', dataNascimento: '',
    cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '',
    tipoVeiculo: '', placa: '', marca: '', modelo: '', ano: '', cor: '',
    senha: '', confirmarSenha: '', aceitouTermos: false,
  })
  const [docs, setDocs] = useState<Record<string, DocFile>>({
    crlv: { file: null },
    cnhFrente: { file: null },
    cnhVerso: { file: null },
    selfieDocumento: { file: null },
    comprovanteResidencia: { file: null },
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const docRefs = {
    crlv: useRef<HTMLInputElement>(null),
    cnhFrente: useRef<HTMLInputElement>(null),
    cnhVerso: useRef<HTMLInputElement>(null),
    selfieDocumento: useRef<HTMLInputElement>(null),
    comprovanteResidencia: useRef<HTMLInputElement>(null),
  }

  function setDoc(key: string, file: File | null) {
    if (file) {
      const err = validateFile(file)
      if (err) { setError(err); return }
    }
    setDocs(d => ({ ...d, [key]: { file } }))
    setError(null)
  }

  async function fetchCep(cep: string) {
    const digits = cep.replace(/\D/g, '')
    if (digits.length !== 8) return
    try {
      const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`)
      const data = await res.json()
      if (!data.erro) {
        setForm(f => ({
          ...f,
          logradouro: data.logradouro || f.logradouro,
          bairro: data.bairro || f.bairro,
          cidade: data.localidade || f.cidade,
          estado: data.uf || f.estado,
        }))
      }
    } catch {}
  }

  function validate(s: number): string | null {
    if (s === 1) {
      if (!validateCpf(form.cpf)) return 'CPF inválido. Verifique os dígitos.'
      if (form.nome.trim().split(' ').length < 2) return 'Informe o nome completo'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'E-mail inválido'
      if (!form.telefone || form.telefone.replace(/\D/g,'').length < 10) return 'Telefone inválido'
      if (!form.dataNascimento) return 'Informe a data de nascimento'
      const birth = new Date(form.dataNascimento)
      const age = (Date.now() - birth.getTime()) / (365.25 * 24 * 3600 * 1000)
      if (age < 18) return 'Você precisa ter no mínimo 18 anos'
      return null
    }
    if (s === 2) {
      if (!form.cep || form.cep.replace(/\D/g,'').length < 8) return 'CEP inválido'
      if (!form.logradouro.trim()) return 'Informe o logradouro'
      if (!form.numero.trim()) return 'Informe o número'
      if (!form.cidade.trim()) return 'Informe a cidade'
      if (!form.estado) return 'Selecione o estado'
      return null
    }
    if (s === 3) {
      if (!form.tipoVeiculo) return 'Selecione o tipo de veículo'
      if (!form.placa || form.placa.length < 7) return 'Placa inválida (ex: ABC1234 ou ABC1D23)'
      if (!form.marca.trim()) return 'Informe a marca do veículo'
      if (!form.modelo.trim()) return 'Informe o modelo do veículo'
      if (!form.ano || parseInt(form.ano) < 2000 || parseInt(form.ano) > new Date().getFullYear() + 1) return 'Ano inválido'
      return null
    }
    if (s === 4) {
      const required: [string, string][] = [
        ['crlv', 'Documento do veículo (CRLV)'],
        ['cnhFrente', 'CNH — frente'],
        ['cnhVerso', 'CNH — verso'],
        ['selfieDocumento', 'Selfie segurando o documento'],
        ['comprovanteResidencia', 'Comprovante de residência'],
      ]
      for (const [key, label] of required) {
        if (!docs[key].file) return `Faça upload do: ${label}`
      }
      return null
    }
    if (form.senha.length < 8) return 'Senha deve ter mínimo 8 caracteres'
    if (form.senha !== form.confirmarSenha) return 'As senhas não coincidem'
    if (!form.aceitouTermos) return 'Aceite os Termos de Uso para continuar'
    return null
  }

  function handleNext() {
    setError(null)
    const err = validate(step)
    if (err) return setError(err)
    setStep(s => s + 1)
  }

  async function handleSubmit() {
    setError(null)
    const err = validate(5)
    if (err) return setError(err)
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('cpf', form.cpf.replace(/\D/g, ''))
      fd.append('name', form.nome)
      fd.append('email', form.email)
      fd.append('phone', form.telefone)
      fd.append('dataNascimento', form.dataNascimento)
      fd.append('password', form.senha)
      fd.append('role', 'delivery_third')
      fd.append('cep', form.cep.replace(/\D/g, ''))
      fd.append('logradouro', form.logradouro)
      fd.append('numero', form.numero)
      fd.append('complemento', form.complemento)
      fd.append('bairro', form.bairro)
      fd.append('cidade', form.cidade)
      fd.append('estado', form.estado)
      fd.append('tipoVeiculo', form.tipoVeiculo)
      fd.append('placa', form.placa)
      fd.append('marca', form.marca)
      fd.append('modelo', form.modelo)
      fd.append('ano', form.ano)
      fd.append('cor', form.cor)
      Object.entries(docs).forEach(([key, doc]) => {
        if (doc.file) fd.append(key, doc.file)
      })

      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'
      const res = await fetch(`${apiUrl}/api/v1/auth/register-pending`, {
        method: 'POST',
        body: fd,
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        if (res.status === 409) throw new Error('Este e-mail ou CPF já está cadastrado.')
        throw new Error(body?.message ?? 'Erro ao enviar cadastro. Tente novamente.')
      }
      setSubmitted(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Erro ao enviar cadastro.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex flex-col">
        <header className="bg-[#1A1A1A] px-6 py-4">
          <Link href="/" className="text-2xl font-black tracking-tight">
            <span className="text-white">Obra</span><span className="text-[#F05A28]">Já</span>
          </Link>
        </header>
        <main className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="max-w-lg w-full text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
              <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-[#1A1A1A] mb-3">Cadastro enviado!</h1>
            <p className="text-[#9E9E9E] text-lg mb-6">
              Recebemos seus documentos. Nossa equipe irá analisar e você receberá um e-mail em até <strong className="text-[#1A1A1A]">3 dias úteis</strong>.
            </p>
            <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5 text-left mb-6 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-[#1A1A1A] text-sm">Confirme seu e-mail</div>
                  <div className="text-xs text-[#9E9E9E]">Link de confirmação enviado para <strong>{form.email}</strong></div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-[#1A1A1A] text-sm">Documentos em análise</div>
                  <div className="text-xs text-[#9E9E9E]">CNH, CRLV e documentos pessoais em verificação</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-[#1A1A1A] text-sm">Baixe o app do entregador</div>
                  <div className="text-xs text-[#9E9E9E]">Após aprovação, você acessa as entregas pelo app ObraJá Entregador</div>
                </div>
              </div>
            </div>
            <Link href="/" className="text-[#F05A28] font-bold hover:underline text-sm">← Voltar ao início</Link>
          </div>
        </main>
      </div>
    )
  }

  const stepLabels = ['Dados pessoais', 'Endereço', 'Veículo', 'Documentos', 'Senha']
  const accentGreen = 'text-green-600'
  const bgGreen = 'bg-green-500'
  const bgGreenHover = 'hover:bg-green-600'
  const borderGreen = 'border-green-500'

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col">
      <header className="bg-[#1A1A1A] px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tight">
          <span className="text-white">Obra</span><span className="text-[#F05A28]">Já</span>
        </Link>
        <Link href="/cadastro" className="text-[#9E9E9E] text-sm hover:text-white transition-colors">← Voltar</Link>
      </header>

      <main className="flex-1 px-6 py-12 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shrink-0">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 3v5h-7V8z" />
              <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-bold text-green-600 uppercase tracking-wider">Cadastro</div>
            <div className="text-xl font-black text-[#1A1A1A]">Entregador</div>
          </div>
        </div>

        <div className="flex gap-1.5 mb-2">
          {[1,2,3,4,5].map(s => (
            <div key={s} className={`flex-1 h-1.5 rounded-full transition-all ${s <= step ? 'bg-green-500' : 'bg-[#E5E5E5]'}`} />
          ))}
        </div>
        <div className="flex justify-between text-xs text-[#9E9E9E] mb-8">
          {stepLabels.map((l, i) => (
            <span key={l} className={step >= i + 1 ? 'text-green-600 font-semibold' : ''}>{l}</span>
          ))}
        </div>

        {/* Step 1: Dados pessoais */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-[#1A1A1A]">Seus dados pessoais</h2>
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-xs text-green-800">
              <div className="flex items-center gap-2">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="shrink-0">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <span>Seus dados são verificados e protegidos. Utilizamos criptografia para garantir sua privacidade.</span>
              </div>
            </div>
            <Field label="CPF" required color="green">
              <input className={INPUT_GREEN} placeholder="000.000.000-00" value={form.cpf}
                onChange={e => setForm(f => ({ ...f, cpf: formatCpf(e.target.value) }))} />
            </Field>
            <Field label="Nome completo" required color="green">
              <input className={INPUT_GREEN} placeholder="Seu nome completo" value={form.nome}
                onChange={e => setForm(f => ({ ...f, nome: e.target.value }))} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="E-mail" required color="green">
                <input className={INPUT_GREEN} type="email" placeholder="seu@email.com" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </Field>
              <Field label="Telefone / WhatsApp" required color="green">
                <input className={INPUT_GREEN} placeholder="(00) 00000-0000" value={form.telefone}
                  onChange={e => setForm(f => ({ ...f, telefone: formatPhone(e.target.value) }))} />
              </Field>
            </div>
            <Field label="Data de nascimento" required color="green">
              <input className={INPUT_GREEN} type="date" value={form.dataNascimento}
                max={new Date(Date.now() - 18 * 365.25 * 24 * 3600 * 1000).toISOString().split('T')[0]}
                onChange={e => setForm(f => ({ ...f, dataNascimento: e.target.value }))} />
            </Field>
          </div>
        )}

        {/* Step 2: Endereço */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-[#1A1A1A]">Seu endereço</h2>
            <Field label="CEP" required color="green">
              <input className={INPUT_GREEN} placeholder="00000-000" value={form.cep}
                onChange={e => {
                  const v = formatCep(e.target.value)
                  setForm(f => ({ ...f, cep: v }))
                  fetchCep(v)
                }} />
            </Field>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <Field label="Logradouro" required color="green">
                  <input className={INPUT_GREEN} placeholder="Rua, Av, Praça..." value={form.logradouro}
                    onChange={e => setForm(f => ({ ...f, logradouro: e.target.value }))} />
                </Field>
              </div>
              <Field label="Número" required color="green">
                <input className={INPUT_GREEN} placeholder="Nº" value={form.numero}
                  onChange={e => setForm(f => ({ ...f, numero: e.target.value }))} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Complemento">
                <input className={INPUT_GREEN} placeholder="Apto, Bloco..." value={form.complemento}
                  onChange={e => setForm(f => ({ ...f, complemento: e.target.value }))} />
              </Field>
              <Field label="Bairro">
                <input className={INPUT_GREEN} placeholder="Bairro" value={form.bairro}
                  onChange={e => setForm(f => ({ ...f, bairro: e.target.value }))} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Cidade" required color="green">
                <input className={INPUT_GREEN} placeholder="Cidade" value={form.cidade}
                  onChange={e => setForm(f => ({ ...f, cidade: e.target.value }))} />
              </Field>
              <Field label="Estado" required color="green">
                <select className={INPUT_GREEN} value={form.estado}
                  onChange={e => setForm(f => ({ ...f, estado: e.target.value }))}>
                  <option value="">UF</option>
                  {ESTADOS.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                </select>
              </Field>
            </div>
          </div>
        )}

        {/* Step 3: Veículo */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-[#1A1A1A]">Dados do veículo</h2>
            <Field label="Tipo de veículo" required color="green">
              <div className="grid grid-cols-2 gap-2 mt-1">
                {TIPOS_VEICULO.map(t => (
                  <button key={t.value} type="button" onClick={() => setForm(f => ({ ...f, tipoVeiculo: t.value }))}
                    className={`flex flex-col items-start gap-0.5 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                      form.tipoVeiculo === t.value
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-[#E5E5E5] bg-white text-[#666] hover:border-green-300'
                    }`}>
                    <span className="font-bold">{t.label}</span>
                    <span className="text-xs opacity-70">{t.desc}</span>
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Placa do veículo" required color="green">
              <input className={INPUT_GREEN} placeholder="ABC1234 ou ABC1D23" value={form.placa}
                onChange={e => setForm(f => ({ ...f, placa: formatPlate(e.target.value) }))}
                maxLength={7} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Marca" required color="green">
                <input className={INPUT_GREEN} placeholder="Honda, Toyota..." value={form.marca}
                  onChange={e => setForm(f => ({ ...f, marca: e.target.value }))} />
              </Field>
              <Field label="Modelo" required color="green">
                <input className={INPUT_GREEN} placeholder="Pop 110, Strada..." value={form.modelo}
                  onChange={e => setForm(f => ({ ...f, modelo: e.target.value }))} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Ano de fabricação" required color="green">
                <input className={INPUT_GREEN} type="number" placeholder="2020"
                  min="2000" max={new Date().getFullYear() + 1}
                  value={form.ano} onChange={e => setForm(f => ({ ...f, ano: e.target.value }))} />
              </Field>
              <Field label="Cor">
                <input className={INPUT_GREEN} placeholder="Preto, Branco..." value={form.cor}
                  onChange={e => setForm(f => ({ ...f, cor: e.target.value }))} />
              </Field>
            </div>
          </div>
        )}

        {/* Step 4: Documentos */}
        {step === 4 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-[#1A1A1A]">Envio de documentos</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-xs text-yellow-800 space-y-1">
              <div className="flex items-center gap-2 font-bold">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="shrink-0">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span>Todos os documentos abaixo são obrigatórios</span>
              </div>
              <div>Os documentos são analisados pela nossa equipe para garantir a segurança de todos. Aceito: PDF, JPG, PNG (máx. 10 MB cada).</div>
            </div>

            <DocUpload
              docKey="crlv"
              label="Documento do veículo (CRLV)"
              hint="CRLV atualizado no nome do proprietário"
              docs={docs}
              setDoc={setDoc}
              inputRef={docRefs.crlv}
            />
            <DocUpload
              docKey="cnhFrente"
              label="CNH — Frente"
              hint="Carteira Nacional de Habilitação vigente, frente"
              docs={docs}
              setDoc={setDoc}
              inputRef={docRefs.cnhFrente}
            />
            <DocUpload
              docKey="cnhVerso"
              label="CNH — Verso"
              hint="Verso da CNH"
              docs={docs}
              setDoc={setDoc}
              inputRef={docRefs.cnhVerso}
            />
            <DocUpload
              docKey="selfieDocumento"
              label="Selfie segurando o documento"
              hint="Foto sua segurando a CNH aberta ao lado do rosto. Foto deve estar nítida."
              docs={docs}
              setDoc={setDoc}
              inputRef={docRefs.selfieDocumento}
            />
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-xs text-green-800">
              <div className="flex items-start gap-2">
                <svg className="shrink-0 mt-0.5" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" />
                </svg>
                <span><strong>Dica para a selfie:</strong> Segure a CNH aberta próxima ao rosto, em local bem iluminado. Não use filtros ou óculos escuros.</span>
              </div>
            </div>
            <DocUpload
              docKey="comprovanteResidencia"
              label="Comprovante de residência"
              hint="Conta de luz, água, gás ou banco — emitido nos últimos 90 dias"
              docs={docs}
              setDoc={setDoc}
              inputRef={docRefs.comprovanteResidencia}
            />
          </div>
        )}

        {/* Step 5: Senha e termos */}
        {step === 5 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-[#1A1A1A]">Criar senha e finalizar</h2>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-[#1A1A1A] text-sm">Cadastro sujeito à aprovação</div>
                  <div className="text-xs text-[#666]">Nossa equipe analisa seus documentos em até 3 dias úteis</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-[#1A1A1A] text-sm">Acesso pelo app</div>
                  <div className="text-xs text-[#666]">Após aprovação, baixe o app ObraJá Entregador para receber pedidos</div>
                </div>
              </div>
            </div>
            <Field label="Senha de acesso" required color="green">
              <input className={INPUT_GREEN} type="password" placeholder="Mínimo 8 caracteres" value={form.senha}
                onChange={e => setForm(f => ({ ...f, senha: e.target.value }))} />
            </Field>
            <Field label="Confirmar senha" required color="green">
              <input className={INPUT_GREEN} type="password" placeholder="Repita a senha" value={form.confirmarSenha}
                onChange={e => setForm(f => ({ ...f, confirmarSenha: e.target.value }))} />
            </Field>
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" className="mt-0.5 accent-green-500 w-4 h-4 shrink-0" checked={form.aceitouTermos}
                onChange={e => setForm(f => ({ ...f, aceitouTermos: e.target.checked }))} />
              <span className="text-sm text-[#666] leading-relaxed">
                Li e aceito os{' '}
                <a href="#" className="text-green-600 hover:underline font-semibold">Termos de Uso</a>,{' '}
                <a href="#" className="text-green-600 hover:underline font-semibold">Política de Privacidade</a>{' '}
                e as{' '}
                <a href="#" className="text-green-600 hover:underline font-semibold">Regras para Entregadores</a>.
              </span>
            </label>
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm font-medium">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between mt-8">
          {step > 1
            ? <button onClick={() => { setError(null); setStep(s => s - 1) }} className="text-sm text-[#9E9E9E] hover:text-[#1A1A1A] font-medium transition-colors">← Voltar</button>
            : <div />}
          {step < 5
            ? <button onClick={handleNext} className="bg-green-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-green-600 transition-all active:scale-95">Continuar →</button>
            : <button disabled={loading} onClick={handleSubmit}
                className="bg-green-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-green-600 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? 'Enviando cadastro…' : 'Enviar para análise'}
              </button>
          }
        </div>
      </main>
    </div>
  )
}

function DocUpload({ docKey, label, hint, docs, setDoc, inputRef }: {
  docKey: string
  label: string
  hint?: string
  docs: Record<string, DocFile>
  setDoc: (key: string, file: File | null) => void
  inputRef: React.RefObject<HTMLInputElement | null>
}) {
  const doc = docs[docKey]
  return (
    <div>
      <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">
        {label} <span className="text-green-600">*</span>
      </label>
      {hint && <p className="text-xs text-[#9E9E9E] mb-2">{hint}</p>}
      {doc.file ? (
        <div className="flex items-center justify-between bg-green-50 rounded-xl px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-green-100 text-green-600 flex items-center justify-center shrink-0">
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <span className="text-sm font-medium text-green-700 truncate max-w-[260px]">{doc.file.name}</span>
          </div>
          <button type="button" onClick={() => setDoc(docKey, null)} className="text-xs text-red-400 hover:text-red-600 font-bold ml-2">✕ Remover</button>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()}
          className="w-full border-2 border-dashed border-[#E5E5E5] hover:border-green-400 rounded-xl py-5 px-4 text-center transition-all">
          <div className="flex justify-center mb-1 text-[#9E9E9E]">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div className="text-sm font-semibold text-[#9E9E9E]">Clique para selecionar</div>
          <div className="text-xs text-[#9E9E9E] mt-0.5">PDF, JPG ou PNG — máx. 10 MB</div>
        </button>
      )}
      <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" className="hidden"
        onChange={e => { setDoc(docKey, e.target.files?.[0] ?? null); if (inputRef.current) inputRef.current.value = '' }} />
    </div>
  )
}

function Field({ label, required, color, children }: { label: string; required?: boolean; color?: string; children: React.ReactNode }) {
  const reqColor = color === 'green' ? 'text-green-600' : 'text-[#F05A28]'
  return (
    <div>
      <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
        {label} {required && <span className={reqColor}>*</span>}
      </label>
      {children}
    </div>
  )
}

const INPUT_GREEN = 'w-full h-11 px-4 border-2 border-[#E5E5E5] rounded-xl text-sm text-[#1A1A1A] bg-white focus:border-green-400 focus:outline-none transition-colors'
const ESTADOS = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

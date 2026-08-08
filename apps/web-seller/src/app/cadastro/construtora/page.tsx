'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

const TIPOS_OBRA = [
  'Residencial', 'Comercial', 'Industrial', 'Infraestrutura',
  'Reforma', 'Incorporação', 'Loteamento', 'Outros',
]

function validateCnpj(cnpj: string): boolean {
  const d = cnpj.replace(/\D/g, '')
  if (d.length !== 14 || /^(\d)\1{13}$/.test(d)) return false
  const calc = (s: string, w: number[]) => {
    const sum = s.split('').reduce((a, n, i) => a + parseInt(n) * w[i], 0)
    const r = sum % 11
    return r < 2 ? 0 : 11 - r
  }
  const d1 = calc(d.slice(0, 12), [5,4,3,2,9,8,7,6,5,4,3,2])
  const d2 = calc(d.slice(0, 13), [6,5,4,3,2,9,8,7,6,5,4,3,2])
  return parseInt(d[12]) === d1 && parseInt(d[13]) === d2
}

function formatCnpj(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 14)
  if (d.length <= 2) return d
  if (d.length <= 5) return `${d.slice(0,2)}.${d.slice(2)}`
  if (d.length <= 8) return `${d.slice(0,2)}.${d.slice(2,5)}.${d.slice(5)}`
  if (d.length <= 12) return `${d.slice(0,2)}.${d.slice(2,5)}.${d.slice(5,8)}/${d.slice(8)}`
  return `${d.slice(0,2)}.${d.slice(2,5)}.${d.slice(5,8)}/${d.slice(8,12)}-${d.slice(12)}`
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

function validateFile(file: File): string | null {
  const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
  if (!allowed.includes(file.type)) return 'Formato inválido. Use PDF, JPG ou PNG.'
  if (file.size > 10 * 1024 * 1024) return 'Arquivo muito grande. Máximo 10 MB.'
  return null
}

export default function CadastroConstutoraPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    cnpj: '', razaoSocial: '', nomeFantasia: '', email: '', telefone: '',
    cep: '', cidade: '', estado: '', bairro: '', endereco: '',
    tiposObra: [] as string[], volumeMensal: '',
    senha: '', confirmarSenha: '',
  })
  const [contratoSocial, setContratoSocial] = useState<File | null>(null)
  const [aditivos, setAditivos] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const contratoRef = useRef<HTMLInputElement>(null)
  const aditivosRef = useRef<HTMLInputElement>(null)

  function toggleTipo(t: string) {
    setForm(f => ({
      ...f,
      tiposObra: f.tiposObra.includes(t) ? f.tiposObra.filter(x => x !== t) : [...f.tiposObra, t],
    }))
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
          endereco: data.logradouro || f.endereco,
          bairro: data.bairro || f.bairro,
          cidade: data.localidade || f.cidade,
          estado: data.uf || f.estado,
        }))
      }
    } catch {}
  }

  function validate(s: number): string | null {
    if (s === 1) {
      if (!validateCnpj(form.cnpj)) return 'CNPJ inválido. Verifique os dígitos.'
      if (!form.nomeFantasia.trim()) return 'Informe o nome da construtora'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'E-mail inválido'
      if (!form.telefone || form.telefone.replace(/\D/g,'').length < 10) return 'Telefone inválido'
      return null
    }
    if (s === 2) {
      if (!form.cep || form.cep.replace(/\D/g,'').length < 8) return 'CEP inválido'
      if (!form.cidade.trim()) return 'Informe a cidade'
      if (!form.estado) return 'Selecione o estado'
      if (form.tiposObra.length === 0) return 'Selecione ao menos um tipo de obra'
      return null
    }
    if (s === 3) {
      if (!contratoSocial) return 'O Contrato Social é obrigatório para cadastro de CNPJ'
      return null
    }
    if (form.senha.length < 8) return 'Senha deve ter mínimo 8 caracteres'
    if (form.senha !== form.confirmarSenha) return 'As senhas não coincidem'
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
    const err = validate(4)
    if (err) return setError(err)
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('name', form.nomeFantasia)
      fd.append('email', form.email)
      fd.append('phone', form.telefone)
      fd.append('password', form.senha)
      fd.append('role', 'contractor')
      fd.append('cnpj', form.cnpj.replace(/\D/g, ''))
      fd.append('razaoSocial', form.razaoSocial)
      fd.append('cidade', form.cidade)
      fd.append('estado', form.estado)
      fd.append('cep', form.cep.replace(/\D/g, ''))
      fd.append('endereco', form.endereco)
      fd.append('bairro', form.bairro)
      fd.append('tiposObra', JSON.stringify(form.tiposObra))
      fd.append('volumeMensal', form.volumeMensal)
      if (contratoSocial) fd.append('contratoSocial', contratoSocial)
      aditivos.forEach(f => fd.append('aditivos', f))

      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'
      const res = await fetch(`${apiUrl}/api/v1/auth/register-pending`, {
        method: 'POST',
        body: fd,
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        if (res.status === 409) throw new Error('Este e-mail já está cadastrado.')
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
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">⏳</span>
            </div>
            <h1 className="text-3xl font-black text-[#1A1A1A] mb-3">Cadastro enviado!</h1>
            <p className="text-[#9E9E9E] text-lg mb-6">
              Recebemos sua solicitação de cadastro como <strong className="text-[#1A1A1A]">Construtora</strong>.
              Nossa equipe irá analisar seus documentos e você receberá um e-mail de confirmação em até <strong className="text-[#1A1A1A]">2 dias úteis</strong>.
            </p>
            <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5 text-left mb-6 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">📧</span>
                <div>
                  <div className="font-bold text-[#1A1A1A] text-sm">Confirme seu e-mail</div>
                  <div className="text-xs text-[#9E9E9E]">Enviamos um link de confirmação para <strong>{form.email}</strong></div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">📄</span>
                <div>
                  <div className="font-bold text-[#1A1A1A] text-sm">Documentos em análise</div>
                  <div className="text-xs text-[#9E9E9E]">Contrato social e aditivos enviados para verificação</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">✅</span>
                <div>
                  <div className="font-bold text-[#1A1A1A] text-sm">Liberação de acesso</div>
                  <div className="text-xs text-[#9E9E9E]">Após aprovação você receberá acesso ao painel de construtora</div>
                </div>
              </div>
            </div>
            <Link href="/" className="text-[#F05A28] font-bold hover:underline text-sm">← Voltar ao início</Link>
          </div>
        </main>
      </div>
    )
  }

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
          <span className="text-2xl">🏗️</span>
          <div>
            <div className="text-xs font-bold text-blue-500 uppercase tracking-wider">Cadastro</div>
            <div className="text-xl font-black text-[#1A1A1A]">Construtora</div>
          </div>
        </div>

        <div className="flex gap-2 mb-2">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`flex-1 h-1.5 rounded-full transition-all ${s <= step ? 'bg-blue-500' : 'bg-[#E5E5E5]'}`} />
          ))}
        </div>
        <div className="flex justify-between text-xs text-[#9E9E9E] mb-8">
          <span className={step >= 1 ? 'text-blue-500 font-semibold' : ''}>Empresa</span>
          <span className={step >= 2 ? 'text-blue-500 font-semibold' : ''}>Localização</span>
          <span className={step >= 3 ? 'text-blue-500 font-semibold' : ''}>Documentos</span>
          <span className={step >= 4 ? 'text-blue-500 font-semibold' : ''}>Senha</span>
        </div>

        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-[#1A1A1A]">Dados da empresa</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-xs text-blue-700">
              🔒 Todos os dados são verificados junto à Receita Federal para garantir a segurança da plataforma.
            </div>
            <Field label="CNPJ" required color="blue">
              <input className={INPUT_BLUE} placeholder="00.000.000/0000-00" value={form.cnpj}
                onChange={e => setForm(f => ({ ...f, cnpj: formatCnpj(e.target.value) }))} />
            </Field>
            <Field label="Nome da construtora (nome fantasia)" required color="blue">
              <input className={INPUT_BLUE} placeholder="Ex: Construtora ABC" value={form.nomeFantasia}
                onChange={e => setForm(f => ({ ...f, nomeFantasia: e.target.value }))} />
            </Field>
            <Field label="Razão social">
              <input className={INPUT_BLUE} placeholder="Razão social completa" value={form.razaoSocial}
                onChange={e => setForm(f => ({ ...f, razaoSocial: e.target.value }))} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="E-mail corporativo" required color="blue">
                <input className={INPUT_BLUE} type="email" placeholder="compras@construtora.com" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </Field>
              <Field label="Telefone" required color="blue">
                <input className={INPUT_BLUE} placeholder="(00) 00000-0000" value={form.telefone}
                  onChange={e => setForm(f => ({ ...f, telefone: formatPhone(e.target.value) }))} />
              </Field>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-[#1A1A1A]">Localização e perfil</h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="CEP" required color="blue">
                <input className={INPUT_BLUE} placeholder="00000-000" value={form.cep}
                  onChange={e => {
                    const v = formatCep(e.target.value)
                    setForm(f => ({ ...f, cep: v }))
                    fetchCep(v)
                  }} />
              </Field>
              <Field label="Estado" required color="blue">
                <select className={INPUT_BLUE} value={form.estado}
                  onChange={e => setForm(f => ({ ...f, estado: e.target.value }))}>
                  <option value="">UF</option>
                  {ESTADOS.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                </select>
              </Field>
            </div>
            <Field label="Endereço">
              <input className={INPUT_BLUE} placeholder="Rua, Av..." value={form.endereco}
                onChange={e => setForm(f => ({ ...f, endereco: e.target.value }))} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Bairro">
                <input className={INPUT_BLUE} placeholder="Bairro" value={form.bairro}
                  onChange={e => setForm(f => ({ ...f, bairro: e.target.value }))} />
              </Field>
              <Field label="Cidade principal" required color="blue">
                <input className={INPUT_BLUE} placeholder="Cidade" value={form.cidade}
                  onChange={e => setForm(f => ({ ...f, cidade: e.target.value }))} />
              </Field>
            </div>
            <Field label="Tipos de obra que você realiza" required color="blue">
              <div className="flex flex-wrap gap-2 mt-1">
                {TIPOS_OBRA.map(t => (
                  <button key={t} type="button" onClick={() => toggleTipo(t)}
                    className={`text-sm px-3 py-1.5 rounded-full border-2 font-medium transition-all ${
                      form.tiposObra.includes(t)
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-white border-[#E5E5E5] text-[#666] hover:border-blue-400 hover:text-blue-600'
                    }`}>
                    {t}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Volume mensal de compra estimado">
              <select className={INPUT_BLUE} value={form.volumeMensal}
                onChange={e => setForm(f => ({ ...f, volumeMensal: e.target.value }))}>
                <option value="">Selecione</option>
                <option value="ate5k">Até R$ 5.000</option>
                <option value="5k-20k">R$ 5.000 – R$ 20.000</option>
                <option value="20k-100k">R$ 20.000 – R$ 100.000</option>
                <option value="acima100k">Acima de R$ 100.000</option>
              </select>
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-[#1A1A1A]">Documentos da empresa</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-xs text-yellow-800">
              ⚠️ Os documentos são analisados manualmente pela nossa equipe antes da liberação do cadastro. Aceito: PDF, JPG, PNG (máx. 10 MB cada).
            </div>

            <FileUpload
              label="Contrato Social"
              required
              hint="Documento registrado em cartório ou Junta Comercial"
              file={contratoSocial}
              onFile={f => {
                const err = f ? validateFile(f) : null
                if (err) { setError(err); return }
                setContratoSocial(f)
                setError(null)
              }}
              inputRef={contratoRef}
              accentColor="blue"
            />

            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                Aditivos Contratuais <span className="text-[#9E9E9E] font-normal">(opcional)</span>
              </label>
              <p className="text-xs text-[#9E9E9E] mb-2">Alterações ou consolidações do contrato social (múltiplos arquivos)</p>
              <button
                type="button"
                onClick={() => aditivosRef.current?.click()}
                className="w-full border-2 border-dashed border-[#E5E5E5] hover:border-blue-400 rounded-xl py-4 px-4 text-sm text-[#9E9E9E] hover:text-blue-600 transition-all text-center"
              >
                + Adicionar aditivo
              </button>
              <input ref={aditivosRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" className="hidden" multiple
                onChange={e => {
                  const files = Array.from(e.target.files ?? [])
                  for (const f of files) {
                    const err = validateFile(f)
                    if (err) { setError(err); return }
                  }
                  setAditivos(prev => [...prev, ...files])
                  setError(null)
                  if (aditivosRef.current) aditivosRef.current.value = ''
                }} />
              {aditivos.length > 0 && (
                <ul className="mt-2 space-y-1.5">
                  {aditivos.map((f, i) => (
                    <li key={i} className="flex items-center justify-between bg-blue-50 rounded-lg px-3 py-2">
                      <span className="text-xs font-medium text-blue-700 truncate max-w-[240px]">{f.name}</span>
                      <button type="button" onClick={() => setAditivos(a => a.filter((_, j) => j !== i))}
                        className="text-xs text-red-400 hover:text-red-600 ml-2 font-bold">✕</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-[#1A1A1A]">Criar senha de acesso</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">⏳</span>
                <div>
                  <div className="font-bold text-[#1A1A1A] text-sm">Cadastro sujeito à aprovação</div>
                  <div className="text-xs text-[#666]">Após enviar, nossa equipe analisa seus documentos em até 2 dias úteis</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">🎯</span>
                <div>
                  <div className="font-bold text-[#1A1A1A] text-sm">Cotação com múltiplos fornecedores</div>
                  <div className="text-xs text-[#666]">Após aprovação, acesse cotações e compre com faturamento em 30/60/90 dias</div>
                </div>
              </div>
            </div>
            <Field label="Senha de acesso" required color="blue">
              <input className={INPUT_BLUE} type="password" placeholder="Mínimo 8 caracteres" value={form.senha}
                onChange={e => setForm(f => ({ ...f, senha: e.target.value }))} />
            </Field>
            <Field label="Confirmar senha" required color="blue">
              <input className={INPUT_BLUE} type="password" placeholder="Repita a senha" value={form.confirmarSenha}
                onChange={e => setForm(f => ({ ...f, confirmarSenha: e.target.value }))} />
            </Field>
            <p className="text-xs text-[#9E9E9E]">
              Ao criar a conta você concorda com os{' '}
              <a href="#" className="text-blue-500 hover:underline">Termos de Uso</a> e a{' '}
              <a href="#" className="text-blue-500 hover:underline">Política de Privacidade</a>.
            </p>
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
          {step < 4
            ? <button onClick={handleNext} className="bg-blue-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-600 transition-all active:scale-95">Continuar →</button>
            : <button
                disabled={loading}
                onClick={handleSubmit}
                className="bg-blue-500 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? 'Enviando cadastro…' : 'Enviar para análise 📤'}
              </button>
          }
        </div>
      </main>
    </div>
  )
}

function FileUpload({ label, required, hint, file, onFile, inputRef, accentColor }: {
  label: string
  required?: boolean
  hint?: string
  file: File | null
  onFile: (f: File | null) => void
  inputRef: React.RefObject<HTMLInputElement | null>
  accentColor?: string
}) {
  const borderFocus = accentColor === 'blue' ? 'hover:border-blue-400' : 'hover:border-[#F05A28]'
  const textFocus = accentColor === 'blue' ? 'hover:text-blue-600' : 'hover:text-[#F05A28]'
  const fileBg = accentColor === 'blue' ? 'bg-blue-50' : 'bg-[#FFF3EE]'
  const fileText = accentColor === 'blue' ? 'text-blue-700' : 'text-[#F05A28]'
  return (
    <div>
      <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">
        {label} {required && <span className={accentColor === 'blue' ? 'text-blue-500' : 'text-[#F05A28]'}>*</span>}
      </label>
      {hint && <p className="text-xs text-[#9E9E9E] mb-2">{hint}</p>}
      {file ? (
        <div className={`flex items-center justify-between ${fileBg} rounded-xl px-4 py-3`}>
          <div className="flex items-center gap-2">
            <span className="text-lg">📄</span>
            <span className={`text-sm font-medium ${fileText} truncate max-w-[260px]`}>{file.name}</span>
          </div>
          <button type="button" onClick={() => onFile(null)} className="text-xs text-red-400 hover:text-red-600 font-bold ml-2">✕ Remover</button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`w-full border-2 border-dashed border-[#E5E5E5] ${borderFocus} rounded-xl py-6 px-4 text-center transition-all group`}
        >
          <div className="text-3xl mb-2">📎</div>
          <div className={`text-sm font-semibold text-[#9E9E9E] ${textFocus} transition-colors`}>Clique para selecionar arquivo</div>
          <div className="text-xs text-[#9E9E9E] mt-1">PDF, JPG ou PNG — máx. 10 MB</div>
        </button>
      )}
      <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" className="hidden"
        onChange={e => { onFile(e.target.files?.[0] ?? null); if (inputRef.current) inputRef.current.value = '' }} />
    </div>
  )
}

function Field({ label, required, color, children }: { label: string; required?: boolean; color?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
        {label} {required && <span className={color === 'blue' ? 'text-blue-500' : 'text-[#F05A28]'}>*</span>}
      </label>
      {children}
    </div>
  )
}

const INPUT_BLUE = 'w-full h-11 px-4 border-2 border-[#E5E5E5] rounded-xl text-sm text-[#1A1A1A] bg-white focus:border-blue-400 focus:outline-none transition-colors'
const ESTADOS = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

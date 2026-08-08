'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

const CATEGORIAS = [
  'Cimento e Argamassa', 'Tintas e Revestimentos', 'Elétrica',
  'Hidráulica', 'Ferramentas', 'Madeiras e MDF',
  'Cerâmica e Pisos', 'Ferro e Aço', 'Impermeabilização', 'Outros',
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

export default function CadastroLojaPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    cnpj: '', nomeFantasia: '', razaoSocial: '', email: '', telefone: '',
    cep: '', endereco: '', numero: '', bairro: '', cidade: '', estado: '',
    descricao: '', categorias: [] as string[],
    senha: '', confirmarSenha: '',
  })
  const [contratoSocial, setContratoSocial] = useState<File | null>(null)
  const [aditivos, setAditivos] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const contratoRef = useRef<HTMLInputElement>(null)
  const aditivosRef = useRef<HTMLInputElement>(null)

  function toggleCategoria(cat: string) {
    setForm(f => ({
      ...f,
      categorias: f.categorias.includes(cat) ? f.categorias.filter(c => c !== cat) : [...f.categorias, cat],
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
      if (!form.nomeFantasia.trim()) return 'Informe o nome fantasia'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'E-mail inválido'
      if (!form.telefone || form.telefone.replace(/\D/g,'').length < 10) return 'Telefone inválido'
      return null
    }
    if (s === 2) {
      if (!form.cep || form.cep.replace(/\D/g,'').length < 8) return 'CEP inválido'
      if (!form.endereco.trim()) return 'Informe o endereço'
      if (!form.cidade.trim()) return 'Informe a cidade'
      if (!form.estado) return 'Selecione o estado'
      return null
    }
    if (s === 3) {
      if (!contratoSocial) return 'O Contrato Social é obrigatório para cadastro de CNPJ'
      return null
    }
    if (form.categorias.length === 0) return 'Selecione ao menos uma categoria'
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
      fd.append('role', 'store')
      fd.append('cnpj', form.cnpj.replace(/\D/g, ''))
      fd.append('razaoSocial', form.razaoSocial)
      fd.append('endereco', `${form.endereco}${form.numero ? ', ' + form.numero : ''}`)
      fd.append('bairro', form.bairro)
      fd.append('cidade', form.cidade)
      fd.append('estado', form.estado)
      fd.append('cep', form.cep.replace(/\D/g, ''))
      fd.append('categorias', JSON.stringify(form.categorias))
      fd.append('descricao', form.descricao)
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
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">⏳</span>
            </div>
            <h1 className="text-3xl font-black text-[#1A1A1A] mb-3">Cadastro enviado!</h1>
            <p className="text-[#9E9E9E] text-lg mb-6">
              Recebemos sua solicitação de cadastro como <strong className="text-[#1A1A1A]">Loja de Materiais</strong>.
              Nossa equipe irá analisar seus documentos e você receberá um e-mail em até <strong className="text-[#1A1A1A]">2 dias úteis</strong>.
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
                  <div className="text-xs text-[#9E9E9E]">Contrato social e documentos enviados para verificação</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">🏪</span>
                <div>
                  <div className="font-bold text-[#1A1A1A] text-sm">Sua loja será ativada</div>
                  <div className="text-xs text-[#9E9E9E]">Após aprovação você poderá cadastrar produtos e receber pedidos</div>
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
          <span className="text-2xl">🏪</span>
          <div>
            <div className="text-xs font-bold text-[#F05A28] uppercase tracking-wider">Cadastro</div>
            <div className="text-xl font-black text-[#1A1A1A]">Loja de Materiais</div>
          </div>
        </div>

        <div className="flex gap-2 mb-2">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`flex-1 h-1.5 rounded-full transition-all ${s <= step ? 'bg-[#F05A28]' : 'bg-[#E5E5E5]'}`} />
          ))}
        </div>
        <div className="flex justify-between text-xs text-[#9E9E9E] mb-8">
          <span className={step >= 1 ? 'text-[#F05A28] font-semibold' : ''}>Empresa</span>
          <span className={step >= 2 ? 'text-[#F05A28] font-semibold' : ''}>Endereço</span>
          <span className={step >= 3 ? 'text-[#F05A28] font-semibold' : ''}>Documentos</span>
          <span className={step >= 4 ? 'text-[#F05A28] font-semibold' : ''}>Categorias</span>
        </div>

        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-[#1A1A1A]">Dados da empresa</h2>
            <div className="bg-[#FFF3EE] border border-[#FFD4BC] rounded-xl px-4 py-3 text-xs text-[#CC4010]">
              🔒 Verificamos seu CNPJ junto à Receita Federal para garantir a segurança da plataforma.
            </div>
            <Field label="CNPJ" required>
              <input className={INPUT} placeholder="00.000.000/0000-00" value={form.cnpj}
                onChange={e => setForm(f => ({ ...f, cnpj: formatCnpj(e.target.value) }))} />
            </Field>
            <Field label="Nome fantasia" required>
              <input className={INPUT} placeholder="Ex: Materiais Belo" value={form.nomeFantasia}
                onChange={e => setForm(f => ({ ...f, nomeFantasia: e.target.value }))} />
            </Field>
            <Field label="Razão social">
              <input className={INPUT} placeholder="Razão social completa" value={form.razaoSocial}
                onChange={e => setForm(f => ({ ...f, razaoSocial: e.target.value }))} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="E-mail" required>
                <input className={INPUT} type="email" placeholder="loja@email.com" value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </Field>
              <Field label="Telefone" required>
                <input className={INPUT} placeholder="(00) 00000-0000" value={form.telefone}
                  onChange={e => setForm(f => ({ ...f, telefone: formatPhone(e.target.value) }))} />
              </Field>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-[#1A1A1A]">Endereço da loja</h2>
            <Field label="CEP" required>
              <input className={INPUT} placeholder="00000-000" value={form.cep}
                onChange={e => {
                  const v = formatCep(e.target.value)
                  setForm(f => ({ ...f, cep: v }))
                  fetchCep(v)
                }} />
            </Field>
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <Field label="Logradouro" required>
                  <input className={INPUT} placeholder="Rua, Av, Praça..." value={form.endereco}
                    onChange={e => setForm(f => ({ ...f, endereco: e.target.value }))} />
                </Field>
              </div>
              <Field label="Número">
                <input className={INPUT} placeholder="Nº" value={form.numero}
                  onChange={e => setForm(f => ({ ...f, numero: e.target.value }))} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Bairro">
                <input className={INPUT} placeholder="Bairro" value={form.bairro}
                  onChange={e => setForm(f => ({ ...f, bairro: e.target.value }))} />
              </Field>
              <Field label="Cidade" required>
                <input className={INPUT} placeholder="Cidade" value={form.cidade}
                  onChange={e => setForm(f => ({ ...f, cidade: e.target.value }))} />
              </Field>
            </div>
            <Field label="Estado" required>
              <select className={INPUT} value={form.estado}
                onChange={e => setForm(f => ({ ...f, estado: e.target.value }))}>
                <option value="">Selecione o estado</option>
                {ESTADOS.map(uf => <option key={uf} value={uf}>{uf}</option>)}
              </select>
            </Field>
            <Field label="Descrição da loja (opcional)">
              <textarea className={INPUT + ' h-20 resize-none'} placeholder="Especialidades, diferenciais..."
                value={form.descricao} onChange={e => setForm(f => ({ ...f, descricao: e.target.value }))} />
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-black text-[#1A1A1A]">Documentos da empresa</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-xs text-yellow-800">
              ⚠️ Os documentos são analisados manualmente antes da ativação da loja. Aceito: PDF, JPG, PNG (máx. 10 MB cada).
            </div>
            <FileUpload
              label="Contrato Social"
              required
              hint="Documento registrado em cartório ou Junta Comercial"
              file={contratoSocial}
              onFile={f => {
                if (f) { const err = validateFile(f); if (err) { setError(err); return } }
                setContratoSocial(f)
                setError(null)
              }}
              inputRef={contratoRef}
            />
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
                Aditivos Contratuais <span className="text-[#9E9E9E] font-normal">(opcional)</span>
              </label>
              <p className="text-xs text-[#9E9E9E] mb-2">Alterações ou consolidações do contrato social</p>
              <button type="button" onClick={() => aditivosRef.current?.click()}
                className="w-full border-2 border-dashed border-[#E5E5E5] hover:border-[#F05A28] rounded-xl py-4 px-4 text-sm text-[#9E9E9E] hover:text-[#F05A28] transition-all text-center">
                + Adicionar aditivo
              </button>
              <input ref={aditivosRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" className="hidden" multiple
                onChange={e => {
                  const files = Array.from(e.target.files ?? [])
                  for (const f of files) { const err = validateFile(f); if (err) { setError(err); return } }
                  setAditivos(prev => [...prev, ...files])
                  setError(null)
                  if (aditivosRef.current) aditivosRef.current.value = ''
                }} />
              {aditivos.length > 0 && (
                <ul className="mt-2 space-y-1.5">
                  {aditivos.map((f, i) => (
                    <li key={i} className="flex items-center justify-between bg-[#FFF3EE] rounded-lg px-3 py-2">
                      <span className="text-xs font-medium text-[#F05A28] truncate max-w-[240px]">{f.name}</span>
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
            <h2 className="text-2xl font-black text-[#1A1A1A]">Categorias e acesso</h2>
            <Field label="Categorias de produtos que você vende" required>
              <div className="flex flex-wrap gap-2 mt-1">
                {CATEGORIAS.map(cat => (
                  <button key={cat} type="button" onClick={() => toggleCategoria(cat)}
                    className={`text-sm px-3 py-1.5 rounded-full border-2 font-medium transition-all ${
                      form.categorias.includes(cat)
                        ? 'bg-[#F05A28] border-[#F05A28] text-white'
                        : 'bg-white border-[#E5E5E5] text-[#666] hover:border-[#F05A28] hover:text-[#F05A28]'
                    }`}>
                    {cat}
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Senha de acesso" required>
              <input className={INPUT} type="password" placeholder="Mínimo 8 caracteres" value={form.senha}
                onChange={e => setForm(f => ({ ...f, senha: e.target.value }))} />
            </Field>
            <Field label="Confirmar senha" required>
              <input className={INPUT} type="password" placeholder="Repita a senha" value={form.confirmarSenha}
                onChange={e => setForm(f => ({ ...f, confirmarSenha: e.target.value }))} />
            </Field>
            <p className="text-xs text-[#9E9E9E]">
              Ao criar a conta você concorda com os{' '}
              <a href="#" className="text-[#F05A28] hover:underline">Termos de Uso</a> e a{' '}
              <a href="#" className="text-[#F05A28] hover:underline">Política de Privacidade</a>.
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
            ? <button onClick={handleNext} className="bg-[#F05A28] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#CC4010] transition-all active:scale-95">Continuar →</button>
            : <button disabled={loading} onClick={handleSubmit}
                className="bg-[#F05A28] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#CC4010] transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed">
                {loading ? 'Enviando cadastro…' : 'Enviar para análise 📤'}
              </button>
          }
        </div>
      </main>
    </div>
  )
}

function FileUpload({ label, required, hint, file, onFile, inputRef }: {
  label: string; required?: boolean; hint?: string; file: File | null
  onFile: (f: File | null) => void; inputRef: React.RefObject<HTMLInputElement | null>
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#1A1A1A] mb-1">
        {label} {required && <span className="text-[#F05A28]">*</span>}
      </label>
      {hint && <p className="text-xs text-[#9E9E9E] mb-2">{hint}</p>}
      {file ? (
        <div className="flex items-center justify-between bg-[#FFF3EE] rounded-xl px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">📄</span>
            <span className="text-sm font-medium text-[#F05A28] truncate max-w-[260px]">{file.name}</span>
          </div>
          <button type="button" onClick={() => onFile(null)} className="text-xs text-red-400 hover:text-red-600 font-bold ml-2">✕ Remover</button>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()}
          className="w-full border-2 border-dashed border-[#E5E5E5] hover:border-[#F05A28] rounded-xl py-6 px-4 text-center transition-all">
          <div className="text-3xl mb-2">📎</div>
          <div className="text-sm font-semibold text-[#9E9E9E] hover:text-[#F05A28] transition-colors">Clique para selecionar arquivo</div>
          <div className="text-xs text-[#9E9E9E] mt-1">PDF, JPG ou PNG — máx. 10 MB</div>
        </button>
      )}
      <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" className="hidden"
        onChange={e => { onFile(e.target.files?.[0] ?? null); if (inputRef.current) inputRef.current.value = '' }} />
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
        {label} {required && <span className="text-[#F05A28]">*</span>}
      </label>
      {children}
    </div>
  )
}

const INPUT = 'w-full h-11 px-4 border-2 border-[#E5E5E5] rounded-xl text-sm text-[#1A1A1A] bg-white focus:border-[#F05A28] focus:outline-none transition-colors'
const ESTADOS = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

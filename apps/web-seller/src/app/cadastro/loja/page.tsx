'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { validateCnpj, formatCnpj, formatPhone, formatCep, validateFile, ESTADOS } from '@obraja/shared'
import { Field, FileUpload, INPUT } from '@obraja/ui'

const CATEGORIAS = [
  'Cimento e Argamassa', 'Tintas e Revestimentos', 'Elétrica',
  'Hidráulica', 'Ferramentas', 'Madeiras e MDF',
  'Cerâmica e Pisos', 'Ferro e Aço', 'Impermeabilização', 'Outros',
]

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
    } catch {
      setError('Erro ao buscar CEP. Preencha o endereço manualmente.')
    }
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
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30_000)
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
        signal: controller.signal,
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        if (res.status === 409) throw new Error('Este e-mail já está cadastrado.')
        throw new Error(body?.message ?? 'Erro ao enviar cadastro. Tente novamente.')
      }
      setSubmitted(true)
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') {
        setError('Tempo esgotado. Verifique sua conexão e tente novamente.')
      } else {
        setError(e instanceof Error ? e.message : 'Erro ao enviar cadastro.')
      }
    } finally {
      clearTimeout(timeoutId)
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
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 text-[#F05A28]">
              <svg width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-[#1A1A1A] mb-3">Cadastro enviado!</h1>
            <p className="text-[#9E9E9E] text-lg mb-6">
              Recebemos sua solicitação de cadastro como <strong className="text-[#1A1A1A]">Loja de Materiais</strong>.
              Nossa equipe irá analisar seus documentos e você receberá um e-mail em até <strong className="text-[#1A1A1A]">2 dias úteis</strong>.
            </p>
            <div className="bg-white rounded-2xl border border-[#E5E5E5] p-5 text-left mb-6 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#F05A28] flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-[#1A1A1A] text-sm">Confirme seu e-mail</div>
                  <div className="text-xs text-[#9E9E9E]">Enviamos um link de confirmação para <strong>{form.email}</strong></div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#F05A28] flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-[#1A1A1A] text-sm">Documentos em análise</div>
                  <div className="text-xs text-[#9E9E9E]">Contrato social e documentos enviados para verificação</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#F05A28] flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
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
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#F05A28] flex items-center justify-center shrink-0">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
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
              <div className="flex items-center gap-2">
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="shrink-0">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <span>Verificamos seu CNPJ junto à Receita Federal para garantir a segurança da plataforma.</span>
              </div>
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
              <div className="flex items-start gap-2">
                <svg className="shrink-0 mt-0.5" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span>Os documentos são analisados manualmente antes da ativação da loja. Aceito: PDF, JPG, PNG (máx. 10 MB cada).</span>
              </div>
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
                {loading ? 'Enviando cadastro…' : 'Enviar para análise'}
              </button>
          }
        </div>
      </main>
    </div>
  )
}


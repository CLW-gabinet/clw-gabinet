import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRole } from '../hooks/useRole'
import { useNavigate } from 'react-router-dom'
import { LogOut } from "lucide-react";


export default function AddUser() {
  const { isAdmin, loading } = useRole()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    imie: '',
    nazwisko: '',
    email: '',
    password: '',
    rola: 'lekarz'
  })
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [saving, setSaving] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')

  if (loading) return <p>Ładowanie...</p>
  if (!isAdmin) return <p>Brak dostępu</p>

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleLogOut(){
        const decision = confirm("Czy na pewno chcesz się wylogować?")

        if (decision){
            await supabase.auth.signOut()
        }else{
            return
        }
        
    }

async function handleSubmit() {
    setError(null)

    if (!form.imie || !form.nazwisko || !form.email || !form.password) {
        setError('Wypełnij wszystkie pola')
        return
    }

    if (form.password !== confirmPassword) {
        setError('Hasła nie są identyczne')
        return
    }

    if (form.password.length < 8) {
        setError('Hasło musi mieć co najmniej 8 znaków')
        return
    }

    const hasUpperCase = /[A-Z]/.test(form.password)
    const hasLowerCase = /[a-z]/.test(form.password)
    const hasNumber = /[0-9]/.test(form.password)
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.password)

    if (!hasUpperCase) {
        setError('Hasło musi zawierać co najmniej jedną dużą literę')
        return
    }
    if (!hasLowerCase) {
        setError('Hasło musi zawierać co najmniej jedną małą literę')
        return
    }
    if (!hasNumber) {
        setError('Hasło musi zawierać co najmniej jedną cyfrę')
        return
    }
    if (!hasSpecial) {
        setError('Hasło musi zawierać co najmniej jeden znak specjalny (!@#$%^&* itp.)')
        return
    }

    setSaving(true)

    const { data, error } = await supabase.functions.invoke('create-user', {
      body: form
    })


    console.log('odpowiedź:', data, error)

    setSaving(false)

    if (error || data?.error) {
      setError(error?.message || data?.error)
      return
    }

    setSuccess(true)
    setTimeout(() => navigate('/admin'), 2000)
  }

  function PasswordStrength({ password }) {
    const checks = [
        { label: 'Minimum 8 znaków', ok: password.length >= 8 },
        { label: 'Duża litera', ok: /[A-Z]/.test(password) },
        { label: 'Mała litera', ok: /[a-z]/.test(password) },
        { label: 'Cyfra', ok: /[0-9]/.test(password) },
        { label: 'Znak specjalny', ok: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) },
    ]

    if (!password) return null

    return (
        <div className="password-strength">
            {checks.map(check => (
                <div key={check.label} className={`password-check ${check.ok ? 'ok' : 'fail'}`}>
                    <span>{check.ok ? '✓' : '✗'}</span>
                    <span>{check.label}</span>
                </div>
            ))}
        </div>
    )
}

  return (
    <div className='main'>
      <button onClick={handleLogOut} className="log-out">
          <LogOut size={15} />
      </button>
      <header>
        <h2>Dodaj użytkownika</h2>
      </header>
      <section className='glass-card'>
        {success && <p style={{ color: 'green' }}>Użytkownik utworzony!</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className='form-grid-user'>
          <label>Imię:</label>
          <input name="imie" value={form.imie} onChange={handleChange} />

          <label>Nazwisko:</label>
          <input name="nazwisko" value={form.nazwisko} onChange={handleChange} />

          <label>Email:</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} />

          <label>Hasło:</label>
          <div>
              <input name="password" type="password" id='password-input' value={form.password} onChange={handleChange} />
              <PasswordStrength password={form.password} />
          </div>

          <label>Powtórz hasło:</label>
          <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
          />

          <label>Rola:</label>
          <select name="rola" id='rola-select' value={form.rola} onChange={handleChange}>
              <option value="lekarz">Lekarz</option>
              <option value="recepcja">Recepcja</option>
              <option value="admin">Admin</option>
          </select>
      </div>

        
        <div className='button-box'>
          <button onClick={handleSubmit} className='dalej' disabled={saving}>
            {saving ? 'Tworzenie...' : 'Utwórz konto'}
          </button>

          <button className='wroc' onClick={() => navigate('/dashboard')}>Anuluj</button>
        </div>

        
      </section>
      

      
    </div>
  )
}
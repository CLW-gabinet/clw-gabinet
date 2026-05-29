import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleLogin(e) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { data, error } = await supabase.auth.signInWithPassword({ email, password })

        console.log('data:', data)
        console.log('error:', error)

        if (error) setError('Nieprawidłowy email lub hasło')
        setLoading(false)
    }

    return (
        <div className="login-main">
            <header>
                    <h1>Logowanie</h1>
                </header>
            <div className="login-glass-card">
                
                
                <form onSubmit={handleLogin}>
                    <div className="display-center-column">
                        <div>
                           <label htmlFor="email">Email: </label>
                            <input 
                                type="email" 
                                id="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)} 
                                required
                            />
                        </div><br />

                        <div>
                            <label htmlFor="password">Hasło: </label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password} 
                                onChange={e => setPassword(e.target.value)} 
                                required
                            /> 
                        </div>
                    </div>

                    

                    

                    {error && <p className="display-center top-margin">{error}</p>}

                    <div className="display-center">
                        <button type="submit" className="dalej" id="zaloguj" disabled={loading}>
                            {loading ? 'Logowanie...' : 'Zaloguj się'}
                        </button>
                    </div>

                    
                </form>
            </div>
            
        </div>
    )




}
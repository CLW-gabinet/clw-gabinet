import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRole } from '../hooks/useRole'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'

export default function ManageUsers() {
    const { isAdmin, loading: roleLoading } = useRole()
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [actionLoading, setActionLoading] = useState(null) // id użytkownika którego akcja trwa
    const [currentUserId, setCurrentUserId] = useState(null)

    useEffect(() => {
        async function init() {
            const { data: { user } } = await supabase.auth.getUser()
            setCurrentUserId(user?.id)
            await fetchUsers()
        }
        init()
    }, [])

    async function fetchUsers() {
        setLoading(true)
        const { data, error } = await supabase
            .from('profiles')
            .select('id, imie, nazwisko, email, rola, is_active')
            .order('nazwisko', { ascending: true })

        if (error) {
            setError('Błąd pobierania użytkowników')
        } else {
            setUsers(data)
        }
        setLoading(false)
    }

    async function toggleStatus(userId, currentStatus) {
        const action = currentStatus ? 'deactivate' : 'restore'
        const confirmMsg = currentStatus
            ? 'Czy na pewno chcesz dezaktywować to konto?'
            : 'Czy na pewno chcesz przywrócić to konto?'

        if (!confirm(confirmMsg)) return

        setActionLoading(userId)
        setError(null)

        const { data, error } = await supabase.functions.invoke('toggle-user-status', {
            body: { userId, action }
        })

        if (error || data?.error) {
            setError('Błąd zmiany statusu konta')
        } else {
            // odśwież listę
            await fetchUsers()
        }

        setActionLoading(null)
    }

    async function handleLogOut() {
        const decision = confirm('Czy na pewno chcesz się wylogować?')
        if (decision) await supabase.auth.signOut()
    }

    const rolaLabel = {
        admin: 'Admin',
        lekarz: 'Lekarz',
        recepcja: 'Recepcja'
    }

    if (roleLoading) return <p>Ładowanie...</p>
    if (!isAdmin) return <p>Brak dostępu</p>

    return (
        <div className="main">
            <button onClick={handleLogOut} className="log-out">
                <LogOut size={15} />
            </button>

            <header>
                <h2>Zarządzanie użytkownikami</h2>
            </header>

            <section className="glass-card">
                <div className="button-box" style={{ marginBottom: '1rem' }}>
                    <button className="dalej" onClick={() => navigate('/add-user')}>
                        <span>Dodaj użytkownika</span>
                    </button>
                    <button className="wroc" onClick={() => navigate('/dashboard')}>
                        <span>Wróć</span>
                    </button>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                {loading ? (
                    <p>Ładowanie użytkowników...</p>
                ) : (
                    <div className="table-wrapper">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>Nazwisko</th>
                                    <th>Imię</th>
                                    <th>Email</th>
                                    <th>Rola</th>
                                    <th>Status</th>
                                    <th>Akcja</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr
                                        key={user.id}
                                        className={!user.is_active ? 'user-row--inactive' : ''}
                                    >
                                        <td>{user.nazwisko}</td>
                                        <td>{user.imie}</td>
                                        <td>{user.email}</td>
                                        <td>{rolaLabel[user.rola] || user.rola}</td>
                                        <td>
                                            <span className={`status-badge ${user.is_active ? 'status-badge--active' : 'status-badge--inactive'}`}>
                                                {user.is_active ? 'Aktywne' : 'Nieaktywne'}
                                            </span>
                                        </td>
                                        <td>
                                            {user.id === currentUserId ? (
                                                <span className="self-label">to Ty</span>
                                            ) : (
                                                <button
                                                    className={user.is_active ? 'wroc' : 'dalej'}
                                                    onClick={() => toggleStatus(user.id, user.is_active)}
                                                    disabled={actionLoading === user.id}
                                                >
                                                    <span>
                                                        {actionLoading === user.id
                                                            ? '...'
                                                            : user.is_active ? 'Dezaktywuj' : 'Przywróć'}
                                                    </span>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    )
}
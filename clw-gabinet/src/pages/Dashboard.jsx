import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { Search, UserRoundPlus, LogOut, Plus } from 'lucide-react';



export default function Dashboard() {
    const { user } = useAuth()
    const [profile, setProfile] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchProfile() {
            const { data } = await supabase
                .from('profiles')
                .select('imie, nazwisko, rola')
                .eq('id', user.id)
                .single()
            setProfile(data)
        }
        fetchProfile()
    }, [user])

    async function handleLogOut(){
        const decision = confirm("Czy na pewno chcesz się wylogować?")

        if (decision){
            await supabase.auth.signOut()
        }else{
            return
        }
        
    }

    useEffect(() => {
        async function fetchProfile() {
            console.log('user:', user)
            const { data, error } = await supabase
                .from('profiles')
                .select('imie, nazwisko, rola')
                .eq('id', user.id)
                .single()
            console.log('profile data:', data)
            console.log('error:', error)
            setProfile(data)
        }
        if (user) fetchProfile()
    }, [user])

    return (
        <div>
            <button onClick={handleLogOut} className="log-out">
                <LogOut size={15} />
            </button>

            {profile?.rola === 'admin' && 
                <button onClick={() => navigate('/manage-users')} className="add-user">
                    <Plus size={15} />
                </button>
            }
            
            
            <header>
                <h1 className="margin-botom">Dzień dobry, {profile ? `${profile.imie} ${profile.nazwisko}` : '...'}</h1>
            </header>

            <div className="display-center">
                <div className=" main grid-col-two-center">

                    <button className="button-start" onClick={() => navigate('/search-card')}>
                        <Search size={32} />
                        Wyszukaj kartę pacjenta
                    </button>

                    <button className="button-start extra-margin" onClick={() => navigate('/choose-card')}>
                        <UserRoundPlus size={32} />
                        Dodaj kartę pacjenta
                    </button>

                </div>
            </div>

            
        </div>
    )
}

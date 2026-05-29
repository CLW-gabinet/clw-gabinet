import { useEffect, useState } from "react";
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from "react-router-dom";
import { Eye, User, Baby, Glasses, EyeOff, UserStar, LogOut, ArrowBigLeft } from 'lucide-react';


export default function ChooseCard() {
    const navigate = useNavigate()
    function toChildrenCard(){
        return <ChildrenCard />
    }

    async function handleLogOut(){
        const decision = confirm("Czy na pewno chcesz się wylogować?")

        if (decision){
            await supabase.auth.signOut()
        }else{
            return
        }
        
    }

    return (

        <div>
            <button onClick={handleLogOut} className="log-out">
                <LogOut size={15} />
            </button>
            <button onClick={() => navigate('/choose-card')} className='return'>
                <ArrowBigLeft size={15} />
            </button>
            <header>
                <h1>Wybierz kartę</h1>
            </header>

            <div className="icon-box">

                <button className="button-start-smaller" onClick={() => navigate('/card/adult')}>
                    <User size={60} />
                    <span>Zwykła</span>
                </button>

                <button className="button-start-smaller" onClick={() => navigate('/card/adult-control')}>
                    <UserStar size={60} />
                    <span>Kontrolna</span>
                </button>
            </div>

            {/* <button onClick={() => navigate(`/choose-card`)} className="wroc" id="wroc-dashboard">Wróć</button> */}
        </div>
    )


}
import { useEffect, useState } from "react";
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from "react-router-dom";
import { Eye, User, Baby, Glasses, EyeOff, LogOut, ArrowBigLeft } from 'lucide-react';

async function handleLogOut(){
    const decision = confirm("Czy na pewno chcesz się wylogować?")

    if (decision){
        await supabase.auth.signOut()
    }else{
        return
    }
}


export default function ChooseCard() {
    const navigate = useNavigate()
    function toChildrenCard(){
        return <ChildrenCard />
    }

    

    return (

        <div>
            <button onClick={handleLogOut} className="log-out">
                <LogOut size={15} />
            </button>
            <button onClick={() => navigate('/dashboard')} className='return'>
                <ArrowBigLeft size={15} />
            </button>
            <header>
                <h1>Wybierz kartę</h1>
            </header>

            <div className="icon-box">
                <button className="button-start-smaller" onClick={() => navigate('/choose-card/children')}>
                    <Baby size={60} />
                    <span>Dziecko</span>
                </button>

                {/* <button className="button2" onClick={() => navigate('/card/control-children')}>
                    <Baby size={60} />
                    <span>KP Dziecko kontrolna</span>
                </button> */}

                <button className="button-start-smaller" onClick={() => navigate('/choose-card/adult')}>
                    <User size={60} />
                    <span>Dorosły</span>
                </button>

                <button className="button-start-smaller" onClick={() => navigate('/card/lines')}>
                    <Glasses size={60} />
                    <span>KP Soczewki</span>
                </button>

                <button className="button-start-smaller" onClick={() => navigate('/card/low-vision')}>
                    <EyeOff size={60} />
                    <span>KP Słabowidzenie</span>
                </button>
            </div>

            {/* <button onClick={() => navigate(`/dashboard`)} className="wroc" id="wroc-dashboard">Wróć</button> */}
        </div>
    )


}
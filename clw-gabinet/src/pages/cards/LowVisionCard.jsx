import { useEffect, useState } from "react";
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";
import CardHeader from "../../components/CardHeader";
import ProgressBar from "../../components/ProgressBard";
import { useFormData } from '../../hooks/useFormData';
import { LogOut, ArrowBigLeft } from "lucide-react";

export default function LowVisionCard() {
   
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const[visibility, setVisibility] = useState(1)
    const { formData, setFormData, formId, setFormId, handleChange, handleSubmit } = useFormData({
         //step 1
        imie: '',
        nazwisko: '',
        data_urodzenia: '',
        kontakt: '',
        adres_zamieszkania: '',

        //step 2
        korekcja_dal_ol: '',
        korekcja_dal_op: '',
        korekcja_dal_v1: '',
        korekcja_dal_v2: '',
        korekcja_bliz_ol: '',
        korekcja_bliz_op: '',
        korekcja_bliz_snv1: '',
        korekcja_bliz_snv2: '',
        rozpoznanie: '',
        dodatkowe_schorzenia: '',
        hobby: '',

        //step 3
        pomoce_dal_nazwa: '',
        pomoce_dal_powiekszenie: '',
        pomoce_dal_moc: '',
        pomoce_dal_rozmiar: '',
        pomoce_dal_producent: '',    
        pomoce_dal_nr_katalogowy: '',

        //step 4
        pomoce_bliz_nazwa: '',
        pomoce_bliz_powiekszenie: '',
        pomoce_bliz_moc: '',
        pomoce_bliz_rozmiar: '',
        pomoce_bliz_producent: '',    
        pomoce_bliz_nr_katalogowy: '',

        //step 5
        filtr_med_filtr: '',
        filtr_med_polaryzacja: '',
        filtr_med_rozmiar: '',
        filtr_med_kolor_oprawy: '',
        filtr_med_producent: '',
        filtr_med_nr_katalogowy: '',


    }, 'low-vision')

    async function handleLogOut(){
        const decision = confirm("Czy na pewno chcesz się wylogować?")

        if (decision){
            await supabase.auth.signOut()
        }else{
            return
        }
    }

    function CurrentDate (){
        const today = new Date()
        return today.toLocaleDateString()
    }

    function nextStep() {
        setVisibility(0)
        setTimeout(() => {
            setStep(prev => prev + 1)
            window.scrollTo({top: 0, behavior: 'smooth'})
            setTimeout(() => {
                setVisibility(1)
            }, 50);
        }, 300);
    }

    function prevStep(){
        setVisibility(0)
        setTimeout(() => {
            setStep(prev => prev - 1)
            window.scrollTo({top: 0, behavior: 'smooth'})
            setTimeout(() => {
                setVisibility(1)
            }, 50);
        }, 300);
    }

    return (
        <div className="main">
            <button onClick={handleLogOut} className="log-out">
                <LogOut size={15} />
            </button>
            <button onClick={() => navigate('/choose-card')} className='return'>
                <ArrowBigLeft size={15} />
            </button>
            <header>
                <h1>Karta dla słabowidzących</h1>
                <p>Data: {CurrentDate()}</p>
            </header>
            <section className="glass-card">
                <ProgressBar step={step} totalSteps={5}/>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className={`step-content ${visibility ? 'visible' : ''}`}>
                        {step === 1 && (
                            <div>
                                <h3>Danne pacjenta: </h3>
                                <div className="form-grid">
                                    <label htmlFor="imie">Imię: </label>
                                    <input type="text" id="imie" name="imie" value={formData.imie} onChange={handleChange}/>

                                    <label htmlFor="nazwisko">Nazwisko: </label>
                                    <input type="text" id="nazwisko" name="nazwisko" value={formData.nazwisko} onChange={handleChange}/>

                                    <label htmlFor="data_urodzenia">Data urodzenia: </label>
                                    <input type="date" id="data_urodzenia" name="data_urodzenia" value={formData.data_urodzenia} onChange={handleChange}/>

                                    <label htmlFor="kontakt">Telefon: </label>
                                    <input type="text" id="kontakt" name="kontakt" value={formData.kontakt} onChange={handleChange}/>

                                    <label htmlFor="adres_zamieszkania">Adres zamieszkania</label>
                                    <input type="text" name="adres_zamieszkania" id="adres_zamieszkania" value={formData.adres_zamieszkania} onChange={handleChange} />
                                </div>
                                <br />

                                <div className="button-box">
                                    <button onClick={() => navigate(`/choose-card`)} className="wroc"><span>Wróć</span></button>
                                    <button onClick={nextStep} className="dalej"><span>Dalej</span></button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <h3>Aktualna Korekcja</h3>
                                <div className="grid-col-two-rev-specific">
                                    <div>
                                        <p className="center">Dal</p>
                                        <br />
                                        <div className="grid-col-two-auto-rev">
                                            <div className="grid-col-two-auto">
                                                <label htmlFor="korekcja_dal_ol">Oko lewe: </label>
                                                <input type="text" name="korekcja_dal_ol" id="korekcja_dal_ol" value={formData.korekcja_dal_ol} onChange={handleChange}/>
                                                <label htmlFor="korekcja_dal_op">Oko prawe: </label>
                                                <input type="text" name="korekcja_dal_op" id="korekcja_dal_op" value={formData.korekcja_dal_op} onChange={handleChange}/>
                                            </div>
                                            <div className="grid-col-two-auto">
                                                <label htmlFor="korekcja_dal_v1">V: </label>
                                                <input type="text" name="korekcja_dal_v1" id="korekcja_dal_v1" value={formData.korekcja_dal_v1} onChange={handleChange}/>
                                                <label htmlFor="korekcja_dal_v2">V: </label>
                                                <input type="text" name="korekcja_dal_v2" id="korekcja_dal_v2" value={formData.korekcja_dal_v2} onChange={handleChange}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="add-pading-specific">
                                        <p className="center">Bliż</p>
                                        <br />
                                        <div className="grid-col-two-auto-rev">
                                            <div className="grid-col-two-auto">
                                                <label htmlFor="korekcja_bliz_ol">Oko lewe: </label>
                                                <input type="text" name="korekcja_bliz_ol" id="korekcja_bliz_ol" value={formData.korekcja_bliz_ol} onChange={handleChange}/>
                                                <label htmlFor="korekcja_bliz_op">Oko prawe: </label>
                                                <input type="text" name="korekcja_bliz_op" id="korekcja_bliz_op" value={formData.korekcja_bliz_op} onChange={handleChange}/>
                                            </div>
                                            <div className="grid-col-two-auto">
                                                <label htmlFor="korekcja_bliz_snv1">SnV: </label>
                                                <input type="text" name="korekcja_bliz_snv1" id="korekcja_bliz_snv1" value={formData.korekcja_bliz_snv1} onChange={handleChange}/>
                                                <label htmlFor="korekcja_bliz_snv2">SnV: </label>
                                                <input type="text" name="korekcja_bliz_snv2" id="korekcja_bliz_snv2" value={formData.korekcja_bliz_snv2} onChange={handleChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <label htmlFor="rozpoznanie"><b>Rozpoznanie okulistyczne: </b></label>
                                <textarea name="rozpoznanie" id="rozpoznanie" value={formData.rozpoznanie} onChange={handleChange}></textarea>
                                <br />
                                <label htmlFor="dodatkowe_schorzenia"><b>Dodatkowe schorzenia</b></label>
                                <textarea name="dodatkowe_schorzenia" id="dodatkowe_schorzenia" value={formData.dodatkowe_schorzenia} onChange={handleChange}></textarea>
                                <br />
                                <label htmlFor="hobby"><b>Hobby</b></label>
                                <textarea name="hobby" id="hobby" value={formData.hobby} onChange={handleChange}></textarea>
                                <div className="button-box">
                                    <button onClick={prevStep} className="wroc"><span>Wróć</span></button>
                                    <button onClick={nextStep} className="dalej"><span>Dalej</span></button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div>
                                <h3>Dopasowane pomoce do dali</h3>
                                <ol>
                                    <li>
                                        Nazwa
                                        <textarea name="pomoce_dal_nazwa" id="pomoce_dal_nazwa" value={formData.pomoce_dal_nazwa} onChange={handleChange}></textarea>
                                    </li>
                                    <li>
                                        Powiększenie
                                        <textarea name="pomoce_dal_powiekszenie" id="pomoce_dal_powiekszenie" value={formData.pomoce_dal_powiekszenie} onChange={handleChange}></textarea>
                                    </li>
                                    <li>
                                        Moc
                                        <textarea name="pomoce_dal_moc" id="pomoce_dal_moc" value={formData.pomoce_dal_moc} onChange={handleChange}></textarea>
                                    </li>
                                    <li>
                                        Rozmiar
                                        <textarea name="pomoce_dal_rozmiar" id="pomoce_dal_rozmiar" value={formData.pomoce_dal_rozmiar} onChange={handleChange}></textarea>
                                    </li>
                                    <li>
                                        Producent
                                        <textarea name="pomoce_dal_producent" id="pomoce_dal_producent" value={formData.pomoce_dal_producent} onChange={handleChange}></textarea>
                                    </li>
                                    <li>
                                        Nr. katalogowy
                                        <textarea name="pomoce_dal_nr_katalogowy" id="pomoce_dal_nr_katalogowy" value={formData.pomoce_dal_nr_katalogowy} onChange={handleChange}></textarea>
                                    </li>
                                </ol>
                                <div className="button-box">
                                    <button onClick={prevStep} className="wroc"><span>Wróć</span></button>
                                    <button onClick={nextStep} className="dalej"><span>Dalej</span></button>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div>
                                <h3>Dopasowane pomoce do bliży</h3>
                                <ol>
                                    <li>
                                        Nazwa
                                        <textarea name="pomoce_bliz_nazwa" id="pomoce_bliz_nazwa" value={formData.pomoce_bliz_nazwa} onChange={handleChange}></textarea>
                                    </li>
                                    <li>
                                        Powiększenie
                                        <textarea name="pomoce_bliz_powiekszenie" id="pomoce_bliz_powiekszenie" value={formData.pomoce_bliz_powiekszenie} onChange={handleChange}></textarea>
                                    </li>
                                    <li>
                                        Moc
                                        <textarea name="pomoce_bliz_moc" id="pomoce_bliz_moc" value={formData.pomoce_bliz_moc} onChange={handleChange}></textarea>
                                    </li>
                                    <li>
                                        Rozmiar
                                        <textarea name="pomoce_bliz_rozmiar" id="pomoce_bliz_rozmiar" value={formData.pomoce_bliz_rozmiar} onChange={handleChange}></textarea>
                                    </li>
                                    <li>
                                        Producent
                                        <textarea name="pomoce_bliz_producent" id="pomoce_bliz_producent" value={formData.pomoce_bliz_producent} onChange={handleChange}></textarea>
                                    </li>
                                    <li>
                                        Nr. katalogowy
                                        <textarea name="pomoce_bliz_nr_katalogowy" id="pomoce_bliz_nr_katalogowy" value={formData.pomoce_bliz_nr_katalogowy} onChange={handleChange}></textarea>
                                    </li>
                                </ol>
                                <div className="button-box">
                                    <button onClick={prevStep} className="wroc"><span>Wróć</span></button>
                                    <button onClick={nextStep} className="dalej"><span>Dalej</span></button>
                                </div>
                            </div>
                        )}

                        {step === 5 && (
                            <div>
                                <h3>Filtr medyczny krawędziowy</h3>
                                <ol>
                                    <li>
                                        Filtr
                                        <textarea name="filtr_med_filtr" id="filtr_med_filtr" value={formData.filtr_med_filtr} onChange={handleChange}></textarea>
                                    </li>
                                    <li>
                                        Polaryzacja
                                        <textarea name="filtr_med_polaryzacja" id="filtr_med_polaryzacja" value={formData.filtr_med_polaryzacja} onChange={handleChange}></textarea>
                                    </li>
                                    <li>
                                        Rozmiar
                                        <textarea name="filtr_med_rozmiar" id="filtr_med_rozmiar" value={formData.filtr_med_rozmiar} onChange={handleChange}></textarea>
                                    </li>
                                    <li>
                                        Kolor oprawy
                                        <textarea name="filtr_med_kolor_oprawy" id="filtr_med_kolor_oprawy" value={formData.filtr_med_kolor_oprawy} onChange={handleChange}></textarea>
                                    </li>
                                    <li>
                                        Producent
                                        <textarea name="filtr_med_producent" id="filtr_med_producent" value={formData.filtr_med_producent} onChange={handleChange}></textarea>
                                    </li>
                                    <li>
                                        Nr. katalogowy
                                        <textarea name="filtr_med_nr_katalogowy" id="filtr_med_nr_katalogowy" value={formData.filtr_med_nr_katalogowy} onChange={handleChange}></textarea>
                                    </li>
                                </ol>
                                <div className="button-box">
                                    <button onClick={prevStep} className="wroc"><span>Wróć</span></button>
                                    <button onClick={() => handleSubmit('low-vision')} className="dalej"><span>Zapisz</span></button>
                                </div>
                            </div>
                        )}
                    </div>

                   
                </form>
            </section>
        </div>
    )
}
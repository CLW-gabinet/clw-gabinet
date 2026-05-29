import { useEffect, useState } from "react";
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../context/AuthContext'
import { useFormAction, useNavigate } from "react-router-dom";
import { useFormData } from "../../hooks/useFormData";
import ProgressBar from "../../components/ProgressBard"
import CardHeader from "../../components/CardHeader"
import { LogOut, ArrowBigLeft } from "lucide-react";


export default function LinesCard(){
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const[visibility, setVisibility] = useState(1)
    const {formData, setFormData, formId, setFormId, handleChange, handleSubmit} = useFormData({
        // step 1
        imie: '',
        nazwisko: '',
        data_urodzenia: '',
        kontakt: '',
        przyczyna_wizyty: '',

        // step 2 - aktualna korekcja okularowa
        dal_op_sph: '', dal_op_cyl: '', dal_op_ax: '',
        dal_op_pryzma: '', dal_op_baza: '', dal_op_pd: '',
        dal_op_visus: '', dal_wsp_visus: '',
        dal_ol_sph: '', dal_ol_cyl: '', dal_ol_ax: '',
        dal_ol_pryzma: '', dal_ol_baza: '', dal_ol_pd: '',
        dal_ol_visus: '',

        bliz_op_sph: '', bliz_op_cyl: '', bliz_op_ax: '',
        bliz_op_pryzma: '', bliz_op_baza: '', bliz_op_pd: '',
        bliz_op_visus: '', bliz_wsp_visus: '',
        bliz_ol_sph: '', bliz_ol_cyl: '', bliz_ol_ax: '',
        bliz_ol_pryzma: '', bliz_ol_baza: '', bliz_ol_pd: '',
        bliz_ol_visus: '',

        // step 2 - film łzowy
        filtr_lzowy_ol: 'wodnisty',
        filtr_lzowy_op: 'wodnisty',
        menisk_lzowy_ol: 'brak',
        menisk_lzowy_op: 'brak',
        zerwanie_filmu_ol: '',
        zerwanie_filmu_op: '',
        krople_do_oczu: '',

        // step 3 - skala Efrona (dla każdego pola: _ol, _op, _uwagi)
        zaczerwienienie_ol: '', zaczerwienienie_op: '', zaczerwienienie_uwagi: '',
        przekrwienie_ol: '', przekrwienie_op: '', przekrwienie_uwagi: '',
        neowaskularyzacja_ol: '', neowaskularyzacja_op: '', neowaskularyzacja_uwagi: '',
        mikrocysty_ol: '', mikrocysty_op: '', mikrocysty_uwagi: '',
        obrzek_ol: '', obrzek_op: '', obrzek_uwagi: '',
        barwienie_spojowki_ol: '', barwienie_spojowki_op: '', barwienie_spojowki_uwagi: '',
        barwienie_rogowki_ol: '', barwienie_rogowki_op: '', barwienie_rogowki_uwagi: '',
        brodawkowe_zap_ol: '', brodawkowe_zap_op: '', brodawkowe_zap_uwagi: '',
        zapalenie_brzeg_powiek_ol: '', zapalenie_brzeg_powiek_op: '', zapalenie_brzeg_powiek_uwagi: '',
        dysfunkcja_gruczolow_ol: '', dysfunkcja_gruczolow_op: '', dysfunkcja_gruczolow_uwagi: '',
        gorne_rabkowe_zap_ol: '', gorne_rabkowe_zap_op: '', gorne_rabkowe_zap_uwagi: '',
        nacieki_ol: '', nacieki_op: '', nacieki_uwagi: '',
        owrzodzenie_ol: '', owrzodzenie_op: '', owrzodzenie_uwagi: '',
        polimegatyzm_ol: '', polimegatyzm_op: '', polimegatyzm_uwagi: '',

        efron_uwagi_ol: '',
        efron_uwagi_op: '',
        efron_uwagi_ogolne: '',

        // step 4 - dobór soczewek
        soczewki_noszenie: '',
        soczewki_noszenie_jakie: '',

        // soczewka 1
        nazwa_soczewek1: '',
        firma_soczewek1: '',
        tryb_noszenia_soczewek1: '',
        subiektywny_komfort_sk1: '',

        // ocena dopasowania sk1 (dla każdego wiersza: _op, _ol)
        pokrycie1_op: '', pokrycie1_ol: '',
        centracja1_op: '', centracja1_ol: '',
        ruchomosc1_op: '', ruchomosc1_ol: '',
        test_push_up1_op: '', test_push_up1_ol: '',
        rotacja1_op: '', rotacja1_ol: '',
        nadrefrakcja1_op: '', nadrefrakcja1_ol: '',
        visus1_op: '', visus1_ol: '',
        uwagi1_op: '', uwagi1_ol: '',

        // soczewka 2
        nazwa_soczewek2: '',
        firma_soczewek2: '',
        tryb_noszenia_soczewek2: '',
        subiektywny_komfort_sk2: '',

        // ocena dopasowania sk2
        pokrycie2_op: '', pokrycie2_ol: '',
        centracja2_op: '', centracja2_ol: '',
        ruchomosc2_op: '', ruchomosc2_ol: '',
        test_push_up2_op: '', test_push_up2_ol: '',
        rotacja2_op: '', rotacja2_ol: '',
        nadrefrakcja2_op: '', nadrefrakcja2_ol: '',
        visus2_op: '', visus2_ol: '',
        uwagi2_op: '', uwagi2_ol: '',

        // step 5 - dopasowane soczewki
        nazwa_soczewek_dopasowane: '',
        firma_soczewek_dopasowane: '',
        tryb_noszenia_soczewek_dopasowane: '',

        sph_op: '', cyl_op: '', ax_op: '', add_op: '',
        sph_ol: '', cyl_ol: '', ax_ol: '', add_ol: '',
    }, 'lines')

    useEffect(() => {
        if (!formId) return

        const timeout = setTimeout(async () => {
            await supabase
                .from('patient_forms')
                .update({
                    form_data: formData,
                    updated_at: new Date().toISOString()
                })
                .eq('id', formId)
        }, 1000)

        return () => clearTimeout(timeout)
    }, [formData, formId])

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

    function ScaleSelector({ name, value, onChange }) {
        return (
            <div className="scale-selector">
                {[0, 1, 2, 3, 4].map((num) => (
                    <div
                        key={num}
                        className={`scale-box ${value === `${name}${num}` ? 'selected' : ''}`}
                        onClick={() => onChange({ target: { name, value: `${name}${num}` } })}
                    >
                        {num}
                    </div>
                ))}
            </div>
        )
    }

    function EfronRow({ label, name, formData, handleChange }) {
        return (
            <>
                <p>{label}</p>
                <div className="grid-col-two-center">
                    <div>
                        <label>Oko lewe: </label>
                        <ScaleSelector name={`${name}_ol`} value={formData[`${name}_ol`]} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Oko prawe: </label>
                        <ScaleSelector name={`${name}_op`} value={formData[`${name}_op`]} onChange={handleChange} />
                    </div>
                </div>
                <br />
                <label>Uwagi: </label>
                <input
                    className="long-input"
                    type="text"
                    name={`${name}_uwagi`}
                    id={`${name}_uwagi`}
                    value={formData[`${name}_uwagi`]}
                    onChange={handleChange}
                />
                <br /><br />
            </>
        )
    }

    function ComfortTable ({ rowName, name, number, formData, handleChange }){
        return (
            <>
                <tr>
                    <td>{rowName}</td>
                    <td>
                        <input type="text" name={`${name}${number}_op`} id={`${name}${number}_op`} value={formData[`${name}${number}_op`]}
                    onChange={handleChange}/>
                    </td>
                    <td>
                        <input type="text" name={`${name}${number}_ol`} id={`${name}${number}_ol`} value={formData[`${name}${number}_ol`]}
                    onChange={handleChange}/>
                    </td>


                </tr>
            </>
        )
    }

    const ocenaDopasowaniaRows = [
        { label: 'Pokrycie',     name: 'pokrycie' },
        { label: 'Centracja',    name: 'centracja' },
        { label: 'Ruchomość',    name: 'ruchomosc' },
        { label: 'Test push-up', name: 'test_push_up' },
        { label: 'Rotacja',      name: 'rotacja' },
        { label: 'Nadrefrakcja', name: 'nadrefrakcja' },
        { label: 'Visus',        name: 'visus' },
        { label: 'Uwagi',        name: 'uwagi' },
    ]

    const efronFields = [
        { label: 'Zaczerwienienie spojówki gałkowej', name: 'zaczerwienienie' },
        { label: 'Przekrwienie rąbka rogówki',        name: 'przekrwienie' },
        { label: 'Neowaskularyzacja rogówki',          name: 'neowaskularyzacja' },
        { label: 'Mikrocysty i torbiele nabłonka rogówki', name: 'mikrocysty' },
        { label: 'Obrzęk rogówki - prążki i fałdy',   name: 'obrzek' },
        { label: 'Barwienie spojówki',                 name: 'barwienie_spojowki' },
        { label: 'Barwienie rogówki',                  name: 'barwienie_rogowki' },
        { label: 'Brodawkowe zapalenie spojówki',      name: 'brodawkowe_zap' },
        { label: 'Zapalenie brzegów powiek',           name: 'zapalenie_brzeg_powiek' },
        { label: 'Dysfunkcja gruczołów Meiboma',       name: 'dysfunkcja_gruczolow' },
        { label: 'Górne rąbkowe zapalenie rogówki i spojówki', name: 'gorne_rabkowe_zap' },
        { label: 'Nacieki rogówkowe',                  name: 'nacieki' },
        { label: 'Owrzodzenie rogówkowe',              name: 'owrzodzenie' },
        { label: 'Polimegatyzm śródbłonka',            name: 'polimegatyzm' },
    ]

    return (
        <div className="main">
            <button onClick={handleLogOut} className="log-out">
                <LogOut size={15} />
            </button>
            <button onClick={() => navigate('/choose-card')} className='return'>
                <ArrowBigLeft size={15} />
            </button>
            <header>
                <h1>Karta doboru soczewek kontaktowych</h1>
                <p>Data: {CurrentDate()}</p>
            </header>
            <section className="glass-card">
                <ProgressBar step={step} totalSteps={5} />

                {step === 1 && (
                    <div>
                        <CardHeader formData={formData} handleChange={handleChange} />

                        <div className="button-box">
                            <button onClick={() => navigate(`/choose-card`)} className="wroc"><span>Wróć</span></button>
                            <button onClick={nextStep} className="dalej"><span>Dalej</span></button>
                        </div>
                    </div>
                )}

                {step === 2 && (

                    <div>
                        <h3>Aktualna korekcja okularowa</h3>
                        <table>
                            <tbody>
                                <tr id="1">
                                    <td  rowSpan={3}>Dal</td>
                                    <td colSpan={2}>Sph</td>
                                    <td>cyl</td>
                                    <td>ax</td>
                                    <td>pryzma</td>
                                    <td>baza</td>
                                    <td>PD</td>
                                    <td colSpan={2}>Visus</td>
                                </tr>

                                <tr id="2">
                                    <td>OP</td>

                                    <td><input type="text" name="dal_op_sph" id="dal_op_sph" value={formData.dal_op_sph} onChange={handleChange}/></td>

                                    <td><input type="text" name="dal_op_cyl" id="dal_op_cyl" value={formData.dal_op_cyl} onChange={handleChange}/></td>

                                    <td><input type="text" name="dal_op_ax" id="dal_op_ax" value={formData.dal_op_ax} onChange={handleChange}/></td>

                                    <td><input type="text" name="dal_op_pryzma" id="dal_op_pryzma" value={formData.dal_op_pryzma} onChange={handleChange}/></td>

                                    <td><input type="text" name="dal_op_baza" id="dal_op_baza" value={formData.dal_op_baza} onChange={handleChange}/></td>

                                    <td><input type="text" name="dal_op_pd" id="dal_op_pd" value={formData.dal_op_pd} onChange={handleChange}/></td>

                                    <td><input type="text" name="dal_op_visus" id="dal_op_visus" value={formData.dal_op_visus} onChange={handleChange}/></td>
                                    
                                    <td rowSpan={2}><input type="text" name="dal_wsp_visus" id="dal_wsp_visus" value={formData.dal_wsp_visus} onChange={handleChange}/></td>
                                </tr>

                                <tr id="3">
                                    <td>OL</td>

                                    <td><input type="text" name="dal_ol_sph" id="dal_ol_sph" value={formData.dal_ol_sph} onChange={handleChange}/></td>

                                    <td><input type="text" name="dal_ol_cyl" id="dal_ol_cyl" value={formData.dal_ol_cyl} onChange={handleChange}/></td>

                                    <td><input type="text" name="dal_ol_ax" id="dal_ol_ax" value={formData.dal_ol_ax} onChange={handleChange}/></td>

                                    <td><input type="text" name="dal_ol_pryzma" id="dal_ol_pryzma" value={formData.dal_ol_pryzma} onChange={handleChange}/></td>

                                    <td><input type="text" name="dal_ol_baza" id="dal_ol_baza" value={formData.dal_ol_baza} onChange={handleChange}/></td>

                                    <td><input type="text" name="dal_ol_pd" id="dal_ol_pd" value={formData.dal_ol_pd} onChange={handleChange}/></td>

                                    <td><input type="text" name="dal_ol_visus" id="dal_ol_visus" value={formData.dal_ol_visus} onChange={handleChange}/></td>

                                </tr>

                                <tr id="4">
                                    <td rowSpan={2}>Bliż</td>

                                    <td>OP</td>

                                    <td><input type="text" name="bliz_op_sph" id="bliz_op_sph" value={formData.bliz_op_sph} onChange={handleChange}/></td>

                                    <td><input type="text" name="bliz_op_cyl" id="bliz_op_cyl" value={formData.bliz_op_cyl} onChange={handleChange}/></td>

                                    <td><input type="text" name="bliz_op_ax" id="bliz_op_ax" value={formData.bliz_op_ax} onChange={handleChange}/></td>

                                    <td><input type="text" name="bliz_op_pryzma" id="bliz_op_pryzma" value={formData.bliz_op_pryzma} onChange={handleChange}/></td>

                                    <td><input type="text" name="bliz_op_baza" id="bliz_op_baza" value={formData.bliz_op_baza} onChange={handleChange}/></td>

                                    <td><input type="text" name="bliz_op_pd" id="bliz_op_pd" value={formData.bliz_op_pd} onChange={handleChange}/></td>

                                    <td><input type="text" name="bliz_op_visus" id="bliz_op_visus" value={formData.bliz_op_visus} onChange={handleChange}/></td>

                                    <td rowSpan={2}><input type="text" name="bliz_wsp_visus" id="bliz_wsp_visus" value={formData.bliz_wsp_visus} onChange={handleChange}/></td>

                                </tr>

                                <tr id="5">
                                    <td>OL</td>

                                    <td><input type="text" name="bliz_ol_sph" id="bliz_ol_sph" value={formData.bliz_ol_sph} onChange={handleChange}/></td>

                                    <td><input type="text" name="bliz_ol_cyl" id="bliz_ol_cyl" value={formData.bliz_ol_cyl} onChange={handleChange}/></td>

                                    <td><input type="text" name="bliz_ol_ax" id="bliz_ol_ax" value={formData.bliz_ol_ax} onChange={handleChange}/></td>

                                    <td><input type="text" name="bliz_ol_pryzma" id="bliz_ol_pryzma" value={formData.bliz_ol_pryzma} onChange={handleChange}/></td>

                                    <td><input type="text" name="bliz_ol_baza" id="bliz_ol_baza" value={formData.bliz_ol_baza} onChange={handleChange}/></td>

                                    <td><input type="text" name="bliz_ol_pd" id="bliz_ol_pd" value={formData.bliz_ol_pd} onChange={handleChange}/></td>

                                    <td><input type="text" name="bliz_ol_visus" id="bliz_ol_visus" value={formData.bliz_ol_visus} onChange={handleChange}/></td>
                                </tr>
                            </tbody>
                        </table>

                        <br />
                        <br />

                        <h3>Jakość filtru łzowego</h3>

                        <div className="grid-col-two-center">
                            <div>
                                <label htmlFor="filtr_lzowy_ol">Oko lewe: </label>
                                <select name="filtr_lzowy_ol" id="filtr_lzowy_ol" value={formData.filtr_lzowy_ol} onChange={handleChange}>
                                    <option value="wodnisty">wodnisty</option>
                                    <option value="oleisty">oleisty</option>
                                    <option value="przejrzysty">przejrzysty</option>
                                    <option value="zabrudzony">zabrudzony</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="filtr_lzowy_op">Oko prawe: </label>
                                <select name="filtr_lzowy_op" id="filtr_lzowy_op" value={formData.filtr_lzowy_op} onChange={handleChange}>
                                    <option value="wodnisty">wodnisty</option>
                                    <option value="opeisty">opeisty</option>
                                    <option value="przejrzysty">przejrzysty</option>
                                    <option value="zabrudzony">zabrudzony</option>
                                </select>
                            </div>
                        </div>

                        <br />
                        <br />

                        <h3>Wysokość menisku łzowego</h3>

                        <div className="grid-col-two-center">
                            <div>
                                <label htmlFor="menisk_lzowy_ol">Oko lewe: </label>
                                <select name="menisk_lzowy_ol" id="menisk_lzowy_ol" value={formData.menisk_lzowy_ol} onChange={handleChange}>
                                    <option value="brak">brak</option>
                                    <option value="maly">mały</option>
                                    <option value="przecietny">przeciętny</option>
                                    <option value="duzy">duży</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="menisk_lzowy_op">Oko prawe: </label>
                                <select name="menisk_lzowy_op" id="menisk_lzowy_op" value={formData.menisk_lzowy_op} onChange={handleChange}>
                                    <option value="brak">brak</option>
                                    <option value="maly">mały</option>
                                    <option value="przecietny">przeciętny</option>
                                    <option value="duzy">duży</option>
                                </select>
                            </div>
                        </div>

                        <br />
                        <br />

                        <h3>Czas zerwania filmu łzowego (NIBUT)</h3>

                        <div className="grid-col-two-center">
                            <div>
                                <label htmlFor="zerwanie_filmu_ol">Oko lewe: 
                                <input type="text" name="zerwanie_filmu_ol" id="zerwanie_filmu_ol" value={formData.zerwanie_filmu_ol} onChange={handleChange} /> [s]</label>
                            </div>
                            <div>
                                <label htmlFor="zerwanie_filmu_op">Oko lewe: 
                                <input type="text" name="zerwanie_filmu_op" id="zerwanie_filmu_op" value={formData.zerwanie_filmu_op} onChange={handleChange} /> [s]</label>
                            </div>

                        </div>

                        <br />
                        <br />

                        <label htmlFor="krople_do_oczu">Stosowane krople do oczu: </label>
                        <textarea name="krople_do_oczu" id="krople_do_oczu" value={formData.krople_do_oczu} onChange={handleChange}></textarea>

                        <br />
                        <br />
                        
                        <div className="button-box">
                            <button onClick={prevStep} className="wroc"><span>Wróć</span></button>
                            <button onClick={nextStep} className="dalej"><span>Dalej</span></button>
                        </div> 
                    </div>

                    

                    
                )}

                {step === 3 && (
                    <div>
                        <h3>Ocena przedniego odcinka w lampie szczelinowej (skala Efrona)</h3>

                        <br />

                        {efronFields.map(field => (
                            <EfronRow
                                key={field.name}
                                label={field.label}
                                name={field.name}
                                formData={formData}
                                handleChange={handleChange}
                            />
                        ))}

                        <div className="grid-col-two-center">
                            <div>
                                <label htmlFor="efron_uwagi_ol">Oko lewe:</label>
                                <textarea name="efron_uwagi_ol" id="efron_uwagi_ol" value={formData.efron_uwagi_ol} onChange={handleChange}></textarea>
                            </div>

                            <div>
                                <label htmlFor="efron_uwagi_op">Oko prawe:</label>
                                <textarea name="efron_uwagi_op" id="efron_uwagi_op" value={formData.efron_uwagi_op} onChange={handleChange}></textarea>
                            </div>
                        </div>

                        <label htmlFor="efron_uwagi_ogolne">Uwagi ogólne: </label>
                        <textarea name="efron_uwagi_ogolne" id="efron_uwagi_ogolne" value={formData.efron_uwagi_ogolne} onChange={handleChange}></textarea>
                        
                        <div className="button-box">
                            <button onClick={prevStep} className="wroc"><span>Wróć</span></button>
                            <button onClick={nextStep} className="dalej"><span>Dalej</span></button>
                        </div> 
                    </div>

                )}

                {step === 4 && (
                    <div>
                        <h3>Dobór soczewek</h3>

                        <label htmlFor="soczewki_noszenie_tak">Czy kiedykolwiek były noszone soczewki? </label>
                        <div className="grid-col-two-center">
                            <div>
                                <input type="radio" name="soczewki_noszenie" id="soczewki_noszenie_tak" value="soczewki_noszenie_tak"  checked={formData.soczewki_noszenie === "soczewki_noszenie_tak"} onChange={handleChange} />
                                <label htmlFor="soczewki_noszenie_tak">Tak</label>                             
                            </div>
                            <div>
                                <input type="radio" name="soczewki_noszenie" id="soczewki_noszenie_nie" value="soczewki_noszenie_nie"  checked={formData.soczewki_noszenie === "soczewki_noszenie_nie"} onChange={handleChange} />
                                <label htmlFor="soczewki_noszenie_nie">Nie</label>
                            </div>
                        </div>

                        <div className={`fade-in ${formData.soczewki_noszenie === 'soczewki_noszenie_tak' ? 'visible' : ''}`}>
                            <label htmlFor="soczewki_noszenie_jakie">Jakie soczewki były noszone: </label>
                            <textarea name="soczewki_noszenie_jakie" id="soczewki_noszenie_jakie" value={formData.soczewki_noszenie_jakie} onChange={handleChange}></textarea>

                            <br />
                        </div>

                        <br />
                        <br />

                        <ol>
                            <li>
                                Typ SK
                                <div className="grid-col-three-center">
                                    <div>
                                        <label htmlFor="nazwa_soczewek1">Nazwa: </label>
                                        <input type="text" name="nazwa_soczewek1" id="nazwa_soczewek1" value={formData.nazwa_soczewek1} onChange={handleChange} />
                                    </div>

                                    <div>
                                        <label htmlFor="firma_soczewek1">Firma: </label>
                                        <input type="text" name="firma_soczewek1" id="firma_soczewek1" value={formData.firma_soczewek1} onChange={handleChange} />
                                    </div>

                                    <div>
                                        <label htmlFor="tryb_noszenia_soczewek1">Tryb noszenia: </label>
                                        <input type="text" name="tryb_noszenia_soczewek1" id="tryb_noszenia_soczewek1" value={formData.tryb_noszenia_soczewek1} onChange={handleChange} />
                                    </div>
                                </div>
                                <br />
                            </li> 
                        </ol>

                        <label htmlFor="subiektywny_komfort_sk1">Subiektywny komfort w SK: </label>
                        <textarea name="subiektywny_komfort_sk1" id="subiektywny_komfort_sk1" value={formData.subiektywny_komfort_sk1} onChange={handleChange}></textarea>

                        <br />

                        <div className="display-center">
                            <table>
                                <tbody>
                                    <tr>
                                        <td><b>Ocena dopasowania</b></td>
                                        <td><b>OP</b></td>
                                        <td><b>OL</b></td>
                                    </tr>

                                    {ocenaDopasowaniaRows.map((row) => (
                                        <ComfortTable 
                                            key={row.name}
                                            rowName={row.label}
                                            name={row.name}
                                            number={1}
                                            formData={formData}
                                            onChange={handleChange}
                                        />
                                    ))}

                                </tbody>
                            </table>
                        </div>

                        <ol start={2}>
                            <li>
                                Typ SK
                                <div className="grid-col-three-center">
                                    <div>
                                        <label htmlFor="nazwa_soczewek2">Nazwa: </label>
                                        <input type="text" name="nazwa_soczewek2" id="nazwa_soczewek2" value={formData.nazwa_soczewek2} onChange={handleChange} />
                                    </div>

                                    <div>
                                        <label htmlFor="firma_soczewek2">Firma: </label>
                                        <input type="text" name="firma_soczewek2" id="firma_soczewek2" value={formData.firma_soczewek2} onChange={handleChange} />
                                    </div>

                                    <div>
                                        <label htmlFor="tryb_noszenia_soczewek2">Tryb noszenia: </label>
                                        <input type="text" name="tryb_noszenia_soczewek2" id="tryb_noszenia_soczewek2" value={formData.tryb_noszenia_soczewek2} onChange={handleChange} />
                                    </div>
                                </div>
                                <br />
                            </li> 
                        </ol>

                        <label htmlFor="subiektywny_komfort_sk2">Subiektywny komfort w SK: </label>
                        <textarea name="subiektywny_komfort_sk2" id="subiektywny_komfort_sk2" value={formData.subiektywny_komfort_sk2} onChange={handleChange}></textarea>

                        <br />

                        <div className="display-center">
                            <table>
                                <tbody>
                                    <tr>
                                        <td><b>Ocena dopasowania</b></td>
                                        <td><b>OP</b></td>
                                        <td><b>OL</b></td>
                                    </tr>

                                    {ocenaDopasowaniaRows.map((row) => (
                                        <ComfortTable 
                                            key={row.name}
                                            rowName={row.label}
                                            name={row.name}
                                            number={2}
                                            formData={formData}
                                            handleChange={handleChange}
                                        />
                                    ))}

                                </tbody>
                            </table>
                        </div>

                        


                        <div className="button-box">
                            <button onClick={prevStep} className="wroc"><span>Wróć</span></button>
                            <button onClick={nextStep} className="dalej"><span>Dalej</span></button>
                        </div> 
                    </div>
                )}

                {step === 5 && (
                    <div>
                        <h3>Dopadowano</h3>
                        <p>Typ SK</p>
                        <div className="grid-col-three-center">
                            <div>
                                <label htmlFor="nazwa_soczewek_dopasowane">Nazwa: </label>
                                <input type="text" name="nazwa_soczewek_dopasowane" id="nazwa_soczewek_dopasowane" value={formData.nazwa_soczewek_dopasowane} onChange={handleChange} />
                            </div>

                            <div>
                                <label htmlFor="firma_soczewek_dopasowane">Firma: </label>
                                <input type="text" name="firma_soczewek_dopasowane" id="firma_soczewek_dopasowane" value={formData.firma_soczewek_dopasowane} onChange={handleChange} />
                            </div>

                            <div>
                                <label htmlFor="tryb_noszenia_soczewek_dopasowane">Tryb noszenia: </label>
                                <input type="text" name="tryb_noszenia_soczewek_dopasowane" id="tryb_noszenia_soczewek_dopasowane" value={formData.tryb_noszenia_soczewek_dopasowane} onChange={handleChange} />
                            </div>
                        </div>

                        <br />
                        <br />

                        <div className="display-center">
                            <table>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>Sph</td>
                                        <td>cyl</td>
                                        <td>ax</td>
                                        <td>add</td>
                                    </tr>
                                    <tr>
                                        <td><b>OP</b></td>
                                        <td>
                                            <input type="text" name="sph_op" id="sph_op" value={formData.sph_op} onChange={handleChange} />
                                        </td>
                                        <td>
                                            <input type="text" name="cyl_op" id="cyl_op" value={formData.cyl_op} onChange={handleChange} />
                                        </td>
                                        <td>
                                            <input type="text" name="ax_op" id="ax_op" value={formData.ax_op} onChange={handleChange} />
                                        </td>
                                        <td>
                                            <input type="text" name="add_op" id="add_op" value={formData.add_op} onChange={handleChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><b>OL</b></td>
                                        <td>
                                            <input type="text" name="sph_ol" id="sph_ol" value={formData.sph_ol} onChange={handleChange} />
                                        </td>
                                        <td>
                                            <input type="text" name="cyl_ol" id="cyl_ol" value={formData.cyl_ol} onChange={handleChange} />
                                        </td>
                                        <td>
                                            <input type="text" name="ax_ol" id="ax_ol" value={formData.ax_ol} onChange={handleChange} />
                                        </td>
                                        <td>
                                            <input type="text" name="add_ol" id="add_ol" value={formData.add_ol} onChange={handleChange} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                       

                        <div className="button-box">
                            <button onClick={prevStep} className="wroc"><span>Wróć</span></button>
                            <button onClick={() => handleSubmit('lines')} className="dalej"><span>Zapisz</span></button>
                        </div> 
                    </div>

                    
                )}

            </section>
        </div>
    )

}
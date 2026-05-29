import { useEffect, useState } from "react";
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../context/AuthContext'
import { useFormAction, useNavigate } from "react-router-dom";
import prawe from "../../assets/kolo_p.png";
import lewe from "../../assets/kolo_l.png";
import { useFormData } from "../../hooks/useFormData";
import { LogOut, ArrowBigLeft } from "lucide-react";


export default function ChildrenCard(){
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const[visibility, setVisibility] = useState(1)
    const {formData, setFormData, formId, setFormId, handleChange, handleSubmit} = useFormData({
    //step 1
    imie: '',
    nazwisko: '',
    data_urodzenia: '',
    kontakt: '',
    przyczyna_wizyty: '',

    //step 2
    noszenie: '',

    // okulary - bliż
    ocena_komfortu_okul_bliz: '',
    czestotliwosc_bliz: '',
    przyczyna_zdejmowania_bliz: '',

    // okulary - dal
    ocena_komfortu_okul_dal: '',
    czestotliwosc_dal: '',
    przyczyna_zdejmowania_dal: '',

    // okulary - inne
    typ_okularow_inne: '',
    ocena_komfortu_okul_inne: '',
    czestotliwosc_inne: '',
    przyczyna_zdejmowania_inne: '',

    // soczewki
    typ_soczewek1: '',
    ocena_komfortu_socz1: '',
    ocena1: '',
    typ_soczewek2: '',
    ocena_komfortu_socz2: '',
    ocena2: '',
    typ_soczewek3: '',
    ocena_komfortu_socz3: '',
    ocena3: '',

    uwagi: '',

    //step 3
    pierwsza_korekcja: '',
    choroba1: false,
    choroba2: false,
    choroba3: false,
    choroba4: false,
    choroba5: false,
    choroba6: false,
    choroba7: false,
    choroba8: false,
    inne_choroby: '',
    uwagi_chorob: '',

    choroba_ogoln1: false,
    choroba_ogoln2: false,
    choroba_ogoln3: false,
    choroba_ogoln4: false,
    choroba_ogoln5: false,
    choroba_ogoln6: false,
    choroba_ogoln7: false,
    choroba_ogoln8: false,
    choroba_ogoln9: false,
    choroba_ogoln10: false,
    inne_choroby_ogoln: '',
    uwagi_choroby_ogoln: '',
    leki: '',

    // POPRAWKA: była literówka 'rodzenswto'
    rodzenstwo: false,
    rodzice: false,
    dziadkowie: false,

    krotkowzrok: false,
    nadzwrok: false,
    astygmatyzm: false,
    jaskra: false,
    zacma: false,
    inna_rozinna_choroba: '',
    uwagi_rodzinne_choroby: '',
    ostatnia_diagnoza_data: '',
    ostatnia_diagnoza: '',

    //step 4
    oko_dom_dal: '',
    oko_dom_bliz: '',
    dom_reka: '',
    dom_noga: '',

    oczy_notatki: '',

    harmona: '',
    ct_dal1: '',
    ct_bliz1: '',
    pbk1: '',
    uwagi_pbk1: '',
    pbk2: '',
    pbk3: '',
    pbk2_wybor: '',
    pbk3_wybor: '',
    rodzaj_targetu1: '',
    rodzaj_targetu2: '',
    ruch_op1: '',
    ruch_op2: '',
    ruch_op3: '',
    ruch_op4: '',
    ruch_op5: '',
    ruch_op6: '',
    ruch_op7: '',
    ruch_op8: '',
    ruch_ol1: '',
    ruch_ol2: '',
    ruch_ol3: '',
    ruch_ol4: '',
    ruch_ol5: '',
    ruch_ol6: '',
    ruch_ol7: '',
    ruch_ol8: '',
    sledzenie: '',
    sakady: '',
    obserwacje: '',
    wielkosc_p: '',
    wielkosc_l: '',
    bezp_p: '',
    bezp_l: '',
    posr_p: '',
    posr_l: '',
    inne_ocz: '',
    testB: '',
    testH: '',
    ogolne_obs: '',

        // akomodacja
    akomodacja_ospowiedz: '',
    akomodacja_op: '', akomodacja_ol: '', akomodacja_ou: '',
    uwa: '', dwa: '',

    akomodacja_amplituda: '',
    amplituda_op_cm: '', amplituda_op_dptr: '',
    amplituda_ol_cm: '', amplituda_ol_dptr: '',
    amplituda_ou_cm: '', amplituda_ou_dptr: '',
    norma: '',

    fliper_akomodacja_wybor: '+',
    fliper_akomodacja: '',
    fliper_op: '', fliper_op_wybor: 'cykl',
    fliper_ol: '', fliper_ol_wybor: 'cykl',
    fliper_ou: '', fliper_ou_wybor: 'cykl',
    uwagi_akomodacja: '',

    zalecane_konsultacje: '',

    // step 5
    dal_op_sph: '',
    dal_op_cyl: '',
    dal_op_ax: '',
    dal_op_pryzma: '',
    dal_op_baza: '',
    dal_op_pd: '',
    dal_op_visus: '',
    dal_wsp_visus: '',
    dal_wsp_test: '',

    dal_ol_sph: '',
    dal_ol_cyl: '',
    dal_ol_ax: '',
    dal_ol_pryzma: '',
    dal_ol_baza: '',
    dal_ol_pd: '',
    dal_ol_visus: '',
    bliz_visus_ref: '',

    bliz_op_sph: '',
    bliz_op_cyl: '',
    bliz_op_ax: '',
    bliz_op_pryzma: '',
    bliz_op_baza: '',
    bliz_op_pd: '',
    bliz_op_visus: '',
    bliz_wsp_visus: '',
    bliz_wsp_test: '',

    bliz_ol_sph: '',
    bliz_ol_cyl: '',
    bliz_ol_ax: '',
    bliz_ol_pryzma: '',
    bliz_ol_baza: '',
    bliz_ol_pd: '',
    bliz_ol_visus: '',

    cyklopegia: '',
    badanie_refrakcji: '',
    skiaskopia: '',
    skiaskopia_op1: '',
    skiaskopia_op2: '',
    skiaskopia_ol1: '',
    skiaskopia_ol2: '',
    skias_wynik_l: '',
    skias_wynik_p: '',

    // podmiotowe badanie refrakcji
    add_odleglosc: '',
    ref_op_sph: '',
    ref_op_cyl: '',
    ref_op_ax: '',
    ref_op_add: '',
    ref_op_visus_dal: '',
    ref_op_visus_bliz: '',

    ref_ol_sph: '',
    ref_ol_cyl: '',
    ref_ol_ax: '',
    ref_ol_add: '',
    ref_ol_visus_dal: '',
    ref_ol_visus_bliz: '',

    ref_wsp_visus_dal: '',
    ref_wsp_visus_bliz: '',

    // widzenie obuoczne dal
    stereo_dal: '',
    stereo_test_dal: '',
    fuzja_w_dal: '',
    fuzja_s_dal: '',
    metoda_ust_oczu_dal: '',
    horyzontalnie_ust_dal: '',
    // POPRAWKA: pojedyncze pola zamiast hor_bn1_dal/hor_bn2_dal/hor_bn3_dal
    hor_bn_dal: '',
    hor_bs_dal: '',
    vertykalnie_dal: '',
    // POPRAWKA: pojedyncze pola zamiast bg1_op_dal/bg2_op_dal itd.
    bg_op_dal: '',
    bd_op_dal: '',
    bg_ol_dal: '',
    bd_ol_dal: '',
    roznica_fiksacji_dal: '',
    zez_foria_dal: '',
    ac_a_obl_dal: '',
    pct_6_h: '',
    pct_6_v: '',
    zakres_6_bs1: '',
    zakres_6_bs2: '',
    zakres_6_bn1: '',
    zakres_6_bn2: '',
    pct_4_h: '',
    pct_4_v: '',
    zakres_4_bs1: '',
    zakres_4_bs2: '',
    zakres_4_bn1: '',
    zakres_4_bn2: '',

    // widzenie obuoczne bliż
    stereo_bliz: '',
    stereo_test_bliz: '',
    fuzja_w_bliz: '',
    fuzja_s_bliz: '',
    metoda_ust_oczu_bliz: '',
    horyzontalnie_ust_bliz: '',
    // POPRAWKA: pojedyncze pola zamiast hor_bn1_bliz/hor_bn2_bliz/hor_bn3_bliz
    hor_bn_bliz: '',
    hor_bs_bliz: '',
    vertykalnie_bliz: '',
    // POPRAWKA: pojedyncze pola zamiast bg1_op_bliz/bg2_op_bliz itd.
    bg_op_bliz: '',
    bd_op_bliz: '',
    bg_ol_bliz: '',
    bd_ol_bliz: '',
    foria_bliz: '+ 1,0',
    foria_bliz_info: '',
    // POPRAWKA: dodane brakujące pole ac_a_obl
    ac_a_obl: '',
    ac_ag: '',
    roznica_fiksacji_bliz: '',
    fliper: '',
    dal_wergencja: '',
    bliz_wergencja: '',

    // fiksacja
    // POPRAWKA: ujednolicone jako radio groups zamiast osobnych pól op/ol
    korespondencja_siatkowa: '',
    fiksacja_oftalmoskop: '',
    centralna: '',
    ekscentryczna: '',
    stabilna: '',
    niestabilna: '',
    kierunek_ef: '',

    // step 6
    inne_badania: '',
    ostateczna_diagnoza: '',
    zalecenia: '',
    proponowana_korekcja1: '',
    proponowana_korekcja2: '',
    proponowana_korekcja3: '',
    proponowana_korekcja4: '',
    proponowana_korekcja5: '',

    // step 6 - tabela proponowanej korekcji dal
    prop_dal_op_sph: '', prop_dal_op_cyl: '', prop_dal_op_ax: '',
    prop_dal_op_pryzma: '', prop_dal_op_baza: '', prop_dal_op_pd: '',
    prop_dal_ol_sph: '', prop_dal_ol_cyl: '', prop_dal_ol_ax: '',
    prop_dal_ol_pryzma: '', prop_dal_ol_baza: '', prop_dal_ol_pd: '',
    // step 6 - tabela proponowanej korekcji bliż
    prop_bliz_op_sph: '', prop_bliz_op_cyl: '', prop_bliz_op_ax: '',
    prop_bliz_op_pryzma: '', prop_bliz_op_baza: '', prop_bliz_op_pd: '',
    prop_bliz_ol_sph: '', prop_bliz_ol_cyl: '', prop_bliz_ol_ax: '',
    prop_bliz_ol_pryzma: '', prop_bliz_ol_baza: '', prop_bliz_ol_pd: '',
}, 'children')

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

    return(
        <div className="main">
            <button onClick={handleLogOut} className="log-out">
                <LogOut size={15} />
            </button>
            <button onClick={() => navigate('/choose-card')} className='return'>
                <ArrowBigLeft size={15} />
            </button>
            <header className="header">
                <h1>Karta pacjenta - dziecięca</h1>
                <p className="date">Data: {CurrentDate()}</p>
            </header>

            <section className="glass-card">

            <div className="progress-bar-wrapper">
                {[1, 2, 3, 4, 5, 6].map((s) => (
                    <div key={s} className="progress-step">
                        <div className={`progress-circle ${step >= s ? 'active' : ''}`}>
                            {step > s ? '✓' : s}
                        </div>
                        {s < 6 && <div className={`progress-line ${step > s ? 'active' : ''}`}/>}
                    </div>
                ))}
            </div>

            <form onSubmit={(e) => e.preventDefault()}>

                <div className={`step-content ${visibility ? 'visible' : ''}`}>
                    {step === 1 && (
                        <div>
                            <h3>Danne pacjenta: </h3>
                            <div className="form-grid">
                                <label htmlFor="imie">Imię</label>
                                <input type="text" id="imie" name="imie" value={formData.imie} onChange={handleChange}/>


                                <label htmlFor="nazwisko">Nazwisko</label>
                                <input type="text" id="nazwisko" name="nazwisko" value={formData.nazwisko} onChange={handleChange}/>

                                <label htmlFor="data_urodzenia">Data urodzenia</label>
                                <input type="date" id="data_urodzenia" name="data_urodzenia" value={formData.data_urodzenia} onChange={handleChange}/>

                                <label htmlFor="kontakt">Kontakt</label>
                                <input type="text" id="kontakt" name="kontakt" value={formData.kontakt} onChange={handleChange}/>
                            </div>
                            <br />

                            <label htmlFor="przyczyna_wizyty">Przyczyna wizyty:</label><br />
                            <textarea name="przyczyna_wizyty" id="przyczyna_wizyty" value={formData.przyczyna_wizyty} onChange={handleChange}></textarea>

                            
                            <br />

                            <div className="button-box">
                                <button onClick={() => navigate(`/choose-card`)} className="wroc"><span>Wróć</span></button>
                                <button onClick={nextStep} className="dalej"><span>Dalej</span></button>
                            </div>
                            
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <h3>Noszone są: </h3>

                            <div className="grid-col-two-center">
                                <div className="okulary">
                                    <input type="radio" name="noszenie" id="okulary" value="okulary" checked={formData.noszenie === 'okulary'}onChange={handleChange}/> 
                                    <label htmlFor="okulary">Okulary</label>
                                </div>

                                <div className="soczewki">
                                    <input type="radio" name="noszenie" id="soczewki" value="soczewki" checked={formData.noszenie === 'soczewki'} onChange={handleChange}/>
                                    <label htmlFor="soczewki">Soczewki kontaktowe</label>
                                </div>
                            </div>

                            <br />
                            <br />

                            <div className={`animated-section ${formData.noszenie === 'okulary' ? 'visible_section' : ''}`}>

                                <div>
                                    <p className="center not-bold">Typ okularów: <b>BLIŻ</b></p>

                                    <br />

                                    <div className="grid-col-two-center">

                                        <div className="comfort-input">
                                            <input type="radio" name="ocena_komfortu_okul_bliz" id="ocena_komfortu_okul_bliz1" value="komfort" checked={formData.ocena_komfortu_okul_bliz === 'komfort'} onChange={handleChange}/>
                                            <label htmlFor="ocena_komfortu_okul_bliz1">Komfort</label>
                                        </div>
                                                                    
                                        <div className="no-comfort-input">
                                            <input type="radio" name="ocena_komfortu_okul_bliz" id="ocena_komfortu_okul_bliz2" value="brak_komfortu" checked={formData.ocena_komfortu_okul_bliz === 'brak_komfortu'} onChange={handleChange} />
                                            <label htmlFor="ocena_komfortu_okul_bliz2">Brak komfortu</label>
                                        </div>
                                    </div>

                                    <br />
                                    

                                    <p className="center not-bold">Okulary są noszone: </p>

                                    <div className="grid-col-two-center">
                                        <div>
                                            <input type="radio" name="czestotliwosc_bliz" id="stale_bliz" value="stale" checked={formData.czestotliwosc_bliz === 'stale'} onChange={handleChange}/>
                                            <label htmlFor="stale_bliz">Stale</label>
                                        </div>

                                        <div>
                                            <input type="radio" name="czestotliwosc_bliz" 
                                            id="okresowo_bliz" value="okresowo" checked={formData.czestotliwosc_bliz === 'okresowo'} onChange={handleChange}/>
                                            <label htmlFor="okresowo_bliz">Okresowo</label>
                                        </div>
                                    </div>

                                    
                                    <div className={`fade-in ${formData.czestotliwosc_bliz === 'okresowo' ? 'visible' : ''}`}>
                                        <label htmlFor="przyczyna_zdejmowania_bliz">Przyczyna zdejmowania: </label>
                                        <textarea name="przyczyna_zdejmowania_bliz" id="przyczyna_zdejmowania_bliz" value={formData.przyczyna_zdejmowania_bliz} onChange={handleChange}></textarea>

                                        <br />
                                    </div>
                                
                                </div>

                                <div className="extra-top-border">
                                    <br />

                                    <p className="center not-bold">Typ okularów: <b>DAL</b></p>

                                    <br />

                                    <div className="grid-col-two-center">

                                        <div className="comfort-input">
                                            <input type="radio" name="ocena_komfortu_okul_dal" id="ocena_komfortu_okul_dal1" value="komfort" checked={formData.ocena_komfortu_okul_dal === 'komfort'} onChange={handleChange}/>
                                            <label htmlFor="ocena_komfortu_okul_dal1">Komfort</label>
                                        </div>
                                                                    
                                        <div className="no-comfort-input">
                                            <input type="radio" name="ocena_komfortu_okul_dal" id="ocena_komfortu_okul_dal2" value="brak_komfortu" checked={formData.ocena_komfortu_okul_dal === 'brak_komfortu'} onChange={handleChange} />
                                            <label htmlFor="ocena_komfortu_okul_dal2">Brak komfortu</label>
                                        </div>
                                    </div>

                                    <br />                                    

                                    <p className="center not-bold">Okulary są noszone: </p>

                                    <div className="grid-col-two-center">
                                        <div>
                                            <input type="radio" name="czestotliwosc_dal" id="stale_dal" value="stale" checked={formData.czestotliwosc_dal === 'stale'} onChange={handleChange}/>
                                            <label htmlFor="stale_dal">Stale</label>
                                        </div>

                                        <div>
                                            <input type="radio" name="czestotliwosc_dal" 
                                            id="okresowo_dal" value="okresowo" checked={formData.czestotliwosc_dal === 'okresowo'} onChange={handleChange}/>
                                            <label htmlFor="okresowo_dal">Okresowo</label>
                                        </div>
                                    </div>

                                    <div className={`fade-in ${formData.czestotliwosc_dal === 'okresowo' ? 'visible' : ''}`}>
                                        <label htmlFor="przyczyna_zdejmowania_dal">Przyczyna zdejmowania: </label>
                                        <textarea name="przyczyna_zdejmowania_dal" id="przyczyna_zdejmowania_dal" value={formData.przyczyna_zdejmowania_dal} onChange={handleChange}></textarea>

                                        <br />
                                    </div>
                                    
                                </div>

                                <div className="extra-top-border">
                                      <br />

                                    <div className="display-center">
                                        <label htmlFor="typ_okularow_inne" >Typ okularów: </label>
                                        <input type="text" name="typ_okularow_inne" id="typ_okularow_inne" value={formData.typ_okularow_inne} onChange={handleChange} />
                                    </div>

                                    <br />

                                    <div className="grid-col-two-center">

                                        <div className="comfort-input">
                                            <input type="radio" name="ocena_komfortu_okul_inne" id="ocena_komfortu_okul_inne1" value="komfort" checked={formData.ocena_komfortu_okul_inne === 'komfort'} onChange={handleChange}/>
                                            <label htmlFor="ocena_komfortu_okul_inne1">Komfort</label>
                                        </div>
                                                                    
                                        <div className="no-comfort-input">
                                            <input type="radio" name="ocena_komfortu_okul_inne" id="ocena_komfortu_okul_inne2" value="brak_komfortu" checked={formData.ocena_komfortu_okul_inne === 'brak_komfortu'} onChange={handleChange} />
                                            <label htmlFor="ocena_komfortu_okul_inne2">Brak komfortu</label>
                                        </div>
                                    </div>

                                    <br />                                    

                                    <p className="center not-bold">Okulary są noszone: </p>

                                    <div className="grid-col-two-center">
                                        <div>
                                            <input type="radio" name="czestotliwosc_inne" id="stale_inne" value="stale" checked={formData.czestotliwosc_inne === 'stale'} onChange={handleChange}/>
                                            <label htmlFor="stale_inne">Stale</label>
                                        </div>

                                        <div>
                                            <input type="radio" name="czestotliwosc_inne" 
                                            id="okresowo_inne" value="okresowo" checked={formData.czestotliwosc_inne === 'okresowo'} onChange={handleChange}/>
                                            <label htmlFor="okresowo_inne">Okresowo</label>
                                        </div>
                                    </div>

                                    <div className={`fade-in ${formData.czestotliwosc_inne === 'okresowo' ? 'visible' : ''}`}>
                                        <label htmlFor="przyczyna_zdejmowania_inne">Przyczyna zdejmowania: </label>
                                        <textarea name="przyczyna_zdejmowania_inne" id="przyczyna_zdejmowania_inne" value={formData.przyczyna_zdejmowania_inne} onChange={handleChange}></textarea>

                                        <br />
                                    </div>
                                
                                </div>
                                
                            </div>{/* animated section div */}


                            <div className={`animated-section ${formData.noszenie === 'soczewki' ? 'visible_section' : ''}`}>

                                <div>
                                    <label htmlFor="typ_soczewek1">Typ s.k. </label>
                                    <input type="text" className="long-input" name="typ_soczewek1" id="typ_soczewek1" value={formData.typ_soczewek1} onChange={handleChange}/>
                                

                                    <br />

                                    <div className="grid-col-three">

                                        <div className="comfort-input">
                                            <input type="radio" name="ocena_komfortu_socz1" id="ocena_komfortu_socz1_komfort" value="komfort" checked={formData.ocena_komfortu_socz1 === 'komfort'} onChange={handleChange}/>
                                            <label htmlFor="ocena_komfortu_socz1_komfort">Komfort</label>
                                        </div>
                                                                    
                                        <div className="no-comfort-input">
                                            <input type="radio" name="ocena_komfortu_socz1" id="ocena_komfortu_socz1_niekomfort" value="brak_komfortu" checked={formData.ocena_komfortu_socz1 === 'brak_komfortu'} onChange={handleChange}/>
                                            <label htmlFor="ocena_komfortu_socz1_niekomfort">Brak komfortu</label>
                                        </div>

                                        <div className="ocena">
                                            <input type="number" name="ocena1" id="ocena1" 
                                            min="1" 
                                            step="1" value={formData.ocena1} onChange={handleChange}/>
                                            <label htmlFor="ocena1">/10p</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="extra-top-border">
                                    <br />
                                    <label htmlFor="typ_soczewek2">Typ s.k. </label>
                                    <input type="text" className="long-input" name="typ_soczewek2" id="typ_soczewek2" value={formData.typ_soczewek2} onChange={handleChange}/>
                                

                                    <br />

                                    <div className="grid-col-three">

                                        <div className="comfort-input">
                                            <input type="radio" name="ocena_komfortu_socz2" id="ocena_komfortu_socz2_komfort" value="komfort" checked={formData.ocena_komfortu_socz2 === 'komfort'} onChange={handleChange}/>
                                            <label htmlFor="ocena_komfortu_socz2_komfort">Komfort</label>
                                        </div>
                                                                    
                                        <div className="no-comfort-input">
                                            <input type="radio" name="ocena_komfortu_socz2" id="ocena_komfortu_socz2_niekomfort" value="brak_komfortu" checked={formData.ocena_komfortu_socz2 === 'brak_komfortu'} onChange={handleChange}/>
                                            <label htmlFor="ocena_komfortu_socz2_niekomfort">Brak komfortu</label>
                                        </div>

                                        <div className="ocena">
                                            <input type="number" name="ocena2" id="ocena2" 
                                            min="1" 
                                            step="1" value={formData.ocena2} onChange={handleChange}/>
                                            <label htmlFor="ocena2">/10p</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="extra-top-border"> 
                                    <br />
                                    <label htmlFor="typ_soczewek3">Typ s.k. </label>
                                    <input className="long-input" type="text" name="typ_soczewek3" id="typ_soczewek3" value={formData.typ_soczewek3} onChange={handleChange}/>
                                
                                    <br />

                                    <div className="grid-col-three">

                                        <div className="comfort-input">
                                            <input type="radio" name="ocena_komfortu_socz3" id="ocena_komfortu_socz3_komfort" value="komfort" checked={formData.ocena_komfortu_socz3 === 'komfort'} onChange={handleChange}/>
                                            <label htmlFor="ocena_komfortu_socz3_komfort">Komfort</label>
                                        </div>
                                                                    
                                        <div className="no-comfort-input">
                                            <input type="radio" name="ocena_komfortu_socz3" id="ocena_komfortu_socz3_niekomfort" value="brak_komfortu" checked={formData.ocena_komfortu_socz3 === 'brak_komfortu'} onChange={handleChange}/>
                                            <label htmlFor="ocena_komfortu_socz3_niekomfort">Brak komfortu</label>
                                        </div>

                                        <div className="ocena">
                                            <input type="number" name="ocena3" id="ocena3" 
                                            min="1" 
                                            step="1" value={formData.ocena3} onChange={handleChange}/>
                                            <label htmlFor="ocena3">/10p</label>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                                
                            <label htmlFor="uwagi">Uwagi: </label>
                            <textarea name="uwagi" id="uwagi" value={formData.uwagi} onChange={handleChange}></textarea>

                            <div className="button-box">
                                <button onClick={prevStep} className="wroc"><span>Wróć</span></button>
                                <button onClick={nextStep} className="dalej"><span>Dalej</span></button>
                            </div>                            
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <br />
                            <label htmlFor="pierwsza_korekcja">W którym roku życia stwierdzono wadę wzroku/pierwsza korekcja: </label>
                            <input type="text" name="pierwsza_korekcja" id="pierwsza_korekcja" value={formData.pierwsza_korekcja} onChange={handleChange}/>

                            <br />
                            <br />

                            <p className="center">Choroby oczu \ leczenie:</p>
                            <div className="grid-col-two-center">
                                <div>  
                                    <input type="checkbox" name="choroba1" id="choroba1" checked={formData.choroba1} onChange={handleChange}/>
                                    <label htmlFor="choroba1">Infekcje</label>
                                    <br />

                                    <input type="checkbox" name="choroba2" id="choroba2" checked={formData.choroba2} onChange={handleChange}/>
                                    <label htmlFor="choroba2">Zapalenie spojówek</label>
                                    <br />

                                    <input type="checkbox" name="choroba3" id="choroba3" checked={formData.choroba3} onChange={handleChange}/>
                                    <label htmlFor="choroba3">Syndrom suchego oka</label>
                                    <br />

                                    <input type="checkbox" name="choroba4" id="choroba4" checked={formData.choroba4} onChange={handleChange}/>
                                    <label htmlFor="choroba4">Zmętnienia ośrodków opt</label>
                                    <br />
                                </div>

                                <div>
                                    <input type="checkbox" name="choroba5" id="choroba5" checked={formData.choroba5} onChange={handleChange}/>
                                    <label htmlFor="choroba5">Urazy mechaniczne</label>
                                    <br />

                                    <input type="checkbox" name="choroba6" id="choroba6" checked={formData.choroba6} onChange={handleChange}/>
                                    <label htmlFor="choroba6">Zaburzenia funkcji powiek</label>
                                    <br />

                                    <input type="checkbox" name="choroba7" id="choroba7" checked={formData.choroba7} onChange={handleChange}/>
                                    <label htmlFor="choroba7">Jaskra</label>
                                    <br />

                                    <input type="checkbox" name="choroba8" id="choroba8" checked={formData.choroba8} onChange={handleChange}/>
                                    <label htmlFor="choroba8">Zaćma</label>
                                    <br />
                                </div>
                            </div>

                            <br />

                            <label htmlFor="inne_choroby">Inne: </label>
                            <input type="text" className="long-input" name="inne_choroby" id="inne_choroby" value={formData.inne_choroby} onChange={handleChange}/>
                            <br />
                            
                            <label htmlFor="uwagi_chorob">Uwagi: </label><br />
                            <textarea name="uwagi_chorob" id="uwagi_chorob" value={formData.uwagi_chorob} onChange={handleChange}></textarea>
                            <br />

                            <br />

                            <p className="center">Choroby ogólnoustrojowe: </p>

                            <div className="grid-col-two-center">
                                <div>
                                    <input type="checkbox" name="choroba_ogoln1" id="choroba_ogoln1" checked={formData.choroba_ogoln1} onChange={handleChange}/>
                                    <label htmlFor="choroba_ogoln1">Cukrzyca</label>
                                    <br />

                                    <input type="checkbox" name="choroba_ogoln2" id="choroba_ogoln2" checked={formData.choroba_ogoln2} onChange={handleChange}/>
                                    <label htmlFor="choroba_ogoln2">Nadcisnienie</label>
                                    <br />

                                    <input type="checkbox" name="choroba_ogoln3" id="choroba_ogoln3" checked={formData.choroba_ogoln3} onChange={handleChange}/>
                                    <label htmlFor="choroba_ogoln3">Choroby serca i krążenia</label>
                                    <br />

                                    <input type="checkbox" name="choroba_ogoln4" id="choroba_ogoln4" checked={formData.choroba_ogoln4} onChange={handleChange}/>
                                    <label htmlFor="choroba_ogoln4">Choroby endokrynologiczne</label>
                                    <br />

                                    <input type="checkbox" name="choroba_ogoln5" id="choroba_ogoln5" checked={formData.choroba_ogoln5} onChange={handleChange}/>
                                    <label htmlFor="choroba_ogoln5">Choroby reumatyczne</label>
                                </div>

                                <div>
                                    <input type="checkbox" name="choroba_ogoln6" id="choroba_ogoln6" checked={formData.choroba_ogoln6} onChange={handleChange}/>
                                    <label htmlFor="choroba_ogoln6">Choroby układu oddechowego</label>
                                    <br />

                                    <input type="checkbox" name="choroba_ogoln7" id="choroba_ogoln7" checked={formData.choroba_ogoln7} onChange={handleChange}/>
                                    <label htmlFor="choroba_ogoln7">Choroby układu pokarmowego</label>
                                    <br />

                                    <input type="checkbox" name="choroba_ogoln8" id="choroba_ogoln8" checked={formData.choroba_ogoln8} onChange={handleChange}/>
                                    <label htmlFor="choroba_ogoln8">Choroby neurologiczne</label>
                                    <br />

                                    <input type="checkbox" name="choroba_ogoln9" id="choroba_ogoln9" checked={formData.choroba_ogoln9} onChange={handleChange}/>
                                    <label htmlFor="choroba_ogoln9">Choroby układu ruchowego</label>
                                    <br />

                                    <input type="checkbox" name="choroba_ogoln10" id="choroba_ogoln10" checked={formData.choroba_ogoln10} onChange={handleChange}/>
                                    <label htmlFor="choroba_ogoln10">Alergie</label>
                                </div>
                            </div>

                            <br />
                            
                            <label htmlFor="inne_choroby_ogoln">Inne: </label>
                            <input type="text" className="long-input" name="inne_choroby_ogoln" id="inne_choroby_ogoln" value={formData.inne_choroby_ogoln} onChange={handleChange}/>
                            <br />
                            
                            <label htmlFor="uwagi_choroby_ogoln">Uwagi: </label>
                            <textarea name="uwagi_choroby_ogoln" id="uwagi_choroby_ogoln" value={formData.uwagi_choroby_ogoln} onChange={handleChange}></textarea>

                            <br />

                            <label htmlFor="leki">Przyjmowane leki</label>
                            <textarea name="leki" id="leki"  value={formData.leki} onChange={handleChange}></textarea>
                            
                            <br />
                            <br />

                            <p className="center">Choroby oczu/ zaburzenia widzenia w rodzinie</p>
                            <br />

                            <div className="rodzina-box">
                                <div>
                                    <input type="checkbox" name="rodzenstwo" id="rodzenstwo" value="rodzenstwo" checked={formData.rodzenstwo} onChange={handleChange}/>
                                    <label htmlFor="rodzenstwo">Rodzeństwo</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="rodzice" id="rodzice" value="rodzice" checked={formData.rodzice} onChange={handleChange}/>
                                    <label htmlFor="rodzice">Rodzice</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="dziadkowie" id="dziadkowie" value="dziadkowie" checked={formData.dziadkowie} onChange={handleChange}/>
                                    <label htmlFor="dziadkowie">Dziadkowie</label>
                                </div> 
                            </div>

                            <br />

                            <div className="grid-col-three-center">
                                <div>
                                    <input type="checkbox" name="krotkowzrok" id="krotkowzrok" checked={formData.krotkowzrok} onChange={handleChange}/>
                                    <label htmlFor="krotkowzrok">Krótkowzrok</label>
                                    <br />

                                    <input type="checkbox" name="nadzwrok" id="nadzwrok" checked={formData.nadzwrok} onChange={handleChange}/>
                                    <label htmlFor="nadzwrok">Nadwzrok</label>
                                    <br />
                                </div>

                                <div>
                                    <input type="checkbox" name="astygmatyzm" id="astygmatyzm" checked={formData.astygmatyzm} onChange={handleChange}/>
                                    <label htmlFor="astygmatyzm">Astygmatyzm</label>
                                    <br />
                                    
                                    <input type="checkbox" name="jaskra" id="jaskra" checked={formData.jaskra} onChange={handleChange}/>
                                    <label htmlFor="jaskra">Jaskra</label>
                                    <br />
                                </div>

                                <div>
                                    <input type="checkbox" name="zacma" id="zacma" checked={formData.zacma} onChange={handleChange}/>
                                    <label htmlFor="zacma">Zaćma</label>
                                    <br />
                                </div>
                                
                            </div>
                        
                            <br />

                            <label htmlFor="inna_rozinna_choroba ">Inne: </label>
                            <input type="text" className="long-input" name="inna_rozinna_choroba" id="inna_rozinna_choroba" value={formData.inna_rozinna_choroba} onChange={handleChange}/>
                            <br />
                            
                            <label htmlFor="uwagi_rodzinne_choroby">Uwagi: </label>
                            <textarea name="uwagi_rodzinne_choroby" id="uwagi_rodzinne_choroby" value={formData.uwagi_rodzinne_choroby} onChange={handleChange}></textarea>

                            <br />
                            <br />

                            <label htmlFor="ostatnia_diagnoza">Data i diagnoza ostatnich badań: </label>
                            <input type="date" name="ostatnia_diagnoza_data" id="ostatnia_diagnoza_data" value={formData.ostatnia_diagnoza_data} onChange={handleChange}/>
                            <textarea name="ostatnia_diagnoza" id="ostatnia_diagnoza" value={formData.ostatnia_diagnoza} onChange={handleChange}></textarea>

                            <div className="button-box">
                                <button onClick={prevStep} className="wroc"><span>Wróć</span></button>
                                <button onClick={nextStep} className="dalej"><span>Dalej</span></button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div>
                            <h3>Badanie wstępne i orientacyjne</h3>

                            <div className="grid-col-two-center">
                                <div className="badania-width">
                                    <p className="p-badania">Oko dominujące:</p>
                                    <div className="grid-col-two-center-rev">
                                        <div className="dal">
                                            <p>Dal</p>
                                            <input type="radio" name="oko_dom_dal" id="oko_dom_dal1" value="oko_dom_dal1" checked={formData.oko_dom_dal === "oko_dom_dal1"} onChange={handleChange}/>
                                            <label htmlFor="oko_dom_dal1">Prawe</label>
                                            <input type="radio" name="oko_dom_dal" id="oko_dom_dal2" value="oko_dom_dal2" checked={formData.oko_dom_dal === "oko_dom_dal2"} onChange={handleChange}/>
                                            <label htmlFor="oko_dom_dal2">Lewe</label>
                                            <input type="radio" name="oko_dom_dal" id="oko_dom_dal3" value="oko_dom_dal3" checked={formData.oko_dom_dal === "oko_dom_dal3"} onChange={handleChange}/>
                                            <label htmlFor="oko_dom_dal3">Nieustalone</label>
                                        </div>
                                        <div className="bliz">
                                            <p>Bliż</p>

                                            <input 
                                                type="radio" 
                                                name="oko_dom_bliz" id="oko_dom_bliz1" value="oko_dom_bliz1" 
                                                checked={formData.oko_dom_bliz === "oko_dom_bliz1"} 
                                                onChange={handleChange}/>
                                            <label htmlFor="oko_dom_bliz1">Prawe</label>

                                            <input 
                                                type="radio" 
                                                name="oko_dom_bliz" id="oko_dom_bliz2" value="oko_dom_bliz2" 
                                                checked={formData.oko_dom_bliz === "oko_dom_bliz2"} 
                                                onChange={handleChange}/>
                                            <label htmlFor="oko_dom_bliz2">Lewe</label>

                                            <input 
                                                type="radio" 
                                                name="oko_dom_bliz" id="oko_dom_bliz3" value="oko_dom_bliz3" 
                                                checked={formData.oko_dom_bliz === "oko_dom_bliz3"} 
                                                onChange={handleChange}/>
                                            <label htmlFor="oko_dom_bliz3">Nieustalone</label>
                                        </div>

                                    </div>
                                </div>
                                    <div className="badania-width">
                                        <p className="p-badania">Ręka i noga dominująca:</p>

                                            <div className="grid-col-two-center-rev">
                                                <div className="reka">
                                                    <p>Ręka</p>
                                                    <input 
                                                        type="radio" 
                                                        name="dom_reka" 
                                                        id="dom_reka1" 
                                                        value="dom_reka1" 
                                                        checked={formData.dom_reka === "dom_reka1"} 
                                                        onChange={handleChange}/>
                                                    <label htmlFor="dom_reka1">Prawa</label>
                                                    <input 
                                                        type="radio" 
                                                        name="dom_reka" 
                                                        id="dom_reka2" 
                                                        value="dom_reka2" 
                                                        checked={formData.dom_reka === "dom_reka2"}
                                                        onChange={handleChange} />
                                                    <label htmlFor="dom_reka2">Lewa</label>

                                                    <input 
                                                        type="radio" 
                                                        name="dom_reka" 
                                                        id="dom_reka3" 
                                                        value="dom_reka3" 
                                                        checked={formData.dom_reka === "dom_reka3"}
                                                        onChange={handleChange} />
                                                    <label htmlFor="dom_reka3">Nieustalone</label>
                                                </div>

                                                <div>
                                                    <div className="noga">
                                                        <p>Noga</p>
                                                        <input 
                                                            type="radio" 
                                                            name="dom_noga" 
                                                            id="dom_noga1" 
                                                            value="dom_noga1" 
                                                            checked={formData.dom_noga === "dom_noga1"}
                                                            onChange={handleChange} />
                                                        <label htmlFor="dom_noga1">Prawa</label>

                                                        <input 
                                                            type="radio" 
                                                            name="dom_noga" 
                                                            id="dom_noga2"
                                                            value="dom_noga2" 
                                                            checked={formData.dom_noga === "dom_noga2"} 
                                                            onChange={handleChange}/>
                                                        <label htmlFor="dom_noga2">Lewa</label>

                                                        <input 
                                                            type="radio" 
                                                            name="dom_noga" 
                                                            id="dom_noga3"
                                                            value="dom_noga3" 
                                                            checked={formData.dom_noga === "dom_noga3"} 
                                                            onChange={handleChange}/>
                                                        <label htmlFor="dom_noga3">Nieustalone</label>
                                                    </div>
                                                </div>

                                            </div>
                                    </div>
                            </div>

                            <br />
                            <br />

                            <div className="center">
                                <label htmlFor="harmona">Odległość Harmona: </label>
                                <input type="text" name="harmona" id="harmona" value={formData.harmona} onChange={handleChange}/>
                            </div>

                            
                            <br />
                            <br />
                            

                            <div className="grid-col-two-center">

                                <div>
                                    <h3>CT / PCT</h3>
                                    <div className="badania-width">
                                        <label htmlFor="ct_dal1">Dal: </label>
                                        <input type="text" name="ct_dal1" id="ct_dal1" value={formData.ct_dal1} onChange={handleChange}/><br />

                                        <label htmlFor="ct_bliz1">Bliż: </label>
                                        <input type="text" name="ct_bliz1" id="ct_bliz1" value={formData.ct_bliz1} onChange={handleChange}/>
                                    </div>
                                </div>
                                <div>
                                    <h3 id="pbk-name">PBK</h3>
                                    <div className="grid-col-two-center">
                                        <div>
                                            <label htmlFor="pbk1">Pomiary: </label>
                                            <textarea name="pbk1" id="pbk1" value={formData.pbk1} onChange={handleChange}/>                                            
                                        </div>
                                        <div>
                                            <label htmlFor="uwagi_pbk1">Uwagi: </label>
                                            <textarea name="uwagi_pbk1" id="uwagi_pbk1" value={formData.uwagi_pbk1} onChange={handleChange}></textarea>
                                        </div>
                                    </div>
                                </div>
                                

                            </div>

                            <br />
                            
                            <h3 className="center">Ruch oczu</h3>

                            <div className="gwiazdy-container grid-col-two">
                                {/* OL */}
                                <div>
                                    <p className="gwiazda-label">OL</p>
                                    <div className="gwiazda">

                                        <div className="kreska" style={{ transform: "rotate(0deg)" }}>
                                            <div className="select-wrap" style={{ transform: "translateY(-50%) rotate(0deg)" }}>
                                                <select name="ruch_ol1" value={formData.ruch_ol1} onChange={handleChange}>
                                                    <option value="++">++</option>
                                                    <option value="+">+</option>
                                                    <option value="(+)">(+)</option>
                                                    <option value="-">-</option>
                                                    <option value="(-)">(-)</option>
                                                    <option value="--">--</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="kreska" style={{ transform: "rotate(45deg)" }}>
                                            <div className="select-wrap" style={{ transform: "translateY(-50%) rotate(-45deg)" }}>
                                                <select name="ruch_ol2" value={formData.ruch_ol2} onChange={handleChange}>
                                                    <option value="++">++</option>
                                                    <option value="+">+</option>
                                                    <option value="(+)">(+)</option>
                                                    <option value="-">-</option>
                                                    <option value="(-)">(-)</option>
                                                    <option value="--">--</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="kreska" style={{ transform: "rotate(90deg)" }}>
                                            <div className="select-wrap" style={{ transform: "translateY(-50%) rotate(-90deg)" }}>
                                                <select name="ruch_ol3" value={formData.ruch_ol3} onChange={handleChange}>
                                                    <option value="++">++</option>
                                                    <option value="+">+</option>
                                                    <option value="(+)">(+)</option>
                                                    <option value="-">-</option>
                                                    <option value="(-)">(-)</option>
                                                    <option value="--">--</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="kreska" style={{ transform: "rotate(135deg)" }}>
                                            <div className="select-wrap" style={{ transform: "translateY(-50%) rotate(-135deg)" }}>
                                                <select name="ruch_ol4" value={formData.ruch_ol4} onChange={handleChange}>
                                                    <option value="++">++</option>
                                                    <option value="+">+</option>
                                                    <option value="(+)">(+)</option>
                                                    <option value="-">-</option>
                                                    <option value="(-)">(-)</option>
                                                    <option value="--">--</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="kreska" style={{ transform: "rotate(180deg)" }}>
                                            <div className="select-wrap" style={{ transform: "translateY(-50%) rotate(-180deg)" }}>
                                                <select name="ruch_ol5" value={formData.ruch_ol5} onChange={handleChange}>
                                                    <option value="++">++</option>
                                                    <option value="+">+</option>
                                                    <option value="(+)">(+)</option>
                                                    <option value="-">-</option>
                                                    <option value="(-)">(-)</option>
                                                    <option value="--">--</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="kreska" style={{ transform: "rotate(225deg)" }}>
                                            <div className="select-wrap" style={{ transform: "translateY(-50%) rotate(-225deg)" }}>
                                                <select name="ruch_ol6" value={formData.ruch_ol6} onChange={handleChange}>
                                                    <option value="++">++</option>
                                                    <option value="+">+</option>
                                                    <option value="(+)">(+)</option>
                                                    <option value="-">-</option>
                                                    <option value="(-)">(-)</option>
                                                    <option value="--">--</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="kreska" style={{ transform: "rotate(270deg)" }}>
                                            <div className="select-wrap" style={{ transform: "translateY(-50%) rotate(-270deg)" }}>
                                                <select name="ruch_ol7" value={formData.ruch_ol7} onChange={handleChange}>
                                                    <option value="++">++</option>
                                                    <option value="+">+</option>
                                                    <option value="(+)">(+)</option>
                                                    <option value="-">-</option>
                                                    <option value="(-)">(-)</option>
                                                    <option value="--">--</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="kreska" style={{ transform: "rotate(315deg)" }}>
                                            <div className="select-wrap" style={{ transform: "translateY(-50%) rotate(-315deg)" }}>
                                                <select name="ruch_ol8" value={formData.ruch_ol8} onChange={handleChange}>
                                                    <option value="++">++</option>
                                                    <option value="+">+</option>
                                                    <option value="(+)">(+)</option>
                                                    <option value="-">-</option>
                                                    <option value="(-)">(-)</option>
                                                    <option value="--">--</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                {/* OP */}
                                <div className="gwiazda-margin">
                                    <p className="gwiazda-label">OP</p>
                                    <div className="gwiazda">

                                        <div className="kreska" style={{ transform: "rotate(0deg)" }}>
                                            <div className="select-wrap" style={{ transform: "translateY(-50%) rotate(0deg)" }}>
                                                <select name="ruch_op1" value={formData.ruch_op1} onChange={handleChange}>
                                                    <option value="++">++</option>
                                                    <option value="+">+</option>
                                                    <option value="(+)">(+)</option>
                                                    <option value="-">-</option>
                                                    <option value="(-)">(-)</option>
                                                    <option value="--">--</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="kreska" style={{ transform: "rotate(45deg)" }}>
                                            <div className="select-wrap" style={{ transform: "translateY(-50%) rotate(-45deg)" }}>
                                                <select name="ruch_op2" value={formData.ruch_op2} onChange={handleChange}>
                                                    <option value="++">++</option>
                                                    <option value="+">+</option>
                                                    <option value="(+)">(+)</option>
                                                    <option value="-">-</option>
                                                    <option value="(-)">(-)</option>
                                                    <option value="--">--</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="kreska" style={{ transform: "rotate(90deg)" }}>
                                            <div className="select-wrap" style={{ transform: "translateY(-50%) rotate(-90deg)" }}>
                                                <select name="ruch_op3" value={formData.ruch_op3} onChange={handleChange}>
                                                    <option value="++">++</option>
                                                    <option value="+">+</option>
                                                    <option value="(+)">(+)</option>
                                                    <option value="-">-</option>
                                                    <option value="(-)">(-)</option>
                                                    <option value="--">--</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="kreska" style={{ transform: "rotate(135deg)" }}>
                                            <div className="select-wrap" style={{ transform: "translateY(-50%) rotate(-135deg)" }}>
                                                <select name="ruch_op4" value={formData.ruch_op4} onChange={handleChange}>
                                                    <option value="++">++</option>
                                                    <option value="+">+</option>
                                                    <option value="(+)">(+)</option>
                                                    <option value="-">-</option>
                                                    <option value="(-)">(-)</option>
                                                    <option value="--">--</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="kreska" style={{ transform: "rotate(180deg)" }}>
                                            <div className="select-wrap" style={{ transform: "translateY(-50%) rotate(-180deg)" }}>
                                                <select name="ruch_op5" value={formData.ruch_op5} onChange={handleChange}>
                                                    <option value="++">++</option>
                                                    <option value="+">+</option>
                                                    <option value="(+)">(+)</option>
                                                    <option value="-">-</option>
                                                    <option value="(-)">(-)</option>
                                                    <option value="--">--</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="kreska" style={{ transform: "rotate(225deg)" }}>
                                            <div className="select-wrap" style={{ transform: "translateY(-50%) rotate(-225deg)" }}>
                                                <select name="ruch_op6" value={formData.ruch_op6} onChange={handleChange}>
                                                    <option value="++">++</option>
                                                    <option value="+">+</option>
                                                    <option value="(+)">(+)</option>
                                                    <option value="-">-</option>
                                                    <option value="(-)">(-)</option>
                                                    <option value="--">--</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="kreska" style={{ transform: "rotate(270deg)" }}>
                                            <div className="select-wrap" style={{ transform: "translateY(-50%) rotate(-270deg)" }}>
                                                <select name="ruch_op7" value={formData.ruch_op7} onChange={handleChange}>
                                                    <option value="++">++</option>
                                                    <option value="+">+</option>
                                                    <option value="(+)">(+)</option>
                                                    <option value="-">-</option>
                                                    <option value="(-)">(-)</option>
                                                    <option value="--">--</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="kreska" style={{ transform: "rotate(315deg)" }}>
                                            <div className="select-wrap" style={{ transform: "translateY(-50%) rotate(-315deg)" }}>
                                                <select name="ruch_op8" value={formData.ruch_op8} onChange={handleChange}>
                                                    <option value="++">++</option>
                                                    <option value="+">+</option>
                                                    <option value="(+)">(+)</option>
                                                    <option value="-">-</option>
                                                    <option value="(-)">(-)</option>
                                                    <option value="--">--</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="nsuco-box">
                                <p id="nsuco">NSUCO</p>

                                <div className="nsuco grid-col-two">

                                    <label htmlFor="sledzenie">Śledzenie </label>
                                    <input type="text" name="sledzenie" id="sledzenie" value={formData.sledzenie} onChange={handleChange}/>
                                    <label htmlFor="sakady">Sakady </label>
                                    <input type="text" name="sakady" id="sakady" value={formData.sakady} onChange={handleChange}/>
                                    
                                </div>
                            </div>

                            
                            <label htmlFor="obserwacje">Opis / obserwcje: </label>
                            <br />
                            <textarea name="obserwacje" id="obserwacje" value={formData.obserwacje} onChange={handleChange}></textarea>
                            

                            <br />
                            <br />

                            <p>Źrenice kształt / wielkość: </p>

                            <div className="grid-col-two-center">
                                <div>
                                    <label htmlFor="wielkosc_p">Oko prawe: </label>
                                    <input type="text" name="wielkosc_p" id="wielkosc_p" value={formData.wielkosc_p} onChange={handleChange}/>
                                </div>
                                <div>
                                    <label htmlFor="wielkosc_l">Oko lewe: </label>
                                    <input type="text" name="wielkosc_l" id="wielkosc_l" value={formData.wielkosc_l} onChange={handleChange}/>
                                </div>
                            </div>

                            <h3>Reakcja</h3>

                            <div className="grid-col-two-center">
                                <div className="badania-width">
                                    <p className="p-badania">Reakcja bezpośrednia</p>
                                    <div className="grid-col-two-center-rev">
                                        <div>
                                            <label htmlFor="bezp_l">Oko lewe: </label>
                                            <input type="text" name="bezp_l" id="bezp_l" value={formData.bezp_l} onChange={handleChange}/>
                                        </div>
                                        <div>
                                            <label htmlFor="bezp_p">Oko prawe: </label>
                                            <input type="text" name="bezp_p" id="bezp_p" value={formData.bezp_p} onChange={handleChange}/>
                                        </div>
                                    </div>    
                                </div>

                                <div className="badania-width add-pading">
                                    <p className="p-badania">Reakcja pośrednia</p>
                                    <div className="grid-col-two-center-rev">
                                        <div>
                                            <label htmlFor="posr_l">Oko lewe: </label>
                                            <input type="text" name="posr_l" id="posr_l" value={formData.posr_l} onChange={handleChange}/>
                                        </div>
                                        <div>
                                            <label htmlFor="posr_p">Oko prawe: </label>
                                            <input type="text" name="posr_p" id="posr_p" value={formData.posr_p} onChange={handleChange}/>
                                        </div>
                                        
                                    </div>    
                                </div>
                            </div>

                            <label htmlFor="inne_ocz">Inne: </label>
                            <textarea name="inne_ocz" id="inne_ocz" value={formData.inne_ocz} onChange={handleChange}></textarea>

                            <div className="grid-col-two-center">
                                <div>
                                    <label htmlFor="testB">Test Brucknera: </label><br />
                                    <input type="text" name="testB" id="testB" value={formData.testB} onChange={handleChange}/>
                                </div>

                                <div>
                                    <label htmlFor="testH">Test Hirschberga: </label><br />
                                    <input type="text" name="testH" id="testH" value={formData.testH} onChange={handleChange}/>
                                </div>
                            </div>
                            
                            <label htmlFor="ogolne_obs">Ogólne obserwacje</label>
                            <textarea name="ogolne_obs" id="ogolne_obs" value={formData.ogolne_obs} onChange={handleChange}></textarea>

                            <div className="button-box">
                                <button onClick={prevStep} className="wroc"><span>Wróć</span></button>
                                <button onClick={nextStep} className="dalej"><span>Dalej</span></button>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div>
                            <h3>Badania diagnostyczne</h3>
                            <p>Aktualna korekcja / vis bez korekcji</p>

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
                                        <td>Test</td>
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

                                        <td rowSpan={2}><input type="text" name="dal_wsp_test" id="dal_wsp_test" value={formData.dal_wsp_test} onChange={handleChange}/></td>
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

                                        <td rowSpan={2}><input type="text" name="bliz_wsp_test" id="bliz_wsp_test" value={formData.bliz_wsp_test} onChange={handleChange}/></td>
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
                            <label htmlFor="badanie_refrakcji">
                                Przedmiotowe badanie refrakcji:  
                            </label>
                            <br />

                            <div className="grid-col-two-center">
                                <div>
                                    <select name="cyklopegia" id="cyklopegia" value={formData.cyklopegia} onChange={handleChange}>
                                        <option value="bez_cyklopegii">Bez cyklopegii</option>
                                        <option value="z_cyklopegią"> Z cyklopegią</option>
                                    </select>
                                    <input type="text" name="badanie_refrakcji" id="badanie_refrakcji" value={formData.badanie_refrakcji} onChange={handleChange}/>
                                </div>
                                <div className="add-pading">
                                    <label htmlFor="skiaskopia">Skiaskopia: </label>
                                    <input type="text" name="skiaskopia" id="skiaskopia" value={formData.skiaskopia} onChange={handleChange}/>
                                </div>
                            </div>

                            <br />


                            <div className="gwiazdy-container">
                                {/* OL */}
                                <div>
                                    <p className="gwiazda-label">OL</p>
                                    <div className="krzyzyk">
                                    {/* pozioma kreska */}
                                    <div className="krzyzyk-pozioma">
                                        <input type="text" name="skiaskopia_ol1" value={formData.skiaskopia_ol1} onChange={handleChange} />
                                    </div>
                                    {/* pionowa kreska */}
                                    <div className="krzyzyk-pionowa">
                                        <input type="text" name="skiaskopia_ol2" value={formData.skiaskopia_ol2} onChange={handleChange} />
                                    </div>
                                    </div>
                                </div>

                                {/* OP */}
                                <div className="specific-extra-pading">
                                    <p className="gwiazda-label">OP</p>
                                    <div className="krzyzyk">
                                    {/* pozioma kreska */}
                                    <div className="krzyzyk-pozioma">
                                        <input type="text" name="skiaskopia_op1" value={formData.skiaskopia_op1} onChange={handleChange} />
                                    </div>
                                    {/* pionowa kreska */}
                                    <div className="krzyzyk-pionowa">
                                        <input type="text" name="skiaskopia_op2" value={formData.skiaskopia_op2} onChange={handleChange} />
                                    </div>
                                    </div>
                                </div>                                

                            </div>

                            <br />
                            <br />

                            <h3>Wynik</h3>
                            <div className="grid-col-two-center">

                                <div className="badania-width">
                                    <label htmlFor="skias_wynik_l">Oko lewe: </label>
                                    <input type="text" name="skias_wynik_l" id="skias_wynik_l" 
                                    value={formData.skias_wynik_l} onChange={handleChange}/>
                                </div>
                                <div className="badania-width">
                                    <label htmlFor="skias_wynik_p">Oko prawe: </label>
                                    <input type="text" name="skias_wynik_p" id="skias_wynik_p" 
                                    value={formData.skias_wynik_p} onChange={handleChange}/>
                                </div>

                            </div>

                            <br />

                            <p>Podmiotowe badanie refrakcji</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>Sph</td>
                                        <td>cyl</td>
                                        <td>ax</td>
                                        <td>Add (odl. <input type="number" name="add_odleglosc" id="add_odleglosc" value={formData.add_odleglosc} onChange={handleChange}/>)</td>
                                        <td colSpan={2}>Visus do dali c.c.</td>
                                        <td colSpan={2}>Visus do bliży  <select name="bliz_visus_ref" id="bliz_visus_ref" value={formData.bliz_visus_ref} onChange={handleChange}> <option value="s add">s add</option> <option value="c.add">c.add</option> </select></td>
                                    </tr>
                                    <tr>
                                        <td>OP</td>

                                        <td><input type="text" name="ref_op_sph" id="ref_op_sph" value={formData.ref_op_sph} onChange={handleChange}/></td>

                                        <td><input type="text" name="ref_op_cyl" id="ref_op_cyl" value={formData.ref_op_cyl} onChange={handleChange}/></td>

                                        <td><input type="text" name="ref_op_ax" id="ref_op_ax" value={formData.ref_op_ax} onChange={handleChange}/></td>

                                        <td><input type="text" name="ref_op_add" id="ref_op_add" value={formData.ref_op_add} onChange={handleChange}/></td>

                                        <td><input type="text" name="ref_op_visus_dal" id="ref_op_visus_dal" value={formData.ref_op_visus_dal} onChange={handleChange}/></td>

                                        <td rowSpan={2}><input type="text" name="ref_wsp_visus_dal" id="ref_wsp_visus_dal" value={formData.ref_wsp_visus_dal} onChange={handleChange}/></td>

                                        <td><input type="text" name="ref_op_visus_bliz" id="ref_op_visus_bliz" value={formData.ref_op_visus_bliz} onChange={handleChange}/></td>

                                        <td rowSpan={2}><input type="text" name="ref_wsp_visus_bliz" id="ref_wsp_visus_bliz" value={formData.ref_wsp_visus_bliz} onChange={handleChange}/></td>
                                    </tr>
                                    <tr>
                                        <td>OL</td>

                                        <td><input type="text" name="ref_ol_sph" id="ref_ol_sph" value={formData.ref_ol_sph} onChange={handleChange}/></td>

                                        <td><input type="text" name="ref_ol_cyl" id="ref_ol_cyl" value={formData.ref_ol_cyl} onChange={handleChange}/></td>

                                        <td><input type="text" name="ref_ol_ax" id="ref_ol_ax" value={formData.ref_ol_ax} onChange={handleChange}/></td>

                                        <td><input type="text" name="ref_ol_add" id="ref_ol_add" value={formData.ref_ol_add} onChange={handleChange}/></td>

                                        <td><input type="text" name="ref_ol_visus_dal" id="ref_ol_visus_dal" value={formData.ref_ol_visus_dal} onChange={handleChange}/></td>

                                        <td><input type="text" name="ref_ol_visus_bliz" id="ref_ol_visus_bliz" value={formData.ref_ol_visus_bliz} onChange={handleChange}/></td>
                                    </tr>
                                </tbody>
                            </table>
                            <br />

                        <div className="grid-col-two-specific specific-border">
                            <div className="widzenie_dal">
                                <p className="p-badania">Widzenie obuoczne do dali</p>
                                <br />

                                <div className="grid-col-two extra-pading">

                                    <div>
                                        <label htmlFor="stereo_dal"><b>Stereo</b></label>
                                        <input type="text" name="stereo_dal" id="stereo_dal" value={formData.stereo_dal} onChange={handleChange}/>
                                    </div>
                                    <div>
                                        (test <input type="text" name="stereo_test_dal" id="stereo_test_dal" value={formData.stereo_test_dal} onChange={handleChange}/>)
                                    </div>

                                    <div>
                                        <label htmlFor="fuzja_w_dal"><b>Fuzja: </b></label>
                                    </div>
                                    <div className="grid-col-two">
                                        <label htmlFor="fuzja_w_dal">t. Wortha</label>
                                        <input type="text" name="fuzja_w_dal" id="fuzja_w_dal" value={formData.fuzja_w_dal} onChange={handleChange}/>
                                        <label htmlFor="fuzja_s_dal">t. Schobera</label>
                                        <input type="text" name="fuzja_s_dal" id="fuzja_s_dal" value={formData.fuzja_s_dal} onChange={handleChange} />
                                    </div>

                                    <div>
                                        <label><b>Ustawienie oczu</b></label>
                                    </div>
                                    <div>
                                        <label htmlFor="metoda_ust_oczu_dal">metoda: </label>
                                        <input type="text" name="metoda_ust_oczu_dal" id="metoda_ust_oczu_dal" value={formData.metoda_ust_oczu_dal} onChange={handleChange} />
                                    </div>

                                    <div>
                                        <label htmlFor="horyzontalnie_ust_dal"><b>Horyzontalnie</b></label>
                                        <input type="text" name="horyzontalnie_ust_dal" id="horyzontalnie_ust_dal" value={formData.horyzontalnie_ust_dal} onChange={handleChange}/>
                                    </div>
                                    <div>
                                        <label htmlFor="hor_bn_dal">BN: </label>
                                        <input type="text" name="hor_bn_dal" id="hor_bn_dal" value={formData.hor_bn_dal} onChange={handleChange} />

                                        <br />

                                        <label htmlFor="hor_bs_dal">BS: </label>
                                        <input type="text" name="hor_bs_dal" id="hor_bs_dal" value={formData.hor_bs_dal} onChange={handleChange} />
                                    </div>

                                    <div>
                                        <label htmlFor="vertykalnie_dal"><b>Wertykalnie</b></label>
                                        <input type="text" name="vertykalnie_dal" id="vertykalnie_dal" value={formData.vertykalnie_dal} onChange={handleChange}/>
                                    </div>
                                    <div className="grid-table-2x2">
                                        <div>
                                            <label>OP </label>
                                        </div>
                                        <div>
                                            <label htmlFor="bg_op_dal">BG: </label>
                                            <input type="text" name="bg_op_dal" id="bg_op_dal" value={formData.bg_op_dal} onChange={handleChange}/>

                                            <br />

                                            <label htmlFor="bd_op_dal">BD: </label>
                                            <input type="text" name="bd_op_dal" id="bd_op_dal" value={formData.bd_op_dal} onChange={handleChange}/>
                                        </div>
                                        <div>
                                            <label>OL </label>
                                        </div>
                                        <div className="extra-margin-perm">
                                            <label htmlFor="bg_ol_dal">BG: </label>
                                            <input type="text" name="bg_ol_dal" id="bg_ol_dal" value={formData.bg_ol_dal} onChange={handleChange}/>

                                            <br />

                                            <label htmlFor="bd_ol_dal">BD: </label>
                                            <input type="text" name="bd_ol_dal" id="bd_ol_dal" value={formData.bd_ol_dal} onChange={handleChange}/>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="roznica_fiksacji_dal"><b>Różnice fiksacji:</b> </label>
                                    </div>
                                    <div>
                                        <input type="text" name="roznica_fiksacji_dal" id="roznica_fiksacji_dal" value={formData.roznica_fiksacji_dal} onChange={handleChange} />
                                    </div>

                                    <div>
                                        <label htmlFor="zez_foria_dal"><b>Zez/ foria: </b></label>
                                    </div>
                                    <div>
                                        <input type="text" name="zez_foria_dal" id="zez_foria_dal" value={formData.zez_foria_dal} onChange={handleChange}/>
                                    </div>
                                </div>

                                <br />

                                
                            </div>

                            <div className="widzenie_bliz extra-border">
                                <p className="p-badania">Widzenie obuoczne do bliży</p>
                                <br />

                                <div className="grid-col-two extra-pading">
                                    <div>
                                        <label htmlFor="stereo_bliz"><b>Stereo</b></label>
                                        <input type="text" name="stereo_bliz" id="stereo_bliz" value={formData.stereo_bliz} onChange={handleChange}/>
                                    </div>
                                    <div>
                                        (test <input type="text" name="stereo_test_bliz" id="stereo_test_bliz" value={formData.stereo_test_bliz} onChange={handleChange}/>)
                                    </div>

                                    <div>
                                        <label htmlFor="fuzja_w_bliz"><b>Fuzja:</b> </label>
                                    </div>
                                    <div className="grid-col-two-auto">
                                        <label htmlFor="fuzja_w_bliz">t. Wortha</label>
                                        <input type="text" name="fuzja_w_bliz" id="fuzja_w_bliz" value={formData.fuzja_w_bliz} onChange={handleChange}/>
                                        <label htmlFor="fuzja_s_bliz">t. Schobera</label>
                                        <input type="text" name="fuzja_s_bliz" id="fuzja_s_bliz" value={formData.fuzja_s_bliz} onChange={handleChange} />
                                    </div>

                                    <div>
                                        <label><b>Ustawienie oczu</b></label>
                                    </div>
                                    <div>
                                        <label htmlFor="metoda_ust_oczu_bliz">metoda: </label>
                                        <input type="text" name="metoda_ust_oczu_bliz" id="metoda_ust_oczu_bliz" value={formData.metoda_ust_oczu_bliz} onChange={handleChange} />
                                    </div>

                                    <div>
                                        <label htmlFor="horyzontalnie_ust_bliz"><b>Horyzontalnie</b></label>
                                        <input type="text" name="horyzontalnie_ust_bliz" id="horyzontalnie_ust_bliz" value={formData.horyzontalnie_ust_bliz} onChange={handleChange}/>
                                    </div>
                                    <div>
                                        <label htmlFor="hor_bn_bliz">BN: </label>
                                        <input type="text" name="hor_bn_bliz" id="hor_bn_bliz" value={formData.hor_bn_bliz} onChange={handleChange} />

                                        <br />

                                        <label htmlFor="hor_bs_bliz">BS: </label>
                                        <input type="text" name="hor_bs_bliz" id="hor_bs_bliz" value={formData.hor_bs_bliz} onChange={handleChange} />
                                    </div>

                                    <div>
                                        <label htmlFor="vertykalnie_bliz"><b>Wertykalnie</b></label>
                                        <input type="text" name="vertykalnie_bliz" id="vertykalnie_bliz" value={formData.vertykalnie_bliz} onChange={handleChange}/>
                                    </div>
                                    <div className="grid-table-2x2">
                                        <div>
                                            <label>OP </label>
                                        </div>
                                        <div>
                                            <label htmlFor="bg_op_bliz">BG: </label>
                                            <input type="text" name="bg_op_bliz" id="bg_op_bliz" value={formData.bg_op_bliz} onChange={handleChange}/>

                                            <br />

                                            <label htmlFor="bd_op_bliz">BD: </label>
                                            <input type="text" name="bd_op_bliz" id="bd_op_bliz" value={formData.bd_op_bliz} onChange={handleChange}/>
                                        </div>
                                        <div>
                                            <label>OL </label>
                                        </div>
                                        <div className="extra-margin-perm">
                                            <label htmlFor="bg_ol_bliz">BG: </label>
                                            <input type="text" name="bg_ol_bliz" id="bg_ol_bliz" value={formData.bg_ol_bliz} onChange={handleChange}/>

                                            <br />

                                            <label htmlFor="bd_ol_bliz">BD: </label>
                                            <input type="text" name="bd_ol_bliz" id="bd_ol_bliz" value={formData.bd_ol_bliz} onChange={handleChange}/>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="roznica_fiksacji_bliz"><b>Różnice fiksacji: </b></label>
                                    </div>
                                    <div>
                                        <input type="text" name="roznica_fiksacji_bliz" id="roznica_fiksacji_bliz" value={formData.roznica_fiksacji_bliz} onChange={handleChange} />
                                    </div>

                                    <div>
                                        <label htmlFor="foria_bliz"><b>Foria: </b></label>
                                        <select name="foria_bliz" id="foria_bliz" value={formData.foria_bliz} onChange={handleChange}>
                                            <option value="+ 1,0">+ 1,0</option>
                                            <option value="- 1,0">- 1,0</option>
                                        </select>
                                        
                                    </div>
                                    <div>
                                        <input type="text" name="foria_bliz_info" id="foria_bliz_info" value={formData.foria_bliz_info} onChange={handleChange}/>
                                    </div>

                                    <div>
                                        <label htmlFor="ac_ag"><b>AC / Ag: </b></label>
                                        
                                    </div>
                                    <div>
                                        <input type="text" name="ac_ag" id="ac_ag" value={formData.ac_ag} onChange={handleChange}/>
                                    </div>

                                    <div>
                                        <label htmlFor="ac_a_obl"><b>AC / A obl: </b></label>
                                        
                                    </div>
                                    <div>
                                        <input type="text" name="ac_a_obl" id="ac_agac_a_obl" value={formData.ac_a_obl} onChange={handleChange}/>
                                    </div>
                                    
                                    <div>
                                        <p>Sprawność wergencji: </p>
                                    </div>
                                    <div>
                                    
                                        <label htmlFor="fliper">(fliper <input type="text" name="fliper" id="fliper" value={formData.fliper} onChange={handleChange}/> )</label>
                                        <br />

                                        <div className="grid-col-two-auto">
                                            <label htmlFor="dal_wergencja">Dal: 
                                                <input type="text" name="dal_wergencja" id="dal_wergencja" value={formData.dal_wergencja} onChange={handleChange} />
                                                cpm
                                            </label>

                                            <label htmlFor="bliz_wergencja">Bliż: 
                                                <input type="text" name="bliz_wergencja" id="bliz_wergencja" value={formData.bliz_wergencja} onChange={handleChange} />
                                                cpm
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <br />
                        <br />

                        <table className="half-table">
                            <tbody>
                                <tr>
                                    <td colSpan={2}><b>Listwa pryzm.</b></td>
                                    <td><b>Zakres BS</b></td>
                                    <td><b>Zakres BN</b></td> 
                                </tr>
                                <tr>
                                    <td><b>PCT 6 m</b></td>
                                    <td>
                                        <label htmlFor="pct_6_h">h</label>
                                        <input type="text" name="pct_6_h" id="pct_6_h" value={formData.pct_6_h} onChange={handleChange}/><br />

                                        <label htmlFor="pct_6_v">v</label>
                                        <input type="text" name="pct_6_v" id="pct_6_v" value={formData.pct_6_v} onChange={handleChange}/>
                                    </td>
                                    <td>
                                        <input type="text" name="zakres_6_bs1" id="zakres_6_bs1" value={formData.zakres_6_bs1} onChange={handleChange}/>/
                                        <input type="text" name="zakres_6_bs2" id="zakres_6_bs2" value={formData.zakres_6_bs2} onChange={handleChange}/>
                                    </td>
                                    <td>
                                        <input type="text" name="zakres_6_bn1" id="zakres_6_bn1" value={formData.zakres_6_bn1} onChange={handleChange}/>/
                                        <input type="text" name="zakres_6_bn2" id="zakres_6_bn2" value={formData.zakres_6_bn2} onChange={handleChange}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td><b>PCT 0,4 m</b></td>
                                    <td>
                                        <label htmlFor="pct_4_h">h</label>
                                        <input type="text" name="pct_4_h" id="pct_4_h" value={formData.pct_4_h} onChange={handleChange}/><br />

                                        <label htmlFor="pct_4_v">v</label>
                                        <input type="text" name="pct_4_v" id="pct_4_v" value={formData.pct_4_v} onChange={handleChange}/>
                                    </td>
                                    <td>
                                        <input type="text" name="zakres_4_bs1" id="zakres_4_bs1" value={formData.zakres_4_bs1} onChange={handleChange}/>/
                                        <input type="text" name="zakres_4_bs2" id="zakres_4_bs2" value={formData.zakres_4_bs2} onChange={handleChange}/>
                                    </td>
                                    <td>
                                        <input type="text" name="zakres_4_bn1" id="zakres_4_bn1" value={formData.zakres_4_bn1} onChange={handleChange}/>/
                                        <input type="text" name="zakres_4_bn2" id="zakres_4_bn2" value={formData.zakres_4_bn2} onChange={handleChange}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <br />
                        <br />

                        <h3 id="pbk-name">PBK</h3>


                        <div className="grid-col-two-center">
                            <div>
                                    <label htmlFor="pbk2">
                                        <b>PBK</b> [cm] (min. 3 pomiary)
                                    </label>
                                    <textarea name="pbk2" id="pbk2" value={formData.pbk2} onChange={handleChange}></textarea>

                                    <div className="grid-col-two-auto">
                                        <select name="pbk2_wybor" id="pbk2_wybor" value={formData.pbk2_wybor} onChange={handleChange}>
                                            <option value="przedmiotowo">przedmiotowo</option>
                                            <option value="podm.">podm.</option>
                                        </select>
                                        <div>
                                            <label htmlFor="rodzaj_targetu1">Rodzaj targetu</label>
                                            <input type="text" name="rodzaj_targetu1" id="rodzaj_targetu1" value={formData.rodzaj_targetu1} onChange={handleChange} />
                                        </div>
                                    </div>

                                    
                            </div>
                            <div>
                                    <label htmlFor="pbk3">
                                        <b>PBK</b> [cm] (min. 3 pomiary)
                                    </label>
                                    <textarea name="pbk3" id="pbk3" value={formData.pbk3} onChange={handleChange}></textarea>

                                    <div className="grid-col-two-auto">
                                        <select name="pbk3_wybor" id="pbk3_wybor" value={formData.pbk3_wybor} onChange={handleChange}>
                                            <option value="przedmiotowo">przedmiotowo</option>
                                            <option value="podm.">podm.</option>
                                        </select>
                                        <div>
                                            <label htmlFor="rodzaj_targetu">Rodzaj targetu</label>
                                            <input type="text" name="rodzaj_targetu2" id="rodzaj_targetu2" value={formData.rodzaj_targetu2} onChange={handleChange} />
                                        </div>
                                    </div>

                                    
                            </div>
                        </div>

                        <br />
                        <br />


                        <div className="center">
                            <label htmlFor="korespondencja_siatkowa">
                                <b>Korespondencja siatkowa </b>(metoda: <input type="text" name="korespondencja_siatkowa" id="korespondencja_siatkowa" value={formData.korespondencja_siatkowa} onChange={handleChange}/>)
                            </label>
                        </div>

                        <br />

                        <div className="center">
                            <label htmlFor="fiksacja_oftalmoskop">
                                <b>Fiksacja (oftalmoskop: <input type="text" name="fiksacja_oftalmoskop" id="fiksacja_oftalmoskop" value={formData.fiksacja_oftalmoskop} onChange={handleChange}/> )</b>
                            </label>
                        </div>

                        <br />

                        <div className="display-center checkbox-column">
                            <table>
                                <tbody>
                                    <tr>
                                        <td colSpan={2}>OP</td>
                                        <td>Fiksacja</td>
                                        <td colSpan={2}>OL</td>
                                    </tr>

                                    <tr>
                                        <td rowSpan={5}>
                                            <img src={prawe} alt="rysunek oka" />
                                        </td>
                                        <td>
                                            <label htmlFor="op_centralna">
                                                <input type="radio" name="centralna" id="op_centralna" value="op" checked={formData.centralna === 'op'} onChange={handleChange}/>
                                            </label>
                                        </td>
                                        <td>Centralna</td>
                                        <td>
                                            <label htmlFor="ol_centralna">
                                                <input type="radio" name="centralna" id="ol_centralna" value="ol" checked={formData.centralna === 'ol'} onChange={handleChange}/>
                                            </label>
                                            
                                        </td>
                                        <td rowSpan={5}>
                                            <img src={lewe} alt="rysunek oka" />
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td>
                                            <label htmlFor="op_ekscentryczna">
                                                <input type="radio" name="ekscentryczna" id="op_ekscentryczna" value="op" onChange={handleChange} checked={formData.ekscentryczna === "op"}/>
                                            </label>
                                        </td>
                                        <td>Ekscentryczna</td>
                                        <td>
                                            <label htmlFor="ol_ekscentryczna">
                                                <input type="radio" name="ekscentryczna" id="ol_ekscentryczna" value="ol" onChange={handleChange} checked={formData.ekscentryczna === "ol"}/>
                                            </label>
                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="op_stabilna">
                                                <input type="radio" name="stabilna" id="op_stabilna" value="op" onChange={handleChange} checked={formData.stabilna === "op"}/>
                                            </label>
                                            
                                        </td>
                                        <td>Stabilna</td>
                                        <td>
                                            <label htmlFor="ol_stabilna">
                                               <input type="radio" name="stabilna" id="ol_stabilna" value="ol" onChange={handleChange} checked={formData.stabilna === "ol"}/> 
                                            </label>
                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="op_niestabilna">
                                               <input type="radio" name="niestabilna" id="op_niestabilna" value="op" onChange={handleChange} checked={formData.niestabilna === "op"}/> 
                                            </label>
                                            
                                        </td>
                                        <td>Niestabilna</td>
                                        <td>
                                            <label htmlFor="ol_niestabilna">
                                                <input type="radio" name="niestabilna" id="ol_niestabilna" value="ol" onChange={handleChange} checked={formData.niestabilna === "ol"}/>
                                            </label>
                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="op_kierunek_ef">
                                               <input type="radio" name="kierunek_ef" id="op_kierunek_ef" value="op" onChange={handleChange} checked={formData.kierunek_ef === "op"}/> 
                                            </label>
                                            
                                        </td>
                                        <td>Kierunek EF</td>
                                        <td>
                                            <label htmlFor="ol_kierunek_ef">
                                                <input type="radio" name="kierunek_ef" id="ol_kierunek_ef" value="ol" onChange={handleChange} checked={formData.kierunek_ef === "ol"}/>
                                            </label>
                                            
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <br />

                        <label htmlFor="inne_badania">Inne badania / próby pryzmatyczne</label>
                        <textarea name="inne_badania" id="inne_badania" value={formData.inne_badania} onChange={handleChange}></textarea>

                        
                    <p className="center">Akomodacja / konwergencja</p>

                    <br />

                    <div className="display-center">
                        <label htmlFor="akomodacja_ospowiedz"><b>Odpowiedź akom.</b> (metoda <input type="text" name="akomodacja_ospowiedz" id="akomodacja_ospowiedz" value={formData.akomodacja_ospowiedz} onChange={handleChange} /> )</label>
                    </div>

                    <br />

                    <div className="grid-col-two-center">

                        <div className="input-between-pading">
                            <label htmlFor="akomodacja_op">Oko prawe: </label>
                            <input type="text" name="akomodacja_op" id="akomodacja_op" value={formData.akomodacja_op} onChange={handleChange} /><br />
                            <label htmlFor="akomodacja_ol"> Oko lewe:  </label>
                            <input type="text" name="akomodacja_ol" id="akomodacja_ol" value={formData.akomodacja_ol} onChange={handleChange} /><br />
                            <label htmlFor="akomodacja_ol"> OU:  </label>
                            <input type="text" name="akomodacja_ou" id="akomodacja_ou" value={formData.akomodacja_ou} onChange={handleChange} />
                        </div>
                        <div className="add-pading input-between-pading">
                            <label htmlFor="uwa">UWA: <input type="text" name="uwa" id="uwa" value={formData.uwa} onChange={handleChange}/></label>
                        
                            <label htmlFor="dwa">DWA: <input type="text" name="dwa" id="dwa" value={formData.dwa} onChange={handleChange}/></label>
                        </div>
                    </div>

                    <br />
                    <br />

                    <div className="display-center">
                        <label htmlFor="akomodacja_amplituda"><b>Amplituda akom. </b>(metoda <input type="text" name="akomodacja_amplituda" id="akomodacja_amplituda" value={formData.akomodacja_amplituda} onChange={handleChange} /> )</label>
                    </div>

                    <br />

                    <div className="grid-col-three-center">
                        <div className="grid-col-two-auto">
                            <label htmlFor="amplituda_op_cm">Oko prawe</label>
                            <div className="input-between-pading">
                                <input type="text" name="amplituda_op_cm" id="amplituda_op_cm" value={formData.amplituda_op_cm} onChange={handleChange} />
                                <label htmlFor="amplituda_op_cm">cm.</label><br />

                                <input type="text" name="amplituda_op_dptr" id="amplituda_op_dptr" value={formData.amplituda_op_dptr} onChange={handleChange} />
                                <label htmlFor="amplituda_op_dptr">dptr.</label>
                            </div>
                            
                        </div>
                        <div className="grid-col-two-auto ">
                            <label htmlFor="amplituda_ol_cm">Oko lewe</label>
                            <div className="input-between-pading">
                                <input type="text" name="amplituda_ol_cm" id="amplituda_ol_cm" value={formData.amplituda_ol_cm} onChange={handleChange} />
                                <label htmlFor="amplituda_ol_cm">cm.</label><br />

                                <input type="text" name="amplituda_ol_dptr" id="amplituda_ol_dptr" value={formData.amplituda_ol_dptr} onChange={handleChange} />
                                <label htmlFor="amplituda_ol_dptr">dptr.</label>
                            </div>
                            
                        </div>

                        <div>
                        <label htmlFor="amplituda_ou_cm">OU: </label>
                        <div className="input-between-pading">
                            <input type="text" name="amplituda_ou_cm" id="amplituda_ou_cm" value={formData.amplituda_ou_cm} onChange={handleChange} />
                            <label htmlFor="amplituda_ou_cm">cm.</label><br />

                            <input type="text" name="amplituda_ou_dptr" id="amplituda_ou_dptr" value={formData.amplituda_ou_dptr} onChange={handleChange} />
                            <label htmlFor="amplituda_ou_dptr">dptr.</label>
                        </div>
                    </div>
                    </div>

                    <br />

                    <div className="display-center">
                        <label htmlFor="norma">Norma: </label>
                        <input type="text" name="norma" id="norma" value={formData.norma} onChange={handleChange} />

                        
                    </div>

                    <br />
                    <br />

                    <div className="display-center">
                        <label htmlFor="fliper_akomodacja"><b>Fliper: </b> </label>
                        <select name="fliper_akomodacja_wybor" id="fliper_akomodacja_wybor" value={formData.fliper_akomodacja_wybor} onChange={handleChange}>
                            <option value="+">+</option>
                            <option value="-">-</option>
                        </select>
                        <input type="text" name="fliper_akomodacja" id="fliper_akomodacja" value={formData.fliper_akomodacja} onChange={handleChange}/>
                    </div>

                    <br />

                    <div className="grid-col-three">
                        <div>
                            <label htmlFor="fliper_op">Oko prawe: </label>
                            <input type="text" name="fliper_op" id="fliper_op" value={formData.fliper_op} onChange={handleChange}/>
                            <select name="fliper_op_wybor" id="fliper_op_wybor" value={formData.fliper_op_wybor} onChange={handleChange}>
                                <option value="cykl">cykl</option>
                                <option value="min">min</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="fliper_ol">Oko lewe: </label>
                            <input type="text" name="fliper_ol" id="fliper_ol" value={formData.fliper_ol} onChange={handleChange}/>
                            <select name="fliper_ol_wybor" id="fliper_ol_wybor" value={formData.fliper_ol_wybor} onChange={handleChange}>
                                <option value="cykl">cykl</option>
                                <option value="min">min</option>
                            </select>
                        </div>

                        <div className="extra-margin">
                            <label htmlFor="fliper_ou">UO: </label>
                            <input type="text" name="fliper_ou" id="fliper_ou" value={formData.fliper_ou} onChange={handleChange}/>
                            <select name="fliper_ou_wybor" id="fliper_ou_wybor" value={formData.fliper_ou_wybor} onChange={handleChange}>
                                <option value="cykl">cykl</option>
                                <option value="min">min</option>
                            </select>
                        </div>
                    </div>

                    <br />

                    <label htmlFor="uwagi_akomodacja">Uwagi: </label>
                    <textarea name="uwagi_akomodacja" id="uwagi_akomodacja" value={formData.uwagi_akomodacja} onChange={handleChange}></textarea>

                    <br />
                    <br />

                        <br />

                        <div className="button-box">
                            <button onClick={prevStep} className="wroc"><span>Wróć</span></button>
                            <button onClick={nextStep} className="dalej"><span>Dalej</span></button>
                        </div>
                    </div>
                    )}

                    {step === 6 && (
                        <div>
                            <label htmlFor="ostateczna_diagnoza">Diagnoza: </label>
                            <textarea name="ostateczna_diagnoza" id="ostateczna_diagnoza" value={formData.ostateczna_diagnoza} onChange={handleChange}></textarea>

                            <label htmlFor="zalecenia">Zalecenia</label>
                            <textarea name="zalecenia" id="zalecenia" value={formData.zalecenia} onChange={handleChange}></textarea>

                            <ol>
                                <li>
                                    <b>Proponowana korekcja</b> (rodzaj rozwiązania optycznego <input type="text" name="proponowana_korekcja1" id="proponowana_korekcja1" value={formData.proponowana_korekcja1} onChange={handleChange}/> )
                                </li>
                            </ol>


                            <div className="table-wrapper table-desktop">
                            <table className="biggest-table">
                                <tbody>
                                    <tr>
                                        <td><b>Dal</b></td>
                                        <td>Sph</td>
                                        <td>cyl</td>
                                        <td>ax</td>
                                        <td>pryzma</td>
                                        <td>baza</td>
                                        <td>PD</td>
                                        <td><b>Bliż</b></td>
                                        <td>Sph</td>
                                        <td>cyl</td>
                                        <td>ax</td>
                                        <td>pryzma</td>
                                        <td>baza</td>
                                        <td>PD</td>
                                    </tr>
                                    <tr>
                                        <td>OP</td>
                                        <td><input type="text" name="prop_dal_op_sph" id="prop_dal_op_sph" value={formData.prop_dal_op_sph} onChange={handleChange}/></td>
                                        <td><input type="text" name="prop_dal_op_cyl" id="prop_dal_op_cyl" value={formData.prop_dal_op_cyl} onChange={handleChange}/></td>
                                        <td><input type="text" name="prop_dal_op_ax" id="prop_dal_op_ax" value={formData.prop_dal_op_ax} onChange={handleChange}/></td>
                                        <td><input type="text" name="prop_dal_op_pryzma" id="prop_dal_op_pryzma" value={formData.prop_dal_op_pryzma} onChange={handleChange}/></td>
                                        <td><input type="text" name="prop_dal_op_baza" id="prop_dal_op_baza" value={formData.prop_dal_op_baza} onChange={handleChange}/></td>
                                        <td><input type="text" name="prop_dal_op_pd" id="prop_dal_op_pd" value={formData.prop_dal_op_pd} onChange={handleChange}/></td>
                                        <td>OL</td>
                                        <td><input type="text" name="prop_bliz_ol_sph" id="prop_bliz_ol_sph" value={formData.prop_bliz_ol_sph} onChange={handleChange}/></td>
                                        <td><input type="text" name="prop_bliz_ol_cyl" id="prop_bliz_ol_cyl" value={formData.prop_bliz_ol_cyl} onChange={handleChange}/></td>
                                        <td><input type="text" name="prop_bliz_ol_ax" id="prop_bliz_ol_ax" value={formData.prop_bliz_ol_ax} onChange={handleChange}/></td>
                                        <td><input type="text" name="prop_bliz_ol_pryzma" id="prop_bliz_ol_pryzma" value={formData.prop_bliz_ol_pryzma} onChange={handleChange}/></td>
                                        <td><input type="text" name="prop_bliz_ol_baza" id="prop_bliz_ol_baza" value={formData.prop_bliz_ol_baza} onChange={handleChange}/></td>
                                        <td><input type="text" name="prop_bliz_ol_pd" id="prop_bliz_ol_pd" value={formData.prop_bliz_ol_pd} onChange={handleChange}/></td>
                                    </tr>
                                    <tr>
                                        <td>OL</td>
                                        <td><input type="text" name="prop_dal_ol_sph" id="prop_dal_ol_sph" value={formData.prop_dal_ol_sph} onChange={handleChange}/></td>
                                        <td><input type="text" name="prop_dal_ol_cyl" id="prop_dal_ol_cyl" value={formData.prop_dal_ol_cyl} onChange={handleChange}/></td>
                                        <td><input type="text" name="prop_dal_ol_ax" id="prop_dal_ol_ax" value={formData.prop_dal_ol_ax} onChange={handleChange}/></td>
                                        <td><input type="text" name="prop_dal_ol_pryzma" id="prop_dal_ol_pryzma" value={formData.prop_dal_ol_pryzma} onChange={handleChange}/></td>
                                        <td><input type="text" name="prop_dal_ol_baza" id="prop_dal_ol_baza" value={formData.prop_dal_ol_baza} onChange={handleChange}/></td>
                                        <td><input type="text" name="prop_dal_ol_pd" id="prop_dal_ol_pd" value={formData.prop_dal_ol_pd} onChange={handleChange}/></td>
                                        <td>OP</td>
                                        <td><input type="text" name="prop_bliz_op_sph" id="prop_bliz_op_sph" value={formData.prop_bliz_op_sph} onChange={handleChange}/></td>
                                        <td><input type="text" name="prop_bliz_op_cyl" id="prop_bliz_op_cyl" value={formData.prop_bliz_op_cyl} onChange={handleChange}/></td>
                                        <td><input type="text" name="prop_bliz_op_ax" id="prop_bliz_op_ax" value={formData.prop_bliz_op_ax} onChange={handleChange}/></td>
                                        <td><input type="text" name="prop_bliz_op_pryzma" id="prop_bliz_op_pryzma" value={formData.prop_bliz_op_pryzma} onChange={handleChange}/></td>
                                        <td><input type="text" name="prop_bliz_op_baza" id="prop_bliz_op_baza" value={formData.prop_bliz_op_baza} onChange={handleChange}/></td>
                                        <td><input type="text" name="prop_bliz_op_pd" id="prop_bliz_op_pd" value={formData.prop_bliz_op_pd} onChange={handleChange}/></td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>

                            <div className="table-mobile">
                                <table className="biggest-table">
                                    <tbody>
                                        <tr>
                                            <td><b>Dal</b></td>
                                            <td>Sph</td>
                                            <td>cyl</td>
                                            <td>ax</td>
                                            <td>pryzma</td>
                                            <td>baza</td>
                                            <td>PD</td>
                                        </tr>
                                        <tr>
                                            <td>OP</td>
                                            <td><input type="text" name="prop_dal_op_sph" value={formData.prop_dal_op_sph} onChange={handleChange}/></td>
                                            <td><input type="text" name="prop_dal_op_cyl" value={formData.prop_dal_op_cyl} onChange={handleChange}/></td>
                                            <td><input type="text" name="prop_dal_op_ax" value={formData.prop_dal_op_ax} onChange={handleChange}/></td>
                                            <td><input type="text" name="prop_dal_op_pryzma" value={formData.prop_dal_op_pryzma} onChange={handleChange}/></td>
                                            <td><input type="text" name="prop_dal_op_baza" value={formData.prop_dal_op_baza} onChange={handleChange}/></td>
                                            <td><input type="text" name="prop_dal_op_pd" value={formData.prop_dal_op_pd} onChange={handleChange}/></td>
                                        </tr>
                                        <tr>
                                            <td>OL</td>
                                            <td><input type="text" name="prop_dal_ol_sph" value={formData.prop_dal_ol_sph} onChange={handleChange}/></td>
                                            <td><input type="text" name="prop_dal_ol_cyl" value={formData.prop_dal_ol_cyl} onChange={handleChange}/></td>
                                            <td><input type="text" name="prop_dal_ol_ax" value={formData.prop_dal_ol_ax} onChange={handleChange}/></td>
                                            <td><input type="text" name="prop_dal_ol_pryzma" value={formData.prop_dal_ol_pryzma} onChange={handleChange}/></td>
                                            <td><input type="text" name="prop_dal_ol_baza" value={formData.prop_dal_ol_baza} onChange={handleChange}/></td>
                                            <td><input type="text" name="prop_dal_ol_pd" value={formData.prop_dal_ol_pd} onChange={handleChange}/></td>
                                        </tr>
                                    </tbody>
                                </table>

                                <table className="biggest-table" style={{marginTop: '16px'}}>
                                    <tbody>
                                        <tr>
                                            <td><b>Bliż</b></td>
                                            <td>Sph</td>
                                            <td>cyl</td>
                                            <td>ax</td>
                                            <td>pryzma</td>
                                            <td>baza</td>
                                            <td>PD</td>
                                        </tr>
                                        <tr>
                                            <td>OL</td>
                                            <td><input type="text" name="prop_bliz_ol_sph" value={formData.prop_bliz_ol_sph} onChange={handleChange}/></td>
                                            <td><input type="text" name="prop_bliz_ol_cyl" value={formData.prop_bliz_ol_cyl} onChange={handleChange}/></td>
                                            <td><input type="text" name="prop_bliz_ol_ax" value={formData.prop_bliz_ol_ax} onChange={handleChange}/></td>
                                            <td><input type="text" name="prop_bliz_ol_pryzma" value={formData.prop_bliz_ol_pryzma} onChange={handleChange}/></td>
                                            <td><input type="text" name="prop_bliz_ol_baza" value={formData.prop_bliz_ol_baza} onChange={handleChange}/></td>
                                            <td><input type="text" name="prop_bliz_ol_pd" value={formData.prop_bliz_ol_pd} onChange={handleChange}/></td>
                                        </tr>
                                        <tr>
                                            <td>OP</td>
                                            <td><input type="text" name="prop_bliz_op_sph" value={formData.prop_bliz_op_sph} onChange={handleChange}/></td>
                                            <td><input type="text" name="prop_bliz_op_cyl" value={formData.prop_bliz_op_cyl} onChange={handleChange}/></td>
                                            <td><input type="text" name="prop_bliz_op_ax" value={formData.prop_bliz_op_ax} onChange={handleChange}/></td>
                                            <td><input type="text" name="prop_bliz_op_pryzma" value={formData.prop_bliz_op_pryzma} onChange={handleChange}/></td>
                                            <td><input type="text" name="prop_bliz_op_baza" value={formData.prop_bliz_op_baza} onChange={handleChange}/></td>
                                            <td><input type="text" name="prop_bliz_op_pd" value={formData.prop_bliz_op_pd} onChange={handleChange}/></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <ol start={2}>
                                <li>
                                    <input type="text" name="proponowana_korekcja2" id="proponowana_korekcja2" value={formData.proponowana_korekcja2} onChange={handleChange}/>
                                </li>
                                <li>
                                    <input type="text" name="proponowana_korekcja3" id="proponowana_korekcja3" value={formData.proponowana_korekcja3} onChange={handleChange}/>
                                </li>
                                <li>
                                    <input type="text" name="proponowana_korekcja4" id="proponowana_korekcja4" value={formData.proponowana_korekcja4} onChange={handleChange}/>
                                </li>
                                <li>
                                    <input type="text" name="proponowana_korekcja5" id="proponowana_korekcja5" value={formData.proponowana_korekcja5} onChange={handleChange}/>
                                </li>
                                
                            </ol>

                            <br />


                            <div className="button-box">
                                <button onClick={prevStep} className="wroc"><span>Wróć</span></button>
                                <button onClick={() => handleSubmit('children')} className="dalej"><span>Zapisz</span></button>
                            </div>
                        </div>
                    )}
                </div>
                    
                </form>
            </section>
        </div>
    )
}
import { useEffect, useState } from "react";
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../context/AuthContext'
import { useFormAction, useNavigate } from "react-router-dom";
import { useFormData } from "../../hooks/useFormData";
import ProgressBar from "../../components/ProgressBard"
import CardHeader from "../../components/CardHeader"
import prawe from "../../assets/kolo_p.png";
import lewe from "../../assets/kolo_l.png";
import { LogOut, ArrowBigLeft } from "lucide-react";

export default function AdultCard(){
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

    // step 2 - dolegliwości
    dolegliwosci: '',
    dol_bol_oczu: false,
    dol_zmeczenie: false,
    dol_zasypianie: false,
    dol_lzawienie: false,
    dol_zaczerwienienie: false,
    dol_piasek: false,
    dol_bol_glowy: false,
    dol_podwojne_daleka: false,
    dol_podwojne_bliska: false,
    dol_blyski: false,
    dol_mroczki: false,
    dol_otoczki: false,
    dolegliwosci_uwagi: '',

    // step 3 - korekcja
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

    // step 4 - wywiad
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
    pierwsza_korekcja: '',

    zez: false,
    uciekanie_oka: false,
    obturacja: false,
    kiedy_jakie_uciekalo: '',
    ciaza_porod: '',

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

    // środowisko pracy
    praca_bliska_odl: 'duzo',
    praca_komputer: 'duzo',
    h_na_dobe: '',

    warunki_kurz: false,
    warunki_klimatyzacja: false,
    warunki_oswietlenie: false,
    warunki_chemia: false,
    inne_warunki: '',
    zawod: '',

    hobby: '',
    czytanie: 'tak',
    czytanie_info: '',

    ostatnia_diagnoza_data: '',
    ostatnia_diagnoza: '',

    // step 5 - badanie wstępne
    oko_dom_dal: '',
    oko_dom_bliz: '',
    dom_reka: '',
    dom_noga: '',

    harmona: '',
    ct_dal: '',
    ct_bliz: '',
    pbk: '',
    uwagi_pbk: '',
    pbk2: '',
    uwagi_pbk2: '',

    ruch_op1: '', ruch_op2: '', ruch_op3: '', ruch_op4: '',
    ruch_op5: '', ruch_op6: '', ruch_op7: '', ruch_op8: '',
    ruch_ol1: '', ruch_ol2: '', ruch_ol3: '', ruch_ol4: '',
    ruch_ol5: '', ruch_ol6: '', ruch_ol7: '', ruch_ol8: '',

    sledzenie: '',
    sakady: '',
    obserwacje: '',

    // step 6 - aktualna korekcja dal
    dal_op_sph: '', dal_op_cyl: '', dal_op_ax: '',
    dal_op_pryzma: '', dal_op_baza: '', dal_op_pd: '',
    dal_op_visus: '', dal_wsp_visus: '', dal_wsp_test: '',
    dal_ol_sph: '', dal_ol_cyl: '', dal_ol_ax: '',
    dal_ol_pryzma: '', dal_ol_baza: '', dal_ol_pd: '',
    dal_ol_visus: '',

    // step 6 - aktualna korekcja bliż
    bliz_op_sph: '', bliz_op_cyl: '', bliz_op_ax: '',
    bliz_op_pryzma: '', bliz_op_baza: '', bliz_op_pd: '',
    bliz_op_visus: '', bliz_wsp_visus: '', bliz_wsp_test: '',
    bliz_ol_sph: '', bliz_ol_cyl: '', bliz_ol_ax: '',
    bliz_ol_pryzma: '', bliz_ol_baza: '', bliz_ol_pd: '',
    bliz_ol_visus: '',

    // przedmiotowe badanie refrakcji
    cyklopegia: 'bez_cyklopegii',
    badanie_refrakcji: '',

    // autorefraktometr
    refraktometr_op_sph: '', refraktometr_op_cyl: '', refraktometr_op_ax: '',
    refraktometr_ol_sph: '', refraktometr_ol_cyl: '', refraktometr_ol_ax: '',

    // skiaskopia
    skiaskopia_op_sph: '', skiaskopia_op_cyl: '', skiaskopia_op_ax: '',
    skiaskopia_ol_sph: '', skiaskopia_ol_cyl: '', skiaskopia_ol_ax: '',

    // podmiotowe badanie refrakcji
    add_odleglosc: '',
    ref_op_sph: '', ref_op_cyl: '', ref_op_ax: '', ref_op_add: '',
    ref_op_visus_dal: '', ref_op_visus_bliz: '',
    ref_ol_sph: '', ref_ol_cyl: '', ref_ol_ax: '', ref_ol_add: '',
    ref_ol_visus_dal: '', ref_ol_visus_bliz: '',
    ref_wsp_visus_dal: '', ref_wsp_visus_bliz: '',

    // widzenie obuoczne dal
    stereo_dal: '', stereo_test_dal: '',
    fuzja_w_dal: '', fuzja_s_dal: '',
    metoda_foria_dal: '',
    horyzontalnie_ust_dal: '',
    hor_bn_dal: '', hor_bs_dal: '',
    vertykalnie_dal: '',
    bg_op_dal: '', bd_op_dal: '',
    bg_ol_dal: '', bd_ol_dal: '',
    zez_dal: '',

    // widzenie obuoczne bliż
    stereo_bliz: '', stereo_test_bliz: '',
    fuzja_w_bliz: '', fuzja_s_bliz: '',
    metoda_foria_bliz: '',
    horyzontalnie_ust_bliz: '',      // DODANE
    hor_bn_bliz: '', hor_bs_bliz: '',
    vertykalnie_bliz: '',            // DODANE
    bg_op_bliz: '', bd_op_bliz: '',  // DODANE
    bg_ol_bliz: '', bd_ol_bliz: '',  // DODANE
    // POPRAWKA: nazwa ujednolicona z JSX (select używa name="foria_bliz")
    foria_bliz: '+ 1,0',
    foria_info_bliz: '',
    ac_ag: '',

    // listwa pryzmatyczna
    pct_6: '', zakres_6_bs: '', zakres_6_bn: '',
    pct_4: '', zakres_4_bs: '', zakres_4_bn: '',

    // korespondencja i fiksacja
    korespondencja_siatkowa: '',
    fiksacja_wybor: 'orientacyjnie',
    fiksacja: '',

    inne_badania: '',

    // akomodacja
    akomodacja_ospowiedz: '',
    akomodacja_op: '', akomodacja_ol: '', akomodacja_ou: '',
    uwa: '', dwa: '',

    akomodacja_amplituda: '',
    amplituda_op_cm: '', amplituda_op_dptr: '',
    amplituda_ol_cm: '', amplituda_ol_dptr: '',
    amplituda_ou_cm: '', amplituda_ou_dptr: '',
    norma: '',

    fliper: '+',
    fliper_info: '',
    fliper_op: '', fliper_op_wybor: 'cykl',
    fliper_ol: '', fliper_ol_wybor: 'cykl',
    fliper_ou: '', fliper_ou_wybor: 'cykl',
    uwagi_akomodacja: '',

    zalecane_konsultacje: '',

    // step 7 - diagnoza i zalecenia
    ostateczna_diagnoza: '',
    ostateczne_uwagi: '',
    proponowana_korekcja1: '',

    // tabela proponowanej korekcji dal
    prop_dal_op_sph: '', prop_dal_op_cyl: '', prop_dal_op_ax: '',
    prop_dal_op_pryzma: '', prop_dal_op_baza: '', prop_dal_op_pd: '',
    prop_dal_ol_sph: '', prop_dal_ol_cyl: '', prop_dal_ol_ax: '',
    prop_dal_ol_pryzma: '', prop_dal_ol_baza: '', prop_dal_ol_pd: '',

    // tabela proponowanej korekcji bliż
    prop_bliz_op_sph: '', prop_bliz_op_cyl: '', prop_bliz_op_ax: '',
    prop_bliz_op_pryzma: '', prop_bliz_op_baza: '', prop_bliz_op_pd: '',
    prop_bliz_ol_sph: '', prop_bliz_ol_cyl: '', prop_bliz_ol_ax: '',
    prop_bliz_ol_pryzma: '', prop_bliz_ol_baza: '', prop_bliz_ol_pd: '',

    dodatkowe_postepowania: '',
    }, 'adult')

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

    return (
        <div className="main">
            <button onClick={handleLogOut} className="log-out">
                <LogOut size={15} />
            </button>
            <button onClick={() => navigate('/choose-card')} className='return'>
                <ArrowBigLeft size={15} />
            </button>
            <header>
                <h1>Karta pacjenta - dorosły</h1>
                <p>Data: {CurrentDate()}</p>
            </header>
            <section className="glass-card">
                <ProgressBar step={step} totalSteps={7} />

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

                        <h3>
                            Informacje ogólne
                        </h3>

                        <label htmlFor="dolegliwosci">Opis zgłaszanych dolegliwości</label>
                        <textarea name="dolegliwosci" id="dolegliwosci" value={formData.dolegliwosci} onChange={handleChange}></textarea>

                        <br />
                        <br />

                        <p>Inne dolegliości: </p>
                        <div className="grid-col-three-center">
                            <div>
                                <input type="checkbox" name="dol_bol_oczu" id="dol_bol_oczu" checked={formData.dol_bol_oczu} onChange={handleChange} />
                                <label htmlFor="dol_bol_oczu">Ból oczu</label><br />
                                

                                <input type="checkbox" name="dol_zmeczenie" id="dol_zmeczenie" checked={formData.dol_zmeczenie} onChange={handleChange} />
                                <label htmlFor="dol_zmeczenie">Zmęczenie</label><br />
                                

                                <input type="checkbox" name="dol_zasypianie" id="dol_zasypianie" checked={formData.dol_zasypianie} onChange={handleChange} />
                                <label htmlFor="dol_zasypianie">Zasypianie pod czas czytania</label><br />
                                

                                <input type="checkbox" name="dol_lzawienie" id="dol_lzawienie" checked={formData.dol_lzawienie} onChange={handleChange} />
                                <label htmlFor="dol_lzawienie">Łzawienie</label>
                                

                            </div>

                            <div>
                                <input type="checkbox" name="dol_zaczerwienienie" id="dol_zaczerwienienie" checked={formData.dol_zaczerwienienie} onChange={handleChange} />
                                <label htmlFor="dol_zaczerwienienie">Zaczerweinienie oczu</label><br />
                                

                                <input type="checkbox" name="dol_piasek" id="dol_piasek" checked={formData.dol_piasek} onChange={handleChange} />
                                <label htmlFor="dol_piasek">Uczucie piasku pod powiekami</label><br />


                                <input type="checkbox" name="dol_bol_glowy" id="dol_bol_glowy" checked={formData.dol_bol_glowy} onChange={handleChange} />
                                <label htmlFor="dol_bol_glowy">Ból głowy</label><br />
                                

                                <input type="checkbox" name="dol_podwojne_daleka" id="dol_podwojne_daleka" checked={formData.dol_podwojne_daleka} onChange={handleChange} />
                                <label htmlFor="dol_podwojne_daleka">Podwójne widzenie z daleka</label><br />
                            </div>

                            <div>
                                <input type="checkbox" name="dol_podwojne_bliska" id="dol_podwojne_bliska" checked={formData.dol_podwojne_bliska} onChange={handleChange} />
                                <label htmlFor="dol_podwojne_bliska">Podwójne widzenie z bliska</label><br />
                                

                                <input type="checkbox" name="dol_blyski" id="dol_blyski" checked={formData.dol_blyski} onChange={handleChange} />
                                <label htmlFor="dol_blyski">Błyski przed oczami</label><br />
                                

                                <input type="checkbox" name="dol_mroczki" id="dol_mroczki" checked={formData.dol_mroczki} onChange={handleChange} />
                                <label htmlFor="dol_mroczki">Mroczki przed oczami</label><br />
                                

                                <input type="checkbox" name="dol_otoczki" id="dol_otoczki" checked={formData.dol_otoczki} onChange={handleChange} />
                                <label htmlFor="dol_otoczki">Barwne otoczki wokół świateł</label>
                            </div>
                        </div>

                        <label htmlFor="dolegliwosci_uwagi">Uwagi: </label>
                        <textarea name="dolegliwosci_uwagi" id="dolegliwosci_uwagi" value={formData.dolegliwosci_uwagi} onChange={handleChange}></textarea>



                        <div className="button-box">
                            <button onClick={prevStep} className="wroc"><span>Wróć</span></button>
                            <button onClick={nextStep} className="dalej"><span>Dalej</span></button>
                        </div> 
                    </div>

                    
                )}

                {step === 3 && (
                        <div>
                            <p>Noszone są: </p>

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
                                
                            </div>


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

                {step === 4 && (
                    <div>
                        <p>Choroby oczu \ leczenie:</p>
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
                        <input type="text" name="inne_choroby" id="inne_choroby" value={formData.inne_choroby} onChange={handleChange}/>
                        <br />
                        
                        <label htmlFor="uwagi_chorob">Uwagi: </label><br />
                        <textarea name="uwagi_chorob" id="uwagi_chorob" value={formData.uwagi_chorob} onChange={handleChange}></textarea>
                        <br />

                        <br />

                        <p>Choroby ogólnoustrojowe: </p>

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
                        
                        <label htmlFor="inne_choroby_ogoln">Inne</label>
                        <input type="text" name="inne_choroby_ogoln" id="inne_choroby_ogoln" value={formData.inne_choroby_ogoln} onChange={handleChange}/>
                        <br />
                        
                        <label htmlFor="uwagi_choroby_ogoln">Uwagi: </label>
                        <textarea name="uwagi_choroby_ogoln" id="uwagi_choroby_ogoln" value={formData.uwagi_choroby_ogoln} onChange={handleChange}></textarea>

                        <br />
                        <br />

                        <label htmlFor="leki"><b>Przyjmowane leki: </b></label>
                        <textarea name="leki" id="leki"  value={formData.leki} onChange={handleChange}></textarea>

                        <br />
                        <br />

                        <label htmlFor="pierwsza_korekcja"><b>W którym roku życia stwierdzono wadę wzroku/pierwsza korekcja: </b></label>
                        <input type="text" name="pierwsza_korekcja" id="pierwsza_korekcja" value={formData.pierwsza_korekcja} onChange={handleChange}/>

                        <br />
                        <br />

                        <div className="rodzina-box">
                            <div>
                                <input type="checkbox" name="zez" id="zez" value="zez" checked={formData.zez} onChange={handleChange}/>
                                <label htmlFor="zez">Zez</label>
                            </div>
                            <div>
                                <input type="checkbox" name="uciekanie_oka" id="uciekanie_oka" value="uciekanie_oka" checked={formData.uciekanie_oka} onChange={handleChange}/>
                                <label htmlFor="uciekanie_oka">Uciekanie oka</label>
                            </div>
                            <div>
                                <input type="checkbox" name="obturacja" id="obturacja" value="obturacja" checked={formData.obturacja} onChange={handleChange}/>
                                <label htmlFor="obturacja">Obturacja</label>
                            </div> 
                        </div>

                        <br />

                        <label htmlFor="kiedy_jakie_uciekalo">Kiedy jakie oko uciekało: </label>
                        <input className="long-input" type="text" name="kiedy_jakie_uciekalo" id="kiedy_jakie_uciekalo" value={formData.kiedy_jakie_uciekalo} onChange={handleChange}/>

                        <br />
                        <br />

                        <label htmlFor="ciaza_porod"><b>Przebieg ciąży i porodu: </b></label>
                        <input className="long-input" type="text" name="ciaza_porod" id="ciaza_porod" value={formData.ciaza_porod} onChange={handleChange}/>

                        <br />
                        <br />



                        <p>Choroby oczu/ zaburzenia widzenia w rodzinie</p>

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

                        <label htmlFor="inna_rozinna_choroba">Inne: </label>
                        <input type="text" name="inna_rozinna_choroba" id="inna_rozinna_choroba" value={formData.inna_rozinna_choroba} onChange={handleChange}/>
                        <br />
                        
                        <label htmlFor="uwagi_rodzinne_choroby">Uwagi: </label>
                        <textarea name="uwagi_rodzinne_choroby" id="uwagi_rodzinne_choroby" value={formData.uwagi_rodzinne_choroby} onChange={handleChange}></textarea>

                        <br />
                        <br />

                        <p>Środowisko pracy</p>

                        <div className="grid-col-two-center">
                            <div>
                                <label htmlFor="praca_bliska_odl">Z bliskich odległości: </label>
                                <select name="praca_bliska_odl" id="praca_bliska_odl" value={formData.praca_bliska_odl} onChange={handleChange}>
                                    <option value="duzo">dużo</option>
                                    <option value="umiarkowanie">umiarkowanie</option>
                                    <option value="malo">mało</option>
                                </select>
                            </div>

                            <div className="extra-margin">
                                <label htmlFor="praca_komputer">Przy komputerze: </label>
                                <select name="praca_komputer" id="praca_komputer" value={formData.praca_komputer} onChange={handleChange}>
                                    <option value="duzo">dużo</option>
                                    <option value="umiarkowanie">umiarkowanie</option>
                                    <option value="malo">mało</option>
                                </select><br />

                                <label htmlFor="h_na_dobe">h/dobę: </label>
                                <input type="text" name="h_na_dobe" id="h_na_dobe" value={formData.h_na_dobe} onChange={handleChange}/>
                        <br />
                            </div>

                        </div>
                    
                        <br />
                        <br />

                        <p>Warunki pracy</p>
                        <div className="grid-col-two-center">
                            <div>
                                <input type="checkbox" name="warunki_kurz" id="warunki_kurz" value="warunki_kurz" checked={formData.warunki_kurz} onChange={handleChange}/>
                                <label htmlFor="warunki_kurz">Kurz</label>
                                <br />
                                <input type="checkbox" name="warunki_klimatyzacja" id="warunki_klimatyzacja" value="warunki_klimatyzacja" checked={formData.warunki_klimatyzacja} onChange={handleChange}/>
                                <label htmlFor="warunki_klimatyzacja">Klimatyzacja</label>
                            </div>
                            <div>
                                <input type="checkbox" name="warunki_oswietlenie" id="warunki_oswietlenie" value="warunki_oswietlenie" checked={formData.warunki_oswietlenie} onChange={handleChange}/>
                                <label htmlFor="warunki_oswietlenie">Sztuczne oświetkenie</label>
                                <br />
                                <input type="checkbox" name="warunki_chemia" id="warunki_chemia" value="warunki_oswiewarunki_chemiatlenie" checked={formData.warunki_chemia} onChange={handleChange}/>
                                <label htmlFor="warunki_chemia">Środki chemiczne</label>
                            </div>
                        </div>

                        <br />
                        <br />

                        <div className="grid-col-two-center">
                            <div>
                                <label htmlFor="inne_warunki">Inne: </label>
                                <input type="text" name="inne_warunki" id="inne_warunki" value={formData.inne_warunki} onChange={handleChange}/>
                            </div>

                            <div>
                                <label htmlFor="zawod">Zawód: </label>
                                <input type="text" name="zawod" id="zawod" value={formData.zawod} onChange={handleChange}/>
                            </div>
                        </div>

                        <br />
                        <br />


                        <div className="grid-col-two-center">
                            <div>
                                <label htmlFor="hobby"><b>Hobby: </b></label>
                                <input type="text" name="hobby" id="hobby" value={formData.hobby} onChange={handleChange}/>
                            </div>

                            <div className="extra-margin">
                                <label htmlFor="czytanie">Lubi czytać: </label>
                                <select name="czytanie" id="czytanie" value={formData.czytanie} onChange={handleChange}>
                                    <option value="tak">tak</option>
                                    <option value="nie">nie</option>
                                </select><br />
                                <input className="top-margin" type="text" name="czytanie_info" id="czytanie_info" value={formData.czytanie_info} onChange={handleChange}/>
                            </div>

                        </div>
                        
                        <br />
                        <br />

                        <label htmlFor="ostatnia_diagnoza"><b>Data i diagnoza ostatnich badań:</b> </label>
                        <input type="date" name="ostatnia_diagnoza_data" id="ostatnia_diagnoza_data" value={formData.ostatnia_diagnoza_data} onChange={handleChange}/>
                        <textarea name="ostatnia_diagnoza" id="ostatnia_diagnoza" value={formData.ostatnia_diagnoza} onChange={handleChange}></textarea>

                        <div className="button-box">
                            <button onClick={prevStep} className="wroc"><span>Wróć</span></button>
                            <button onClick={nextStep} className="dalej"><span>Dalej</span></button>
                        </div>
                    </div>
                )}

                {step === 5 && (
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
                                        <label htmlFor="ct_dal">Dal: </label>
                                        <input type="text" name="ct_dal" id="ct_dal" value={formData.ct_dal} onChange={handleChange}/><br />

                                        <label htmlFor="ct_bliz">Bliż: </label>
                                        <input type="text" name="ct_bliz" id="ct_bliz" value={formData.ct_bliz} onChange={handleChange}/>
                                    </div>
                                </div>
                                <div>
                                    <h3 id="pbk-name">PBK</h3>
                                    <div className="grid-col-two-center">
                                        <div>
                                            <label htmlFor="pbk">Pomiary: </label>
                                            <textarea name="pbk" id="pbk" value={formData.pbk} onChange={handleChange}/>                                            
                                        </div>
                                        <div>
                                            <label htmlFor="uwagi_pbk">Uwagi: </label>
                                            <textarea name="uwagi_pbk" id="uwagi_pbk" value={formData.uwagi_pbk} onChange={handleChange}></textarea>
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

                            <br />

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
                            

                            <div className="button-box">
                                <button onClick={prevStep} className="wroc"><span>Wróć</span></button>
                                <button onClick={nextStep} className="dalej"><span>Dalej</span></button>
                            </div>
                        </div>
                )}

                {step === 6 && (
                    <div>
                        <h3>Badania diagnostyczne</h3>
                        <p>Aktualna korekcja</p>

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
                        

                        <div className="center">
                            <label htmlFor="badanie_refrakcji">
                                Przedmiotowe badanie refrakcji:  
                            </label><br />
                            <select name="cyklopegia" id="cyklopegia" value={formData.cyklopegia} onChange={handleChange}>
                                <option value="bez_cyklopegii">Bez cyklopegii</option>
                                <option value="z_cyklopegią"> Z cyklopegią</option>
                            </select>
                            <input type="text" name="badanie_refrakcji" id="badanie_refrakcji" value={formData.badanie_refrakcji} onChange={handleChange}/>
                        </div>

                        <div className="display-center">
                            <table>
                            <tbody>
                                <tr>
                                    <td><b>autorefraktometr</b></td>
                                    <td><b>Sph</b></td>
                                    <td><b>cyl</b></td>
                                    <td><b>ax</b></td>
                                </tr>
                                <tr>
                                    <td>OP</td>
                                    <td><input type="text" name="refraktometr_op_sph" id="refraktometr_op_sph" value={formData.refraktometr_op_sph} onChange={handleChange} /></td>

                                    <td><input type="text" name="refraktometr_op_cyl" id="refraktometr_op_cyl" value={formData.refraktometr_op_cyl} onChange={handleChange} /></td>

                                    <td><input type="text" name="refraktometr_op_ax" id="refraktometr_op_ax" value={formData.refraktometr_op_ax} onChange={handleChange} /></td>
                                </tr>
                                <tr>
                                    <td>OL</td>
                                    <td><input type="text" name="refraktometr_ol_sph" id="refraktometr_ol_sph" value={formData.refraktometr_ol_sph} onChange={handleChange} /></td>

                                    <td><input type="text" name="refraktometr_ol_cyl" id="refraktometr_ol_cyl" value={formData.refraktometr_ol_cyl} onChange={handleChange} /></td>

                                    <td><input type="text" name="refraktometr_ol_ax" id="refraktometr_ol_ax" value={formData.refraktometr_ol_ax} onChange={handleChange} /></td>
                                </tr>
                            </tbody>
                        </table>
                        </div>

                        <br />
                        <br />

                        <div className="display-center">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <b>
                                                <label htmlFor="skiaskopia">Skiaskopia stat. </label>
                                            </b>
                                        </td>
                                        <td><b>Sph</b></td>
                                        <td><b>cyl</b></td>
                                        <td><b>ax</b></td>
                                    </tr>
                                    <tr>
                                        <td>OP</td>
                                        <td><input type="text" name="skiaskopia_op_sph" id="skiaskopia_op_sph" value={formData.skiaskopia_op_sph} onChange={handleChange} /></td>

                                        <td><input type="text" name="skiaskopia_op_cyl" id="skiaskopia_op_cyl" value={formData.skiaskopia_op_cyl} onChange={handleChange} /></td>

                                        <td><input type="text" name="skiaskopia_op_ax" id="skiaskopia_op_ax" value={formData.skiaskopia_op_ax} onChange={handleChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>OL</td>
                                        <td><input type="text" name="skiaskopia_ol_sph" id="skiaskopia_ol_sph" value={formData.skiaskopia_ol_sph} onChange={handleChange} /></td>

                                        <td><input type="text" name="skiaskopia_ol_cyl" id="skiaskopia_ol_cyl" value={formData.skiaskopia_ol_cyl} onChange={handleChange} /></td>

                                        <td><input type="text" name="skiaskopia_ol_ax" id="skiaskopia_ol_ax" value={formData.skiaskopia_ol_ax} onChange={handleChange} /></td>
                                    </tr>
                                </tbody>
                            </table>
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
                                    <td colSpan={2}>Visus do bliży c.add</td>
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
                                    <label htmlFor="foria"><b>Foria: </b></label>
                                </div>
                                <div>
                                    <label htmlFor="metoda_foria_dal">metoda: </label>
                                    <input type="text" name="metoda_foria_dal" id="metoda_foria_dal" value={formData.metoda_foria_dal} onChange={handleChange} />
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
                                    <label htmlFor="zez_dal"><b>Zez</b></label>
                                </div>
                                <div>
                                    <input type="text" name="zez_dal" id="zez_dal" value={formData.zez_dal} onChange={handleChange}/>
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
                                <div className="grid-col-two">
                                    <label htmlFor="fuzja_w_bliz">t. Wortha</label>
                                    <input type="text" name="fuzja_w_bliz" id="fuzja_w_bliz" value={formData.fuzja_w_bliz} onChange={handleChange}/>
                                    <label htmlFor="fuzja_s_bliz">t. Schobera</label>
                                    <input type="text" name="fuzja_s_bliz" id="fuzja_s_bliz" value={formData.fuzja_s_bliz} onChange={handleChange} />
                                </div>

                                <div>
                                    <label htmlFor="foria"><b>Foria: </b></label>
                                </div>
                                <div>
                                    <label htmlFor="metoda_foria_bliz">metoda: </label>
                                    <input type="text" name="metoda_foria_bliz" id="metoda_foria_bliz" value={formData.metoda_foria_bliz} onChange={handleChange} />
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
                                    <label htmlFor="foria_bliz"><b>Foria: </b></label>
                                    <select name="foria_bliz" id="foria_bliz" value={formData.zez_foria_bliz} onChange={handleChange}>
                                        <option value="+ 1,0">+ 1,0</option>
                                        <option value="- 1,0">- 1,0</option>
                                    </select>
                                </div>
                                <div>
                                    <input type="text" name="foria_info_bliz" id="foria_info_bliz" value={formData.foria_info_bliz} onChange={handleChange}/>
                                </div>
                                    
                                <div>
                                    <label htmlFor="ac_ag"><b>AC / Ag: </b></label>
                                    
                                </div>
                                <div>
                                    <input type="text" name="ac_ag" id="ac_ag" value={formData.ac_ag} onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <br />
                    <br />

                    <table className="half-table">
                        <tbody>
                            <tr>
                                <td colSpan={3}><b>Listwa pryzm.</b></td>
                                <td><b>Zakres BS</b></td>
                                <td><b>Zakres BN</b></td> 
                            </tr>
                            <tr>
                                <td><b>6 m</b></td>
                                <td><b>obk</b></td>
                                <td>
                                    <input type="text" name="pct_6" id="pct_6" value={formData.pct_6} onChange={handleChange}/>
                                </td>
                                <td>
                                    <input type="text" name="zakres_6_bs" id="zakres_6_bs" value={formData.zakres_6_bs} onChange={handleChange}/>
                                </td>
                                <td>
                                    <input type="text" name="zakres_6_bn" id="zakres_6_bn" value={formData.zakres_6_bn} onChange={handleChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td><b>0,4 m</b></td>
                                <td><b>obk</b></td>

                                <td>
                                    <input type="text" name="pct_4" id="pct_4" value={formData.pct_4} onChange={handleChange}/>
                                </td>
                                <td>
                                    <input type="text" name="zakres_4_bs" id="zakres_4_bs" value={formData.zakres_4_bs} onChange={handleChange}/>
                                </td>
                                <td>
                                    <input type="text" name="zakres_4_bn" id="zakres_4_bn" value={formData.zakres_4_bn} onChange={handleChange}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <br />
                    <br />

                    <div className="grid-col-two-center">
                        <div>
                            <label htmlFor="korespondencja_siatkowa">
                                <b>Korespondencja siatkowa </b>(metoda: <input type="text" name="korespondencja_siatkowa" id="korespondencja_siatkowa" value={formData.korespondencja_siatkowa} onChange={handleChange}/>)
                            </label>
                        </div>

                        <div className="extra-margin">
                            <label htmlFor="fiksacja">
                                <b>Fiksacja: </b>
                            </label>
                            <select name="fiksacja_wybor" id="fiksacja_wybor" value={formData.fiksacja_wybor} onChange={handleChange}>
                                <option value="orientacyjnie">orientacyjnie</option>
                                <option value="ilosciowo">ilościowo</option>
                            </select>
                            <input type="text" name="fiksacja" id="fiksacja" value={formData.fiksacja} onChange={handleChange}/>
                        </div>
                    </div>

                    

                    <br />

                    <label htmlFor="inne_badania">Inne badania / próby pryzmatyczne</label>
                    <textarea name="inne_badania" id="inne_badania" value={formData.inne_badania} onChange={handleChange}></textarea>

                    <br />
                    <br />

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
                        <label htmlFor="fliper"><b>Fliper: </b> </label>
                        <select name="fliper" id="fliper" value={formData.fliper} onChange={handleChange}>
                            <option value="+">+</option>
                            <option value="-">-</option>
                        </select>
                        <input type="text" name="fliper_info" id="fliper_info" value={formData.fliper_info} onChange={handleChange}/>
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


                    <div>
                        <h3 id="pbk-name">PBK</h3>
                        <div className="grid-col-two-center">
                            <div className="long-input display-center">
                                <label htmlFor="pbk2">Pomiary [cm] : </label>
                                <textarea name="pbk2" id="pbk2" value={formData.pbk2} onChange={handleChange}/>                                            
                            </div>
                            <div className="display-center">
                                <label htmlFor="uwagi_pbk2">Uwagi: </label>
                                <textarea name="uwagi_pbk2" id="uwagi_pbk2" value={formData.uwagi_pbk2} onChange={handleChange}></textarea>
                            </div>
                        </div>
                    </div>

                    <br />
                    <br />

                    <label htmlFor="zalecane_konsultacje"><b>Zalecane konsultacje:</b> </label>
                    <textarea name="zalecane_konsultacje" id="zalecane_konsultacje" value={formData.zalecane_konsultacje} onChange={handleChange}></textarea>



                    <div className="button-box">
                        <button onClick={prevStep} className="wroc"><span>Wróć</span></button>
                        <button onClick={nextStep} className="dalej"><span>Dalej</span></button>
                    </div>
                </div>
                )}

                {step === 7 && (
                    <div>
                        <label htmlFor="ostateczna_diagnoza">Diagnoza: </label>
                        <textarea name="ostateczna_diagnoza" id="ostateczna_diagnoza" value={formData.ostateczna_diagnoza} onChange={handleChange}></textarea>

                        <label htmlFor="ostateczne_uwagi">Uwagi: </label>
                        <textarea name="ostateczne_uwagi" id="ostateczne_uwagi" value={formData.ostateczne_uwagi} onChange={handleChange}></textarea>

                        <br />
                        <br />

                        <label htmlFor="proponowana_korekcja"><b>Proponowana korekcja</b> dla VD</label> 
                        <input type="text" name="proponowana_korekcja" id="proponowana_korekcja" value={formData.proponowana_korekcja} onChange={handleChange}/> 


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

                        <br />


                        <label htmlFor="dodatkowe_postepowania"><b>Dodatkowe postepowania: </b></label>
                        <textarea name="dodatkowe_postepowania" id="dodatkowe_postepowania" value={formData.dodatkowe_postepowania} onChange={handleChange}></textarea>

                        <br />


                        <div className="button-box">
                            <button onClick={prevStep} className="wroc"><span>Wróć</span></button>
                            <button onClick={() => handleSubmit('adult')} className="dalej"><span>Zapisz</span></button>
                        </div>
                    </div>
                )}
                
            </section>
        </div>
    )

}
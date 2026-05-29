import { useEffect, useState } from "react";
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";
import CardHeader from "../../components/CardHeader";
import ProgressBar from "../../components/ProgressBard"
import { useFormData } from '../../hooks/useFormData';
import prawe from "../../assets/kolo_p.png";
import lewe from "../../assets/kolo_l.png";
import { LogOut, ArrowBigLeft } from "lucide-react";

export default function ChildrenControlCard() {
   
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const[visibility, setVisibility] = useState(1)
    const { formData, setFormData, formId, setFormId, handleChange, handleSubmit } = useFormData({
        // krok 1
        imie: '',
        nazwisko: '',
        data_urodzenia: '',
        kontakt: '',
        ostatnie_badania: '',
        stosowanie_zlecenia: '',
        skarga_glowna: '',

        // krok 2 - CT/PCT
        ct_dal: '',
        ct_bliz: '',

        // krok 2 - PBK
        pbk: '',
        uwagi_pbk: '',
        pbk2: '',
        pbk3: '',
        pbk2_wybor: '',
        pbk3_wybor: '',
        rodzaj_targetu1: '',
        rodzaj_targetu2: '',

        // krok 2 - ruchy oczu OL
        ruch_ol1: '++',
        ruch_ol2: '++',
        ruch_ol3: '++',
        ruch_ol4: '++',
        ruch_ol5: '++',
        ruch_ol6: '++',
        ruch_ol7: '++',
        ruch_ol8: '++',

        // krok 2 - ruchy oczu OP
        ruch_op1: '++',
        ruch_op2: '++',
        ruch_op3: '++',
        ruch_op4: '++',
        ruch_op5: '++',
        ruch_op6: '++',
        ruch_op7: '++',
        ruch_op8: '++',

        // krok 2 - NSUCO
        sledzenie: '',
        sakady: '',
        obserwacje: '',

        // krok 3 - aktualna korekcja dal
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

        // krok 3 - aktualna korekcja bliż
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

        // krok 3 - refraktometr
        cyklopegia: 'bez_cyklopegii',
        badanie_refrakcji: '',
        refraktometr_op_sph: '',
        refraktometr_op_cyl: '',
        refraktometr_op_ax: '',
        refraktometr_ol_sph: '',
        refraktometr_ol_cyl: '',
        refraktometr_ol_ax: '',

        // krok 3 - skiaskopia
        skiaskopia: '',
        skiaskopia_op_sph: '',
        skiaskopia_op_cyl: '',
        skiaskopia_op_ax: '',
        skiaskopia_ol_sph: '',
        skiaskopia_ol_cyl: '',
        skiaskopia_ol_ax: '',

        // krok 3 - podmiotowe badanie refrakcji
        add_odleglosc: '',
        bliz_visus_ref: 's add',
        ref_op_sph: '',
        ref_op_cyl: '',
        ref_op_ax: '',
        ref_op_add: '',
        ref_op_visus_dal: '',
        ref_wsp_visus_dal: '',
        ref_op_visus_bliz: '',
        ref_wsp_visus_bliz: '',
        ref_ol_sph: '',
        ref_ol_cyl: '',
        ref_ol_ax: '',
        ref_ol_add: '',
        ref_ol_visus_dal: '',
        ref_ol_visus_bliz: '',

        // krok 3 - widzenie do dali
        stereo_dal: '',
        stereo_test_dal: '',
        fuzja_w_dal: '',
        fuzja_s_dal: '',
        metoda_ust_oczu_dal: '',
        horyzontalnie_ust_dal: '',
        hor_bn1_dal: '',
        hor_bn2_dal: '',
        hor_bn3_dal: '',
        hor_bs1_dal: '',
        hor_bs2_dal: '',
        hor_bs3_dal: '',
        vertykalnie_dal: '',
        bg1_op_dal: '',
        bg2_op_dal: '',
        bd1_op_dal: '',
        bd2_op_dal: '',
        bg1_ol_dal: '',
        bg2_ol_dal: '',
        bd1_ol_dal: '',
        bd2_ol_dal: '',
        roznica_fiksacji_dal: '',
        zez_foria_dal: '',

        // widzenie obuoczne dal
        stereo_dal: '', stereo_test_dal: '',
        fuzja_w_dal: '', fuzja_s_dal: '',
        metoda_foria_dal: '',
        horyzontalnie_ust_dal: '',
        hor_bn_dal: '', hor_bs_dal: '',
        vertykalnie_dal: '',
        bg_op_dal: '', bd_op_dal: '',
        bg_ol_dal: '', bd_ol_dal: '',
        zez_foria_dal: '',
        roznica_fiksacji_dal:'',
        roznica_fiksacji_bliz:'',

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

        // krok 3 - listwa pryzmatyczna
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

        // krok 3 - PBK obuoczne
        pbk_obuoczne_bliz: '',
        pbk_obuoczne_bliz2: '',

        // krok 3 - fiksacja
        korespondencja_siatkowa: '',
        fiksacja_oftalmoskop: '',
        centralna: '',
        ekscentryczna: '',
        stabilna: '',
        niestabilna: '',
        kierunek_ef: '',
        inne_badania: '',

        // krok 3 - akomodacja
        akomodacja_ospowiedz: '',
        akomodacja_op: '',
        akomodacja_ol: '',
        uwa: '',
        dwa: '',
        akomodacja_amplituda: '',
        amplituda_op_cm: '',
        amplituda_op_dptr: '',
        amplituda_ol_cm: '',
        amplituda_ol_dptr: '',
        norma: '',
        sprawnosc: '+',
        sprawnosc_op: '',
        sprawnosc_op_wybor: 'cykl',
        sprawnosc_ol: '',
        sprawnosc_ol_wybor: 'cykl',
        uwagi_akomodacja: '',

        // krok 4 - diagnoza i zalecenia
        ostateczna_diagnoza: '',
        zalecenia: '',
        proponowana_korekcja1: '',
        prop_dal_op_sph: '',
        prop_dal_op_cyl: '',
        prop_dal_op_ax: '',
        prop_dal_op_pryzma: '',
        prop_dal_op_baza: '',
        prop_dal_op_pd: '',
        prop_dal_ol_sph: '',
        prop_dal_ol_cyl: '',
        prop_dal_ol_ax: '',
        prop_dal_ol_pryzma: '',
        prop_dal_ol_baza: '',
        prop_dal_ol_pd: '',
        prop_bliz_op_sph: '',
        prop_bliz_op_cyl: '',
        prop_bliz_op_ax: '',
        prop_bliz_op_pryzma: '',
        prop_bliz_op_baza: '',
        prop_bliz_op_pd: '',
        prop_bliz_ol_sph: '',
        prop_bliz_ol_cyl: '',
        prop_bliz_ol_ax: '',
        prop_bliz_ol_pryzma: '',
        prop_bliz_ol_baza: '',
        prop_bliz_ol_pd: '',
        proponowana_korekcja2: '',
        proponowana_korekcja3: '',
        proponowana_korekcja4: '',
        proponowana_korekcja5: '',
}, 'children-control')

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
                <h1>Karta kontrolna pacjenta - dziecięca</h1>
                <p>Data: {CurrentDate()}</p>
            </header>
            <section className="glass-card">
                <ProgressBar step={step} totalSteps={4}/>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className={`step-content ${visibility ? 'visible' : ''}`}>
                        {step === 1 && (
                            <div>
                                <CardHeader formData={formData} handleChange={handleChange} />

                                <label htmlFor="ostatnie_badania"><b>Data i diagnoza ostatnich badań: </b></label>
                                <textarea name="ostatnie_badania" id="ostatnie_badania" value={formData.ostatnie_badania} onChange={handleChange}></textarea>
                                <br />

                                <label htmlFor="stosowanie_zlecenia"><b>Stosowanie się do zleceń: </b></label>
                                <textarea name="stosowanie_zlecenia" id="stosowanie_zlecenia" value={formData.stosowanie_zlecenia} onChange={handleChange}></textarea>
                                <br />

                                <label htmlFor="skarga_glowna"><b>Skarga główna: </b></label>
                                <textarea name="skarga_glowna" id="skarga_glowna" value={formData.skarga_glowna} onChange={handleChange}></textarea>
                                <br />

                                <div className="button-box">
                                    <button onClick={() => navigate(`/choose-card`)} className="wroc"><span>Wróć</span></button>
                                    <button onClick={nextStep} className="dalej"><span>Dalej</span></button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                            <h3>Badanie wstępne i orientacyjne</h3>
                            
                            <div className="grid-col-two-center">
                                
                                <div>
                                    <h3>CT / PCT</h3>
                                    <div className="badania-width grid-col-two-perm">
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
                            
                            <h3 className="center without-margin">Ruch oczu</h3>

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

                            <div className="button-box">
                                <button onClick={prevStep} className="wroc"><span>Wróć</span></button>
                                <button onClick={nextStep} className="dalej"><span>Dalej</span></button>
                            </div>
                        </div>
                        )}

                        {step === 3 && (
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
                                                    <label htmlFor="skiaskopia">Skiaskopia: </label>
                                                    <input type="text" name="skiaskopia" id="skiaskopia" value={formData.skiaskopia} onChange={handleChange} />
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
                                <div className="grid-col-two">
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
                                    <label htmlFor="roznica_fiksacji_bliz"><b>Różnice fiksacji:</b> </label>
                                </div>
                                <div>
                                    <input type="text" name="roznica_fiksacji_bliz" id="roznica_fiksacji_bliz" value={formData.roznica_fiksacji_bliz} onChange={handleChange} />
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

                        <br />
                        <br />

                        <p className="center">Akomodacja</p>

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
                                <input type="text" name="akomodacja_ol" id="akomodacja_ol" value={formData.akomodacja_ol} onChange={handleChange} />
                            </div>
                            <div className="add-pading input-between-pading">
                                <label htmlFor="uwa">UWA: <input type="text" name="uwa" id="uwa" value={formData.uwa} onChange={handleChange}/> dpt.</label>
                            
                                <label htmlFor="dwa">DWA: <input type="text" name="dwa" id="dwa" value={formData.dwa} onChange={handleChange}/> dpt.</label>
                            </div>
                        </div>

                        <br />
                        <br />

                        <div className="display-center">
                            <label htmlFor="akomodacja_amplituda"><b>Amplituda akom. </b>(metoda <input type="text" name="akomodacja_amplituda" id="akomodacja_amplituda" value={formData.akomodacja_amplituda} onChange={handleChange} /> )</label>
                        </div>

                        <br />

                        <div className="grid-col-two-center">
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
                        </div>

                        <br />

                        <div className="display-center">
                            <label htmlFor="norma">Norma: </label>
                            <input type="text" name="norma" id="norma" value={formData.norma} onChange={handleChange} />

                            
                        </div>

                        <br />
                        <br />

                        <div className="display-center">
                            <label htmlFor="sprawnosc"><b>Sprawność: </b> </label>
                            <select name="sprawnosc" id="sprawnosc" value={formData.sprawnosc} onChange={handleChange}>
                                <option value="+">+</option>
                                <option value="-">-</option>
                            </select>
                        </div>

                        <br />

                        <div className="grid-col-two-center">
                            <div>
                                <label htmlFor="sprawnosc_op">Oko prawe: </label>
                                <input type="text" name="sprawnosc_op" id="sprawnosc_op" value={formData.sprawnosc_op} onChange={handleChange}/>
                                <select name="sprawnosc_op_wybor" id="sprawnosc_op_wybor" value={formData.sprawnosc_op_wybor} onChange={handleChange}>
                                    <option value="cykl">cykl</option>
                                    <option value="min">min</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="sprawnosc_ol">Oko lewe: </label>
                                <input type="text" name="sprawnosc_ol" id="sprawnosc_ol" value={formData.sprawnosc_ol} onChange={handleChange}/>
                                <select name="sprawnosc_ol_wybor" id="sprawnosc_ol_wybor" value={formData.sprawnosc_ol_wybor} onChange={handleChange}>
                                    <option value="cykl">cykl</option>
                                    <option value="min">min</option>
                                </select>
                            </div>
                        </div>

                        <br />

                        <label htmlFor="uwagi_akomodacja">Uwagi: </label>
                        <textarea name="uwagi_akomodacja" id="uwagi_akomodacja" value={formData.uwagi_akomodacja} onChange={handleChange}></textarea>



                        <div className="button-box">
                            <button onClick={prevStep} className="wroc"><span>Wróć</span></button>
                            <button onClick={nextStep} className="dalej"><span>Dalej</span></button>
                        </div>
                    </div>
                        )}

                        {step === 4 && (
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

                            <ol start={2} className="diagnoza-list">
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
                                <button onClick={() => handleSubmit('children-control')} className="dalej"><span>Zapisz</span></button>
                            </div>
                        </div>
                        )}
                        

                    </div>
                </form>
            </section>
        </div>
        
    )

}
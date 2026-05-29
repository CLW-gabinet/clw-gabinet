import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import './ChildrenCardInfo.css' // ten sam CSS co ChildrenCardInfo
import { ArrowBigLeft } from 'lucide-react'


function DottedLine({ label, value }) {
    return (
        <div className="dotted-line">
            {label && <span className="field-label">{label}</span>}
            <span className="dotted-fill">{value || ''}</span>
        </div>
    )
}

function Field({ label, value }) {
    return (
        <span className="field-inline">
            <span className="field-label">{label}</span>
            <span className="field-value">{value || '………………'}</span>
        </span>
    )
}

export default function AdultControlCardInfo() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [createdAt, setCreatedAt] = useState(null)
    const [doctorInfo, setDoctorInfo] = useState(null)
    const [lastEditInfo, setLastEditInfo] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const { data: form, error } = await supabase
                .from('patient_forms')
                .select('form_data, created_at, doctor_id, last_edited_by')
                .eq('id', id)
                .single()

            if (error || !form) {
                navigate('/choose-card')
                return
            }

            // doctor_id zawsze istnieje
            const { data: doctorData } = await supabase
                .from('profiles')
                .select('imie, nazwisko')
                .eq('id', form.doctor_id)
                .single()

            // last_edited_by może być null — sprawdzamy przed zapytaniem
            let lastEditData = null
            if (form.last_edited_by) {
                const { data } = await supabase
                    .from('profiles')
                    .select('imie, nazwisko')
                    .eq('id', form.last_edited_by)
                    .single()
                lastEditData = data
            }

            setData(form.form_data)
            setCreatedAt(form.created_at)
            setDoctorInfo(doctorData)
            setLastEditInfo(lastEditData)
            setLoading(false)
        }
        fetchData()
    }, [id])

    if (loading) return <div className="loading">Ładowanie...</div>

    const d = data

    const oko = (val, p, l) =>
        val === p ? 'OP' : val === l ? 'OL' : 'nieustalone'

    const reka = (val) =>
        val === 'dom_reka1' ? 'P' : val === 'dom_reka2' ? 'L' : '–'

    const noga = (val) =>
        val === 'dom_noga1' ? 'P' : val === 'dom_noga2' ? 'L' : '–'

    return (
        <div className="info-page">

            {/* Przyciski — ukrywane przy druku */}
            <div className="info-actions no-print">
                <button className="return" onClick={() => navigate('/search-card')}>
                    <ArrowBigLeft size={18} />
                </button>
                <button className="dalej" onClick={() => navigate(`/card/adult/edit/${id}`)}>
                    <span>Edytuj</span>
                </button>
                <button className="dalej" onClick={() => window.print()}>
                    <span>Drukuj</span>
                </button>
            </div>

            <div className="display-center">
                <div className="karta-papier">

                    <div className="karta-naglowek">
                        <strong>KARTA KONTROLNERGO BADANIA OPTOMETRYCZNEGO – Dorosły®</strong>
                        <span>
                            <strong>Data:</strong> {createdAt 
                                ? new Date(createdAt).toLocaleDateString() 
                                : '–'}
                        </span>
                    </div>

                    <div className="karta-row">
                        <Field label="Nazwisko:" value={d.nazwisko} />
                        <Field label="Imię:" value={d.imie} />
                    </div>
                    <div className="karta-row">
                        <Field label="Data urodzenia:" value={d.data_urodzenia} />
                        <Field label="Tel:" value={d.kontakt} />
                    </div>

                    <div className="karta-separator">{'*'.repeat(90)}</div>

                    {/* DOLEGLIWOŚCI */}
                    <div className="karta-sekcja-naglowek">Informacje ogólne</div>
                    <DottedLine label="Opis zgłaszanych dolegliwości:" value={d.dolegliwosci} />

                    <div className="karta-linia">
                        <strong>Inne dolegliwości: </strong>
                        <span>
                            {[
                                d.dol_bol_oczu && 'ból oczu',
                                d.dol_zmeczenie && 'zmęczenie',
                                d.dol_zasypianie && 'zasypianie podczas czytania',
                                d.dol_lzawienie && 'łzawienie',
                                d.dol_zaczerwienienie && 'zaczerwienienie oczu',
                                d.dol_piasek && 'uczucie piasku pod powiekami',
                                d.dol_bol_glowy && 'ból głowy',
                                d.dol_podwojne_daleka && 'podwójne widzenie z daleka',
                                d.dol_podwojne_bliska && 'podwójne widzenie z bliska',
                                d.dol_blyski && 'błyski przed oczami',
                                d.dol_mroczki && 'mroczki przed oczami',
                                d.dol_otoczki && 'barwne otoczki wokół świateł',
                            ].filter(Boolean).join(', ') || '–'}
                        </span>
                    </div>
                    {d.dolegliwosci_uwagi && <DottedLine label="Uwagi:" value={d.dolegliwosci_uwagi} />}

                    <div className="karta-separator">{'*'.repeat(90)}</div>

                    {/* KOREKCJA */}
                    <div className="karta-linia grid-col-two">
                        <div>
                            <strong>Noszone są: </strong>
                            {d.ocena_komfortu_okul_bliz ? 'okulary' : d.ocena_komfortu_okul_dal ? 'okulary' : d.ocena_komfortu_okul_inne ? 'okulary' : ''}
                            {d.ocena_komfortu_okul_bliz && 
                                <>
                                    <div className="karta-linia">
                                        <strong>Okulary BLIŻ: </strong>
                                        {d.ocena_komfortu_okul_bliz === 'komfort' ? 'komfort' : 'brak komfortu'} |
                                        noszone {d.czestotliwosc_bliz === 'stale' ? 'stale' : `okresowo`}
                                        {d.czestotliwosc_bliz === 'okresowo' && d.przyczyna_zdejmowania_bliz &&
                                            ` (${d.przyczyna_zdejmowania_bliz})`}
                                    </div>
                                </>
                            }

                            {d.ocena_komfortu_okul_dal && 
                                <>
                                    <div className="karta-linia">
                                        <strong>Okulary DAL: </strong>
                                        {d.ocena_komfortu_okul_dal === 'komfort' ? 'komfort' : 'brak komfortu'} |
                                        noszone {d.czestotliwosc_dal === 'stale' ? 'stale' : `okresowo`}
                                        {d.czestotliwosc_dal === 'okresowo' && d.przyczyna_zdejmowania_dal &&
                                            ` (${d.przyczyna_zdejmowania_dal})`}
                                    </div>
                                    {d.typ_okularow_inne && (
                                        <div className="karta-linia">
                                            <strong>Inne okulary ({d.typ_okularow_inne}): </strong>
                                            {d.ocena_komfortu_okul_inne === 'komfort' ? 'komfort' : 'brak komfortu'} |
                                            noszone {d.czestotliwosc_inne === 'stale' ? 'stale' : `okresowo`}
                                            {d.czestotliwosc_inne === 'okresowo' && d.przyczyna_zdejmowania_inne &&
                                                ` (${d.przyczyna_zdejmowania_inne})`}
                                        </div>
                                    )}
                                </>
                            }

                            {d.ocena_komfortu_okul_inne && 
                                <>
                                    <div className="karta-linia">
                                        <strong>Okulary inne: </strong>
                                        {d.ocena_komfortu_okul_inne === 'komfort' ? 'komfort' : 'brak komfortu'} |
                                        noszone {d.czestotliwosc_inne === 'stale' ? 'stale' : `okresowo`}
                                        {d.czestotliwosc_inne === 'okresowo' && d.przyczyna_zdejmowania_inne &&
                                            ` (${d.przyczyna_zdejmowania_inne})`}
                                    </div>
                                    {d.typ_okularow_inne && (
                                        <div className="karta-linia">
                                            <strong>Inne okulary ({d.typ_okularow_inne}): </strong>
                                            {d.ocena_komfortu_okul_inne === 'komfort' ? 'komfort' : 'brak komfortu'} |
                                            noszone {d.czestotliwosc_inne === 'stale' ? 'stale' : `okresowo`}
                                            {d.czestotliwosc_inne === 'okresowo' && d.przyczyna_zdejmowania_inne &&
                                                ` (${d.przyczyna_zdejmowania_inne})`}
                                        </div>
                                    )}
                                </>
                            }
                        </div>

                        <div>
                            {d.typ_soczewek1 ? <><strong>Noszone są: </strong>soczewki</>: d.typ_soczewek2 ? <><strong>Noszone są: </strong>soczewki</> : d.typ_soczewek3 ? <><strong>Noszone są: </strong>soczewki</> : ''}

                            {d.typ_soczewek1 && 
                                <>
                                    <div className="karta-linia">
                                        <strong>Typ {d.typ_soczewek1}: </strong>
                                        {d.ocena_komfortu_socz1 === 'komfort' ? 'komfort' : 'brak komfortu'} {d.ocena1}/10p
                                    </div>
                                </>
                            }

                            {d.typ_soczewek2 && 
                                <>
                                    <div className="karta-linia">
                                        <strong>Typ {d.typ_soczewek2}: </strong>
                                        {d.ocena_komfortu_socz2 === 'komfort' ? 'komfort' : 'brak komfortu'} {d.ocena2}/10p
                                    </div>
                                </>
                            }

                            {d.typ_soczewek3 && 
                                <>
                                    <div className="karta-linia">
                                        <strong>Typ {d.typ_soczewek3}: </strong>
                                        {d.ocena_komfortu_socz3 === 'komfort' ? 'komfort' : 'brak komfortu'} {d.ocena3}/10p
                                    </div>
                                </>
                            }
                        </div>
                        
                    </div>

                    {d.uwagi && <DottedLine label="Uwagi:" value={d.uwagi} />}

                    <div className="karta-separator">{'*'.repeat(90)}</div>

                    {/* WYWIAD */}
                    <div className="karta-linia">
                        <strong>Choroby oczu \ leczenie: </strong>
                        {[
                            d.choroba1 && 'infekcje',
                            d.choroba2 && 'zapalenie spojówek',
                            d.choroba3 && 'syndrom suchego oka',
                            d.choroba4 && 'zmętnienia ośrodków opt',
                            d.choroba5 && 'urazy mechaniczne',
                            d.choroba6 && 'zaburzenia funkcji powiek',
                            d.choroba7 && 'jaskra',
                            d.choroba8 && 'zaćma',
                            d.inne_choroby,
                        ].filter(Boolean).join(', ') || '–'}
                    </div>
                    {d.uwagi_chorob && <DottedLine label="Uwagi:" value={d.uwagi_chorob} />}

                    <div className="karta-linia">
                        <strong>Choroby ogólnoustrojowe: </strong>
                        {[
                            d.choroba_ogoln1 && 'cukrzyca',
                            d.choroba_ogoln2 && 'nadciśnienie',
                            d.choroba_ogoln3 && 'ch. serca i krążenia',
                            d.choroba_ogoln4 && 'ch. endokrynologiczne',
                            d.choroba_ogoln5 && 'ch. reumatyczne',
                            d.choroba_ogoln6 && 'ch. układu oddechowego',
                            d.choroba_ogoln7 && 'ch. układu pokarmowego',
                            d.choroba_ogoln8 && 'ch. neurologiczne',
                            d.choroba_ogoln9 && 'ch. układu ruchowego',
                            d.choroba_ogoln10 && 'alergie',
                            d.inne_choroby_ogoln,
                        ].filter(Boolean).join(', ') || '–'}
                    </div>
                    {d.uwagi_choroby_ogoln && <DottedLine label="Uwagi:" value={d.uwagi_choroby_ogoln} />}

                    <DottedLine label="Przyjmowane leki:" value={d.leki} />

                    <DottedLine
                        label="W którym roku życia stwierdzono wadę wzroku / pierwsza korekcja:"
                        value={d.pierwsza_korekcja}
                    />

                    {/* ZEZ / UCIEKANIE OKA */}
                    <div className="karta-linia">
                        {[
                            d.zez && 'zez',
                            d.uciekanie_oka && 'uciekanie oka',
                            d.obturacja && 'obturacja',
                        ].filter(Boolean).join(', ')}
                        {d.kiedy_jakie_uciekalo && ` — kiedy/jakie oko uciekało: ${d.kiedy_jakie_uciekalo}`}
                    </div>

                    {d.ciaza_porod && <DottedLine label="Przebieg ciąży i porodu:" value={d.ciaza_porod} />}

                    {/* RODZINA */}
                    <div className="karta-linia">
                        <strong>Choroby oczu / zaburzenia widzenia w rodzinie </strong>
                        ({[
                            d.rodzice && 'rodzice',
                            d.rodzenstwo && 'rodzeństwo',
                            d.dziadkowie && 'dziadkowie',
                        ].filter(Boolean).join(', ') || '–'}):&nbsp;
                        {[
                            d.krotkowzrok && 'krótkowzrok',
                            d.nadzwrok && 'nadwzrok',
                            d.astygmatyzm && 'astygmatyzm',
                            d.jaskra && 'jaskra',
                            d.zacma && 'zaćma',
                            d.inna_rozinna_choroba,
                        ].filter(Boolean).join(', ') || '–'}
                    </div>
                    {d.uwagi_rodzinne_choroby && <DottedLine label="Uwagi:" value={d.uwagi_rodzinne_choroby} />}

                    {/* ŚRODOWISKO PRACY */}
                    <div className="karta-linia">
                        <strong>Środowisko pracy: </strong>
                        z bliskich odległości: {d.praca_bliska_odl || '–'} |
                        komputer: {d.praca_komputer || '–'}
                        {d.h_na_dobe && ` (${d.h_na_dobe} h/dobę)`}
                    </div>
                    <div className="karta-linia">
                        <strong>Warunki pracy: </strong>
                        {[
                            d.warunki_kurz && 'kurz',
                            d.warunki_klimatyzacja && 'klimatyzacja',
                            d.warunki_oswietlenie && 'sztuczne oświetlenie',
                            d.warunki_chemia && 'środki chemiczne',
                            d.inne_warunki,
                        ].filter(Boolean).join(', ') || '–'}
                        {d.zawod && ` | Zawód: ${d.zawod}`}
                    </div>
                    <div className="karta-linia">
                        {d.hobby && <span><strong>Hobby:</strong> {d.hobby} | </span>}
                        <strong>Lubi czytać:</strong> {d.czytanie === 'tak' ? 'tak' : 'nie'}
                        {d.czytanie_info && ` (${d.czytanie_info})`}
                    </div>

                    <div className="karta-linia">
                        <strong>Data i diagnoza ostatnich badań: </strong>
                        {d.ostatnia_diagnoza_data || '–'} {d.ostatnia_diagnoza || ''}
                    </div>

                    <div className="karta-separator">{'*'.repeat(90)}</div>

                    {/* BADANIA WSTĘPNE */}
                    <div className="karta-sekcja-naglowek">Badania wstępne i orientacyjne</div>

                    <div className="karta-linia">
                        <strong>Oko dominujące: </strong>
                        dal {oko(d.oko_dom_dal, 'oko_dom_dal1', 'oko_dom_dal2')};
                        &nbsp;bliż {oko(d.oko_dom_bliz, 'oko_dom_bliz1', 'oko_dom_bliz2')};
                        &nbsp;ręka domin. {reka(d.dom_reka)};
                        &nbsp;noga dom. {noga(d.dom_noga)};
                        &nbsp;odl. Harmona: {d.harmona || '…………'}
                    </div>

                    <div className="karta-linia">
                        <strong>CT/PCT </strong>
                        dal: {d.ct_dal || '………………'}&nbsp;&nbsp;
                        bliż: {d.ct_bliz || '………………'}&nbsp;&nbsp;
                        <strong>PBK </strong>{d.pbk || '…/… ; …/… ; …/…'}
                        {d.uwagi_pbk && ` (${d.uwagi_pbk})`}
                    </div>

                    {/* RUCHY OCZU */}
                    <div className="karta-linia"><strong>Ruchy oczu</strong></div>
                    <div className="karta-ruchy-oczu">
                        <div>
                            <span className="label-oko">OL</span>
                            <table className="ruch-table">
                                <tbody>
                                    <tr>
                                        <td>{d.ruch_ol6}</td>
                                        <td>{d.ruch_ol7}</td>
                                        <td>{d.ruch_ol8}</td>
                                    </tr>
                                    <tr>
                                        <td>{d.ruch_ol5}</td>
                                        <td className="oko-symbol">○</td>
                                        <td>{d.ruch_ol1}</td>
                                    </tr>
                                    <tr>
                                        <td>{d.ruch_ol4}</td>
                                        <td>{d.ruch_ol3}</td>
                                        <td>{d.ruch_ol2}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <span className="label-oko">OP</span>
                            <table className="ruch-table">
                                <tbody>
                                    <tr>
                                        <td>{d.ruch_op6}</td>
                                        <td>{d.ruch_op7}</td>
                                        <td>{d.ruch_op8}</td>
                                    </tr>
                                    <tr>
                                        <td>{d.ruch_op5}</td>
                                        <td className="oko-symbop">○</td>
                                        <td>{d.ruch_op1}</td>
                                    </tr>
                                    <tr>
                                        <td>{d.ruch_op4}</td>
                                        <td>{d.ruch_op3}</td>
                                        <td>{d.ruch_op2}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="nsuco-info">
                            <div><strong>NSUCO</strong></div>
                            <div>Śledzenie: {d.sledzenie || '–'}</div>
                            <div>Sakady: {d.sakady || '–'}</div>
                        </div>

                        {d.obserwacje && <DottedLine label="Opis/obserwacje:" value={d.obserwacje} />}

                    </div>


                    <div className="karta-separator">{'*'.repeat(90)}</div>

                    {/* BADANIA DIAGNOSTYCZNE */}
                    <div className="karta-sekcja-naglowek">Badania diagnostyczne</div>
                    <div className="karta-podnaglowek">Aktualna korekcja</div>

                    <div className="table-wrapper">
                        <table className="korekcja-table">
                            <tbody>
                                <tr>
                                    <td rowSpan={3}><b>Dal</b></td>
                                    <td colSpan={2}><b>Sph</b></td>
                                    <td><b>cyl</b></td><td><b>ax</b></td>
                                    <td><b>pryzma</b></td><td><b>baza</b></td><td><b>PD</b></td>
                                    <td colSpan={2}><b>Visus</b></td>
                                    <td><b>Test</b></td>
                                </tr>
                                <tr>
                                    <td>OP</td>
                                    <td>{d.dal_op_sph}</td><td>{d.dal_op_cyl}</td><td>{d.dal_op_ax}</td>
                                    <td>{d.dal_op_pryzma}</td><td>{d.dal_op_baza}</td><td>{d.dal_op_pd}</td>
                                    <td>{d.dal_op_visus}</td>
                                    <td rowSpan={2}>{d.dal_wsp_visus}</td>
                                    <td rowSpan={2}>{d.dal_wsp_test}</td>
                                </tr>
                                <tr>
                                    <td>OL</td>
                                    <td>{d.dal_ol_sph}</td><td>{d.dal_ol_cyl}</td><td>{d.dal_ol_ax}</td>
                                    <td>{d.dal_ol_pryzma}</td><td>{d.dal_ol_baza}</td><td>{d.dal_ol_pd}</td>
                                    <td>{d.dal_ol_visus}</td>
                                </tr>
                                <tr>
                                    <td rowSpan={2}><b>Bliż</b></td>
                                    <td>OP</td>
                                    <td>{d.bliz_op_sph}</td><td>{d.bliz_op_cyl}</td><td>{d.bliz_op_ax}</td>
                                    <td>{d.bliz_op_pryzma}</td><td>{d.bliz_op_baza}</td><td>{d.bliz_op_pd}</td>
                                    <td>{d.bliz_op_visus}</td>
                                    <td rowSpan={2}>{d.bliz_wsp_visus}</td>
                                    <td rowSpan={2}>{d.bliz_wsp_test}</td>
                                </tr>
                                <tr>
                                    <td>OL</td>
                                    <td>{d.bliz_ol_sph}</td><td>{d.bliz_ol_cyl}</td><td>{d.bliz_ol_ax}</td>
                                    <td>{d.bliz_ol_pryzma}</td><td>{d.bliz_ol_baza}</td><td>{d.bliz_ol_pd}</td>
                                    <td>{d.bliz_ol_visus}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* PRZEDMIOTOWE BADANIE REFRAKCJI */}
                    <div className="karta-linia">
                        <strong>Przedmiotowe badanie refrakcji </strong>
                        ({d.cyklopegia === 'bez_cyklopegii' ? 'bez cykloplegii' : `z cykloplegią: ${d.badanie_refrakcji}`})
                    </div>

                    <div className='grid-col-two-center'>
                        {/* AUTOREFRAKTOMETR */}
                    <div className="table-wrapper">
                        <table className="korekcja-table" style={{ width: 'auto' }}>
                            <tbody>
                                <tr>
                                    <td><b>Autorefraktometr</b></td>
                                    <td><b>Sph</b></td><td><b>cyl</b></td><td><b>ax</b></td>
                                </tr>
                                <tr>
                                    <td>OP</td>
                                    <td>{d.refraktometr_op_sph}</td>
                                    <td>{d.refraktometr_op_cyl}</td>
                                    <td>{d.refraktometr_op_ax}</td>
                                </tr>
                                <tr>
                                    <td>OL</td>
                                    <td>{d.refraktometr_ol_sph}</td>
                                    <td>{d.refraktometr_ol_cyl}</td>
                                    <td>{d.refraktometr_ol_ax}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* SKIASKOPIA */}
                    <div className="table-wrapper">
                        <table className="korekcja-table" style={{ width: 'auto' }}>
                            <tbody>
                                <tr>
                                    <td><b>Skiaskopia stat.</b></td>
                                    <td><b>Sph</b></td><td><b>cyl</b></td><td><b>ax</b></td>
                                </tr>
                                <tr>
                                    <td>OP</td>
                                    <td>{d.skiaskopia_op_sph}</td>
                                    <td>{d.skiaskopia_op_cyl}</td>
                                    <td>{d.skiaskopia_op_ax}</td>
                                </tr>
                                <tr>
                                    <td>OL</td>
                                    <td>{d.skiaskopia_ol_sph}</td>
                                    <td>{d.skiaskopia_ol_cyl}</td>
                                    <td>{d.skiaskopia_ol_ax}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>

                    

                    {/* PODMIOTOWE BADANIE REFRAKCJI */}
                    <div className="karta-podnaglowek">Podmiotowe badanie refrakcji</div>
                    <div className="table-wrapper">
                        <table className="korekcja-table">
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td><b>Sph</b></td><td><b>cyl</b></td><td><b>ax</b></td>
                                    <td><b>Add (odl. {d.add_odleglosc || '…'})</b></td>
                                    <td colSpan={2}><b>Visus do dali c.c.</b></td>
                                    <td colSpan={2}><b>Visus do bliży c.add</b></td>
                                </tr>
                                <tr>
                                    <td>OP</td>
                                    <td>{d.ref_op_sph}</td><td>{d.ref_op_cyl}</td><td>{d.ref_op_ax}</td>
                                    <td>{d.ref_op_add}</td>
                                    <td>{d.ref_op_visus_dal}</td>
                                    <td rowSpan={2}>{d.ref_wsp_visus_dal}</td>
                                    <td>{d.ref_op_visus_bliz}</td>
                                    <td rowSpan={2}>{d.ref_wsp_visus_bliz}</td>
                                </tr>
                                <tr>
                                    <td>OL</td>
                                    <td>{d.ref_ol_sph}</td><td>{d.ref_ol_cyl}</td><td>{d.ref_ol_ax}</td>
                                    <td>{d.ref_ol_add}</td>
                                    <td>{d.ref_ol_visus_dal}</td>
                                    <td>{d.ref_ol_visus_bliz}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* WIDZENIE OBUOCZNE — dwie kolumny jak na papierze */}
                    <div className="karta-obuoczne">

                        <div className="obuoczne-col">
                            <div className="karta-podnaglowek">Widzenie obuoczne do dali</div>
                            <div className="karta-linia"><strong>Stereo:</strong> {d.stereo_dal || '…'} (test {d.stereo_test_dal || '…'})</div>
                            <div className="karta-linia grid-col-two">
                                <strong>Fuzja</strong> 
                                <div>
                                    t. Wortha: {d.fuzja_w_dal || '…'} <br />
                                    t. Schobera: {d.fuzja_s_dal || '…'}
                                </div>
                            
                            </div>
                            <div className="karta-linia"><strong>Ust. oczu</strong> (metoda: {d.metoda_ust_oczu_dal || '…'})</div>
                            <div className="karta-linia grid-col-two">
                                <div>
                                    <b>Hor.</b> {d.horyzontalnie_ust_dal || '…'}&nbsp;
                                </div>
                                <div>
                                    BN {d.hor_bn_dal || '…'} <br /> BS {d.hor_bs_dal || '…'}
                                </div>
                            </div>
                            <div className="karta-linia grid-col-two">
                                <div>
                                    <b>Vert.</b> {d.vertykalnie_dal || '…'}&nbsp;
                                </div>
                                <div>
                                    <b>OP</b> BG {d.bg_op_dal || '…'}&nbsp; BD {d.bd_op_dal || '…'}
                                </div>
                                <div></div>
                                <div>
                                    <b>OL</b>
                                    BG {d.bg_ol_dal || '…'}&nbsp;
                                    BD {d.bd_ol_dal || '…'}
                                </div>
                            </div>

                            <div className="karta-linia"><strong>Zez:</strong> {d.zez_dal || '…'}</div>
                        </div>

                        <div className="obuoczne-col obuoczne-col--border">
                            <div className="karta-podnaglowek">Widzenie obuoczne do bliży</div>
                            <div className="karta-linia"><strong>Stereo:</strong> {d.stereo_bliz || '…'} (test {d.stereo_test_bliz || '…'})</div>
                            <div className="karta-linia grid-col-two">
                                <strong>Fuzja</strong> 
                                
                                <div>
                                    t. Wortha: {d.fuzja_w_bliz || '…'} <br />
                                    t. Schobera: {d.fuzja_s_bliz || '…'}
                                </div>
                                
                                
                            </div>
                            <div className="karta-linia"><strong>Ust. oczu</strong> (metoda: {d.metoda_ust_oczu_bliz || '…'})</div>
                            <div className="karta-linia grid-col-two">
                                <div>
                                    <b>Hor.</b> {d.horyzontalnie_ust_bliz || '…'}&nbsp;
                                </div>
                                <div>
                                    BN {d.hor_bn_bliz || '…'}&nbsp;
                                    BS {d.hor_bs_bliz || '…'}
                                </div>
                                
                            </div>
                            <div className="karta-linia grid-col-two">
                                <div>
                                    Vert. {d.vertykalnie_bliz || '…'}&nbsp;
                                </div>
                                <div>
                                    <b>OP </b>
                                    BG {d.bg_op_bliz || '…'}&nbsp;<br />
                                    BD {d.bd_op_bliz || '…'}
                                </div>
                                <div></div>
                                <div>
                                    <b>OL </b>
                                    BG {d.bg_ol_bliz || '…'}&nbsp;
                                    BD {d.bd_ol_bliz || '…'}
                                </div>
                                
                                
                            </div>

                            <div className='grid-col-two'>
                                <div className="karta-linia">
                                    <strong>Foria</strong> {d.foria_bliz || '+ 1,0'}: {d.foria_info_bliz || '…'}&nbsp;
                                </div>
                                <div className="karta-linia">
                                    <b>AC/Ag: </b>{d.ac_ag || '…'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* LISTWA PRYZMATYCZNA */}
                    <div className="table-wrapper">
                        <table className="korekcja-table half-table">
                            <tbody>
                                <tr>
                                    <td colSpan={2}><b>Listwa pryzm.</b></td>
                                    <td><b>Zakres BS</b></td>
                                    <td><b>Zakres BN</b></td>
                                </tr>
                                <tr>
                                    <td><b>6 m</b></td>
                                    <td>obk: {d.pct_6 || '–'}</td>
                                    <td>{d.zakres_6_bs || '–'}</td>
                                    <td>{d.zakres_6_bn || '–'}</td>
                                </tr>
                                <tr>
                                    <td><b>0,4 m</b></td>
                                    <td>obk: {d.pct_4 || '–'}</td>
                                    <td>{d.zakres_4_bs || '–'}</td>
                                    <td>{d.zakres_4_bn || '–'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* KORESPONDENCJA I FIKSACJA */}
                    <div className="karta-linia">
                        <strong>Korespondencja siatkowa </strong>
                        (metoda: {d.korespondencja_siatkowa || '–'})&nbsp;&nbsp;
                        <strong>Fiksacja </strong>
                        ({d.fiksacja_wybor || 'orientacyjnie'}): {d.fiksacja || '–'}
                    </div>

                    {d.inne_badania && <DottedLine label="Inne badania / próby pryzmatyczne:" value={d.inne_badania} />}

                    {/* AKOMODACJA */}
                    <div className="karta-podnaglowek">Akomodacja / konwergencja</div>

                    <div className="karta-linia">
                        <strong>Odpowiedź akom.</strong> (metoda: {d.akomodacja_ospowiedz || '–'})
                        OP: {d.akomodacja_op || '–'}&nbsp;
                        OL: {d.akomodacja_ol || '–'}&nbsp;
                        OU: {d.akomodacja_ou || '–'}&nbsp;
                        UWA: {d.uwa || '–'}&nbsp;
                        DWA: {d.dwa || '–'}
                    </div>

                    <div className="karta-linia">
                        <strong>Amplituda akom.</strong> (metoda: {d.akomodacja_amplituda || '–'})
                        OP: {d.amplituda_op_cm || '–'} cm / {d.amplituda_op_dptr || '–'} dptr.&nbsp;
                        OL: {d.amplituda_ol_cm || '–'} cm / {d.amplituda_ol_dptr || '–'} dptr.&nbsp;
                        OU: {d.amplituda_ou_cm || '–'} cm / {d.amplituda_ou_dptr || '–'} dptr.&nbsp;
                        Norma: {d.norma || '–'}
                    </div>

                    <div className="karta-linia">
                        <strong>Fliper</strong> ({d.fliper || '–'}) {d.fliper_info || '...'}:&nbsp;
                        OP: {d.fliper_op || '–'} {d.fliper_op_wybor || 'cykl'}&nbsp;
                        OL: {d.fliper_ol || '–'} {d.fliper_ol_wybor || 'cykl'}&nbsp;
                        OU: {d.fliper_ou || '–'} {d.fliper_ou_wybor || 'cykl'}
                    </div>

                    {d.uwagi_akomodacja && <DottedLine label="Uwagi:" value={d.uwagi_akomodacja} />}

                    {d.zalecane_konsultacje && (
                        <DottedLine label="Zalecane konsultacje:" value={d.zalecane_konsultacje} />
                    )}

                    <div className="karta-separator">{'*'.repeat(90)}</div>

                    {/* DIAGNOZA I ZALECENIA */}
                    <DottedLine label="Diagnoza:" value={d.ostateczna_diagnoza} />
                    {d.ostateczne_uwagi && <DottedLine label="Uwagi:" value={d.ostateczne_uwagi} />}

                    <div className="karta-linia">
                        <strong>Proponowana korekcja </strong>
                        (dla VD {d.proponowana_korekcja1 || '–'} [mm])
                    </div>

                    <div className="table-wrapper">
                        <table className="korekcja-table">
                            <tbody>
                                <tr>
                                    <td><b>Dal</b></td>
                                    <td><b>Sph</b></td><td><b>cyl</b></td><td><b>ax</b></td>
                                    <td><b>pryzma</b></td><td><b>baza</b></td><td><b>PD</b></td>
                                    <td><b>Bliż</b></td>
                                    <td><b>Sph</b></td><td><b>cyl</b></td><td><b>ax</b></td>
                                    <td><b>pryzma</b></td><td><b>baza</b></td><td><b>PD</b></td>
                                </tr>
                                <tr>
                                    <td>OP</td>
                                    <td>{d.prop_dal_op_sph}</td><td>{d.prop_dal_op_cyl}</td><td>{d.prop_dal_op_ax}</td>
                                    <td>{d.prop_dal_op_pryzma}</td><td>{d.prop_dal_op_baza}</td><td>{d.prop_dal_op_pd}</td>
                                    <td>OP</td>
                                    <td>{d.prop_bliz_op_sph}</td><td>{d.prop_bliz_op_cyl}</td><td>{d.prop_bliz_op_ax}</td>
                                    <td>{d.prop_bliz_op_pryzma}</td><td>{d.prop_bliz_op_baza}</td><td>{d.prop_bliz_op_pd}</td>
                                </tr>
                                <tr>
                                    <td>OL</td>
                                    <td>{d.prop_dal_ol_sph}</td><td>{d.prop_dal_ol_cyl}</td><td>{d.prop_dal_ol_ax}</td>
                                    <td>{d.prop_dal_ol_pryzma}</td><td>{d.prop_dal_ol_baza}</td><td>{d.prop_dal_ol_pd}</td>
                                    <td>OL</td>
                                    <td>{d.prop_bliz_ol_sph}</td><td>{d.prop_bliz_ol_cyl}</td><td>{d.prop_bliz_ol_ax}</td>
                                    <td>{d.prop_bliz_ol_pryzma}</td><td>{d.prop_bliz_ol_baza}</td><td>{d.prop_bliz_ol_pd}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {d.dodatkowe_postepowania && (
                        <DottedLine label="Dodatkowe postępowania:" value={d.dodatkowe_postepowania} />
                    )}

                    <div className="karta-separator">{'*'.repeat(90)}</div>

                    <span>
                        <strong>
                            Wypełnił/a i zatwierdził/a: {doctorInfo?.imie} {doctorInfo?.nazwisko}<br />
                            {lastEditInfo?.imie && <span>Ostatnio edytowana przez: {lastEditInfo?.imie} {lastEditInfo?.nazwisko}</span>}
                        </strong>
                    </span>

                </div>
            </div>
        </div>
    )
}
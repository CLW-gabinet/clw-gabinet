import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import "./ChildrenCardInfo.css";
import { ArrowBigLeft } from 'lucide-react'


// Pomocniczy komponent — linia z etykietą i wartością
function Field({ label, value, inline = false }) {
    if (inline) {
        return (
            <span className="field-inline">
                <span className="field-label">{label}</span>
                <span className="field-value">{value || '………………………'}</span>
            </span>
        )
    }
    return (
        <div className="field-block">
            <span className="field-label">{label}</span>
            <span className="field-value field-value--underline">{value || ''}</span>
        </div>
    )
}



// Linia z wielokropkiem jak na papierze
function DottedLine({ label, value, dots = true }) {
    return (
        <div className="dotted-line">
            {label && <span className="field-label">{label}</span>}
            <span className="dotted-fill">{value || ''}</span>
        </div>
    )
}

// Tabela korekcji
function KorekcjaTable({ data, prefix, label }) {
    const row = (eye) => (
        <tr>
            <td>{eye}</td>
            <td>{data[`${prefix}_${eye.toLowerCase()}_sph`]}</td>
            <td>{data[`${prefix}_${eye.toLowerCase()}_cyl`]}</td>
            <td>{data[`${prefix}_${eye.toLowerCase()}_ax`]}</td>
            <td>{data[`${prefix}_${eye.toLowerCase()}_pryzma`]}</td>
            <td>{data[`${prefix}_${eye.toLowerCase()}_baza`]}</td>
            <td>{data[`${prefix}_${eye.toLowerCase()}_pd`]}</td>
            <td>{data[`${prefix}_${eye.toLowerCase()}_visus`]}</td>
            {eye === 'OP' && (
                <td rowSpan={2}>{data[`${prefix}_wsp_visus`]}</td>
            )}
            {eye === 'OP' && (
                <td rowSpan={2}>{data[`${prefix}_wsp_test`]}</td>
            )}
        </tr>
    )

    return (
        <table className="korekcja-table">
            <thead>
                <tr>
                    <td rowSpan={3}><b>{label}</b></td>
                    <td colSpan={2}>Sph</td>
                    <td>cyl</td>
                    <td>ax</td>
                    <td>pryzma</td>
                    <td>baza</td>
                    <td>PD</td>
                    <td colSpan={2}>Visus</td>
                    <td>Test</td>
                </tr>
            </thead>
            <tbody>
                {row('OP')}
                {row('OL')}
            </tbody>
        </table>
    )
}

export default function ChildrenCardInfo() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [createdAt, setCreatedAt] = useState(null)
    const [loading, setLoading] = useState(true)
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

    async function handleDelete() {
        const decision = confirm('Czy na pewno chcesz usunąć tę kartę? Tej operacji nie można cofnąć.')
        if (!decision) return


        const { error } = await supabase
            .from('patient_forms')
            .delete()
            .eq('id', id)


        if (error) {
            alert('Błąd podczas usuwania karty')
        } else {
            navigate('/search-card')
        }
    }

    if (loading) return <div className="loading">Ładowanie...</div>

    const d = data

    return (
        <div className="info-page">
            <div className="info-actions no-print">
                <button className="return" onClick={() => navigate('/search-card')}>
                    <ArrowBigLeft size={18} />
                </button>
                <button className="wroc" onClick={handleDelete}>
                    <span>Usuń kartę</span>
                </button>
                <button className="dalej" onClick={() => navigate(`/card/children/edit/${id}`)}>
                    <span>Edytuj</span>
                </button>
                <button className="dalej" onClick={() => window.print()}>
                    <span>Drukuj</span>
                </button>
            </div>

            {/* Kontener karty — wyśrodkowany, wygląda jak papier */}
            <div className="display-center">
                <div className="karta-papier">

                    <div className="karta-naglowek">
                        <strong>KARTA BADANIA OPTOMETRYCZNEGO – Dziecko®</strong>
                        <span>
                            <strong>Data:</strong> {createdAt 
                                ? new Date(createdAt).toLocaleDateString() 
                                : '–'}
                        </span>
                    </div>

                    <div className="karta-row">
                        <Field label="Nazwisko:" value={d.nazwisko} inline />
                        <Field label="Imię:" value={d.imie} inline />
                    </div>
                    <div className="karta-row">
                        <Field label="Data urodzenia:" value={d.data_urodzenia} inline />
                        <Field label="Tel:" value={d.kontakt} inline />
                    </div>

                    <div className="karta-separator">{'*'.repeat(90)}</div>

                    <DottedLine label="Przyczyna wizyty / główna skarga:" value={d.przyczyna_wizyty} />

                    <div className="karta-separator">{'*'.repeat(90)}</div>

                    <div className="karta-linia grid-col-two">
                        <div>
                            <strong>Noszone są: </strong>
                            {d.ocena_komfortu_okul_bliz ? 'okulary' : d.ocena_komfortu_okul_dal ? 'okulary' : d.ocena_komfortu_okul_inne ? 'okulary' : 'nic'}
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

                    <DottedLine
                        label="W którym roku życia stwierdzono wadę wzroku / pierwsza korekcja:"
                        value={d.pierwsza_korekcja}
                    />

                    {/* CHOROBY OCzu */}
                    <div className="karta-linia">
                        <strong>Choroby oczu \ leczenie: </strong>
                        <span>
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
                        </span>
                        {d.uwagi_chorob && <span><b> Uwagi:</b> {d.uwagi_chorob}</span>}
                    </div>

                    {/* CHOROBY OGÓLNOUSTROJOWE */}
                    <div className="karta-linia">
                        <strong>Choroby ogólnoustrojowe: </strong>
                        <span>
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
                        </span>
                        {d.uwagi_choroby_ogoln && <span><b> Uwagi:</b> {d.uwagi_choroby_ogoln}</span>}
                    </div>

                    <DottedLine label="Przyjmowane leki:" value={d.leki} />

                    {/* RODZINA */}
                    <div className="karta-linia">
                        <strong>Choroby oczu / zaburzenia widzenia w rodzinie </strong>
                        <span>
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
                        </span>
                        {d.uwagi_rodzinne_choroby && <span><b> Uwagi:</b> {d.uwagi_rodzinne_choroby}</span>}
                    </div>

                    <DottedLine
                        label="Data i diagnoza ostatnich badań:"
                        value={`${d.ostatnia_diagnoza_data || ''} ${d.ostatnia_diagnoza || ''}`}
                    />

                    <div className="karta-separator">{'*'.repeat(90)}</div>

                    {/* BADANIA WSTĘPNE */}
                    <div className="karta-sekcja-naglowek">Badania wstępne i orientacyjne</div>

                    <div className="karta-linia">
                        <strong>Oko dominujące: </strong>
                        dal {d.oko_dom_dal === 'oko_dom_dal1' ? 'OP' : d.oko_dom_dal === 'oko_dom_dal2' ? 'OL' : 'nieustalone'};
                        &nbsp;bliż {d.oko_dom_bliz === 'oko_dom_bliz1' ? 'OP' : d.oko_dom_bliz === 'oko_dom_bliz2' ? 'OL' : 'nieustalone'};
                        &nbsp;ręka domin. {d.dom_reka === 'dom_reka1' ? 'P' : d.dom_reka === 'dom_reka2' ? 'L' : '–'};
                        &nbsp;noga dom. {d.dom_noga === 'dom_noga1' ? 'P' : d.dom_noga === 'dom_noga2' ? 'L' : '–'};
                        &nbsp;odl. Harmona: {d.harmona || '…………'}
                    </div>

                    <div className="karta-linia">
                        <strong>CT/PCT </strong>
                        dal: {d.ct_dal || '………………'}&nbsp;&nbsp;
                        bliż: {d.ct_bliz || '………………'}&nbsp;&nbsp;
                        <strong>PBK </strong>{d.pbk || '…/… ; …/… ; …/…'}
                        {d.uwagi_pbk && ` (${d.uwagi_pbk})`}
                    </div>

                    <div className="karta-linia"><strong>Ruchy oczu</strong></div>
                    <div className="karta-ruchy-oczu">
                        <div>
                            <span className="label-oko">OL</span>
                            <table className="ruch-table">
                                <tbody>
                                    <tr>
                                        <td>{d.ruch_ol6 || '++'}</td>
                                        <td>{d.ruch_ol7 || '++'}</td>
                                        <td>{d.ruch_ol8 || '++'}</td>
                                    </tr>
                                    <tr>
                                        <td>{d.ruch_ol5 || '++'}</td>
                                        <td className="oko-symbol">○</td>
                                        <td>{d.ruch_ol1 || '++'}</td>
                                    </tr>
                                    <tr>
                                        <td>{d.ruch_ol4 || '++'}</td>
                                        <td>{d.ruch_ol3 || '++'}</td>
                                        <td>{d.ruch_ol2 || '++'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <span className="label-oko">OP</span>
                            <table className="ruch-table">
                                <tbody>
                                    <tr>
                                        <td>{d.ruch_op6 || '++'}</td>
                                        <td>{d.ruch_op7 || '++'}</td>
                                        <td>{d.ruch_op8 || '++'}</td>
                                    </tr>
                                    <tr>
                                        <td>{d.ruch_op5 || '++'}</td>
                                        <td className="oko-symbop">○</td>
                                        <td>{d.ruch_op1 || '++'}</td>
                                    </tr>
                                    <tr>
                                        <td>{d.ruch_op4 || '++'}</td>
                                        <td>{d.ruch_op3 || '++'}</td>
                                        <td>{d.ruch_op2 || '++'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="nsuco-info">
                            <div><strong>NSUCO</strong></div>
                            <div>Śledzenie: {d.sledzenie || '–'}</div>
                            <div>Sakady: {d.sakady || '–'}</div>
                        </div>
                        {d.obserwacje && 
                            <div>
                                <strong>Obserwacje: </strong>
                                <div>{d.obserwacje}</div>
                            </div>
                        }
                    </div>

                    {d.obserwacje && <DottedLine label="Opis/obserwacje:" value={d.obserwacje} />}

                    <div className="karta-linia">
                        <strong>Źrenice kształt/wielkość </strong>
                        OP: {d.wielkosc_p || '……'}&nbsp;
                        OL: {d.wielkosc_l || '……'}&nbsp;&nbsp;
                        <strong>Reakcja bezpośr.</strong>
                        OP: {d.bezp_p || '……'}&nbsp;
                        OL: {d.bezp_l || '……'}&nbsp;&nbsp;
                        <strong>pośr.</strong>
                        OP: {d.posr_p || '……'}&nbsp;
                        OL: {d.posr_l || '……'}
                    </div>

                    {d.inne_ocz && <DottedLine label="Inne (przedni odcinek/brzegi powiek):" value={d.inne_ocz} />}

                    <div className="karta-linia">
                        <strong>Test Brucknera:</strong> {d.testB || '………………………………'}&nbsp;&nbsp;&nbsp;
                        <strong>Test Hirschberga:</strong> {d.testH || '………………………………'}
                    </div>

                    <DottedLine label="Ogólne obserwacje:" value={d.ogolne_obs} />

                    <div className="karta-separator">{'*'.repeat(90)}</div>

                    {/* BADANIA DIAGNOSTYCZNE */}
                    <div className="karta-sekcja-naglowek">Badania diagnostyczne</div>
                    <div className="karta-podnaglowek">Aktualna korekcja / vis bez korekcji</div>

                    <div className="table-wrapper">
                        <table className="korekcja-table">
                            <tbody>
                                <tr>
                                    <td rowSpan={3}><b>Dal</b></td>
                                    <td colSpan={2}><b>Sph</b></td>
                                    <td><b>cyl</b></td>
                                    <td><b>ax</b></td>
                                    <td><b>pryzma</b></td>
                                    <td><b>baza</b></td>
                                    <td><b>PD</b></td>
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

                    <div className="karta-linia">
                        <strong>Przedmiotowe badanie refrakcji </strong>
                        ({d.cyklopegia === 'bez_cyklopegii' ? 'bez cykloplegii' : `z cykloplegią: ${d.badanie_refrakcji}`})
                    </div>

                    <div className="karta-linia">
                        <strong>Skiaskopia:</strong> {d.skiaskopia || '………………………'}
                    </div>

                    <div className="karta-skiaskopia-wynik">
                        <div>
                            <span>OP: </span>
                            <span className="krzyzyk-display">
                                hor. {d.skiaskopia_op1 || '…'} / vert. {d.skiaskopia_op2 || '…'}
                            </span>
                        </div>
                        <div>
                            <span>OL: </span>
                            <span className="krzyzyk-display">
                                hor. {d.skiaskopia_ol1 || '…'} / vert. {d.skiaskopia_ol2 || '…'}
                            </span>
                        </div>
                        <div>
                            <div><strong>Wynik</strong> OP: {d.skias_wynik_p || '………………………………'}</div>
                            <div>OL: {d.skias_wynik_l || '………………………………'}</div>
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
                                    <td colSpan={2}><b>Visus do bliży {d.bliz_visus_ref || 's add'}</b></td>
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

                            <div className="karta-linia"><strong>Różnice fiksacji:</strong> {d.roznica_fiksacji_dal || '…'}</div>
                            <div className="karta-linia"><strong>Zez/foria:</strong> {d.zez_foria_dal || '…'}</div>
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
                            
                            <div className="karta-linia"><strong>Różnice fiksacji:</strong> {d.roznica_fiksacji_bliz || '…'}</div>

                            <div className='grid-col-two'>
                                <div className="karta-linia">
                                    <strong>Foria</strong> {d.foria_bliz || '+ 1,0'}: {d.foria_bliz_info || '…'}&nbsp;
                                </div>
                                <div className="karta-linia">
                                    <b>AC/Ag: </b>{d.ac_ag || '…'}
                                </div>
                            </div>
                            
                            
                            <div className="karta-linia">
                                <strong>Sprawność wergencji</strong> (fliper: {d.fliper || '…'})
                            </div>
                            <div className="karta-linia">
                                Dal: {d.dal_wergencja || '…'} cpm&nbsp;&nbsp;
                                Bliż: {d.bliz_wergencja || '…'} cpm
                            </div>
                        </div>
                    </div>

                    <div className='karta-linia'>
                        <strong>PBK</strong> min. 3 pomiary
                        {d.pbk2 || '...'} | {d.pbk2_wybor || 'przedmiotowe'} | {d.rodzaj_targetu1 || '...'}
                    </div>

                    <div className='karta-linia'>
                        <strong>PBK</strong> min. 3 pomiary
                        {d.pbk3 || '...'} | {d.pbk3_wybor || 'przedmiotowe'} | {d.rodzaj_targetu2 || '...'}
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
                                        <td><b>PCT 6 m</b></td>
                                        <td>h: {d.pct_6_h || '…'}<br />v: {d.pct_6_v || '…'}</td>
                                        <td>{d.zakres_6_bs1 || '…'}/{d.zakres_6_bs2 || '…'}</td>
                                        <td>{d.zakres_6_bn1 || '…'}/{d.zakres_6_bn2 || '…'}</td>
                                    </tr>
                                    <tr>
                                        <td><b>PCT 0,4 m</b></td>
                                        <td>h: {d.pct_4_h || '…'}<br />v: {d.pct_4_v || '…'}</td>
                                        <td>{d.zakres_4_bs1 || '…'}/{d.zakres_4_bs2 || '…'}</td>
                                        <td>{d.zakres_4_bn1 || '…'}/{d.zakres_4_bn2 || '…'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    {/* FIKSACJA */}
                    <div className="karta-fiksacja">
                        <div>
                            <div className="karta-linia">
                                <strong>Fiksacja</strong> (oftalmoskop: {d.fiksacja_oftalmoskop || '…'})
                            </div>
                            <table className="korekcja-table fiksacja-table">
                                <tbody>
                                    <tr>
                                        <td colSpan={2}><b>OP</b></td>
                                        <td><b>Fiksacja</b></td>
                                        <td colSpan={2}><b>OL</b></td>
                                    </tr>
                                    {[
                                        ['centralna', 'Centralna'],
                                        ['ekscentryczna', 'Ekscentryczna'],
                                        ['stabilna', 'Stabilna'],
                                        ['niestabilna', 'Niestabilna'],
                                        ['kierunek_ef', 'Kierunek EF'],
                                    ].map(([key, label]) => (
                                        <tr key={key}>
                                            <td>{d[key] === 'op' ? '●' : '○'}</td>
                                            <td></td>
                                            <td>{label}</td>
                                            <td></td>
                                            <td>{d[key] === 'ol' ? '●' : '○'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <div className="karta-linia">
                                <strong>Korespondencja siatkówkowa</strong> (metoda: {d.korespondencja_siatkowa || '…'})
                            </div>
                            {d.inne_badania && (
                                <>
                                    <div className="karta-linia"><strong>Inne badania / próby pryzmatyczne</strong></div>
                                    <DottedLine value={d.inne_badania} />
                                </>
                            )}
                        </div>
                    </div>

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
                        <strong>Fliper</strong> ({d.fliper || '–'}):&nbsp;
                        OP: {d.fliper_op || '–'} {d.fliper_op_wybor || 'cykl'}&nbsp;
                        OL: {d.fliper_ol || '–'} {d.fliper_ol_wybor || 'cykl'}&nbsp;
                        OU: {d.fliper_ou || '–'} {d.fliper_ou_wybor || 'cykl'}
                    </div>

                    {d.uwagi_akomodacja && <DottedLine label="Uwagi:" value={d.uwagi_akomodacja} />}

                    {d.zalecane_konsultacje && (
                        <DottedLine label="Zalecane konsultacje:" value={d.zalecane_konsultacje} />
                    )}

                    <div className="karta-separator">{'*'.repeat(100)}</div>

                    {/* DIAGNOZA I ZALECENIA */}
                    <DottedLine label="Diagnoza:" value={d.ostateczna_diagnoza} />
                    <div className="karta-linia"><strong>Zalecenia:</strong></div>
                    <DottedLine value={d.zalecenia} />

                    <div className="karta-linia">
                        <strong>1. Proponowana korekcja</strong>
                        (rodzaj rozwiązania optycznego: {d.proponowana_korekcja1 || '………………………………'})
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

                    {d.proponowana_korekcja2 && <div className="karta-linia">2. {d.proponowana_korekcja2}</div>}
                    {d.proponowana_korekcja3 && <div className="karta-linia">3. {d.proponowana_korekcja3}</div>}
                    {d.proponowana_korekcja4 && <div className="karta-linia">4. {d.proponowana_korekcja4}</div>}
                    {d.proponowana_korekcja5 && <div className="karta-linia">5. {d.proponowana_korekcja5}</div>}

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
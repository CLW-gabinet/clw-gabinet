import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import "../cards-info/ChildrenCardInfo.css"
import { ArrowBigLeft } from 'lucide-react'


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

function DottedLine({ label, value }) {
    return (
        <div className="dotted-line">
            {label && <span className="field-label">{label}</span>}
            <span className="dotted-fill">{value || ''}</span>
        </div>
    )
}

export default function LinesCardInfo() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [createdAt, setCreatedAt] = useState(null)
    const [loading, setLoading] = useState(true)
    const [doctorInfo, setDoctorInfo] = useState(null)
    const [lastEditInfo, setLastEditInfo] = useState(null)

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
        { label: 'Zaczerwienienie spojówki gałkowej',               name: 'zaczerwienienie' },
        { label: 'Przekrwienie rąbka rogówki',                       name: 'przekrwienie' },
        { label: 'Neowaskularyzacja rogówki',                        name: 'neowaskularyzacja' },
        { label: 'Mikrocysty i torbiele nabłonka rogówki',           name: 'mikrocysty' },
        { label: 'Obrzęk rogówki - prążki i fałdy',                  name: 'obrzek' },
        { label: 'Barwienie spojówki',                               name: 'barwienie_spojowki' },
        { label: 'Barwienie rogówki',                                name: 'barwienie_rogowki' },
        { label: 'Brodawkowe zapalenie spojówki',                    name: 'brodawkowe_zap' },
        { label: 'Zapalenie brzegów powiek',                         name: 'zapalenie_brzeg_powiek' },
        { label: 'Dysfunkcja gruczołów Meiboma',                     name: 'dysfunkcja_gruczolow' },
        { label: 'Górne rąbkowe zapalenie rogówki i spojówki',       name: 'gorne_rabkowe_zap' },
        { label: 'Nacieki rogówkowe',                                name: 'nacieki' },
        { label: 'Owrzodzenie rogówkowe',                            name: 'owrzodzenie' },
        { label: 'Polimegatyzm śródbłonka',                          name: 'polimegatyzm' },
    ]

    // pomocnik do wyciągania wartości skali Efrona (np. "zaczerwienienie2" → "2")
    function efronValue(name, eye) {
        const val = d[`${name}_${eye}`] || ''
        return val.replace(`${name}_${eye}`, '') || '–'
    }

    return (
        <div className="info-page">
            <div className="info-actions no-print">
                <button className="return" onClick={() => navigate('/search-card')}>
                    <ArrowBigLeft size={18} />
                </button>
                <button className="wroc" onClick={handleDelete}>
                    <span>Usuń kartę</span>
                </button>
                <button className="dalej" onClick={() => navigate(`/card/lines/edit/${id}`)}>
                    <span>Edytuj</span>
                </button>
                <button className="dalej" onClick={() => window.print()}>
                    <span>Drukuj</span>
                </button>

            </div>

            <div className="display-center">
                <div className="karta-papier">

                    {/* NAGŁÓWEK */}
                    <div className="karta-naglowek">
                        <strong>KARTA DOBORU SOCZEWEK KONTAKTOWYCH®</strong>
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

                    {/* AKTUALNA KOREKCJA OKULAROWA */}
                    <div className="karta-sekcja-naglowek">Aktualna korekcja okularowa</div>

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
                                </tr>
                                <tr>
                                    <td>OP</td>
                                    <td>{d.dal_op_sph}</td><td>{d.dal_op_cyl}</td><td>{d.dal_op_ax}</td>
                                    <td>{d.dal_op_pryzma}</td><td>{d.dal_op_baza}</td><td>{d.dal_op_pd}</td>
                                    <td>{d.dal_op_visus}</td>
                                    <td rowSpan={2}>{d.dal_wsp_visus}</td>
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

                    <div className="karta-separator">{'*'.repeat(90)}</div>

                    {/* FILM ŁZOWY */}
                    <div className="karta-sekcja-naglowek">Jakość filtru łzowego</div>
                    <div className="karta-linia">
                        <strong>OL:</strong> {d.filtr_lzowy_ol || '–'}&nbsp;&nbsp;
                        <strong>OP:</strong> {d.filtr_lzowy_op || '–'}
                    </div>

                    <div className="karta-linia">
                        <strong>Wysokość menisku łzowego — OL:</strong> {d.menisk_lzowy_ol || '–'}&nbsp;&nbsp;
                        <strong>OP:</strong> {d.menisk_lzowy_op || '–'}
                    </div>

                    <div className="karta-linia">
                        <strong>Czas zerwania filmu łzowego (NIBUT) — OL:</strong> {d.zerwanie_filmu_ol || '…'} s&nbsp;&nbsp;
                        <strong>OP:</strong> {d.zerwanie_filmu_op || '…'} s
                    </div>

                    <DottedLine label="Stosowane krople do oczu:" value={d.krople_do_oczu} />

                    <div className="karta-separator">{'*'.repeat(90)}</div>

                    {/* SKALA EFRONA */}
                    <div className="karta-sekcja-naglowek">Ocena przedniego odcinka w lampie szczelinowej (skala Efrona)</div>

                    <div className="table-wrapper">
                        <table className="korekcja-table">
                            <tbody>
                                <tr>
                                    <td><b>Cecha</b></td>
                                    <td><b>OL</b></td>
                                    <td><b>OP</b></td>
                                    <td><b>Uwagi</b></td>
                                </tr>
                                {efronFields.map(field => (
                                    <tr key={field.name}>
                                        <td style={{ textAlign: 'left' }}>{field.label}</td>
                                        <td>{efronValue(field.name, 'ol')}</td>
                                        <td>{efronValue(field.name, 'op')}</td>
                                        <td style={{ textAlign: 'left' }}>{d[`${field.name}_uwagi`] || ''}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="karta-linia" style={{ marginTop: '4px' }}>
                        <strong>Uwagi OL:</strong> {d.efron_uwagi_ol || '–'}
                    </div>
                    <div className="karta-linia">
                        <strong>Uwagi OP:</strong> {d.efron_uwagi_op || '–'}
                    </div>
                    <DottedLine label="Uwagi ogólne:" value={d.efron_uwagi_ogolne} />

                    <div className="karta-separator">{'*'.repeat(90)}</div>

                    {/* DOBÓR SOCZEWEK */}
                    <div className="karta-sekcja-naglowek">Dobór soczewek</div>

                    <div className="karta-linia">
                        <strong>Czy kiedykolwiek były noszone soczewki?</strong>{' '}
                        {d.soczewki_noszenie === 'soczewki_noszenie_tak' ? 'Tak' : 'Nie'}
                    </div>

                    {d.soczewki_noszenie === 'soczewki_noszenie_tak' && (
                        <DottedLine label="Jakie soczewki były noszone:" value={d.soczewki_noszenie_jakie} />
                    )}

                    {/* SK1 */}
                    <div className="karta-podnaglowek">1. Typ SK</div>
                    <div className="karta-linia">
                        <Field label="Nazwa:" value={d.nazwa_soczewek1} inline />
                        <Field label="Firma:" value={d.firma_soczewek1} inline />
                        <Field label="Tryb noszenia:" value={d.tryb_noszenia_soczewek1} inline />
                    </div>
                    <DottedLine label="Subiektywny komfort w SK:" value={d.subiektywny_komfort_sk1} />

                    <div className="table-wrapper">
                        <table className="korekcja-table">
                            <tbody>
                                <tr>
                                    <td><b>Ocena dopasowania</b></td>
                                    <td><b>OP</b></td>
                                    <td><b>OL</b></td>
                                </tr>
                                {ocenaDopasowaniaRows.map(row => (
                                    <tr key={row.name}>
                                        <td style={{ textAlign: 'left' }}>{row.label}</td>
                                        <td>{d[`${row.name}1_op`] || '–'}</td>
                                        <td>{d[`${row.name}1_ol`] || '–'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* SK2 */}
                    <div className="karta-podnaglowek">2. Typ SK</div>
                    <div className="karta-linia">
                        <Field label="Nazwa:" value={d.nazwa_soczewek2} inline />
                        <Field label="Firma:" value={d.firma_soczewek2} inline />
                        <Field label="Tryb noszenia:" value={d.tryb_noszenia_soczewek2} inline />
                    </div>
                    <DottedLine label="Subiektywny komfort w SK:" value={d.subiektywny_komfort_sk2} />

                    <div className="table-wrapper">
                        <table className="korekcja-table">
                            <tbody>
                                <tr>
                                    <td><b>Ocena dopasowania</b></td>
                                    <td><b>OP</b></td>
                                    <td><b>OL</b></td>
                                </tr>
                                {ocenaDopasowaniaRows.map(row => (
                                    <tr key={row.name}>
                                        <td style={{ textAlign: 'left' }}>{row.label}</td>
                                        <td>{d[`${row.name}2_op`] || '–'}</td>
                                        <td>{d[`${row.name}2_ol`] || '–'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="karta-separator">{'*'.repeat(90)}</div>

                    {/* DOPASOWANE SOCZEWKI */}
                    <div className="karta-sekcja-naglowek">Dopasowano</div>

                    <div className="karta-linia">
                        <Field label="Nazwa:" value={d.nazwa_soczewek_dopasowane} inline />
                        <Field label="Firma:" value={d.firma_soczewek_dopasowane} inline />
                        <Field label="Tryb noszenia:" value={d.tryb_noszenia_soczewek_dopasowane} inline />
                    </div>

                    <div className="table-wrapper">
                        <table className="korekcja-table">
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td><b>Sph</b></td>
                                    <td><b>cyl</b></td>
                                    <td><b>ax</b></td>
                                    <td><b>add</b></td>
                                </tr>
                                <tr>
                                    <td><b>OP</b></td>
                                    <td>{d.sph_op || '–'}</td>
                                    <td>{d.cyl_op || '–'}</td>
                                    <td>{d.ax_op || '–'}</td>
                                    <td>{d.add_op || '–'}</td>
                                </tr>
                                <tr>
                                    <td><b>OL</b></td>
                                    <td>{d.sph_ol || '–'}</td>
                                    <td>{d.cyl_ol || '–'}</td>
                                    <td>{d.ax_ol || '–'}</td>
                                    <td>{d.add_ol || '–'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

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
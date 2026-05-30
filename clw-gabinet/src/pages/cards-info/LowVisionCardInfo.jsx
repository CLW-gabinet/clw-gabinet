import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'
import { ArrowBigLeft } from 'lucide-react'


function DottedLine({ label, value }) {
    return (
        <div className="dotted-line">
            {label && <span className="field-label">{label}</span>}
            <span className="dotted-fill">{value || ''}</span>
        </div>
    )
}

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

export default function LowVisionCardInfo() {
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
                <button className="dalej" onClick={() => navigate(`/card/low-vision/edit/${id}`)}>
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
                        <strong>KARTA DLA SŁABOWIDZĄCYCH®</strong>
                        <span>
                            <strong>Data:</strong> {createdAt
                                ? new Date(createdAt).toLocaleDateString()
                                : '–'}
                        </span>
                    </div>

                    {/* DANE PACJENTA */}
                    <div className="karta-row">
                        <Field label="Nazwisko:" value={d.nazwisko} inline />
                        <Field label="Imię:" value={d.imie} inline />
                    </div>
                    <div className="karta-row">
                        <Field label="Data urodzenia:" value={d.data_urodzenia} inline />
                        <Field label="Tel:" value={d.kontakt} inline />
                    </div>
                    <div className="karta-row">
                        <Field label="Adres zamieszkania:" value={d.adres_zamieszkania} inline />
                    </div>

                    <div className="karta-separator">{'*'.repeat(90)}</div>

                    {/* AKTUALNA KOREKCJA */}
                    <div className="karta-sekcja-naglowek">Aktualna korekcja</div>

                    <div className="grid-col-two-center">
                    <div className="table-wrapper">
                        <table className="korekcja-table">
                            <tbody>
                                <tr>
                                    <td rowSpan={2}><b>Dal</b></td>
                                    <td>
                                        <span className="field-label">OL: </span>
                                    </td>
                                    <td>
                                        {d.korekcja_dal_ol || '………………………'}
                                    </td>
                                    <td>
                                        <span className="field-label">V: </span>
                                    </td>
                                    <td>
                                        {d.korekcja_dal_v1 || '………'}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="field-label center">OP: </span>
                                    </td>
                                    <td>
                                        {d.korekcja_dal_op || '………………………'}
                                    </td>
                                    <td>
                                        <span className="field-label">V: </span>
                                    </td>
                                    <td>{d.korekcja_dal_v2 || '………'}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div className="table-wrapper">
                        <table className="korekcja-table">
                            <tbody>
                                <tr>
                                    <td rowSpan={2}><b>Bliż</b></td>
                                    <td>
                                        <span className="field-label">OL: </span>
                                    </td>
                                    <td>
                                        {d.korekcja_bliz_ol || '………………………'}
                                    </td>
                                    <td>
                                        <span className="field-label">SnV: </span>
                                    </td>
                                    <td>{d.korekcja_bliz_snv1 || '………'}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="field-label">OP: </span>
                                    </td>
                                    <td>
                                        {d.korekcja_bliz_op || '………………………'}
                                    </td>
                                    <td>
                                        <span className="field-label">SnV: </span>
                                    </td>
                                    <td>{d.korekcja_bliz_snv2 || '………'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>

                    

                    <DottedLine label="Rozpoznanie okulistyczne:" value={d.rozpoznanie} />
                    <DottedLine label="Dodatkowe schorzenia:" value={d.dodatkowe_schorzenia} />
                    <DottedLine label="Hobby:" value={d.hobby} />

                    <div className="karta-separator">{'*'.repeat(90)}</div>

                    {/* POMOCE DO DALI */}
                    <div className="karta-sekcja-naglowek">Dopasowane pomoce do dali</div>

                    <div className="table-wrapper">
                        <table className="korekcja-table">
                            <tbody>
                                <tr>
                                    <td><b>Nazwa</b></td>
                                    <td><b>Powiększenie</b></td>
                                    <td><b>Moc</b></td>
                                    <td><b>Rozmiar</b></td>
                                    <td><b>Producent</b></td>
                                    <td><b>Nr katalogowy</b></td>
                                </tr>
                                <tr>
                                    <td>{d.pomoce_dal_nazwa || '………'}</td>
                                    <td>{d.pomoce_dal_powiekszenie || '………'}</td>
                                    <td>{d.pomoce_dal_moc || '………'}</td>
                                    <td>{d.pomoce_dal_rozmiar || '………'}</td>
                                    <td>{d.pomoce_dal_producent || '………'}</td>
                                    <td>{d.pomoce_dal_nr_katalogowy || '………'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="karta-separator">{'*'.repeat(90)}</div>

                    {/* POMOCE DO BLIŻY */}
                    <div className="karta-sekcja-naglowek">Dopasowane pomoce do bliży</div>

                    <div className="table-wrapper">
                        <table className="korekcja-table">
                            <tbody>
                                <tr>
                                    <td><b>Nazwa</b></td>
                                    <td><b>Powiększenie</b></td>
                                    <td><b>Moc</b></td>
                                    <td><b>Rozmiar</b></td>
                                    <td><b>Producent</b></td>
                                    <td><b>Nr katalogowy</b></td>
                                </tr>
                                <tr>
                                    <td>{d.pomoce_bliz_nazwa || '………'}</td>
                                    <td>{d.pomoce_bliz_powiekszenie || '………'}</td>
                                    <td>{d.pomoce_bliz_moc || '………'}</td>
                                    <td>{d.pomoce_bliz_rozmiar || '………'}</td>
                                    <td>{d.pomoce_bliz_producent || '………'}</td>
                                    <td>{d.pomoce_bliz_nr_katalogowy || '………'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="karta-separator">{'*'.repeat(90)}</div>

                    {/* FILTR MEDYCZNY */}
                    <div className="karta-sekcja-naglowek">Filtr medyczny krawędziowy</div>

                    <div className="table-wrapper">
                        <table className="korekcja-table">
                            <tbody>
                                <tr>
                                    <td><b>Filtr</b></td>
                                    <td><b>Polaryzacja</b></td>
                                    <td><b>Rozmiar</b></td>
                                    <td><b>Kolor oprawy</b></td>
                                    <td><b>Producent</b></td>
                                    <td><b>Nr katalogowy</b></td>
                                </tr>
                                <tr>
                                    <td>{d.filtr_med_filtr || '………'}</td>
                                    <td>{d.filtr_med_polaryzacja || '………'}</td>
                                    <td>{d.filtr_med_rozmiar || '………'}</td>
                                    <td>{d.filtr_med_kolor_oprawy || '………'}</td>
                                    <td>{d.filtr_med_producent || '………'}</td>
                                    <td>{d.filtr_med_nr_katalogowy || '………'}</td>
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
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate, useParams } from 'react-router-dom'

export function useFormData(initialState, formType) {
    const [formData, setFormData] = useState(initialState)
    const [formId, setFormId] = useState(null)
    const [formMeta, setFormMeta] = useState(null) // created_at, doctor_id
    const navigate = useNavigate()
    const { id: editId } = useParams()

    useEffect(() => {
        let cancelled = false

        async function initForm() {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user || cancelled) return

            if (editId) {
                // TRYB EDYCJI — każdy lekarz może pobrać finished
                const { data, error } = await supabase
                    .from('patient_forms')
                    .select('id, form_data, created_at, doctor_id')
                    .eq('id', editId)
                    .single()

                if (error || cancelled) return

                setFormId(data.id)
                setFormData(prev => ({ ...prev, ...data.form_data }))
                setFormMeta({
                    created_at: data.created_at,
                    doctor_id: data.doctor_id
                })

            } else {
                // TRYB NOWY — szukaj unfinished tylko swoje
                const { data: existing, error: selectError } = await supabase
                    .from('patient_forms')
                    .select('id, form_data, created_at, doctor_id')
                    .eq('doctor_id', user.id)
                    .eq('form_type', formType)
                    .eq('status', 'unfinished')
                    .order('updated_at', { ascending: false })
                    .limit(1)
                    .maybeSingle()

                if (selectError || cancelled) return

                if (existing) {
                    setFormId(existing.id)
                    setFormData(prev => ({ ...prev, ...existing.form_data }))
                    setFormMeta({
                        created_at: existing.created_at,
                        doctor_id: existing.doctor_id
                    })
                } else {
                    const { data: newForm, error: insertError } = await supabase
                        .from('patient_forms')
                        .insert({
                            doctor_id: user.id,
                            form_type: formType,
                            status: 'unfinished',
                            form_data: {}
                        })
                        .select('id, created_at, doctor_id')
                        .single()

                    if (insertError || cancelled) return

                    setFormId(newForm.id)
                    setFormMeta({
                        created_at: newForm.created_at,
                        doctor_id: newForm.doctor_id
                    })
                }
            }
        }

        initForm()
        return () => { cancelled = true }
    }, [formType, editId])

    // autosave — w trybie edycji zapisuje też last_edited_by
    useEffect(() => {
        if (!formId) return

        const timeout = setTimeout(async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const updatePayload = {
                form_data: formData,
                updated_at: new Date().toISOString()
            }

            // tylko w trybie edycji zapisujemy kto edytował
            if (editId) {
                updatePayload.last_edited_by = user.id
            }

            await supabase
                .from('patient_forms')
                .update(updatePayload)
                .eq('id', formId)
        }, 1000)

        return () => clearTimeout(timeout)
    }, [formData, formId])

    function handleChange(e) {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    async function handleSubmit(formType) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        if (editId) {
            // TRYB EDYCJI — tylko form_data + last_edited_by
            // doctor_id i created_at NIE są tu — zostają niezmienione w bazie
            const { error } = await supabase
                .from('patient_forms')
                .update({
                    form_data: formData,
                    updated_at: new Date().toISOString(),
                    last_edited_by: user.id
                })
                .eq('id', formId)

            if (error) {
                alert('Błąd zapisania formularza: ' + error.message)
                return
            }

            navigate(`/card/${formType}/info/${formId}`)
            return
        }

        // TRYB NOWY — obsługa pacjenta
        const { data: existingPatient } = await supabase
            .from('patients')
            .select('id')
            .eq('imie', formData.imie)
            .eq('nazwisko', formData.nazwisko)
            .eq('data_urodzenia', formData.data_urodzenia)
            .maybeSingle()

        let patientId

        if (existingPatient) {
            patientId = existingPatient.id

            // aktualizuj tylko niepuste pola uzupełniające — nigdy imię/nazwisko
            const updates = {}
            if (formData.kontakt) updates.kontakt = formData.kontakt

            if (Object.keys(updates).length > 0) {
                await supabase
                    .from('patients')
                    .update(updates)
                    .eq('id', patientId)
            }

        } else {
            const { data: newPatient, error: patientError } = await supabase
                .from('patients')
                .insert({
                    imie: formData.imie,
                    nazwisko: formData.nazwisko,
                    data_urodzenia: formData.data_urodzenia || null,
                    kontakt: formData.kontakt || null
                })
                .select('id')
                .single()

            if (patientError) {
                alert('Błąd zapisu pacjenta: ' + patientError.message)
                return
            }

            patientId = newPatient.id
        }

        const { error: formError } = await supabase
            .from('patient_forms')
            .update({
                patient_id: patientId,
                status: 'finished',
                form_type: formType,
                form_data: formData,
                updated_at: new Date().toISOString()
                // doctor_id NIE jest tu — został zapisany przy INSERT i zostaje
            })
            .eq('id', formId)

        if (formError) {
            alert('Błąd zapisania formularza: ' + formError.message)
            return
        }

        navigate(`/card/${formType}/info/${formId}`)
    }

    return {
        formData,
        setFormData,
        formId,
        setFormId,
        formMeta,  // created_at i doctor_id do wyświetlenia w Info
        handleChange,
        handleSubmit,
        editId     // żeby komponent wiedział czy jest w trybie edycji
    }
}
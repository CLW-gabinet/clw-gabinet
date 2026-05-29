// hooks/useSearch.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export function useSearch() {
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        imie: '',
        nazwisko: '',
        data_urodzenia: '',
        form_type: ''
    })

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchForms()
        }, 400)

        return () => clearTimeout(timeout)
    }, [filters])

    async function fetchForms() {
        setLoading(true)

        // krok 1 — jeśli są filtry na pacjenta, znajdź pasujące patient_id
        let patientIds = null

        const hasPatientFilter = filters.imie || filters.nazwisko || filters.data_urodzenia

        if (hasPatientFilter) {
            let patientQuery = supabase
                .from('patients')
                .select('id')

            if (filters.imie) {
                patientQuery = patientQuery.ilike('imie', `%${filters.imie}%`)
            }
            if (filters.nazwisko) {
                patientQuery = patientQuery.ilike('nazwisko', `%${filters.nazwisko}%`)
            }
            if (filters.data_urodzenia) {
                patientQuery = patientQuery.eq('data_urodzenia', filters.data_urodzenia)
            }

            const { data: patients, error } = await patientQuery

            if (error) {
                setLoading(false)
                return
            }

            patientIds = patients.map(p => p.id)

            // jeśli nie znaleziono żadnego pacjenta — zeruj wyniki od razu
            if (patientIds.length === 0) {
                setResults([])
                setLoading(false)
                return
            }
        }

        // krok 2 — pobierz patient_forms z joinem do patients
        let formQuery = supabase
            .from('patient_forms')
            .select(`
                id,
                form_type,
                created_at,
                doctor_id,
                patients (
                    imie,
                    nazwisko,
                    data_urodzenia
                )
            `)
            .eq('status', 'finished')
            .order('created_at', { ascending: false })
            .limit(10)

        if (filters.form_type) {
            formQuery = formQuery.eq('form_type', filters.form_type)
        }

        if (patientIds !== null) {
            formQuery = formQuery.in('patient_id', patientIds)
        }

        const { data, error } = await formQuery

        if (!error) setResults(data)
        setLoading(false)
    }

    function handleFilterChange(e) {
        const { name, value } = e.target
        setFilters(prev => ({ ...prev, [name]: value }))
    }

    function clearFilters() {
        setFilters({
            imie: '',
            nazwisko: '',
            data_urodzenia: '',
            form_type: ''
        })
    }

    return { results, loading, filters, handleFilterChange, clearFilters }
}
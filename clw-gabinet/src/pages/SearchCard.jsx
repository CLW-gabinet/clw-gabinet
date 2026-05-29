// pages/SearchCard.jsx
import { Baby, BabyIcon, Eraser, SearchCheck, User, Eye, FileUser, LogOut, ArrowBigLeft  } from 'lucide-react'
import { useSearch } from '../hooks/useSearch'
import { useNavigate } from 'react-router-dom'

const FORM_TYPE_ROUTES = {
    'children': 'children',
    'children_control': 'children-control',
    'children-control': 'children-control',
    'adult': 'adult',
    'adult_control': 'adult-control',
    'adult-control': 'adult-control',
    'lines': 'lines',
    'low_vision': 'low-vision',
    'low-vision': 'low-vision',
}

const FORM_TYPE_LABELS = {
    'children': 'Karta dziecięca',
    'children-control': 'Kontrolna dziecięca',
    'adult': 'Karta dorosłego',
    'adult-control': 'Kontrolna dorosłego',
    'lines': 'Dobór soczewek',
    'low-vision': 'Słabowidzenie'
}

async function handleLogOut(){
        const decision = confirm("Czy na pewno chcesz się wylogować?")

        if (decision){
            await supabase.auth.signOut()
        }else{
            return
        }
        
    }



function PatientCard({ form }) {
    const navigate = useNavigate()
    const patient = form.patients

    const handleNavigate = () => {
    const slug = FORM_TYPE_ROUTES[form.form_type]
    console.log('form_type:', form.form_type)
    console.log('slug:', slug)
    console.log('navigating to:', `/card/${slug}/info/${form.id}`)
    navigate(`/card/${slug}/info/${form.id}`)
}

    return (
        <div className="patient-card"> 
            <div className='icon-wrapper'>
                {form.form_type === 'children' || form.form_type === 'children-control' ? <BabyIcon size={50} color='#111649' /> : form.form_type === 'adult' || form.form_type === 'adult-control' ? <User size={50} color='#111649' /> : form.form_type === 'low-vision' ? <SearchCheck size={50} color='#111649' /> : form.form_type === 'lines' ? <Eye size={50} color='#111649' /> : <FileUser size={50} color='#111649' />} 
            </div>
            <div className='data-wrapper'>
               <div className="patient-card-name">
                    <strong>{patient?.imie} {patient?.nazwisko}</strong>
                </div>
                <div className="patient-card-details">
                    <span>ur. {patient?.data_urodzenia || '–'}</span> | <span className="patient-card-type">
                        {FORM_TYPE_LABELS[form.form_type] || form.form_type}
                    </span>
                </div>
                <div className="patient-card-date">
                    Data utworzenia: <u>{new Date(form.created_at).toLocaleDateString()}</u>
                </div>
                 
            </div>
            <button className='wroc zobacz' onClick={handleNavigate}>Zobacz</button>
        </div>
    )
}

export default function SearchCard() {
    const { results, loading, filters, handleFilterChange, clearFilters } = useSearch()
    const navigate = useNavigate()

    return (
        <div className="main">
            <button onClick={handleLogOut} className="log-out">
                <LogOut size={15} />
            </button>
            <button onClick={() => navigate('/dashboard')} className='return'>
                <ArrowBigLeft size={18} />
            </button>
            <header>
                <h1>Wyszukaj kartę</h1>
            </header>

            <section className="glass-card">
                <div className="search-layout">

                    {/* FILTRY — lewa strona */}
                    <div className="search-filters">
                        <h3>Filtruj</h3>

                        <div className='display-center-extend-gap'>
                            <div>
                                <label htmlFor="imie">Imię</label><br />
                                <input
                                    type="text"
                                    id="imie"
                                    name="imie"
                                    value={filters.imie}
                                    onChange={handleFilterChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="nazwisko">Nazwisko</label> <br />
                                <input
                                    type="text"
                                    id="nazwisko"
                                    name="nazwisko"
                                    value={filters.nazwisko}
                                    onChange={handleFilterChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="data_urodzenia">Data urodzenia</label><br />
                                <input
                                    type="date"
                                    id="data_urodzenia"
                                    name="data_urodzenia"
                                    value={filters.data_urodzenia}
                                    onChange={handleFilterChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="form_type">Typ karty</label><br />
                                <select
                                    id="form_type"
                                    name="form_type"
                                    value={filters.form_type}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">Wszystkie</option>
                                    {Object.entries(FORM_TYPE_LABELS).map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            </div> 
                            
                            <button
                                className="wyczysc"
                                onClick={clearFilters}
                                style={{ marginTop: '1rem' }}
                            >
                                <span><Eraser size={15} /></span>
                            </button>

                        </div>

                       
                    </div>

                    {/* WYNIKI — prawa strona */}
                    <div className="search-results">
                        {loading ? (
                            <p className="search-info">Ładowanie...</p>
                        ) : results.length === 0 ? (
                            <p className="search-info">Brak wyników</p>
                        ) : (
                            results.map(form => (
                                <PatientCard key={form.id} form={form} />
                            ))
                        )}
                    </div>

                </div>
            </section>
        </div>
    )
}
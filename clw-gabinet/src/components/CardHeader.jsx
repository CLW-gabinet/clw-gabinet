// CardHeader.jsx

function CardHeader({ formData, handleChange }) {
    return (
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
        </div>
    )
}

export default CardHeader
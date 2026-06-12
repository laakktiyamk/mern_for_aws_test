import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState('Ladataan tietoja backendistä...')

  useEffect(() => {
    // Luodaan async-funktio datan hakua varten
    const haeData = async () => {
      try {
        // Odotetaan, että Axios hakee tiedot backendistä
        const backendUrl = window.location.origin; // Tämä poimii automaattisesti http://51.20.191.215
        const vastaus = await axios.get(`${backendUrl}/api/data`);
        
        // Tallennetaan saatu vastaus tilaan
        setData(vastaus.data)
      } catch (virhe) {
        // Jos haku epäonnistuu, napataan virhe kiinni tässä
        setData('Yhteys backendiin epäonnistui: ' + virhe.message)
      }
    }

    // Kutsutaan funktiota heti
    haeData()
  }, []) // Tyhjä taulukko varmistaa, että haku tehdään vain kerran

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Meidän upea MERN-kokeilu! 🐳</h1>
      <p style={{ fontSize: '1.2rem', color: '#0070f3', fontWeight: 'bold' }}>
        {data}
      </p>
    </div>
  )
}

export default App

import { useEffect, useState } from "react"

interface Crypto {
  id: number,
  name: string
}

const PintarCriptos = () => {

  const getCryptos = () => fetch('https://api.coincap.io/v2/assets')
    .then(res => res.json())
    .then(res => setCryptos(res.data))
    .catch(e => setError(e))

  const [cryptos, setCryptos] = useState<Crypto[]>([])
  const [error, setError] = useState('')
  useEffect(() => {
    getCryptos()
  }, []);
  
  return <>
    <button onClick={getCryptos}>Obtener Criptomonedas</button>
    <span>Number of cryptos: {cryptos.length}</span>
    <p>{error.length && error}</p>
    <select name="" id="">
      {cryptos.map(crypto => <option key={crypto.id} value={crypto.name}>{crypto.name}</option>)}
    </select>
  </>
}
export default PintarCriptos
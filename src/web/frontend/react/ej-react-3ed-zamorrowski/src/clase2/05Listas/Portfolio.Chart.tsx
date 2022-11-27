import { Doughnut } from 'react-chartjs-2'

interface Crypto {
  name: string,
  price: number,
  total: number
}

const getData = (cryptos: Crypto[]) => {
  const total = cryptos.reduce((acum, next) => acum + next.price * next.total, 0)
  return {
    labels: cryptos.map(c => c.name),
    datasets: [{
      data: cryptos.map(c => (c.total * c.price) * 100 / total),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
    }]
  }
}

interface Props {
  cryptos: Crypto[]
}

const PortfolioChart = (props: Props) => (
  <div style={{height: '100px'}}>
    <Doughnut data={getData(props.cryptos)} />
  </div>
)

export default PortfolioChart
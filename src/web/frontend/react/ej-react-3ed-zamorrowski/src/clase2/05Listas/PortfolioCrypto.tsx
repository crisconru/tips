import PortfolioChart from './Portfolio.Chart';

const PortfolioCrypto = () => {
  return <>
    <PortfolioChart
      cryptos={[
        { name: 'btc', total: 1, price: 50000 }, 
        { name: 'ada', total: 1050, price: 2 }, 
        { name: 'USDT', total: 35000, price: 1 }
      ]} 
    />
  </>
}

export default PortfolioCrypto
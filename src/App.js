import Navbar from "./components/Navbar"
import "./App.css"
import LotteryEnter from "./components/LotteryEnter"
import { useMoralis } from "react-moralis"

function App() {
  const { isWeb3Enabled } = useMoralis()

  return (
    <div className="App">
      <Navbar />
      {isWeb3Enabled ? (
        <LotteryEnter />
      ) : (
        <div className="container mt-5 d-flex align-content-center justify-content-center">
          <p className="alert alert-danger w-50">
            please connect your wallet to get started.
          </p>
        </div>
      )}
    </div>
  )
}

export default App

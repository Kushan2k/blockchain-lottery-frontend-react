import Navbar from "./components/Navbar"
import "./App.css"
import LotteryEnter from "./components/LotteryEnter"
import { useMoralis } from "react-moralis"
import Dashboard from "./components/Dashboard"

function App() {
  const { isWeb3Enabled, account, chainId } = useMoralis()

  const admins = {
    1337: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    11155111: "0x669406ff143A2869D3709c888AF6eA15a419c498",
  }

  console.log(account)
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
      {account &&
      parseInt(chainId) in admins &&
      admins[parseInt(chainId)] === account.toString()
        ? console.log("admin")
        : // <Dashboard />
          console.log("not admin")}
    </div>
  )
}

export default App

import { useMoralis, useWeb3Contract } from "react-moralis"
import abi from '../constants/abi.json'
import address from '../constants/address.json'
import { Button, useNotification } from "@web3uikit/core"

export default function Dashboard() {

  

  const {chainId}=useMoralis()

  
  const Caddress = parseInt(chainId) in address ? address[parseInt(chainId)][0] : null

  const { runContractFunction: pickWinner, isFetching } = useWeb3Contract({
    abi,
    contractAddress: Caddress,
    functionName: 'pickWinner',
    params:{}
    
  })
  const dispatch=useNotification()
  async function pick() {
    await pickWinner({
      onSuccess: async(tx) => {
        await tx.wait(1)
        dispatch({
          title: "completed",
          type: 'info',
          position: 'topR',
          message: 'winner pick function call!',
          icon: 'bell',
          iconColor:'black'
        })
      }
    })
  }
  
  return (
    <div className="container mt-5 mx-auto d-flex justify-content-center flex-column align-items-center">
      
      <p className="alert text-danger text-capitalize">as a admin only you can end the lottery but you have to wait untill the required time is passed!</p>

      <Button
        onClick={()=>pick()}
        color="blue"
        icon={'bell'}
        disabled={isFetching}
        text="Pick Winner"
      />

      
    </div>
  )
}

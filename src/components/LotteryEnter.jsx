import { useMoralis, useWeb3Contract } from "react-moralis"
import abi from '../constants/abi.json'
import address from '../constants/address.json'
import { useEffect, useState } from "react"
import { Button, CryptoCards, Hero, Typography, useNotification } from "@web3uikit/core"
import React from "react"


export default function LotteryEnter() {

  const dispatch=useNotification()

  const {chainId}=useMoralis()
  const [entraceFee, setFee] = useState('0')

  const Caddress = parseInt(chainId) in address ? address[parseInt(chainId)][0] : null
  
  const {runContractFunction:EnterLottry} = useWeb3Contract(
    {
      abi: abi,
      contractAddress: Caddress,
      params: '',
      functionName: 'enter',
      msgValue:entraceFee
    }
  )
  const { runContractFunction:getEntraceFee } = useWeb3Contract(
    {
      abi: abi,
      contractAddress: Caddress,
      params: {},
      functionName: 'getEntraceFee',
      
    }
  )
  async function d() {
      const fee = await getEntraceFee()
      setFee(fee.toString())
    
  }
  
  
  useEffect( () => {
      d()
    
    
  },[])

  return (
    <div className="container mx-auto m-4 text-start   ">
      <Hero
        align="right"
        backgroundColor="#0F7FFF"
        customImage={{
          url: 'https://www.verdict.co.uk/wp-content/uploads/2022/12/Shutterstock_2183804245.jpg'
        }}
        height="200px"
        padding="40px"
        rounded="20px"
      >
        <React.Fragment key=".0">
          <Typography
            color="#FFFFFF"
            variant="h3"
          >
            Blockchain
          </Typography>
          <Typography
            color="#FFFFFF"
            variant="h1"
          >
            Connect your wallet to get started!
          </Typography>
          
        </React.Fragment>
      </Hero>
      <div className="row align-content-center">
        <div className="col-12 col-md-6 flex-column d-flex align-items-center justify-content-center align-items-md-start">
          
          <h1 className=" display-4">Enter Lottery</h1>
          {
            Caddress ? (
              <>
                <p className="display-6 d-flex align-items-center">
                  Entrace Fee: {parseInt(entraceFee) / 1e18} 
                  ETH
                </p>
                <Button
                  onClick={async function () {
                    await EnterLottry(
                      {
                        onSuccess: () => {
                          dispatch({
                            position: 'topR',
                            type: 'success',
                            title: 'Entry Marked',
                            message:"your entry has been marked!"
                          })
                            
                        },
                        onError: (er) => {
                          console.log(er)
                          dispatch({
                            position: 'topR',
                            type: 'error',
                            title: "error",
                            message:er.message
                          })
                        },

                      }
                    )
                  }}
                  text="Mark an Entry"
                  theme="secondary"
                  size="large"
                  
                />
                  
                
              </>
            ) : (
                <p className="text-danger display-6 text-center">
                  No valid address found!
                </p>
            )
          }
        </div>
        <div className="col-12 col-md-6 flex-column d-flex align-items-center justify-content-center">
          <CryptoCards bgColor="#396993" btnText="Ethereum" chain="ethereum" chainType="Blockchain"/>
        </div>
      </div>
    </div>
  )
}

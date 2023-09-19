import {ConnectButton} from '@web3uikit/web3'


export default function Navbar() {

  return (
    <div className='container-fluid p-2 d-flex justify-content-center justify-content-md-between' style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight:20,
    }}>
      <ul className='d-none d-md-flex' style={{
        listStyleType: 'none',
        display: 'flex',
        width: '30%',
        alignItems: 'center',
        justifyContent:'space-evenly'
        
      }}>
        <li className='text-decoration-underline border-bottom border-success'>Home</li>
        <li>About</li>
        <li>Updates</li>
        
      </ul>
      
      
      <ConnectButton />

    </div>
  )
}

import './App.css';
import {useState, useEffect} from 'react';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Widgets from './components/Widgets'

function App() {

  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');

  const connectWallet = async () =>{
  
    try{
     const {ethereum} = window
   
     if(!ethereum){
       console.log("Metamask not detected");
       alert("Metamask not detected");
       return;
     }
   
     let chainId = await ethereum.request({method: "eth_chainId"});
     console.log("Connected to chain", chainId);
   
     let rinkebyChainId = "0x4";
   
     if(chainId !== rinkebyChainId){
       console.log("you need to connect to rinkeby");
       setCorrectNetwork(false);
       return;
     }else{
       setCorrectNetwork(true);
     }
   
     const accounts = await ethereum.request({method: 'eth_requestAccounts'});
     console.log("Found Accoount: ", accounts[0]);
     setCurrentAccount(accounts[0]);
    }catch(error){
      console.log("Error connecting to metamask", error);
    }
   
   }
   
   useEffect(() => {
     connectWallet();
   }, []);
      


  return (
    <div>
    {currentAccount === '' ? (
      <button
      className='text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
      onClick={connectWallet}
      >
      Connect Wallet
      </button>
      ) : correctNetwork ? (
        <div className="app">
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      ) : (
      <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
      <div>----------------------------------------</div>
      <div>Please connect to the Rinkeby Testnet</div>
      <div>and reload the page</div>
      <div>----------------------------------------</div>
      </div>
    )}
    </div>

  );
}

export default App;

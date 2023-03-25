import React, {useEffect, useState} from 'react';
import {TextField, Button} from '@mui/material';
import Task from './components/Task';
import { EthDoItContractAddress } from './config';
import {ethers} from 'ethers';
import EthDoItAbi from './contracts/EthDoItContract.json';
import './App.css';


const App =()=>{
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [currentAccount, setCurrentAccount] = useState('');
  const [correctNetwork, setCorrectNetwork] = useState(false);


  const connectWallet = async()=>{
    try{
      const {ethereum} = window
      if(!ethereum){
        console.log("Metamask not detected");
        return ;
      }

      let chainId = await ethereum.request({method: 'eth_chainId'})

      const goerliChainId = '0x5';
      if(chainId!== goerliChainId){
        console.log("ChainId different");
        return;
      }else{
        setCorrectNetwork(true);
      }

      const accounts = await ethereum.request({method: 'eth_requestAccounts'})
      setCurrentAccount(accounts[0]);

    } catch(error){
      console.log(error);
    }
  }

  const addTask = async(e)=>{
    e.preventDefault();
      let task = {
        'taskText' : input,
        'isDeleted' : false
      };

      try{
        const {ethereum} = window
        if(ethereum){
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const EthDoItContract = new ethers.Contract(
            EthDoItContractAddress,
            EthDoItAbi.abi,
            signer);

          EthDoItContract.addTask(task.taskText,task.isDeleted)
          .then( response => {
              setTasks([...tasks,task]);
          }).catch(err=>{
            console.log(err);
          })
        }
      }catch (error){
        console.log(error);
      }
      
      setInput('');

  }

  const deleteTask = key=> async()=>{

    try{
      const {ethereum} = window
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const EthDoItContract = new ethers.Contract(
          EthDoItContractAddress,
          EthDoItAbi.abi,
          signer);

        let deleteTx = await EthDoItContract.deleteTask(key,true);
        let allTasks = await EthDoItContract.getMyTasks();
        setTasks(allTasks);
      }else{
        console.log("Ethereum object doesn't exist");
      }

    }catch (error){
      console.log(error);
    }
  }
  
  const getAllTasks = async()=>{

    try{
      const {ethereum} = window
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const EthDoItContract = new ethers.Contract(
          EthDoItContractAddress,
          EthDoItAbi.abi,
          signer);

        let allTasks = await EthDoItContract.getMyTasks();
        setTasks(allTasks);
      }else{
        console.log("Ethereum object doesn't exist");
      }

    }catch (error){
      console.log(error);
    }
  }
  

  useEffect(()=>{
    connectWallet();
    getAllTasks();
  },[])
  return (
    <div id='main'>
      { currentAccount === ''? (
          <button className='text-2xl font-bold py-3 px-12 bg-[#fefefe] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out' onClick={connectWallet}>
            Connect Wallet
          </button>
      ): correctNetwork ? (
        <div className='App'>
          <h2>Task Management App</h2>
          <form>
            <TextField id="outlined-basic" label="Make ToDo" varient="outlined" style={{margin:"0px 5px"}} size="small" value={input} 
              onChange={(e)=>setInput(e.target.value)} />
              <Button varient="contained" color="primary" onClick={addTask}>Add Task</Button>
          </form>

          <ul id='list'>
            {tasks.map(item=>
              <Task key={item.id}
              taskText={item.taskText}
              onClick={deleteTask(item.id)}
              />
            )}
          </ul>

        </div>

      ): (
        <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
          <div>
            <p>-----------------------------------------------------</p>
            <p>Please Connect to Goerli Testnet and reload the page</p>
            <p>-----------------------------------------------------</p>
            
          </div>  
        </div>
      )

      }
    </div>
  )



}

export default App;
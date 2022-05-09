const main = async() => {
    const contractFacotory = await ethers.getContractFactory("MediaContract");
    const contract = await contractFacotory.deploy();
    await contract.deployed;

    console.log("Contract Deployed to: ", contract.address);
}

const runMain = async() =>{
    try{
      await main();
      process.exit(0);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
}

runMain();
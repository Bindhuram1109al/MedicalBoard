const express = require('express');
const Web3 = require('web3');
const app = express();

const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/YOUR_PROJECT_ID'));

const medicalBoardContractAddress = '0x...';
const medicalBoardContractABI = [...];

app.post('/register', async (req, res) => {
    // User registration (optional)
    const { name, email } = req.body;
    // Store user information in off-chain database (if used)
    res.json({ message: 'User registered successfully' });
});

app.post('/upload-medical-data', async (req, res) => {
    // Upload medical data (hashes the data before sending to the smart contract)
    const { medicalData } = req.body;
    const hashedData = web3.utils.sha3(medicalData);
    const medicalBoardContract = new web3.eth.Contract(medicalBoardContractABI, medicalBoardContractAddress);
    try {
        const txCount = await web3.eth.getTransactionCount();
        const tx = {
            from: '0x...', // Your Ethereum account address
            to: medicalBoardContractAddress,
            value: web3.utils.toWei('0', 'ether'),
            gas: '20000',
            gasPrice: web3.utils.toWei('20', 'gwei'),
            data: medicalBoardContract.methods.addMedicalData(hashedData).encodeABI()
        };
        const signedTx = await web3.eth.accounts.signTransaction(tx, '0x...'); // Your Ethereum account private key
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        res.json({ message: 'Medical data uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading medical data' });
    }
});

app.get('/get-medical-data', async (req, res) => {
    // Retrieve hashed medical data (for authorized users)
    const patientAddress = req.query.patientAddress;
    const medicalBoardContract = new web3.eth.Contract(medicalBoardContractABI, medicalBoardContractAddress);
    try {
        const medicalData = await medicalBoardContract.methods.getMedicalData(patientAddress).call();
        res.json(medicalData);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving medical data' });
    }
});
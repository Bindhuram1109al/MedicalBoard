pragma solidity ^0.8.0;

contract MedicalBoard {
    mapping (address => bytes32) public medicalData;

    function addMedicalData(bytes32 _hashedData) public {
        // Add hashed medical data to the blockchain
        medicalData[msg.sender] = _hashedData;
    }

    function getMedicalData(address _patient) public view returns (bytes32) {
        // Retrieve hashed medical data for a specific patient
        // Only authorized personnel can access this
        require(msg.sender == _patient || msg.sender == authorizedPersonnel, "Unauthorized access");
        return medicalData[_patient];
    }
}
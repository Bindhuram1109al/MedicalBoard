const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/medicalboard', { useNewUrlParser: true, useUnifiedTopology: true });

const patientSchema = new mongoose.Schema({
    name: String,
    email: String,
    // Additional patient information
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
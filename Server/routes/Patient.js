const express = require('express');
const router = express.Router();
const patient=require('../controllers/patients');

router.get('/details',patient.GetPatients);
router.get('/details/:id',patient.GetPatient);
router.delete('/delete/:id',patient.DeletePatient);
router.post('/add',patient.AddPatient);
router.put('/update',patient.UpdatePatient);
router.get('/vaccination/:id',patient.GetVaccination);
router.get('/morbidity/:id',patient.GetMorbidity);
router.post('/addv',patient.AddVaccination);
router.post('/addm',patient.AddMorbidity);
router.delete('/deletev/:code/:id',patient.DeleteVaccine);
router.delete('/deletem/:code/:id',patient.DeleteMorbidity);
router.get('/notvaccined',patient.GetNotVaccined);
router.get('/possitive/:m',patient.GetPositiveByDay);


module.exports = router;


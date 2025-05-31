import express, { Response } from 'express';
import { NonSensitivePatientEntry } from '../types';
import patientService from '../services/patientService';


const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientEntry[]>) => {
    res.send(patientService.getPatientsEntries());
});

router.get('/:id', (req, res: Response<NonSensitivePatientEntry>) => {
    const patient = patientService.getPatientsEntryById(req.params.id);

    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    };
});

// router.post('/', (req, res) => {
//     const {body} = req;

//     console.log(body);
// })
// // router.post('/', (req, res) => {

// // })

export default router;
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

router.post('/', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {name, dateOfBirth, ssn, gender, occupation} = req.body;

    const addedEntry = patientService.postAddPatient(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        {name, dateOfBirth, ssn, gender, occupation}
    );

    res.json(addedEntry);
});

export default router;
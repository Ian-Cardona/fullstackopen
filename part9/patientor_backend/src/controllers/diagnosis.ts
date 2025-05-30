import express, { Response }  from 'express';
import { Diagnosis } from '../types';
import diagnosesService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
    res.send(diagnosesService.getDiagnosesEntries());
});

export default router;
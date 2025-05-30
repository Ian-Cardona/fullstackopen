import diagnosesData from '../../data/diagnoses';

import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosesData;

const getDiagnosesEntries = (): Diagnosis[] => {
    return diagnoses;
};

export default {
    getDiagnosesEntries
};
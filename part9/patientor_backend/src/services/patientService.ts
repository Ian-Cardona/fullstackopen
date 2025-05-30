import patientsData from '../../data/patients';

import { NonSensitivePatient, Patient } from '../types';

const getPatients = (): Patient[] => {
    return patientsData;
};

const getPatientsEntries = ():  NonSensitivePatient[] => {
    console.log('patients', patientsData);
    return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation,
    }));
};

export default {
    getPatients,
    getPatientsEntries
};
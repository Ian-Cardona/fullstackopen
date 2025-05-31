import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients';

import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';

const getPatients = (): PatientEntry[] => {
    return patientsData;
};

const getPatientsEntries = ():  NonSensitivePatientEntry[] => {
    return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id, name, dateOfBirth, gender, occupation,
    }));
};

const getPatientsEntryById = (id: string): NonSensitivePatientEntry | undefined => {
   const patient = patientsData.find((entry) => entry.id === id);
   if (!patient) return undefined;
   const { id: patientId, name, dateOfBirth, gender, occupation} = patient;
   return {id: patientId, name, dateOfBirth, gender, occupation};
};

const postAddPatient = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: uuidv4(),
        ...entry
    };

    patientsData.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatients,
    getPatientsEntries,
    getPatientsEntryById,
    postAddPatient
}; 
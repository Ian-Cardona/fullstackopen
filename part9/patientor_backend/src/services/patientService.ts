import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients';

import { NewPatientEntry, NonSensitivePatientEntry, parseGender, parseString, PatientEntry } from '../types';

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

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if (!object || typeof object!=='object') {
        throw new Error('Incorrect or missing data');
    }

    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry: NewPatientEntry = {
        name: parseString(object.name),
        dateOfBirth: parseString(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation)
    };

    return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
};

const postAddPatient = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: uuidv4(),        
        ...toNewPatientEntry(entry)
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
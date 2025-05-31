import patientsData from '../../data/patients';

import { NonSensitivePatientEntry, PatientEntry } from '../types';

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

// const postPatientEntry = ():  NonSensitivePatientEntry[] => {
//     console.log('patients', patientsData);
//     return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
//         id, name, dateOfBirth, gender, occupation,
//     }));
// };
export default {
    getPatients,
    getPatientsEntries,
    getPatientsEntryById
}; 
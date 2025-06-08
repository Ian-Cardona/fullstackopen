import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients';

import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { newPatientSchema, patientEntrySchema } from '../utils';

const getPatients = (): PatientEntry[] => {
    return patientsData.map((patient) => patientEntrySchema.parse(patient));
};

const getPatientsEntries = ():  NonSensitivePatientEntry[] => {
    // return patientsData.map((patient) => nonSensitivePatientEntrySchema.parse(patient));
    return patientsData.map((patient) => patientEntrySchema.parse(patient));
};

const getPatientsEntryById = (id: string): NonSensitivePatientEntry | undefined => {
   const patient = patientsData.find((entry) => entry.id === id);
   if (!patient) return undefined;
//    return nonSensitivePatientEntrySchema.parse(patient);
return patientEntrySchema.parse(patient);
};

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    // if (!object || typeof object!=='object') {
    //     throw new Error('Incorrect or missing data');
    // }

    // if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    // const newEntry: NewPatientEntry = {
    //     name: parseString(object.name),
    //     dateOfBirth: parseString(object.dateOfBirth),
    //     ssn: parseString(object.ssn),
    //     gender: parseGender(object.gender),
    //     occupation: parseString(object.occupation)
    // };

    // const newEntry: NewPatientEntry = {
    //     name: z.string().parse(object.name),
    //     dateOfBirth: z.string().parse(object.dateOfBirth),
    //     ssn: z.string().parse(object.ssn),
    //     gender: z.nativeEnum(Gender).parse(object.gender),
    //     occupation: z.string().parse(object.occupation)
    // };

    return newPatientSchema.parse(object);
    // }

    // throw new Error('Incorrect data: some fields are missing');
};

const postAddPatient = (entry: unknown): PatientEntry => {
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
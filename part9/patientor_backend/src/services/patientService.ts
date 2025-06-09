import { v4 as uuidv4 } from "uuid";
import patientsData from "../../data/patients";

import {
    parseArray,
//   NewPatientEntry,
  parseGender,
  parseString,
  PatientEntry,
} from "../types";
// import { newPatientSchema, patientEntrySchema } from '../utils';

// const getPatients = (): PatientEntry[] => {
//     return patientsData.map((patient) => patientEntrySchema.parse(patient));
// };

const getPatientsEntries = (): PatientEntry[] => {
  // return patientsData.map((patient) => nonSensitivePatientEntrySchema.parse(patient));
  // return patientsData.map((patient) => patientEntrySchema.parse(patient));
  return patientsData.map(({ id, name, ssn, dateOfBirth, gender, occupation, entries }) => ({
    id: parseString(id),
    name: parseString(name),
    ssn: parseString(ssn),
    dateOfBirth: parseString(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: parseArray(entries)
  }));
};

const getPatientsEntryById = (
  id: string
): PatientEntry | undefined => {
  const patient = patientsData.find((entry) => entry.id === id);
  if (!patient) return undefined;
  //    return nonSensitivePatientEntrySchema.parse(patient);
  // return patientEntrySchema.parse(patient);
  return {
    id: parseString(patient.id),
    name: parseString(patient.name),
    ssn: parseString(patient.ssn),
    dateOfBirth: parseString(patient.dateOfBirth),
    gender: parseGender(patient.gender),
    occupation: parseString(patient.occupation),
    entries: parseArray(patient.entries)
    
  };
};

const toNewPatientEntry = (object: unknown): PatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "id" in object &&
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    const newEntry: PatientEntry = {
        id: uuidv4(),
        name: parseString(object.name),
        dateOfBirth: parseString(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        entries: parseArray(object.entries)
    };

    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");

  // const newEntry: NewPatientEntry = {
  //     name: z.string().parse(object.name),
  //     dateOfBirth: z.string().parse(object.dateOfBirth),
  //     ssn: z.string().parse(object.ssn),
  //     gender: z.nativeEnum(Gender).parse(object.gender),
  //     occupation: z.string().parse(object.occupation)
  // };

  // return newPatientSchema.parse(object);
  // }
};

const postAddPatient = (entry: unknown): PatientEntry => {
  const newPatientEntry: PatientEntry = toNewPatientEntry(entry);
  
  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatientsEntries,
  getPatientsEntryById,
  postAddPatient,
};

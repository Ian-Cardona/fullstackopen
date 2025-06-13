import { v4 as uuidv4 } from "uuid";
import patientsData from "../../data/patients-full";

import {
  Entry,
  parseArray,
  //   NewPatientEntry,
  parseGender,
  parseString,
  PatientEntry,
  parseDiagnosisCodes,
  parseDischarge,
  parseHealthCheckRating,
  parseSickLeave,
  isHospitalEntry,
  isHealthCheckEntry,
  isOccupationalHealthcareEntry,
} from "../types";
// import { newPatientSchema, patientEntrySchema } from '../utils';

// const getPatients = (): PatientEntry[] => {
//     return patientsData.map((patient) => patientEntrySchema.parse(patient));
// };

const getPatientsEntries = (): PatientEntry[] => {
  // return patientsData.map((patient) => nonSensitivePatientEntrySchema.parse(patient));
  // return patientsData.map((patient) => patientEntrySchema.parse(patient));
  return patientsData.map(
    ({ id, name, ssn, dateOfBirth, gender, occupation, entries }) => ({
      id: parseString(id),
      name: parseString(name),
      ssn: parseString(ssn),
      dateOfBirth: parseString(dateOfBirth),
      gender: parseGender(gender),
      occupation: parseString(occupation),
      entries: parseArray(entries),
    })
  );
};

const getPatientsEntryById = (id: string): PatientEntry | undefined => {
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
    entries: parseArray(patient.entries),
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
      entries: parseArray(object.entries),
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

const toNewEntry = (object: unknown): Entry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "diagnosisCodes" in object &&
    "type" in object
  ) {
    const newEntry = {
      id: uuidv4(),
      description: parseString(object.description),
      date: parseString(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: parseDiagnosisCodes({
        diagnosisCodes: object.diagnosisCodes,
      }),
    };

    switch (object.type) {
      case "Hospital":
        if (!isHospitalEntry(object)) {
          throw new Error("Hospital entry missing discharge");
        }
        return {
          ...newEntry,
          type: "Hospital",
          discharge: parseDischarge(object.discharge),
        };
      case "HealthCheck":
        if (!isHealthCheckEntry(object)) {
          throw new Error("Hospital entry missing discharge");
        }
        return {
          ...newEntry,
          type: "HealthCheck",
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
      case "OccupationalHealthcare":
        if (!isOccupationalHealthcareEntry(object)) {
          throw new Error("Hospital entry missing discharge");
        }
        return {
          ...newEntry,
          type: "OccupationalHealthcare",
          employerName: parseString(object.employerName),
          sickLeave: parseSickLeave(object.sickLeave),
        };
      default:
        throw new Error(`Unknown error: Invalid types.`);
    }
  }
  throw new Error("Incorrect data: some fields are missing or invalid");
};

const postNewEntryToId = (id: string, entry: unknown): Entry => {
  const newEntry: Entry = toNewEntry(entry);
  console.log("newEntry", newEntry);
  patientsData.find((patient) => patient.id == id)?.entries.push(newEntry);

  return newEntry;
};

export default {
  getPatientsEntries,
  getPatientsEntryById,
  postAddPatient,
  postNewEntryToId,
};

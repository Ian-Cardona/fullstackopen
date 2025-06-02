import { z } from "zod";
import { newPatientSchema } from "./utils";

export enum Gender {
    Male = "male",
    Female = "female",
    Others = "other"
};

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
};

export type NewPatientEntry = z.infer<typeof newPatientSchema>;
export interface PatientEntry extends NewPatientEntry {
    id: string;
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

// export interface PatientEntry {
//    id: string,
//    name: string,
//    dateOfBirth: string,
//    ssn: string,
//    gender: string,
//    occupation: string
// };

// export interface NewPatientEntry {
//     name: string, dateOfBirth: string, ssn: string, gender: Gender, occupation: string
// }

// const isString = (text: unknown): text is string => {
//  return typeof text === 'string' || text instanceof String;
// };

// const parseString = (value: unknown): string => {
//     if (!value || !isString(value)) {
//         throw new Error('Incorrect format');
//     };

//     return value;
// };

// const isGender = (param: string): param is Gender => {
//     return Object.values(Gender).map(v => v.toString()).includes(param);
// };

// const parseGender = (value: unknown): Gender => {
//     if (!value || !isString(value) || !isGender(value)) {
//         throw new Error('Incorrect format');
//     };

//     return value;
// };


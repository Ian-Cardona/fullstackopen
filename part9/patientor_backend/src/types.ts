// import { z } from "zod";
// import { newPatientSchema } from "./utils";

export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
// export interface Entry {
// }

export enum Gender {
    Male = "male",
    Female = "female",
    Others = "other"
};

export interface PatientEntry {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: Gender;
    dateOfBirth: string;
    entries: []
};

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

const isString = (text: unknown): text is string => {
 return typeof text === 'string' || text instanceof String;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

export const parseString = (value: unknown): string => {
    if (!value || !isString(value)) {
        throw new Error('Incorrect format');
    };

    return value;
};

export const parseGender = (value: unknown): Gender => {
    if (!value || !isString(value) || !isGender(value)) {
        throw new Error('Incorrect format');
    };

    return value;
};

export const parseArray = (value: unknown): [] => {
    if (!value || !Array.isArray(value)) {
        throw new Error('Incorrect format');
    }
    
    return value as [];
};

// export type NewPatientEntry = z.infer<typeof newPatientSchema>;


// import { z } from "zod";
// import { newPatientSchema } from "./utils";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

export type EntryWithoutId = UnionOmit<Entry, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface PatientEntry {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn" | "entries">;

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

export const parseString = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error("Incorrect format");
  }

  return value;
};

export const parseGender = (value: unknown): Gender => {
  if (!value || !isString(value) || !isGender(value)) {
    throw new Error("Incorrect format");
  }

  return value;
};

export const parseArray = (value: unknown): [] => {
  if (!value || !Array.isArray(value)) {
    throw new Error("Incorrect format");
  }

  return value as [];
};

// export type NewPatientEntry = z.infer<typeof newPatientSchema>;

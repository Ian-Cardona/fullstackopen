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

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

export const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== "object" || !("discharge" in object)) {
    throw new Error("Incorrect format");
  }

  return object.discharge as Discharge;
};

export const parseHealthCheckRating = (object: unknown): HealthCheckRating => {
  if (
    !object ||
    typeof object !== "object" ||
    !("healthCheckRating" in object)
  ) {
    throw new Error("Incorrect format");
  }

  return object.healthCheckRating as HealthCheckRating;
};

export const parseSickLeave = (object: unknown): SickLeave => {
  if (
    !object ||
    typeof object !== "object" ||
    !("startDate" in object) ||
    !("endDate" in object)
  ) {
    throw new Error("Incorrect format");
  }

  return {
    startDate: parseString(object.startDate),
    endDate: parseString(object.endDate),
  };
};

export const isHospitalEntry = (
  object: unknown
): object is { discharge: unknown } => {
  return !!object && typeof object === "object" && "discharge" in object;
};

export const isHealthCheckEntry = (
  object: unknown
): object is { healthCheckRating: unknown } => {
  return (
    !!object && typeof object === "object" && "healthCheckRating" in object
  );
};

export const isOccupationalHealthcareEntry = (
  object: unknown
): object is { employerName: unknown; sickLeave: unknown } => {
  return (
    !!object &&
    typeof object === "object" &&
    "employerName" in object &&
    "sickLeave" in object
  );
};

// export type NewPatientEntry = z.infer<typeof newPatientSchema>;

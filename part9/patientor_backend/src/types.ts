interface Diagnosis {
    code: string,
    name: string,
    latin?: string
};

interface PatientEntry {
   id: string,
   name: string,
   dateOfBirth: string,
   ssn: string,
   gender: string,
   occupation: string
};

type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

interface NewPatientEntry {
    name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string
}

export {
    Diagnosis, PatientEntry, NonSensitivePatientEntry, NewPatientEntry
};

enum Gender {
    Male = "male",
    Female = "female",
    Others = "others"
};

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
    name: string, dateOfBirth: string, ssn: string, gender: Gender, occupation: string
}

const isString = (text: unknown): text is string => {
 return typeof text === 'string' || text instanceof String;
};

const parseString = (value: unknown): string => {
    if (!value || !isString(value)) {
        throw new Error('Incorrect format');
    };

    return value;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (value: unknown): Gender => {
    if (!value || !isString(value) || !isGender(value)) {
        throw new Error('Incorrect format');
    };

    return value;
};

export {
    parseGender, parseString, isString, isGender, Diagnosis, PatientEntry, NonSensitivePatientEntry, NewPatientEntry
};

import {z} from 'zod';
import { Gender } from './types';

export const newPatientSchema = z.object({
     name: z.string(),
     dateOfBirth: z.string(),
     ssn: z.string(),
     gender: z.nativeEnum(Gender),
     occupation: z.string()
    },
);

export const patientEntrySchema = newPatientSchema.extend({
    id: z.string()
});

export const nonSensitivePatientEntrySchema = patientEntrySchema.omit({ ssn: true });
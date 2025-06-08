import {z} from 'zod';
import { Gender } from './types';

export const entrySchema = z.object({
    
});

export const newPatientSchema = z.object({
     name: z.string(),
     dateOfBirth: z.string(),
     ssn: z.string(),
     gender: z.nativeEnum(Gender),
     occupation: z.string(),
     entries: z.array(entrySchema)
    },
);

export const patientEntrySchema = newPatientSchema.extend({
    id: z.string()
},);

export const nonSensitivePatientEntrySchema = patientEntrySchema.omit({ ssn: true, entries: true });
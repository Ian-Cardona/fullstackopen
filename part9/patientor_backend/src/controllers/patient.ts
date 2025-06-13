import express, { Request, Response } from "express";
import { Entry, PatientEntry } from "../types";
import patientService from "../services/patientService";
import { errorMiddleware, newPatientParser } from "../middleware";

type Params = {
  id: string;
};

const router = express.Router();

router.get("/", (_req, res: Response<PatientEntry[]>) => {
  res.send(patientService.getPatientsEntries());
});

router.get("/:id", (req, res: Response<PatientEntry>) => {
  const patient = patientService.getPatientsEntryById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, PatientEntry>,
    res: Response<PatientEntry>
  ) => {
    const addPatientEntry = patientService.postAddPatient(req.body);
    res.json(addPatientEntry);

    // // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    // const {name, dateOfBirth, ssn, gender, occupation} = req.body;

    // const addedEntry = patientService.postAddPatient(
    //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //     {name, dateOfBirth, ssn, gender, occupation}
    // );

    // res.json(addedEntry).status(204);

    // try {
    //     const addPatientEntry = patientService.postAddPatient(
    //         req.body
    //     );

    //     res.json(addPatientEntry);
    // } catch (error: unknown) {
    //     if (error instanceof z.ZodError) {
    //         res.status(400).send({ error: error.issues});
    //     } else {
    //         res.status(400).send({ error: 'unknown error'});
    //     }
    // }
  }
);

router.post(
  "/:id/entries",
  (req: Request<Params, unknown, Entry>, res: Response<Entry>) => {
    const id = req.params.id;
    const addNewEntry = patientService.postNewEntryToId(id, req.body);
    res.json(addNewEntry);
  }
);

router.use(errorMiddleware);

export default router;

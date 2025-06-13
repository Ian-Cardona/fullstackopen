import { Card } from "@mui/material";
import type { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import { MedicalServicesRounded } from "@mui/icons-material";

interface OccupationalHealthcareEntryProps {
  occupationalHealthcareEntry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntry = (
  props: OccupationalHealthcareEntryProps
) => {
  return (
    <Card sx={{ marginBlock: "10px" }}>
      <div>
        {props.occupationalHealthcareEntry.date}
        <MedicalServicesRounded></MedicalServicesRounded>
      </div>
      <em>{props.occupationalHealthcareEntry.description}</em>
      <div></div>
      {props.occupationalHealthcareEntry.diagnosisCodes?.map((code) => (
        <li key={code}>
          {code}{" "}
          {props.diagnoses.map((a) =>
            a.code == code ? (
              <span key={a.code}>
                <em>{a.name}</em>
              </span>
            ) : null
          )}
        </li>
      ))}
      diagnose by {props.occupationalHealthcareEntry.specialist}
    </Card>
  );
};

export default OccupationalHealthcareEntry;

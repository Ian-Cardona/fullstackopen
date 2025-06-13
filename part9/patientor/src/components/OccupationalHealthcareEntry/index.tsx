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
      diagnose by {props.occupationalHealthcareEntry.specialist}
    </Card>
  );
};

export default OccupationalHealthcareEntry;

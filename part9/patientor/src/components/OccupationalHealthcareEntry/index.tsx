import { Card } from "@mui/material";
import type { OccupationalHealthcareEntry } from "../../types";
import { MedicalServicesRounded } from "@mui/icons-material";

interface OccupationalHealthcareEntryProps {
  occupationalHealthcareEntry: OccupationalHealthcareEntry;
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
    </Card>
  );
};

export default OccupationalHealthcareEntry;

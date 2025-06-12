import { Card } from "@mui/material";
import type { HospitalEntry } from "../../types";
import { MedicalServicesRounded } from "@mui/icons-material";

interface HospitalEntryProps {
  hospitalEntry: HospitalEntry;
}

const HospitalEntry = (props: HospitalEntryProps) => {
  console.log("hello", props.hospitalEntry);
  return (
    <Card sx={{ marginBlock: "10px" }}>
      <div>
        {props.hospitalEntry.date}
        <MedicalServicesRounded></MedicalServicesRounded>
      </div>
    </Card>
  );
};

export default HospitalEntry;

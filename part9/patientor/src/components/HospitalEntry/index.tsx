import { Card } from "@mui/material";
import type { Diagnosis, HospitalEntry } from "../../types";
import { MedicalServicesRounded } from "@mui/icons-material";

interface HospitalEntryProps {
  hospitalEntry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntry = (props: HospitalEntryProps) => {
  console.log("hello", props.hospitalEntry);
  return (
    <Card sx={{ marginBlock: "10px" }}>
      <div>
        {props.hospitalEntry.date}
        <MedicalServicesRounded></MedicalServicesRounded>
      </div>
      {props.hospitalEntry.description}
      {props.hospitalEntry.diagnosisCodes?.map((code) => (
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
      diagnose by {props.hospitalEntry.specialist}
    </Card>
  );
};

export default HospitalEntry;

import { Card } from "@mui/material";
import type { Diagnosis, HealthCheckEntry } from "../../types";
import { MedicalServicesRounded } from "@mui/icons-material";

interface HealthCheckEntryProps {
  healthCheckEntry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntry = (props: HealthCheckEntryProps) => {
  console.log("hello", props.healthCheckEntry);
  return (
    <Card sx={{ marginBlock: "10px" }}>
      <div>
        {props.healthCheckEntry.date} <MedicalServicesRounded />
      </div>
      {props.healthCheckEntry.diagnosisCodes?.map((code) => (
        <li>
          {code}{" "}
          {props.diagnoses.map((a) =>
            a.code == code ? <span>{a.name}</span> : null
          )}
        </li>
      ))}
    </Card>
  );
};

export default HealthCheckEntry;

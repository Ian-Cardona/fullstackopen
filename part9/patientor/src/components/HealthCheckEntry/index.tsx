import { Card } from "@mui/material";
import type { Diagnosis, HealthCheckEntry } from "../../types";
import { Favorite, MedicalServicesRounded } from "@mui/icons-material";
import { green, orange, red, yellow } from "@mui/material/colors";

interface HealthCheckEntryProps {
  healthCheckEntry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const HealthCheckEntry = (props: HealthCheckEntryProps) => {
  console.log("This is the diagnoses", props.healthCheckEntry);
  let healthCheckRating;

  switch (props.healthCheckEntry.healthCheckRating) {
    case 0:
      healthCheckRating = <Favorite sx={{ color: green[500] }} />;
      break;
    case 1:
      healthCheckRating = <Favorite sx={{ color: yellow[500] }} />;
      break;
    case 2:
      healthCheckRating = <Favorite sx={{ color: orange[500] }} />;
      break;
    case 3:
      healthCheckRating = <Favorite sx={{ color: red[500] }} />;
      break;
    default:
      break;
  }

  return (
    <Card sx={{ marginBlock: "10px" }}>
      <div>
        {props.healthCheckEntry.date} <MedicalServicesRounded />
      </div>
      {props.healthCheckEntry.description}
      <div>{healthCheckRating}</div>
      {props.healthCheckEntry.diagnosisCodes?.map((code) => (
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
      diagnose by {props.healthCheckEntry.specialist}
    </Card>
  );
};

export default HealthCheckEntry;

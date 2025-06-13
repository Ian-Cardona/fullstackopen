import { Diagnosis, Entry } from "../../types";
import HealthCheckEntry from "../HealthCheckEntry";
import HospitalEntry from "../HospitalEntry";
import OccupationalHealthcareEntry from "../OccupationalHealthcareEntry";

const EntryDetails: React.FC<{ entry: Entry; diagnoses: Array<Diagnosis> }> = ({
  entry,
  diagnoses,
}) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry hospitalEntry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntry
          occupationalHealthcareEntry={entry}
          diagnoses={diagnoses}
        />
      );
    case "HealthCheck":
      return (
        <HealthCheckEntry healthCheckEntry={entry} diagnoses={diagnoses} />
      );
    default:
      break;
  }
};

export default EntryDetails;

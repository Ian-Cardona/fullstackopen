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
      return <HospitalEntry hospitalEntry={entry} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntry occupationalHealthcareEntry={entry} />
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

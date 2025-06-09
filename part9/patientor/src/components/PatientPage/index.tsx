import { useParams } from "react-router-dom";
import { Gender, Patient } from "../../types";
import Icon from "@mui/material/Icon";
import { Box } from "@mui/material";

interface PatientPageProps {
  patients: Patient[];
}

const PatientPage = ({ patients }: PatientPageProps) => {
  const { id } = useParams();
  const patient = patients.find((patient) => patient.id == id);

  if (!patient) return <h3>No record found</h3>;

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <h3>{patient.name}</h3>
        {patient.gender === Gender.Male ? (
          <Icon>male</Icon>
        ) : patient.gender === Gender.Female ? (
          <Icon>female</Icon>
        ) : (
          <Icon>transgender</Icon>
        )}
      </Box>

      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </>
  );
};

export default PatientPage;

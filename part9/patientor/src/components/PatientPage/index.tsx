import { useParams } from "react-router-dom";
import { Diagnosis, EntryWithoutId, Gender, Patient } from "../../types";
import Icon from "@mui/material/Icon";
import { Box } from "@mui/material";
import EntryDetails from "../EntryDetails";
import { useEffect, useState } from "react";
import diagnosisService from "../../services/diagnosis";
import AddNewEntry from "../AddNewEntry";
import patientService from "../../services/patients";
import axios from "axios";
interface PatientPageProps {
  patients: Patient[];
}

const PatientPage = ({ patients }: PatientPageProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  // const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // const openModal = (): void => setModalOpen(true);

  // const closeModal = (): void => {
  //   setModalOpen(false);
  //   setError(undefined);
  // };

  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };

    void fetchDiagnosisList();
  }, []);

  const { id } = useParams();
  const patient = patients.find((patient) => patient.id == id);

  if (!patient) return <h3>No record found</h3>;

  const submitNewEntry = async (values: EntryWithoutId) => {
    console.log("entryyy", values);
    if (!id) {
      setError("Patient ID is missing");
      return;
    }
    try {
      await patientService.addNewEntry(id, values);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
      <strong>entries</strong>
      {patient.entries.map((value) => (
        <EntryDetails key={value.id} entry={value} diagnoses={diagnoses} />
      ))}
      <AddNewEntry onSubmit={submitNewEntry} error={error} />
    </>
  );
};

export default PatientPage;

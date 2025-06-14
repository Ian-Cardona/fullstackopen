import { useState, SyntheticEvent } from "react";

import {
  TextField,
  InputLabel,
  Grid,
  Button,
  Container,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";

import { Entry, EntryType, EntryWithoutId } from "../../types";

interface Props {
  // onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error: string;
}

const AddNewEntry = ({ onSubmit, error }: Props) => {
  const [date, setDate] = useState(" ");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState([]);
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const [dischargeDate, setDischargeDate] = useState(" ");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState(" ");
  const [sickLeaveEnd, setSickLeaveEnd] = useState(" ");

  const entryOptions: EntryType[] = [
    "Hospital",
    "HealthCheck",
    "OccupationalHealthcare",
  ];

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    let newEntry: EntryWithoutId;

    switch (entryType) {
      case "HealthCheck":
        newEntry = {
          date,
          description,
          specialist,
          diagnosisCodes,
          type: "HealthCheck",
          healthCheckRating,
        };
        break;
      case "Hospital":
        newEntry = {
          date,
          description,
          specialist,
          diagnosisCodes,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        };
        break;
      case "OccupationalHealthcare":
        newEntry = {
          date,
          description,
          specialist,
          diagnosisCodes,
          type: "OccupationalHealthcare",
          employerName,
          sickLeave: {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd,
          },
        };
        break;
      default:
        throw new Error("Invalid entry type");
    }

    onSubmit(newEntry);
  };

  const onCancel = () => {
    setDate("");
    setDescription("");
    setSpecialist("");
    setHealthCheckRating(0);
  };

  return (
    <Container>
      <form onSubmit={addEntry}>
        <Select
          fullWidth
          margin="dense"
          value={entryType}
          onChange={(event) => setEntryType(event.target.value as EntryType)}
        >
          {entryOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Description"
          fullWidth
          margin="dense"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          fullWidth
          margin="dense"
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          margin="dense"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        {entryType === "HealthCheck" && (
          <TextField
            label="Healthcheck Rating"
            fullWidth
            margin="dense"
            type="number"
            value={healthCheckRating}
            inputProps={{ min: 0, max: 3 }}
            onChange={({ target }) =>
              setHealthCheckRating(Number(target.value))
            }
          />
        )}

        {entryType === "Hospital" && (
          <>
            <TextField
              label="Discharge Date"
              fullWidth
              margin="dense"
              type="date"
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              margin="dense"
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        )}

        {entryType === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer Name"
              fullWidth
              margin="dense"
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="Sick Leave Start"
              fullWidth
              margin="dense"
              type="date"
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <TextField
              label="Sick Leave End"
              fullWidth
              margin="dense"
              type="date"
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </>
        )}

        <Grid>
          <Grid item>
            <Button
              color="error"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddNewEntry;

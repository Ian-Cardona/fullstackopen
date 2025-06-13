import { useState, SyntheticEvent } from "react";

import { TextField, InputLabel, Grid, Button, Container } from "@mui/material";

import { EntryWithoutId } from "../../types";

interface Props {
  // onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error: string;
}

const AddNewEntry = ({ onSubmit, error }: Props) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [diagnosisCodes, setDiagnosisCodes] = useState([]);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      description,
      specialist,
      healthCheckRating,
      diagnosisCodes,
      type: "HealthCheck",
    });
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
        <TextField
          label="Description"
          fullWidth
          margin="dense"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          margin="dense"
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
        <TextField
          label="Healthcheck Rating"
          fullWidth
          margin="dense"
          type="number"
          value={healthCheckRating}
          inputProps={{ min: 0, max: 3 }}
          onChange={({ target }) => setHealthCheckRating(Number(target.value))}
        />
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

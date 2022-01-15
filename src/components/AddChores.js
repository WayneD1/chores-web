import React, { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import axios from "axios";
import config from "../config/appSettings";

const AddChores = ({ onSave }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
    axios.post(config.CHORES_SERVICE_HOST, chore).then((res) => {
      onSave();
    });
  };

  const [chore, setChore] = useState({});

  const handleChoreNameChange = (e) => {
    setChore({ ...chore, choreName: e.target.value });
  };

  const isFormIncomplete = () => {
    return (
      !chore.choreName ||
      !chore.choreDescription ||
      chore.difficulty == null ||
      chore.difficulty == undefined ||
      !chore.doneBy
    );
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Chore
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add Chore</DialogTitle>
        <DialogContent>
          <DialogContentText>Please be honest!</DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <FormControl>
              <Select
                autoFocus
                onChange={handleChoreNameChange}
                label="maxWidth"
                inputProps={{
                  name: "max-width",
                  id: "max-width",
                }}
                value={chore.choreName}
              >
                <MenuItem value="Hugas Plato">Hugas Plato</MenuItem>
                <MenuItem value="Luto">Luto</MenuItem>
                <MenuItem value="Palengke">Palengke</MenuItem>
                <MenuItem value="Pet Care">Pet Care</MenuItem>
                <MenuItem value="Mop">Mop</MenuItem>
                <MenuItem value="Laba">Laba</MenuItem>
                <MenuItem value="Brew Coffee">Brew Coffee</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
              <FormHelperText>{"Select Chore"}</FormHelperText>
              <OutlinedInput
                label="description"
                inputProps={{
                  name: "description",
                  id: "description",
                }}
                onChange={(e) => {
                  setChore({ ...chore, choreDescription: e.target.value });
                }}
              ></OutlinedInput>
              <FormHelperText>{"Put description"}</FormHelperText>

              <Select
                autoFocus
                onChange={(e) => {
                  setChore({ ...chore, doneBy: e.target.value });
                }}
                inputProps={{
                  name: "description",
                  id: "description",
                }}
                label="maxWidth"
                inputProps={{
                  name: "max-width",
                  id: "max-width",
                }}
                value={chore.doneBy}
              >
                <MenuItem value="Mavs">Mavs</MenuItem>
                <MenuItem value="Wayne">Wayne</MenuItem>
              </Select>
              <FormHelperText>{"Name of chore doer"}</FormHelperText>

              <OutlinedInput
                onChange={(e) => {
                  setChore({ ...chore, difficulty: e.target.value });
                }}
              ></OutlinedInput>
              <FormHelperText>
                {"With 1 being the easiest and 10 the hardest"}
              </FormHelperText>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={isFormIncomplete()}
          >
            Save
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AddChores;

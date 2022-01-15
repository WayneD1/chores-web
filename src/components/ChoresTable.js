import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import AddChores from "../components/AddChores";

import axios from "axios";
import config from "../config/appSettings";

const ChoresTable = () => {
  const [chores, setChores] = useState([]);

  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    axios
      .get(config.CHORES_SERVICE_HOST)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setChores(data);
      });
  }, []);

  const deleteChore = (id) => {
    axios.delete(`${config.CHORES_SERVICE_HOST}/${id}`).then(() => {
      axios
        .get(config.CHORES_SERVICE_HOST)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setChores(data);
        });
    });
  };

  const refreshChores = () => {
    axios
      .get(config.CHORES_SERVICE_HOST)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setChores(data);
      });
  };

  const handleFilterChange = (event, newFilter) => {
    setFilter(newFilter);
    axios
      .get(config.CHORES_SERVICE_HOST)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        if (newFilter === "ALL") {
          setChores(data);
        } else {
          setChores(data.filter((chore) => chore.doneBy === newFilter));
        }
      });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            <AddChores onSave={refreshChores}></AddChores>
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={filter}
            exclusive
            onChange={handleFilterChange}
          >
            <ToggleButton value="ALL">All</ToggleButton>
            <ToggleButton value="Mavs">Mavs</ToggleButton>
            <ToggleButton value="Wayne">Wayne</ToggleButton>
          </ToggleButtonGroup>
        </Toolbar>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Done By</TableCell>
              <TableCell align="center">Difficulty</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chores.map((chore) => (
              <TableRow
                key={chore.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {chore.choreName}
                </TableCell>
                <TableCell align="center">{chore.choreDescription}</TableCell>
                <TableCell align="center">{chore.doneBy}</TableCell>
                <TableCell align="center">{chore.difficulty}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      deleteChore(chore.id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ChoresTable;

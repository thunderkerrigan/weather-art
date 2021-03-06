import React, { ReactElement, useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import lolo from "../images/lolo.jpg";
import { useNavigate } from "react-router";

export const Config = (): ReactElement => {
  const [ville, setVille] = useState<string>();
  const [country, setCountry] = useState<string>("");
  const navigate = useNavigate();
  return (
    <Container>
      <Paper>
        <Grid
          container
          justifyContent="center"
          alignContent="center"
          spacing={2}
          direction="column"
        >
          <Grid item container justifyContent="center" spacing={2}>
            <Grid item>
              <Avatar
                style={{ width: "100px", height: "100px" }}
                src={lolo}
                alt="lolo"
              />
            </Grid>
            <Grid item>
              <Typography variant="h1">FAUSSAIRE DE LOLO</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            container
            direction="column"
            alignContent="center"
            justifyContent="center"
            spacing={2}
          >
            <Grid item>
              <TextField
                label="VILLE?"
                onChange={(e) => setVille(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="PAYS?"
                onChange={(e) => setCountry(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                disabled={ville === undefined}
                onClick={() => navigate(`/tableau/${ville}/${country}`)}
              >
                MAKE IT!
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

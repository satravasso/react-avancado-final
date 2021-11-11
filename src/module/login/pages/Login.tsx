import React from "react";
import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link, useHistory } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import { Alert as AlertMa, AlertColor } from "@mui/material";

import { AuthContextProv } from "../../../context/authContext";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function AlertMa(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const [fields, setFields] = useState({ email: "", password: "" });
  const history = useHistory();
  const context = useContext(AuthContextProv);
  const { isAuthenticated } = context;

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("");

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [history, isAuthenticated]);

  function handleChange(event: any) {
    const fieldName = event.target.name;
    const value = event.target.value;
    setFields({ ...fields, [fieldName]: value });
  }

  function handleMessage(message: string, severity: string) {
    setOpen(true);
    setMessage(message);
    setSeverity(severity);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    try {
      await context.login(fields.email, fields.password);
      history.push("/");
    } catch (error: any) {
      handleMessage(error.message, "error");
    }
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
      }}
    >
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Typography variant="h5">Login</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          value={fields.email}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          label="Senha"
          variant="outlined"
          type="password"
          fullWidth
          name="password"
          value={fields.password}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          fullWidth
          size="large"
          type="submit"
          color="secondary"
          style={{ marginBottom: 20 }}
        >
          Entrar
        </Button>
        <Typography variant="body1" paragraph>
          Não possui conta? Se registre <Link to="/register">aqui</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;

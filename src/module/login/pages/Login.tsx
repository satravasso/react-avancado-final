import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";

import { AuthContextProv } from "../../../context/authContext";

function Login() {
  const [fields, setFields] = useState({ username: "", password: "" });
  const history = useHistory();
  const context = useContext(AuthContextProv);
  const { isAuthenticated } = context;

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

  async function handleSubmit(event: any) {
    event.preventDefault();
    try {
      await context.login(fields.username, fields.password);
      history.push("/");
    } catch (error) {
      alert("erro" + error);
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
      <Typography variant="h5">Login</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          label="Usuário"
          variant="outlined"
          fullWidth
          name="login"
          value={fields.username}
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
        >
          Entrar
        </Button>
      </Box>
    </Container>
  );
}

export default Login;

import Button from "@material-ui/core/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import { useFormik } from "formik";
import { validationDados } from "../scripts/validate";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export const CreateUser = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
    },
    validationSchema: validationDados,
    onSubmit: (values, { setStatus, resetForm }) => {
      axios
        .post(`${process.env.REACT_APP_AUTH_API}auth/register`, values)
        .then(() => {
          setStatus({ success: true });
          resetForm({});
          history.push("/login");
        })
        .catch((err) => {
          setStatus({ success: false });
          console.error(err);
        });
    },
  });

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
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h4" textAlign="center">
          Usuário
        </Typography>
        <Box>
          <TextField
            margin="normal"
            label="E-mail"
            variant="outlined"
            name="email"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.errors.email}
          />

          <TextField
            label="Senha"
            variant="outlined"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.errors.password}
          />

          <TextField
            label="Confirme a senha"
            variant="outlined"
            name="confirm"
            type="password"
            fullWidth
            margin="normal"
            onChange={formik.handleChange}
            value={formik.values.confirm}
            error={formik.touched.confirm && Boolean(formik.errors.confirm)}
            helperText={formik.errors.confirm}
          />

          <Button
            variant="contained"
            fullWidth
            size="large"
            type="submit"
            color="secondary"
          >
            Salvar
          </Button>
          <Typography variant="body1">
            Já possui conta? Faça seu login <Link to="/login">aqui</Link>
          </Typography>
        </Box>
      </form>
    </Container>
  );
};

import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import { validationDados } from "../scripts/validate";

export const CreateUser = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationDados,
    onSubmit: (values, { setStatus, resetForm }) => {
      setStatus({ success: true });
      resetForm({});
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ padding: 50 }}>
      <Typography variant="h4">Usuário</Typography>
      <Grid item sm={6}>
        <TextField
          label="Usuário"
          variant="outlined"
          name="username"
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.errors.username}
        />
      </Grid>
      <Grid item sm={6}>
        <TextField
          label="E-mail"
          variant="outlined"
          name="email"
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.errors.email}
        />
      </Grid>
      <Grid item sm={6}>
        <TextField
          label="Senha"
          variant="outlined"
          name="password"
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.errors.password}
        />
      </Grid>
      <Grid item sm={12}>
        <Button type="submit" variant="contained" fullWidth size="large">
          Salvar
        </Button>
      </Grid>
    </form>
  );
};

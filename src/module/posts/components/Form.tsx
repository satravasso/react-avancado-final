import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import { validationDados } from "./validate";

export const Form = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
    },
    validationSchema: validationDados,
    onSubmit: (values, { setStatus, resetForm }) => {
      setStatus({ success: true });
      resetForm({});
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ padding: 50 }}>
      <Typography variant="h4">Post</Typography>
      <Grid item sm={6}>
        <TextField
          label="Título"
          variant="outlined"
          name="title"
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.errors.title}
        />
      </Grid>
      <Grid item sm={6}>
        <TextField
          label="Texto"
          variant="outlined"
          name="text"
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.text}
          error={formik.touched.text && Boolean(formik.errors.text)}
          helperText={formik.errors.text}
        />
      </Grid>

      <Grid item sm={6}>
        <Button type="submit" variant="contained" fullWidth size="large">
          Salvar
        </Button>
      </Grid>
    </form>
  );
};

import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { useFormik } from "formik";
import { validationDados } from "./validate";

import { createPost } from "../services/api";
import { useHistory } from "react-router";

export const Form = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    validationSchema: validationDados,
    onSubmit: (values, { setStatus, resetForm }) => {
      createPost(values)
        .then(() => {
          setStatus({ success: true });
          history.push("/");
        })
        .catch((err) => {
          setStatus({ success: false });
          console.error(err);
        });
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
          name="content"
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.content}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.errors.content}
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

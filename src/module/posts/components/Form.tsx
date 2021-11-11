import {
  Grid,
  Typography,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";
import { useFormik } from "formik";
import { validationDados } from "./validate";

import { createPost } from "../services/api";
import { useHistory } from "react-router";
import React from "react";
import { Alert } from "@mui/material";

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
          handleMessage(err.message, "error");
        });
    },
  });

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function handleMessage(message: string, severity: string) {
    setOpen(true);
    setMessage(message);
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ padding: 50, alignItems: "center" }}
    >
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <Typography variant="h4" style={{ marginBottom: 20 }}>
        Post
      </Typography>
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
          style={{ marginBottom: 20 }}
        />
      </Grid>
      <Grid item sm={6}>
        <TextField
          label="Texto"
          variant="outlined"
          name="content"
          fullWidth
          multiline
          rows={6}
          onChange={formik.handleChange}
          value={formik.values.content}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.errors.content}
          style={{ marginBottom: 20 }}
        />
      </Grid>

      <Grid item sm={6}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          color="secondary"
        >
          Salvar
        </Button>
      </Grid>
    </form>
  );
};

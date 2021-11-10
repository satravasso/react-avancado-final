import * as yup from "yup";

export const validationDados = yup.object({
  title: yup.string().required("Campo Obrigatório"),
  text: yup.string().required("Campo Obrigatório"),
});

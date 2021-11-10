import * as yup from "yup";

export const validationDados = yup.object({
  username: yup
    .string()
    .max(50, "Nome deve conter no máximo 50 caracteres")
    .required("Campo Obrigatório"),
  password: yup.string().required("Campo Obrigatório"),
  email: yup.string().required("Campo Obrigatório"),
});

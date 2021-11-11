import * as yup from "yup";

export const validationDados = yup.object({
  password: yup
    .string()
    .required("Campo Obrigatório")
    .test("len", "Necessário pelo menos 6 caracteres", (val) =>
      Boolean(val && val.length > 5)
    ),
  confirm: yup
    .string()
    .required("Campo Obrigatório")
    .test("len", "Necessário pelo menos 6 caracteres", (val) =>
      Boolean(val && val.length > 5)
    )
    .oneOf([yup.ref("password"), null], "As senhas precisam ser iguais."),
  email: yup.string().required("Campo Obrigatório"),
});

export const validationLogin = yup.object({
  username: yup
    .string()
    .max(50, "Nome deve conter no máximo 50 caracteres")
    .required("Campo Obrigatório"),
  password: yup
    .string()
    .required("Campo Obrigatório")
    .test("len", "Necessário pelo menos 6 caracteres", (val) =>
      Boolean(val && val.length > 5)
    ),
});

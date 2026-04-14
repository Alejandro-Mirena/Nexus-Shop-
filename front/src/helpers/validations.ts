import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("El email no tiene un formato válido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
});

export const registerSchema = Yup.object({
  name: Yup.string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .required("El nombre es obligatorio"),
  email: Yup.string()
    .email("El email no tiene un formato válido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirmá tu contraseña"),
  address: Yup.string()
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .required("La dirección es obligatoria"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "El teléfono solo puede contener números")
    .min(8, "El teléfono debe tener al menos 8 dígitos")
    .required("El teléfono es obligatorio"),
});

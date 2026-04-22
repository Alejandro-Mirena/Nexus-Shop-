"use client";

import { useFormik } from "formik";
import { registerSchema } from "@/helpers/validations";
import { fetchRegister } from "@/helpers/fetchRegister";
import toast from "react-hot-toast";

interface Props {
  onError: (msg: string) => void;
  onSuccess: (msg: string) => void;
  onSwitchToLogin: () => void;
}

const RegisterForm = ({ onError, onSuccess, onSwitchToLogin }: Props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      phone: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      onError("");

      try {
        const data = await fetchRegister({
          name: values.name,
          email: values.email,
          password: values.password,
          address: values.address,
          phone: values.phone,
        });

        if (data.id) {
          toast.success("Cuenta creada correctamente 🎉");

          onSuccess("Cuenta creada exitosamente. Iniciá sesión.");
          onSwitchToLogin();
          resetForm();
        } else {
          toast.error(data.message || "Error al registrarse ❌");
          onError(data.message || "Error al registrarse");
        }
      } catch (error) {
        toast.error("Error del servidor 🚨");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-lg border text-sm text-[#1D1D1F] outline-none transition-colors ${
      formik.touched[field as keyof typeof formik.touched] &&
      formik.errors[field as keyof typeof formik.errors]
        ? "border-red-400 bg-red-50"
        : "border-[#E8E8ED] focus:border-[#0071E3]"
    }`;

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
      <div className="text-[#1D1D1F] text-center py-3 text-lg font-semibold tracking-tight">
        ¡Crea Tu Cuenta en Nexus Shop!
      </div>

      {[
        {
          name: "name",
          label: "Nombre completo",
          type: "text",
          placeholder: "Juan Pérez",
        },
        {
          name: "email",
          label: "Email",
          type: "text",
          placeholder: "tu@email.com",
        },
        {
          name: "password",
          label: "Contraseña",
          type: "password",
          placeholder: "••••••••",
        },
        {
          name: "confirmPassword",
          label: "Confirmar contraseña",
          type: "password",
          placeholder: "••••••••",
        },
        {
          name: "address",
          label: "Dirección",
          type: "text",
          placeholder: "Av. Siempreviva 742",
        },
        {
          name: "phone",
          label: "Teléfono",
          type: "text",
          placeholder: "1234567890",
        },
      ].map(({ name, label, type, placeholder }) => (
        <div key={name}>
          <label className="text-[#1D1D1F] text-sm font-medium mb-1.5 block">
            {label}
          </label>
          <input
            type={type}
            name={name}
            value={formik.values[name as keyof typeof formik.values]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={placeholder}
            className={inputClass(name)}
          />
          {formik.touched[name as keyof typeof formik.touched] &&
            formik.errors[name as keyof typeof formik.errors] && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors[name as keyof typeof formik.errors]}
              </p>
            )}
        </div>
      ))}

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full bg-[#0071E3] hover:bg-[#0077ED] cursor-pointer disabled:opacity-60 transition-colors text-white py-3 rounded-lg text-sm font-medium mt-2"
      >
        {formik.isSubmitting ? "Registrando..." : "Crear cuenta"}
      </button>
    </form>
  );
};

export default RegisterForm;

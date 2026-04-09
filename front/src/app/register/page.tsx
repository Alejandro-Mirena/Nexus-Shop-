"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchRegister } from "@/helpers/fetchRegister";
import { useState } from "react";

const registerSchema = Yup.object({
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

const RegisterPage = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

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
    onSubmit: async (values) => {
      setServerError("");

      const data = await fetchRegister({
        name: values.name,
        email: values.email,
        password: values.password,
        address: values.address,
        phone: values.phone,
      });

      if (data.id) {
        router.push("/login");
      } else {
        setServerError(data.message || "Error al registrarse");
      }
    },
  });

  // Helper para no repetir clases de input
  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-lg border text-sm text-[#1D1D1F] outline-none transition-colors ${
      formik.touched[field as keyof typeof formik.touched] &&
      formik.errors[field as keyof typeof formik.errors]
        ? "border-red-400 bg-red-50"
        : "border-[#E8E8ED] focus:border-[#0071E3]"
    }`;

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl border border-[#E8E8ED] p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-[#1D1D1F] text-2xl font-semibold tracking-tight mb-2">
            Crear cuenta
          </h1>
          <p className="text-[#6E6E73] text-sm">Registrate en Nexus Shop</p>
        </div>

        {/* Error del servidor */}
        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
            {serverError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          {/* Nombre */}
          <div>
            <label className="text-[#1D1D1F] text-sm font-medium mb-1.5 block">
              Nombre completo
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Tu Nombre"
              className={inputClass("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-[#1D1D1F] text-sm font-medium mb-1.5 block">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="tu@email.com"
              className={inputClass("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-[#1D1D1F] text-sm font-medium mb-1.5 block">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="••••••••"
              className={inputClass("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Confirmar password */}
          <div>
            <label className="text-[#1D1D1F] text-sm font-medium mb-1.5 block">
              Confirmar contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="••••••••"
              className={inputClass("confirmPassword")}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Dirección */}
          <div>
            <label className="text-[#1D1D1F] text-sm font-medium mb-1.5 block">
              Dirección
            </label>
            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Av...."
              className={inputClass("address")}
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.address}
              </p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label className="text-[#1D1D1F] text-sm font-medium mb-1.5 block">
              Teléfono
            </label>
            <input
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="+51 ...."
              className={inputClass("phone")}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
            )}
          </div>

          {/* Botón submit */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-[#0071E3] hover:bg-[#0077ED] disabled:opacity-60 transition-colors text-white py-3 rounded-lg text-sm font-medium mt-2"
          >
            {formik.isSubmitting ? "Registrando..." : "Crear cuenta"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-[#6E6E73] text-sm mt-6">
          ¿Ya tenés cuenta?{" "}
          <Link
            href="/login"
            className="text-[#0071E3] hover:underline font-medium"
          >
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

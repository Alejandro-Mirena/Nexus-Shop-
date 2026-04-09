"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchLogin } from "@/helpers/fetchLogin";
import { useState } from "react";

// 1. Esquema de validación con Yup
const loginSchema = Yup.object({
  email: Yup.string()
    .email("El email no tiene un formato válido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
});

const LoginPage = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState("");

  // 2. Configuración de Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setServerError("");
      const data = await fetchLogin(values.email, values.password);

      if (data.login) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/");
      } else {
        setServerError("Email o contraseña incorrectos");
      }
    },
  });

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl border border-[#E8E8ED] p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-[#1D1D1F] text-2xl font-semibold tracking-tight mb-2">
            Iniciar sesión
          </h1>
          <p className="text-[#6E6E73] text-sm">
            Ingresá a tu cuenta de Nexus Shop
          </p>
        </div>

        {/* Error del servidor */}
        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
            {serverError}
          </div>
        )}

        {/* 3. Formulario */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
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
              className={`w-full px-4 py-3 rounded-lg border text-sm text-[#1D1D1F] outline-none transition-colors
                ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-400 bg-red-50"
                    : "border-[#E8E8ED] focus:border-[#0071E3]"
                }`}
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
              className={`w-full px-4 py-3 rounded-lg border text-sm text-[#1D1D1F] outline-none transition-colors
                ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-400 bg-red-50"
                    : "border-[#E8E8ED] focus:border-[#0071E3]"
                }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Botón submit */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-[#0071E3] hover:bg-[#0077ED] disabled:opacity-60 transition-colors text-white py-3 rounded-lg text-sm font-medium mt-2 cursor-pointer"
          >
            {formik.isSubmitting ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-[#6E6E73] text-sm mt-6">
          ¿No tenés cuenta?{" "}
          <Link
            href="/register"
            className="text-[#0071E3] hover:underline font-medium"
          >
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

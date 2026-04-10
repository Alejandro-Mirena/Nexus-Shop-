"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { fetchLogin } from "@/helpers/fetchLogin";
import { fetchRegister } from "@/helpers/fetchRegister";
import { useState } from "react";

const loginSchema = Yup.object({
  email: Yup.string()
    .email("El email no tiene un formato válido")
    .required("El email es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
});

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

const AuthPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setServerError("");
      const data = await fetchLogin(values.email, values.password);
      if (data.login) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("authChange")); // ← esta línea nueva
        router.push("/");
      } else {
        setServerError("Email o contraseña incorrectos");
      }
    },
  });

  const registerFormik = useFormik({
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
        setSuccessMessage("Cuenta creada exitosamente. Iniciá sesión.");
        setIsLogin(true);
        registerFormik.resetForm();
      } else {
        setServerError(data.message || "Error al registrarse");
      }
    },
  });

  const inputClass = (formik: any, field: string) =>
    `w-full px-4 py-3 rounded-lg border text-sm text-[#1D1D1F] outline-none transition-colors ${
      formik.touched[field] && formik.errors[field]
        ? "border-red-400 bg-red-50"
        : "border-[#E8E8ED] focus:border-[#0071E3]"
    }`;

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl border border-[#E8E8ED] p-8 w-full max-w-md">
        {/* Tabs */}
        <div className="flex border border-[#E8E8ED] rounded-xl p-1 mb-8">
          <button
            onClick={() => {
              setIsLogin(true);
              setServerError("");
              setSuccessMessage("");
            }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              isLogin
                ? "bg-[#0071E3] text-white"
                : "text-[#6E6E73] hover:text-[#1D1D1F]"
            }`}
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setServerError("");
              setSuccessMessage("");
            }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              !isLogin
                ? "bg-[#0071E3] text-white"
                : "text-[#6E6E73] hover:text-[#1D1D1F]"
            }`}
          >
            Crear cuenta
          </button>
        </div>

        {/* Mensajes */}
        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
            {serverError}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3 rounded-lg mb-6">
            {successMessage}
          </div>
        )}

        {/* Formulario Login */}
        {isLogin ? (
          <form
            onSubmit={loginFormik.handleSubmit}
            className="flex flex-col gap-5"
          >
            <div>
              <label className="text-[#1D1D1F] text-sm font-medium mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={loginFormik.values.email}
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                placeholder="tu@email.com"
                className={inputClass(loginFormik, "email")}
              />
              {loginFormik.touched.email && loginFormik.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {loginFormik.errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="text-[#1D1D1F] text-sm font-medium mb-1.5 block">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={loginFormik.values.password}
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                placeholder="••••••••"
                className={inputClass(loginFormik, "password")}
              />
              {loginFormik.touched.password && loginFormik.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {loginFormik.errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loginFormik.isSubmitting}
              className="w-full bg-[#0071E3] hover:bg-[#0077ED] disabled:opacity-60 transition-colors text-white py-3 rounded-lg text-sm font-medium mt-2"
            >
              {loginFormik.isSubmitting ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        ) : (
          /* Formulario Register */
          <form
            onSubmit={registerFormik.handleSubmit}
            className="flex flex-col gap-5"
          >
            <div>
              <label className="text-[#1D1D1F] text-sm font-medium mb-1.5 block">
                Nombre completo
              </label>
              <input
                type="text"
                name="name"
                value={registerFormik.values.name}
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                placeholder="Juan Pérez"
                className={inputClass(registerFormik, "name")}
              />
              {registerFormik.touched.name && registerFormik.errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {registerFormik.errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="text-[#1D1D1F] text-sm font-medium mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={registerFormik.values.email}
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                placeholder="tu@email.com"
                className={inputClass(registerFormik, "email")}
              />
              {registerFormik.touched.email && registerFormik.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {registerFormik.errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="text-[#1D1D1F] text-sm font-medium mb-1.5 block">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={registerFormik.values.password}
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                placeholder="••••••••"
                className={inputClass(registerFormik, "password")}
              />
              {registerFormik.touched.password &&
                registerFormik.errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {registerFormik.errors.password}
                  </p>
                )}
            </div>

            <div>
              <label className="text-[#1D1D1F] text-sm font-medium mb-1.5 block">
                Confirmar contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={registerFormik.values.confirmPassword}
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                placeholder="••••••••"
                className={inputClass(registerFormik, "confirmPassword")}
              />
              {registerFormik.touched.confirmPassword &&
                registerFormik.errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {registerFormik.errors.confirmPassword}
                  </p>
                )}
            </div>

            <div>
              <label className="text-[#1D1D1F] text-sm font-medium mb-1.5 block">
                Dirección
              </label>
              <input
                type="text"
                name="address"
                value={registerFormik.values.address}
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                placeholder="Av. Siempreviva 742"
                className={inputClass(registerFormik, "address")}
              />
              {registerFormik.touched.address &&
                registerFormik.errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {registerFormik.errors.address}
                  </p>
                )}
            </div>

            <div>
              <label className="text-[#1D1D1F] text-sm font-medium mb-1.5 block">
                Teléfono
              </label>
              <input
                type="text"
                name="phone"
                value={registerFormik.values.phone}
                onChange={registerFormik.handleChange}
                onBlur={registerFormik.handleBlur}
                placeholder="1234567890"
                className={inputClass(registerFormik, "phone")}
              />
              {registerFormik.touched.phone && registerFormik.errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {registerFormik.errors.phone}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={registerFormik.isSubmitting}
              className="w-full bg-[#0071E3] hover:bg-[#0077ED] disabled:opacity-60 transition-colors text-white py-3 rounded-lg text-sm font-medium mt-2"
            >
              {registerFormik.isSubmitting ? "Registrando..." : "Crear cuenta"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;

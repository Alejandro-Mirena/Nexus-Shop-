"use client";
import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${isLogin ? "bg-[#0071E3] text-white" : "text-[#6E6E73] hover:text-[#1D1D1F]"}`}
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setServerError("");
              setSuccessMessage("");
            }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${!isLogin ? "bg-[#0071E3] text-white" : "text-[#6E6E73] hover:text-[#1D1D1F]"}`}
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

        {/* Formularios */}
        {isLogin ? (
          <LoginForm onError={setServerError} />
        ) : (
          <RegisterForm
            onError={setServerError}
            onSuccess={setSuccessMessage}
            onSwitchToLogin={() => setIsLogin(true)}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;

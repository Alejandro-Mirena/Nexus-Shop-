import { useFormik } from "formik";
import { loginSchema } from "@/helpers/validations";
import { fetchLogin } from "@/helpers/fetchLogin";
import { useRouter } from "next/navigation";

interface Props {
  onError: (msg: string) => void;
}

const LoginForm = ({ onError }: Props) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      onError("");
      const data = await fetchLogin(values.email, values.password);
      if (data.login) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("authChange"));
        router.push("/");
      } else {
        onError("Email o contraseña incorrectos");
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
      <div className="text-[#1D1D1F] text-center text-lg font-semibold tracking-tight">
        Bienvenido a Nexus Shop
      </div>

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
          <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full bg-[#0071E3] hover:bg-[#0077ED] disabled:opacity-60 transition-colors text-white py-3 rounded-lg text-sm font-medium mt-2"
      >
        {formik.isSubmitting ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
};

export default LoginForm;

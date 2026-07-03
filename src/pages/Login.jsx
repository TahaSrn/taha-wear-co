// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import supabase from "../services/supabase";
import toast from "react-hot-toast";
import {
  HiOutlineMail,
  HiOutlineKey,
  HiOutlineArrowLeft,
} from "react-icons/hi";
import { HiOutlineUserCircle } from "react-icons/hi2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // گرفتن آدرس بازگشت از query parameter
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("ایمیل یا رمز عبور نادرست است");
        } else {
          toast.error(error.message);
        }
        return;
      }

      toast.success("خوش آمدید!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("ایمیل یا رمز عبور نادرست است");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-caffee-100 via-white to-caffee-100 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/50">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors mb-6 group"
        >
          <HiOutlineArrowLeft
            className="group-hover:-translate-x-1 transition-transform"
            size={20}
          />
          <span className="text-sm font-sansMed">بازگشت</span>
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-caffee-200 rounded-2xl mb-4">
            <HiOutlineUserCircle className="text-4xl text-stone-700" />
          </div>
          <h1 className="text-2xl font-sansBold text-stone-800">خوش آمدید</h1>
          <p className="text-stone-500 font-sansMed text-sm mt-1">
            برای ورود اطلاعات خود را وارد کنید
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-sansMed text-stone-600 mb-1.5">
              ایمیل
            </label>
            <div className="relative">
              <HiOutlineMail
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                size={20}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pr-11 pl-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-caffee-300 focus:border-caffee-300 focus:outline-none font-sansMed bg-stone-50/50 transition-all"
                placeholder="example@email.com"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-sm font-sansMed text-stone-600">
                رمز عبور
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-stone-400 hover:text-stone-600 transition-colors font-sansMed"
              >
                فراموش کردید؟
              </Link>
            </div>
            <div className="relative">
              <HiOutlineKey
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                size={20}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-11 pl-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-caffee-300 focus:border-caffee-300 focus:outline-none font-sansMed bg-stone-50/50 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 cursor-pointer rounded-xl font-sansBold text-white bg-stone-800 hover:bg-stone-700 transition-all duration-300 text-sm ${loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg hover:-translate-y-0.5"}`}
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-stone-500 font-sansMed">
            حساب کاربری ندارید؟{" "}
            <Link
              to="/register"
              className="text-stone-800 cursor-pointer font-sansBold hover:underline transition-colors"
            >
              ثبت‌نام
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

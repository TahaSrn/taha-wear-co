
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import supabase from "../services/supabase";
import toast from "react-hot-toast";
import {
  HiOutlineMail,
  HiOutlineKey,
  HiOutlineArrowLeft } from
"react-icons/hi";
import { HiOutlineUserPlus } from "react-icons/hi2";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("رمز عبور و تکرار آن مطابقت ندارند");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("رمز عبور باید حداقل ۶ کاراکتر باشد");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) throw new Error(error.message);

      toast.success("ثبت‌نام با موفقیت انجام شد! لطفاً وارد شوید");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-caffee-100 via-white to-caffee-100 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/50">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors mb-6 group">
          
          <HiOutlineArrowLeft
            className="group-hover:-translate-x-1 transition-transform"
            size={20} />
          
          <span className="text-sm font-sansMed">بازگشت</span>
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-caffee-200 rounded-2xl mb-4">
            <HiOutlineUserPlus className="text-4xl text-stone-700" />
          </div>
          <h1 className="text-2xl font-sansBold text-stone-800">ثبت‌نام</h1>
          <p className="text-stone-500 font-sansMed text-sm mt-1">
            ایجاد حساب کاربری جدید
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
                size={20} />
              
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pr-11 pl-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-caffee-300 focus:border-caffee-300 focus:outline-none font-sansMed bg-stone-50/50 transition-all"
                placeholder="example@email.com"
                required />
              
            </div>
          </div>

          <div>
            <label className="block text-sm font-sansMed text-stone-600 mb-1.5">
              رمز عبور
            </label>
            <div className="relative">
              <HiOutlineKey
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                size={20} />
              
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-11 pl-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-caffee-300 focus:border-caffee-300 focus:outline-none font-sansMed bg-stone-50/50 transition-all"
                placeholder="••••••••"
                required
                minLength={6} />
              
            </div>
            <p className="text-xs text-stone-400 mt-1 font-sansMed">
              حداقل ۶ کاراکتر
            </p>
          </div>

          <div>
            <label className="block text-sm font-sansMed text-stone-600 mb-1.5">
              تکرار رمز عبور
            </label>
            <div className="relative">
              <HiOutlineKey
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"
                size={20} />
              
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pr-11 pl-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-caffee-300 focus:border-caffee-300 focus:outline-none font-sansMed bg-stone-50/50 transition-all"
                placeholder="••••••••"
                required />
              
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full cursor-pointer py-3.5 rounded-xl font-sansBold text-white bg-stone-800 hover:bg-stone-700 transition-all duration-300 text-sm ${loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg hover:-translate-y-0.5"}`}>
            
            {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-stone-500 font-sansMed">
            قبلاً ثبت‌نام کردید؟{" "}
            <Link
              to="/login"
              className="cursor-pointer text-stone-800 font-sansBold hover:underline transition-colors">
              
              ورود
            </Link>
          </p>
        </div>
      </div>
    </div>);

}

export default Register;
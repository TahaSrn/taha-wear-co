
import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../services/supabase";
import toast from "react-hot-toast";
import { HiOutlineMail, HiOutlineArrowLeft } from "react-icons/hi";
import { HiOutlineKey } from "react-icons/hi2";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });


      if (error) {
        if (error.message.includes("User not found")) {
          toast.error("کاربری با این ایمیل یافت نشد");
        } else {
          toast.error(error.message);
        }
        setLoading(false);
        return;
      }

      setSent(true);
      toast.success("لینک بازیابی رمز عبور به ایمیل شما ارسال شد!");
    } catch (error) {
      toast.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-caffee-100 via-white to-caffee-100 flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/50">
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 cursor-pointer text-stone-500 hover:text-stone-800 transition-colors mb-6 group">
          
          <HiOutlineArrowLeft
            className="group-hover:-translate-x-1 transition-transform"
            size={20} />
          
          <span className="text-sm font-sansMed ">بازگشت</span>
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-caffee-200 rounded-2xl mb-4">
            <HiOutlineKey className="text-4xl text-stone-700" />
          </div>
          <h1 className="text-2xl font-sansBold text-stone-800">
            بازیابی رمز عبور
          </h1>
          <p className="text-stone-500 font-sansMed text-sm mt-1">
            ایمیل خود را وارد کنید تا لینک بازیابی برای شما ارسال شود
          </p>
        </div>

        {sent ?
        <div className="text-center">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
              <p className="text-green-700 font-sansMed text-sm">
                ✅ لینک بازیابی به ایمیل شما ارسال شد.
              </p>
              <p className="text-stone-500 font-sansMed text-xs mt-2">
                لطفاً صندوق ورودی خود را بررسی کنید.
              </p>
            </div>
            <button
            onClick={() => navigate("/login")}
            className="w-full py-3.5 cursor-pointer rounded-xl font-sansBold text-white bg-stone-800 hover:bg-stone-700 transition-all duration-300 text-sm">
            
              بازگشت به صفحه ورود
            </button>
          </div> :

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

            <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 cursor-pointer rounded-xl font-sansBold text-white bg-stone-800 hover:bg-stone-700 transition-all duration-300 text-sm ${
            loading ?
            "opacity-70 cursor-not-allowed" :
            "hover:shadow-lg hover:-translate-y-0.5"}`
            }>
            
              {loading ? "در حال بررسی..." : "ارسال لینک بازیابی"}
            </button>
          </form>
        }
      </div>
    </div>);

}

export default ForgotPassword;
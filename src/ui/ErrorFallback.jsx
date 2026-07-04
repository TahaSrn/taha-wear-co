// src/ui/ErrorFallback.jsx
import { useNavigate } from "react-router";
import { HiOutlineExclamationCircle, HiOutlineHome } from "react-icons/hi";

function ErrorFallback({ error, resetErrorBoundary }) {
  const navigate = useNavigate();

  const handleGoHome = () => {
    resetErrorBoundary();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-caffee-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-caffee-100">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center">
            <HiOutlineExclamationCircle className="text-5xl text-amber-500" />
          </div>
        </div>

        <h2 className="text-2xl font-sansBold text-stone-800 mb-2">
          مشکلی پیش آمده
        </h2>

        <p className="text-stone-600 font-sansMed text-sm leading-relaxed mb-4">
          متأسفیم، خطایی در نمایش این صفحه رخ داده است.
        </p>

        {error?.message && (
          <p className="text-xs text-stone-400 font-sansMed mb-6 bg-stone-50 p-3 rounded-xl border border-stone-100 break-all">
            {error.message}
          </p>
        )}

        <button
          onClick={handleGoHome}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-stone-800 text-white rounded-xl hover:bg-stone-700 transition-all duration-300 font-sansMed hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
        >
          <HiOutlineHome size={20} />
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;

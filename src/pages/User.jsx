// src/pages/User.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../features/authentication/useAuth";
import { useOrders } from "../features/user/useOrders";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import UserProfile from "../features/user/UserProfile";
import UserOrders from "../features/user/UserOrders";
import Spinner from "../ui/Spinner";
import MobileTabs from "../ui/MobileTabs";

function User() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { orders, isLoading: ordersLoading } = useOrders(user?.id);

  // اسکرول به بالای صفحه با تاخیر
  useEffect(() => {
    // تاخیر کوچک برای اطمینان از رندر شدن کامل صفحه
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  if (authLoading || ordersLoading) {
    return (
      <>
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 flex justify-center items-center h-screen">
          <Spinner />
        </main>
        <Footer />
        <MobileTabs />
      </>
    );
  }

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-caffee-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-sansBold text-stone-800 mb-6">
            حساب کاربری
          </h1>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <UserProfile user={user} />
            </div>
            <div className="lg:col-span-2">
              <UserOrders orders={orders} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileTabs />
    </div>
  );
}

export default User;

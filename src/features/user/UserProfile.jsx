
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import supabase from "../../services/supabase";
import { useProfile } from "./useProfile";
import toast from "react-hot-toast";
import { HiOutlinePencil, HiOutlineCheck, HiOutlineX } from "react-icons/hi";

function UserProfile({ user }) {
  const navigate = useNavigate();
  const { profile, isLoading, updateProfile, isUpdating } = useProfile(
    user?.id
  );
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");


  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setPhone(profile.phone || "");
      setAddress(profile.address || "");
    }
  }, [profile]);

  const handleSave = () => {
    updateProfile(
      { name, phone, address },
      {
        onSuccess: () => {
          setIsEditing(false);
          toast.success("اطلاعات با موفقیت به‌روز شد");
        },
        onError: (error) => {
          toast.error(error.message);
        }
      }
    );
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
    toast.success("با موفقیت خارج شدید");
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <p className="text-center text-stone-500">در حال بارگذاری...</p>
      </div>);

  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-stone-200 flex items-center justify-center">
            <span className="text-2xl font-sansBold text-stone-600">
              {profile?.name?.[0] || user?.email?.[0] || "?"}
            </span>
          </div>
          <div>
            <p className="font-sansBold text-stone-800">
              {profile?.name || user?.email}
            </p>
            <p className="text-sm text-stone-500 font-sansMed">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-stone-500 hover:text-stone-800 transition-colors cursor-pointer">
          
          <HiOutlinePencil size={20} />
        </button>
      </div>

      <div className="space-y-3 border-t border-stone-100 pt-4">
        <div>
          <label className="text-xs text-stone-500 font-sansMed">نام</label>
          {isEditing ?
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg border border-stone-200 focus:ring-2 focus:ring-stone-400 focus:outline-none font-sansMed text-sm" /> :


          <p className="font-sansMed text-stone-700">
              {profile?.name || "—"}
            </p>
          }
        </div>

        <div>
          <label className="text-xs text-stone-500 font-sansMed">ایمیل</label>
          <p className="font-sansMed text-stone-700">{user?.email}</p>
        </div>

        <div>
          <label className="text-xs text-stone-500 font-sansMed">تلفن</label>
          {isEditing ?
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mt-1 px-3 py-2 rounded-lg border border-stone-200 focus:ring-2 focus:ring-stone-400 focus:outline-none font-sansMed text-sm" /> :


          <p className="font-sansMed text-stone-700">
              {profile?.phone || "—"}
            </p>
          }
        </div>

        <div>
          <label className="text-xs text-stone-500 font-sansMed">آدرس</label>
          {isEditing ?
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={2}
            className="w-full mt-1 px-3 py-2 rounded-lg border border-stone-200 focus:ring-2 focus:ring-stone-400 focus:outline-none font-sansMed text-sm resize-none" /> :


          <p className="font-sansMed text-stone-700">
              {profile?.address || "—"}
            </p>
          }
        </div>
      </div>

      {isEditing &&
      <div className="flex gap-2 mt-4 pt-4 border-t border-stone-100">
          <button
          onClick={handleSave}
          disabled={isUpdating}
          className="flex-1 bg-stone-800 text-white py-2 rounded-xl hover:bg-stone-700 transition-colors font-sansMed flex items-center justify-center gap-2">
          
            <HiOutlineCheck size={18} />
            {isUpdating ? "در حال ذخیره..." : "ذخیره"}
          </button>
          <button
          onClick={() => {
            setIsEditing(false);
            setName(profile?.name || "");
            setPhone(profile?.phone || "");
            setAddress(profile?.address || "");
          }}
          className="flex-1 bg-stone-100 text-stone-700 py-2 rounded-xl hover:bg-stone-200 transition-colors font-sansMed flex items-center justify-center gap-2">
          
            <HiOutlineX size={18} />
            انصراف
          </button>
        </div>
      }

      <button
        onClick={handleLogout}
        className="w-full mt-6 py-2.5 rounded-xl border border-red-300 text-red-500 hover:bg-red-50 transition-colors font-sansMed text-sm cursor-pointer">
        
        خروج از حساب
      </button>
    </div>);

}

export default UserProfile;
export default function MenuSearch() {
  return (
    <div className="flex items-center border px-2  gap-2 bg-white border-stone-500/40 h-[46px] rounded-full overflow-hidden max-w-md w-full font-sansBold">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 30 30"
        fill="#6B7280"
      >
        <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8" />
      </svg>
      <input
        type="text"
        className="w-full h-full outline-none text-sm text-gray-500"
      />
      <button
        type="submit"
        className="bg-stone-800 w-32 h-9 rounded-full text-sm text-white"
      >
        جستجو
      </button>
    </div>
  );
}

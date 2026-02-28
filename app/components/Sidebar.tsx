"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };

  const menuItems = [
    { name: "Home", path: "/home", icon: "🏠" },
    { name: "Profile", path: "/profile", icon: "👤" },
    { name: "Booking History", path: "/history", icon: "📜" },
    { name: "Live Tracking", path: "/track", icon: "🛰️" },
  ];

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 p-6 text-white">

      <h2 className="text-2xl font-bold mb-10">🚍 RURBAN Hitch</h2>

      <div className="space-y-3">
        {menuItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <div
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer
                ${
                  pathname === item.path
                    ? "bg-white text-blue-900 shadow-lg font-semibold"
                    : "hover:bg-blue-600 hover:pl-6"
                }
              `}
            >
              <span>{item.icon}</span>
              {item.name}
            </div>
          </Link>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 w-full text-left mt-6"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
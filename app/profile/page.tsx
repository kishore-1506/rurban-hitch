"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function ProfilePage() {

  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {

    const fetchUserData = async () => {

      const user = auth.currentUser;

      if (!user) {
        router.push("/login");
        return;
      }

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };

    fetchUserData();

  }, [router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };

  if (!userData) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10 flex justify-center">

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-[500px] space-y-6">

        <h1 className="text-3xl font-bold text-blue-900 text-center">
          👤 My Profile
        </h1>

        <div className="space-y-3 text-gray-700">

          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Account Created:</strong> 
            {userData.createdAt?.toDate
              ? userData.createdAt.toDate().toLocaleString()
              : "N/A"}
          </p>

          <p>
            <strong>Login Method:</strong> 
            {auth.currentUser?.providerData[0]?.providerId === "google.com"
              ? "Google"
              : "Email & Password"}
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}
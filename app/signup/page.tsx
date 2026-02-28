"use client"; 
"use client";

import { useState } from "react";
import { auth, db } from "../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: any) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Store extra user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        createdAt: new Date(),
      });

      alert("Account created successfully!");

      router.push("/login");

    } catch (error: any) {
      alert(error.message);
    }
  };
  const handleGoogleSignup = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const user = result.user;

    // Save user in Firestore if first time
    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName,
      email: user.email,
      createdAt: new Date(),
    });

    router.push("/home");

  } catch (error: any) {
    alert(error.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-orange-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[400px]">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Create Your Account
        </h2>

        <form className="space-y-4" onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Full Name"bg-white text-gray-900 placeholder-gray-500
            className="w-full p-3 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-900 placeholder-gray-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
  onClick={handleGoogleSignup}
  className="w-full flex items-center justify-center border p-3 rounded-lg hover:bg-gray-100 transition bg-white text-gray-900 placeholder-gray-500"
>
  <img
    src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
    alt="Google"
    className="w-5 h-5 mr-3"
  />
  Continue with Google
</button>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-800 transition"
          >
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login successful!");

      router.push("/home");

    } catch (error: any) {
      alert(error.message);
    }
  };
  const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    router.push("/home");
  } catch (error: any) {
    alert(error.message);
  }
};
const handleForgotPassword = async () => {
  if (!email) {
    alert("Please enter your email first.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent to your email.");
  } catch (error: any) {
    alert(error.message);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[400px]">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">
          Welcome Back
        </h2>

        <form className="space-y-4" onSubmit={handleLogin}>

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
  onClick={handleGoogleLogin}
  className="w-full flex items-center justify-center border p-3 rounded-lg hover:bg-gray-100 transition"
>
  <img
    src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
    alt="Google"
    className="w-5 h-5 mr-3"
  />
  Continue with Google
</button>
         <button
  type="button"
  onClick={handleForgotPassword}
  className="text-sm text-blue-900 font-medium hover:underline"
>
  Forgot Password?
</button>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white p-3 rounded-lg hover:bg-blue-800 transition"
          >
            Login
          </button>

        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-900 font-semibold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
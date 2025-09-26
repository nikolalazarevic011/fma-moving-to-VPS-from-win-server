import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // Save user data in local storage
      localStorage.setItem("user", JSON.stringify(data.user));

      // Extract the membership ID and save it in local storage
      if (
        data.user.membership_levels &&
        data.user.membership_levels.length > 0
      ) {
        const membershipId = data.user.membership_levels[0].id;
        localStorage.setItem("membershipId", membershipId);
      }

      // Generate a random token and save it in local storage
      const token = Math.random().toString(36).substr(2); // Random token
      localStorage.setItem("authToken", token);
      window.dispatchEvent(new Event("login-status-change")); //to trigger change of auth buttons in MainMenu
      router.push("/"); // Redirect to home page or another protected route
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex min-h-[90vh] items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-11/12 max-w-xl px-8 pt-4 pb-8 mb-4 bg-white rounded shadow-md"
      >
        <h1 className="mb-6 text-2xl font-bold text-center text-primary">
          FMA Member&#39;s Login
        </h1>
        <div className="mb-4">
          <label
            htmlFor="login"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Username or Email
          </label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 bg-blue-100 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 bg-blue-100 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
          />
        </div>
        <div className="flex items-center mb-6">
          <input type="checkbox" id="remember" className="mr-2 leading-tight" />
          <label htmlFor="remember" className="text-sm text-gray-700">
            Keep me logged in
          </label>
        </div>
        {error && <p className="mb-4 text-xs italic text-red-500">{error}</p>}
        <div className="flex items-center">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white rounded bg- focus:shadow-outline bg-primary focus:outline-none"
          >
            Log In
          </button>
        </div>
        <div className="mt-4 text-center">
        <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Lost your Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

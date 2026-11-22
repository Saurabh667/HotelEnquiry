import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminLogin() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Connect this handler to the Django JWT login API.
    setError("Authentication is not connected yet. The Django login API will be integrated here.");
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#F4F1EA] px-5 py-16 text-[#182333]">
      {/* Back to website */}
      <Link
        to="/"
        className="absolute left-6 top-7 text-xs text-[#69717B] transition hover:text-[#B18A45] sm:left-10 sm:top-9"
      >
        <span className="mr-2">←</span> Back to website
      </Link>

      {/* Centered login card */}
      <section className="flex h-[720px] w-full max-w-[460px] flex-col justify-center overflow-y-auto border border-[#E9E4D9] bg-[#FDFBF7] px-7 py-8 shadow-[0_20px_70px_rgba(24,35,51,0.08)] sm:px-12 sm:py-9">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center border border-[#B18A45] font-serif text-3xl text-[#B18A45]">
            H
          </span>
          <strong className="mt-4 block text-[11px] tracking-[2.5px]">
            HOTELENQUIRY
          </strong>
          <small className="mt-1 text-[9px] tracking-[3px] text-[#A17B3F]">
            ADMINISTRATION PORTAL
          </small>
        </div>

        <div className="mt-8 text-center">
          <span className="text-[10px] tracking-[3px] text-[#B18A45]">
            PRIVATE ACCESS
          </span>
          <h1 className="mt-3 font-serif text-5xl leading-tight">
            Admin <em className="font-normal text-[#B18A45]">sign in.</em>
          </h1>
          <p className="mx-auto mt-4 max-w-[310px] text-sm leading-7 text-[#737A82]">
            Sign in with your administrator credentials to access your workspace.
          </p>
        </div>

<form
  onSubmit={handleSubmit}
  className="mx-auto mt-7 flex w-full max-w-[650px] flex-col space-y-5"
>
  {/* Username */}
  <label className="block min-w-0 flex-1 text-left">
    <span className="text-[10px] tracking-[1.5px] text-[#59616B]">
      USERNAME OR EMAIL
    </span>
    <input
      required
      autoComplete="username"
      name="username"
      value={formData.username}
      onChange={handleChange}
      placeholder="Enter your username or email"
      className="mt-1 w-full border-b border-[#D9D5CC] bg-transparent py-2 text-sm outline-none transition placeholder:text-[#A5A7A8] focus:border-[#B18A45]"
    />
  </label>

  {/* Password */}
  <label className="block min-w-0 flex-1 text-left">
    <span className="text-[10px] tracking-[1.5px] text-[#59616B]">
      PASSWORD
    </span>
    <span className="mt-1 flex items-center border-b border-[#D9D5CC] transition focus-within:border-[#B18A45]">
      <input
        required
        autoComplete="current-password"
        type={showPassword ? "text" : "password"}
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
        className="w-full min-w-0 bg-transparent py-2 text-sm outline-none placeholder:text-[#A5A7A8]"
      />
      <button
        type="button"
        onClick={() => setShowPassword((current) => !current)}
        className="ml-2 shrink-0 text-[10px] tracking-wider text-[#A17B3F] hover:text-[#182333]"
      >
        {showPassword ? "HIDE" : "SHOW"}
      </button>
    </span>
  </label>

  {error && (
    <p
      role="alert"
      className="border-l-2 border-red-500 bg-red-50 px-4 py-3 text-left text-xs leading-5 text-red-700"
    >
      {error}
    </p>
  )}

  <button
    type="submit"
    className="group flex min-h-[56px]  items-center justify-between gap-4 bg-[#182333] px-5 py-4 text-left text-xs tracking-[1.2px] text-white transition hover:bg-[#B18A45]"
  >
    <span>SIGN IN TO ADMIN PANEL</span>
    <span className="text-lg transition-transform group-hover:translate-x-1">
      →
    </span>
  </button>
</form>

        {/* <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <label className="block text-left">
            <span className="text-[10px] tracking-[1.5px] text-[#59616B]">
              USERNAME OR EMAIL
            </span>
            <input
              required
              autoComplete="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username or email"
              className="mt-2 w-full border-b border-[#D9D5CC] bg-transparent py-4 text-sm outline-none transition placeholder:text-[#A5A7A8] focus:border-[#B18A45]"
            />
          </label>

          <label className="block text-left">
            <span className="text-[10px] tracking-[1.5px] text-[#59616B]">
              PASSWORD
            </span>
            <span className="mt-2 flex items-center border-b border-[#D9D5CC] transition focus-within:border-[#B18A45]">
              <input
                required
                autoComplete="current-password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-transparent py-4 text-sm outline-none placeholder:text-[#A5A7A8]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="ml-3 inline-flex shrink-0 items-center justify-center whitespace-nowrap text-[10px] tracking-wider text-[#A17B3F] transition hover:text-[#182333]"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </span>
          </label>

          {error && (
            <p
              role="alert"
              className="border-l-2 border-red-500 bg-red-50 px-4 py-3 text-left text-xs leading-5 text-red-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="group flex min-h-[56px] w-full shrink-0 items-center justify-between gap-4 bg-[#182333] px-5 py-4 text-left text-xs tracking-[1.2px] text-white transition hover:bg-[#B18A45]"
          >
            <span>SIGN IN TO ADMIN PANEL</span>
            <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
          </button>
        </form> */}

        <p className="mt-6 shrink-0 border-t border-[#E9E5DC] pt-5 text-center text-[10px] leading-6 text-[#92979D]">
          This portal is restricted to authorised HotelEnquiry administrators.
        </p>
      </section>

      <span className="mt-5 text-[9px] tracking-[1.5px] text-[#92979D]">
        © {new Date().getFullYear()} HOTELENQUIRY
      </span>
    </main>
  );
}

export default AdminLogin;

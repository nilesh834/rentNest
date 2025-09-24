import React, { useEffect, useState } from "react";
import uploadProfilePic from "../assets/upload.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage" && files[0]) {
      const file = files[0];

      // Example: 2 MB limit
      const MAX_SIZE = 2 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        toast.error("Profile image must be under 2MB");
        return;
      }

      setFormData({
        ...formData,
        [name]: file,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const registerForm = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val) registerForm.append(key, val);
      });

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          method: "POST",
          body: registerForm,
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast.success("Registration successful 🎉");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const isFormIncomplete =
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.password ||
    !formData.profileImage;

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl text-center my-7 font-semibold">Sign Up</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          className="p-3 rounded-lg border"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          className="p-3 rounded-lg border"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="p-3 rounded-lg border"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="p-3 rounded-lg border"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          className="p-3 rounded-lg border"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        {!passwordMatch && (
          <p className="text-red-500">Passwords do not match.</p>
        )}

        <input
          id="image"
          type="file"
          name="profileImage"
          accept="image/*"
          className="hidden"
          required
          onChange={handleChange}
        />
        <label htmlFor="image" className="flex items-center gap-3 mt-2 mb-2">
          {formData.profileImage ? (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile pic"
              style={{ maxWidth: "80px" }}
            />
          ) : (
            <img
              src={uploadProfilePic}
              alt="add profile pic"
              className="w-8 h-8"
            />
          )}
          <p className="text-lg text-slate-700">Upload Your Photo</p>
        </label>

        <button
          className="bg-slate-700 rounded-lg p-3 text-white uppercase hover:opacity-95 disabled:opacity-80"
          disabled={!passwordMatch || loading || isFormIncomplete}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {isFormIncomplete && (
          <p className="text-red-500 text-sm mt-2">All fields are required.</p>
        )}
      </form>

      <div className="mt-5 flex gap-2">
        <p>Already have an account?</p>
        <Link to={"/login"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;

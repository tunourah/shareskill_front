import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
 
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

// APIs
import * as usersAPI from "../utilities/users-api.js"

export default function SignupPage({ setUser }) {
 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const initialState = { username: "", password: "", confirmPassword: "", email: "" }
    const [formData, setFormData] = useState(initialState)
    const [errors, setErrors] = useState({ username: '', password: '', email: '', confirmPassword: '' });
    let disabledSubmitBtn = Object.values(errors).every(val => val === "") && Object.values(formData).every(val => val !== "") ? false : true

    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
        checkErrors(evt);
    }

    function checkErrors({ target }) {
        const updateErrors = { ...errors }

        if (target.name === 'username') {
            updateErrors.username = target.value.length < 3 ? 'Your username must be at least three characters long.' : "";
        }
        if (target.name === 'password') {
            updateErrors.password = target.value.length < 3 ? "Your password must be at least three characters long." : "";
        }
        if (target.name === 'confirmPassword') {
            updateErrors.confirmPassword = target.value !== formData.password ? "Your passwords must match." : "";
        }
        if (target.name === 'email') {
            updateErrors.email = !target.value.includes("@") ? "Your email must include the '@' symbol." : "";
        }

        setErrors(updateErrors);
    };

    async function handleSubmit(evt) {
      
        try {
            evt.preventDefault();
            setLoading(true);
            const newUser = await usersAPI.signup(formData);
            setUser(newUser);
            setFormData(initialState)
            navigate("/login")
        } catch (err) {
            // console.log(err);
            setUser(null);
        }
        setLoading(false);
    }

   return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
        <Link to="/" className="block text-2xl mb-4 text-gray-500 hover:text-gray-700">
          &larr;
        </Link>

        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-2">
          Sign Up
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Create your account to get started
        </p>

        {/* General error */}
        {errors.general && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <FiUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full bg-transparent outline-none"
                required
                minLength={3}
                maxLength={150}
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <FiMail className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-transparent outline-none"
                required
                minLength={3}
                maxLength={150}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none"
                required
                minLength={8}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full bg-transparent outline-none"
                required
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={ loading || disabledSubmitBtn }
            className="w-full flex justify-center items-center gap-2 border border-gray-800 text-gray-800 font-medium py-2 rounded-full hover:bg-gray-100 transition"
          >
            {loading ? 'Processing...' : 'Sign Up'}
            {!loading && <FiArrowRight />}
          </button>
        </form>

        {/* Already have an account */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-rose-500 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>

        {/* Terms */}
        <p className="text-xs text-gray-400 text-center mt-4">
          By signing up you agree to our{' '}
          <span className="underline cursor-pointer text-gray-600">
            Terms of Service
          </span>{' '}
          and{' '}
          <span className="underline cursor-pointer text-gray-600">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </div>
  );

}
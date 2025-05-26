import React from "react";
import ResetPasswordFunc from "./Utils/ResetPassword";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = React.useState("");
  const handleResetPassword = async () => {
    console.log("Reset password button clicked");
    if (!email) {
      // Check if email is empty or does not contain '@'
      alert("Please enter your email to reset password");
      return;
    }
    if (email.includes("@") === false) {
      alert("Please enter a valid email address");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await ResetPasswordFunc(email, password);
    if (response.error) {
      console.error("Password reset failed:", response.message);
      alert(response.message);
    } else {
      console.log("Password reset successful:", response.message);

      navigate("/");
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-80 space-y-4">
        <h2 className="text-lg font-bold mb-4">Reset Password</h2>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
        <input
          type="password"
          id="c-password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <button
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
          type="button"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;

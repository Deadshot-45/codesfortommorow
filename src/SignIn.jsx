import React from "react";
import SignInFunc from "./Utils/SignInFunc";
import ResetPasswordFunc from "./Utils/ResetPassword";
import ResetPasswordMailFunc from "./Utils/ResetPasswordMailFunc";

const SignIn = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", { email, password });

    const response = await SignInFunc(email, password);
    if (response.error) {
      console.log("Sign-in successful:", response);
      // Redirect or perform further actions after successful sign-in
    } else {
      console.error("Sign-in failed");
      // Handle sign-in failure (e.g., show an error message)
    }
  };
  const handleReset = async () => {
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
    // Logic to reset password goes here
    const response = await ResetPasswordMailFunc(email);
    if (response.error) {
      console.error("Password reset failed:", response.message);
      alert(response.message);
    } else {
      console.log("Password reset mail send successful:", response.message);
      alert(response.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form
          className="bg-white p-6 rounded shadow-md w-80"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-center text-3xl text-blue-700 mb-6">
            Sign In
          </h1>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
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
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="reset"
              className="mb-2 text-blue-500"
              onClick={handleReset}
            >
              reset password
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

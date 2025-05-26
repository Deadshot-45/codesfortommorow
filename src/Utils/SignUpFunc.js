import axios from "axios";

const SignUpFunc = async (name, email, password, confirmPassword) => {
  try {
    const response = await axios.post(
      "http://localhost:7500/api/data/user/signup",
      {
        name,
        email,
        password,
        confirmPassword,
      }
    );
    if (!response.data.error) {
      console.log("Failed to sign in");
      return false;
    }
    return response.data; // Assuming the server returns user data or a success message
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};

export default SignUpFunc;
// This function handles the sign-up process by sending a POST request to the server with the user's email and password.

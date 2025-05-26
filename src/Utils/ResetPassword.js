import axios from "axios";

const ResetPasswordFunc = async (email, newPassword) => {
  try {
    const response = await axios.post(
      "http://localhost:7500/api/data/user/reset-password",
      {
        email,
        newPassword,
      }
    );
    if (!response.data.error) {
      console.error("Failed to reset password");
      return { error: true, message: response.data.message };
    }
    return { error: false, message: "Password reset successfully" };
  } catch (error) {
    console.error("Error during password reset:", error);
    return {
      error: true,
      message: "An error occurred while resetting the password",
    };
  }
};

export default ResetPasswordFunc;
// This function handles the password reset process by sending a POST request to the server with the user's email and new password.
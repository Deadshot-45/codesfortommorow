import axios from "axios";

const ResetPasswordMailFunc = async (email) => {
  try {
    const response = await axios.post(
      "http://localhost:7500/api/data/user/reset-password-mail",
      {
        email,
      }
    );
    if (!response.data.error) {
      console.error("Failed to send reset password mail");
      return { error: true, message: response.data.message };
    }
    return { error: false, message: "Reset password mail sent successfully" };
  } catch (error) {
    console.error("Error during sending reset password mail:", error);
    return {
      error: true,
      message: "An error occurred while sending the reset password mail",
    };
  }
}

export default ResetPasswordMailFunc;
import { saveLoadingState } from "../../redux/feature/appSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

const PasswordReset = ({ role = "user" }) => {
  const { token } = useParams();
  const [passwordData, setPasswordData] = useState({
    token: token,
    newPassword: "",
  });

  const user = {
    role: "user",
    dashboard_url: "/",
    reset_password_api: "/user/resetPassword",
  };

  if (role === "admin") {
    user.role = "admin";
    user.dashboard_url = "/admin";
    user.reset_password_api = "/admin/resetPassword";
  }
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setPasswordData({ ...passwordData, newPassword: e.target.value });
  };
  const handleResetPassword = async (e) => {
    console.log(passwordData);
    e.preventDefault();
    dispatch(saveLoadingState(true));
    try {
      const response = await axiosInstance({
        method: "POST",
        url: user.reset_password_api,
        data: passwordData
      });
      dispatch(saveLoadingState(false));
      toast.success(`${response.data.message} Please login to continue`);
      setTimeout(() => {
        navigate(user.dashboard_url);
      }, 2000);
    } catch (error) {
      dispatch(saveLoadingState(false));
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="appContainer">
      <div className="resetPassword">
        <h2>Reset your Password</h2>

        <p>Your new password must be at least 8 characters long.</p>
        <h4>
          After resetting your password, you will need to log in again to
          continue.
        </h4>

        <input
          type="password"
          placeholder="New password"
          onChange={handleChange}
        />
        {passwordData.newPassword.length < 8 && (
          <span className="error">
            Password must be at least 8 characters long
          </span>
        )}
        <button
          className="primary restButton"
          onClick={handleResetPassword}
          disabled={passwordData.newPassword.length < 8}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};
export default PasswordReset;

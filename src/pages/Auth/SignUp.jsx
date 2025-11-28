import React, { useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { useState } from "react";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import Input from "../../components/Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
import uploadImage from "../../utils/uploadimage";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    if (!fullName) {
      setError("Please enter full name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }
    setError("");

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);

        if (!imgUploadRes || !imgUploadRes.imageUrl) {
          setError("Image upload failed. Try again.");
          return;
        }

        profileImageUrl = imgUploadRes.imageUrl;
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        adminInviteToken,
        profileImageUrl,
      });
      const { token, role } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      console.log("SIGNUP ERROR FULL:", error);

      if (error.response) {
        console.log("SIGNUP ERROR DATA:", error.response.data);

        if (error.response.data?.message) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong on server.");
        }
      } else {
        // ✅ Backend did not return a normal error response
        console.log("SIGNUP ERROR NO RESPONSE:", error.message);
        setError("Network error or server did not respond properly.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="w-full h-auto mt-6 flex flex-col justify-center px-4 md:px-8">
        <h3 className="text-2xl font-semibold text-black mb-1">
          Create an Account
        </h3>
        <p className="text-sm text-slate-600 mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp} className="space-y-6">
          {/* Profile image */}
          <div className="flex justify-center">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>

          {/* Input fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Enter Full Name"
              type="text"
            />

            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="Enter Email"
              type="text"
            />

            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              placeholder="Enter Password"
              type="password"
            />

            <Input
              value={adminInviteToken}
              onChange={(e) => setAdminInviteToken(e.target.value)}
              label="Admin Invite Token"
              placeholder="6 Digit Invite Code"
              type="text"
            />
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-xs -mt-3">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl text-sm font-medium shadow active:scale-[0.98] transition"
          >
            SIGN UP
          </button>

          {/* Login link */}
          <p className="text-sm text-center text-slate-700">
            Already have an account?{" "}
            <Link className="font-semibold text-primary" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;

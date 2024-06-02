import { useState, useContext } from 'react';

import { showInputLabel } from "../../lib/form.js";
import EyeIcon from "../../assets/open-eye.svg"
import CloseEyeIcon from "../../assets/close-eye.svg";
import { AuthContext } from "../../context/auth-context";
import { notify } from "../../lib/alert";

export default function LoginForm({ handleFormChange }) {
  const [showPassword, setShowPassword] = useState({ pass: false });
  const { handleLogin } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({
    email: "", password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = loginData;
    let errorMessage;
    if (!email) errorMessage = "Please enter email";
    else if (!password) errorMessage = "Please enter password";

    if (errorMessage) {
      notify(errorMessage, "error");
    } else {
      handleLogin({ email, password });
    }

    setLoading(false);
  }


  return (
    <div className="w-full">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleFormSubmit} noValidate>
        <p className='mb-6'>
          New member?
          <span className='ms-2 underline cursor-pointer text-primary' onClick={handleFormChange}>
            Sign up now
          </span>
        </p>

        <div className="mb-6 relative">
          <input
            type="email"
            name={"email"}
            placeholder="email"
            className="input input-bordered w-full"
            onInput={showInputLabel}
            onChange={(e) => setLoginData(pre => ({ ...pre, email: e.target.value }))}
            value={loginData.email}
            required
          />
          <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Email</span>
        </div>

        <div className="mb-6 relative">
          <div className='absolute top-0 right-2 h-full w-8 flex justify-center items-center cursor-pointer'
            onClick={() => setShowPassword((pre) => ({ ...pre, pass: !pre.pass }))}
          >
            {showPassword.pass
              ? <img src={EyeIcon} />
              : <img src={CloseEyeIcon} />}
          </div>
          <input
            type={showPassword.pass ? "text" : "password"}
            name={"password"}
            placeholder="Password"
            className="input input-bordered w-full"
            onInput={showInputLabel}
            onChange={(e) => setLoginData(pre => ({ ...pre, password: e.target.value }))}
            value={loginData.password}
            required />
          <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Password</span>
        </div>


        <button type="submit"
          disabled={loading}
          className="text-primary-content bg-primary hover:bg-primary/90 focus:outline-none font-medium rounded-full text-sm w-full px-5 py-3 text-center mt-2 btn"
        >
          Sign In
          {loading ? <span className="loading loading-spinner loading-sm ms-1"></span> : null}
        </button>
      </form>
    </div>
  )
}

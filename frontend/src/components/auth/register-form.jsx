import React, { useState, useContext } from 'react';

import { showInputLabel } from "../../lib/form.js";
import EyeIcon from "../../assets/open-eye.svg"
import CloseEyeIcon from "../../assets/close-eye.svg";
import { UserContext } from "../../context/user-context";
import { notify } from "../../lib/alert";

export default function RegisterForm({ handleFormChange }) {
  const [showPassword, setShowPassword] = useState({ pass: false, pass2: false });
  const { handleCreateUser } = useContext(UserContext);
  const [userData, setUserData] = useState({
    email: "", phone: "", name: { firstName: "", lastName: "" }, password: "", confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password, confirmPassword } = userData;
    let errorMessage;
    if (!email) errorMessage = "Please enter email";
    else if (!password) errorMessage = "Please enter password";
    else if (!confirmPassword) errorMessage = "Please re-enter your password";
    else if (password !== confirmPassword) errorMessage = "Password does not match";

    if (errorMessage) {
      notify(errorMessage, "error");
    } else {
      handleCreateUser(userData);
    }

    setLoading(false);
  }


  return (
    <div className="w-full">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleFormSubmit} noValidate>
        <p className='mb-6'>
          Already a member?
          <span className='ms-2 underline cursor-pointer text-primary' onClick={handleFormChange}>
            log in now
          </span>
        </p>

        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className='relative'>
            <input
              type="text"
              placeholder="First name"
              className="input input-bordered w-full"
              name={"first_name"}
              onInput={showInputLabel}
              value={userData.name.firstName}
              onChange={(e) => setUserData(pre => ({ ...pre, name: { ...pre.name, firstName: e.target.value } }))}
            />
            <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>First name</span>
          </div>
          <div className='relative'>
            <input
              type="text"
              placeholder="Last name"
              className="input input-bordered w-full"
              name={"last_name"}
              onInput={showInputLabel}
              value={userData.name.lastName}
              onChange={(e) => setUserData(pre => ({ ...pre, name: { ...pre.name, lastName: e.target.value } }))}
            />
            <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Last name</span>
          </div>
        </div>

        <div className="mb-6 relative">
          <input
            type="email"
            name={"email"}
            placeholder="email"
            className="input input-bordered w-full"
            onInput={showInputLabel}
            onChange={(e) => setUserData(pre => ({ ...pre, email: e.target.value }))}
            value={userData.email}
            required
          />
          <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Email</span>
        </div>

        <div className="mb-6 relative">
          <input
            type="phone"
            name={"phone"}
            placeholder="phone"
            className="input input-bordered w-full"
            onInput={showInputLabel}
            onChange={(e) => setUserData(pre => ({ ...pre, phone: e.target.value }))}
            value={userData.phone}
            required
          />
          <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Phone</span>
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
            value={userData.password}
            onChange={(e) => setUserData(pre => ({ ...pre, password: e.target.value }))}
            required />
          <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Password</span>
        </div>

        <div className="mb-6 relative">
          <div
            className='absolute top-0 right-2 h-full w-8 flex justify-center items-center cursor-pointer'
            onClick={() => setShowPassword((pre) => ({ ...pre, pass2: !pre.pass2 }))}>
            {showPassword.pass2
              ? <img src={EyeIcon} />
              : <img src={CloseEyeIcon} />}
          </div>
          <input
            type={showPassword.pass2 ? "text" : "password"}
            name={"confirm_password"}
            placeholder="Confirm Password"
            className="input input-bordered w-full "
            onInput={showInputLabel}
            value={userData.confirmPassword}
            onChange={(e) => setUserData(pre => ({ ...pre, confirmPassword: e.target.value }))}
            required />
          <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Confirm Password</span>
        </div>




        <button type="submit"
          disabled={loading}
          className="text-white bg-secondary hover:bg-secondary/90 focus:outline-none font-medium rounded-full text-sm w-full px-5 py-3 text-center mt-2 btn"
        >
          Register now
          {loading ? <span className="loading loading-spinner loading-sm ms-1"></span> : null}
        </button>
      </form >
    </div >
  )
}

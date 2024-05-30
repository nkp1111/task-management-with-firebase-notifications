import React, { useState } from 'react'

import LoginForm from "../../components/auth/login-form";
import RegisterForm from "../../components/auth/register-form";

export default function Auth() {
  const [loginForm, setLoginForm] = useState(true);
  const handleFormChange = () => {
    setLoginForm(pre => !pre);
  }
  return (
    <main>
      <h1 className="my-5 text-xl font-bold text-center">{loginForm ? "Sign In" : "Register"}</h1>

      <div className="md:max-w-sm max-w-xs mx-auto">
        {loginForm
          ? <LoginForm handleFormChange={handleFormChange} />
          : <RegisterForm handleFormChange={handleFormChange} />
        }
      </div>
    </main>
  )
}

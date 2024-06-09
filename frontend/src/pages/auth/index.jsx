import { useState } from 'react'

import LoginForm from "../../components/auth/login-form";
import RegisterForm from "../../components/auth/register-form";
import bgImage from "../../assets/scattered-forcefields.svg";


export default function Auth() {
  const [loginForm, setLoginForm] = useState(true);
  const handleFormChange = () => {
    setLoginForm(pre => !pre);
  }
  return (
    <main className="h-screen relative">
      <div className="absolute min-h-screen w-full">
        <img src={bgImage} className=" top-0 left-0 right-0 bottom-0 bg-opacity-50"></img>
      </div>
      <div className="relative z-50">
        <h1 className="mt-10 text-2xl text-center">Welcome to Task Management</h1>
        <h2 className="my-5 text-xl font-bold text-center">{loginForm ? "Sign In" : "Register"}</h2>

        <div className="md:max-w-sm max-w-xs mx-auto">
          {loginForm
            ? <LoginForm handleFormChange={handleFormChange} />
            : <RegisterForm handleFormChange={handleFormChange} />
          }
        </div>
      </div>
    </main>
  )
}

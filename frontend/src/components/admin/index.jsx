import { useContext, useState } from 'react';
import { UserContext } from "../../context/user-context";
import { AuthContext } from "../../context/auth-context";
import EmployeeManager from "./employee-manager";
import MyDashboard from "./my-dashboard"

const Admin = () => {

  const { user } = useContext(UserContext);
  const [viewMyDashboard, setViewMyDashboard] = useState(true);

  const { handleLogout } = useContext(AuthContext);
  if (!user) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  const fullName = `${user?.name?.firstName || ""} ${user?.name?.lastName || ""}`.trim();


  return (
    <section className='mb-3'>
      <div className="mx-auto my-6 sm:px-8 px-2 flex flex-col">
        <div className="flex justify-between items-center">
          <h2 className=' text-xl capitalize text-start'>Welcome <span className='font-medium'>{fullName}</span> </h2>
          <button className="text-red-500 underline" onClick={handleLogout}>Logout</button>
        </div>

        {user?.role === "admin" ? (
          <div role="tablist" className="tabs tabs-boxed mx-auto">
            <a role="tab" className={`tab ${viewMyDashboard ? "tab-active" : ""}`}
              onClick={() => setViewMyDashboard(true)}>My dashboard</a>
            <a role="tab" className={`tab ${!viewMyDashboard ? "tab-active" : ""}`}
              onClick={() => setViewMyDashboard(false)}>Employee Manager</a>
          </div>
        ) : (
          <div className="mx-auto">My dashboard</div>
        )}
      </div>

      <div className='flex md:flex-row flex-col gap-2 sm:px-8 px-2 w-full'>
        {user?.role === "admin" && (viewMyDashboard ? <MyDashboard /> : <EmployeeManager />)}
        {user?.role === "employee" && <MyDashboard />}
      </div>
    </section>
  );
};

export default Admin;
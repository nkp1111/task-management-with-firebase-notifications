import { useState } from 'react'
import { showInputLabel } from "../../../lib/form";

export default function MyProfile({ user, handleUpdateUser }) {


  const userFirstName = user?.name?.firstName;
  const userLastName = user?.name?.lastName;
  const userPhone = user?.phone;
  const userEmail = user?.email;
  const userId = user?._id;

  const [userUpdateData, setUserUpdateData] = useState({
    name: { firstName: userFirstName || "", lastName: userLastName || "" },
    phone: userPhone || "",
  });

  return (
    <div className="card lg:w-1/3 md:w-1/2 w-full flex-1 bg-base-100 shadow-xl my-3">
      <div className="card-body justify-between flex-row">
        <div>
          <h2 className="card-title capitalize">{userFirstName} {userLastName}</h2>
          <p>Email: {userEmail}</p>
          <p>Phone: {userPhone}</p>
        </div>
        <div className="card-actions justify-end flex-col">
          <button className="btn btn-primary" onClick={() => document.getElementById('user_update_modal').showModal()}>Update</button>
          <dialog id="user_update_modal" className="modal">
            <div className="modal-box">

              <h3 className="font-bold text-lg">Edit User -{userId}</h3>
              <p className="py-4">Email: {userEmail}</p>
              <div className="modal-action">
                <form method="dialog">

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="mb-6 relative">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="input input-bordered w-full"

                        onInput={showInputLabel}
                        onChange={(e) => setUserUpdateData(pre => ({ ...pre, name: { ...pre.name, firstName: e.target.value } }))}
                        value={userUpdateData.name.firstName}
                      />
                      <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>First Name</span>
                    </div>

                    <div className="mb-6 relative">
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="input input-bordered w-full"
                        onInput={showInputLabel}
                        onChange={(e) => setUserUpdateData(pre => ({ ...pre, name: { ...pre.name, lastName: e.target.value } }))}
                        value={userUpdateData.name.lastName}
                      />
                      <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Last Name</span>
                    </div>
                  </div>

                  <div className="mb-6 relative">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      className="input input-bordered w-full"
                      onInput={showInputLabel}
                      onChange={(e) => setUserUpdateData(pre => ({ ...pre, phone: e.target.value }))}
                      value={userUpdateData.phone}
                    />
                    <span className='absolute top-0 left-0 -translate-y-1/2 hidden bg-white px-2 rounded-full'>Phone Number</span>
                  </div>

                  <button onClick={() => handleUpdateUser(userId, userUpdateData)} className="btn btn-secondary me-2">Update</button>

                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-secondary text-secondary-content">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  )
}

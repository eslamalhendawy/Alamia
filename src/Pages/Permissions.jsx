import { useState, useEffect } from "react";
import { getData } from "../Services/apiCalls";

import Loading from "../Components/Loading";
import DeleteEmployeeModal from "../Components/DeleteEmployeeModal";
import EditEmployeeModal from "../Components/EditEmployeeModal";

import userImage from "/assets/userImage.png";

const Permissions = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getData("users", localStorage.getItem("token"));
      if (response.data) {
        setUsers(response.data);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <section className="grow py-6 px-4 minHeight flex flex-col items-center justify-center">
      {loading && <Loading />}
      <div className="flex flex-col gap-6 md:w-[80%] pt-[50px] sm:pt-0">
        {!loading &&
          users.length > 0 &&
          users.map((user) => (
            <div key={user._id} className="gap-4 bg-white p-4 rounded-lg text-[#424242] sm:flex items-center justify-between ">
              <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
                <div>
                  <img src={userImage} alt="" />
                </div>
                <div className="text-center sm:text-left flex flex-col gap-3 lg:gap-2 text-lg md:text-xl">
                  <h2 className="capitalize">Name: {user.name}</h2>
                  <p className="capitalize">Role: {user.role}</p>
                  <p>Email: {user.email}</p>
                </div>
              </div>
              <div className="flex justify-center gap-4 md:gap-8 text-xl md:text-3xl">
                <DeleteEmployeeModal  user={user} />
                <EditEmployeeModal user={user} />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Permissions;

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";


// const baseUrl = 'http://localhost:5000';
const baseUrl = 'https://school-backend-siwz.onrender.com'

function AllUsers() {

  const [users, setUsers] = useState([]);

  const fetchStudents = async () => {
    try {

      const response = await fetch(`${baseUrl}/student/getStudents`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        },
      });
      const data = await response.json();

      if (data.status) {
        setUsers(data?.data);
      }
      else {
        toast.error("Internal server error , please try again");
      }


    } catch (error) {
      console.log(error);
      toast.error("Something went wrong , please try again")
    }
  }

  useEffect(() => {
    fetchStudents();
  }, [])

  console.log(users);
  return (
    <div className="w-full flex flex-col gap-10">

      <h2 className="mx-auto text-white text-[34px] font-[600]">All Students Details</h2>

      <table >
        <thead >
          <tr >
            <th className="font-[600] text-white ">StudentId</th>
            <th className="font-[600] text-white ">FirstName</th>
            <th className="font-[600] text-white ">LastName</th>
            {/* <th className="font-[600] text-white ">Email</th> */}
            <th className="font-[600] text-white ">BusinessCase</th>
            <th className="font-[600] text-white ">Role</th>
          </tr>
        </thead>
        <tbody >
          {users?.map((user) => {
              let user1 = user._id;
            return (
              <React.Fragment>
                <tr key={user?._id} className="boder border-2  border-white">
                  <td className="text-center text-gray-300">{(user1).slice(0,5)}</td>
                  <td className="text-center text-gray-300">{user.firstName}</td>
                  <td className="text-center text-gray-300">{user.lastName}</td>
                  <td className="text-center text-gray-300">{user.buisnessCase}</td>
                  <td className="text-center text-gray-300">{user.role}</td>
                  {/* <td className="text-center text-gray-300">{user.email}</td> */}
                </tr>
              </React.Fragment>
            )
          }

          )}
        </tbody>
      </table>

    </div>
  )
}

export default AllUsers;
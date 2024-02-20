import {  useEffect, useState } from "react";
import toast from "react-hot-toast";

// const baseUrl = 'http://localhost:5000';
const baseUrl = 'https://school-backend-siwz.onrender.com'

const buisnessRole = [
  {
    id:1 ,
    title:"JA Trust Bank"
  },
  {
    id:2 ,
    title:"City Hall"
  },
  {
    id:3 ,
    title:"JA Food Hall"
  },
  {
    id:4 ,
    title:"JA STEM"
  },
   {
    id:5,
    title:"City Works"
   },
   {
    id:6,
    title:"Heartland Realty"
   },
   {
    id:7,
    title:"JA Mart"
   },
   {
    id:8,
    title:"JA Philanthropy"
   },
   {
    id:8,
    title:"JA Philanthropy"
   },
   {
    id:9,
    title:"Crandall Airport"
   },
   {
    id:10,
    title:"Car Dealership"
   },
   {
    id:11,
    title:"JA Learniverse"
   },
   {
    id:12,
    title:"Paws for JA"
   }
]

const roleData = [
  {
      id:1 ,
    data:["CEO" , "CFO" , "Bank Teller 1","Bank Teller 2","Bank Teller 3","Saving Officer","IT Specialist"]
  
  },
  {
      id:2 ,
    data:["Mayor" , "Town Treasurer" , "Public Health Manager","City Manager","Police Officer","Election Coordinator"]
    
  },
  {
    id:3 , 
    data:["CEO" , "CFO" , "Cashier 1","Cashier 2","Customer Relations Specialist","Restaurant Host"]
    
  },
  {
    id:4 , 
    data:["CEO" , "CFO" , "Installation Manager","IT Specialist 1","Customer Service Clerk","E-Commerce Specialist"]
    
  },
  {
    id:5 , 
    data:["Director" , "Office Manager" , "City Plumber","Utility Enginer","Environmental Agent 1"]
    
  },
  {
    id:6 , 
    data:["CEO" , "CFO" , "Interior Designer 1","Interior Designer 2","Building Inspector","Store Clerk 1","Store Clerk 2"]
  },
  {
    id:7 , 
    data:["CEO" , "CFO" , "Cashier 1","Cashier 2","Marketing Manager"]
  },
  {
    id:8 , 
    data:["NonProfit Director" , "CFO" , "Development Manager","Grants Manager","Program Manager 1","Social Media Manager"]
  },
  {
    id:9 , 
    data:["CEO" , "CFO" , "Travel Agent 1","Travel Agent 2","Tourism Coordinator","Marketing Manager"]
  },
  {
    id:10 , 
    data:["CEO" , "CFO" , "Delivery Driver 1","Delivery Driver 2","Supply Manager","IT Specialist"]
  },
  {
    id:11 , 
    data:["CEO" , "CFO" , "Professor","Career Counselor","Bookstore Manager 1","Bookstore Manager 2","Grants Manager"]
  },
  {
    id:12 , 
    data:["CEO" , "CFO" , "Adoption Counselor 1","Adoption Counselor 2","Cashier 1","Cashier 2","Social Media Manager","Animal Advocate Educator"]
  },
]

function CreateProduct({setSelectedItem}){



  const [formData , setFormData]  = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    buisnessCase:"",
    role:""
    })

  // this is used 


  const [roleState , setRoleState] = useState();



  useEffect(()=>{

     const buidID = buisnessRole.find(b => b.title ==  formData.buisnessCase);
     console.log("id",buidID);

    const selectedRole = roleData.find(role => role.id == buidID?.id);

if (selectedRole) {
    setRoleState(selectedRole.data);
  } else {
    setRoleState([]);
  }

   },[formData.buisnessCase])


  //  end ***


 
    console.log("formda" ,formData);

    const changeHandler = (e)=>{
      const {name , value} = e.target;
      setFormData((prev)=>(
        {
          ...prev , 
          [name]:value
        }
      ))
    }

     const submitHandler = async()=>{

      const toastId = toast.loading("Loading...");

    console.log("form" ,formData);

      try{
            const response = await fetch(`${baseUrl}/student/postStudent` , {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(formData)
            });
            const data = await response.json(); 
            console.log(data)
             if(data.status){
              toast.success(data?.message);
              setSelectedItem("viewStudent")
             }
             else{
              toast.error(data?.message)
             }
      


      } catch(error){
          console.log(error);
          toast.error("something went wrong , please try again")
      }

      toast.dismiss(toastId);
     }


    return (
        <div className="w-full flex flex-col gap-10  ">

        <h2 className="mx-auto text-white text-[34px] font-[600]">Create Student</h2>
                        
        
        <form onSubmit={(e)=>{
          e.preventDefault();
          submitHandler();
        }} class="max-w-sm mx-auto w-full ">
        
          <div class="mb-5">
            <label htmlFor="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">FirstName</label>
            <input  type="text" onChange={changeHandler} name="firstName" value={formData.firstName} id="firstName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="FirstName" required />
          </div>

          <div class="mb-5">
            <label htmlFor="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LastName</label>
            <input  type="text" onChange={changeHandler} name="lastName" value={formData.lastName} id="lastName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="LastName" required />
          </div>
        
         
          <div class="mb-5">
            <label htmlFor="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input  type="email" onChange={changeHandler} id="email" value={formData.email} name="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="student@gmail.com" required />
          </div>
         
          <div class="mb-5">
            <label htmlFor="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input  type="password" onChange={changeHandler} id="password" name="password" value={formData.password} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
          </div>


          {/* this is select dropdown */}

          <div class="mb-5">
          <label htmlFor="BuisnessCase" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">BuisnessCase</label>
            <select required name="buisnessCase" onChange={(e)=>{
              setFormData((prev)=>(
                {
                  ...prev ,
                  buisnessCase: e.target.value
                }
              ))
            }} value={formData.buisnessCase} id="buisnessCase" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" selected>BuisnessCase</option>
              {
                buisnessRole.map((item )=>(
                  <option key={item.id} value={item?.title}>{item?.title}</option>
                ))
              }
            </select>
          </div>
         

          <div class="mb-5">
          <label htmlFor="Role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>

            <select required name="role" value={formData.role} onChange={(e)=>setFormData((prev)=>({
              ...prev ,
              role : e.target.value
            }))} id="" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="" selected>Role</option>
              {
                roleState?.map((item ,index)=>(
                  <option key={index} value={item}>{item}</option>
                ))
              }
            </select>
          </div>


          {/* end dropdown s */}
         

          <button type="submit" class="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

        </form>
        
            </div>
    )
}

export default CreateProduct;
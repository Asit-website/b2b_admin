import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMain } from "../hooks/useMain";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { useMain } from "../hooks/useMain";
function CreateSubscription() {
    const { setUser, postSubscription, updateSubscription } = useMain();
    const [openProduct, setOpenProduct] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    // const location = locat

    const subscription = location?.state?.e;

    const [selectedItem, setSelectedItem] = useState("createStudent");

    const setLogoutHandler = () => {
        const toastId = toast.loading("Loading...");
        try {
            setUser(null);
            localStorage.removeItem('b2b_user');
            localStorage.removeItem('b2b_token');

            navigate("/login");

            toast.success("Successfuly logout");


        } catch (error) {
            console.log(error);
        }

        toast.dismiss(toastId)
    }

    useEffect(() => {
        if (!localStorage.getItem('b2b_token')) {
            navigate("/");
        }
    }, [])

    const [value, setValue] = useState({
        subscription_type: "",
        subsciption_price: "",
        desc1: "",
        desc2: "",
        desc3: "",
        desc4: ""
    });

    const handleChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ans = await postSubscription(value);
        if (ans?.status) {
            alert("subscription successfully created by admin")
        }
        else {
            alert("something went wrong");
        }

        setValue({
            subscription_type: "",
            subsciption_price: "",
            desc1: "",
            desc2: "",
            desc3: "",
            desc4: ""
        })
    }

    useEffect(() => {
        if (subscription) {
          const {
            subscription_type,
            subsciption_price,
            desc1,
            desc2,
            desc3,
            desc4
          } = subscription;
    
          console.log("pr" ,subscription);
    
    
          setValue({
            subscription_type,
            subsciption_price,
            desc1,
            desc2,
            desc3,
            desc4
          })
        }
      }, []);

    const handleSubmit1 = async (e) => {
        e.preventDefault();

        const {
            subscription_type,
            subsciption_price,
            desc1,
            desc2,
            desc3,
            desc4,
        } = value;

        const ans = await updateSubscription({
            subscription_type,
            subsciption_price,
            desc1,
            desc2,
            desc3,
            desc4,
            id: subscription._id
        });

        if (ans?.status) {
            alert("updated successfully")
            setValue({
                subscription_type: "",
                subsciption_price: "",
                desc1: "",
                desc2: "",
                desc3: "",
                desc4: "",
            });
        }

        else {
            console.log("error")
        }

    }

    return (
        <div className="w-full min-h-[100vh] bg-[#111827]">


            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Open sidebar</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul class="space-y-2 font-medium">



                        <li>
                            <NavLink
                                to="/dashboard" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span class="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
                            </NavLink>
                        </li>

                        <li >
                            <a
                                onClick={() => setOpenProduct((prev) => !prev)}
                                href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <span class="flex-1 ms-3 whitespace-nowrap">Subscription</span>
                            </a>
                            {
                                openProduct &&
                                <ul class="space-y-2 font-medium">
                                    <li
                                        onClick={() => setSelectedItem("viewStudent")}
                                    >
                                        <a onClick={() => {
                                            navigate("/viewSub")
                                        }} class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                                <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                            </svg>
                                            <span class="flex-1 ms-3 whitespace-nowrap">View Subscription</span>
                                        </a>
                                    </li>

                                    <li
                                        onClick={() => setSelectedItem("createStudent")}
                                    >
                                        <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                            <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                                <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                                                <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                                            </svg>
                                            <span class="flex-1 ms-3 whitespace-nowrap">Create Subscription</span>
                                        </a>
                                    </li>

                                </ul>
                            }
                        </li>


                        <li>    <a
                            onClick={setLogoutHandler}
                            href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span class="flex-1 ms-3 whitespace-nowrap">Logout</span>
                        </a></li>
                    </ul>
                </div>
            </aside>

            <div class="p-4 sm:ml-64  min-h-[100vh]">
                <div className="mt-6 hj">

                    <form onSubmit={subscription ? handleSubmit1 : handleSubmit} className="max-w-sm mx-auto">
                        <div className="mb-5">
                            <label
                                htmlFor="subscription_type"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                subscription type
                            </label>
                            <input
                                type="text"
                                id="subscription_type"
                                name="subscription_type"
                                onChange={handleChange}
                                value={value.subscription_type}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                required=""
                            />
                        </div>
                        <div className="mb-5">
                            <label
                                htmlFor="subsciption_price"
                                className="block mb-2 text-sm font-medium text-white"
                            >
                                subscription Price
                            </label>
                            <input
                                type="number"
                                id="subsciption_price"
                                name="subsciption_price"
                                onChange={handleChange}
                                value={value.subsciption_price}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required=""
                            />
                        </div>

                        <div className="mb-5">

                            <label for="desc1" class="block mb-2 text-sm font-medium text-white">Subscription Description1</label>
                            <textarea id="desc1" name="desc1" onChange={handleChange} value={value.desc1} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></textarea>

                        </div>
                        <div className="mb-5">

                            <label for="desc2" class="block mb-2 text-sm font-medium text-white">Subscription Description2</label>
                            <textarea id="desc2" name="desc2" value={value.desc2} onChange={handleChange} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></textarea>

                        </div>

                        <div className="mb-5">

                            <label for="desc3" class="block mb-2 text-sm font-medium text-white dark:text-white">Subscription Description3</label>
                            <textarea id="desc3" name="desc3" onChange={handleChange} value={value.desc3} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>

                        </div>

                        <div className="mb-5">

                            <label for="desc4" class="block mb-2 text-sm font-medium text-white">Subscription Description4</label>
                            <textarea id="desc4" name="desc4" value={value.desc4} onChange={handleChange} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" ></textarea>

                        </div>

                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Save
                        </button>
                    </form>

                </div>


            </div>



        </div>
    )
}
export default CreateSubscription;
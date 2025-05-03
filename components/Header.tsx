
"use client"
import superbase from "@/lib/superbase/products";
import { getCart } from "@/redux/cartslice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUser, setUser } from "@/redux/userslice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCart, BiLogIn, BiLogOut, BiSearch } from "react-icons/bi";

const Header = () => {
  const pathname=usePathname();

  const user=useAppSelector(getUser)
  const dispatch=useAppDispatch();
 
  //cart item from redux
  const cart =useAppSelector(getCart)
  
  // useState for search bar
  const [query, setQuery] = useState<string>('');
  const router = useRouter();

  // State for scroll
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    router.push(`/search/${query}`);
  };


  useEffect(()=>{
    const getUserData=async()=>{
      const {data}=await superbase.auth.getUser();
      console.log("userrrr" , data)
     
      if(data.user){
        dispatch(setUser({name:data.user.email?.split("@")[0],email:data.user.email,created_at:data.user.created_at}))
      }else{
        dispatch(setUser(false))
      }
    }
    getUserData();

  },[dispatch])


  return pathname==="/signin" || pathname==="/checkout"?<></>: (
    <header
      className={`
        fixed top-0 left-0 w-full z-10 transition-all duration-300 h-[80px]
        ${scrolled
          ? "bg-white/70 backdrop-blur-md shadow-lg"
          : "bg-white/70 backdrop-blur-md shadow-lg"
        }
      `}
      style={{ WebkitBackdropFilter: scrolled ? "blur(12px)" : "none" }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* <Image height={40} width={40} src={''} alt="Logo" /> */}
          <h1 className={`text-3xl font-extrabold tracking-tight drop-shadow-lg transition-colors duration-300 ${
            scrolled ? "text-indigo-900" : "text-indigo-900"
          }`}>
            E-commerce
            <span className="text-violet-400">App</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center px-6">
          <div className="relative w-full max-w-lg">
            <input
              className={`
                w-full pl-4 pr-12 py-2 rounded-full
                bg-indigo-100 text-indigo-900 placeholder-indigo-400
               
                focus:outline-none focus:ring-2 focus:ring-violet-400
                transition-all duration-200 shadow-md
              `}
              type="text"
              name="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <BiSearch
              onClick={handleSearch}
              className={`absolute right-4 top-1/2 -translate-y-1/2 text-2xl cursor-pointer transition 
                 text-violet-500 hover:text-violet-700 `}
            />
          </div>
        </div>

        {/* User & Cart */}
        <div className="flex items-center gap-8">
          {/* User */}
          <div className="flex flex-col items-end">
            {user?
              <span className={`text-sm transition-colors duration-300 text-indigo-700
                `}>Hello, {user?.name}</span>
            :
            <button onClick={()=>{router.push('/signin')}} className={`flex text-base cursor-pointer font-semibold transition text-indigo-900 hover:text-violet-600`}>
              <span className="px-1">
                <BiLogIn className="text-2xl" />
              </span>
              Sign in
            </button>
            }
            
          </div>
          {/* Orders */}
          <div className="flex flex-col items-end cursor-pointer group">
            <span className={`text-sm cursor-pointer group-hover:text-violet-300 transition  text-indigo-700 `}>
              Returns
            </span>
            <button className={`text-base font-semibold cursor-pointer group-hover:text-violet-300 transition 
               text-indigo-900 `}>
              & Orders
            </button>
          </div>
          {/* Cart */}
          <div onClick={()=>router.push("/cart")} className="relative flex items-center cursor-pointer group">
            <BiCart className={`text-3xl transition 
              text-indigo-900 group-hover:text-violet-400
            `} />
            <span className={`absolute -top-2 -right-2 bg-violet-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md border-2 
               "border-white" `}>
              {cart.length}
            </span>
            <span className={`ml-2 font-semibold group-hover:text-violet-300 transition "text-indigo-900`}>
              Cart
            </span>
          </div>
          {/* signout  */}
          <div>{
              user  && 
              <button onClick={async()=>{
                const {error}=await superbase.auth.signOut()
                if(error){
                  console.log("error",error)
                }else{
                  dispatch(setUser(null))
                }
              }} className={`flex text-base cursor-pointer font-semibold transition text-indigo-900 hover:text-violet-600`}>
                <span className="px-1">
                  <BiLogOut className="text-2xl" />
                </span>
                Sign Out
              </button>
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

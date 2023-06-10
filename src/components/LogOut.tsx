import { removeCookie } from "@/utils/cookie";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    removeCookie("userInfo"); // Delete the "userInfo" cookie
    router.push("/sign-in"); // Redirect to the login page or any desired page
  };

  return (
    <div className="flex flex-col space-y-1 mt-4 -mx-2">
      <button
        type="submit"
        className=" logoutButton flex flex-row items-center hover:bg-gray-300 rounded-xl p-2 bg-red-400"
        onClick={handleLogout}
      >
        <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
          X
        </div>
        <span className="ml-2 text-lg font-semibold">LogOut</span>
      </button>
    </div>
  );
};

export default LogoutButton;

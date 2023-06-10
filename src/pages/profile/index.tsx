import Sidebar from "@/components/Sidebar";

import { UserType } from "@/types/user";
import { getCookie } from "@/utils/cookie";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Link from "next/link";
import { userProvider } from "@/providers/userProvider";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    bio: yup.string(),
    currentPassword: yup.string().required(),
    newPassword: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Passwords must match")
      .required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const Profile = () => {
  const cookieString = getCookie("userInfo");
  const [isUpdated, setIsUpdated] = useState(false);
  let cookie: any = null;
  try {
    if (cookieString) {
      cookie = JSON.parse(cookieString);
    }
  } catch (error) {
    console.error("Error parsing userInfo cookie:", error);
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (userInfo: FormData) => {
    try {
      await userProvider.updateUser(userInfo);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const [bio, setBio] = useState(cookie?.bio);
  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <Sidebar cookie={cookie} />
        </div>
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
              <h1 className="text-center text-2xl font-bold text-teal-600 sm:text-3xl">
                Edit Profile
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
              >
                <div>
                  <label className="sr-only">Name</label>

                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter name"
                      {...register("name")}
                      name="name"
                      defaultValue={cookie?.name || ""}
                    />
                    <p className="text-xs text-red-500">
                      {errors.name?.message}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="sr-only">Email</label>

                  <div className="relative">
                    <input
                      type="email"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm bg-gray-200"
                      placeholder="Enter email"
                      {...register("email")}
                      name="email"
                      defaultValue={cookie?.email || ""}
                      readOnly
                    />
                    <p className="text-xs text-red-500">
                      {errors.email?.message}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="sr-only">currentPassword</label>
                  <div className="relative">
                    <input
                      type="password"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter currentPassword"
                      {...register("currentPassword")}
                      name="currentPassword"
                    />
                    <p className="text-xs text-red-500">
                      {errors.currentPassword?.message}
                    </p>
                  </div>
                </div>{" "}
                <div>
                  <label className="sr-only">New Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Enter newPassword"
                      {...register("newPassword")}
                      name="newPassword"
                    />
                    <p className="text-xs text-red-500">
                      {errors.newPassword?.message}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="sr-only">Confirm Password</label>

                  <div className="relative">
                    <input
                      type="password"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Confirm password"
                      {...register("confirmPassword")}
                      name="confirmPassword"
                    />
                    <p className="text-xs text-red-500">
                      {errors.confirmPassword?.message}
                    </p>
                  </div>
                  <div>
                    <label className="sr-only">Bio</label>

                    <div className="relative">
                      <textarea
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Your bio"
                        {...register("bio")}
                        name="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                      <p className="text-xs text-red-500">
                        {errors.bio?.message}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="updateProfileButton block w-full rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white hover:bg-slate-400"
                >
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

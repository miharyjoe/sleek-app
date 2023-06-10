import Sidebar from "@/components/Sidebar";
import { RestUserType, UserType } from "@/types/user";
import { getCookie } from "@/utils/cookie";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import Link from "next/link";
import { userProvider } from "@/providers/userProvider";
import { channelProvider } from "@/providers/channelProvider";
import { CreateChannelType } from "@/types/channel";

const schema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().oneOf(["public", "private"]).required(),
  members: yup.array().of(yup.number()).required(),
});

const CreateChannel = () => {
  const cookieString = getCookie("userInfo");

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
    watch,
    formState: { errors },
  } = useForm<CreateChannelType>({
    resolver: yupResolver(schema),
  });

  const [users, setUsers] = useState<RestUserType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchUsers = async () => {
    try {
      const response = await userProvider.getUsers();
      const fetchedUsers: RestUserType[] = response.data;
      setUsers(fetchedUsers);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (channel: CreateChannelType) => {
    if (isSubmitting) {
      return;
    }
    try {
      setIsSubmitting(true);
      console.log("here");
      await channelProvider.createChannel(channel);
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                Create channel
              </h1>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
              >
                <div>
                  <label className="sr-only">Channel Name</label>

                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Channel Name"
                      {...register("name")}
                      name="name"
                    />
                    <p className="text-xs text-red-500">
                      {errors.name?.message}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="sr-only">Type</label>

                  <div className="relative">
                    <select
                      type="text"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                      placeholder="Channel type"
                      {...register("type")}
                      name="type"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>
                    <p className="text-xs text-red-500">
                      {errors.type?.message}
                    </p>
                  </div>
                </div>
                {watch("type") === "private" && users.length > 0 && (
                  <div>
                    <label className="block font-medium text-gray-700">
                      Select Users
                    </label>
                    {users.map((user, index) => (
                      <div key={user.id}>
                        <input
                          type="checkbox"
                          {...register("members")}
                          name="members"
                          value={user.id} /// Set the name as an array index
                        />
                        {user.name}
                      </div>
                    ))}
                  </div>
                )}
                <button
                  type="submit"
                  className="createChannelButton block w-full rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white hover:bg-slate-400"
                  disabled={isLoading} // Disable the button when loading
                >
                  {isLoading ? "Creating..." : "Create channel"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateChannel;

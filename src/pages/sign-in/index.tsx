import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

import { LoginUserType } from "@/types/user";
import { authProvider } from "@/providers/authProvider";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function FormLogin() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginUserType>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const onSubmit = async (userInfo: LoginUserType) => {
    try {
      const { authenticate } = await authProvider.signIn(userInfo);

      authenticate && (await router.push("/messages")) && reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-teal-600 sm:text-3xl">
          Welcome to Sleek
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          A clone of Slack
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">
            Sign in to your account
          </p>

          <div>
            <label className="sr-only">Email</label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
                {...register("email")}
                name="email"
              />
              <p className="text-xs text-red-500">{errors.email?.message}</p>
            </div>
          </div>

          <div>
            <label className="sr-only">Password</label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
                {...register("password")}
                name="password"
              />
              <p className="text-xs text-red-500">{errors.password?.message}</p>
            </div>
          </div>

          <button
            type="submit"
            className="loginButton block w-full rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-500">
            No account?
            <Link className="underline" href="/sign-up">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import axios from "axios";
import { authProvider } from "@/providers/authProvider";
import { useRouter } from "next/router";
import { CreateUserType } from "@/types/user";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const FromRegister = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserType>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (userInfo: CreateUserType) => {
    try {
      await authProvider.signUp(userInfo);
      const { authenticate } = await authProvider.signIn(userInfo);

      authenticate && (await router.push("/message")) && reset();
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
            Create a new account
          </p>
          <div>
            <label className="sr-only">Name</label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter name"
                {...register("name")}
                name="name"
              />
              <p className="text-xs text-red-500">{errors.name?.message}</p>
            </div>
          </div>
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
          </div>
          <button
            type="submit"
            className="registerButton block w-full rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white"
          >
            Register
          </button>
          <p className="text-center text-sm text-gray-500">
            Already have an account?
            <Link className="underline" href="/sign-in">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default FromRegister;

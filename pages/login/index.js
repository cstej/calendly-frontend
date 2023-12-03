import Btn from "@/core/buttons/Btn";
import BtnLoader from "@/core/buttons/BtnLoader";
import CheckBx from "@/core/CheckBx";
import Errmsg from "@/core/Errmsg";
import InpLabel from "@/core/Inp/InpLabel";
import useLogin from "@/libs/mutations/auth/useLogin";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { CiLogin } from "react-icons/ci";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: LoginFunc, isLoading: loginLoading } = useLogin();

  const onSubmit = (formdata) => {
    LoginFunc(formdata)
  };
  console.log("loading",loginLoading)
  return (
    <div className="flex h-screen justify-center gap-15 items-center">
      <div className="min-w-[500px] px-10 h-[90vh] overflow-y-scroll scrollbar-thin scrollbar-orange-300 scrollbar-track-gray-100 bg-gray-100">
        {/* heading  */}
        <div className="flex  pt-4 gap-4">
          {/* logo  */}
          <div className="relative h-9 w-9 rounded-full overflow-hidden">
            <Image
              src={`https://assets.calendly.com/assets/frontend/media/logo-square-cd364a3c33976d32792a.png`}
              fill
              alt="123"
            />
          </div>
          <div>
            <p className="text-[23px] text-gray-900 font-semibold">
            Scheduler
            </p>
          </div>
        </div>
        {/* main box  */}
        <div className="pt-4 flex items-start flex-col w-full">
          <p className="text-[30px] font-bold">Login</p>
          <div className="flex text-[12px] gap-2">
            <p>Not have an account?</p>

            <Link href={"/signup"}>
              <p className="text-blue-400">Sign up</p>
            </Link>
          </div>
          {/* inp boxes  */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="pt-3 flex w-full gap-3 mt-3 mb-5 flex-col"
          >
            <div className="w-full">
              <Controller
                name="email"
                rules={{
                  required: "Address is required",
                }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InpLabel
                    title="Email"
                    type="email"
                    onChange={onChange}
                    value={value}
                    placeholder="Email"
                  />
                )}
              />
              <Errmsg err={errors} name="email" />
            </div>

            <div className="w-full">
              <Controller
                name="password"
                rules={{
                  required: "Passowrd is required",
                }}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InpLabel
                    title="Password"
                    type="password"
                    onChange={onChange}
                    value={value}
                    placeholder="Password"
                  />
                )}
              />
              <Errmsg err={errors} name="password" />
            </div>
            <div className="mb-5"></div>
            <Btn
              icon={loginLoading ? <BtnLoader /> : <CiLogin size={15} />}
              type="submit"
              disabled={loginLoading}
              Text="Log IN"
              color="blue-300"
            />
          </form>
        </div>
      </div>
      <div className="relative h-[90vh] w-[400px] overflow-hidden rounded-lg">
        <Image fill alt="school_logo" src={"https://images.unsplash.com/photo-1616198814651-e71f960c3180?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRpbWV8ZW58MHx8MHx8fDA%3D"} />
      </div>
    </div>
  );
};

export default Login;

export const getServerSideProps = async ({ req, res }) => {
  let cookieStore = req?.cookies?.token;
  if (cookieStore) {
    return {
      redirect: {
        destination: "/dashboard",
        parmanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
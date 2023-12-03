import api from "@/pages/api/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const useSignIn = () => {
  const router = useRouter();
  const signIn = useMutation({
    mutationFn: async (obj) => {
      const res = await api.post("users/create_user", obj);
      return res?.data;
    },
    onSuccess: (data) => {
      console.log("data in response", data);
      toast.success("User Created", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        color: "red",
      });
        router.replace("/login");
    },
    onError: (err) => {
      console.log("err in response", err);
    },
  });
  return signIn;
};

export default useSignIn;

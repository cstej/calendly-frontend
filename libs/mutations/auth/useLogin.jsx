import api from "@/pages/api/api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const useLogin = () => {
  const router = useRouter();
  const uselogin = useMutation({
    mutationFn: async (obj) => {
      const res = await api.post("users/login", obj);
      return res?.data;
    },
    onSuccess: (data) => {
      // console.log("data after login", data);
      toast.success("Login success", {
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
      router.replace("/");
      // console.log("call hua")
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });
  return uselogin;
};

export default useLogin;

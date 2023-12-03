import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";
import api from "../../../api/api";
import { useSearchParams } from "next/navigation";
import { Button } from "@material-tailwind/react";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useRouter();
  const client_id = "Rbdh6SHISOKLMsSt8pEvng";
  const redirect_uri = "http://localhost:3000/Integration/Zoom/Login";

  const searchParams = useSearchParams();
  let code = searchParams.get("code");

  const handleAuthorization = () => {
    const authorizationURL = `https://zoom.us/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${encodeURIComponent(
      redirect_uri
    )}`;
    window.location.href = authorizationURL;
  };

  const handleAccessToken = async (code) => {
    try {
      const res = await api.get(`zoom/accesstoken?code=${code}`);
      toast.success("Zoom Connected Successfully!\nSchedule You Meetings");
      navigate.push("/dashboard")
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetToken = () => {
    handleAuthorization(); // Initiate authorization process
  };

  useEffect(() => {
    const fetchData = async () => {
      if (code) {
        await handleAccessToken(code);
      }
    };
    fetchData();
  }, [code]);

  return (
    <div>
      <div className="flex items-center justify-center mt-4 ">
        <p className="">Connect Your Zoom Account!</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Button className="p-2" onClick={handleGetToken}>
          Connect To Zoom
        </Button>
      </div>
    </div>
  );
};

export default Login;

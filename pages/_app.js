import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import { ReactQuery } from "@/utils/ReactQuery";
const inter = Poppins({ subsets: ["latin"], weight: "400" });
import "react-toastify/dist/ReactToastify.css";
import NextUIProviders from "@/providers/NextUIProviders";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@material-tailwind/react";

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Toaster position="top-center" reverseOrder={false} />
      <ThemeProvider>
        <NextUIProviders>
          <ReactQuery>
            {/* Date Pikker tool */}
            <Component {...pageProps} />
          </ReactQuery>
        </NextUIProviders>
      </ThemeProvider>
    </main>
  );
}

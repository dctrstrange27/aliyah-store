import { AppProps, type AppType } from "next/app";
import { SessionProvider } from "next-auth/react"
import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component,  pageProps}:AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
};

export default api.withTRPC(MyApp);

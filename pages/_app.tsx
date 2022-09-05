import "../styles/globals.css";
import "../styles/assets/fonts/font.css";
import "../styles/assets/css/all.css";
import "../styles/assets/css/bootstrap.min.css";
import "../styles/assets/css/bootstrap.min.css";
import "../styles/assets/css/owl.carousel.min.css";
import "../styles/assets/css/owl.carousel.min.css";
import "../styles/assets/css/jquery.fancybox.min.css";
import "../styles/assets/css/animate.min.css";
import "../styles/assets/css/colors.css";
import "../styles/assets/css/styles.css";
import "../styles/assets/css/colors/green.css";
import "../styles/assets/css/responsive.css";
import "../styles/globals.css";
import "../styles/sb-admin-2.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "../context/session-context";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "../utils/apollo";
import ReactTooltip from 'react-tooltip';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={apolloClient}>
            <SessionProvider>
                <ReactTooltip className="my-tooltip" effect="solid" eventOff="hover" place="bottom" />
                {/* <div>Hệ thống đang bảo trì</div> */}
                <Component {...pageProps} />
            </SessionProvider>
        </ApolloProvider>
    );
}

export default MyApp;

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Layout id={id}>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;

import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Header from "../component/header";

const appComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </>
  );
};

appComponent.getInitialProps = async (appContext) => {
  // const context = buildClient(appContext);
  // const data = await buildClient(context).get("/api/users/currentUser");

  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx.req);
    console.log(`pageProps is `, pageProps);
  }

  // // return data;
  if (typeof window === "undefined") {
    try {
      const { data } = await axios.get(
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentUser",
        {
          headers: appContext.ctx.req.headers,
        }
      );

      return { pageProps, currentUser: { ...data } };
    } catch (err) {
      console.error("Server-side request failed:", err.message);
      return { currentUser: null };
    }
  } else {
    // Client-side
    console.log(`app context`);

    const { data } = await axios.get("/api/users/currentUser");
    return { currentUser: data.currentUser };
  }
};

export default appComponent;

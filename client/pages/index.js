import axios from "axios";

const landingPage = ({ currentUser }) => {
  console.log(`current user is`, currentUser);

  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

landingPage.getInitialProps = async (req) => {
  // const data = await buildClient(context).get("/api/users/currentUser");

  // return data;
  if (typeof window === "undefined") {
    try {
      const { data } = await axios.get(
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentUser",
        {
          headers: req.headers,
        }
      );

      return { currentUser: data.currentUser };
    } catch (err) {
      console.error("Server-side request failed:", err.message);
      return { currentUser: null };
    }
  } else {
    // Client-side
    const { data } = await axios.get("/api/users/currentUser");
    return { currentUser: data.currentUser };
  }
};

export default landingPage;

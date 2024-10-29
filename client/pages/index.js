import buildClient from "../api/build-client";

const landingPage = ({ currentUser }) => {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

landingPage.getInitialProps = async (context) => {
  const { data } = buildClient(context).get("/api/users/currentUser");
  return data;
};
export default landingPage;

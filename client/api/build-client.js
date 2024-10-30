import axios from "axios";

export default ({ req }) => {
  try {
    if (typeof window === "undefined") {
      // we are on the server
      // requests should be made with base url of http://ingress-nginx.ingress-nginx.srv.local
      // http://SERVICENAME.NAMESPACE.svc.cluster.local
      console.log(`headers looks like`, req);

      return axios.create({
        baseURL:
          "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
        headers: req.headers,
      });
    } else {
      return axios.create({
        baseURL: "/",
      });
    }
  } catch (error) {}
};

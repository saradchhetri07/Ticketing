import { useState } from "react";
import axios from "axios";

export default ({ url, method, body, onSuccess }) => {
  const [err, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors([]);
      const response = await axios.request({ url, method, data: body });
      if (onSuccess) {
        onSuccess();
      }

      return response.data;
    } catch (err) {
      console.log(`error: `, err);

      setErrors(
        <div className="alert alert-danger">
          <h4>Oops</h4>
          <ul>
            {!err.response?.data.errors &&
              err.response?.data.errors.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
          </ul>
        </div>
      );
    }
  };
  return { doRequest, err };
};

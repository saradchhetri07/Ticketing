import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useRequest from "../../hooks/use-request";
import Router from "next/router";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { doRequest, err } = useRequest({
    url: "/api/users/signUp",
    method: "POST",
    body: {
      email,
      password,
    },
    onSuccess: () => {
      Router.push("/");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema), // Apply Zod schema as resolver
  });

  const onSubmit = async () => {
    doRequest();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email address</label>
        <input
          {...register("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
        />
        {errors.email && (
          <div className="text-danger">{errors.email.message}</div>
        )}
      </div>
      <div className="form-group">
        <label>Password </label>
        <input
          {...register("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
        {errors.password && (
          <div className="text-danger">{errors.password.message}</div>
        )}
      </div>
      {err}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};

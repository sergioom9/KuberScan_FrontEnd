import { PageProps } from "$fresh/server.ts";
import Login from "../../components/Login.tsx";
import { ErrorBoxVisible } from "../../signals.ts";

const LoginPage = ({ url }: PageProps) => {
  const error = url.searchParams.get("error");
  if(error!==null){
    ErrorBoxVisible.value = true;
  }
  return <Login error={error} />;
};

export default LoginPage;

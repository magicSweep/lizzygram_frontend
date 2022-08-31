import { useContext } from "react";
import { TokenContext } from "../../container/TokenProvider";

export const useTokenContext = () => {
  const token = useContext(TokenContext);

  console.log("USE TOKEN CONTEXT", token);

  return token;
};

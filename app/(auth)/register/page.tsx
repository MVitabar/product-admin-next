import { Metadata } from "next";
import SignUpForm from "./components/SignUpForm";
export const metadata: Metadata = {
  title: "Sign Up",
  description: "Aceede para ver tu lista de productos",
};
const SignUp = () => {
  return <SignUpForm />;
};

export default SignUp;

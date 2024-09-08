import CommonForm from "@/components/common/Form";
import { loginFormControls } from "@/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  email: "",
  password: "",
};
export default function Login() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleSubmit() {
    try {
      dispatch(login(formData)).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message,
            className: "bg-green-500 text-white",
            duration: 2000,
          });
        } else {
          toast({
            title: data?.payload?.message,
            variant: "destructive",
            duration: 2000,
          });
        }
      });

    } catch (err) {
     toast({
       title: "Registration Failed",
       description: "Please try again",
       variant: "destructive",
       duration: 2000,
     });
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2 ">
          Don't have an account?
          <Link
            to="/auth/register"
            className="font-medium text-primary hover:underline ml-1"
          >
            Sign Up
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

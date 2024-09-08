import CommonForm from "@/components/common/Form";
import { registerFormControls } from "@/config";
import { register } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

export default function Register() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleSubmit() {
    dispatch(register(formData))
      .then((data) => {
        console.log(data?.payload?.message, "res");
        if (data?.payload?.success) {
          toast({
            title: data?.payload?.message,
            className: "bg-green-500 text-white",
            duration: 2000,
          });
          navigate("/auth/login");
        }
      })
      .catch((err) => {
        console.log(err, "err");
        toast({
          title: "Registration Failed",
          description: "Please try again",
          variant: "destructive",
          duration: 2000,
        });
      });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create an account
        </h1>
        <p className="mt-2 ">
          Already have an account?
          <Link
            to="/auth/login"
            className="font-medium text-primary hover:underline ml-1"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

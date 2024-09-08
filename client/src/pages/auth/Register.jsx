import CommonForm from "@/components/common/Form";
import { registerFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};



export default function Register() {
  const [formData, setFormData] = useState(initialState);
  
    function handleSubmit() {
      console.log(formData);
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
        formControls={ registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
     

      />
    </div>
  );
}

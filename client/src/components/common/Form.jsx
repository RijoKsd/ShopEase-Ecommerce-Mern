import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const types = {
  INPUT: "Input",
  TEXTAREA: "Textarea",
  SELECT: "Select",
};

export default function CommonForm({
  formControls,
  onSubmit,
  setFormData,
  formData,
  buttonText,
  isBtnDisabled,
}) {
  // Function to render the input component based on the control type
  function renderInputComponent(control) {
    const value = formData[control.name] || "";

    // Handle the change event for the input field
    const handleChange = (e) => {
      const newValue = e.target ? e.target.value : e;
      setFormData({ ...formData, [control.name]: newValue });
    };

    switch (control.componentType) {
      case types.INPUT:
        return (
          <Input
            name={control.name}
            type={control.type}
            placeholder={control.placeholder}
            id={control.name}
            value={value}
            onChange={handleChange}
          />
        );
      case types.TEXTAREA:
        return (
          <Textarea
            name={control.name}
            placeholder={control.placeholder}
            rows={4}
            id={control.name}
            value={value}
            onChange={handleChange}
          />
        );
      case types.SELECT:
        return (
          <Select value={value} onValueChange={handleChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={control.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {control.options?.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return null;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((control) => (
          <div key={control.name} className="grid w-full gap-1.5">
            <Label htmlFor={control.name} className="text-sm mt-1">
              {control.label}
            </Label>
            {renderInputComponent(control)}
          </div>
        ))}
      </div>
      <Button type="submit" className="w-full mt-4" disabled={isBtnDisabled}>
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

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
}) {
  // Function to render the input component based on the control type
  function renderInputComponent(control) {
    // Get the value of the control from the form data
    const value = formData[control.name] || "";
    // Check if the control type is Input, Textarea or Select
    switch (control.componentType) {
      case types.INPUT:
        return (
          <Input
            name={control.name}
            type={control.type}
            placeholder={control.placeholder}
            id={control.name}
            value={value}
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, [control.name]: e.target.value })
            }
          />
        );
      case types.SELECT:
        return (
          <Select
            defaultValue={value}
            onValueChange={(value) =>
              setFormData({ ...formData, [control.name]: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={control.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {control.options && control.options.length > 0
                ? control.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
      default:
        return null;
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((control) => (
          <div key={control.name} className="grid w-full gap-1.5">
            <Label className="mb-1" htmlFor={control.name}>
              {control.label}
            </Label>
            {
              // Function to render the input component based on the control type
              renderInputComponent(control)
            }
          </div>
        ))}
      </div>
      <Button type="submit" className="w-full mt-2" >
        {buttonText || "Submit"}
      </Button>
    </form>
  );
}

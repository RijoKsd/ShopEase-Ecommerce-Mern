import { filterOptions } from "@/config";
import React, { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

export default function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-5 border-b ">
        <h2 className="text-lg font-extrabold"> Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {/*  This is where the filter options will be displayed */}
        {/*  Each filter option will be a checkbox with the label as the option name */}
        {/* First we map using Object.keys to get the keys of the filterOptions object then we map over the keys and display the options */}

        {Object.keys(filterOptions).map((item) => (
          <Fragment key={item}>
            <div>
              <h3 className=" text-base font-bold">{item}</h3>
              <div className="grid gap-3 mt-2">
                {filterOptions[item].map((option) => (
                  <Label
                    key={option.id}
                    className="flex items-center gap-2 font-medium"
                  >
                    <Checkbox
                      checked={ filters && Object.keys(filters).length > 0 && filters[item]?.indexOf(option.id) > -1 }
                      onCheckedChange={() => handleFilter(item, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

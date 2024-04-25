import React, { useState } from "react";
import { useController, Controller } from "react-hook-form";
import _ from "lodash";
import PropTypes from "prop-types";

const RadioInputField = React.forwardRef((props, ref) => {
  const { field, fieldState } = useController(props);
  const {
    title,
    style,
    type,
    errors,
    defaultValue,
    labelClass,
    disabled,
    ...others
  } = props;
  let err = _.get(errors, props.name);
  return (
    <div>
      <Controller
        name={props?.name}
        control={props?.control}
        rules={props?.rules}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <div className="">
            <label
              className={`cursor-pointer d-flex gap-x-2 items-center text-base ${
                labelClass ? labelClass : "text-black"
              }  ${props?.disabled ? "text-gray-200 cursor-not-allowed" : ""}`}
            >
              <input
                {...field}
                ref={ref}
                checked={
                  field.value == "1" || field.value === true ? true : false
                }
                type="radio"
                disabled={disabled}
                onChange={(e) => {
                  onChange(e.target.value);
                  if (props.onChange) {
                    props.onChange(e);
                  }
                }}
                style={style ? style : {}}
                className={`w-[24px] h-[22px] rounded-md text-[#8456bb] ${
                  props.rules && errors && err
                    ? "border-red-600"
                    : "border-gray-100"
                }  focus:shadow-none`}
              />
              <span className="px-2 text-[17px] xl:text-[20px]">{title}</span>
            </label>
          </div>
        )}
      />
    </div>
  );
});
export default RadioInputField;

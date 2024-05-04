import React, { useState } from "react";
import { useController, Controller } from "react-hook-form";
import _ from "lodash";
import {
  CountryField,
  StateField,
  VisitorAPIComponents,
} from "react-country-state-fields";

const ReactCountryField = React.forwardRef((props, ref) => {
  const [selected, setSelected] = useState([]);
  const [country, setCountry] = useState({}); // the selected country
  const [state, setState] = useState({}); // the selected state
  const visitorApiPrjectId = "CRM"; // assign your project ID here
  const {
    title,
    style,
    label,
    type,
    errors,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    menuPlacement,
    ellipses,
    value,
    placeHolder,
    ...others
  } = props;
  const { field, fieldState, formState } = useController(props);
  let err = _.get(errors, props.name);
  const handleOnChange = (value) => {
    // field.onChange(value);
    setSelected(value);
    field.onChange(value);
  };
  return (
    <div className="mb-5">
      <Controller
        name={props?.name}
        rules={props?.rules}
        control={props?.control}
        defaultValue={defaultValue}
        render={({ field: { onChange } }) => (
          <>
            {label && (
              <label
                for={props?.name}
                class="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
              >
                {label}
              </label>
            )}
            <VisitorAPIComponents
              projectId={visitorApiPrjectId}
              handleCountryChange={(countryObj) => {
                setCountry(countryObj);
                onChange(countryObj?.code);
              }}
              handleStateChange={(stateObj) => setState(stateObj)}
            >
              <CountryField
                label="Country/Territory"
                style={{ height: "10px" }}
              ></CountryField>
              {/* <StateField label="State/Province"></StateField> */}
            </VisitorAPIComponents>
          </>
        )}
      />
      {props.rules && err && props.rules && err?.message ? (
        <p className=" fs-6 p-1 text-danger" id="email-error">
          {props.rules && err && props.rules && err?.message}
        </p>
      ) : (
        ""
      )}
    </div>
  );
});

ReactCountryField.displayName = "ReactCountryField";
export default ReactCountryField;

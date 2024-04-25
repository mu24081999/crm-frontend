import React, { useEffect, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useController, Controller } from "react-hook-form";

const ReactSignaturePad = React.forwardRef((props, ref) => {
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
  const signatureRef = useRef();
  // useEffect(() => {
  //   // Set default value when component mounts
  //   if (defaultValue && signatureRef.current) {
  //     // Assuming defaultValue is a data URL
  //     signatureRef.current.fromDataURL(defaultValue);
  //   }
  // }, [defaultValue]);
  useEffect(() => {
    if (defaultValue) field.onChange(defaultValue);
  }, [defaultValue, field]);

  // Function to save the signature
  const saveSignature = (onChange) => {
    const signatureData = signatureRef.current.toDataURL(); // Convert to data URL
    onChange(signatureData);
    console.log("🚀 ~ saveSignature ~ signatureData:", signatureData);
  };

  return (
    <div className="">
      <Controller
        name={props?.name}
        control={props?.control}
        rules={props?.rules}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <SignatureCanvas
            {...field}
            // ref={ref}
            clearOnResize
            penColor="green"
            ref={signatureRef}
            canvasProps={{
              width: 400,
              height: 200,
              className: "signature-canvas",
            }}
            onEnd={() => saveSignature(onChange)}
          />
        )}
      />
    </div>
  );
});

export default ReactSignaturePad;

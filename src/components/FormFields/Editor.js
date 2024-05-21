import React, { useState, useRef, useEffect } from "react";
import { useController, Controller } from "react-hook-form";
import _ from "lodash";
import "./editor.css";
import { Editor } from "@tinymce/tinymce-react";

const EditorField = React.forwardRef((props, ref) => {
  const {
    field,
    // fieldState
  } = useController(props);

  const [focusState, setFocusState] = useState(false);
  const [filedType, setFieldType] = useState("");
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const {
    title,
    style,
    isHighLight = false,
    type,
    errors,
    defaultValue,
    customStyle,
    onChange,
    ellipses,
    label,
    ...others
  } = props;
  let err = _.get(errors, props.name);
  useEffect(() => {
    if (type && type !== "") {
      setFieldType(type);
    }
  }, [type]);
  return (
    <div className="w-full mb-5">
      <div
        className={`${style ? "bg-white" : ""}  ${
          props?.rules && err
            ? "focus-within:border-red-600 border-red-600"
            : "focus-within:border-teal-c-900"
        }`}
      >
        <Controller
          name={props?.name}
          control={props?.control}
          rules={props?.rules}
          className="form-group"
          defaultValue={defaultValue !== "" ? defaultValue : ""}
          render={({ field }) => {
            return (
              <div className="" style={{ height: "280px", overflow: "hidden" }}>
                {label && <label class="form-label-group">{label}</label>}
                <Editor
                  {...props}
                  {...others}
                  apiKey="tnm05u4rxvm3tav3sjqqew5pngxe7zeju5e2zfh392oi034c"
                  onKeyUp={(e) => {
                    setFieldType("");
                    field.onChange(editorRef.current.getContent());
                  }}
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  initialValue={
                    (filedType === "edit" && field.value) ||
                    "<p>Put your content here.</p>"
                  }
                  init={{
                    height: 300,
                    menubar: false,
                    // plugins: [
                    //   "advlist autolink lists link image charmap print preview anchor",
                    //   "searchreplace visualblocks code fullscreen",
                    //   "insertdatetime media table paste code help wordcount",
                    // ],
                    // toolbar:
                    // "undo redo | formatselect | " +
                    // "bold italic backcolor | alignleft aligncenter " +
                    // "alignright alignjustify | bullist numlist outdent indent | " +
                    // "removeformat | help",
                    plugins: [
                      "a11ychecker advcode casechange formatpainter",
                      "linkchecker autolink lists checklist",
                      "media mediaembed pageembed permanentpen",
                      "powerpaste table advtable tinymcespellchecker",
                    ],
                    toolbar:
                      "formatselect | fontselect | bold italic strikethrough forecolor backcolor formatpainter | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | link insertfile image | removeformat | code | addcomment | checklist | casechange",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }, .tox-statusbar{display:none}",
                  }}
                />
              </div>
            );
          }}
        />
        <div
          className={`pointer-events-none absolute ml-2 left-0 duration-300 origin-0 mr-2 inline-block px-1 font-normal  ${
            props?.rules && err ? "text-red-600" : "text-gray-600"
          }  ${
            focusState || !field.value === "" || field.value === "0"
              ? "-top-2 duration-300 bg-[white] text-xs rounded-lg"
              : `top-2 duration-300 text-base xl:top-1 ${
                  ellipses &&
                  "w-[98%] text-ellipsis overflow-hidden whitespace-nowrap"
                }`
          } 
            ${isHighLight && " bg-highLight  "}  
            `}
        >
          {/* {title} {props?.rules?.required?.value === true && <span className="text-red-500 mt-10">*</span>} */}
        </div>
      </div>
      {props.rules && err && (
        <p className="text-xs p-1 text-danger" id="email-error">
          {props.rules && err && props.rules && err?.message}
        </p>
      )}
    </div>
  );
});

EditorField.displayName = "EditorField";

export default EditorField;

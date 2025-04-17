import React from "react";
import { InputPropsType } from "@/types";

function Input({
  name,
  label,
  value,
  disabled,
  required = true,
  type = "text",
  onChange,
  onChangeTextEffect,
  onIconClick,
  iconClickEffect,
  placeholder,
  Icon1,
  Icon2,
  labelStyle = "text-xl",
  labelGap = "space-y-2",
}: InputPropsType) {
  const isIconPresent = Icon1 && Icon2;
  const showPassword = iconClickEffect ? type : "password";
  const inputFieldType = isIconPresent ? showPassword : type;
  const inputStyles = "disabled:placeholder:text-slate-300/70 disabled:text-slate-300/70 text-slate-600 placeholder:text-slate-300 w-full h-12 px-3 xs:max-2xl:h-10 border rounded-md outline-4 xs:max-md:outline-2 outline-black/30 outline-offset-4 xs:max-md:outline-offset-2"
  return (
    <div className={` ${labelGap} xs:max-md:space-y-0`}>
      <label htmlFor={name} className={`${labelStyle} xs:max-md:text-base`}>
        - {label}
      </label>
      <div className="relative">
        {
        // value ? (
          <input
          disabled={disabled}
            value={value}
            required={required}
            id={name}
            name={name}
            spellCheck={false}
            onChange={onChange}
            type={inputFieldType}
            placeholder={placeholder ? placeholder : ""}
            className={`${inputStyles}`}
          />
        // ) : (
        //   <input
        //   disabled={disabled}
        //     required={required}
        //     id={name}
        //     name={name}
        //     spellCheck={false}
        //     onChange={onChange}
        //     type={inputFieldType}
        //     placeholder={placeholder ? placeholder : ""}
        //     className={`${inputStyles}`}
        //   />
        // )
        }

        {isIconPresent && (
          <div className="absolute top-0 right-0 size-12 xs:max-2xl:size-10 hover:bg-slate-200 rounded-r-md">
            <button
              onClick={onIconClick}
              type="button"
              className="size-full flex items-center justify-center"
            >
              {iconClickEffect ? (
                <Icon1 strokeWidth={1} />
              ) : (
                <Icon2 strokeWidth={1} />
              )}
            </button>
          </div>
        )}
      </div>
      {<p className="text-slate-400 xs:max-md:text-sm">{onChangeTextEffect}</p>}
    </div>
  );
}

export default Input;

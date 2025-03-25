import React from "react";

const Button = ({
  type,
  text,
  className,
  handleClick,
  onClick,
  id,
  disabled,
  ...props
}) => {

  return (
    <button
      className={`${className}`}
      id={id}
      type={type}
      {...props}
      onClick={onClick || handleClick}
      disabled={disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;

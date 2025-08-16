const Button = ({
  disabled = false,
  onClick = () => {},
  className = "",
  children,
}) => {
  return (
    <button
      className={`py-2 px-4 text-neutral-50 rounded-md hover:opacity-90 ${className} ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-primary cursor-pointer"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

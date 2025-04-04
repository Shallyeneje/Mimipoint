import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const PasswordInput = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <Input
        value={value}
        onChange={onChange} 
        type={showPassword ? "text" : "password"}
        className="w-full placeholder:text-[#667085] pr-10"
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#667085]"
      >
        {showPassword ? (
          <AiFillEyeInvisible size={20} />
        ) : (
          <AiFillEye size={20} />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;

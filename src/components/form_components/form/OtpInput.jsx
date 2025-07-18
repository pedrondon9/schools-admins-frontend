// components/inputs/OtpInput.jsx
import React, { useRef } from "react";
import { Box, TextField } from "@mui/material";

const OtpInput = ({ length = 6, onChange }) => {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // solo dígitos
    if (value) {
      e.target.value = value[0]; // solo un carácter
      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }

    triggerOtpChange();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const triggerOtpChange = () => {
    const otp = inputsRef.current.map((input) => input?.value).join("");
    onChange?.(otp);
  };

  return (
    <Box sx={{ display: "flex", gap: 1, justifyContent: "center", mt: 2 }}>
      {Array.from({ length }).map((_, index) => (
        <TextField
          key={index}
          inputRef={(el) => (inputsRef.current[index] = el)}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          size="small"
          inputProps={{
            maxLength: 1,
            style: {
              textAlign: "center",
              fontSize: "20px",
              width: "14px",
              height: "10px",
            },
          }}
        />
      ))}
    </Box>
  );
};

export default OtpInput;

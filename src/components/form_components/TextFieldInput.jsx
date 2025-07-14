
import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const TextFieldInput = ({
  name,
  label,
  type = "text",
  register,
  validation,
  error,
  helperText,
  startIcon,
  showPassword = false,
  togglePasswordVisibility,
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      type={type === "password" && !showPassword ? "password" : type}
      {...register(name, validation)}
      error={!!error}
      sx={{mb:1}}
      helperText={helperText}
      size="small"
      InputProps={{
        startAdornment: startIcon && (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ),
        /*
        endAdornment:
          type === "password" ? (
            <InputAdornment position="end">
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null,
        */
      }}
    />
  );
};

export default TextFieldInput;

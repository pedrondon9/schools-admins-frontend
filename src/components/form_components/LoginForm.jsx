// components/form/ReusableForm.jsx
import React from "react";
import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import TextFieldInput from "./TextFieldInput";
import FormAlert from "./FormAlert";
import FormImage from "./FormImage";
import ExternalLink from "./ExternalLink";

const LoginForm = ({
    onSubmit,
    handleSubmit,
    register,
    errors,
    fields = [],
    showPassword,
    togglePasswordVisibility,
    errorInit,
    errorInitMessage,
    loading,
    buttonLabel = "Submit",
    imageUrl,
    imageAlt,
    linkUrl,
    linkText,
}) => {
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
            }}
        >
            {imageUrl && <FormImage src={imageUrl} alt={imageAlt} />}

            {fields.map((field) => (
                <Box key={field.name} sx={{ width: "95%", mt: 2 }}>
                    <TextFieldInput
                        name={field.name}
                        label={field.label}
                        type={field.type}
                        register={register}
                        validation={field.validation}
                        error={errors?.[field.name]}
                        helperText={errors?.[field.name]?.message}
                        startIcon={field.startIcon}
                        showPassword={showPassword}
                        togglePasswordVisibility={togglePasswordVisibility}
                    />
                </Box>
            ))}

            {errorInit && (
                <Box sx={{ width: "95%", mt: 2 }}>
                    <FormAlert message={errorInitMessage} />
                </Box>
            )}

            <Box sx={{ width: "95%", mt: 2 }}>
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    size="small"
                >
                    {buttonLabel}
                </LoadingButton>
            </Box>

            {linkUrl && <ExternalLink url={linkUrl} text={linkText} />}
        </form>
    );
};

export default LoginForm;

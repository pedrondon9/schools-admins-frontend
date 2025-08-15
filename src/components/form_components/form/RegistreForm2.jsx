import React from 'react';
import { Box, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import TextFieldInput from '../TextFieldInput';
import FormAlert from '../FormAlert';
import FormImage from '../FormImage';
import ExternalLink from '../ExternalLink';
import SelectInput from '../SelectInput';
import FieldImageInput from '../fieldImage';
import { Controller, useForm } from 'react-hook-form';

const RegistreForm2 = ({
  onSubmit,
  onChange,
  handleSubmit,
  register,
  errors,
  fields = [],
  showPassword,
  togglePasswordVisibility,
  errorInit,
  errorInitMessage,
  loading,
  buttonLabel = 'Submit',
  imageUrl,
  imageAlt,
  linkUrl,
  linkText,
  setArrayFiles,
  text,
}) => {
  const { control } = useForm();



  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >



      {fields.map((fld) => (
        <Box key={fld.name} sx={{ width: '95%', mt: 2 }}>
          {fld.type === 'select' || fld.type === 'file' ? (
            <>
              {fld.type === 'select' ? (
                <SelectInput
                key={fld.name}
                  name={fld.name}
                  label={fld.label}
                  options={fld.options}
                  register={register}
                  validation={fld.validation}
                  error={errors?.[fld.name]}
                />
              
              ) : (
                <Controller
                  name="imagen1"
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <FieldImageInput
                      label={fld.label}
                      onFileChange={(file) => {
                        setArrayFiles(file);
                      }}
                    />
                  )}
                />
              )}
            </>
          ) : (
            <TextFieldInput
              name={fld.name}
              label={fld.label}
              type={fld.type}
              register={register}
              validation={fld.validation}
              error={errors?.[fld.name]}
              helperText={errors?.[fld.name]?.message}
              //startIcon={field?.startIcon}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />

          )}
        </Box>
      ))}

      {errorInit && (
        <Box sx={{ width: '95%', mt: 2 }}>
          <FormAlert message={errorInitMessage} />
        </Box>
      )}

      <Box sx={{ width: '95%', mt: 2 }}>
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

export default RegistreForm2;

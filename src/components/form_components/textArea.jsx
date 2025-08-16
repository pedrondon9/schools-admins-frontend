import { TextareaAutosize } from '@mui/base';
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';

const TextArea = ({
    name,
    label,
    type = 'text',
    register,
    validation,
    error,
    helperText,
    startIcon,
    showPassword = false,
    onChange,
    togglePasswordVisibility,
}) => {
    return (
        <>
            <FormControl fullWidth error={!!error}>

                <TextareaAutosize
                
                    name={name} placeholder={label}
                    style={{ width: '100%', padding: '8px', fontSize: '14px',marginBlock:'5px',height:'50px' }}
                    {...register(name, validation)}

                />
            </FormControl>

        </>
    )
};

export default TextArea;
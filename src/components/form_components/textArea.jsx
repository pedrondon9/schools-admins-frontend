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

                <TextareaAutosize
                    error={!!error}
                    name={name} placeholder={label}
                    style={{ width: '100%', padding: '8px', fontSize: '14px' }}
                    {...register(name, validation)}

                />

        </>
    )
};

export default TextArea;
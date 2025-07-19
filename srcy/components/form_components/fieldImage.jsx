import React, { useRef } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Button,
  styled,
  Box,
  Typography,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

const FieldImageInput = ({ label, onFileChange }) => {
  const [previImage, setPreviImage] = React.useState(null);

  const inputRef = useRef();
  const [fileName, setFileName] = React.useState('');

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
    getImgUser(e.target.files);
  };

  const getImgUser = (e) => {
    const arrayImg = ['jpg', 'png', 'jpeg', 'JPG', 'PNG', 'JPEG'];
    const WIDTH = 300;

    if (e[0]) {
      const imgExtension = e[0].name.split('.')[e[0].name.split('.').length - 1];

      if (arrayImg.includes(imgExtension)) {
        const reader = new FileReader();
        reader.readAsDataURL(e[0]);
        reader.onload = (event) => {
          let img_url = event.target.result;
          //console.log(img_url)
          let image = document.createElement('img');
          image.src = img_url;
          image.onload = async (e) => {
            //COMENZANDO CON LA REDUCCION DEL TAMAÑO DEL IMAGEN
            let canvas = document.createElement('canvas');
            let ratio = WIDTH / e.target.width;
            canvas.width = WIDTH;
            canvas.height = e.target.height * ratio;
            //crear objeto canvas
            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            let new_img_url = context.canvas.toDataURL('image/png', 100); //obtencion del imagen en base64
            setPreviImage(new_img_url);

            //VOLVER A CONVERTIR LA IMAGEN EN FORMATO BLOB ES DECIR PASMOS DE "base64 ----> blob"
            const img_fetch = await fetch(`data:image/png;base64,${new_img_url.split(',')[1]}`);
            const img_convert_to_blob = await img_fetch.blob('image/png');

            onFileChange(img_convert_to_blob);
          };
        };
      } else {
      }
    } else {
    }
  };

  return (
    <>
      <Box>
        <input
          type="file"
          accept="jpg,.png,.jpeg,.JPG,.PNG,.JPEG"
          ref={inputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <Button variant="outlined" startIcon={<CloudUpload />} onClick={handleClick}>
          {label || 'Subir Imagen'}
        </Button>
        {fileName && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Archivo seleccionado: {fileName}
          </Typography>
        )}
      </Box>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <FormControl sx={{ mt: 1, width: '20%', justifyItems: 'center' }} size="small">
          {previImage ? <img src={previImage} alt="" /> : <></>}
        </FormControl>
      </div>
    </>
  );
};

export default FieldImageInput;

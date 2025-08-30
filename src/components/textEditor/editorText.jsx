import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import React, { use, useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "katex/dist/katex.min.css";
import AppContext from "../../contexts/ServiceContext";
import toast from 'react-hot-toast';
import { Put } from "./put";
import { set } from "date-fns";

export default function MyEditor({ id, dataId,description,url,selected }) {
    const { AxiosConfigsToken, dataUser, editCourseId, getCourseId, getWithId } = React.useContext(AppContext);

    const [value, setValue] = useState("");
    const [loading, setLoad] = React.useState(false); //estado para activar el spinner del boton submit


    const modulsses = {
        toolbar: {
            container: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"], // limpiar formato
            ],
            handlers: {
                image: function () {
                    const range = this.quill.getSelection(); // guardamos el cursor
                    const input = document.createElement("input");
                    input.setAttribute("type", "file");
                    input.setAttribute("accept", "image/*");
                    input.click();

                    input.onchange = async () => {
                        const file = input.files[0];
                        if (file) {
                            // subir la imagen a tu backend o a un servicio (ej: Cloudinary)
                            const formData = new FormData();
                            formData.append("file", file);

                            // ejemplo de URL simulada:
                            const url = URL.createObjectURL(file);

                            // restauramos el cursor y luego insertamos
                            this.quill.setSelection(range.index, range.length);
                            this.quill.insertEmbed(range.index, "image", url);
                        }
                    };
                },
            }

        },
    }
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"], // limpiar formato
        ],

    };

    const modulesff = {
        toolbar: {
            container: [
                ["bold", "italic", "underline"],
                ["image"]
            ],
            handlers: {
                image: function () {
                    const input = document.createElement("input");
                    input.setAttribute("type", "file");
                    input.setAttribute("accept", "image/*");
                    input.click();

                    input.onchange = async () => {
                        const file = input.files[0];
                        if (file) {
                            // ejemplo: subir a tu backend o usar URL local
                            const url = URL.createObjectURL(file);

                            // importante: obtener el range en este momento
                            const range = this.quill.getSelection(true);

                            if (range) {
                                this.quill.insertEmbed(range.index, "image", url);
                                // opcional: mover cursor a la derecha de la imagen
                                this.quill.setSelection(range.index + 1);
                            }
                        }
                    };
                }
            }
        }
    };

    const onSubmit = async () => {
        // Aquí puedes manejar el envío del contenido del editor
        if(selected === 'course'|| selected === 'especialities'){
            await Put(AxiosConfigsToken, setLoad,{description:value,id: id} , id, toast,selected)
        }
        if(selected === 'events'){
            await Put(AxiosConfigsToken, setLoad,{content:value,id: id} , id, toast,selected)
        }
        //await getCourseId(id)
        await getWithId(url, selected)

    }

    useEffect(() => {
        if (description) {
            setValue(description)
        }
    }
        , [dataId])


    return (
        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", width: { xs: '100%', sm: '100%', md: '900px' }}}>
            <Typography variant="h6" component="h6" sx={{ mb: 2, mt: 2, textAlign: "center", fontFamily: 'sans-serif', }}>
                Agrega o modifca la descripcion
            </Typography>
            <Box sx={{ display: "none" }}>
                <div
                    style={{
                        border: "1px solid #ccc",
                        marginBottom: "10px",
                        //paddingInline: "10px",
                        borderRadius: "8px",
                        //background: "#fafafa",
                    }}
                    dangerouslySetInnerHTML={{ __html: value }}
                />
            </Box>
            <Box sx={{ width: "100%"}}>

                <ReactQuill
                    modules={modules}
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    placeholder="Escribe algo aquí..."
                    style={{ marginBottom: "50px",  width: "100%",backgroundColor: "#fafafa"}}
                />
            </Box>

            <Box sx={{ mt: 2 }}>
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    size="small"
                    onClick={onSubmit}
                >
                    Actualizar
                </LoadingButton>
            </Box>
        </Box>
    );
}

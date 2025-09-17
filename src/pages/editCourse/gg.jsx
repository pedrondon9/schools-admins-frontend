const gg = () => {
  return (
    <>
      <Typography
        sx={{
          textAlign: 'center',
          fontFamily: 'sans-serif',
          //fontSize: '14px',
          //color: "#3e2723",
        }}
        variant="h6"
        component="h6"
      >
        Actulizar {dataUserSelected?.fullname}
      </Typography>

      <Box sx={{ width: '95%', mt: 2 }}>
        <FormControl fullWidth error={!!errors.fullname} sx={{ mb: 2 }}>
          <TextField
            name="fullname"
            size="small"
            defaultValue={dataUserSelected.fullname}
            type="text"
            id="outlined-basic"
            label="Nombre completo"
            variant="outlined"
            InputLabelProps={{
              shrink: true, // Mantiene el label arriba
            }}
            {...register('fullname', {
              required: false,
              minLength: 1,
            })}
          />
        </FormControl>
        <FormControl error={!!errors.email} fullWidth sx={{ mb: 2 }}>
          <TextField
            name="email"
            defaultValue={dataUserSelected.email}
            type="email"
            size="small"
            id="outlined-basic"
            InputLabelProps={{
              shrink: true, // Mantiene el label arriba
            }}
            label="Correo"
            variant="outlined"
            {...register('email', {
              required: false,
              minLength: 1,
            })}
          />
        </FormControl>
        <FormControl error={!!errors.phone} fullWidth sx={{ mb: 2 }}>
          <TextField
            name="phone"
            defaultValue={dataUserSelected.phone}
            type="phone"
            size="small"
            id="outlined-basic"
            label="Telefono"
            variant="outlined"
            InputLabelProps={{
              shrink: true, // Mantiene el label arriba
            }}
            {...register('phone', {
              required: false,
              minLength: 1,
            })}
          />
        </FormControl>

        <FormControl error={!!errors.dni} fullWidth sx={{ mb: 2 }}>
          <TextField
            name="dni"
            defaultValue={dataUserSelected.dni}
            type="text"
            size="small"
            id="outlined-basic"
            label="DNI o pasaporte"
            InputLabelProps={{
              shrink: true, // Mantiene el label arriba
            }}
            variant="outlined"
            {...register('dni', {
              required: 'Campo requerido',
              minLength: 1,
            })}
          />
        </FormControl>

        <FormControl error={!!errors.birthdate} fullWidth sx={{ mb: 2 }}>
          <TextField
            name="birthdate"
            defaultValue={new Date(dataUserSelected.birthdate).toISOString().split('T')[0]}
            InputLabelProps={{
              shrink: true, // Mantiene el label arriba
            }}
            type="date"
            size="small"
            id="outlined-basic"
            label="Fecha de nacimiento"
            variant="outlined"
            {...register('birthdate', {
              required: 'Campo requerido',
              minLength: 1,
            })}
          />
        </FormControl>

        <FormControl fullWidth size="small" sx={{ mt: 2 }}>
          <InputLabel id="roles-label">Tipo de usuario</InputLabel>
          <Controller
            name="roles"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Select
                defaultValue={dataUserSelected.role._id}
                label={'Tipo de usuario'}
                labelId="roles-label"
                {...field} // incluye value + onChange de RHF
              >
                {roles.map((opt) => (
                  <MenuItem key={opt._id} value={opt._id}>
                    {opt.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        {userTypeSelected === 'admin' ? (
          <FormControl error={!!errors.posGalery} fullWidth sx={{ mt: 2 }}>
            <TextField
              name="posGalery"
              defaultValue={dataUserSelected.posGalery}
              type="number"
              size="small"
              id="outlined-basic"
              InputLabelProps={{
                shrink: true, // Mantiene el label arriba
              }}
              label="Posicion en la galeria"
              variant="outlined"
              {...register('posGalery', {
                required: false,
                minLength: 1,
              })}
            />
          </FormControl>
        ) : (
          <></>
        )}
        <FormControl fullWidth size="small" sx={{ mt: 2 }}>
          <InputLabel id="roles-label">Genero del usuario</InputLabel>
          <Controller
            name="sex"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Select
                defaultValue={dataUserSelected.sex}
                label={'Genero del usuario'}
                labelId="roles-label"
                {...field} // incluye value + onChange de RHF
              >
                <MenuItem key={'hombre'} value={'hombre'}>
                  Hombre
                </MenuItem>
                <MenuItem key={'mujer'} value={'mujer'}>
                  Mujer
                </MenuItem>
              </Select>
            )}
          />
        </FormControl>
        <FormControl fullWidth error={!!errors.info} sx={{ mt: 2, mb: 2 }}>
          <TextareaAutosize
            defaultValue={dataUserSelected.info}
            name={'info'}
            placeholder={''}
            style={{
              width: '100%',
              padding: '8px',
              fontSize: '14px',
              marginBlock: '5px',
              height: '50px',
            }}
            {...register('info', { required: false })}
          />
        </FormControl>

        <Controller
          name="imagen1"
          control={control}
          render={({}) => (
            <FieldImageInput
              label={'Foto del usuario'}
              onFileChange={(file) => {
                setArrayFiles(file);
              }}
            />
          )}
        />

        {!arrayFiles ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FormControl sx={{ mt: 1, width: '20%', justifyItems: 'center' }} size="small">
              <img src={previImageUsers} alt="" />
            </FormControl>
          </div>
        ) : (
          <></>
        )}
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
            Actualizar
          </LoadingButton>
        </Box>
      </Box>
    </>
  );
};

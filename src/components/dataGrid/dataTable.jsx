import React, { useState, useMemo, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DataGrid, esES, GridToolbar } from '@mui/x-data-grid';
import useSWR from 'swr';

import { Get } from './get';
import SkeletonTable from '../skelholder/skelethonTable';
import AppContext from '../../contexts/ServiceContext';
import { NavLink } from 'react-router-dom';
import { CardEvents } from '../cardEvents';
import { Search } from '@mui/icons-material';

//'startDate', 'endDate', 'price', 'format'

function DataTable({ url, columns1, sx, VISIBLE_FIELDS, urlId }) {
  const { AxiosConfigsToken } = React.useContext(AppContext);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useSWR(url, () => Get(AxiosConfigsToken, url), {});

  const columns = React.useMemo(
    () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [columns1]
  );

  if (isLoading) return <SkeletonTable />;

  const filteredRows = data?.response?.docs?.filter((row) =>
    Object.values(row).some((value) =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );
  return (
    <>
      <FormControl sx={{ marginBlock: 3, width: '100%',display:'flex', alignItems:'center',justifyContent:'center' }}>
        <TextField
          label="Buscar en todas las columnas"
          variant="outlined"
          size="small"
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ maxWidth: 400 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid
          spacing={2}
          //bgcolor="backgroundColorPage"
          container
          sx={{ justifyContent: 'center', }}
        >
          {filteredRows ? (
            <>
              {filteredRows?.map((x, y) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
                  <CardEvents x={x} modal={<Box></Box>} urlId={urlId} />
                </Grid>
              ))}
            </>
          ) : (
            <></>
          )}
        </Grid>
      </div>
    </>
  );
}

export default DataTable;

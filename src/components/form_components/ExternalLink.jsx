

import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const ExternalLink = ({ url, text }) => {
  return (
    <Box sx={{ width: "95%", mt: 3, display: "flex" }}>
      <Typography
        sx={{
          textAlign: "left",
          fontFamily: "sans-serif",
          fontSize: "14px",
          //color: "#3e2723",
        }}
        variant="p"
        component="p">
        {text}
        <Link
          component={NavLink}
          to={url}
          underline="none"
          sx={{
            //textAlign: "right",
            fontFamily: "sans-serif",
            marginLeft: "5px",
            //fontSize: "12px",
            //color: "#3e2723",
          }}
        >
          Aqui
        </Link>
      </Typography>


    </Box>
  );
};

export default ExternalLink;

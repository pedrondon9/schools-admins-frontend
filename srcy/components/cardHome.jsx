import React, { useRef } from 'react';
import { Box, Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import { PeopleAlt } from '@mui/icons-material';
import { useCountUp } from 'react-countup';
import CountUp from 'react-countup';

function CardHome({ IconHome, colorIcon, titleCard, cantidad, colors, colorText }) {
  const countUpRef = React.useRef(null);
  const { start, pauseResume, reset, update } = useCountUp({
    ref: countUpRef,
    start: 0,
    end: 1234567,
    delay: 1000,
    duration: 5,
    onReset: () => {},
    onUpdate: () => {},
    onPauseResume: () => {},
    onStart: ({ pauseResume }) => {},
    onEnd: ({ pauseResume }) => {},
  });
  return (
    <Grid item xs={12} sm={12} md={6} lg={IconHome ? 4 : 6} xl={IconHome ? 3 : 6}>
      <Card sx={{ width: '100%', backgroundColor: colors }}>
        <CardContent>
          <Box
            /*
                            sx={{
                                height: "160px",
                                width: {
                                    xs: "100%",
                                    sm: "100%",
                                    md: '49.5%',
                                    lg: "32.5%",
                                    xl: "24.5%"
                                },
                                marginBottom: "10px",
                                //marginRight:{xs:"0px",sm:"0px",md:"10px",lg: "10px",xl:"10px"},
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                bgcolor: "#fff",
                            }}
                            */

            sx={{
              height: IconHome ? '160px' : '80px',
              width: '100%',
              //marginBottom: "10px",
              //marginRight:{xs:"0px",sm:"0px",md:"10px",lg: "10px",xl:"10px"},
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: colors,
            }}
          >
            <div
              style={{
                width: '95%',
                height: '75%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors,
              }}
            >
              {IconHome ? (
                <div
                  style={{
                    width: '100%',
                    height: '45%',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: colors,
                  }}
                >
                  {IconHome && <IconHome sx={{ fontSize: 40, color: colorIcon }} />}
                </div>
              ) : (
                <></>
              )}

              <div
                style={{
                  width: '100%',
                  height: '55%',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h8" sx={{ color: colorText, textAlign: 'center' }}>
                  {titleCard}
                </Typography>
                <Typography
                  variant="span"
                  sx={{
                    fontSize: { xs: 25, sm: 28, xl: 30 },
                    color: '#212121',
                    textAlign: 'center',
                    fontWeight: '700',
                    fontFamily: 'serif',
                  }}
                >
                  {cantidad}
                </Typography>
              </div>
            </div>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default CardHome;

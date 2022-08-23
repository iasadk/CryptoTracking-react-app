import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App';
import { Line } from 'react-chartjs-2';
import { Box, Stack } from '@mui/material'
import { LinearProgress, Typography } from '@mui/material';
import { Chart as ChartJs } from 'chart.js/auto'
const CoinChart = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1)
  const { currency } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true)


  const fetchHistoricInfo = async () => {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`);

    const data = await res.json();
    setHistoricData(data.prices);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchHistoricInfo()


  }, [currency, days])



  const handleDays = (days) => {
    setDays(days)
  }
  return (
    <div style={{
      width: "100%"
    }}>
      {
        isLoading ? <Box>
          <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
            <LinearProgress color='secondary' />
          </Stack>
        </Box> : <Box sx={{
          px: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}>
          <Box my="2rem" py="1.5rem" sx={{
            borderTop: {
              xs: "1px solid #F8F1E5",
              lg: "none"
            }
          }}>
            <Typography variant="h1" sx={{
              color: "#F8F1E5",
              fontSize: {
                xs: "2rem",
                lg: "4rem"
              }
            }}>
              Visual Analysis
            </Typography>
          </Box>
          <Line
            data={
              {
                labels: historicData.map(data => {
                  const date = new Date(data[0]);
                  const time = date.getHours() > 12 ?
                    `${date.getHours() - 12}:${date.getMinutes()}PM` : `${date.getHours()}:${date.getMinutes()}AM`;

                  return days === 1 ? time : date.toLocaleDateString
                    ();
                }),
                datasets: [
                  {
                    data: historicData.map(data => data[1]),
                    label: `Price (Past ${days} Days in ${currency})`,
                    borderColor: "#F27300"
                  }
                ]

              }
            }
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />

          <Box sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            mt: "4rem"
          }}>
            <button style={{
              padding: "1rem 1.8rem",
              backgroundColor: days === 1 ? "#F27300" : "transparent",
              color: days === 1 ? "#000" : "#F27300",
              fontWeight: days === 1 ? "600" : "400",
              outline: "none",
              border: "2px solid #F27300",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: "pointer",
              marginBottom: "1rem"
            }} onClick={() => handleDays(1)}>
              24 Hours
            </button>
            <button style={{
              padding: "1rem 1.8rem",
              backgroundColor: days === 30 ? "#F27300" : "transparent",
              color: days === 30 ? "#000" : "#F27300",
              fontWeight: days === 30 ? "600" : "400",
              outline: "none",
              border: "2px solid #F27300",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: "pointer",
              marginBottom: "1rem"
            }} onClick={() => handleDays(30)}>
              30 Days
            </button>
            <button style={{
              padding: "1rem 1.8rem",
              backgroundColor: days === 90 ? "#F27300" : "transparent",
              color: days === 90 ? "#000" : "#F27300",
              fontWeight: days === 90 ? "600" : "400",
              outline: "none",
              border: "2px solid #F27300",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: "pointer",
              marginBottom: "1rem",

            }} onClick={() => handleDays(90)}>
              3 Months
            </button>
            <button style={{
              padding: "1rem 1.8rem",
              backgroundColor: days === 365 ? "#F27300" : "transparent",
              color: days === 365 ? "#000" : "#F27300",
              fontWeight: days === 365 ? "600" : "400",
              outline: "none",
              border: "2px solid #F27300",
              borderRadius: "4px",
              fontSize: "1rem",
              cursor: "pointer",
              marginBottom: "1rem"
            }} onClick={() => handleDays(365)}>
              1 Year
            </button>
          </Box>
        </Box>

      }
    </div>
  )
}

export default CoinChart
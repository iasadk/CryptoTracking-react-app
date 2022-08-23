import { Container, Box, getIconButtonUtilityClass } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../App'
import CoinChart from '../Components/CoinChart'
import CoinInfo from '../Components/CoinInfo'
import { Oval } from 'react-loader-spinner';

const CoinPage = () => {
    const { id } = useParams();
    const { currency } = useContext(AppContext);
    const [coin, setCoin] = useState();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const getCoinInfo = async () => {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
            const data = await res.json();
            setCoin(data);
            setIsLoading(false)
            // console.log(id, { data })
        }

        getCoinInfo();
    }, [])
    return (
        <Container maxWidth="100vw" disableGutters sx={{
            bgcolor: "#15161B",
            fontFamily: "Poppins",
            // border: "1px solid red",
            minHeight: "100%",
        }

        }>

            {
                isLoading ? <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{
                    minWidth: {
                        xs: "100%",
                        lg: "50%"
                    },
                    minHeight: "100%",
                }}>
                    <Oval color='#F27300' secondaryColor='#F8F1E5' />
                </Box> : <Box sx={{
                    display : "flex",
                    flexDirection : {
                        xs : "column",
                        lg  : "row"
                    }
                }}>
                    <CoinInfo coin={coin} />
                    <CoinChart coin={coin} />
                </Box>

            }

        </Container >
    )
}

export default CoinPage




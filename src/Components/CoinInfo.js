import { Box, Typography } from '@mui/material'
import React, { useContext } from 'react'
import parse from 'html-react-parser';
import { AppContext } from '../App';
import { numberWithComma } from './Gallary';

const CoinInfo = ({ coin }) => {
    const { currency } = useContext(AppContext);
    let lowerCaseCurrency = currency.toLowerCase();
    return (
        <Box sx={{
            maxWidth: {
                xs: "100%",
                lg: "30%"
            },
            maxHeight: "850px",
            borderRight: {
                lg: "1px solid #F8F1E5"
            },
            px: "1rem",
            overflowY: "scroll",
            '&::-webkit-scrollbar': {
                width: '0.4em'
            },
            
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#F8F1E5',
                borderRadius : "5px"
            }

        }}>
            <Box sx={{
                color: "#F8F1E5",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pt: "2rem"
            }}>
                <img src={coin?.image?.large} alt={coin.name} />
                <Typography variant="h2" sx={{
                    fontWeight: "400"
                }}>
                    {coin.name} 
                </Typography>
                <Typography variant="p" py="2rem" lineHeight="28px">
                    {coin?.description && parse(coin?.description?.en)}
                </Typography>
            </Box>
            <Box sx={{
                color: "#F8F1E5"
            }}>
                <Typography variant="p" textAlign="left" sx={{
                    fontSize: "1.5rem",
                    fontWeight: "600"
                }}>
                    Rank: <Typography variant="span" fontWeight="400" ml="1rem">
                        {coin.market_cap_rank}
                    </Typography><br />
                </Typography>
                <Typography variant="p" textAlign="left" sx={{
                    fontSize: "1.5rem",
                    fontWeight: "600"
                }}>
                    Current Price: <Typography variant="span" fontWeight="400" ml="1rem">
                        {currency === "INR" ? '₹' : "$"} {numberWithComma(coin.market_data.current_price[lowerCaseCurrency])}
                    </Typography><br />
                </Typography>
                <Typography variant="p" textAlign="left" sx={{
                    fontSize: "1.5rem",
                    fontWeight: "600"
                }}>
                    Market Cap: <Typography variant="span" fontWeight="400" ml="1rem">
                        {currency === "INR" ? '₹' : "$"} {numberWithComma(coin.market_data.market_cap[lowerCaseCurrency]).slice(0, -6)}M
                    </Typography> <br />
                </Typography>
            </Box>
        </Box>
    )
}

export default CoinInfo
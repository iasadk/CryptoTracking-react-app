import React, { useContext, useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';
import { Box, Stack, Typography } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AppContext } from '../App';
const handleDragStart = (e) => e.preventDefault();


export function numberWithComma(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const Gallery = () => {
    const [items, setItems] = useState([]);
    const {currency} = useContext(AppContext);
    let d;
    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                d = data.map((crypto, idx) => {
                    return (
                        <Link to={`/coins/${crypto.id}`} style={{ textDecoration: "none" }}>
                            <Stack direction="column" alignItems="center" justifyContent="center" sx={{
                                fontFamily: "Poppins"
                            }}>
                                <img key={idx} src={crypto.image} onDragStart={handleDragStart} role="presentation" style={{
                                    width: "90px"
                                }} alt="CRYPTO" />
                                <Box display="flex" alignItems="center" sx={{
                                    marginTop: "1rem",
                                    gap: ".7rem"

                                }}>
                                    <Typography variant="p" sx={{
                                        color: "white",

                                    }}
                                    >
                                        {crypto.name}
                                    </Typography>
                                    <Typography variant='span' sx={{
                                        color: `${crypto.market_cap_change_percentage_24h < 0 ? "red" : "green"}`,
                                        fontWeight: 600,
                                        marginRight: "1rem",
                                        display: "flex",
                                        alignItems: "center",



                                    }}>
                                        {crypto.market_cap_change_percentage_24h > 0 && <ArrowDropUpIcon />}
                                        {crypto.market_cap_change_percentage_24h < 0 && <ArrowDropDownIcon />}
                                        {crypto.market_cap_change_percentage_24h.toFixed(2)}%
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{
                                        color: "#F8F1E5",
                                        fontSize : "1.5rem"
                                    }}>
                                        {currency=="INR" ? "₹" : "$" } {numberWithComma(crypto.market_cap)}
                                    </Typography>

                                </Box>
                            </Stack>
                        </Link>
                    )
                })
                // console.log(items)
                setItems(d);
            })
            .catch(err => {
                return err;
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])
    return (

        <AliceCarousel mouseTracking items={items} autoPlay disableButtonsControls disableDotsControls infinite responsive={{
            0: {
                items: 1,
            },
            512: {
                items: 4
            }
        }} autoPlayInterval={1000} animationEasingFunction='ease' animationDuration={900} />
    );
}

export default Gallery;
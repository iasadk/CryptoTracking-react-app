import { TableContainer, Table, TableRow, TableHead, TableCell, TableBody, Box, Typography, Container, Pagination } from '@mui/material'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React, { useContext, useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { numberWithComma } from './Gallary';

const CoinTable = ({ search }) => {
    const { currency } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [coins, setCoins] = useState([])
    const [page, setPage] = useState(1)

    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setIsLoading(false)
                setCoins(data);
            })
            .catch(err => {
                setIsLoading(false)

                console.log(err)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency])

    const filterRecords = () => {
        return coins.filter((coin) => {
            return coin.name.toLowerCase().includes(search.toLowerCase()) || coin.symbol.toLowerCase().includes(search.toLowerCase())
        })
    }
    return (
        <Container maxWidth="xl">
            <TableContainer>
                {
                    isLoading ? <Box display="flex" justifyContent="center" >
                        <Oval color='#F27300' secondaryColor='#F8F1E5' />
                    </Box> :
                        <Table aria-label="simple table">
                            <TableHead sx={{
                                backgroundColor: "#F27300"
                            }}>
                                <TableRow>
                                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                        <TableCell
                                            style={{
                                                color: "#F8F1E5",
                                                fontSize: "1rem",
                                                fontWeight: "700",
                                            }}
                                            key={head}
                                            align={head === "Coin" ? "" : "right"}
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>

                            </TableHead>
                            <TableBody>
                                {filterRecords().slice((page - 1), (page - 1) * 10 + 10).map(row => {
                                    return (

                                        <TableRow key={row.name}>
                                            <Link to={`coins/${row.id}`}>
                                                <TableCell component="th"
                                                    scope="row"
                                                    style={{
                                                        display: "flex",
                                                        gap: 15,
                                                    }}>
                                                    <img src={row?.image} alt={row.symbol} height="50"
                                                    />
                                                    <div style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        color: "#F8F1E5",
                                                        fontFamily: "Poppins",
                                                        fontWeight: "600"
                                                    }}>
                                                        <span>
                                                            {row.symbol.toUpperCase()}
                                                        </span>
                                                        <span>
                                                            {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                            </Link>

                                            <TableCell align='right' style={{
                                                color: "#F8F1E5",
                                                fontFamily: "Poppins",

                                            }}>
                                                {currency == "INR" ? "₹" : "$"}
                                                {numberWithComma(row.current_price.toFixed(2))}
                                            </TableCell>
                                            <TableCell align='right' >

                                                <Typography variant='span' style={{
                                                    color: `${row.market_cap_change_percentage_24h < 0 ? "red" : "green"}`,
                                                    fontWeight: 600,
                                                    marginRight: "1rem",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    textAlign: "center",
                                                    justifyContent: "flex-end"



                                                }}>
                                                    {row.market_cap_change_percentage_24h > 0 && <ArrowDropUpIcon />}
                                                    {row.market_cap_change_percentage_24h < 0 && <ArrowDropDownIcon />}
                                                    {row.market_cap_change_percentage_24h.toFixed(2)}%
                                                </Typography>
                                            </TableCell>
                                            <TableCell align='right' style={{
                                                color: "#F8F1E5",
                                                fontFamily: "Poppins",
                                            }}>
                                                {currency == "INR" ? "₹" : "$"}
                                                {numberWithComma(
                                                    row.market_cap.toString().slice(0, -6)
                                                )}
                                                M
                                            </TableCell>

                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                }

            </TableContainer >
            <Pagination count={(filterRecords()?.length / 10).toFixed(0)} defaultPage={1} onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 450);
            }} style={{
                padding: 20,
                width: "100%",
                display: "flex",
                justifyContent: "center",
            }} sx={{
                "& .MuiPaginationItem-root": {
                    color: "#F27300",
                },
            }} />

        </Container>
    )
}

export default CoinTable
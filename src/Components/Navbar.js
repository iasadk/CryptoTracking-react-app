import React, { useContext} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, Select} from '@mui/material';
import { Link } from 'react-router-dom'
import { AppContext } from '../App';


const Navbar = () => {
    const {currency, setCurrency} = useContext(AppContext);
    const handleCurrency = (e)=>{
        setCurrency(e.target.value)
        console.log(e)
    }
    return (
        <AppBar position="static" sx={{
            backgroundColor: "#2F3130", height: {
                xs: "10vh"
            },
            display : "flex",
            alignItems: "center",
            flexDirection : "row"
        }}>
            <Container fixed>
                <Box display={"flex"} justifyContent="space-between" sx={{ marginTop: ".50rem" }}>
                    <Link to="/" style={{textDecoration : "none"}}>

                        <Typography variant='h4' color="#F27300" sx={{
                            fontSize: {
                                xs: "25px",
                                sm: "35px"
                            }
                        }} >
                            Crypto.io
                        </Typography>
                    </Link>

                    <Box>
                        <FormControl>
                            <Select variant='outlined' sx={{
                                width: "100px",
                                color: "#F27300",
                                border: "1px solid #F27300",
                                height: "40px",
                                "& .MuiSvgIcon-root": {
                                    color: "#F27300",
                                },
                            }} value={currency} onChange={(e)=>handleCurrency(e)}>
                                <MenuItem value={"INR"}>INR</MenuItem>
                                <MenuItem value={"USD"}>USD</MenuItem>

                            </Select>
                        </FormControl>
                        <Button variant="text" sx={{
                            backgroundColor: "#F27300",
                            paddingX: "10px",
                            paddingY: "7px",
                            color: "#F8F1E5",
                            marginX: {
                                xs: "8px",
                                sm: "15px"
                            }
                        }}>
                            Login
                        </Button>
                    </Box>
                </Box>
            </Container>
        </AppBar >
    );
};
export default Navbar;

// color="#F27300"
// #2F3130 - Black
// #F8F1E5 - White
// ##F27300 - Orange
// #F9B931 - Yellow



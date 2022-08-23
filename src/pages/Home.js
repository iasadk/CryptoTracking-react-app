import React, { useState } from 'react'
import { Box, Container, Typography, TextField } from '@mui/material';
import heroImg from '../assests/hero-Img.jpg'
import Gallary from '../Components/Gallary';
import CoinTable from '../Components/CoinTable';


const Home = () => {
    const [search, setSearch] = useState("")
    const handleSearch = (e)=>{
        setSearch(e.target.value);
    }
    return (
        <div div className="App" >
            <Container sx={{
                backgroundImage: `url(${heroImg})`,
                height: "506px",
                objectPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                paddingY: "3rem"



            }} maxWidth="100%">
                <Typography variant='h2' sx={{
                    fontSize: {
                        xs: "1.5rem",
                        sm: "2rem",
                        md: "4rem"
                    },
                    fontWeight: "700",
                    fontFamily: "Poppins",
                    color: "#F8F1E5",
                }}>
                    Looking for Crypto ??
                </Typography>
                <Typography color="white" component="p" sx={{
                    paddingY: "1rem",
                    fontSize: {
                        xs: ".80rem",
                        sm: "1rem",
                        md: "1.2rem"
                    }
                }}>
                    Get All The Info Regarding Your Favorite Crypto Currency
                </Typography>

                <Box sx={{

                    margin: "auto",
                    width: {
                        xs: "100%",
                        md: "80%"
                    },
                    mt: "5rem",
                    display: "flex",
                    alignItems: "center"
                }}>
                    <Gallary />
                </Box>
            </Container>
            <Box component="section" sx={{
                bgcolor: "#2F3130",
                height: "100%"
            }}>
                <Box sx={{
                    width: "80%",
                    margin: "auto"
                }}>
                    <Typography variant="h4" sx={{
                        color: "#F8F1E5",
                        py: "2rem",
                        fontWeight: "600",
                        fontFamily: "Poppins",
                        fontSize: "2.5rem"
                    }}>
                        Crypto Price by Market Cap
                    </Typography>
                    <TextField label="Search for a Crypto Currency" sx={{
                        width: "100%",
                        marginBottom: "30px",
                        "& .MuiFormLabel-root": {
                            color: "#F8F1E5"
                        },
                        "& input" :{
                            color : "white",
                            outline : "1px solid white",
                            borderRadius : "4px",
                            
                        }

                    }} onChange={(e)=>handleSearch
                    (e)}/>
                    <CoinTable search={search}/>
                </Box>
            </Box>
        </div >
    )
}
export default Home;
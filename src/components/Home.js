import { CardMedia, Icon, IconButton } from "@mui/material";
import React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import axios from "axios";


export default function Home() {

    const [APIData, setAPIData] = useState([]);
    const getGamesUrl = 'https://65459389fe036a2fa9547cff.mockapi.io/GameList';

    useEffect(() => {
        axios.get(getGamesUrl).then(
            response => {
                return response.data;
            })
            .then(data => { setAPIData(data.sort((a, b) => { return b.Rating - a.Rating })) })
            .catch(error => console.log(error.message));

    }, [])

    return (
        <div className="marginLR">
            <h1 className="font-pages" style={{ marginBottom: '0' }}>Home</h1>

            <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                {APIData.map((game) => (
                    <Grid item xs={6} sm={4} md={3} key={game.id}>
                        <Card sx={{ maxWidth: 345, minHeight: 600 }} style={{ backgroundColor: "black", color: "white", position: "relative" }} >
                            <CardMedia
                                sx={{ height: 300 }}
                                image={game.Poster}
                                title={game.Title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: "600" }}>
                                    <Link to={`/detail/${game.id}`} className="name-home">
                                        {game.Title}
                                    </Link>
                                </Typography>

                                <Typography gutterBottom variant="h7" component="div">
                                    Author: {game.Author}
                                </Typography>

                                <Typography gutterBottom variant="h7" component="div">
                                    Kind: {game.Kind}
                                </Typography>

                                <Typography gutterBottom variant="h7" component="div">
                                    Price: {game.Price}$
                                </Typography>

                                <Typography gutterBottom variant="h7" component="div" style={{ bottom: "64px", position: "absolute" }}>
                                    <Rating name="read-only" value={game.Rating} readOnly />
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Link to={`/detail/${game.id}`} style={{ bottom: "24px", position: "absolute" }}>
                                    <Button size="small" style={{ fontWeight: "600" }} className="detail-btn">Detail
                                        <IconButton><Icon sx={{ color: 'white' }}>info</Icon></IconButton></Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}
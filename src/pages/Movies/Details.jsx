import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { API } from "../../config";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingBottom: theme.spacing(8),
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    height: 150,
  },
  cardContent: {
    flexGrow: 1,
  },
  cardDetail: {
    flexGrow: 1,
    fontWeight: "bold",
  },
}));

export default function DetailsMovie(props) {
  const id = props.match.params.id;
  const styles = useStyles();

  const [movie, setMovie] = useState([]);
  useEffect(() => {
    if (movie.length === 0) {
      API.get(`/movies/${id}`)
        .then((res) => setMovie(res.data))
        .catch((e) => console.log(e));
    }
  });

  return (
    <Container className={styles.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        <Grid item key={movie.id}>
          <Card>
            <CardMedia
              className={styles.cardMedia}
              image={movie.image_url}
              title={movie.title}
            />
            <CardContent className={styles.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {movie.title} ({movie.year})
              </Typography>
              <Typography style={{ textAlign: "justify" }}>
                {movie.description}
              </Typography>
            </CardContent>
            <CardContent className={styles.cardContent}>
              <Typography className={styles.cardDetail}>
                Genre: {movie.genre}
              </Typography>
              <Typography className={styles.cardDetail}>
                Release: {movie.year}
              </Typography>
              <Typography className={styles.cardDetail}>
                Rating: {movie.rating}
              </Typography>
              <Typography className={styles.cardDetail}>
                Duration: {movie.duration} minutes
              </Typography>
              <Typography className={styles.cardDetail}>
                Review: {movie.review}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { API } from "../../config";
import { Link } from "react-router-dom";

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
}));

export default function CardsMovie() {
  const styles = useStyles();

  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (movies.length === 0) {
      API.get("/movies")
        .then((res) => setMovies(res.data))
        .catch((e) => console.log(e));
    }
  }, [movies]);

  function shortDesc(str, maxLen, separator = " ") {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen)) + "...";
  }

  return (
    <Container className={styles.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {movies.map((mv) => (
          <Grid item key={mv.id} xl={4} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                className={styles.cardMedia}
                image={mv.image_url}
                title={mv.title}
              />
              <CardContent className={styles.cardContent}>
                <Typography gutterBottom variant="h6" component="h2">
                  {mv.title} ({mv.year})
                </Typography>
                <Typography style={{ textAlign: "justify" }}>
                  {mv.description !== null
                    ? shortDesc(mv.description, 130)
                    : ""}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" style={{ background: "#00b248" }}>
                  <Link
                    to={"/movies/" + mv.id}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Detail
                  </Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

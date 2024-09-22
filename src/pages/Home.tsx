import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import PizzaImage from "../assets/img/Pizza.png";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import "../App.css"
import "../pages/Home.css";

const Home = () =>  {
  const navigate = useNavigate(); // Usamos el hook useNavigate

  const handleStartClick = () => {
    navigate("/login"); // Redirige al login cuando se haga clic en el botón
  };

  // El return debe estar al nivel de la función Home
  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden", position: "relative" }}>
      <Grid container spacing={0} alignItems="center">
        <Grid item xs={4}>
          <div
            style={{
              padding: "10%",
              paddingLeft: "50%",
              position: "relative",
              zIndex: 2,
            }}
          >
            <h1 style={{ color: 'var(--naranjita)', 
              fontSize: "7rem",
              fontFamily: "'Quicksand', sans-serif",
              fontWeight:'bold'
              }}>Cheesito</h1>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "1.1rem",
                whiteSpace: "nowrap", // Evita el salto de línea
                overflow: "hidden",
                textOverflow: "ellipsis", // Si el texto es muy largo, muestra "..." al final
              }}
            >
              Donde el queso nunca falta
            </p>
            <Button
              variant="contained"
              style={{
                backgroundColor:'var(--naranjita)',
                border: "none",
                color: "white",
                padding: "10px 30px",
                borderRadius: "15px",
                cursor: "pointer",
                fontSize: "Large",
                zIndex: 3,
                position: "relative",
                textTransform: "none", // Asegura que el texto del botón esté en minúsculas
                fontWeight: "bold",
              }}
              onClick={handleStartClick}
            >
              Empezar →
            </Button>
          </div>
        </Grid>
        <Grid item lg={8}>
          <img
            src={PizzaImage}
            alt="Pizza"
            style={{
              width: "147%", // Incrementa el tamaño de la imagen
              marginLeft: "-550px",
              marginBottom: "-50px",
              marginTop: "-50px",
              display: "block",
              borderRadius: "8px",
              zIndex: 1, // Mantiene la imagen detrás del contenido del texto y el botón
              position: "relative",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;

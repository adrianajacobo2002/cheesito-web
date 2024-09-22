import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import PizzaImage from "../assets/img/Pizza.png";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "../pages/Home.css";

const Home = () => {
  const navigate = useNavigate(); // Usamos el hook useNavigate

  const handleStartClick = () => {
    navigate("/login"); // Redirige al login cuando se haga clic en el botón
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflow: "hidden",
        position: "relative",
        backgroundImage: `url(${PizzaImage})`,
        backgroundSize: "contain", 
        backgroundPosition: "right top", 
        backgroundRepeat: "no-repeat", 
        height: "100vh", 
        display: "flex",
        justifyContent: "center", // Centra horizontalmente
        alignItems: "center", // Centra verticalmente
      }}
    >
      <Grid container spacing={0} alignItems="center">
        <Grid item xs={4}>
          <div
            style={{
              padding: "30%",
              zIndex: 2, // Asegura que el contenido esté por encima del fondo
            }}
          >
            <h1
              style={{
                color: "var(--naranjita)",
                fontSize: "7rem",
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: "bold",
              }}
            >
              Cheesito
            </h1>
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
                backgroundColor: "var(--naranjita)",
                border: "none",
                color: "white",
                padding: "10px 30px",
                borderRadius: "15px",
                cursor: "pointer",
                fontSize: "Large",
                zIndex: 3,
                textTransform: "none", // Asegura que el texto del botón esté en minúsculas
                fontWeight: "bold",
              }}
              onClick={handleStartClick}
            >
              Empezar →
            </Button>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;

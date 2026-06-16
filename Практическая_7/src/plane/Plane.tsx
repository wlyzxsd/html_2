import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import structures from "../data";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";

function Plane() {
    const { id } = useParams();
    const car = structures.gallery[Number(id)];

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar active="1" />

            <Container maxWidth="xl" sx={{ mt: 3, mb: 6, flexGrow: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Typography variant="body2"
                                    sx={{ color: "info.main", textTransform: "uppercase",
                                          fontWeight: 600, letterSpacing: 0.5, }}>
                            Главная
                        </Typography>
                    </Link>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        &gt;
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {car.title}
                    </Typography>
                </Box>

                <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 500 }}>
                    {car.title}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
                    <Box component="img" src={car.img} alt={car.title}
                         sx={{ width: { xs: "100%", sm: "70%", md: "55%" },
                               height: "70vh", borderRadius: 1, objectFit: "contain" }} />
                </Box>

                <Box sx={{ maxWidth: "800px", mx: "auto" }}>
                    <Typography variant="body2"
                                sx={{ color: "text.secondary", textAlign: "justify", lineHeight: 1.8 }}>
                        {car.description || "Описание автомобиля скоро появится."}
                    </Typography>
                </Box>
            </Container>

            <Footer />
        </Box>
    );
}

export default Plane;
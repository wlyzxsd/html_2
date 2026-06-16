import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import structures from "../data";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Link, useParams } from "react-router-dom";

function Building() {
    const {id} = useParams();
    const building = structures[Number(id)];
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar active="1" />

            <Container maxWidth="xl" sx={{ mt: 3, mb: 6, flexGrow: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <Typography variant="body2"
                                    sx={{ color: "info.main", textTransform: "uppercase",
                                          fontWeight: 600, letterSpacing: 0.5,}}>
                            Главная
                        </Typography>
                    </Link>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        &gt;
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {building.title}
                    </Typography>
                </Box>

                <Typography variant="h4" align="center" sx={{ mb: 3, fontWeight: 500 }}>
                    {building.title}
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", mb: 4,}}>
                    <Box component="img" src={building.img} alt={building.title}
                         sx={{ width: { xs: "100%", sm: "70%", md: "55%" }, height: '70vh',
                               borderRadius: 1, objectFit: "contain",}}/>
                </Box>

                <Grid container spacing={4}>
                    {building.description.map((paragraph, index) => (
                        <Grid key={index} size={{ xs: 12, md: 6 }}>
                            <Typography variant="body2" sx={{ color: "text.secondary",
                                        textAlign: "justify", lineHeight: 1.8,}}>
                                {paragraph}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Footer />
        </Box>
    );
}

export default Building;
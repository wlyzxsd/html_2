import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Footer() {
    return (
        <Box
            sx={{
                backgroundColor: '#212529',
                color: 'white',
                textAlign: 'center',
                py: 3,
                mt: 5,
                width: '100%',
            }}
        >
            <Typography>
                Б9123-09.03.04 (3 пг)
            </Typography>

            <Typography>
                Найдовская Любовь Вячеславовна
            </Typography>

            <Typography>
                © 2025
            </Typography>
        </Box>
    );
}

export default Footer;
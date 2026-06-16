import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from "@mui/material/styles";

const StyledTypography = styled(Typography)(({theme}) => ({
    color: 'text.secondary',
    marginBottom: theme.spacing(1),
    textAlign: 'justify',
}));

interface ComponentProps {
    building: {
        img: string,
        title: string,
        description: string[],
    };
    cardNumber: number,
}

function BuildCard({building, cardNumber} : ComponentProps) {
    const isOdd = cardNumber % 2 !== 0;

    return (
        <Card sx={{
            display: 'flex',
            flexDirection: { xs: isOdd ? 'row-reverse' : 'row', md: isOdd ? 'row-reverse' : 'row' },
            alignItems: 'center',
            width: '100%',
        }}>
            <CardMedia
                component='img'
                alt={building.title}
                image={building.img}
                sx={{
                    width: { xs: 170, md: 200 },
                    height: { xs: 190, md: 'auto' },
                    objectFit: 'contain',
                }}
            />
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <CardContent>
                    <Typography gutterBottom variant='h5'>{building.title}</Typography>
                    {building.description.map((item, ind) => (
                        <StyledTypography key={ind} variant='body2'>{item}</StyledTypography>
                    ))}
                </CardContent>

                <CardActions sx={{
                    justifyContent: isOdd ? 'flex-start' : 'flex-end',
                }}>
                    <Button size='small'>Подробнее</Button>
                </CardActions>
            </Box>
        </Card>
    );
}

export default BuildCard;   
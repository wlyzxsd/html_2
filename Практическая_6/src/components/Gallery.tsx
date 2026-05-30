import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Container from '@mui/material/Container';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import structures from '../data';

function Gallery() {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Container maxWidth='lg' sx={{ mt: 4, mb: 5 }}>
            <ImageList
                cols={isSmall ? 1 : 3}
                gap={10}
                rowHeight={isSmall ? 'auto' : 250}
            >
                {structures.gallery.map((item, index) => (
                    <ImageListItem
                        key={index}
                        cols={!isSmall && index === 0 ? 2 : 1}
                        rows={!isSmall && index === 0 ? 2 : 1}
                    >
                        <img
                            src={item.img}
                            alt={item.title}
                            loading='lazy'
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                            }}
                        />
                        <ImageListItemBar title={item.title} />
                    </ImageListItem>
                ))}
            </ImageList>
        </Container>
    );
}

export default Gallery;
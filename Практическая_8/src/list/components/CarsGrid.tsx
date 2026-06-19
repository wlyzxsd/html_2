import cars from '../table';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';

function CarsGrid() {
    const rows: GridRowsProp = cars;
    const columns: GridColDef[] = [
        { field: 'Модель', headerName: 'Модель', flex: 1 },
        { field: 'Поколение', headerName: 'Поколение', flex: 1 },
        { field: 'Год начала выпуска', headerName: 'Год выпуска', flex: 0.5 },
        { field: 'Тип кузова', headerName: 'Тип кузова', flex: 0.5 },
        { field: 'Длина', headerName: 'Длина', flex: 0.5 },
        { field: 'Мощность', headerName: 'Мощность', flex: 0.5 },
        { field: 'Макс. скорость', headerName: 'Макс. скорость', flex: 0.5 },
    ];

    return (
        <Container maxWidth='lg' sx={{ height: '700px', mt: '20px' }}>
            <DataGrid 
                rows={rows} 
                columns={columns}
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                showToolbar={true} 
            />
        </Container>
    );
}

export default CarsGrid;
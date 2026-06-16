import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { ruRU } from '@mui/x-data-grid/locales';
import Container from '@mui/material/Container';
import cars from '../table';

function CarsGrid() {
    const rows: GridRowsProp = cars;
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 0.3 },
        { field: 'Модель', headerName: 'Модель', flex: 1 },
        { field: 'Поколение', headerName: 'Поколение', flex: 0.8 },
        { field: 'Год начала выпуска', headerName: 'Год выпуска', flex: 0.6 },
        { field: 'Тип кузова', headerName: 'Тип кузова', flex: 0.8 },
        { field: 'Длина', headerName: 'Длина (м)', flex: 0.5 },
        { field: 'Мощность', headerName: 'Мощность (л.с.)', flex: 0.7 },
        { field: 'Макс. скорость', headerName: 'Макс. скорость (км/ч)', flex: 0.7 },
    ];

    return (
        <Container maxWidth='xl' sx={{ height: '700px', mt: '20px' }}>
            <DataGrid rows={rows} columns={columns} showToolbar={true}
                      localeText={ruRU.components.MuiDataGrid.defaultProps.localeText} />
        </Container>
    );
}

export default CarsGrid;
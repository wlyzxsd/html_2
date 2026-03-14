const correspond = {
    "Модель": "carModel",
    "Поколение": "carGeneration",
    "Тип кузова": "carType",
    "Год начала выпуска": ["year_start", "year_end"],
    "Длина": ["length_start", "length_end"],
    "Мощность": ["power_start", "power_end"],
    "Макс. скорость": ["speed_start", "speed_end"]
}

let currentData = cars;

const dataFilter = (dataForm) => {
    let dictFilter = {};
    
    for (const item of dataForm.elements) {
        let valInput = item.value;

        if (item.type === "number") {
            if (valInput == "" && item.id.includes("start")) {
                valInput = -Infinity;
            }
            else if (valInput == "" && item.id.includes("end")) {
                valInput = Infinity;
            }
            else {
                valInput = Number(valInput);
            }
        }
        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        }

        dictFilter[item.id] = valInput;
    }
    return dictFilter;
} 

const filterTable = (data, idTable, dataForm) => {
    const datafilter = dataFilter(dataForm);

    let tableFilter = data.filter(item => {
        let result = true;

        for (let key of Object.keys(correspond)) {
            const value = item[key];
            
            if (typeof value == 'string') {
                if (!value.toLowerCase().includes(datafilter[correspond[key]])) {
                    result = false;
                    break;
                }
            }
            else if (typeof value == 'number') {
                let n1 = datafilter[correspond[key][0]];
                let n2 = datafilter[correspond[key][1]];
                if (value < n1 || value > n2) {
                    result = false;
                    break;
                }
            }
        }
        return result;
    });

    currentData = tableFilter;
    clearTable(idTable);

    if (tableFilter.length === 0) {
        const headerRow = createHeaderRow(Object.keys(data[0]));
        document.getElementById(idTable).append(headerRow);
    }
    else {
        createTable(tableFilter, idTable);
    }
}

document.querySelector('input[value="Найти"]').onclick = function() {
    let form = document.getElementById('filter');
    filterTable(cars, 'list', form);
    clearSort();
}

const clearFilter = (idTable, data, dataForm) => {
    for (let item of dataForm.elements) {
        if (item.tagName === 'INPUT' && (item.type === 'text' || item.type === 'number')) {
            item.value = '';
        }
    }
    currentData = data;
    clearTable(idTable);
    createTable(data, idTable);
}

document.querySelector('input[value="Очистить фильтры"]').onclick = function() {
    let form = document.getElementById('filter');
    clearFilter('list', cars, form);
    clearSort();
}
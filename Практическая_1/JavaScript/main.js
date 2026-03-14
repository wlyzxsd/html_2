document.addEventListener('DOMContentLoaded', function() {
    createTable(cars, 'list');

    const sortForm = document.getElementById('sort');
    setSortSelects(cars[0], sortForm);
});

const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
} 

const setSortSelect = (arr, sorSelect) => {
    sorSelect.append(createOption('Нет', 0));
    arr.forEach((item, index) => {
        sorSelect.append(createOption(item, index + 1));
    });
}

const setSortSelects = (data, dataForm) => {
    const head = Object.keys(data);
    const allSelects = dataForm.getElementsByTagName('select');

    for (let i = 0; i < allSelects.length; i++) {
        setSortSelect(head, allSelects[i]);
        if (i !== 0) {
            allSelects[i].disabled = true;
        }
    }
}

const changeNextSelect = (curSelect, nextSelectId) => {
    const nextSelect = document.getElementById(nextSelectId);
    const firstVal = document.getElementById('fieldsFirst').value;
    const secondVal = document.getElementById('fieldsSecond').value;
    
    nextSelect.innerHTML = '';
    nextSelect.append(createOption('Нет', 0));
    const allOptions = Array.from(document.getElementById('fieldsFirst').options);
    
    allOptions.forEach(option => {
        const val = option.value;
        if (val != 0 && val != firstVal && val != secondVal) {
            nextSelect.append(createOption(option.text, val));
        }
    });
    
    if (nextSelectId === 'fieldsThird' && curSelect.id === 'fieldsSecond') {
        if (curSelect.value == 0) {
            nextSelect.disabled = true;
            nextSelect.value = 0;
        } else {
            nextSelect.disabled = false;
            nextSelect.value = 0;
        }
    } else {
        nextSelect.disabled = (curSelect.value == 0);
    }
}

document.getElementById('fieldsFirst').onchange = function() {
    changeNextSelect(this, 'fieldsSecond');

    if (this.value == 0) {
        const thirdSelect = document.getElementById('fieldsThird');
        thirdSelect.disabled = true;
        thirdSelect.value = 0;
    }
}

document.getElementById('fieldsSecond').onchange = function() {
    changeNextSelect(this, 'fieldsThird');
}
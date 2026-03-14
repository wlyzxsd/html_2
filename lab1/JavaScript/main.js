document.addEventListener("DOMContentLoaded", function() {
    createTable(buildings, 'list');

    const sortForm = document.getElementById('sort');
    setSortSelects(buildings[0], sortForm);
})

const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}

const setSortSelect = (arr, sortSelect) => {
    sortSelect.append(createOption('Нет', 0));
    arr.forEach((item, index) => {
        sortSelect.append(createOption(item, index + 1));
    });
}

const setSortSelects = (data, dataFrom) => {
    const head = Object.keys(data);
    const allSelects = dataFrom.getElementsByTagName('select');

    for (let i = 0; i < allSelects.length; i++) {
        setSortSelect(head, allSelects[i]);
        if (i !== 0) {
            allSelects[i].disabled = true;
        }
    }
}

const changeNextSelect = (curSelect, nextSelectId) => {
    const nextSelect = document.getElementById(nextSelectId);
    nextSelect.disabled = false;
    nextSelect.innerHTML = curSelect.innerHTML;

    if (curSelect.value != 0) {
        nextSelect.remove(curSelect.value);
    }
    else {
        nextSelect.disabled = true;
    }
}

document.getElementById('fieldsFirst').onchange = function() {
    changeNextSelect(this, 'fieldsSecond');
}
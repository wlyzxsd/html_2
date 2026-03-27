document.addEventListener('DOMContentLoaded', function() {
    showTable('build', buildings);

    d3.select('input[value="Скрыть таблицу"]').on('click', function() {
        const table = d3.select('#build');
        table.selectAll('tr')
             .remove()

        d3.select(this)
          .style('display', 'none');

        d3.select('input[value="Показать таблицу"]')
          .style('display', 'block');
    });

    d3.select('input[value="Показать таблицу"]').on('click', function() {
        showTable('build', buildings);
        
        d3.select(this)
          .style('display', 'none');

        d3.select('input[value="Скрыть таблицу"]')
          .style('display', 'block');
    });

    d3.selectAll('input[name="OY"]').on('change', function() {
        const showMax = d3.select('#max_height').property('checked');
        const showMin = d3.select('#min_height').property('checked');
        
        if (showMax || showMin) {
            d3.select('#max_height').node().parentNode.classList.remove('error');
            d3.select('#min_height').node().parentNode.classList.remove('error');
        }
    });

    d3.select('input[value="Построить"]').on('click', function() {
        let dataForm = d3.select('#setting');
    
        const showMax = dataForm.select('#max_height').property('checked');
        const showMin = dataForm.select('#min_height').property('checked');
        
        if (!showMax && !showMin) {
            d3.select('#max_height').node().parentNode.classList.add('error');
            d3.select('#min_height').node().parentNode.classList.add('error');
            d3.select('svg').selectAll('*').remove();
            return;
        }

        drawGraph(buildings, dataForm);
    });
});
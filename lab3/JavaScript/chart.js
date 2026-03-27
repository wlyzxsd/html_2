function createArrGraph(data, key) {
    const groupObj = d3.group(data, d => d[key]);

    let arrGraph = [];
    for (let entry of groupObj) {
        const minMax = d3.extent(entry[1].map(d => d['Высота']));
        arrGraph.push({labelX : entry[0], values : minMax});
    }

    return arrGraph;
}

function drawGraph(data, dataForm) {
    const keyX = dataForm.select('input[name="OX"]:checked')
                            .node()
                            .value;

    let arrGraph = createArrGraph(data, keyX);

    if (keyX === 'Год') {
        arrGraph.sort((a, b) => a.labelX - b.labelX);
    }

    const svg = d3.select('svg');
    svg.selectAll('*').remove();

    const attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 50
    }

    const showMax = dataForm.select('#max_height')
                      .property('checked');
    const showMin = dataForm.select('#min_height')
                      .property('checked');

    const graphType = dataForm.select('#graph_type')
                        .node()
                        .value;
    
    const [scX, scY] = createAxis(svg, arrGraph, attr_area, showMax, showMin);

    if (graphType === 'dot') {
        if (showMax) {
            createChart(svg, arrGraph, scX, scY, attr_area, "red", "max");
        }
        if (showMin) {
            createChart(svg, arrGraph, scX, scY, attr_area, "blue", "min");
        }
    }
    else if (graphType === 'histogram') {
        if (showMax) {
            createHistogram(svg, arrGraph, scX, scY, attr_area, "red", "max");
        }
        if (showMin) {
            createHistogram(svg, arrGraph, scX, scY, attr_area, "blue", "min");
        }
    }
}

function createAxis(svg, data, attr_area, showMax, showMin) {
    let min, max;

    if (showMax && showMin) {
        const allValues = [];
        for (let i = 0; i < data.length; i++) {
            allValues.push(data[i].values[0]);
            allValues.push(data[i].values[1]);
        }
        [min, max] = d3.extent(allValues);
    }
    else if (showMax) {
        [min, max] = d3.extent(data.map(d => d.values[1]));
    }
    else if (showMin) {
        [min, max] = d3.extent(data.map(d => d.values[0]));
    }

    const scaleX = d3.scaleBand()
                     .domain(data.map(d => String(d.labelX)))
                     .range([0, attr_area.width - 2 * attr_area.marginX]);

    const scaleY = d3.scaleLinear()
                     .domain([min * 0.85, max * 1.1])
                     .range([attr_area.height - 2 * attr_area.marginY, 0]);

    const axisX = d3.axisBottom(scaleX);
    const axisY = d3.axisLeft(scaleY);

    svg.append('g')
       .attr('transform', `translate(${attr_area.marginX}, ${attr_area.height - attr_area.marginY})`)
       .call(axisX)
       .selectAll('text')
       .style('text-anchor', 'end')
       .attr('dx', '-.8em')
       .attr('dy', '.15em')
       .attr('transform', d => "rotate(-45)");

    svg.append('g')
       .attr('transform', `translate(${attr_area.marginX}, ${attr_area.marginY})`)
       .call(axisY);

    return [scaleX, scaleY];
}

function createChart(svg, data, scaleX, scaleY, attr_area, color, minMax) {
    const r = 4;

    const valuesIdx = minMax === 'max' ? 1 : 0;

    svg.selectAll(`.dot-${minMax}`)
       .data(data)
       .enter()
       .append('circle')
       .attr('class', `dot-${minMax}`)
       .attr('r', r)
       .attr('cx', d => scaleX(String(d.labelX)) + scaleX.bandwidth() / 2)
       .attr('cy', d => scaleY(d.values[valuesIdx]))
       .attr('transform', `translate(${attr_area.marginX}, ${attr_area.marginY})`)
       .style('fill', color);
}

function createHistogram(svg, data, scaleX, scaleY, attr_area, color, minMax) {
    const valuesIdx = minMax === 'max' ? 1 : 0;
    
    const showMax = d3.select('#max_height').property('checked');
    const showMin = d3.select('#min_height').property('checked');
    const bothSelected = showMax && showMin;
    
    let barWidth = scaleX.bandwidth();
    let xOffset = 0;
    
    if (bothSelected) {
        barWidth = scaleX.bandwidth() / 2.2;
        if (minMax === 'max') {
            xOffset = 0;
        } else {
            xOffset = barWidth;
        }
    }

    svg.selectAll(`.bar-${minMax}`)
       .data(data)
       .enter()
       .append('rect')
       .attr('class', `bar-${minMax}`)
       .attr('x', d => scaleX(String(d.labelX)) + xOffset)
       .attr('y', d => scaleY(d.values[valuesIdx]))
       .attr('width', barWidth)
       .attr('height', d => Math.max(0, attr_area.height - 2 * attr_area.marginY - scaleY(d.values[valuesIdx])))
       .attr('transform', `translate(${attr_area.marginX}, ${attr_area.marginY})`)
       .style('fill', color);
}
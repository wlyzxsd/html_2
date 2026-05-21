import * as d3 from "d3";
import { useRef, useMemo, useEffect, useState } from "react";

const ChartDraw = (props) => {
    const chartRef = useRef(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const svg = d3.select(chartRef.current);
        setWidth(parseFloat(svg.style('width')));
        setHeight(parseFloat(svg.style('height')));
    }, []);

    const margin = {
        top : 10, bottom : 100,
        left : 40, right : 10
    };

    const boundWidth = width - margin.left - margin.right;
    const boundHeight = height - margin.top - margin.bottom;

    const hasData = props.data && props.data.length > 0;
    
    // все данные для осей
    let min, max;
    if (hasData) {
        const allValues = [];
        props.data.forEach(d => {
            allValues.push(d.values[0]);
            allValues.push(d.values[1]);
        });
        [min, max] = d3.extent(allValues);
    }

    const scaleX = useMemo(() => {
        if (!hasData) {
            return d3.scaleBand().domain([]).range([0, boundWidth]);
        }
        return d3.scaleBand()
                 .domain(props.data.map(d => d.labelX))
                 .range([0, boundWidth])
    }, [props.data, boundWidth, hasData]); 

    const scaleY = useMemo(() => {
        if (min === undefined || max === undefined) {
            return d3.scaleLinear().domain([0, 100]).range([boundHeight, 0]);
        }
        return d3.scaleLinear()
                 .domain([min * 0.85, max * 1.1])
                 .range([boundHeight, 0])
    }, [boundHeight, min, max]); 

    useEffect(() => {
        if (!chartRef.current) return;
        if (width === 0 || height === 0) return;

        const svg = d3.select(chartRef.current);
        svg.selectAll('*').remove();

        // оси отображаютсч всегда
        const xAxis = d3.axisBottom(scaleX);
        svg.append('g')
           .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
           .call(xAxis)
           .selectAll('text')
           .style('text-anchor', 'end')
           .attr('dx', '-.8em')
           .attr('dy', '.15em')
           .attr('transform', d => 'rotate(-30)');

        const yAxis = d3.axisLeft(scaleY);
        svg.append('g')
           .attr('transform', `translate(${margin.left}, ${margin.top})`)
           .call(yAxis);

        if (!props.shouldDraw) return;

        if (props.graphType === 'dot') {
            const bothSelected = props.showMax && props.showMin;
            if (props.showMax) {
                svg.selectAll('.dot-max')
                    .data(props.data)
                    .enter()
                    .append('circle')
                    .attr('class', 'dot-max')
                    .attr('r', 5)
                    .attr('cx', d => {
                        let x = scaleX(d.labelX) + scaleX.bandwidth() / 2;
                        if (bothSelected && d.values[0] == d.values[1]) {
                            return x + 2.5;
                        }
                        return x;
                    })
                    .attr('cy', d => scaleY(d.values[1]))
                    .attr('transform', `translate(${margin.left}, ${margin.top})`)
                    .style('fill', 'red');
            }

            if (props.showMin) {
                svg.selectAll('.dot-min')
                    .data(props.data)
                    .enter()
                    .append('circle')
                    .attr('class', 'dot-min')
                    .attr('r', 5)
                    .attr('cx', d => {
                        let x = scaleX(d.labelX) + scaleX.bandwidth() / 2;
                        if (bothSelected && d.values[0] == d.values[1]) {
                            return x - 2.5;
                        }
                        return x;
                    })
                    .attr('cy', d => scaleY(d.values[0]))
                    .attr('transform', `translate(${margin.left}, ${margin.top})`)
                    .style('fill', 'blue');
            }
        }
        else if (props.graphType === 'histogram') {
            const bothSelected = props.showMax && props.showMin;
            let barWidth = scaleX.bandwidth();

            if (bothSelected) {
                barWidth = scaleX.bandwidth() / 2;
            }

            if (props.showMax) {
                svg.selectAll('.bar-max')
                   .data(props.data)
                   .enter()
                   .append('rect')
                   .attr('class', 'bar-max')
                   .attr('x', d => scaleX(d.labelX))
                   .attr('y', d => scaleY(d.values[1]))
                   .attr('width', barWidth)
                   .attr('height', d => boundHeight - scaleY(d.values[1]))
                   .attr('transform', `translate(${margin.left}, ${margin.top})`)
                   .attr('fill', 'red');
            }
            if (props.showMin) {
                const xOffset = bothSelected ? barWidth : 0;
                svg.selectAll('.bar-min')
                   .data(props.data)
                   .enter()
                   .append('rect')
                   .attr('class', 'bar-min')
                   .attr('x', d => scaleX(d.labelX) + xOffset)
                   .attr('y', d => scaleY(d.values[0]))
                   .attr('width', barWidth - 2)
                   .attr('height', d => boundHeight - scaleY(d.values[0]))
                   .attr('transform', `translate(${margin.left}, ${margin.top})`)
                   .attr('fill', 'blue');
            }
        }
        
    }, [scaleX, scaleY, props.data, props.showMax, props.showMin, props.graphType, width, height, props.shouldDraw]);

    return (
        <svg ref={chartRef} style={{width: '800px', height: '400px'}}></svg>
    );
}

export default ChartDraw;
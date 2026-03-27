function createPath() {
    const svg = d3.select('svg');
    const width = svg.attr('width');
    const height = svg.attr('height');

    let data = [];
    
    const pawWidth = 100;
    const pawHeight = 100;
    
    const padding = 50;
    
    const minX = pawWidth / 10 + padding;
    const maxX = width - pawWidth / 10 - padding;
    const minY = pawHeight / 10 + padding;
    const maxY = height - pawHeight / 10 - padding;
    
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const radius = 150;
    
    const step = 0.05;

    for (let t = 0; t <= 2 * Math.PI + step; t += step) {
        let xRaw = (1 + Math.cos(t)) * Math.cos(t);
        let yRaw = (1 + Math.cos(t)) * Math.sin(t);
        
        let x = centerX + xRaw * radius;
        let y = centerY + yRaw * radius;
        
        data.push({x: x, y: y});
    }
    
    return data;
}

const drawPath = () => {
    const dataPoints = createPath();
    const line = d3.line()
                   .x((d) => d.x)
                   .y((d) => d.y);

    const svg = d3.select('svg');
    const path = svg.append('path')
                    .attr('d', line(dataPoints))
                    .attr('stroke', 'none')
                    .attr('fill', 'none');

    return path;
}

function translateAlong(path, x_size, x_size_end, y_size, y_size_end, ang, ang_end) {
    const length = path.getTotalLength();

    return function(t) {
        const point = path.getPointAtLength(t * length);
        
        const x = x_size + (x_size_end - x_size) * t;
        const y = y_size + (y_size_end - y_size) * t;
        const cur_ang = ang + (ang_end - ang) * t;

        return `translate(${point.x}, ${point.y}) 
                scale(${x}, ${y}) 
                rotate(${cur_ang})`;
    }
}
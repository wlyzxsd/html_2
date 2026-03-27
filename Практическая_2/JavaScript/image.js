function drawImg(svg) {
    const face = svg.append('g');

    // морда 
    face.append('circle')
       .attr('cx', 0)
       .attr('cy', 0)
       .attr('r', 45)
       .attr('fill', '#F9E5C1')
       .attr('stroke', '#8B4513')
       .attr('stroke-width', 2);

    // левое ухо 
    face.append('polygon')
       .attr('points', '-35,-42 -50,-80 -15,-45')
       .attr('fill', '#F9E5C1')
       .attr('stroke', '#8B4513')
       .attr('stroke-width', 2);

    // правое ухо 
    face.append('polygon')
       .attr('points', '35,-42 50,-80 15,-45')
       .attr('fill', '#F9E5C1')
       .attr('stroke', '#8B4513')
       .attr('stroke-width', 2);

    // левый глаз 
    face.append('ellipse')
       .attr('cx', -18)
       .attr('cy', -5)
       .attr('rx', 9)
       .attr('ry', 12)
       .attr('fill', '#FFFFFF')
       .attr('stroke', '#000000')
       .attr('stroke-width', 1.5);

    // правый глаз 
    face.append('ellipse')
       .attr('cx', 18)
       .attr('cy', -5)
       .attr('rx', 9)
       .attr('ry', 12)
       .attr('fill', '#FFFFFF')
       .attr('stroke', '#000000')
       .attr('stroke-width', 1.5);

    // левый зрачок 
    face.append('ellipse')
       .attr('cx', -18)
       .attr('cy', -4)
       .attr('rx', 4)
       .attr('ry', 7)
       .attr('fill', '#000000');

    // правый зрачок 
    face.append('ellipse')
       .attr('cx', 18)
       .attr('cy', -4)
       .attr('rx', 4)
       .attr('ry', 7)
       .attr('fill', '#000000');

    // нос 
    face.append('polygon')
       .attr('points', '0,8 -8,18 8,18')
       .attr('fill', '#FFA0A0')
       .attr('stroke', '#8B4513')
       .attr('stroke-width', 1.5);

    // рот 
    face.append('path')
       .attr('d', 'M -8 22 Q 0 28 8 22')
       .attr('fill', 'none')
       .attr('stroke', '#8B4513')
       .attr('stroke-width', 1.5);

    // усы левые (верхний)
    face.append('line')
       .attr('x1', -28)
       .attr('y1', 5)
       .attr('x2', -50)
       .attr('y2', 2)
       .attr('stroke', '#8B4513')
       .attr('stroke-width', 1);

    // усы левые (средний)
    face.append('line')
       .attr('x1', -28)
       .attr('y1', 10)
       .attr('x2', -50)
       .attr('y2', 10)
       .attr('stroke', '#8B4513')
       .attr('stroke-width', 1);

    // усы левые (нижний)
    face.append('line')
       .attr('x1', -28)
       .attr('y1', 15)
       .attr('x2', -50)
       .attr('y2', 18)
       .attr('stroke', '#8B4513')
       .attr('stroke-width', 1);

    // усы правые (верхний)
    face.append('line')
       .attr('x1', 28)
       .attr('y1', 5)
       .attr('x2', 50)
       .attr('y2', 2)
       .attr('stroke', '#8B4513')
       .attr('stroke-width', 1);

    // усы правые (средний)
    face.append('line')
       .attr('x1', 28)
       .attr('y1', 10)
       .attr('x2', 50)
       .attr('y2', 10)
       .attr('stroke', '#8B4513')
       .attr('stroke-width', 1);

    // усы правые (нижний)
    face.append('line')
       .attr('x1', 28)
       .attr('y1', 15)
       .attr('x2', 50)
       .attr('y2', 18)
       .attr('stroke', '#8B4513')
       .attr('stroke-width', 1);
    
    return face;
}
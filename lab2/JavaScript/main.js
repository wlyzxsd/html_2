document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;
    const svg = d3.select("svg")
                  .attr("width", width)
                  .attr("height", height);

    d3.select('input[value="Нарисовать"]').on('click', function() {
        let form = d3.select('#setting').node();
        draw(form);
    });

    const animationElems = [
        'label[for="cx_end"]', '#cx_end',
        'label[for="cy_end"]', '#cy_end',
        'label[for="x_size_end"]', '#x_size_end',
        'label[for="y_size_end"]', '#y_size_end',
        'label[for="ang_end"]', '#ang_end',
        '#animation_options',
        'input[value="Анимировать"]',
        '#path_block'
    ];

    animationElems.forEach(selector => {
        d3.select(selector).style('display', 'none');
    });
    d3.select('input[value="Нарисовать"]').style('display', 'inline-block');

    d3.select('#animation').on('change', function() {
        const isChecked = this.checked;

        if (isChecked) {
            animationElems.forEach(selector => {
                d3.select(selector).style('display', 'inline-block');
            });
            d3.select('input[value="Нарисовать"]').style('display', 'none');
        }
        else {
            animationElems.forEach(selector => {
                d3.select(selector).style('display', 'none');
            });
            d3.select('input[value="Нарисовать"]').style('display', 'inline-block');
        }
    });

    d3.select('input[value="Очистить"]').on('click', function() {
        svg.selectAll('*').remove();

        const form = d3.select('#setting').node();
        form.reset();

        d3.select('#img_points').style('display', 'inline-block');
        d3.select('#choose_path').style('display', 'none');
        d3.select('#scale').style('display', 'inline-block');
        d3.select('#rotate').style('display', 'inline-block');
        d3.select('#path_block').style('display', 'none');

        d3.select('input[value="Нарисовать"]').style('display', 'inline-block');

        animationElems.forEach(selector => {
            d3.select(selector).style('display', 'none');
        });
    });

    d3.select('input[value="Анимировать"]').on('click', function() {
        let form = d3.select('#setting').node();
        runAnimation(form);
    });

    d3.select('#path').on('change', function() {
        const isChecked = this.checked;

        if (isChecked) {
            d3.select('#img_points').style('display', 'none');
            d3.select('#choose_path').style('display', 'inline-block');

            d3.select('#scale').style('display', 'none');
            d3.select('#rotate').style('display', 'none');
        }
        else {
            d3.select('#img_points').style('display', 'inline-block');
            d3.select('#choose_path').style('display', 'none');

            d3.select('#scale').style('display', 'inline-block');
            d3.select('#rotate').style('display', 'inline-block');
        }
    });
});

const draw = (dataForm) => {
    const svg = d3.select("svg");
    let pict = drawSmile(svg);
    pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value})
                            scale(${dataForm.x_size.value}, ${dataForm.y_size.value})
                            rotate(${dataForm.ang.value})`);
}

const runAnimation = (dataForm) => {
    const svg = d3.select('svg');
    svg.selectAll('*').remove();
    let pict = drawSmile(svg);

    const ease = {
        "1": d3.easeLinear,
        "2": d3.easeElastic,
        "3": d3.easeBounce,
    };
    const animationType = d3.select('#animation_options').node().value;
    const pathType = d3.select('#path_options').node().value;

    if (d3.select('#path').node().checked) {
        let path = drawPath(pathType);
        pict.transition()
            .ease(ease[animationType])
            .duration(6000)
            .attrTween('transform', translateAlong(path.node()));
    }
    else {
        pict.attr('transform', `translate(${dataForm.cx.value}, ${dataForm.cy.value})
                                scale(${dataForm.x_size.value}, ${dataForm.y_size.value})
                                rotate(${dataForm.ang.value})`)
            .transition()
            .duration(6000)
            .ease(ease[animationType])
            .attr('transform', `translate(${dataForm.cx_end.value}, ${dataForm.cy_end.value})
                                scale(${dataForm.x_size_end.value}, ${dataForm.y_size_end.value})
                                rotate(${dataForm.ang_end.value})`);
    }
}
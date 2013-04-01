d3.scroll = function(selection) {
    var track, button,
        timeout,
        elem = selection.node(),
        slowHide = debounce(hide, 800),
        dragbehavior = d3.behavior.drag()
            .on('dragstart', clearDebounce)
            .on('drag', drag);

    selection.on('scroll.d3-scroll', scroll);
    setup();

    function debounce(func, threshold, execAsap) {
        return function debounced() {
            var obj = this, args = arguments;
            function delayed() {
                if (!execAsap) func.apply(obj, args);
                timeout = null;
            }
            if (timeout) clearDebounce();
            else if (execAsap) func.apply(obj, args);
            timeout = setTimeout(delayed, threshold || 100);
        };
    }

    function clearDebounce() {
        if (timeout) clearTimeout(timeout);
    }

    function drag() {
        elem.scrollTop += d3.event.dy * (elem.scrollHeight / elem.offsetHeight);
    }

    function show() {
        track.style('display', 'block')
            .style('opacity', 1);
    }

    function hide() {
        track
            .style('opacity', 1)
            .transition()
            .style('opacity', 0)
            .each('end', function() {
                track.style('display', 'none');
            });
    }

    function setup() {
        track = selection.append('div')
            .attr('class', 'd3-scroll-track');
        button = track.append('div')
            .attr('class', 'd3-scroll-button')
            .call(dragbehavior);
    }

    function scroll() {
        show();
        track.style({
            top: this.scrollTop + 'px', height: this.offsetHeight + 'px'
        });
        button.style({
            height: (this.offsetHeight * this.offsetHeight) / this.scrollHeight + 'px',
            top: this.offsetHeight * (this.scrollTop / this.scrollHeight) + 'px'
        });
        slowHide();
    }
};

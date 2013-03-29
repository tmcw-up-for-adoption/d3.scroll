d3.scroll = function(selection) {
    var track, button,
        slowHide = debounce(hide, 500);

    function debounce(func, threshold, execAsap) {
        var timeout;
        return function debounced() {
            var obj = this, args = arguments;
            function delayed() {
                if (!execAsap) func.apply(obj, args);
                timeout = null;
            }

            if (timeout) clearTimeout(timeout);
            else if (execAsap) func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
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
        track = selection
            .append('div')
            .attr('class', 'd3-scroll-track');
        button = track
            .append('div')
            .attr('class', 'd3-scroll-button');
    }

    function buttonHeight(elem) {
        return ((elem.offsetHeight * elem.offsetHeight) / elem.scrollHeight);
    }

    function buttonTop(elem) {
        return (elem.offsetHeight) * (elem.scrollTop / elem.scrollHeight);
    }

    selection.on('scroll.d3-scroll', function() {
        show();
        track
            .style('top', this.scrollTop + 'px')
            .style('height', this.offsetHeight + 'px');
        button
            .style('height', buttonHeight(this) + 'px')
            .style('top', buttonTop(this) + 'px');
        slowHide();
    });

    setup();
};

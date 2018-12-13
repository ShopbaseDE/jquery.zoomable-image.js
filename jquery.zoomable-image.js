$.fn.zoomableImage = function(options) {
    var opts = $.extend( {}, $.fn.zoomableImage.defaults, options );
    var $this = this;
    var source = {
        src: $this.attr('src'),
        height: $this.height(),
        width: $this.width()
    };

    if($this.attr('zoomed-image') !== undefined) {
        source.src = $this.attr('zoomed-image');
    }
    if(opts.zoomed !== null) {
        source.src = opts.zoomed;
    }

    $this.css('display', 'none');

    $this.wrap('<div title="Test Image" class="zoomable-image-container" style="max-height:'+source.height+';max-width:'+source.width+';background-image: url('+source.src+')"></div>');

    var $container = $this.parent('.zoomable-image-container');

    $container.css({
        'background-size': '100%',
        'background-position': 'center',
        'background-repeat': 'no-repeat',
        'display': 'block',
        'width': '100%',
        'height': '100%',
        'cursor': opts.cursor
    });

    var $effects = {
        default: {
            'transition': 'background-size '+opts.effect.speed+' '+opts.effect.options+',background-position '+opts.effect.speed+' '+opts.effect.options,
            '-o-transition': 'background-size '+opts.effect.speed+' '+opts.effect.options+',background-position '+opts.effect.speed+' '+opts.effect.options,
            '-moz-transition': 'background-size '+opts.effect.speed+' '+opts.effect.options+',background-position '+opts.effect.speed+' '+opts.effect.options,
            '-webkit-transition': 'background-size '+opts.effect.speed+' '+opts.effect.options+',background-position '+opts.effect.speed+' '+opts.effect.options,
        },
        zoomed: {
            'transition': 'background-size '+opts.effect.speed+' '+opts.effect.options,
            '-o-transition': 'background-size '+opts.effect.speed+' '+opts.effect.options,
            '-moz-transition': 'background-size '+opts.effect.speed+' '+opts.effect.options,
            '-webkit-transition': 'background-size '+opts.effect.speed+' '+opts.effect.options,
        }
    };

    $container.css($effects.default);

    $container.hover(
        function() {
            $(this).css('background-size', (100 + opts.zoom) + '%');
            $(this).on('mousemove', function() {
                var posX = event.pageX;
                var posImgX = $(this).offset().left;
                var posY = event.pageY;
                var posImgY = $(this).offset().top;

                var x = (posX - posImgX) / source.width * 100;
                var y = (posY - posImgY) / source.height * 100;

                $(this).css($effects.zoomed);
                $(this).css('background-position', x+'% '+y+'%');
            })
        }, function() {
            $(this).css($effects.default);
            $(this).css('background-size', '100%');
            $(this).css('background-position', '');
        }
    );


    return this;
};

// Defaults
$.fn.zoomableImage.defaults = {
    zoomed: null,
    zoom: 100,
    effect: {
        speed: "0.3s",
        options: 'ease-in-out'
    },
    cursor: '-webkit-zoom-in',
};

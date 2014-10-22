/**/;(function($) {

    var Carousel = function($el, settings) {
        var carousel = this;
        this.$carousel = $el;
        this.$carouselContent = this.$carousel.find('.carousel-content');
        this.size = this.$carouselContent.children().size();
        this.current = this.nextIdx = 0;
        this.settings = $.extend({
            speed: function() {
                return Math.abs(this.current - this.nextIdx) * 1000;
            },
            // speed: 1000,
            delay: 5000,
            easing: 'swing',
            auto: true,
            buttons: true,
            navigation: true
        }, settings);
        this.settings.__get = function(attr) {
            if (typeof(this[attr]) != 'undefined') {
                if ($.isFunction(this[attr])) {
                    return this[attr].call(carousel);
                } else {
                    return this[attr];
                }
            }
        };

        this.init();
    };
    Carousel.prototype = {
        init: function() {
            this.$wrapper = this.$carousel.wrap('<div class="carousel-wrapper"></div>').parent();
            if (this.settings.__get('navigation')) {
                this.initNav();
            }
            if (this.settings.__get('buttons')) {
                this.initButtons();
            }
            if (this.settings.__get('auto')) {
                this.initAuto();
            }
        },
        initButtons: function() {
            var carousel = this;
            this.$nextBtn = $('<a href="#" class="carousel-btn-next">&gt;</a>').appendTo(this.$wrapper);
            this.$prevBtn = $('<a href="#" class="carousel-btn-prev">&lt;</a>').appendTo(this.$wrapper);

            // bind event handlers
            this.$nextBtn.click(function() {
                carousel.next();
            });
            this.$prevBtn.click(function() {
                carousel.prev();
            });
        },
        initNav: function() {
            var carousel = this;

            this.$nav = $('<ul class="carousel-nav"></ul>').appendTo(this.$wrapper);
            for (var i=0; i<this.size; i++) {
                $('<li class="carousel-nav-item"></li>')
                    .html($('<a href="#" class="carousel-nav-btn"></a>').data('itemIdx', i).text(i+1))
                    .appendTo(this.$nav);
            }

            // bind event handlers
            this.$nav.on('click', '.carousel-nav-btn', function() {
                carousel.moveTo($(this).data('itemIdx'));
            });
        },
        initAuto: function() {
            var carousel = this;

            if (this.autoEnabled = this.settings.__get('auto')) {
                this.intervalId = setInterval(function () {
                    if (carousel.autoEnabled) {
                        carousel.next();
                    }
                }, this.settings.__get('delay'));

                // bind event handlers
                this.$wrapper.mouseenter(function () {
                    carousel.autoEnabled = false;
                });
                this.$wrapper.mouseleave(function () {
                    carousel.autoEnabled = true;
                });
            }
        },
        stopAuto: function() {
            clearInterval(this.intervalId);
            this.$wrapper.off('mouseenter');
            this.$wrapper.off('mouseleave');
        },
        moveTo: function(idx) {
            var carousel = this;
            while (idx < 0 || idx >= this.size) {
                if (idx < 0) {
                    // -1 => size-1, -2 => size-2, ...
                    idx = this.size + idx; // this.size - (-idx)
                } else if (idx >= this.size) {
                    // size+0 => 0, size+1 => 1, ...
                    idx = idx-this.size;
                }
            }

            this.nextIdx = idx;
            this.autoEnabled = false;
            this.$carouselContent.stop().animate({
                'margin-left': '+=' + (this.$carousel.offset().left - this.$carouselContent.children().eq(idx).offset().left)
            }, this.settings.__get('speed'), this.settings.__get('easing'), function() {
                carousel.autoEnabled = true;
            });
            // this.$carouselContent.css('margin-left', '+=' + (this.$carousel.offset().left - this.$carouselContent.children().eq(idx).offset().left));
            this.current = idx;
        },
        next: function() {
            this.moveTo(this.current + 1);
        },
        prev: function() {
            this.moveTo(this.current - 1);
        }
    };
    Carousel.init = function($el, settings) {
        return new Carousel($el, settings);
    };

    $.fn.carousel = function(method) {
        var $el = $(this),
            settings = {};

        if (Carousel.prototype[method] && $.isFunction(Carousel.prototype[method])) {
            var $carousel = $el.first().data('carousel'),
                retVal;
            if ($carousel) {
                retVal = $carousel[method].apply($carousel, ($(arguments).slice(1)));
            }
            return typeof(retVal) !== 'undefined' ? retVal : $el;
        } else {
            settings = method;
            return $el.each(function() {
                var $el = $(this);

                $el.data('carousel', Carousel.init($el, settings));
            });
        }
    };
})(jQuery);
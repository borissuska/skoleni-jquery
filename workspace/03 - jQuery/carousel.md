Carousel (kolotoč)
==================

Ukážeme si jak pomocí jQuery vytvořit carousel.

Zadání
------

1. Vytvořte CSS pro danou HTML strukturu dokumentu
	1. na začátku (před inicialializací JavaScriptu) se bude zobrazovat pouze první položka carouselu
	2. bude možné obsahem carouselu "hýbat" (nastavovat CSS property `margin-left`, nebo `left`, apod.)
	   tak, aby se dali jednotlivé položky střídat a přechod mezi nimi mohl být plynulý
2. Inicializujte carousel s ohledem na nastavení
	1. přidejte ovládací prvky carouselu (navigace, tlačítka další a předcházející)
	2. definujte CSS pro zobrazení ovládacích prvků
	3. nastavte odchytávání událostí
	4. Spustěte automatické protáčení carouselu
3. Implementujte obecnou funkci moveTo(idx)
	1. pozor na hodnoty idx mimo platný rozsah
	2. vypočítejte CSS vlastnost `margin-left` aby se zobrazovala správná položka carouselu daná indexem
	3. animujte carousel pomocí CSS3 transitions
	4. změnte CSS3 animaci na jQuery animaci
	5. přidejte callback funkce pro tlačítka navigace
* Implementujte funkce next() a prev()
	* využijte funkci moveTo(idx)
	* přidejte callback funkce pro tlačítka další a předcházející
	* přidejte callback funkci pro interval automatického procházení
	* zakažte automatické protáčení během animace 
* Umožněte používání funkcí v nastavení carouselu
	* přidejte funkci na získání hodnoty (konstanty nebo funkce)
	* změnte všechny použití atributu settings
	* implementujte defaultní hodnotu `speed` tak, aby se počítala podle počtu položok přes které se musí
	 projít na nový index, aby bylo možné zachovat konstantní rychlost.
* Vytvořte jQuery plugin	 	 

Řešení
------

### CSS Layout pro carousel

1. Zobrazte položky za sebou a omezte zobrzovanou část carouselu pomocí `overflow: hidden;` 

		.carousel {
			width: 400px;
			overflow: hidden;
			margin: 0 auto;
		}
		.carousel-content {
			list-style-type: none;
			width: 65000em;
			padding: 0;
			margin: 0;
		}
		.carousel-content > * {
			float: left;
		}

2. Vyzkoušejte si změnu CSS vlastnoti `margin-left`

### Inicializace carouselu

1. Pro implementaci použijeme OOP, budeme implementovat tuto třídu:

		/* Inicializace instance (konstruktor) */
		var Carousel = function($el, settings) {
            var carousel = this;
            this.$carousel = $el;
            this.$carouselContent = this.$carousel.find('.carousel-content');
            this.size = this.$carouselContent.children().size();
            this.current = 0;
            this.settings = $.extend({
				speed: 1000,
                delay: 5000,
                easing: 'swing',
                auto: true,
                buttons: true,
                navigation: true
            }, settings);
            
            this.init();
        };
        
        /* Instancni metody */
        Carousel.prototype = {
            init: function() {
            }
        };
        
        /* Staticke metody */
        Carousel.init = function($el, settings) {
            return new Carousel($el, settings);
        };

2. Nad danou strukturou inicializujeme carousel následovně

		Carousel.init($('.carousel'), {delay: 3000});
		
3. Přidání ovládacích prvků v metodě init()

		init: function() {
			// obalime carousel, aby jsme mohli pridat ovladaci prvky
			this.$wrapper = this.$carousel.wrap('<div class="carousel-wrapper"></div>').parent();
			if (this.settings.navigation) {
				this.initNav();
			}
			if (this.settings.buttons) {
				this.initButtons();
			}
			if (this.settings.auto) {
				this.initAuto();
			}
		},
		
		initButtons: function() {
			this.$nextBtn = $('<a href="#" class="carousel-btn-next">&gt;</a>').appendTo(this.$wrapper);
			this.$prevBtn = $('<a href="#" class="carousel-btn-prev">&lt;</a>').appendTo(this.$wrapper);
		},
		
		initNav: function() {
			this.$nav = $('<ul class="carousel-nav"></ul>').appendTo(this.$wrapper);
			for (var i=0; i<this.size; i++) {
				$('<li class="carousel-nav-item"></li>')
						.html($('<a href="#" class="carousel-nav-btn"></a>').data('itemIdx', i).text(i+1))
						.appendTo(this.$nav);
			}
		},

4. CSS pro ovládací prvky

		/* Obalujici element */
		.carousel-wrapper {
        	position: relative;
        	width: 400px;
        	margin: 0 auto;
        }
        
        /* Navigace */
        .carousel-nav {
        	padding: 0;
        	margin: 0;
        	list-style-type: none;
        	text-align: center;
        }        
        .carousel-nav-item {
        	display: inline-block;
        	margin: 0 10px;
        	border: 2px solid gray;
        	width: 8px;
        	height: 8px;
        	border-radius: 100%;
        	cursor: pointer; cursor: hand;
        	overflow: hidden;
        }
        .carousel-nav-btn{
        	color: transparent;
        }
        
        /* Tlacitka dalsi a predchazejici  */
        .carousel-btn-next,
        .carousel-btn-prev {
        	position: absolute;
        	display: none;
        	top: 135px;
        	width: 30px;
        	height: 30px;
        	line-height: 30px;
        	text-align: center;
        	text-decoration: none;
        	background: rgba(0,0,0,0.35);
        	color: #fff;
        	font-weight: bold;
        	font-size: 140%;
        }        
        .carousel-btn-next {
        	right: 0;
        }
        .carousel-btn-prev {
        	left: 0;
        }        
        .carousel-wrapper:hover .carousel-btn-next,
        .carousel-wrapper:hover .carousel-btn-prev {
        	display: block;
        }
        
5. Odchytávání událostí na ovládacích prvcích

		initButtons: function() {
			
			// ...
		
			// bind event handlers
			var carousel = this;
			this.$nextBtn.click(function() {
				// TODO
			});
			this.$prevBtn.click(function() {
				// TODO
			});
		},
		initNav: function() {

			// ...

			// bind event handler
			var carousel = this;
			this.$nav.on('click', '.carousel-nav-btn', function() {
				// TODO
			});
		},
		
6. Automatické protáčení carouselu

		initAuto: function() {
			var carousel = this;

			if (this.autoEnabled = this.settings.auto) {
				this.intervalId = setInterval(function () {
					if (carousel.autoEnabled) {
						// TODO
					}
				}, this.settings.delay);

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
		
### Implementace funkce `moveTo(idx)`

1. Přepočítaní parametru `idx`

		moveTo: function(idx) {
			while (idx < 0 || idx >= this.size) {
				if (idx < 0) {
					// -1 => size-1, -2 => size-2, ...
					idx = this.size + idx; // == this.size - (-idx)
				} else if (idx >= this.size) {
					// size+0 => 0, size+1 => 1, ...
					idx = idx - this.size;
				}
			}
			
			// TODO
			
			this.current = idx;
		},
	
2. Výpočet `margin-left`
	
		this.$carouselContent.css('margin-left', '+=' + (this.$carousel.offset().left - this.$carouselContent.children().eq(idx).offset().left));
		
3. CSS3 animace (rychlost a styl animace se dá nastavovat CSS vlastnostmi `transition-duration` a `transition-timing-function`)

		.carousel-content {
		
			/* ... */
		
			-webkit-transition: margin-left 1s;
			-moz-transition: margin-left 1s;
			-o-transition: margin-left 1s;
			transition: margin-left 1s;
		}
		
4. jQuery animace (Odeberte CSS3 animaci!)

		this.$carouselContent.animate({
			'margin-left': '+=' + (this.$carousel.offset().left - this.$carouselContent.children().eq(idx).offset().left)
		}, this.settings.speed, this.settings.easing);
			
5. Pozor na souběžné animace na stejném elementu, používejte preventívně `stop()`
			
		this.$carouselContent.stop().animate({ // ...
			
6. Callback funkce pro navigaci

		initNav: function() {
        
			// ...

			// bind event handler
			var carousel = this;
			this.$nav.on('click', '.carousel-nav-btn', function() {
				carousel.moveTo($(this).data('itemIdx'));
			});
		},
		
### Funkce `next()` a `prev()`

1. `next()` a `prev()` funkce jsou založeny na funkci `moveTo(idx)`

		next: function() {
			this.moveTo(this.current + 1);
		},
		prev: function() {
			this.moveTo(this.current - 1);
		}

2. Callback funkce pro tlačítka

		initButtons: function() {
		
			// ...

			// bind event handlers
			var carousel = this;
			this.$nextBtn.click(function() {
				carousel.next();
			});
			this.$prevBtn.click(function() {
				carousel.prev();
			});
		}
				
3. Callback funkce pro automatické protáčení
				
		initAuto: function() {
			var carousel = this;

			if (this.autoEnabled = this.settings.auto) {
				this.intervalId = setInterval(function () {
					if (carousel.autoEnabled) {
						carousel.next();
					}
				}, this.settings.delay);
				
				// ...

			}
		},
		
4. Zakázání automatického potáčení během animace
		
		modeTo: function(idx) {
		
			// ...
			
			var carousel = this;
			this.autoEnabled = false;
			this.$carouselContent.stop().animate({
				'margin-left': '+=' + (this.$carousel.offset().left - this.$carouselContent.children().eq(idx).offset().left)
			}, this.settings.speed, this.settings.easing, function() {
				carousel.autoEnabled = true;
			});
		}

### Používání funkcí v nastavení carouselu

1. Funkce, která ověří jestri se jedná o proměnnou nebo konstantu
		
		var Carousel = function($el, settings) {
			
			// ...
			
			var carousel = this;
			this.settings.__get = function(attr) {
				if (typeof(this[attr]) != 'undefined') {
					if ($.isFunction(this[attr])) {
						return this[attr].call(carousel);
					} else {
						return this[attr];
					}
				}
			};
		}
		
2. Změna použití atribútu settings
		
	* aktuálně: `this.settings.promenna`
	* nově: `this.settings.__get('promenna')`
	
3. Defaultní hodnota nastavení `speed` se bude počítat dle aktuální pozice
 
 		var Carousel = function($el, settings) {
        			
			// ...
			
			this.settings = $.extend({
				speed: function() {
					return Math.abs(this.current - this.nextIdx) * 1000;
				},
				// ...
			}
			
			// this.settings.__get ...
			
		},
		
		// ...
		
			moveTo: function(idx) {
				// while (idx < 0 || ...
				
				this.nextIdx = idx;
				this.autoEnabled = false;
				
				// animate ...
				
				this.current = idx;
			},
			
### jQuery plugin

1. Vytvořte nový soubor `jquery-carousel.js`

		/**/;(function($) {
			
		})(jQuery);
		
2. Inicializujeme jQuery plugin (pro všechny elementy v jQeury objektě + vracíme jQuery objekt)
		
		/**/;(function($) {
		
			// Carousel class
		
		    $.fn.carousel = function(settings) {
                return $(this).each(function() {
                    var $el = $(this);        
                    $el.data('carousel', Carousel.init($el, settings));
                });
            };            
        })(jQuery);
        	
3. Můžeme vytvořit jQuery plugin s podporou metód

		/**/;(function($) {
        		
			// Carousel class
		
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
		
		// priklad pouziti

		$('.carousel').carousel({auto: false});
		setInterval(function() {
			// volani metody next()
			$('.carousel').carousel('next');
		}, 3000);

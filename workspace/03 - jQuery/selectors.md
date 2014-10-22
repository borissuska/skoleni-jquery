Selektory
=========

jQuery selektory podporují syntax CSS3 selektorů a přidávají něco víc.
Podpora selektorů je nezávislá na prohlížeči.

Vyzkoušejte:
------------

	$('div')
	$('body div ul li')
	$('body > div > div > ul > li + li')
	$('body > div > div > ul > li + li + li')
	$('body > div > div > ul:first-child > li')
	$('body > div > div > ul:first > li')
	$('body > div > div > ul:eq(0) > li')
	$('body > div > div > ul:last-child > li')
	$('body > div > div > ul:last > li')
	$('body > div > div > ul:eq(1) > li')
	$('body > div > div > ul:eq(1) > li:eq(2)')
	$('.menu li.active')
	$('.menu li.active').parent()
	$('.menu:has(.active)')
	$('*[href="http://www.google.com"]')
	$('[href^="https://"]')
	$('[href$=".com"]')
	$('[href*="google"]')
	$('form select > option:selected')
	$('form select > option[selected]')
	$('form input[type=checkbox]:checked')
	$('form input[type=checkbox]:not(:checked)')
	$('form input[name=r]:checked')
	var $menu = $('#m1'); $menu.find('li');
	var $menu = $('#m1'); $('li', $menu);

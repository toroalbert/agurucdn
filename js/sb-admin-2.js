(function ($) {
    "use strict"; // Start of use strict

    // Toggle the side navigation
    $(document).on('click', "#sidebarToggle, #sidebarToggleTop", function (e) {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
        if ($(".sidebar").hasClass("toggled")) {
            $('.sidebar .collapse').collapse('hide');
        };
    });

    // Close any open menu accordions when window is resized below 768px
    $(window).resize(function () {
        if ($(window).width() < 768) {
            $('.sidebar .collapse').collapse('hide');
        };

        // Toggle the side navigation when window is resized below 480px
        if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
            $("body").addClass("sidebar-toggled");
            $(".sidebar").addClass("toggled");
            $('.sidebar .collapse').collapse('hide');
        };
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $(document).on('mousewheel DOMMouseScroll wheel', 'body.fixed-nav .sidebar', function (e) {
        if ($(window).width() > 768) {
            var e0 = e.originalEvent,
                delta = e0.wheelDelta || -e0.detail;
            this.scrollTop += (delta < 0 ? 1 : -1) * 30;
            e.preventDefault();
        }
    });

    // Scroll to top button appear
    $(document).on('scroll', function () {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    // Smooth scrolling using jQuery easing
    $(document).on('click', 'a.scroll-to-top', function (e) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('to')).offset().top)
        }, 1000, 'easeInOutExpo');
        e.preventDefault();
    });

    $(document).ready(function () {
        function applyActiveClass(selector) {
            var currentUrl = window.location.hash;

            // Recorre todos los elementos con la clase nav-item o collapse-item
            $(selector).each(function () {
                var link = $(this).is('.collapse-item') ? $(this).attr('href') : $(this).find('a').attr('href');

                // Comprueba si el href coincide con la URL actual y agrega o elimina la clase 'active'
                $(this).toggleClass('active', link === currentUrl);
            });
        }

        // Captura el cambio en la URL
        $(window).on('hashchange', function () {
            applyActiveClass('.nav-item, .collapse-item');
        });

        // Dispara el evento hashchange al cargar la página para aplicar la lógica inicialmente
        $(window).trigger('hashchange');
    });

})(jQuery); // End of use strict

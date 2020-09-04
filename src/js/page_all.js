$(document).ready(function () {
    // show hidden menu
    $('.navbar-toggler').on('click',function () {
        $('.navbar-collapse,.modal-navbar').toggleClass('show');
    });
    $('.navbar-collapse .close,.modal-navbar').on('click',function () {
        $('.navbar-collapse,.modal-navbar').removeClass('show');
    });

    // active navbar of page current
    var urlcurrent = window.location.href;
    $(".navbar-nav li a[href$='"+urlcurrent+"']").addClass('active');

    // effect navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('header').addClass('scroll');
        }else{
            $('header').removeClass('scroll');
        }
    });

    $('.btn_search').on('click',function () {
        $('.form-search').addClass('show');
        $('.form-search input').focus();
    });
    $(document).mouseup(function(e){
        var container = $(".form-search");
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            $('.form-search').removeClass('show');
        }
    });

    //slick js
    $('.wcc_slider').slick({
        centerMode: false,
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: false,
        centerPadding: 0,
        autoplay: true,
        dots: false,
        arrows: true,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    });

    // js effect_border
    $('.effect_border').click(function () {
        $(this).toggleClass('focus');
    });
    $('.effect_border').keydown(function (e) {
        var code = e.keyCode || e.which;
        if (code === 9) {
            $('.effect_border').removeClass('focus');
            $(this).next().addClass('focus');
        }
    });
    var item_input = $('.effect_border .form-control');
    $(item_input).on('change', function () {
        if ($(this).val().length > 0) {
            $(this).parent().addClass('filled');
        } else {
            $(this).parent().removeClass('filled');
        }
    });

    $(document).mouseup(function (e) {
        var form_group = $('wrapper');
        if (!form_group.is(e.target) && form_group.has(e.target).length === 0) {
            $('.effect_border,.select_b').removeClass('focus');
        }
    });
});
//scroll effect
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight() - 100;

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height() - 100;

    return elementBottom > viewportTop && elementTop < viewportBottom;
};
$(window).on('resize scroll load', function() {
    $('.fadeup').each(function() {
        if ($(this).isInViewport()) {
            $(this).addClass('fadeInUp').css({'opacity':'1','visibility':'visible'});
        }
    });
    $('.fadein').each(function() {
        if ($(this).isInViewport()) {
            $(this).addClass('fadeIn').css({'opacity':'1','visibility':'visible'});
        }
    });
    $('.zoomin').each(function() {
        if ($(this).isInViewport()) {
            $(this).addClass('zoomIn').css({'opacity':'1','visibility':'visible'});
        }
    });
    $('.fadeinleft').each(function() {
        if ($(this).isInViewport()) {
            $(this).addClass('fadeInLeft').css({'opacity':'1','visibility':'visible'});
        }
    });
    $('.fadeinright').each(function() {
        if ($(this).isInViewport()) {
            $(this).addClass('fadeInRight').css({'opacity':'1','visibility':'visible'});
        }
    });
});
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

    $('.dropdown-toggle').on('click',function () {
       $(this).parent().addClass('show');
    });

    $(document).mouseup(function(e){
        var container = $(".dropdown-content");
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            $('.dropdown').removeClass('show');
        }
    });

    //slick js
    $('.product_like_list').slick({
        centerMode: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        centerPadding: 0,
        autoplay: true,
        dots: false,
        arrows: true
    });

    // function
    function add_amout(add_amount) {
        var counter=$(add_amount).parent().find('input').val();
        counter ++;
        $(add_amount).parent().find('input').val(counter);
        return counter;
    }
    function reduce_amout(reduce_amount) {
        var counter=$(reduce_amount).parent().find('input').val();
        counter --;
        if(counter == 0){
            counter = 1;
            return counter
        }
        $(reduce_amount).parent().find('input').val(counter);
        return counter;
    }
    $('.redu_amount').click(function () {
        reduce_amout(this);
    });
    $('.add_amount').click(function () {
        add_amout(this);
    });

    // show menu
    $('.profile__nav li').click(function () {
        $('.profile__nav li').removeClass('active');
        $(this).addClass('active');
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
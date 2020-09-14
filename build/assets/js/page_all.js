/*!
 * 
 * 
 * 
 * @author Thuclfc
 * @version 
 * Copyright 2020. MIT licensed.
 */$(document).ready(function () {
  // show hidden menu
  $('.navbar-toggler').on('click', function () {
    $('.navbar-collapse,.modal-navbar').toggleClass('show');
  });
  $('.navbar-collapse .close,.modal-navbar').on('click', function () {
    $('.navbar-collapse,.modal-navbar').removeClass('show');
  }); // active navbar of page current

  var urlcurrent = window.location.href;
  $(".profile__nav li a[href$='" + urlcurrent + "']").addClass('active');
  $(window).on('load', function () {
    $('.profile__nav li a.active').parents('li').addClass('current');
  }); // show menu

  $('.profile__nav li').click(function () {
    $('.profile__nav li').removeClass('active');
    $(this).addClass('active');
  }); //show notifi

  $('.notifi').on('click', function () {
    $('.notified').addClass('show');
  });
  $('.notified .close').on('click', function () {
    $('.notified').removeClass('show');
  }); //show more article

  $('.btn_viewfull').on('click', function () {
    $('.info_detail article').addClass('show');
  });
  $('.btn_collapse').on('click', function () {
    $('.info_detail article').removeClass('show');
  }); //show filter

  $('.toggle-filter').on('click', function () {
    $('.filter,.modal-filter').addClass('show');
  });
  $('.modal-filter').on('click', function () {
    $('.filter,.modal-filter').removeClass('show');
  });
  $('.filter__list h5').on('click', function () {
    $(this).parent().toggleClass('active');
  }); // effect navbar

  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $('header').addClass('scroll');
    } else {
      $('header').removeClass('scroll');
    }
  });
  $('.dropdown-toggle').on('click', function () {
    $(this).parent().addClass('show');
  });
  $(document).mouseup(function (e) {
    var container = $(".dropdown-content,.notified");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $('.dropdown,.notified').removeClass('show');
    }
  });
  $('.form-group input').on('focus', function () {
    $(this).parent().addClass('focus');
  }); //hiden show password

  $(".toggle-password").click(function () {
    $(this).toggleClass("show");
    var input = $($(this).attr("toggle"));

    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  }); //checked uncheck input

  $('.brand  input').on('change', function () {
    if ($(this).is(':checked')) {
      $(this).parents('.cart__list').find('.item input').prop("checked", true);
    } else {
      $(this).parents('.cart__list').find('.item input').prop("checked", false);
    }
  }); //show modal dropdown

  $('header .dropdown').on('click', function () {
    $('.modal-popup').addClass('show');
  });
  $('.modal-popup').on('click', function () {
    $('.modal-popup').removeClass('show');
    $('header .dropdown').removeClass('show');
  }); //show link mobile

  $('.navbar-toggler').on('click', function () {
    $('.box-link,.modal-popup').addClass('show');
  });
  $('.modal-popup').on('click', function () {
    $('.box-link,.modal-popup').removeClass('show');
  }); //slick js

  $('.product_like_list').slick({
    centerMode: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    centerPadding: 0,
    autoplay: false,
    dots: false,
    arrows: true,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 1
      }
    }]
  }); // function

  function add_amout(add_amount) {
    var counter = $(add_amount).parent().find('input').val();
    counter++;
    $(add_amount).parent().find('input').val(counter);
    return counter;
  }

  function reduce_amout(reduce_amount) {
    var counter = $(reduce_amount).parent().find('input').val();
    counter--;

    if (counter == 0) {
      counter = 1;
      return counter;
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
}); //scroll effect

$.fn.isInViewport = function () {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight() - 100;
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height() - 100;
  return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(window).on('resize scroll load', function () {
  $('.fadeup').each(function () {
    if ($(this).isInViewport()) {
      $(this).addClass('fadeInUp').css({
        'opacity': '1',
        'visibility': 'visible'
      });
    }
  });
  $('.fadein').each(function () {
    if ($(this).isInViewport()) {
      $(this).addClass('fadeIn').css({
        'opacity': '1',
        'visibility': 'visible'
      });
    }
  });
  $('.zoomin').each(function () {
    if ($(this).isInViewport()) {
      $(this).addClass('zoomIn').css({
        'opacity': '1',
        'visibility': 'visible'
      });
    }
  });
  $('.fadeinleft').each(function () {
    if ($(this).isInViewport()) {
      $(this).addClass('fadeInLeft').css({
        'opacity': '1',
        'visibility': 'visible'
      });
    }
  });
  $('.fadeinright').each(function () {
    if ($(this).isInViewport()) {
      $(this).addClass('fadeInRight').css({
        'opacity': '1',
        'visibility': 'visible'
      });
    }
  });
});
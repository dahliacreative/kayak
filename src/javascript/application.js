RN.Header.init();
$('.slider').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 568,
      settings: {
        slidesToShow: 1
      }
    }
  ]
})
var animated = false
$('.donate').waypoint(function(direction) {
  if(!animated) {
    animated = true;
    var num = parseFloat($('.track__bar').data('num').replace(',', ''));
    var percent = num/10000*100;
    $('.track__bar').css({
      width: percent + '%'
    })
    var options = {
      useEasing : true,
      useGrouping : true,
      separator : ',',
      decimal : '.',
      prefix : '£',
      suffix : ''
    };
    var demo = new CountUp("total", 0, num, 0, 2, options);
    demo.start();
  }
}, {
  offset: '75%'
})
$('.sharetastic').sharetastic({
  sprite: 'app/images/sharetastic.svg',
  services: {
    facebook: {
      href: 'https://www.facebook.com/Kayak2017/'
    },
    twitter: {
      href: 'https://twitter.com/Kayak2017/'
    },
    pinterest: false,
    linkedin: false,
    googleplus: false,
    tumblr: false,
    email: false,
    print: false
  }
})
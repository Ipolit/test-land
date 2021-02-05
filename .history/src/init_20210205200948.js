import './style.scss';

import 'jquery-validation';

$(document).ready(function () {
    $('.header .hamburger').on('click', function (e) {
        e.preventDefault();
        $('.sidemenu').toggleClass('active');
        $('body').toggleClass('locked');
    });

    $('#tabs-nav li:first-child').addClass('active');
    $('#tabs-content .tab-content').hide();
    $('#tabs-content .tab-content:first-child').show();

    $('#tabs-nav li').click(function(){
        $('#tabs-nav li').removeClass('active');
        $(this).addClass('active');
        $('.tab-content').hide();
        var activeTab = $(this).find('a').attr('href');
        $(activeTab).fadeIn();
        return false;
    })

    $('.faq-accordion .faq-accordion-content').hide();

    $('.faq-accordion-headline').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);

        if (!$this.hasClass('faq-accordion-active')) {
            $('.faq-accordion-content').slideUp(400);
            $('.faq-accordion-headline').removeClass('faq-accordion-active');
        }

        $this.toggleClass('faq-accordion-active');
        $this.next().slideToggle();
    });

    $('#subscribe-form').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
        },
        messages: {
            email: {
              required: "We need your email address to contact you",
              email: "Whoops, make sre it's an email"
            }
        }
    });

    window.wow = new WOW();
    wow.init();
});
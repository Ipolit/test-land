import './style.scss';

import 'jquery-validation';

$(document).ready(function () {
    var body = $('body');
    var globalNav = body.children('nav');
    var globalSideMenu = body.children('div.sidemenu');

    globalNav.find('.hamburger-component').click(function () {
        globalSideMenu.toggleClass('visible');
    });
    globalSideMenu.find('.toggle').click(function () {
        globalSideMenu.toggleClass('visible');
    });
    $('body > nav .sub-nav-container > a, body > div.sidemenu .sub-nav-container > a').click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var subNav = $(this).siblings('.sub-nav');
        if (subNav.hasClass('visible')) {
            subNav.removeClass('visible');
        } else {
            globalNav.find('.sub-nav-container .sub-nav').removeClass('visible');
            globalSideMenu.find('.sub-nav').removeClass('visible');
            subNav.addClass('visible');
        }
    });
    $(window).click(function () {
        $('nav .sub-nav.visible').removeClass('visible');
        $('.sidemenu .sub-nav.visible').removeClass('visible');
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

    $('#myform').validate({ // initialize the plugin
        rules: {
            field1: {
                required: true,
                email: true
            },
            field2: {
                required: true,
                minlength: 5
            }
        }
    });

    window.wow = new WOW();
    wow.init();
});
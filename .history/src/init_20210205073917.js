import './style.scss';

+console.log('It\'s Alive!!!');

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

    var allPanels = $('.faq-accordion > p').hide();
    
    $('.accordion > dt > a').click(function() {
        allPanels.slideUp();
        $(this).parent().next().slideDown();
        return false;
    });

    window.wow = new WOW();
    wow.init();
});
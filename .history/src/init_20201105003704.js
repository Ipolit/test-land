import './style.scss';

+console.log('It\'s Alive!!!');

$(document).ready(function () {
    /* Inject Section Specific Javascript */
    /* Parallax scrolling plugin */
    var parollerElements = $('.my-paroller');
    if (parollerElements.paroller) {
        parollerElements.paroller();
    }
    var hideScrollStyles = '' +
        'html,' +
        'body {' +
        'position: relative;' +
        'height: 100%;' +
        '}';
    var body = $('body');
    var globalNav = body.children('nav');
    var globalSideMenu = body.children('div.sidemenu');
    var contactForms = $('form[data-type="contact-form"]');
    var buttonLinks = $('button, a');
    /* Global Button Handling */
    buttonLinks.click(function (e) {
        var buttonLink = $(this);
        var type = buttonLink.data('type');
        var href = buttonLink.attr('href');
        // VIDEO Button
        if (type === 'VIDEO') {
            var section = buttonLink.closest('section');
            var src = buttonLink.attr('data-src');
            /* embed youtube/vimeo video url */
            var youtubeId = '';
            var vimeoId = '';
            if (
                src && (src.indexOf('youtube.com') !== -1 ||
                src.indexOf('youtu.be') > -1)
            ) {
                // test link: https://regexr.com/3anm9
                const youtubeRegex = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v=))|youtu.be\/)([a-zA-Z0-9_-]{6,11})/;
                const youtubeResult = src.match(youtubeRegex);
                if (youtubeResult) youtubeId = youtubeResult[1];
            }
            if (src && src.indexOf('vimeo.com') !== -1) {
                // test link: https://regexr.com/3begm
                const vimeoRegex = /(?:(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|)|player.vimeo.com\/video\/)(\d{6,9})(?:|\/\?)/;
                const vimeoResult = src.match(vimeoRegex);
                if (vimeoResult) vimeoId = vimeoResult[3];
            }
            if (youtubeId) {
                src = `https://youtube.com/embed/${youtubeId}?autoplay=1&controls=0`;
            } else if (vimeoId) {
                src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
            }
            if (!src || !section) {
                return;
            }
            body.append(
                '<div id="modal-' + section.attr('id') + '" class="modal visible">' +
                '<div class="modal-content">' +
                '<div class="lightbox-video">' +
                '<div class="video-player">' +
                '<div class="embed-container" style="width:1280px;height:720px;">' +
                '<iframe frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="100%" height="100%" src="' + src + '"></iframe>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<a class="close"><img src="https://s3-us-west-2.amazonaws.com/luxurycoders-user-uploads/uploads/icon-close-white.png" alt="close"></a>' +
                '</div>'
            );
            $('#modal-' + section.attr('id') + ' .close').click(function () {
                $('#modal-' + section.attr('id')).remove();
            });
            return;
        }
        // CONTACT_US BUTTON
        if (type === 'CONTACT_US') {

            /*document.sendGoogleEvent(
                {
                    hitType: 'event',
                    eventCategory: 'button',
                    eventAction: 'click',
                    eventLabel: 'contact'
                });*/
            $('#modal-global-contact-us').addClass('visible');
            $('<style id="hide-body-scroll">').text(hideScrollStyles).appendTo(document.head);
            return;
        }
        // SUBSCRIBE BUTTON
        if (type === 'SUBSCRIBE') {
            $('#modal-global-subscribe').toggleClass('visible');
            return;
        }
        // MY_ACCOUNT BUTTON
        if (type === 'MY_ACCOUNT') {
            $('#modal-global-my-account').toggleClass('visible');
            return;
        }
        // SHARE_POPUP
        if (type === 'SHARE_POPUP') {
            $(this).find('.share-popup').css('display', 'flex');
            e.stopPropagation();
            return;
        }
        // MAILTO Event
        if (href && href.indexOf('mailto:') === 0) {
            var email = href.replace('mailto:', '');
            /*document.sendGoogleEvent(
                {
                    hitType: 'event',
                    eventCategory: 'button',
                    eventAction: 'click',
                    eventLabel: 'Email',
                    eventValue: email
                });*/
        }
        // TEL Event
        if (href && href.indexOf('tel:') === 0) {
            var phoneNumber = $(this).attr('href').replace('tel:', '');
            /*document.sendGoogleEvent(
                {
                    hitType: 'event',
                    eventCategory: 'button',
                    eventAction: 'click',
                    eventLabel: 'Phone',
                    eventValue: phoneNumber
                });*/
        }
    });
    $('body > .modal .close').click(function () {
        $(this).closest('.modal').removeClass('visible');
        $('#hide-body-scroll').remove();
    });
    contactForms.submit(function (e) {
        e.preventDefault();
        var contactForm = $(this);
        var fields = contactForm.serializeArray();
        var values = {};
        contactForm.addClass('loading');
        fields.forEach(function (field) {
            values[field.name] = field.value;
        });
        var name = values.name;
        if (!name && values.firstName) {
            name = values.firstName;
            if (values.lastName) {
                name += ' ' + values.lastName;
            }
        }
        // pass all other form values in 'content'
        var content = Object.assign({}, values);
        delete content.name;
        delete content.firstName;
        delete content.lastName;
        delete content.email;
        delete content.phone;
        delete content.phoneNumber;
        delete content.source;
        delete content.message;
        var data = {
            activity: {
                author_email: values.email,
                author_name: name,
                author_phone: values.phone || values.phoneNumber,
                activity_source: values.source || "CONTACT_INQUIRY",
                comments_attributes: [{text: values.message}],
                source_url: window.location.href,
                content: content,
            },
        };
        $.post("/mls/activities",
            JSON.parse(JSON.stringify(data)),
            function (data) {
                contactForm.find('.success').removeClass('hide');
                contactForm.removeClass('loading');
                setTimeout(function () {
                    contactForm.closest('.modal').removeClass('visible');
                    $('#hide-body-scroll').remove();
                    contactForm.find("input:not([type=\"submit\"])").val("");
                    contactForm.find("textarea").val("");
                    $('.success').addClass('hide');
                }, 1300)
            });
        var event = {
            hitType: 'event',
            eventCategory: 'button',
            eventAction: 'click',
        };
        switch (data.activity.activity_source) {
            case('NEWSLETTER_SIGNUP'):
                event.eventLabel = 'Newsletter';
                break;
            case('HOME_SEARCH'):
                event.eventLabel = 'HomeSearch';
                break;
            case('HOME_VALUE'):
            case('HOME_VALUATION'):
                event.eventLabel = 'HomeValue';
                break;
            case('EBOOK'):
                event.eventLabel = 'Ebook';
                break;
            case('CONTACT_INQUIRY'):
            default:
                // for contact forms, Marketing has requested that they see a page-view of 'thank-you' as indication of success
                // Note that this will break if we have actual page with url of /thank-you
                event = {
                    hitType: 'pageview',
                    page: '/thank-you',
                };
                break;
        }
        document.sendGoogleEvent(event);
    });
    $(window).click(function () {
        $('.share-popup').css('display', 'none');
    });
    /* Generic Navbar Handling */
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

    window.wow = new WOW();
    wow.init();

    var bodyPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (bodyPosition > 0 ) {
        $(".header .wow").each(function() {
            wow.show(this);
        });
    }





    // Custom select

    function convertSelectToDropdown(selectItem) {
        let customDropdown = `
        <div class="custom-select" role="presentation">
            <button class="custom-select-toggle" type="button" aria-haspopup="true" aria-expanded="false"></button>
            <div class="custom-select-menu">
                <div class="custom-select-content">
                </div>
            </div>
        </div>`;


        $(customDropdown).insertAfter(selectItem);
        let $dropdown = $($(selectItem).next());
        let $dropdownToggle = $dropdown.find(".custom-select-toggle");
        let $dropdownMenu = $dropdown.find(".custom-select-menu");
        let $dropdownContent = $dropdown.find(".custom-select-content");

        $dropdownToggle.addClass($(selectItem).attr("class")).removeClass("dropdown-select");

        $dropdownToggle.attr("id", $(selectItem).attr("id") + "custom");
        $dropdownMenu.attr("aria-labelledby", $dropdownToggle.attr("id"));

        appendOptionButtons(selectItem, $dropdownContent);

        $(selectItem).removeClass().addClass("visually-hidden");

        // setting value to custom select toggle: either selected or first option
        let toggleText = $(selectItem).find(":selected").first().text() || $(selectItem).children().first().text();
        $dropdownToggle.html(toggleText);

        $dropdown.on("click", ".custom-select-item", function (e) {
            if ($(this).hasClass("is-disabled")) return;
            let elementNumber = $(this).index();
            let $originalSelect = $(this).closest(".custom-select").siblings("select");
            let $linkedOption = $originalSelect.find("option").eq(elementNumber);

            if (!$linkedOption.prop("selected")) {
                $linkedOption.prop("selected", true);
                $originalSelect.change();
                $(this)
                  .addClass("is-selected")
                  .siblings(".custom-select-item").removeClass("is-selected");
                $dropdownToggle.html($(this).html());
                closeSelectMenu($(this).closest(".custom-select-menu"));
            }
        });

        function convertOptionToButton(option) {
            let optionText = $(option).text();
            let optionValue = $(option).attr("value") || $(option).text();
            let optionIsDisabled = $(option).prop("disabled") ? "disabled" : "";

            return '<button value='+optionValue+' class="custom-select-item" type="button" '+optionIsDisabled+'>'+optionText+'</button>';
        }

        function appendOptionButtons(selectItem, appendTarget) {
            $(selectItem).find("option").each(function () {
                let currentButton = convertOptionToButton(this);
                $(appendTarget).append(currentButton);
            });
        }

        function showSelectMenu(selectMenu) {
            let customSelect = $(selectMenu).closest(".custom-select")[0];
            $(customSelect).addClass("open");
            $(selectMenu).slideDown(200);
        }

        function closeSelectMenu(selectMenu) {
            let customSelect = $(selectMenu).closest(".custom-select")[0];
            $(customSelect).removeClass("open");
            $(selectMenu).slideUp(200);
        }

        $dropdown.on("click", ".custom-select-toggle", function (e) {
            let $customSelect = $(this).closest(".custom-select");
            let selectMenu = $customSelect.find(".custom-select-menu")[0];
            if ($customSelect.hasClass("open")) {
                closeSelectMenu(selectMenu)
            } else {
                showSelectMenu(selectMenu);
            }
        });

        // Closing custom selects on click outside
        $(document).on("click", function (e) {
            if (($(e.target).closest(".custom-select").length < 1) && $(".custom-select").hasClass("open")) {
                $(".custom-select.open").each(function () {
                    let selectMenu = $(this).find(".custom-select-menu")[0];
                    closeSelectMenu(selectMenu);
                });
            }
        });
    }

    // resetting custom selects on form reset
    $("form").on("reset", function () {
        $(this).find(".search-select").each(function () {
            let linkedSelect = $(this).siblings("select")[0];
            $(this).find(".dropdown-toggle").text(linkedSelect.children[0].innerText);
            $(this).find(".dropdown-item").removeClass("is-selected");
        });
    });


    // Applying custom select script to
    $(".form-group select").each(function () {
        convertSelectToDropdown(this);
    });

});
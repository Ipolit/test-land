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
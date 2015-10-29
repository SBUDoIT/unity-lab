(function($) {



    $(document).ready(function() {



        var accordionContent;
        var openTab;
        $('.drop-accordion-card').on('click', function() {
            
            accordionContent = $(this).closest('.drop-accordion-card').find('.drop-accordion-card--content-wrap');
            openTab = $(this).closest('.drop-accordion-cards').find('.js-drop-accordion-card__open').closest('.drop-accordion-card').find('.drop-accordion-card--tab');

            if (accordionContent.hasClass('hide-accessible')) {
                $(this).addClass('js-drop-accordion-card__active');
                accordionContent.slideUp(0, function() {
                    accordionContent.removeClass('hide-accessible').addClass('js-drop-accordion-card__open')
                        .slideDown('fast');
                    openTab.click();
                });

            } else {
                $(this).removeClass('js-drop-accordion-card__active');
                accordionContent.slideUp('fast', function() {
                    accordionContent.addClass('hide-accessible').removeClass('js-drop-accordion-card__open')
                        .slideDown(0);
                });

            }

        });

    });

})(jQuery);

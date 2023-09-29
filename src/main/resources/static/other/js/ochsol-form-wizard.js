// Progress Wizard
jQuery('#progressWizard').bootstrapWizard({
    onTabShow: function (tab, navigation, index) {
        tab.prevAll().addClass('done');
        tab.nextAll().removeClass('done');
        tab.removeClass('done');

        var $total = navigation.find('li').length;
        var $current = index + 1;

        if ($current >= $total) {
            $('#progressWizard').find('.wizard .next').addClass('hide');
            $('#progressWizard').find('.wizard .finish').removeClass('hide');
        } else {
            $('#progressWizard').find('.wizard .next').removeClass('hide');
            $('#progressWizard').find('.wizard .finish').addClass('hide');
        }

        var $percent = ($current / $total) * 100;
        $('#progressWizard').find('.progress-bar').css('width', $percent + '%');
    }
});


// Wizard With Form Validation
jQuery('#valWizard').bootstrapWizard({
    onTabShow: function (tab, navigation, index) {
        tab.prevAll().removeClass('done');
        tab.nextAll().removeClass('done');
        tab.removeClass('done');

        var $total = navigation.find('li').length;
        var $current = index + 1;

        if ($current >= $total) {
            $('#valWizard').find('.wizard .next').addClass('hide');
            $('#valWizard').find('.wizard .finish').removeClass('hide');
        } else {
            $('#valWizard').find('.wizard .next').removeClass('hide');
            $('#valWizard').find('.wizard .finish').addClass('hide');
        }
    },
    onTabClick: function (tab, navigation, index) {
        var $valid = jQuery('#valWizard').valid();
        if (!$valid) {
            $validator.focusInvalid();
            return false;
        }
    },
    onNext: function (tab, navigation, index) {
        var $valid = jQuery('#valWizard').valid();
        if (!$valid) {
            $validator.focusInvalid();
            return false;
        }
    }
});

// Wizard With Form Validation
var $validator = jQuery("#valWizard").validate({
    highlight: function (element) {
        jQuery(element).closest('.form-group').removeClass('has-success').addClass('has-error');
    },
    success: function (element) {
        jQuery(element).closest('.form-group').removeClass('has-error');
    }
});


// This will submit the basicWizard form
jQuery('#valWizard').submit(function () {
    var $valid = jQuery('#valWizard').valid();
    if (!$valid) {
        $validator.focusInvalid();
        return false;
    }
});

// Basic Wizard
jQuery('#basicWizard').bootstrapWizard({
    onTabShow: function (tab, navigation, index) {
        tab.prevAll().addClass('done');
        tab.nextAll().removeClass('done');
        tab.removeClass('done');

        var $total = navigation.find('li').length;
        var $current = index + 1;

        if ($current >= $total) {
            $('#basicWizard').find('.wizard .next').addClass('hide');
            $('#basicWizard').find('.wizard .finish').removeClass('hide');
        } else {
            $('#basicWizard').find('.wizard .next').removeClass('hide');
            $('#basicWizard').find('.wizard .finish').addClass('hide');
        }
    }
});

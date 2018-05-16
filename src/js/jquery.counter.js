$.fn.counter = function() {
    $(this).each(function(i, el) {
        var count = $(el).find('.count');
        var decrease = $(el).find('.decrease');
        var increase = $(el).find('.increase');
        count.keyup(function(event) {
            console.log(this)
            this.value = this.value.replace(/\D+/g, "");
            if (parseInt(count.val()) > 1) {
                decrease.removeClass("no-drop");
            } else if (parseInt(count.val()) <= 1) {
                count.val(1);
                decrease.addClass("no-drop");
            }
        });

        count.blur(function() {
            if (!this.value) {
                this.value = 1;
            }
        });

        decrease.click(function() {
            count.val(parseInt(count.val()) - 1);
            if (parseInt(count.val()) <= 1) {
                decrease.addClass("no-drop");
                count.val(1);
            }
        });

        increase.click(function() {
            count.val(parseInt(count.val()) + 1);
            if (parseInt(count.val()) > 1) {
                decrease.removeClass("no-drop");
            }

        });
    })
};
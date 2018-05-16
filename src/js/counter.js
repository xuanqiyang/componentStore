;(function(){
    NodeList.prototype.counter = Element.prototype.counter = function() {

    var counter = this;
    var count, decrease, increase;

    var countKeyupHandler = function(event) {
        var decrease = this.parentElement.querySelector('.decrease')
        this.value = this.value.replace(/\D+/g, '');
        if (parseInt(this.value) > 1) {
            decrease.classList.remove('no-drop');
        } else if (parseInt(this.value) <= 1) {
            decrease.classList.add('no-drop');
            this.value = 1;
        }
    };

    var countBlurHandler = function(event) {
        if (!this.value) {
            this.value = 1;
        }
    };


    var decreaseClickHandler = function(event) {
        var count = this.parentElement.querySelector('.count');
        count.value = parseInt(count.value) - 1;
        if (count.value <= 1) {
            this.classList.add('no-drop');
            count.value = 1;
        }
    };

    var increaseClickHandler = function(event) {
        var count = this.parentElement.querySelector('.count');
        var decrease = this.parentElement.querySelector('.decrease');
        count.value = parseInt(count.value) + 1;
        if (parseInt(count.value) > 1) {
            decrease.classList.remove('no-drop');
        }

    };

    if (Object.prototype.toString.call(counter) === '[object NodeList]' ||
        Object.prototype.toString.call(counter) === '[object HTMLCollection]') {
        for (var counterNum = counter.length - 1; counterNum >= 0; counterNum--) {
            count = counter[counterNum].querySelector('.count');
            decrease = counter[counterNum].querySelector('.decrease');
            increase = counter[counterNum].querySelector('.increase');
            // count.value = (~~count.value) || 1;
            if (parseInt(count.value) !== parseInt(count.value)) {
                throw new Error(this + '中的count不是一个数字');
            }
            if (count.value == 1) {
                decrease.classList.add('no-drop');
            }
            count.onkeyup = countKeyupHandler;
            count.onblur = countBlurHandler;
            decrease.onclick = decreaseClickHandler;
            increase.onclick = increaseClickHandler;
        }
    } else {
        count = counter.querySelector('.count');
        decrease = counter.querySelector('.decrease');
        increase = counter.querySelector('.increase');

        // count.value = (~~count.value) || 1;
        if (parseInt(count.value) !== parseInt(count.value)) {
            throw new Error(this + '中的count不是一个数字');
        }
        if (count.value == 1) {
            decrease.classList.add('no-drop');
        }
        count.onkeyup = countKeyupHandler;
        count.onblur = countBlurHandler;
        decrease.onclick = decreaseClickHandler;
        increase.onclick = increaseClickHandler;
    }
}
})();

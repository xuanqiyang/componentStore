;
(function() {
    var navBar = document.querySelector('.nav-bar'),
        navItems = document.querySelectorAll('.nav .nav-item'),
        navChildren = document.querySelectorAll('.nav .nav-item .nav-child'),
        selecter = document.querySelector('.form-select input[type=text]'),
        timer;
    // var bannerHeight = document.defaultView.getComputedStyle(document.querySelector('.site-banner-main')).height;
    var goTop = document.querySelector('.fixbar-top');

    //滚动到某位置显示更多
    document.body.onscroll = function() {
        if (document.documentElement.scrollTop >= parseInt(bannerHeight) - 200) {
            goTop.style.display = 'block';
        } else {
            goTop.style.display = 'none';
        }
    };
    //直到顶部
    // goTop.onclick = function(event) {
    //     var goTopTimer = setInterval(function() {
    //         document.documentElement.scrollTop = document.documentElement.scrollTop - 10;
    //         if (document.documentElement.scrollTop == 0) {
    //             clearInterval(goTopTimer);
    //         }
    //     }, 10);

    // };
    //导航栏事件
    for (var i = 0; i < navItems.length; i++) {
        navItems[i].addEventListener('mouseover', mouseEnter, false);
        navItems[i].addEventListener('mouseout', mouseLeave, false);
    }
    for (var j = 0; j < navChildren.length; j++) {
        navChildren[j].addEventListener('mouseover', mouseEnterChild, false);
        navChildren[j].addEventListener('mouseleave', mouseLeaveChild, false);
    }
    // selecter.addEventListener('focus', selectFocus, false);
    // selecter.addEventListener('blur', selectBlur, false);

    //下拉框获取焦点
    function selectFocus() {
        var parent = getParentByclass(this, 'form-select');
        parent.classList.add('form-selected');
    }
    //失去焦点
    function selectBlur() {
        var parent = getParentByclass(this, 'form-select');
        parent.classList.remove('form-selected');
    }

    //根据子元素class获得父元素
    function getParentByclass(ele, classStr) {
        var parent = ele.parentNode;
        while (!parent.classList.contains(classStr)) {
            parent = parent.parentNode;
        }
        return parent;
    }

    function mouseEnter() {
        if (!this.classList.contains('active')) {
            for (var i = 0; i < navItems.length; i++) {
                if (navItems[i].classList.contains('active')) {
                    navItems[i].classList.remove('active');
                }
            }
            this.classList.add('active');
            var navChild = this.querySelector('.nav-child');
            if (navChild) {
                clearTimeout(timer);
                navChild.classList.add('show');
            }
            var width = this.getBoundingClientRect().width;
            var left = this.offsetLeft;
            navBar.style.opacity = 1;
            navBar.style.top = top + 'px';
            navBar.style.left = left + 'px';
            navBar.style.width = width + 'px';
            navBar.style.transform = 'scaleX(1)'
            navBar.style.transition = "all .2s linear"
        }
    }

    function mouseLeave(event) {
        var navChild = event.currentTarget.querySelector('.nav-child');
        if (navChild) {
            timer = setTimeout(function() {
                navChild.classList.remove('show');
            }, 500);
        }
        this.classList.remove('active');
        navBar.style.opacity = 0;
        navBar.style.transform = 'scaleX(0)'
        navBar.style.transition = "all .3s linear .3s"
    }

    function mouseEnterChild(event) {
        clearTimeout(timer);
        this.classList.add('show');
    }

    function mouseLeaveChild(event) {
        this.classList.remove('show');
    }
})();
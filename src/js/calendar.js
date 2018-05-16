var Calendar = function(eleCalendar, yearArg, monthArg, dateArg) {
    var _Date = function() {
        var date;
        var __self = this;
        if(yearArg && monthArg && dateArg){
            date = new Date(yearArg, monthArg-1, dateArg);
        } else{
            date = new Date();
        }
        this.dayOfWeek = 0;
        this.month = 0;
        this.dayOfMonth = 0;
        this.year = 0;
        this.daysInThisMonth = 0;
        this.weekIsfirstDayOfMonth = 0;
        this.IndexOflastday = 0;
        var initDate = function() {
            with(__self){
                dayOfWeek = date.getDay(); //获取当日星期
                month = date.getMonth(); //获取当日月份
                dayOfMonth = date.getDate(); //获取当月日期
                year = date.getFullYear(); //获取当日年份
                daysInThisMonth = new Date(year, month + 1, 0).getDate(); //获取当月总天数
                weekIsfirstDayOfMonth = new Date(year, month, 1).getDay(); //这个月第一天是星期几
                IndexOflastday = weekIsfirstDayOfMonth + daysInThisMonth - 1; //这个月最后一天的在日历表格中的索引
            }
        };
        this.subMonth = function() {
            date.setMonth(--this.month);
            initDate();
        };
        this.addMonth = function() {
            date.setMonth(++this.month);
            initDate();
        };
        initDate();
    };
    var _now = new _Date();
    renderCalendar();

    function renderCalendar() { // 渲染日历UI
        var weekdaysText = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
            fragCalendar = document.createDocumentFragment(),
            eleWeekdays = document.createElement('ul'),
            eleMonthdays = document.createElement('ul'),
            eleHeadCalendar = document.createElement('div'),
            liWeekday,
            liMonthday;
        //设置样式
        eleWeekdays.className = 'weekdays';
        eleMonthdays.className = 'monthdays';
        eleHeadCalendar.className = 'head-calendar';
        eleHeadCalendar.id = 'headCalendar';
        eleHeadCalendar.innerHTML = '<span id="subMonth">&lt;</span><i id="date"></i><span id="addMonth">&gt;</span>';
        // 渲染日历UI
        for (var i = 0; i < weekdaysText.length; i++) {
            liWeekday = document.createElement('li');

            liWeekday.innerText = weekdaysText[i];

            eleWeekdays.appendChild(liWeekday);

            for (var j = 5; j > 0; j--) {
                liMonthday = document.createElement('li');
                eleMonthdays.appendChild(liMonthday);
            }
        }
        fragCalendar.appendChild(eleHeadCalendar);
        fragCalendar.appendChild(eleWeekdays);
        fragCalendar.appendChild(eleMonthdays);
        eleCalendar.appendChild(fragCalendar);
        var changeDate = function(event) {
            if (event.target.id === 'subMonth') {
                _now.subMonth();
            } else if (event.target.id === 'addMonth') {
                _now.addMonth();
            }
            fillDaysInMonth();
        };

        document.getElementById('headCalendar').addEventListener('click', changeDate, false);
        fillDaysInMonth();
    }


    function fillDaysInMonth() { //填充天数到日历
        var monthdays = eleCalendar.querySelector('.monthdays');
        var dayInAMonth = 1,
            dayOfNextMonth = 1,
            dayOfPreMonth = new Date(_now.year, _now.month, 0).getDate(), //获取上个月的天数
            elMonthdays,
            indexofDayOfMonth = _now.weekIsfirstDayOfMonth - 1; //
        // 填充日历中的天数
        document.getElementById('date').innerText = _now.year + '     ' + Number(_now.month + 1);
        for (var liNum = 0; liNum < monthdays.children.length; liNum++) {
            if (liNum >= _now.weekIsfirstDayOfMonth && dayInAMonth <= _now.daysInThisMonth) { //如果填充的格子在某一个月之内
                monthdays.children[liNum].innerText = dayInAMonth++;

            } else if (liNum > _now.IndexOflastday && liNum < monthdays.children.length) { //如果这个月的天数没有填满日历表格,填充下个月的格子
                monthdays.children[liNum].innerText = dayOfNextMonth++;

            } else if (liNum < _now.weekIsfirstDayOfMonth && indexofDayOfMonth >= 0) { //补充上个月的格子
                monthdays.children[liNum].innerText = dayOfPreMonth - indexofDayOfMonth;
                indexofDayOfMonth--;
            }
        }
    }
    return {
        year: _now.year,
        month: _now.month+1,
        dayOfMonth: _now.dayOfMonth
    };

};
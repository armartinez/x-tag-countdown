(function () {
    xtag.register('x-countdown', {
        lifecycle: {
            inserted: function () {
                if (this.xtag.date) {
                    this.start();
                }
            }
        },
        accessors: {
            date: {
                attribute: {},
                get: function () {
                    return this.xtag.date;
                },
                set: function (val) {
                    this.xtag.date = val;
                }
            }
        },
        methods: {
            start: function () {
                this.update();
                this.xtag.interval = setInterval(this.update.bind(this), 1000);
            },
            stop: function () {
                this.xtag.interval = clearInterval(this.xtag.interval);
            },
            update: function () {
                var currentDate = new Date();
                var limitDate = new Date(this.xtag.date);

                if (limitDate < currentDate) {
                    this.textContent = "00:00:00";
                    this.stop();
                } else {
                    var diff = limitDate - currentDate,
                        dayDiff = diff / 86400 / 1000,
                        hourDiff = diff / 3600 / 1000,
                        minDiff = diff / 60 / 1000,
                        secDiff = diff / 1000;

                    var days = Math.floor(dayDiff),
                        hours = Math.floor(hourDiff) - (days * 24),
                        minutes = Math.floor(minDiff) - (Math.floor(hourDiff) * 60),
                        seconds = Math.floor(secDiff) - (Math.floor(minDiff) * 60);

                    var timeLeft = n(hours) + ":" + n(minutes) + ":" + n(seconds);

                    if (days > 0) {
                        this.textContent = days + "d " + timeLeft;
                    } else {
                        this.textContent = timeLeft;
                    }
                }

                function n(n) {
                    return n > 9 ? "" + n : "0" + n;
                }
            }
        }
    });
})();
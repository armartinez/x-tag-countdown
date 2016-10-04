describe("x-countdown ", function () {
    var testDate = new Date();
    var testbox = null;

    beforeAll(function (done) {
        window.addEventListener('WebComponentsReady', function () {
            done();
        });
        testDate.setDate(testDate.getDate() + 2);
        testbox = document.getElementById("testbox");
    });

    afterEach(function () {
        while (testbox.firstChild) {
            testbox.removeChild(testbox.firstChild);
        }
    });

    it('should be available', function () {
        expect(xtag.tags['x-countdown']).toBeDefined();
    });

    it('starts countdown automatically if date property is available when inserted', function (done) {
        var element = document.createElement('x-countdown');
        element.date = testDate.toISOString();

        Object.defineProperty(element, 'start', {
            value: spyOn(element, 'start')
        });

        var observer = new MutationObserver(function (mutations) {
            this.disconnect();
            expect(element.start).toHaveBeenCalled();
            done();
        }).observe(testbox, {
            childList: true
        });

        testbox.appendChild(element);
    });

    it('starts countdown when start method is called', function (done) {
        var element = document.createElement('x-countdown');
        var observer = new MutationObserver(function (mutations) {
            this.disconnect();
            element.date = testDate.toISOString();
            element.start();
            var time = element.textContent;

            setTimeout(function () {
                expect(element.textContent).not.toBe(time);
                done();
            }, 1000);
        }).observe(testbox, {
            childList: true
        });

        testbox.appendChild(element);
    });

    it('stops countdown when stop method is called', function (done) {
        var element = document.createElement('x-countdown');
        element.date = testDate.toISOString();
        testbox.appendChild(element);

        var observer = new MutationObserver(function (mutations) {
            this.disconnect();
            var time = element.textContent;
            element.stop();

            setTimeout(function () {
                expect(element.textContent).toBe(time);
                done();
            }, 1000);
        }).observe(element, {
            childList: true
        });
    });

    it('shows zero when input date is older than current', function (done) {
        var element = document.createElement('x-countdown');
        var current = new Date();
        element.date = current.toISOString();
        testbox.appendChild(element);

        var observer = new MutationObserver(function (mutations) {
            this.disconnect();
            setTimeout(function () {
                expect(element.textContent).toBe('00:00:00');
                done();
            }, 1000);
        }).observe(element, {
            childList: true
        });
    });
});
$(document).ready(function () {
    $('#cardTab a').on('click', function (event) {
        event.preventDefault();
        showTab($('#cardTab a').index(this));
    });

    $('#cardTabContent .btn-primary').on('click', function () {
        var currentIndex = $('#cardTab a.active').index();
        var nextIndex = currentIndex + 1;
        if (nextIndex < $('#cardTab a').length) {
            showTab(nextIndex);
        }
    });

    $('#cardTabContent .btn-light').on('click', function () {
        var currentIndex = $('#cardTab a.active').index();
        var prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
            showTab(prevIndex);
        }
    });

    function showTab(index) {
        $('#cardTab a').removeClass('active');
        $('.tab-content .tab-pane').removeClass('show active');

        $('#cardTab a').eq(index).addClass('active');
        $('.tab-content .tab-pane').eq(index).addClass('show active');
    }
});

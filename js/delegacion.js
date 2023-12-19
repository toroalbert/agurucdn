var tabLinks = document.querySelectorAll('#cardTab a');
var tabContents = document.querySelectorAll('.tab-content .tab-pane');
var nextButtons = document.querySelectorAll('#cardTabContent .btn-primary');
var prevButtons = document.querySelectorAll('#cardTabContent .btn-light');

tabLinks.forEach((tabLink, index) => {
    tabLink.addEventListener('click', (event) => {
        event.preventDefault();
        showTab(index);
    });
});

nextButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const currentIndex = Array.from(tabLinks).findIndex((tabLink) => tabLink.classList.contains('active'));
        const nextIndex = currentIndex + 1;
        if (nextIndex < tabLinks.length) {
            showTab(nextIndex);
        }
    });
});

prevButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const currentIndex = Array.from(tabLinks).findIndex((tabLink) => tabLink.classList.contains('active'));
        const prevIndex = currentIndex - 1;
        if (prevIndex >= 0) {
            showTab(prevIndex);
        }
    });
});

function showTab(index) {
    tabLinks.forEach((tabLink) => tabLink.classList.remove('active'));
    tabContents.forEach((tabContent) => tabContent.classList.remove('show', 'active'));

    tabLinks[index].classList.add('active');
    tabContents[index].classList.add('show', 'active');
}
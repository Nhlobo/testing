// JavaScript for menu toggling
document.getElementById('toggleButton').addEventListener('click', function() {
    document.getElementById('mainMenu').classList.toggle('active');
});

// Close menu when a link is clicked
function closeMenuAndNavigate(target) {
    document.getElementById('mainMenu').classList.remove('active');
    window.location.href = target;
}

// Cookie Popup
document.addEventListener("DOMContentLoaded", function() {
    var cookiePopup = document.getElementById('cookiePopup');
    var acceptCookies = document.getElementById('acceptCookies');

    // Show cookie popup
    setTimeout(function() {
        cookiePopup.style.display = 'block';
    }, 2000);

    // Hide the cookie popup when accepted
    acceptCookies.addEventListener('click', function() {
        cookiePopup.style.display = 'none';
    });
});

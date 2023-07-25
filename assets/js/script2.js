document.addEventListener('DOMContentLoaded', activateButtons);
/**
 * Reads the id and decides action depending on the event id
 */
function activateButtons() {
    document.getElementById('suscribe-button').addEventListener('click', loginFunction);
}
function loginFunction(event) {
    event.preventDefault();
    window.location.href="userpage.html";
}
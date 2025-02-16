document.addEventListener("DOMContentLoaded", function() {
    console.log("Le DOM est chargé, le timer commence...");
    setTimeout(function() {
        console.log("Affichage du popup après 5 secondes");
        document.getElementById("popup").style.display = "flex";
    }, 15000);
});

function closePopup() {
    document.getElementById("popup").style.display = "none";
}
/*global window*/
(function () {

    var fToggleMenuIcon = function (){
        var menuHidden = document.getElementById("navprin").classList;
        if(menuHidden.contains("menuHidden")){
            menuHidden.remove("menuHidden");
            document.getElementById("menuMobile").classList.add("toggle");
        }
        else {
            menuHidden.add("menuHidden");
            document.getElementById("menuMobile").classList.remove("toggle");
        }
    };


    var fPageIsLoaded = function () {
        document.getElementById("menuIcon").addEventListener("click", fToggleMenuIcon, false);
    };

    // gestion de l'événement "load" pour démarrer le script
    window.addEventListener("load", fPageIsLoaded, false);
}());

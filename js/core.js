/*
    THIS SCRIPT IS MANDATORY FOR MULTI LANGUAGE SUPPORT
    AND FOR THE SCROLL TO TOP FEATURE
*/

function initialize() {
    /*SCROLL BUTTON HANDLER */
    var element = document.querySelectorAll(".scrollTop");
    for (var i = 0; i < element.length; i++) {
        element[i].addEventListener("click", scrollTop);
    }
    window.addEventListener("scroll", checkScroll);

    /*LANGUAGE BUTTON HANDLER */

    var es_button = document.querySelectorAll(".lang-es a");
    for (i = 0; i < es_button.length; i++){
        es_button[i].addEventListener("click", function(e) {
            e.preventDefault();
            switchLanguage("es");
        })
    }

    var val_button = document.querySelectorAll(".lang-val a");
    for (i = 0; i < val_button.length; i++){
        val_button[i].addEventListener("click", function(e) {
            e.preventDefault();
            switchLanguage("val");
        })
    }
}

function checkScroll() {
    var element = document.querySelectorAll(".scrollTop");
    var scroll = document.documentElement.scrollTop || document.body.scrollTop || 0;
    for (var i = 0; i < element.length; i++) {
        if (scroll > 200) {
            if (element[i].style.visibility !== "visible") {
                element[i].style.visibility = "visible";
            }
        } else {
            if (element[i].style.visibility !== "hidden") {
                element[i].style.visibility = "hidden";
            }
        }
    }
}
function scrollTop() {
    var dropper = setInterval(function() {
        if (document.documentElement.scrollTop) {
            if (document.documentElement.scrollTop >= 100) {
                document.documentElement.scrollTop -= 100;
            } else {
                document.documentElement.scrollTop = 0;
            }
            if (document.documentElement.scrollTop === 0) {
                clearInterval(dropper);
            }
        } else if (document.body.scrollTop) {
            if (document.body.scrollTop >= 100) {
                document.body.scrollTop -= 100;
            } else {
                document.body.scrollTop = 0;
            }
            if (document.body.scrollTop === 0) {
                clearInterval(dropper);
            }
        }
    }, 10);
}

function switchLanguage(lang) {
    if (typeof lang === 'undefined' || !lang) {
        lang = "val";
    }
    var langStyle = document.querySelector("#langStyle");
    var date = new Date();
    date.setTime(date.getTime() + (365*24*60*60*1000));
    switch (lang) {
        case "val":
            document.cookie = "lang=" + lang + ";expires=" + date.toUTCString();
            langStyle.innerHTML = ":lang(es){display: none !important;}";
            break;
        case "es":
            document.cookie = "lang=" + lang + ";expires=" + date.toUTCString();
            langStyle.innerHTML = ":lang(ca){display: none !important;}";
            break;
        default:
            document.cookie = "lang=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            langStyle.innerHTML = ":lang(es){display: none !important;}";
    }
}

/* LANGUAGE TRIGGER */
var style = document.createElement("style");
style.id = "langStyle";
document.head.appendChild(style);

if (document.cookie !== "") {
	var cookies = document.cookie.split(";");
	var found = false;
	for (i = 0; i < cookies.length; i++){
		var parted = cookies[i].split("=");
		if (parted[0] === "lang") {
			if (parted[1]) {
				switchLanguage(parted[1]);
				found = true;
				break;
			}
		}
	}
	if (!found) {
		switchLanguage();
	}
} else {
	switchLanguage();
}

window.addEventListener("load", initialize);
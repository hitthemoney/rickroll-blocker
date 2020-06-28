var rickrollUrls = ["dQw4w9WgXcQ", "oHg5SJYRHA0", "Uj1ykZWtPYI", "EE-xtCF3T94", "V-_O7nl0Ii0", "vkbQmH5MPME", "8O_ifyIIrN4", "0SoNH07Slj0", "xfr64zoBTAQ", "cqF6M25kqq", "j5a0jTc9S10", "dPmZqsQNzGA", "ID_L0aGI9bg", "REWyCy_m39Q", "nHRbZW097Uk", "ikFZLI4HLpQ", "GHMjD0Lp5DY", "dncAjWdFCdw", "ykLGXWb-AtA", "ZYooh1LxB80", "-Z93LpeeCYY", "d78X5Ummh9Y", "ZVQfR27ISjM", "tjNTfNLUyjU", "0Pf6Bw0m0Y0", "6Mc-Thl1kTQ", "nrsnN23tmUA", "IO9XlQrEt2Y", "ub82Xb1C8os", "qxoW1_0hViE", "qDs7KkGcQ6M", "FpFztrJbksg", "u4D1enUJYuU", "N8belcUA4hk", "rVptEo3Z3OY", "FpFztrJbksg", "ZXpThNX9IRc", "Oo0twK2ZbLU"];
var badTitles = ["rick astley - never gonna", "rick roll", "rickroll", "never gonna give you up", "rickroll'd"];

/*chrome.storage.local.get(['rickrolls'], function (result) {
    if (result === {}) {
        chrome.storage.local.set({
            rickrolls: []
        }, function () {});
    } 
    rickrollUrls = rickrollUrls.concat(result)
    console.log(result);
});*/

//22title%22%3A%22
//%22%2C%22lengthSeconds

/*

https://youtube.com/get_video_info?video_id=

decodeURI(info.split("22title%22%3A%22")[1].split("%22%2C%22lengthSeconds")[0].split("+").join(" "))

*/

var url;

function onRickroll() {
    try {
        document.getElementsByClassName("video-stream html5-main-video")[0].remove();
    } catch {

    }
    setTimeout(() => {
        if (confirm("Rickroll Alert!\nPress cancel to watch the video, and ok to block it")) {
            if ('URLSearchParams' in window) {
                var searchParams = new URLSearchParams(window.location.search);
                searchParams.set("v", "");
                window.location.search = searchParams.toString();
            }
        }
    }, 1);
}

function rickRollCheck() {
    url = new URL(window.location.href);
    let videoId = url.searchParams.get("v");

    var title;

    fetch("https://youtube.com/get_video_info?video_id=" + videoId)
        .then(response => response.text())
        .then(data => {
            try {
                title = decodeURI(data.split("22title%22%3A%22")[1].split("%22%2C%22lengthSeconds")[0].split("+").join(" "))
            } catch {

            }

            for (i in badTitles) {
                if (title.toLowerCase().includes(badTitles[i])) {
                    onRickroll()
                    /*var currentRickrolls;
                    chrome.storage.local.get(['rickrolls'], function (result) {
                        currentRickrolls = result
                    });
                    chrome.storage.local.set({
                        rickrolls: currentRickrolls.push(videoId)
                    }, function () {
                        rickrollUrls.push(videoId)
                    });*/
                    rickrollUrls.push(videoId)
                }
            }

        });

    for (i in rickrollUrls) {
        if (videoId == rickrollUrls[i]) {
            onRickroll()
        }
    }
}

//rickRollCheck()

var v;
var searchParamCheck = setInterval(function () {
    try {
        url = new URL(window.location.href);
        if (url.searchParams.get("v").toString() !== v) {
            rickRollCheck();
        }
        v = url.searchParams.get("v").toString();
    } catch {

    }
}, 5)
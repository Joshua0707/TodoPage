const darkModeToken = "joshua.dev.isDarkMode";
const yeaDarkMode = "joshua.dev.darkModeYea";
const nilDarkMode = "joshua.dev.darkModeNil";

// for switches
var switches = document.querySelectorAll(".switch");
var darkSwitch = document.querySelector("#dark-mode");

switches.forEach((s) => {
    s.querySelector('input').addEventListener('input', () => {
        if (s.querySelector('input').checked)
            setTimeout(() => s.classList.add("on"), 200)
        else
        setTimeout(() => s.classList.remove("on"), 200)
    })
});

darkSwitch.querySelector('input').addEventListener('input', () => {
    if (darkSwitch.querySelector('input').checked)
        setDarkMode();
    else
        unsetDarkMode();

    if (switchProps.darkModeSwitchCallback) {
        setTimeout(switchProps.darkModeSwitchCallback, 500);
    }
});

const setDarkMode = () => {
    document.body.classList.add("dark")
    localStorage.setItem(darkModeToken, yeaDarkMode);
}

const unsetDarkMode = () => {
    document.body.classList.remove("dark")
    localStorage.setItem(darkModeToken, nilDarkMode);
}

const initState = () => {
    var token = localStorage.getItem(darkModeToken);
    if (token === yeaDarkMode) {
        document.body.classList.add("dark")
        darkSwitch.querySelector('input').checked = true
        darkSwitch.classList.add("on")
    } else {
        document.body.classList.remove("dark")
        darkSwitch.querySelector('input').checked = false
        darkSwitch.classList.remove("on")
    }
        
}

initState();

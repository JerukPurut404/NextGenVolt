const toggle = document.getElementById('toggleDark');
const body = document.querySelector('body');
const Weer = document.getElementById('Weer');
const loguit = document.getElementById('loguit');
const loguitSVG = document.getElementById('loguit-svg');
const Console = document.getElementById('Console');
const Tijd = document.getElementById('Tijd');
const WeerSVG = document.getElementById('Weer-svg');
const TijdSVG = document.getElementById('Tijd-svg');
const SettingsSVG = document.getElementById('instellingen-svg')
console.log(loguitSVG);



toggle.addEventListener('click', function(){
    this.classList.toggle('bi-moon');
    if(this.classList.toggle('bi-brightness-high-fill')){
        body.style.background = 'white';
        body.style.color = 'black';
        body.style.transition = '2s';
        loguit.style.color = 'black';
        Tijd.style.color = 'black';
        Weer.style.color = 'black';
        Console.style.color = 'black';
        WeerSVG.src = "img/sunny_FILL0_wght400_GRAD0_opsz48.svg";
        ConsoleSVG.src = "img/tune_FILL0_wght400_GRAD0_opsz48.svg";
        loguitSVG.src = "img/logout.svg";
        TijdSVG.src = "img/schedule_FILL0_wght400_GRAD0_opsz48.svg"
        SettingsSVG.src = "img/settings_FILL0_wght400_GRAD0_opsz48.svg"

    }else{
        body.style.background = '#444444';
        body.style.color = 'white';
        body.style.transition = '2s';
        loguit.style.color = 'white';
        Tijd.style.color = 'white';
        Weer.style.color = 'white';
        Console.style.color = 'white';
        WeerSVG.src = "img/sunnywit_FILL0_wght400_GRAD0_opsz48.svg";
        ConsoleSVG.src = "img/tunewit_FILL0_wght400_GRAD0_opsz48.svg";
        loguitSVG.src = "img/logoutwit.svg"
        TijdSVG.src = "img/schedulewit_FILL0_wght400_GRAD0_opsz48.svg"
        SettingsSVG.src = "img/settingswit_FILL0_wght400_GRAD0_opsz48.svg"
    }
});
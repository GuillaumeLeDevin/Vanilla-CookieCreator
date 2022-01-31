const display = document.querySelector('.display');
const btns = document.querySelectorAll('button');
const inputs = document.querySelectorAll('input');
const infoTxt = document.querySelector('.info-text');
let doneAlready = false;

const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 *60 * 1000);
console.log(nextWeek);
let day = ('0' + nextWeek).slice(9,11);
console.log(day);
let month = ('0' + (nextWeek.getMonth() + 1)).slice(-2);
console.log(month);
let year = nextWeek.getFullYear();
console.log(year);
document.querySelector('input[type=date]').value = `${year}-${month}-${day}`;

btns.forEach(btn => {
    btn.addEventListener('click', btnAction);
})

function btnAction(e) {

    let newObj = {};

    //Input - Creation de la variable contenant toutes les données
    inputs.forEach(input => {
        let nameAttr = input.getAttribute('name');
        let valAttr = nameAttr !== "cookieExpire" ? input.value : input.valueAsDate;
        newObj[nameAttr] = valAttr;
    })

    //Button - Action à appliquer en fonction du bouton cliqué
    let description = e.target.getAttribute('data-cookie');

    if(description === "create") {
        createCookie(newObj.cookieName, newObj.cookieValue, newObj.cookieExpire);
    }else if(description === "displayAll"){
        cookieList();
    }
}

function createCookie(name, value, exp) {
    
    infoTxt.innerText = "";
    display.childNodes.forEach(child => {
        child.remove();
    })

    //If the cookie has a same name than another one
    let cookies = document.cookie.split(';');
    cookies.forEach(cookie => {

        cookie = cookie.trim();

        let cookieFormat = cookie.split('=');

        if(cookieFormat[0] === encodeURIComponent(name)) {
            doneAlready = true;
            
        }
    })

    if(doneAlready) {
        infoTxt.innerText = "A cookie has already this name.";
        return;
    }

    //If the cookie does not have a name
    if(name.length === 0) {
        infoTxt.innerText = 'Impossible de définir un cookie sans nom.';
        return;
    }

    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${exp.toUTCString()}`;
    let info = document.createElement('li');
    info.innerText = `Cookie ${name} créé.`;
    display.appendChild(info);
    setTimeout(() => {
        info.remove();
    }, 1500)
}

function cookieList() {

    let cookies = document.cookie.split(';');

    if(cookies.join() === "") {
        infoTxt.innerText = "No cookie to display.";
        return;
    }

    cookies.forEach(cookie => {

        cookie = cookie.trim();
        let cookieFormat = cookie.split('=');

        let item = document.createElement('li');

        infoTxt.innerText = 'Click on a cookie in the list to delete it.';
        item.innerText = `Name: ${decodeURIComponent(cookieFormat[0])}, Value: ${decodeURIComponent(cookieFormat[1])}`;
        display.appendChild(item);


        // Cookie Suppression

        item.addEventListener('click', ()=> {

            document.cookie = `${cookieFormat[0]}=; expires=${new Date(0)}`;
            item.innerText = `Cookie ${cookieFormat[0]} supprimé`;
            
            setTimeout(() => {
                item.remove();
            }, 1000);
        })

    })

}
var boton = document.getElementById('newUser');
var inputsArray,inputs;
var numName = 0;

boton.addEventListener('click', newUser);
function newUser(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var env = document.getElementById('send');
    var send = document.createElement("div");
    numName++;

    send.innerHTML =
    `<div class="divisor"></div>
    <div class="mb-2 input-form form-block">
    <input type="text" name="nom_user`+numName+`" autocomplete="name" required>
    <label alt="Label" data-placeholder="Nombre completo"></label>
    </div>
    <div class="mb-2 input-form form-block">
    <input type="text" name="email_personal_user`+numName+`" autocomplete="email" required>
    <label alt="Label" data-placeholder="Correo electronico personal"></label>
    </div>
    <div class="mb-2 input-form form-block">
    <input type="text" name="dni_user`+numName+`" autocomplete="off" required>
    <label alt="Label" data-placeholder="Documento Nacional de Identidad"></label>
    </div>`;
    env.appendChild(send);
    return showTab(currentTab);
}

var currentTab = 0;
var tab = document.getElementsByClassName("tab");
var validate = false;
var advState = false;

showTab(currentTab);

function showTab (n) {
    tab[n].style.display= "block";

    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display= "inline";
    }

    if (n == (tab.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Cargar empresa";
    } else {
        document.getElementById("nextBtn").innerHTML = "Siguiente";
    }

    inputs = tab[currentTab].getElementsByTagName("input");
    inputsArray = Array.from(inputs);
    inputsArray.forEach(input => {
        input.addEventListener("keyup",input => {
            var valid= true;
            if (validate) {
                if (!input.target.value) {
                    input.target.style.backgroundColor = "#ffdddd";
                } else {
                    input.target.style.backgroundColor = "white";
                }
        
                for (i = 0; i < inputs.length; i++) {
                    if (inputs[i].value == "" || inputs[i].value == " " ) valid = false; 
                }
                if (valid) {
                    home.style.color = "black"; 
                    adv.style.display = "none";
                    var step = document.getElementsByClassName("step")[currentTab];
                    step.className += " finish";
                    advState = false;
                }
            }
        });
    });
    stepIndicator(n);

}

function nextPrev(n) {
    var tab = document.getElementsByClassName("tab");

    if (n == 1 && !formValidate()) return false;

    tab[currentTab].style.display = "none";

    currentTab = currentTab + n;
    validate = false;

    if (currentTab >= tab.length) {
        document.getElementById("ingreso").submit();
        return false;
    }

    showTab(currentTab);
}

function formValidate () {
    var tab, inputs, i, valid = true;
    var adv = document.getElementById("adv");
    var home = document.getElementById("home");

    tab = document.getElementsByClassName("tab");
    inputs = tab[currentTab].getElementsByTagName("input");

    for (i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
            inputs[i].style.backgroundColor = "#ffdddd";

            valid = false;
            validate = true;
            if (advState == false) {
                adv.style.display = "block";
                home.style.color = "#e74a3b"; 
                advState = true;
            } 
        } else {
                inputs[i].style.backgroundColor = "white";
                home.style.color = "black"; 
                adv.style.display = "none"; 
                advState = false;
            } 
    }

    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    } else {
        document.getElementsByClassName("step")[currentTab].className += " incomplete";
    }

    return valid;
}

function stepIndicator(n) {
    var i, step = document.getElementsByClassName("step");
    for (i = 0; i < step.length; i++) {
        step[i].className = step[i].className.replace(" active", " ")
    }

    step[n].className += " active";
}
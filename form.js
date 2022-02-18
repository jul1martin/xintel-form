var boton = document.getElementById('newUser');
var inputsArray,inputs,selectsArray,selects;
var numSelectsName = 0;
var currentTab = 2;

var modalSave = new bootstrap.Modal(document.getElementById('modalSave'), {
})
// var lastPage = document.getElementById("lastPage");


boton.addEventListener('click', newUser);
function newUser(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var env = document.getElementById('send');
    var send = document.createElement("div");
    numSelectsName++;

    send.innerHTML =
    `<div class="divisor"></div>
    <div class="mb-2 input-form form-block">
    <input type="text" name="nom_user`+numSelectsName+`" autocomplete="name" required>
    <label class="label-input" alt="Label" data-placeholder="Nombre completo"></label>
    </div>
    <div class="mb-2 input-form form-block">
    <input type="text" name="email_personal_user`+numSelectsName+`" autocomplete="email" required>
    <label class="label-input" alt="Label" data-placeholder="Correo electronico personal"></label>
    </div>
    <div class="mb-2 input-form form-block">
    <input type="number" name="dni_user`+numSelectsName+`" autocomplete="off" required>
    <label class="label-input" alt="Label" data-placeholder="Documento Nacional de Identidad"></label>
    </div>`;
    env.appendChild(send);
    return showTab(currentTab);
}

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
        var saveCompany = document.getElementById("nextBtn");
        saveCompany.innerHTML = "Cargar empresa";
    } else {
        document.getElementById("nextBtn").innerHTML = "Siguiente";
    }

    var validInput;
    var validSelect;
    var step = document.getElementsByClassName("step")[currentTab];
    selects = tab[currentTab].getElementsByTagName("select");
    inputs = tab[currentTab].getElementsByTagName("input");
    selectsArray = Array.from(selects);
    inputsArray = Array.from(inputs);
    if(!selectsArray.length) validSelect = true;
    if(!inputsArray.length) inputsArray = true;
    inputsArray.forEach(input => {
        input.addEventListener("keyup",input => {
            validInput = true;
            if (validate) {
                if (!input.target.value) {
                    input.target.style.backgroundColor = "#ffdddd";
                } else {
                    input.target.style.backgroundColor = "white";
                    var test = input.target.getAttribute("autocomplete","email")
                    console.log(test)
                
                }

                for (i = 0; i < inputs.length; i++) {
                    if (!inputs[i].value) validInput = false; 
                }
                // if (validInput) {
                //     home.style.color = "black"; 
                //     adv.style.display = "none";
                //     step.className += " finish";
                //     advState = false;
                // }
                if (validInput && validSelect) {
                    home.style.color = "black"; 
                    adv.style.display = "none";
                    // step.className += " finish";
                    step.style.backgroundColor = "#04AA6D";

                    advState = false;
                }
            }
        });
    });
    selectsArray.forEach(select => {
        select.addEventListener("click",select => {
            validSelect = true;

            if (validate) {
                if (!select.target.value) {
                    select.target.style.backgroundColor = "#ffdddd";
                } else {
                    select.target.style.backgroundColor = "white";
                }
        
                for (i = 0; i < selects.length; i++) {
                    if (!selects[i].value) validSelect = false; 
                }
                // if (validSelect) {
                //     home.style.color = "black"; 
                //     adv.style.display = "none";
                //     step.className += " finish";
                //     advState = false;
                // }
                if (validInput && validSelect) {
                    home.style.color = "black"; 
                    adv.style.display = "none";
                    // step.className += " finish";
                    step.style.backgroundColor = "#04AA6D";
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

    showTab(currentTab);
}

function formValidate () {
    var tab, inputs,selects, i, valid = true;
    var adv = document.getElementById("adv");
    var home = document.getElementById("home");

    tab = document.getElementsByClassName("tab");
    inputs = tab[currentTab].getElementsByTagName("input");
    selects = tab[currentTab].getElementsByTagName("select");

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

    for (i = 0; i < selects.length; i++) {
        if (!selects[i].value) {
            selects[i].style.backgroundColor = "#ffdddd";

            valid = false;
            validate = true;
            if (advState == false) {
                adv.style.display = "block";
                home.style.color = "#e74a3b"; 
                advState = true;
            } 
        } else {
            selects[i].style.backgroundColor = "white";
                home.style.color = "black"; 
                adv.style.display = "none"; 
                advState = false;
            } 
    }

    if (valid) {
        // document.getElementsByClassName("step")[currentTab].className += " finish";
        document.getElementsByClassName("step")[currentTab].style.backgroundColor = "#04AA6D";
    } else {
        // document.getElementsByClassName("step")[currentTab].className += " incomplete";
        document.getElementsByClassName("step")[currentTab].style.backgroundColor = "red";
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

var dinamicSelect = document.getElementById("dinamicSelect")
var dinamicHidden = document.getElementById("dinamicHidden")
dinamicSelect.addEventListener("click", function(){
    if (dinamicSelect.value == "integracion") {
        return dinamicHidden.removeAttribute("hidden") 
    }
    if (!dinamicHidden.getAttribute("hidden")) {
        dinamicHidden.setAttribute("hidden","") 
    }
    
})
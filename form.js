var tab = document.getElementsByClassName("tab");
var bntNewUser = document.getElementById('newUser');
var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");
var dinamicSelectIntegracion = document.getElementById("dinamicSelect");
var dinamicHiddenIntegracion = document.getElementById("dinamicHidden");
var dinamicSelectAlquileres = document.getElementById("dinamicSelectAlquileres");
var dinamicHiddenAlquileres = document.getElementById("dinamicHiddenAlquileres");
var dinamicInput = document.getElementById("dinamicInput");
var inputCheckbox = document.getElementById("checkbox");
var validate = false;
var advState = false;
var checkboxFalse = 0;
var currentTab = 2;
var step = document.getElementsByClassName("step")[currentTab];
var completeStep = document.getElementById("complete-step");
var inputsArray, inputs, selectsArray, selects, validInput, validSelect;
var modalSave = new bootstrap.Modal(document.getElementById('modalSave'),{})
nextBtn.addEventListener("click",function(){nextPrev(1)})
prevBtn.addEventListener("click",function(){previusPrev(-1)})
bntNewUser.addEventListener('click', newUser);


showTab(currentTab);


function showTab(n) {
    tab[n].style.display = "block";
    tab[n].className += " initial"
    prevBtn.style.display = "inline";
    nextBtn.innerHTML = "Siguiente";
    
    var inputFile = document.getElementById("formFile");
    var labelFile = document.getElementById("labelFile");
    if (n == 0) prevBtn.style.display = "none";
    if (n == (tab.length - 2)) nextBtn.innerHTML = "Cargar empresa"; // tab.length-1 
    if (n == (tab.length - 1)) {
        completeStep.style.display = "none";
        nextBtn.style.display = "none";
        prevBtn.style.display = "none";
    }
    selects = tab[currentTab].getElementsByTagName("select");
    selectsArray = Array.from(selects);
    inputs = tab[currentTab].getElementsByTagName("input");
    inputsArray = Array.from(inputs);

    if(!selectsArray.length) validSelect = true;

    inputsArray.forEach(input => { input.addEventListener("input",inputValidate) });
    inputsArray.forEach(input => { input.addEventListener("input",function() {limitLength(input)})});
    selectsArray.forEach(select => { select.addEventListener("click",selectValidate) });

    inputFile.addEventListener("input",function(){ if (inputFile.value) labelFile.style.borderBottom = "2px solid var(--main-color)"; })
    stepIndicator(n);
}

function inputValidate(input) {
    if(!inputsArray.length) inputsArray = true;
    validInput = true;
    if (validate) {
        input.target.style.backgroundColor = "var(--main-input-opacity)";
        if (!input.target.value) input.target.style.backgroundColor = "var(--main-error)";
        for (i = 0; i < inputs.length; i++) {
            if (inputs[i].type == "file" || inputs[i].disabled) continue;
            if (dinamicInput == inputs[i] && dinamicHiddenIntegracion.hidden) continue;
            if (inputs[i].type == "checkbox") {
                if (inputs[i].checked == false) checkboxFalse ++;
                if (checkboxFalse == 7) {
                    inputCheckbox.style.backgroundColor = "var(--main-error)";
                    validInput = false; 
                    if (advState == false) {
                        adv.style.display = "block";
                        home.style.color = "#e74a3b"; 
                        advState = true;
                    } 
                } else inputCheckbox.style.backgroundColor = "var(--main-input-opacity)"; 
                continue
            }
            if (!inputs[i].value) validInput = false; 
        }

        if (validInput && validSelect) {
            home.style.color = "black"; 
            adv.style.display = "none";
            // step.className += " finish";
            step.style.backgroundColor = "#04AA6D";

            advState = false;
        }
        checkboxFalse = 0;
    }
}

function selectValidate(select) {
    var step = document.getElementsByClassName("step")[currentTab];
    validSelect = true;

    if (validate) {
        if (!select.target.value) {
            select.target.style.backgroundColor = "var(--main-error)";
        } else select.target.style.backgroundColor = "var(--main-input-opacity)";

        for (i = 0; i < selects.length; i++) if (!selects[i].value) validSelect = false; 

        if (validInput && validSelect) {
            home.style.color = "black"; 
            adv.style.display = "none";
            // step.className += " finish";
            step.style.backgroundColor = "#04AA6D";
            advState = false;
        }
    }
}

function formValidate() {
    var i, isValid = true;
    var adv = document.getElementById("adv");
    var home = document.getElementById("home");
    inputs = tab[currentTab].getElementsByTagName("input");
    selects = tab[currentTab].getElementsByTagName("select");

    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "file" || inputs[i].disabled || dinamicInput == inputs[i] && dinamicHiddenIntegracion.hidden) continue;
        if (inputs[i].type == "checkbox") {
            if (inputs[i].checked == false) checkboxFalse ++;
            if (checkboxFalse == 7) {
                inputCheckbox.style.backgroundColor = "var(--main-error)";
                isValid = false;
                validate = true;
                if (advState == false) {
                    adv.style.display = "block";
                    home.style.color = "#e74a3b"; 
                    advState = true;
                } 
            } else inputCheckbox.style.backgroundColor = "var(--main-input-opacity)";
            continue;
        }
        if (!inputs[i].value) {
            inputs[i].style.backgroundColor = "var(--main-error)";
            isValid = false;
            validate = true;
            if (advState == false) {
                adv.style.display = "block";
                home.style.color = "#e74a3b"; 
                advState = true;
            } 
        } else {
                inputs[i].style.backgroundColor = "var(--main-input-opacity)";
                home.style.color = "black"; 
                adv.style.display = "none"; 
                advState = false;
            } 
    }

    for (i = 0; i < selects.length; i++) {
        if (!selects[i].value) {
            selects[i].style.backgroundColor = "var(--main-error)";
            isValid = false;
            validate = true;
            if (advState == false) {
                adv.style.display = "block";
                home.style.color = "#e74a3b"; 
                advState = true;
            } 
        } else {
                selects[i].style.backgroundColor = "var(--main-input-opacity)";
                home.style.color = "black"; 
                adv.style.display = "none"; 
                advState = false;
            } 
    }
    checkboxFalse = 0

    if (isValid) {
        document.getElementsByClassName("step")[currentTab].style.backgroundColor = "#04AA6D"; // document.getElementsByClassName("step")[currentTab].className += " finish";
        return isValid;
    } 
        document.getElementsByClassName("step")[currentTab].style.backgroundColor = "red"; // document.getElementsByClassName("step")[currentTab].className += " incomplete";
        return isValid;


}

function nextPrev(n) {
    if (n == 1 && !formValidate()) return false;
    validate = false;
    if (currentTab >= tab.length - 2) {
        modalSave.show();
        return
    }
    tab[currentTab].style.display = "none";
    currentTab = currentTab + n;

    showTab(currentTab);
}

function previusPrev(n) {
    if (n == 1 && !formValidate()) return false;
    tab[currentTab].style.display = "none";
    validate = false;
    currentTab = currentTab + n;
    
    showTab(currentTab);
}

function newUser(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    
    var numSelectsName = 0;
    var send = document.getElementById('send');
    var divSend = document.createElement("div");
    divSend.className += " test";
    numSelectsName++;

    divSend.innerHTML =
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
    send.appendChild(divSend);

    return showTab(currentTab);
}

function stepIndicator(n) {
    var i, step = document.getElementsByClassName("step");
    for (i = 0; i < step.length; i++) step[i].className = step[i].className.replace(" active", " ");
    
    step[n].className += " active";
}

function limitLength(input) {
    switch (input.name) {
        case "cp":
            if (input.value.length > 4) input.value = input.value.slice(0,4);
            break;
        case "dni_tit":
            if (input.value.length > 9) input.value = input.value.slice(0,9);
            break;
        case "dni_user":
            if (input.value.length > 9) input.value = input.value.slice(0,9);
            break;
    }
    return;
}

dinamicSelectIntegracion.addEventListener("change", function(){
    if (dinamicSelectIntegracion.value == "integracion") {
        hiden = false; 
        return dinamicHiddenIntegracion.removeAttribute("hidden");
    }
    if (!dinamicHiddenIntegracion.getAttribute("hidden")) {
        hiden = true; 
        return dinamicHiddenIntegracion.setAttribute("hidden","");
    }
})

dinamicSelectAlquileres.addEventListener("change", function(){
    if (dinamicSelectAlquileres.value == "admin_alquieres") {
        hiden = false; 
        return dinamicHiddenAlquileres.removeAttribute("hidden");
    }
    if (!dinamicHiddenAlquileres.getAttribute("hidden")) {
        hiden = true; 
        return dinamicHiddenAlquileres.setAttribute("hidden","");
    }
})

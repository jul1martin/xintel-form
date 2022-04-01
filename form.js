var tab = document.getElementsByClassName("tab");
var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");
var saveCompanyBtn = document.getElementById('saveCompany');
var dinamicSelectIntegration = document.getElementById("dinamicSelect");
var dinamicHiddenIntegration = document.getElementById("dinamicHidden");
var dinamicSelectAlquileres = document.getElementById("dinamicSelectAlquileres");
var dinamicHiddenAlquileres = document.getElementById("dinamicHiddenAlquileres");
var dinamicInputIntegration = document.getElementById("dinamicInputIntegration");
var dinamicInputAlquileres = document.getElementById("dinamicInputAlquileres");
var inputCheckbox = document.getElementById("checkbox");
var cancelSubmit = document.getElementById('cancelSubmit');
var advSave = document.getElementById('advSave');
var responseImg = document.getElementById('resultadoImg');
var responseTxt = document.getElementById('resultadoTxt');
var validate = false;
var advState = false;
var sent = false;
var checkboxFalse = 0;
var currentTab = 3;
var step = document.getElementsByClassName("step")[currentTab];
var completeStep = document.getElementById("complete-step");
var inputsArray, inputs, selectsArray, selects, validInput, validSelect, checkbox, checkboxArray;
var modalSave = new bootstrap.Modal(document.getElementById('modalSave'),{});
var nUsers = 3; // Esto se otorga por base de datos.
// var url = "http://127.0.0.1:8000/api/formularios/"+token;
var form,formIsValid;

nextBtn.addEventListener("click",function(){nextPrev(1)});
prevBtn.addEventListener("click",function(){previusPrev(-1)});
saveCompanyBtn.addEventListener('click',saveForm);
cancelSubmit.addEventListener('click', function() {
    advSave.hidden = false;
    responseTxt.hidden = true;
});
// window.addEventListener('load',isFormValid);

for(var i = 0; i < nUsers; i++) {
    if(i+1 == nUsers) {
        newUser(i, true); 
        continue;
    }
    newUser(i, false);
}

// async function isFormValid() {
//     var form = await fetch(url).then(response => ( response.json() )).then(data => ( formIsValid = data )).catch(error => (console.log(error)));
//     if(formIsValid) {
//         return showTab(currentTab);
//     } else {
//         return location.replace('http://127.0.0.1:8000/formularios/creacion/error');
//     }
// }
function showTab(n) {
    tab[n].style.display = "block";
    tab[n].className += " initial";
    prevBtn.style.display = "inline";
    nextBtn.innerHTML = "Siguiente";
    
    // var inputFile = document.getElementById("formFile");
    var labelFile = document.getElementById("labelFile");
    if (n == 0) prevBtn.style.display = "none";
    if (n == (tab.length - 1)) nextBtn.innerHTML = "Cargar empresa";

    selects = tab[currentTab].getElementsByTagName("select");
    selectsArray = Array.from(selects);
    inputs = tab[currentTab].getElementsByTagName("input");
    inputsArray = Array.from(inputs);
    checkboxs = tab[currentTab].getElementsByClassName("inputCheckbox");
    checkboxArray = Array.from(checkboxs);

    if(!selectsArray.length) validSelect = true;

    inputsArray.forEach(input => { input.addEventListener("input",inputValidate) });
    inputsArray.forEach(input => { input.addEventListener("input",function() {limitLength(input)})});
    selectsArray.forEach(select => { select.addEventListener("click",selectValidate) });
    checkboxArray.forEach(checkbox => { checkbox.addEventListener("change",updateCheckbox) });


    // inputFile.addEventListener("input",function(){ if (inputFile.value) labelFile.style.borderBottom = "2px solid var(--main-color)"; });
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
            if (dinamicInputIntegration == inputs[i] && dinamicHiddenIntegration.hidden ||  dinamicHiddenAlquileres.hidden) continue;
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
        if (inputs[i].type == "file" || inputs[i].disabled || inputs[i].hidden ||  dinamicInputAlquileres == inputs[i] && dinamicHiddenAlquileres.hidden || dinamicInputIntegration == inputs[i] && dinamicHiddenIntegration.hidden || inputs[i].name == "piso" || inputs[i].name == "oficina") continue;
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
    if (currentTab >= tab.length - 1) {
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

function newUser(id, lastOne) {
    var send = document.getElementById('send');
    var divSend = document.createElement("div");

    operatorData = `<div class="mb-2 input-form form-block mono-line-responsive">
    <input type="text" name="OperatorName`+id+`" autocomplete="name" id="test" required>
    <label class="label-input" alt="Label" data-placeholder="Nombre completo"></label>
    </div>
    <div class="mb-2 input-form form-block mono-line-responsive">
    <input type="text" name="OperatorEmail`+id+`" autocomplete="email" required>
    <label class="label-input" alt="Label" data-placeholder="Correo electronico personal"></label>
    </div>
    <div class="mb-2 input-form form-block double-line-responsive mono-line-responsive-1366" style="margin-bottom:12vh !important;">
    <input type="number" name="OperatorDni`+id+`" autocomplete="off" required>
    <label class="label-input" alt="Label" data-placeholder="Documento Nacional de Identidad"></label>
    </div>`

    if(!lastOne) operatorData = operatorData + `<div class="divisor"></div>`

    divSend.innerHTML = operatorData

    //<div class="divisor"></div>`;
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
        case "dniPersonalTit":
            if (input.value.length > 9) input.value = input.value.slice(0,9);
            break;
        case "OperatorDni0":
            if (input.value.length > 9) input.value = input.value.slice(0,9);
            break;
        case "OperatorDni1":
            if (input.value.length > 9) input.value = input.value.slice(0,9);
            break;
        case "OperatorDni2":
            if (input.value.length > 9) input.value = input.value.slice(0,9);
            break;
    }
    return;
}

dinamicSelectIntegration.addEventListener("change", function(){
    if (dinamicSelectIntegration.value == "integracion") {
        hiden = false; 
        return dinamicHiddenIntegration.removeAttribute("hidden");
    }
    if (!dinamicHiddenIntegration.getAttribute("hidden")) {
        hiden = true; 
        return dinamicHiddenIntegration.setAttribute("hidden","");
    }
})

dinamicSelectAlquileres.addEventListener("change", function(){
    if (dinamicSelectAlquileres.value == "Administracion de alquileres" || dinamicSelectAlquileres.value == "ambos_servicios") {
        hiden = false; 
        return dinamicHiddenAlquileres.removeAttribute("hidden");
    }
    if (!dinamicHiddenAlquileres.getAttribute("hidden")) {
        hiden = true; 
        return dinamicHiddenAlquileres.setAttribute("hidden","");
    }
})

function updateCheckbox(checkbox) {
    if (!checkbox.target.checked && inputCheckbox.value) {
        inputCheckbox.value = inputCheckbox.value.replace(checkbox.target.value + ", ","");
        inputCheckbox.value = inputCheckbox.value.replace(", " + checkbox.target.value ,"");
        inputCheckbox.value = inputCheckbox.value.replace(checkbox.target.value,"");
    }
    if (!checkbox.target.checked) return;
    if (!inputCheckbox.value) return inputCheckbox.value = checkbox.target.value;
    console.log(checkbox.target.value);
    
    return inputCheckbox.value = inputCheckbox.value + ", " + checkbox.target.value;
}

function saveForm(e) {
    var checkboxes = document.getElementsByClassName('inputCheckbox');
    var checkboxes = Array.from(checkboxes);
    checkboxes.forEach(checkbox => {
        if(checkbox.checked) return checkbox.value = true;
    });

    console.log('METODO AJAX');

    e.preventDefault();
}
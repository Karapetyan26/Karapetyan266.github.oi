/*jslint browser */
"use strict";

const SERVICES = {
    basic: { price: 1000, hasOption: false, hasProperty: false },
    standard: { price: 2000, hasOption: true, hasProperty: false },
    premium: { price: 3000, hasOption: false, hasProperty: true }
};

const PROPERTY_PRICE = 700;
const NUMBER_PATTERN = /^[0-9]+$/;

function getSelectedService() {
    const radios = document.querySelectorAll('input[name="service"]');
    let i;
    for (i = 0; i < radios.length; i += 1) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
    return "basic";
}

function updateVisibility(serviceKey) {
    const service = SERVICES[serviceKey];
    const optionWrap = document.getElementById("option-wrap");
    const propertyWrap = document.getElementById("property-wrap");

    if (service.hasOption) {
        optionWrap.classList.remove("hidden");
    } else {
        optionWrap.classList.add("hidden");
    }

    if (service.hasProperty) {
        propertyWrap.classList.remove("hidden");
    } else {
        propertyWrap.classList.add("hidden");
    }
}

function calculate() {
    const result = document.getElementById("result");
    const quantityField = document.getElementById("quantity");
    const optionField = document.getElementById("option");
    const propertyField = document.getElementById("property");
    const quantityText = quantityField.value.trim();
    const serviceKey = getSelectedService();
    const service = SERVICES[serviceKey];

    if (!NUMBER_PATTERN.test(quantityText)) {
        result.className = "error";
        result.textContent = "Ошибка: в поле количества допустимы только цифры (целое число).";
        return;
    }

    const quantity = parseInt(quantityText, 10);
    let unitPrice = service.price;

    if (service.hasOption) {
        unitPrice += parseInt(optionField.value, 10);
    }

    if (service.hasProperty && propertyField.checked) {
        unitPrice += PROPERTY_PRICE;
    }

    result.className = "";
    result.textContent = "Стоимость заказа: " + (unitPrice * quantity) + " ₽";
}

function onServiceChange(event) {
    updateVisibility(event.target.value);
    calculate();
}

function init() {
    const form = document.getElementById("calc-form");
    const radios = document.querySelectorAll('input[name="service"]');
    let i;

    for (i = 0; i < radios.length; i += 1) {
        radios[i].addEventListener("change", onServiceChange);
    }

    form.addEventListener("input", calculate);
    form.addEventListener("change", calculate);

    updateVisibility(getSelectedService());
    calculate();
}

document.addEventListener("DOMContentLoaded", init);

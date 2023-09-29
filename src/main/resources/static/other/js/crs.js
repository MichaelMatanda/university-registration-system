
$(document).ready(function () {

    // Invoke the corresponding URL to update the dynamic fields section using Ajax
    $('.dynamic-update-rows').on('click', 'button[data-dynamic-update-rows-url]', function () {
        //event event.preventDefault();
        let url = $(this).data('dynamic-update-rows-url');

        // adding the row index, needed when deleting a dynamic row
        let formData = $('form').serializeArray();
        let param = {};
        param["name"] = $(this).attr('name');
        param["value"] = $(this).val();
        formData.push(param);

        // updating the dynamic section
        if (url.includes("addProduct") || url.includes("removeProduct")){
            $('#dynamicProductsContents').load(url, formData);
        }
        // updating the dynamic section
        else if (url.includes("add-position") || url.includes("remove-position")){
            $('#dynamicCashPositionContents').load(url, formData);
        }
        else {
            $('#dynamicPayModesContents').load(url, formData);
        }

    });

    // autodismiss alerts
    window.setTimeout(function() {
        $(".alert").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove();
        });
    }, 4000);
});

function calculateChange() {
    let amountTendered = document.getElementById("amountTendered").value;
    let amountPaid = document.getElementById("amountPaid").value;
    let change = document.getElementById("change");
    let changeValue = amountTendered - amountPaid;

    if (changeValue > -1) {
        change.value = parseFloat(changeValue).toFixed(2);
        // checkAmounts();
    }else {
        change.value=0;
    }
    checkSubmitButton();
}

function calculateAmountPaid() {
    let price = document.getElementById("price").value;
    let quantity = document.getElementById("quantity").value;
    let amountPaid = document.getElementById("amountPaid");
    amountPaid.value = quantity * price;
    calculateChange();
}

function getProductPrice(productCode, currency, priceFieldName) {
    if (productCode !== '') {
            const url = "/prices/" + productCode + '/' + currency;
            $.ajax({
                type: "GET",
                contentType: "application/json",
                url: url,
                cache: false,
                timeout: 600000,
                success: function (data) {
                    let obj = data;
                    let vatFieldName = priceFieldName.substr(0, priceFieldName.indexOf('.')) + '.vat';
                    let percentageDiscountDisplayFieldName = priceFieldName.substr(0, priceFieldName.indexOf('.')) + '.percentageDiscountDisplay';
                    let percentageDiscountFieldName = priceFieldName.substr(0, priceFieldName.indexOf('.')) + '.percentageDiscount';
                    let discountFieldName = priceFieldName.substr(0, priceFieldName.indexOf('.')) + '.discount';
                    let vatTypeFieldName = priceFieldName.substr(0, priceFieldName.indexOf('.')) + '.vatType';

                    document.getElementsByName(priceFieldName)[0].value = obj.value;
                    document.getElementsByName(vatFieldName)[0].value = obj.vat;
                    document.getElementsByName(percentageDiscountFieldName)[0].value = obj.percentageDiscount;
                    document.getElementsByName(discountFieldName)[0].value = obj.discount;
                    document.getElementsByName(percentageDiscountDisplayFieldName)[0].value = '(' + obj.percentageDiscount + '%)';
                    document.getElementsByName(vatTypeFieldName)[0].value = obj.vatType;
                    calculateTotalPrice();
                    calculateChange();
                },
                error: function (e) {
                    console.log("ERROR : ", e);
                }
            })
    }
}

function applyGlobalDiscount(transactionAmount, currency) {
    let dealer = document.getElementById("dealerCode").value;
    let customerCategory = "";
    let customerCode = "";
    if (dealer) {
        customerCategory = "DEALER";
        customerCode = dealer;
    } else {
        customerCategory = "WALK_IN_CUSTOMER";
        customerCode = "WALK_IN_CUSTOMER";
    }
    let receiptType = document.getElementById("receiptType").value;
    if (receiptType == 'BILL_PAYMENT' || receiptType=='POST_PAID') {
        document.getElementsByName("totalDiscount")[0].value = 0;
        document.getElementsByName("amountPaid")[0].value = transactionAmount;
        document.getElementsByName("percentageDiscount")[0].value = 0;
        return
    }
    const url = "/discounts/" + transactionAmount + '/' + customerCategory + '/' + currency + '/' + customerCode;
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: url,
            cache: false,
            timeout: 600000,
            success: function (data) {
                let obj = data;
                if (obj) {
                    document.getElementsByName("totalDiscount")[0].value = parseFloat(obj.totalDiscount).toFixed(2);
                    document.getElementsByName("amountPaid")[0].value = parseFloat(obj.totalPayable).toFixed(2);
                    document.getElementsByName("percentageDiscount")[0].value = obj.discount;
                }
            },
            error: function (e) {
                console.log("ERROR : ", e);
            }
        })
}

    function getCurrencyProductPrice(productCode, el) {
        let productNameFieldName = $(el).attr("name");
        let productPriceFieldName = productNameFieldName.substring(0, productNameFieldName.indexOf('.')) + '.price';
        let currency = document.getElementById("currency").value;
        getProductPrice(productCode, currency, productPriceFieldName);
    }


function getDealers() {

    // Declare variables
    var input, filter, ul, li, i, txtValue;
    input = document.getElementById('selectedDealer');
    filter = input.value;
    ul = document.getElementById("dealerUl");
    var dealerListPaceHolder = document.getElementById("dealerListPlaceHolder");
    var dealerSuggestionList = document.getElementById("dealerSuggestionList");

    const url = "/dealers/suggest?search_text=" + filter
    var suggestions = dealerSuggestionList.value ? dealerSuggestionList.value : [];
    if (!filter || filter.length < 3) {
        dealerListPaceHolder.innerHTML = "";
    }
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: url,
        cache: false,
        timeout: 600000,
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                suggestions.push(data[i]);
            }
            let eligibleSuggestions = [];
            for (i = 0; i < suggestions.length; i++) {
                if (filter && filter.length >= 3 && (suggestions[i].name.toLowerCase().includes(filter.toLowerCase())
                    || suggestions[i].code.toLowerCase().includes(filter.toLowerCase())
                    || suggestions[i].msisdn.toLowerCase().includes(filter.toLowerCase()))) {
                    eligibleSuggestions.push(suggestions[i]);
                }
            }
            var dealerListHtml = "";
            let limit = Math.min(eligibleSuggestions.length, 2);
            for (i = 0; i < limit; i++) {
                dealerListHtml = dealerListHtml + "<li class='dealerListItem'>" + "<span class='li-dealerName'></span>"
                    + "<a href='#' onclick='setDealerCode(\" " + eligibleSuggestions[i].code + "\".trim()" +
                    ", \"" + eligibleSuggestions[i].name + "\",  \"" + eligibleSuggestions[i].msisdn + "\")'>"
                    + "<span class='dealerCardName'> " + eligibleSuggestions[i].name + " </span>"
                    + "<ul style='list-style-type:none;padding: 0'>"
                    + "<li class='li-dealerCode'><span class='dealerCardCode'>" + eligibleSuggestions[i].code + "</span></li>"
                    + "<li class='li-dealerPhoneNumber'><span class='dealerCardPhoneNumber'>" + eligibleSuggestions[i].msisdn + "</span></li>"
                    + "</ul>"
                    + "</a>"
                    + "</li>";
            }
            dealerListPaceHolder.innerHTML = dealerListHtml;
            dealerSuggestionList.setAttribute("data-value", suggestions)
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    })

}

function getProducts(productsUiForRow) {

    selectedDealerField = document.getElementById('dealerCode');
    selectedReceiptType = document.getElementById('receiptType');
    selectedCurrency = document.getElementById('currency');


    isNonDealer = !selectedDealerField.value || selectedDealerField.value === '';
    if (isNonDealer) {
        document.getElementById('selectedDealer').readOnly = true
    }

    // Declare variables
    var input, filter, ul, li, i, txtValue;
    var rowIndex = productsUiForRow.replace('UI','');
    var inputName='productList' + rowIndex + '.description'
    input = document.getElementById(inputName);
    filter = input.value;
    ul = document.getElementById(productsUiForRow);
    let dealerListItem = ul.getElementsByClassName('dealerListItem');
    let li_productCode = ul.getElementsByClassName('li-productCode');
    var productListPaceHolder = document.getElementById(rowIndex +  "productListPlaceHolder");
    var productSuggestionListPlaceholder = document.getElementById(rowIndex + "productSuggestionListPlaceholder");

    const url = "/products/suggest?search_text=" + filter + "&currency=" + selectedCurrency.value +
        "&dealer_code=" + selectedDealerField.value + "&receipt_type=" + selectedReceiptType.value;

    var suggestions = productSuggestionListPlaceholder.value ? productSuggestionListPlaceholder.value : [];
    if (filter.length < 3) {
        productListPaceHolder.innerHTML = "";
        return;
    }
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: url,
        cache: false,
        timeout: 600000,
        success: function (data) {
            for (i = 0; i < data.length; i++) {
                suggestions.push(data[i]);
            }
            let eligibleSuggestions = [];
            for (i = 0; i < suggestions.length; i++) {
                if (suggestions[i]) {
                    var description = suggestions[i].description;
                    var productCode = suggestions[i].code;
                    var barcode = suggestions[i].code;
                    if (filter && filter.length >= 3 && (description.toLowerCase().includes(filter.toLowerCase())
                        || productCode.toLowerCase().includes(filter.toLowerCase())
                        || barcode.toLowerCase().includes(filter.toLowerCase()))) {
                        eligibleSuggestions.push(suggestions[i]);
                    }
                }
            }
            if (!filter || filter.length < 3) {
                suggestions = [];
            }
            var productListHtml = "";
            let limit = Math.min(eligibleSuggestions.length, 2);
            for (i = 0; i < limit; i++) {
                productListHtml = productListHtml + "<li class='dealerListItem'>" + "<span class='li-dealerName'></span>"
                    + "<a href='#' onclick='setProductDescription(\" " + eligibleSuggestions[i].code + "\".trim(), \"" + eligibleSuggestions[i].description + "\",  \"" + eligibleSuggestions[i].productType + "\", " + rowIndex + ")'>"
                    + "<span class='dealerCardName'> " + eligibleSuggestions[i].description + " </span>"
                    + "<ul style='list-style-type:none;padding: 0'>"
                    + "<li class='li-dealerCode'><span class='dealerCardPhoneNumber'>" + eligibleSuggestions[i].code + "</span></li>"
                    // + "<li class='li-dealerCode'><span class='dealerCardPhoneNumber'>" + eligibleSuggestions[i].barcode + "</span></li>"
                    + "</ul>"
                    + "</a>"
                    + "</li>";
            }
            productListPaceHolder.innerHTML = productListHtml;
            productSuggestionListPlaceholder.setAttribute("data-value", suggestions)
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    })

    for (i = 0; i < li_productCode.length; i++) {
        let productCodeValue = li_productCode[i].getAttribute('data-value');
        console.log(productCodeValue);
        productCodeValue = productCodeValue ? productCodeValue.toString().toLowerCase() : '';
        if (productCodeValue.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
            suggestions.push(i);
        }
    }
    suggestions.length = 2;
    for (let j = 0; j < dealerListItem.length; j++) {
        if (suggestions.includes(j)) {
            dealerListItem[j].style.display = "";
        } else dealerListItem[j].style.display = "none";

    }

    if (filter.length === 0 || filter === "") {
        for (i = 0; i < dealerListItem.length; i++) {
            dealerListItem[i].style.display = "none";
        }
    }
}


function setDealerCode(dealerCode, name, msisdn) {

    document.getElementById("dealerCode").value = dealerCode;
    let selectedDealer = document.getElementById("selectedDealer");
    selectedDealer.value = name;
    let customerName = document.getElementById("name");
    let customerPhoneNumber = document.getElementById("phoneNumber");

    ul = document.getElementById("dealerUl");
    li = ul.getElementsByClassName('dealerListItem');
    for (var i = 0; i < li.length; i++) {
        li[i].style.display = "none";
    }
    customerName.value = name;
    customerPhoneNumber.value = msisdn
    customerName.readOnly = true;
    customerPhoneNumber.readOnly = true;
}




$(document).ready(function () {

        $("#receiptForm").validate({
            focusCleanup: true, errorClass: "invalid",
            showErrors: function (errorMap, errorList) {
                $("#summary").html("Your form contains "
                    + this.numberOfInvalids()
                    + " errors, please fix them before submit.");
                this.defaultShowErrors();
            }
        });

        //$("input[name^='contactList']").each(function() {
        $("input[name$='code']").each(function () {
            $(this).rules('add', {
                required: true,
                rangelength: [10, 40]
            });
        });

        $("select[name$='code']").each(function () {
            $(this).rules('add', {
                required: true
            });
        });
    });

function fiscalize(productCode, currency, priceFieldName) {
    if (productCode !== '') {
        const url = "http://revmax:10000/api/RevmaxAPI/GetCardDetails/prices/";
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: url,
            cache: false,
            timeout: 600000,
            success: function (data) {
                cosnole.log(data);
            },
            error: function (e) {
                console.log("ERROR : ", e);
            }
        })
    }
}
    function checkDealer() {
        let selectedDealer = document.getElementById("selectedDealer").value;
        let customerName = document.getElementById("name");
        let customerPhoneNumber = document.getElementById("phoneNumber");
        if (selectedDealer.length === 0 || selectedDealer === "") {
            customerName.disabled = false;
            customerPhoneNumber.disabled = false;
            customerPhoneNumber.value = "";
            customerName.value = "";
        }
    }

function getShops() {

    // Declare variables
    var input, filter, ul, li, i, txtValue;
    input = document.getElementById('selectedShop');
    filter = input.value;
    ul = document.getElementById("shopUl");
    let li_shopName = ul.getElementsByClassName('li-shopName');
    let shopListItemList = ul.getElementsByClassName('shopListItem');
    let li_officeId = ul.getElementsByClassName('li-officeId');

    let suggestions = [];
    for (i = 0; i < li_officeId.length; i++) {
        let shopOfficeId = li_officeId[i].getAttribute('data-value').toString().toLowerCase();
        if (shopOfficeId.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
            suggestions.push(i);
        }
    }

    for (i = 0; i < li_shopName.length; i++) {
        let shopName = li_shopName[i].getAttribute('data-value').toString().toLowerCase();
        if (shopName.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
            suggestions.push(i);
        }
    }
    suggestions.length = 2;
    for (let j = 0; j < shopListItemList.length; j++) {
        if (suggestions.includes(j)) {
            shopListItemList[j].style.display = "";
        } else shopListItemList[j].style.display = "none";

    }

    if (filter.length === 0 || filter === "") {
        for (i = 0; i < shopListItemList.length; i++) {
            shopListItemList[i].style.display = "none";
        }
    }
}

function setProductDescription(productCode, productDescription, productType,  index) {
    var inputName='productList'+index+'.description'
    var prodCodeInputName='productList'+index+'.code'

    document.getElementById(inputName).value = productDescription;
    document.getElementById(prodCodeInputName).value = productCode;
    if (productCode) {
        $("#currency option:not(:selected)").prop("disabled", true);
    }
    var accountReferenceInput = document.getElementById(`${index}accountReferenceId`)
    if(productType === "POSTPAID") {
        accountReferenceInput.style = "display:block"
    } else {
        accountReferenceInput.style = "display:none!important"
    }

    var listName=index+'UI';
    ul = document.getElementById(listName);
    li = ul.getElementsByClassName('dealerListItem');
    for (var i = 0; i < li.length; i++) {
        li[i].style.display = "none";
    }

    var currency = document.getElementById("currency").value;
    var productPriceFieldName='productList['+index+'].price'
    getProductPrice(productCode, currency, productPriceFieldName);
}

function checkSubmitButton(){
   let amountTendered= document.getElementById("amountTendered").value;
   let amountPaid= document.getElementById("amountPaid").value;
   let submitButton= document.getElementById("submitForm");


    amountTendered = amountTendere
    d || 0;
    amountPaid = amountPaid || 0;

    if (parseFloat(amountTendered) < parseFloat(amountPaid)){
        submitButton.style.background='grey';
        submitButton.disabled = true;
    }else{
        submitButton.style.background='#ee7308';
        submitButton.disabled = false;
    }

}



function dropdown(val)
{
    document.getElementById(val).style.visibility = "visible";
}
function dropdownhide(val)
{
    document.getElementById(val).style.visibility = "hidden";
}
function setMsg(val)
{

    document.getElementById('msg').innerHTML = "<div class='alert alert-success' role='alert'>" + val + "</div>";
    setTimeout(function () {
        document.getElementById('msg').innerHTML = "";
    }, 5000);//;
}
function setError(val)
{
    document.getElementById('msg').innerHTML = "<div class='alert alert-danger' role='alert'>" + val + "</div>";
    setTimeout(function () {
        document.getElementById('msg').innerHTML = "";
    }, 5000);//;
}

function printPdf(url)
{
    $.ajax({method: "GET",
        url: "/stocks/outputpopup/",
        data: {url: url},
        success: function (result) {
            $("#msg").html(result);
            dropdown(100);
        }});
}


function getPositiveValue(value)
{
    if (value != '')
    {
        value = value.replace(/[^0-9\.]/g, "");
    }
    if (value < 0)
    {
        return (value * -1);
    }
    return value;
}
function getPositiveInt(value)
{
    if (value != '')
    {
        value = value.replace(/[^0-9]/g, "");
    }
    if (value < 0)
    {
        return parseInt(value * -1);
    }
    return value;
}

function getPositiveDecimalOrInteger(value)
{
    if (value != '' && !value.match(/[0-9]+.?[0-9][0-9]$/))
    {
        value = value.substring(0, value.length-1);
    }
    if (value < 0)
    {
        return parseInt(value * -1);
    }
    return value;
}

/***********************************************************************************************************/


function checkbox(val)
{
    var defaultCheckBox = document.getElementById("defaultCheckBox").checked;
    var el_collection = eval("document.forms." + val)
    for (c = 0; c < el_collection.length; c++)
    {
        if (defaultCheckBox === true)
        {
            if (el_collection[c].type == 'checkbox')
            {
                el_collection[c].checked = true;
            }
        } else
        {
            if (el_collection[c].type == 'checkbox')
            {
                el_collection[c].checked = false;
            }
        }
    }
    checkboxValidator(val);
}
function checkboxClass(val)
{
    echo(val);
    var defaultCheckBox = document.getElementById(val).checked;
    var el_collection = eval("document.forms." + val)
    for (c = 0; c < el_collection.length; c++)
    {
        if (defaultCheckBox === true)
        {
            if (el_collection[c].type == 'checkbox')
            {
                el_collection[c].checked = true;
            }
        } else
        {
            if (el_collection[c].type == 'checkbox')
            {
                el_collection[c].checked = false;
            }
        }
    }
    checkboxValidator("formu");
}
function validatedate(inputText)
{
    var dateformat = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
    // Match the date format through regular expression
    if (inputText.value.match(dateformat))
    {
        var pdate = inputText.value.split('-');
        var dd = parseInt(pdate[2]);
        var mm = parseInt(pdate[1]);
        var yy = parseInt(pdate[0]);
        // Create list of days of a month [assume there is no leap year by default]
        var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mm == 1 || mm > 2)
        {
            if (dd > ListofDays[mm - 1])
            {
                return false;
            }
        }
        if (mm == 2)
        {
            var lyear = false;
            if ((!(yy % 4) && yy % 100) || !(yy % 400))
            {
                lyear = true;
            }
            if ((lyear == false) && (dd >= 29))
            {
                return false;
            }
            if ((lyear == true) && (dd > 29))
            {
                return false;
            }
        }
    } else
    {
        return false;
    }
    return true;
}

function sortSelect()
{
    $(".selectpicker").selectpicker();
    //document.getElementsByClassName("selectpicker").selectpicker();
}
function selectMe(val, name)
{
    var di = document.getElementsByName(name);
    for (i = 0; i < di.length; i++) {
        if (i == val)
        {
            di[i].checked = true;
        } else
        {
            di[i].checked = false;
        }
    }
}
function changeToUpperCase(val)
{
    val.value = val.value.toUpperCase();
}
/* Barcode   */
history.pushState(null, document.title, location.href);
window.addEventListener('popstate', function (event)
{
    history.pushState(null, document.title, location.href);
});
function replaceAll(str, searchStr, replaceStr)
{
    // escape regexp special characters in search string
    searchStr = searchStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    return str.replace(new RegExp(searchStr, 'gi'), replaceStr);
}
//function replaceAll(str, find, replace) {
//return str.replace(new RegExp(escapeRegExp(find), 'gi'), replace);
//}//         



/***********************************************************************************************************/
/*                         Disable Page Right Click                                                        */
/***********************************************************************************************************/
/*window.oncontextmenu = function () {
   return false;
}*/
/***********************************************************************************************************/
function disableSubmit(element)
   {
       element.parentNode.removeChild(element);
       document.getElementById('formu').submit();
   }

function deleteById(idValue)
{
    document.getElementById("idToBeDeleted").value=idValue;
}


function addDoctor(idValue)
{
    document.getElementById("doctorId").value=idValue;
}

function loadDepartmentsByDivision() {
    var divisionId = $("#division").val();
     $("#department").empty();
    $("#department").append("<option value = " + 0 + ">" + 'Please Select Department' +  "</option>");
    $.get( "/departments?division=" + divisionId, function( departments ) {
        departments.forEach(function(department, i) {
            var option = "<option value = " + department.id + ">" + department.name +  "</option>";
            $("#department").append(option);
        });
        $("#department").selectpicker('refresh');
    });
}


function loadJobTitlesByDepartment() {
    var departmentId = $("#department").val();
     $("#jobTitle").empty();
    $("#jobTitle").append("<option value = " + 0 + ">" + 'Please Select Job Title' +  "</option>");
    $.get( "/jobtitles?department=" + departmentId, function( jobTitles ) {
        jobTitles.forEach(function(jobTitle, i) {
            var option = "<option value = " + jobTitle.id + ">" + jobTitle.name +  "</option>";
            $("#jobTitle").append(option);
        });
        $("#jobTitle").selectpicker('refresh');
    });
}

function loadBySelectedRole() {
    console.log($("#role").val());
    var roleSelected = $("#role").val().split("*****");
    var roleId=roleSelected[0];
    var roleName=roleSelected[1];

    if (roleName.toUpperCase()=="Doctor".toUpperCase()){
        $('#ahfozSection').show();
    }
    else {
        $('#ahfozSection').hide();
    }
    $("#roleId").val(roleId);
}



function loadSuperAd(){
    var selectedUserRole = document.getElementById("role").value.split("*****");
    var roleId=selectedUserRole[0];
    var roleName=selectedUserRole[1];

    $('#roleId').val(roleId);

    /*if(roleName == "Administrator"){
        $('#superAd').show();
    }else{
        $('#superAd').hide();
    }*/
}

function addJobSpecificMedical()
{

    var error = 0;
    var errmsg = "";
    var error = "";
    var table = document.getElementById("jobSpecificMedicalsTable");
    var tsize = table.rows.length;
    var programme = document.getElementById("programme").value.split("*****");
    var frequency = document.getElementById("frequency").value.split("*****");
    var jobTitle = document.getElementById("jobTitle").value.split("*****");
    if ((programme[0] <=0 || programme[1]=="") && error == 0)
    {
        error = 1;
        errmsg = "Programme cannot be empty";
    }
    if ((frequency[0] <=0 || frequency[1]=="") && error == 0)
    {
        error = 1;
        errmsg = "Frequency cannot be empty";
    }
    if ((jobTitle[0] <=0 || jobTitle[1]=="") && error == 0)
    {
        error = 1;
        errmsg = "Job title cannot be empty";
    }

    if (!error)
    {
        var array = tsize - 1;
        var row = table.insertRow(tsize);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = "<a onclick='removeRow(\"jobSpecificMedicalsTable\", " + tsize + ")'><span class='glyphicon glyphicon-remove' style='color:#F00'  ></span></a>";
        cell2.innerHTML = programme[1]+"<input type='hidden' class='form-control' name='jobSpecificMedicalDTOList[" + array + "].programme.id' id='jobSpecificMedicalDTOList" + array + ".programme.id' value='" + programme[0] + "' />"
            +"<input type='hidden' class='form-control' name='jobSpecificMedicalDTOList[" + array + "].programme.name' id='jobSpecificMedicalDTOList" + array + ".programme.name' value='" + programme[1] + "' />";
        cell3.innerHTML = "<input type='hidden' class='form-control' name='jobSpecificMedicalDTOList[" + array + "].jobId' id='jobSpecificMedicalDTOList" + array + ".id' value='" + jobTitle + "' />"+
            frequency[1]+"<input type='hidden' class='form-control' name='jobSpecificMedicalDTOList[" + array + "].frequency.id' id='jobSpecificMedicalDTOList" + array + ".frequency.id' value='" + frequency[0] + "' />"+
            "<input type='hidden' class='form-control' name='jobSpecificMedicalDTOList[" + array + "].frequency.name' id='jobSpecificMedicalDTOList" + array + ".frequency.name' value='" + frequency[1] + "' />";
        $("#frequency").selectpicker('refresh');
        $("#programme").selectpicker('refresh');

    } else
    {
        document.getElementById("jobSpecificMedicalsTableMsg").innerHTML = "<div class='alert alert-danger' align='center'>" + errmsg + "</div>";
        setTimeout(function () {
            document.getElementById('jobSpecificMedicalsTableMsg').innerHTML = "";
        }, 5000);//;
    }

}

function addMedicalProgrammeToCategory(){
    var error = 0;
    var errmsg = "";
    var table = document.getElementById("medicalProgrammeToCategoryTable");
    var tsize = table.rows.length;
    var programme = document.getElementById("programme").value.split("*****");
    var category = document.getElementById("category").value.split("*****");
    var type = document.getElementById("type").value.split("*****");
    var companyId = document.getElementById("company").value;
    if((category[0] <= 0 || category[1] == "") && error == 0){
        error = 1;
        errmsg = "Category cannot be empty";
    }
    if((type[0] <= 0 || type[1] == "") && error == 0){
        error = 1;
        errmsg = "Type cannot be empty";
    }
    if((programme[0] <= 0 || programme[1] == "") && error == 0){
        error = 1;
        errmsg = "Programme cannot be empty";
    }

    if(!error){
        var number = tsize - 1;
        var row = table.insertRow(tsize);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = "<a onclick='removeRow(\"medicalProgrammeToCategoryTable\", "+ tsize +")'><span class='glyphicon glyphicon-remove' style='color:#F00'></span> </a>";
        cell2.innerHTML = category[1] + "<input type = 'hidden' class='form-control' name = 'medicalExaminationCategoryTypeProgrammesList[" + number + "].medicalExaminationCategory.id' id ='medicalExaminationCategoryTypeProgrammesList" + number + ".medicalExaminationCategory.id' value = '" + category[0] + "' />"
            +"<input type = 'hidden' class='form-control' name = 'medicalExaminationCategoryTypeProgrammesList[" + number + "].company.id' id ='medicalExaminationCategoryTypeProgrammesList" + number + ".company.id' value = '" + companyId + "' />"
        +"<input type = 'hidden' class='form-control' name = 'medicalExaminationCategoryTypeProgrammesList[" + number + "].medicalExaminationCategory.name' id ='medicalExaminationCategoryTypeProgrammesList" + number + ".medicalExaminationCategory.name' value = '" + category[1] + "' />";
        cell3.innerHTML = type[1] + "<input type = 'hidden' class='form-control' name = 'medicalExaminationCategoryTypeProgrammesList[" + number + "].medicalExaminationType.id' id ='medicalExaminationCategoryTypeProgrammesList" + number + ".medicalExaminationType.id' value = '" + type[0] + "' />"
            +"<input type = 'hidden' class='form-control' name = 'medicalExaminationCategoryTypeProgrammesList[" + number + "].medicalExaminationType.name' id ='medicalExaminationCategoryTypeProgrammesList" + number + ".medicalExaminationType.name' value = '" + type[1] + "' />";
        cell4.innerHTML = programme[1] + "<input type = 'hidden' class='form-control' name = 'medicalExaminationCategoryTypeProgrammesList[" + number + "].medicalExaminationProgramme.id' id ='medicalExaminationCategoryTypeProgrammesList" + number + ".medicalExaminationProgramme.id' value = '" + programme[0] + "' />"
            +"<input type = 'hidden' class='form-control' name = 'medicalExaminationCategoryTypeProgrammesList[" + number + "].medicalExaminationProgramme.name' id ='medicalExaminationCategoryTypeProgrammesList" + number + ".medicalExaminationProgramme.name' value = '" + programme[1] + "' />";
        $("#programme").selectpicker('refresh');
    }else{
        document.getElementById("medicalProgrammeToCategoryTableMsg").innerHTML = "<div class='alert alert-danger'>"+ errmsg +"</div>";
        setTimeout(function () {
            document.getElementById("medicalProgrammeToCategoryTableMsg").innerHTML = "";
        }, 5000);
    }


}

function addEmployeeAllergyList()
{
    var error = 0;
    var errmsg = "";
    var error = "";
    var table = document.getElementById("employeeAllergiesTable");
    var tsize = table.rows.length;
    var allergy = document.getElementById("allergy").value.split("*****");
    var employeeId = document.getElementById("employee").value;
    if ((allergy[0] <=0 || allergy[1]=="") && error == 0)
    {
        error = 1;
        errmsg = "Allergy cannot be empty";
    }
    if (!error)
    {
        var array = tsize - 1;
        var row = table.insertRow(tsize);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = "<a onclick='removeRow(\"employeeAllergiesTable\", " + tsize + ")'><span class='glyphicon glyphicon-remove' style='color:#F00'  ></span></a>";
        cell2.innerHTML = allergy[1]+"<input type='hidden' class='form-control' name='employeeAllergiesList[" + array + "].allergy.id' id='employeeAllergiesList" + array + ".allergy.id' value='" + allergy[0] + "' />"
            +"<input type='hidden' class='form-control' name='employeeAllergiesList[" + array + "].allergy.name' id='employeeAllergiesList" + array + ".allergy.name' value='" + allergy[1] + "' />"+
            "<input type='hidden' class='form-control' name='employeeAllergiesList[" + array + "].employee.id' id='employeeAllergiesList" + array + ".employee.id' value='" + employeeId + "' />";
        $("#allergy").val('');
        $("#allergy").selectpicker('refresh');
    } else
    {
        document.getElementById("employeeAllergiesTableMsg").innerHTML = "<div class='alert alert-danger' align='center'>" + errmsg + "</div>";
        setTimeout(function () {
            document.getElementById('employeeAllergiesTableMsg').innerHTML = "";
        }, 5000);//;
    }

}


function addEmployeePhysicalAndMedicalCondition()
{
    var error = 0;
    var errmsg = "";
    var error = "";
    var table = document.getElementById("employeeConditionsTable");
    var tsize = table.rows.length;
    var condition = document.getElementById("condition").value.split("*****");
    var employeeId = document.getElementById("employee").value;
    if ((condition[0] <=0 || condition[1]=="") && error == 0)
    {
        error = 1;
        errmsg = "Condition cannot be empty";
    }
    if (!error)
    {
        var array = tsize - 1;
        var row = table.insertRow(tsize);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = "<a onclick='removeRow(\"employeeConditionsTable\", " + tsize + ")'><span class='glyphicon glyphicon-remove' style='color:#F00'  ></span></a>";
        cell2.innerHTML = condition[1]+"<input type='hidden' class='form-control' name='employeePhysicalAndMedicalConditions[" + array + "].physicalAndMedicalCondition.id' id='employeePhysicalAndMedicalConditions" + array + ".physicalAndMedicalCondition.id' value='" + condition[0] + "' />"
            +"<input type='hidden' class='form-control' name='employeePhysicalAndMedicalConditions[" + array + "].physicalAndMedicalCondition.name' id='employeePhysicalAndMedicalConditions" + array + ".physicalAndMedicalCondition.name' value='" + condition[1] + "' />"+
            "<input type='hidden' class='form-control' name='employeePhysicalAndMedicalConditions[" + array + "].employee.id' id='employeePhysicalAndMedicalConditions" + array + ".employee.id' value='" + employeeId + "' />";
        $("#condition").val('');
        $("#condition").selectpicker('refresh');
    } else
    {
        document.getElementById("employeeConditionsTableMsg").innerHTML = "<div class='alert alert-danger' align='center'>" + errmsg + "</div>";
        setTimeout(function () {
            document.getElementById('employeeConditionsTableMsg').innerHTML = "";
        }, 5000);//;
    }

}


function addEmployeeSpecialNeed()
{
    var error = 0;
    var errmsg = "";
    var error = "";
    var table = document.getElementById("employeeSpecialNeedTable");
    var tsize = table.rows.length;
    var specialNeed = document.getElementById("specialNeed").value.split("*****");
    var employeeId = document.getElementById("employee").value;
    if ((specialNeed[0] <=0 || specialNeed[1]=="") && error == 0)
    {
        error = 1;
        errmsg = "Special need cannot be empty";
    }
    if (!error)
    {
        var array = tsize - 1;
        var row = table.insertRow(tsize);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = "<a onclick='removeRow(\"employeeSpecialNeedTable\", " + tsize + ")'><span class='glyphicon glyphicon-remove' style='color:#F00'  ></span></a>";
        cell2.innerHTML = specialNeed[1]+"<input type='hidden' class='form-control' name='employeeSpecialNeedList[" + array + "].specialNeed.id' id='employeeSpecialNeedList" + array + ".specialNeed.id' value='" + specialNeed[0] + "' />"
            +"<input type='hidden' class='form-control' name='employeeSpecialNeedList[" + array + "].specialNeed.name' id='employeeSpecialNeedList" + array + ".specialNeed.name' value='" + specialNeed[1] + "' />"+
            "<input type='hidden' class='form-control' name='employeeSpecialNeedList[" + array + "].employee.id' id='employeeSpecialNeedList" + array + ".employee.id' value='" + employeeId + "' />";
        $("#specialNeed").val('');
        $("#specialNeed").selectpicker('refresh');
    } else
    {
        document.getElementById("employeeSpecialNeedTableMsg").innerHTML = "<div class='alert alert-danger' align='center'>" + errmsg + "</div>";
        setTimeout(function () {
            document.getElementById('employeeSpecialNeedTableMsg').innerHTML = "";
        }, 5000);//;
    }

}

function removeRow(tName, index)
{
    // var index = document.getElementById(tName).rows.namedItem(index) ;
    document.getElementById(tName).deleteRow(index);
    if (document.getElementById("tableCount"))
    {
        var table = document.getElementById(tName);
        var tsize = table.rows.length;
        document.getElementById("tableCount").value = tsize - 1;
        validateform();
    }
}


function loadBySelectedMedicalExamType() {
    var medicalExamTypeSelected = $("#medicalExamType").val();
    if (medicalExamTypeSelected<=0){
        $('#medicalResultsButtons').hide();
    }
    else {
        var employeeId = $("#employeeId").val();
        var uploadUrl="/employees/results/upload/"+employeeId+"/"+medicalExamTypeSelected;
        var captureUrl="/employees/results/capture/"+employeeId+"/"+medicalExamTypeSelected;
        var captureButton= document.getElementById("enterResultsButton");
        var uploadResultsButton= document.getElementById("uploadResultsButton");
        captureButton.setAttribute("href", captureUrl);
        uploadResultsButton.setAttribute("href", uploadUrl);
        $('#medicalResultsButtons').show();
    }
}

$(function () {
    $(".dateAfter").datepicker({
        minDate: '1',
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true
    });
});


$(function () {
    $(".dateBefore").datepicker({
        maxDate: '1',
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true
    });
});

$(function () {
    $(".allDates").datepicker({
        //maxDate: '1',
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true
    });
});

function resultsFileUpload(){
    $('#successMessage').hide();
    $('#failureMessage').hide();
    Dropzone.options.resultsUploadForm = {
        autoProcessQueue:false,
        acceptedFiles: "application/pdf,image/png,image/jpeg,image/jpg,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        addRemoveLinks: true,
        dictResponseError: "Upload failed",
        maxFilesize: 2, // MB
        init: function (e) {

            var myDropzone = this;

            $('#uploadResults').on("click", function() {
                myDropzone.processQueue(); // Tell Dropzone to process all queued files.
            });
            // Event to send your custom data to your server
            myDropzone.on("sending", function(file, xhr, data) {
                // First param is the variable name used server side
                // Second param is the value, you can add what you what
                // Here I added an input value
                data.append("medicalExamTypeId", $('#medicalExamTypeId').val());
                data.append("uploadId", $('#uploadId').val());
            });
        },
        success:function(file, response)
        {
            if(response.success){
                this.removeFile(file);
                $('#successMessage').html(response.message);
                $('#successMessage').show();
                setTimeout(function () {
                    $('#successMessage').hide();
                }, 5000);
            }else {
                this.removeFile(file);
                $('#failureMessage').html(response.message);
                $('#failureMessage').show();
                setTimeout(function () {
                    $('#failureMessage').hide();
                }, 5000);
            }
        }
    };
}

function dropdown(val)
{
    document.getElementById(val).style.visibility = "visible";
}
function dropdownhide(val)
{
    document.getElementById(val).style.visibility = "hidden";
}


function printResults(recordId,fileIndex)
{
    var urlString="/employees/files/printerpopup/"+recordId+"/"+fileIndex;
    var popupId="popup"+recordId+fileIndex;
    $.ajax({method: "GET",
        cache: false,
        url:  urlString,
        success: function (result) {
        console.log(result);
            $("#printOut").html(result);
            dropdown(popupId);
        }});
}


function showResultsTrend(employeeId,programmeId)
{
    var popupUrl="/resulttrend/trendanalysispopup";
    var trendsUrlString="/resulttrend/trendanalysis/"+employeeId+"/"+programmeId;
    var popupId="trendPopup";
    $.ajax({method: "GET",
        cache: false,
        url:  popupUrl,
        success: function (htmlResult) {
            console.log(htmlResult);
            $("#viewTrend").html(htmlResult);

            $.ajax({method: "GET",
                cache: false,
                url:  trendsUrlString,
                success: function (result) {
                    var trendData = [];
                    var visits = [];
                    result.forEach((record, index) => {
                        console.log('Index '+(index+1));
                        visits.push((index+1));
                        trendData.push({y: record.examDate, a: record.score});
                    });
                    // The Line Chart
                    new Morris.Line({
                        // ID of the element in which to draw the chart.
                        element: 'medical-results-trend',
                        //The DATA
                        data: trendData,
                        // Color
                        lineColors: ['#008000','#feb252'],
                        // The name of the data record attribute that contains x-values.
                        xkey: 'y',
                        // A list of names of data record attributes that contain y-values.
                        ykeys: ['a'],
                        // Labels for the ykeys -- will be displayed when you hover over the
                        // chart.
                        labels: ['Score'],
                        xLabels:'month',
                        xLabelFormat: function (x) { return ''; }
                    });
                    dropdown(popupId);
                }
            });

        }});

}


$(function () {
    $(".dateAfter").datepicker({
        minDate: '0',
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true
    });
});

function selectAll(id)
{
    //document.getElementById(id).focus();
    document.getElementById(id).select();
}


function calculateActualScore(index) {
    console.log(index);
    var conformityLevelForStandard =  $("#"+index+"conformityLevel").val().split("*****");
    var id =conformityLevelForStandard[0];
    var percentageNonConformityForStandard=parseInt(conformityLevelForStandard[1]);
    $("#"+index+"conformityLevelId").val(id);
    var weightForStandard =  parseInt($("#"+index+"sheqAuditStandardWeight").val());
    var actualScoreForStandard=((100-percentageNonConformityForStandard)*weightForStandard)/100;
    $("#"+index+"actualScore").val(actualScoreForStandard.toFixed(2));
    var actualScoresInputBoxes=  document.getElementsByClassName("actualScore");
    var newTotalActualScore=0;
    $.each(actualScoresInputBoxes, function( index, actualScoreTextField ) {
        newTotalActualScore+=parseInt(actualScoreTextField.value);
    });
    var totalPossibleScore=parseInt($("#possibleScore").val());
    var actualScorePercentage=(newTotalActualScore/totalPossibleScore)*100;
    $("#actualScorePercentage").html("<span id='actualScorePercentage'>"+actualScorePercentage.toFixed(2)+"%<span/>");
    $("#"+index+"actualScoreForQn").html("<span id='\"#\""+index+"\"actualScoreForQn\"'>"+actualScoreForStandard.toFixed(2)+"/"+ weightForStandard+"<span/>");

}



function processConformity(index) {
    if ($("#"+index+"sheqAuditStandardConforms").is(':checked')) {
        $("#"+index+"nonConformitySection").hide();
        $("#"+index+"findingComment").val("");
        $("#"+index+"findingSupportingFileName").val("");
        $("#"+index+"findingSupportingFileData").val("");
        $("#"+index+"findingSupportingFileType").val("");
        $("#"+index+"conformityLevelId").val(0);
        $("#"+index+"conformityLevel").val("");
        $("#"+index+"conformityLevel").selectpicker('refresh');

        var weightForStandard =  parseInt($("#"+index+"sheqAuditStandardWeight").val());
        $("#"+index+"actualScore").val(weightForStandard)
        var actualScoresInputBoxes=  document.getElementsByClassName("actualScore");
        var newTotalActualScore=0;
        $.each(actualScoresInputBoxes, function( index, actualScoreTextField ) {
            newTotalActualScore+=parseInt(actualScoreTextField.value);
        });
        var totalPossibleScore=parseInt($("#possibleScore").val());
        var actualScorePercentage=(newTotalActualScore/totalPossibleScore)*100;
        $("#actualScorePercentage").html("<span id='actualScorePercentage'>"+actualScorePercentage.toFixed(2)+"%<span/>");
    } else {
        $("#"+index+"nonConformitySection").show();
        calculateActualScore(index);
    }
}

function processConformityOnLoad() {
    var conformityValues=  document.getElementsByClassName("conformityValues");
    console.log(conformityValues);
    $.each(conformityValues, function( index, conformityValue ) {
        processConformity(index);
    });
}


function calculateActualScoreOnLoad() {
    var actualScoresInputBoxes=  document.getElementsByClassName("actualScore");
    var newTotalActualScore=0;
    $.each(actualScoresInputBoxes, function( index, actualScoreTextField ) {
        newTotalActualScore+=parseFloat(actualScoreTextField.value);
    });
    var totalPossibleScore=parseInt($("#possibleScore").val());
    var actualScorePercentage=(newTotalActualScore/totalPossibleScore)*100;
    $("#actualScorePercentage").html("<span id='actualScorePercentage'>"+actualScorePercentage.toFixed(2)+"%<span/>");
}

function addPpeToJobTitleAndFrequency(){
    var error = 0;
    var errmsg = "";
    var table = document.getElementById("ppeToJobTitleAndFrequencyTable");
    var tsize = table.rows.length;
    var jobTitle = document.getElementById("jobTitle").value.split("*****");
    var ppe = document.getElementById("personalprotectiveequipment").value.split("*****");
    var frequency = document.getElementById("frequency").value.split("*****");
    var companyId = document.getElementById("company").value;
    if((jobTitle[0] <= 0 || jobTitle[1] == "") && error == 0){
        error = 1;
        errmsg = "Job Title cannot be empty";
    }
    if((ppe[0] <= 0 || ppe[1] == "") && error == 0){
        error = 1;
        errmsg = "PPE cannot be empty";
    }
    if((frequency[0] <= 0 || frequency[1] == "") && error == 0){
        error = 1;
        errmsg = "Allocation frequency cannot be empty";
    }

    if(!error){
        var number = tsize - 1;
        var row = table.insertRow(tsize);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.innerHTML = "<a onclick='removeRow(\"ppeToJobTitleAndFrequencyTable\", "+ tsize +")'><span class='glyphicon glyphicon-remove' style='color:#F00'></span> </a>";
        cell2.innerHTML = jobTitle[1] + "<input type = 'hidden' class='form-control' name = 'matchPpeToJobTitleAndFrequencyList[" + number + "].jobTitle.id' id ='jobTitle" + number + ".jobTitle.id' value = '" + jobTitle[0] + "' />"
            +"<input type = 'hidden' class='form-control' name = 'matchPpeToJobTitleAndFrequencyList[" + number + "].company.id' id ='matchPpeToJobTitleAndFrequencyList" + number + ".company.id' value = '" + companyId + "' />"
            +"<input type = 'hidden' class='form-control' name = 'matchPpeToJobTitleAndFrequencyList[" + number + "].jobTitle.name' id ='matchPpeToJobTitleAndFrequencyList" + number + ".jobTitle.name' value = '" + jobTitle[1] + "' />";
        cell3.innerHTML = ppe[1] + "<input type = 'hidden' class='form-control' name = 'matchPpeToJobTitleAndFrequencyList[" + number + "].personalProtectiveEquipment.id' id ='matchPpeToJobTitleAndFrequencyList" + number + ".personalProtectiveEquipment.id' value = '" + ppe[0] + "' />"
            +"<input type = 'hidden' class='form-control' name = 'matchPpeToJobTitleAndFrequencyList[" + number + "].personalProtectiveEquipment.name' id ='matchPpeToJobTitleAndFrequencyList" + number + ".personalProtectiveEquipment.name' value = '" + ppe[1] + "' />";
        cell4.innerHTML = frequency[1] + "<input type = 'hidden' class='form-control' name = 'matchPpeToJobTitleAndFrequencyList[" + number + "].frequency.id' id ='matchPpeToJobTitleAndFrequencyList" + number + ".frequency.id' value = '" + frequency[0] + "' />"
            +"<input type = 'hidden' class='form-control' name = 'matchPpeToJobTitleAndFrequencyList[" + number + "].frequency.name' id ='matchPpeToJobTitleAndFrequencyList" + number + ".frequency.name' value = '" + frequency[1] + "' />";
        $("#ppe").selectpicker('refresh');
    }else{
        document.getElementById("addPpeToJobTitleAndFrequencyMsg").innerHTML = "<div class='alert alert-danger'>"+ errmsg +"</div>";
        setTimeout(function () {
            document.getElementById("addPpeToJobTitleAndFrequencyMsg").innerHTML = "";
        }, 5000);
    }
}

function loadJobTitlesByDepartmentAllowSplit() {
    var departmentId = $("#department").val();
    $("#jobTitle").empty();
    $("#jobTitle").append("<option value = " + 0 + ">" + 'Please Select Job Title' +  "</option>");
    $.get( "/jobtitles?department=" + departmentId, function( jobTitles ) {
        jobTitles.forEach(function(jobTitle, i) {
            var option = "<option value = " + jobTitle.id + "*****" + jobTitle.name+ ">" + jobTitle.name +  "</option>";
            $("#jobTitle").append(option);
        });
        $("#jobTitle").selectpicker('refresh');
    });

}


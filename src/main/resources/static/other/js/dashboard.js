// jQuery(document).ready(function(){
//
//     "use strict";
//     getEmployeeMedicalsByDepartment();
//     overallMedicalCompliance();
//     function showTooltip(x, y, contents) {
// 	jQuery('<div id="tooltip" class="tooltipflot">' + contents + '</div>').css( {
// 	    position: 'absolute',
// 	    display: 'none',
// 	    top: y + 5,
// 	    left: x + 5
// 	}).appendTo("body").fadeIn(200);
//     }
//
//
//
//
//     jQuery('#sparkline').sparkline([4,3,3,1,4,3,2,2,3,10,9,6], {
// 	type: 'bar',
//         height:'30px',
//         barColor: '#428BCA'
//     });
//
//     jQuery('#sparkline2').sparkline([9,8,8,6,9,10,6,5,6,3,4,2], {
// 	type: 'bar',
// 	height:'30px',
//         barColor: '#999'
//     });
//
//     jQuery('#sparkline3').sparkline([4,3,3,1,4,3,2,2,3,10,9,6], {
// 	type: 'bar',
//         height:'30px',
//         barColor: '#428BCA'
//     });
//
//     jQuery('#sparkline4').sparkline([9,8,8,6,9,10,6,5,6,3,4,2], {
// 	type: 'bar',
// 	height:'30px',
//         barColor: '#999'
//     });
//
//     jQuery('#sparkline5').sparkline([4,3,3,1,4,3,2,2,3,10,9,6], {
// 	type: 'bar',
//         height:'30px',
//         barColor: '#428BCA'
//     });
//
//     jQuery('#sparkline6').sparkline([9,8,8,6,9,10,6,5,6,3,4,2], {
// 	type: 'bar',
// 	height:'30px',
//         barColor: '#999'
//     });
//
//
//     /***** BAR CHART *****/
//     var delay = (function() {
//         var timer = 0;
//         return function(callback, ms) {
//             clearTimeout(timer);
//             timer = setTimeout(callback, ms);
//         };
//     })()
//
//
//     function getEmployeeMedicalsByDepartment(){
//         $.ajax({url: "/dashboard/employeemdeicalsbydepartment/", success: function(result) {
//                 var graphData = [];
//                 result.forEach(record => {
//                     graphData.push({y: record.department, a: record.passedEmployees, b: record.failedEmployees});
//                 });
//                 var m3 = new Morris.Bar({
//                     // ID of the element in which to draw the chart.
//                     element: 'bar-chart',
//                     // Chart data records -- each entry in this array corresponds to a point on
//                     // the chart.
//                     data: graphData,
//                     // barColors: ['#397FB4','#A94442'],
//                     xkey: 'y',
//                     ykeys: ['a', 'b'],
//                     labels: ['Passed', 'Failed'],
//                     lineWidth: '1px',
//                     fillOpacity: 0.8,
//                     smooth: false,
//                     hideHover: true,
//                     resize: true
//                 });
//                 jQuery(window).resize(function() {
//                     delay(function() {
//                         m3.redraw();
//                     }, 200);
//                 }).trigger('resize');
//
//             }
//         });
//     }
//
//     function overallMedicalCompliance(){
//         $.ajax({url: "/dashboard/overallmedicalcompliance/", success: function(result) {
//                 var data = [];
//                 data.push({label: 'Compliant', value: result.compliant});
//                 data.push({label: 'Overdue', value: result.overdue});
//                 var total = result.compliant+result.overdue;
//                 var browsersChart = Morris.Donut({
//                     element: 'overall-medical-compliance',
//                     data: data,
//                     colors: ['#397FB4','#A94442'],
//                     formatter: function (value, data) {
//                         return Math.floor(value/total*100) + '%';
//                     }
//                 });
//                 browsersChart.options.data.forEach(function(label, i) {
//                     var legendItem = $('<span></span>').text( label['label'] + " ( " +label['value'] + " )" ).prepend('<br><span>&nbsp;</span>');
//                     legendItem.find('span')
//                         .css('backgroundColor', browsersChart.options.colors[i])
//                         .css('width', '20px')
//                         .css('display', 'inline-block')
//                         .css('margin', '2px');
//                     $('#legend').append(legendItem)
//                 });            }
//         });
//     }
//
//     // This will empty first option in select to enable placeholder
//     jQuery('select option:first-child').text('');
//
//     // Select2
//     jQuery("select").select2({
//         minimumResultsForSearch: -1
//     });
//
//     // Basic Wizard
//     jQuery('#basicWizard').bootstrapWizard({
//         onTabShow: function(tab, navigation, index) {
//             tab.prevAll().addClass('done');
//             tab.nextAll().removeClass('done');
//             tab.removeClass('done');
//
//             var $total = navigation.find('li').length;
//             var $current = index + 1;
//
//             if($current >= $total) {
//                 $('#basicWizard').find('.wizard .next').addClass('hide');
//                 $('#basicWizard').find('.wizard .finish').removeClass('hide');
//             } else {
//                 $('#basicWizard').find('.wizard .next').removeClass('hide');
//                 $('#basicWizard').find('.wizard .finish').addClass('hide');
//             }
//         }
//     });
//
//     // This will submit the basicWizard form
//     jQuery('.panel-wizard').submit(function() {
//         alert('This will submit the form wizard');
//         return false // remove this to submit to specified action url
//     });
//
// });

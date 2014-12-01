//to store a json file in a variable:
var cjson = (function () {
    var cjson = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "json/events.json",
        'dataType': "json",
        'success': function (data) {
            cjson = data;
        }
    });
    return cjson;
})(); 

//loads the generic full calendar
$(document).ready(function() {
	
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			defaultDate: '2014-06-12',
    //this is to add an event by selecting hours or days in a selected view through a pop up
		    selectable: true,
			selectHelper: true,
			select: function(start, end) {
				var title = prompt('Event Title:');
				var eventData;
				if (title) {
					eventData = {
						title: title,
						start: start,
						end: end
					};
$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
				}
				$('#calendar').fullCalendar('unselect');
        	},    
            
    //allows the events to be draggable or not. 
            editable: true,
			events: cjson
		
	       });
    
//This is to add an event by clicking, doesn't work yet....
    $('#calendar').fullCalendar({
        eventClick: function(calEvent, jsEvent, view) {

            alert('Event: ' + calEvent.title);
            alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            alert('View: ' + view.name);
        }});
});
    










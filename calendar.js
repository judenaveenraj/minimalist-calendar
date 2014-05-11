function Calendar() {

	this.year = 2014;
	this.month = 1;
	this.day = 20;
	this.today_year = 2014;
	this.today_month = 4;
	this.today_day = 15;
	this.calendar = $(".calendar_container");
}




$.extend(Calendar.prototype, {

	init: function(){
		calendar = this;

		$(".month").click(function(){
			console.log("expand");
			calendar.goToMonth($(this).attr("data-month"));
		});

		
	},

	goToMonth: function(month){
		year_calendar = $(this.calendar).children(".year_calendar");
		year_calendar.children(".month"+month).addClass('selected');
		year_calendar.children(".month:not(.selected)").addClass("hide");

	},

	goBackToYear: function(){
		year_calendar = $(this.calendar).children(".year_calendar");
		year_calendar.children(".month:not(.selected)").removeClass("hide");
		year_calendar.children(".month.selected").removeClass('selected');
	}





});

var calendar = new Calendar();
calendar.init();
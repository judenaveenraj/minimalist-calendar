function Calendar() {

	this.displayYear = undefined;
	this.displayMonth = undefined;
	this.displayDay = undefined;
	this.today_year = 2014;
	this.today_month = 4;
	this.today_day = 15;
	this.calendar = $(".calendar_container");
	this.states = {
		YEAR: 0,
    	MONTH: 1,
    	DAY: 2
	};
	this.currentState = this.states.YEAR;

	this.selectedMonth = undefined;
	this.selectedDay = undefined;
}




$.extend(Calendar.prototype, {

	init: function(){
		calendar = this;
		this.goToState("YEAR", {
								year: 2014
							})
	},

	
	

	/*_goBackToMonth: function(){
		
		
		this.currentState = this.states.MONTH;

		$(".day").unbind();
		$(".day").click(function(){
			calendar.goToDay($(this).attr("data-day"));

		});
	},

/*	_goBackToYear: function(){
		year_calendar = $(this.calendar).children(".year_calendar");
		year_calendar.children(".month:not(.selected)").removeClass("hide");
		year_calendar.children(".month.selected").removeClass('selected');

		this.currentState = this.states.YEAR;

		$(".monthname_container").unbind();
		$(".monthname_container").click(function(){
			calendar.goToMonth($(this).parent().attr("data-month"));

		});
	},*/

	goToState: function(state, args){
		if(this.states[state] == undefined){
			console.log("UNDEFINED STATE..."); 
			return false;
		}
		if($.isEmptyObject(args)){
			console.log("MISSING ARGUMENTS..."); 
			return false;
		}

		if((this.displayYear == undefined) || (args.year != undefined && this.displayYear != args.year)){
			this._initYear(args.year);
		}

		if(state == "DAY"){
			if(args.day == undefined || args.month == undefined || args.year == undefined){
				console.log("NOT ENOUGH INFORMATION ON DAY");
				return false;
			}
			this.displayDay = args.day;
			this.displayMonth = args.month;
			this.displayYear = args.year;
			this.currentState = this.states.DAY;
			this._goToDay();
			
		} else if(state == "MONTH"){
			if(args.month == undefined || args.year == undefined){
				console.log("NOT ENOUGH INFORMATION ON MONTH");
				return false;
			}
			this.displayMonth = args.month;
			this.displayYear = args.year;
			this.currentState = this.states.MONTH;
			this._goToMonth();

		} else if(state == "YEAR"){
			if(args.year == undefined){
				console.log("NOT ENOUGH INFORMATION ON YEAR");
				return false;
			}

			this.displayYear = args.year;
			this.currentState = this.states.YEAR;
			this._goToYear();
		}

			

	},

	_getYearDiv: function(){
		return $(this.calendar).children(".year_calendar");
	},


	_initYear: function(){
		console.log("asdasdad")
		var this_cal = this;

		$(".monthname_container")
			.click(function(){

				if( this_cal.selectedMonth != undefined ){
					year_calendar = this_cal._getYearDiv();
					year_calendar.children(".month:not(.selected)").removeClass("hide");
					year_calendar.children(".month.selected").removeClass("selected");
					this_cal.selectedMonth = undefined;
				}
				else{
					this_cal.goToState("MONTH", {
										month: $(this).parent().attr("data-month"),
										year: this_cal.displayYear
									});
				}
			});

		$(".month .day")
			.click(function(){
				if( this_cal.selectedDay != undefined ){
					year_calendar = this_cal._getYearDiv();
					year_calendar.children(".month:not(.selected) .day").removeClass("hide");
					year_calendar.children(".month.selected .day.selected").removeClass('selected');
					this_cal.selectedDay = undefined;
				}
				this_cal.goToState("DAY", {
									day: $(this).attr('data-day'),
									month: $(this).parent().parent().attr('data-month'),
									year: this_cal.displayYear
								});
			});
	},

	_goToYear: function(){

	},

	_goToMonth: function(){
		year_calendar = this._getYearDiv();
		year_calendar
			.children(".month"+this.displayMonth)
			.addClass('selected');
		year_calendar
			.children(".month:not(.selected)")
			.addClass("hide");
		this.selectedMonth = this.displayMonth;

	},

	_goToDay: function(){
		console.log("asdassdadasda")
		
		year_calendar = this._getYearDiv();
		year_calendar.find(".month.selected .day"+this.displayDay).addClass('selected');
		year_calendar.find(".month.selected .day:not(.selected)").addClass("hide");
		year_calendar.find(".month.selected .dayname").addClass("hide");

		year_calendar.find(".month.selected .monthname_content").append("<span id='extra_monthname_content'>"+this.displayDay+"</span>");

		this.selectedDay = this.displayDay;

	},







});

var calendar = new Calendar();
calendar.init();
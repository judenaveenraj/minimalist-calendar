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


	goToState: function(state, args){
		console.log(this.currentState);
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
				console.log(args)
				return false;
			}
			this.displayDay = args.day;
			this.displayMonth = args.month;
			this.displayYear = args.year;
			this._goToDay();
			
		} else if(state == "MONTH"){
			if(args.month == undefined || args.year == undefined){
				console.log("NOT ENOUGH INFORMATION ON MONTH");
				return false;
			}
			this.displayMonth = args.month;
			this.displayYear = args.year;
			
			this._goToMonth();

		} else if(state == "YEAR"){
			if(args.year == undefined){
				console.log("NOT ENOUGH INFORMATION ON YEAR");
				return false;
			}

			this.displayYear = args.year;
			
			this._goToYear();
		}

		console.log(this.currentState);

			

	},

	_getYearDiv: function(){
		return $(this.calendar).children(".year_calendar");
	},


	_initYear: function(){
		var this_cal = this;

		$(".monthname_container")
			.click(function(){

				if( this_cal.selectedMonth == undefined ){
					this_cal.goToState("MONTH", {
										month: $(this).parent().attr("data-month"),
										year: this_cal.displayYear
									});
				}
				else{
					this_cal.goToState("YEAR", {
										year: this_cal.displayYear
									});
					
				}
			});

		$(".month .day")
			.click(function(){
				if( this_cal.selectedDay == undefined ){
					this_cal.goToState("DAY", {
									day: $(this).attr('data-day'),
									month: $(this).parent().parent().attr('data-month'),
									year: this_cal.displayYear
								});	
				}
				else{
					this_cal.goToState("MONTH", {
									month: this_cal.displayMonth,
									year: this_cal.displayYear
								});	
				}
				
			});
	},

	_goToYear: function(){
		//IF COMING FROM MONTH VIEW
		if(this.currentState == this.states.MONTH){
			year_calendar = this._getYearDiv();
			year_calendar.children(".month:not(.selected)").removeClass("hide");
			year_calendar.children(".month.selected").removeClass("selected");
			this.selectedMonth = undefined;
		}
		this.currentState = this.states.YEAR;
	},

	_goToMonth: function(){
		//IF COMING FROM YEAR VIEW
		if(this.currentState == this.states.YEAR){
			console.log("in current state year")
			year_calendar = this._getYearDiv();
			year_calendar.children(".month"+this.displayMonth).addClass('selected');
			year_calendar.children(".month:not(.selected)").addClass("hide");
		}
		//IF COMING FROM DAY VIEW
		else if(this.currentState == this.states.DAY){
			console.log("From day to month")
			year_calendar = this_cal._getYearDiv();
			year_calendar.find(".extra_monthname_content").remove();
			year_calendar.find(".month.selected .day"+this.displayDay).removeClass('selected');
			year_calendar.find(".month.selected .day:not(.selected)").removeClass("hide");
			year_calendar.find(".month.selected .dayname").removeClass("hide");
			
			//year_calendar.children(".month:not(.selected) .day").removeClass("hide");
			//year_calendar.children(".month.selected .day.selected").removeClass('selected');
			this_cal.selectedDay = undefined;
		}
		this.selectedMonth = this.displayMonth;
		this.currentState = this.states.MONTH;
	},

	_goToDay: function(){
		//IF COMING FROM MONTH VIEW
		console.log(this)
		if(this.currentState == this.states.MONTH){
			year_calendar = this._getYearDiv();
			year_calendar.find(".month.selected .day"+this.displayDay).addClass('selected');
			year_calendar.find(".month.selected .day:not(.selected)").addClass("hide");
			year_calendar.find(".month.selected .dayname").addClass("hide");
			year_calendar.find(".month.selected .monthname_content").append("<span class='extra_monthname_content'>"+this.displayDay+"</span>");
		}
		//IF COMING FROM YEAR VIEW
		else if(this.currentState == this.states.YEAR){
			year_calendar = this._getYearDiv();
			year_calendar.children(".month"+this.displayMonth).addClass('selected');
			year_calendar.children(".month:not(.selected)").addClass("hide");
			year_calendar.find(".month.selected .day"+this.displayDay).addClass('selected');
			year_calendar.find(".month.selected .day:not(.selected)").addClass("hide");
			year_calendar.find(".month.selected .dayname").addClass("hide");
			year_calendar.find(".month.selected .monthname_content").append("<span id='extra_monthname_content'>"+this.displayDay+"</span>");
			this.selectedMonth = this.displayMonth;
		}
		this.selectedDay = this.displayDay;
		this.currentState = this.states.DAY;
	}







});

var calendar = new Calendar();
calendar.init();
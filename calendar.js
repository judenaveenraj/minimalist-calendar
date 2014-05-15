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
	this.historyStates = [this.states.YEAR];
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
		console.log("gotostate "+state)
		if(this._peekHistoryState() != this.currentState)
			this._pushHistoryState(this.currentState);

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

		

			

	},

	_getYearDiv: function(){
		return $(this.calendar).children(".year_calendar");
	},


	_initYear: function(){

		var this_cal = this;
		//Setup click handlers
		$(".monthname_content")
			.click(function(){
				if((this_cal.currentState != this_cal.states.MONTH) && !($(this).parent().parent().hasClass("selected"))){
					this_cal.goToState("MONTH", {
										month: $(this).parent().parent().attr("data-month"),
										year: this_cal.displayYear
									});
				}
				
				
					
			});

		$(".month .day")
			.click(function(){
				
				this_cal.goToState("DAY", {
								day: $(this).attr('data-day'),
								month: $(this).parent().parent().attr('data-month'),
								year: this_cal.displayYear
							});	
		});

		$(".back_button")
			.click(function(){
				console.log("adasd" + this_cal._peekHistoryState());
				nextState = this_cal._popHistoryState();
				if( nextState == this_cal.states.YEAR){
					this_cal.goToState("YEAR", {
										year: this_cal.displayYear
									});
					
				} else if(nextState 	== this_cal.states.MONTH){
					this_cal.goToState("MONTH", {
										year: this_cal.displayYear,
										month: this_cal.displayMonth
									});
					
				}
			});
		
	},

	_goToYear: function(){
		console.log("going to year");
		//IF COMING FROM MONTH VIEW
		if(this.currentState == this.states.MONTH){
			year_calendar = this._getYearDiv();
			year_calendar.children(".month:not(.selected)").removeClass("hide");
			year_calendar.children(".month.selected").removeClass("selected");
			this.selectedMonth = undefined;
		}
		if(this.currentState == this.states.DAY){
			year_calendar = this._getYearDiv();
			year_calendar.find(".extra_monthname_content").remove();

			year_calendar.find(".month.selected .day"+this.displayDay).removeClass('selected');
			year_calendar.find(".month.selected .day:not(.selected)").removeClass("hide");
			year_calendar.find(".month.selected .dayname").removeClass("hide");
			year_calendar.children(".month:not(.selected)").removeClass("hide");
			year_calendar.children(".month.selected").removeClass("selected");
			this.selectedMonth = undefined;
		}
		this.currentState = this.states.YEAR;
	},

	_goToMonth: function(){
		console.log("going to month");
		//IF COMING FROM YEAR VIEW
		if(this.currentState == this.states.YEAR){
			year_calendar = this._getYearDiv();
			year_calendar.children(".month"+this.displayMonth).addClass('selected');
			year_calendar.children(".month:not(.selected)").addClass("hide");
		}
		//IF COMING FROM DAY VIEW
		else if(this.currentState == this.states.DAY){
			console.log("From day to month")
			year_calendar = this._getYearDiv();
			year_calendar.find(".extra_monthname_content").remove();
			year_calendar.find(".month.selected .day"+this.displayDay).removeClass('selected');
			year_calendar.find(".month.selected .day:not(.selected)").removeClass("hide");
			year_calendar.find(".month.selected .dayname").removeClass("hide");
			
			//year_calendar.children(".month:not(.selected) .day").removeClass("hide");
			//year_calendar.children(".month.selected .day.selected").removeClass('selected');
			this.selectedDay = undefined;
		}
		this.selectedMonth = this.displayMonth;
		this.currentState = this.states.MONTH;
	},

	_goToDay: function(){
		console.log("going to day");
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
			year_calendar.find(".month.selected .monthname_content").append("<span class='extra_monthname_content'>"+this.displayDay+"</span>");
			this.selectedMonth = this.displayMonth;
		}
		this.selectedDay = this.displayDay;
		this.currentState = this.states.DAY;
	},

	_popHistoryState: function(){
		return this.historyStates.pop();
	},

	_peekHistoryState: function(){
		return this.historyStates[this.historyStates.length-1];
	},

	_pushHistoryState:function(state){
		this.historyStates.push(state);
	}

});

function CalendarMath() {
	
}




$.extend(CalendarMath.prototype, {
	firstDayOfYear: function(year){
		var d = new Date("01/01/"+year);
		var n = d.getDay();
	},
	numDaysInMonth: function(m,y){
		// months in JavaScript start at 0 so decrement by 1 e.g. 11 = Dec
	    --m;

	    // if month is Sept, Apr, Jun, Nov return 30 days
	    if( /8|3|5|10/.test( m ) ) return 30;

	    // if month is not Feb return 31 days
	    if( m != 1 ) return 31;

	    // To get this far month must be Feb ( 1 )
	    // if the year is a leap year then Feb has 29 days
	    if( ( y % 4 == 0 && y % 100 != 0 ) || y % 400 == 0 ) return 29;

	    // Not a leap year. Feb has 28 days.
	    return 28;		
	}
});


var calendar = new Calendar();
calendar.init();
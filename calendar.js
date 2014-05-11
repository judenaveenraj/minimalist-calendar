function Calendar() {

	this.year = 2014;
	this.month = 1;
	this.day = 20;
	this.today_year = 2014;
	this.today_month = 4;
	this.today_day = 15;



}




$.extend(Calendar.prototype, {


	sayDate: function(){
		console.log(this.year);
	}





});
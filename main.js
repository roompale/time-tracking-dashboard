

// when time horizon is clicked, fetch json file

// parse based on whether time horizon is daily, weekly or monthly

// set a var based on category (work, play, social, etc.)

// display using innerHTML 


//define the file
let file = "./data.json"

//global vars for data
let dailyCurrent = [];
let weeklyCurrent = [];
let monthlyCurrent = [];
let dailyPrevious = [];
let weeklyPrevious = [];
let monthlyPrevious = [];

//vars for id selectors
let currentText = document.querySelectorAll("#current");
let previousText = document.querySelectorAll("#previous");



//function for importing file and populating data
async function getFile(){
	let received = await fetch(file);
	let mainData = await received.json();

	for (let i = 0; i < mainData.length; i++) {
		dailyCurrent.push(mainData[i].timeframes.daily.current);
	}

	for (let i = 0; i < mainData.length; i++) {
		weeklyCurrent.push(mainData[i].timeframes.weekly.current);
	}

	for (let i = 0; i < mainData.length; i++) {
		monthlyCurrent.push(mainData[i].timeframes.monthly.current);
	}

	for (let i = 0; i < mainData.length; i++) {
		dailyPrevious.push(mainData[i].timeframes.daily.previous);
	}	

	for (let i = 0; i < mainData.length; i++) {
		weeklyPrevious.push(mainData[i].timeframes.weekly.previous);
	}

	for (let i = 0; i < mainData.length; i++) {
		monthlyPrevious.push(mainData[i].timeframes.monthly.previous);
	}

	//default weekly display
	weeklyDisplay();

}


//initialise data at start

getFile();




// function to display daily

function dailyDisplay(){

	for (i=0; i<currentText.length; i++){
		currentText[i].innerHTML = dailyCurrent[i];
	}

	for (i=0; i<previousText.length; i++){
		previousText[i].innerHTML = "Yesterday - " + dailyPrevious[i];
	}
}

function weeklyDisplay(){

	for (i=0; i<currentText.length; i++){
		currentText[i].innerHTML = weeklyCurrent[i];
	}

	for (i=0; i<previousText.length; i++){
		previousText[i].innerHTML = "Last week - " + weeklyPrevious[i];
	}
}

function monthlyDisplay(){

	for (i=0; i<currentText.length; i++){
		currentText[i].innerHTML = monthlyCurrent[i];
	}

	for (i=0; i<previousText.length; i++){
		previousText[i].innerHTML = "Last month - " + monthlyPrevious[i];
	}
}




// make buttons toggle active state and trigger functions

let button = document.querySelectorAll(".time-button")


for (i=0; i<button.length; i++) {
	button[i].addEventListener("click", function(){

		//remove current active
		let activebutton = document.querySelector(".time-active")
		activebutton.className = activebutton.className.replace(" time-active", "");

		//add new active
		this.className += " time-active";

		if (this.innerHTML === "Daily") {
			dailyDisplay();
		} else if (this.innerHTML === "Weekly") {
			weeklyDisplay();
		} else if (this.innerHTML === "Monthly") {
			monthlyDisplay();
		}

		console.log(this.innerHTML);

	})
}






// You can also require other files to run in this process
console.log('timer.js loaded')
let userOS = process.platform

const path = require('path')
const remote = require('electron').remote

let batFile = path.dirname(require.main.filename) + '\\bats\\shutdown.bat'
// console.log('curr dir: ' + batFile )
// let batFile = "C:/code/m/electron/electron-quick-start/shutdown.bat"

const spawn = require('child_process').spawn

function getTimeRemaining(endtime) {
	let time = Date.parse(endtime) - Date.parse(new Date())
	let ss = Math.floor((time / 1000) % 60)
	let mm = Math.floor((time / 1000 / 60) % 60)
	let hh = Math.floor((time / (1000 * 60 * 60)) % 24)
	let dd = Math.floor(time / (1000 * 60 * 60 * 24))

	return {
		'total': time,
		'days': dd,
		'hours': hh,
		'minutes': mm,
		'seconds': ss
	}
}

function initializeclock(id, endtime) {
	let clock = document.getElementById(id)
	let daySpan = clock.querySelector('.days')
	let hoursSpan = clock.querySelector('.hours')
	let minutesSpan = clock.querySelector('.minutes')
	let secondsSpan = clock.querySelector('.seconds')

	function updateClock() {
		let time = getTimeRemaining(endtime)

		daySpan.innerHTML = time.days
		hoursSpan.innerHTML = ('0' + time.hours).slice(-2)
		minutesSpan.innerHTML = ('0' + time.minutes).slice(-2)
		secondsSpan.innerHTML = ('0' + time.seconds).slice(-2)

		if(time.total <= 0) {
			clearInterval(timeinterval)
			console.log('clearing')
			spawn('cmd.exe', ['/c', batFile])
			// console.log(batFile)
		}
	}

	updateClock()
	let timeinterval = setInterval(updateClock, 1000)
}

let startCD = function() {
	let userDD = (document.querySelector('.userDD').value * 24 * 60 * 60 * 1000),
		userHH = (document.querySelector('.userHH').value * 3600000),
		userMM = (document.querySelector('.userMM').value * 60000),
		userSS = (document.querySelector('.userSS').value * 1000),
		totalMiliseconds = userDD + userHH + userMM + userSS
		console.log('Miisecs: ', totalMiliseconds )
		deadline = new Date(Date.parse(new Date()) + totalMiliseconds)


	console.log('DD: ', userDD)
	console.log('HH: ', userHH)
	console.log('MM: ', userMM)
	console.log('SS: ', userSS)

	console.log('Deadline: ', deadline)
	initializeclock('clockdiv', deadline)
}

document.getElementById("closeBtn").addEventListener('click', function(e){
	let currWindow = remote.getCurrentWindow()
	currWindow.close()
})

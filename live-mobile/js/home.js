fetch('https://cors-anywhere.herokuapp.com/http://shaddygarg.pythonanywhere.com/events/?format=json', {
	mode: 'cors',
	headers: {
	'Access-Control-Allow-Origin':'*'
	}
})
	.then(res => res.json())
	.then(j => {
		let html = "";
        console.log(j)
		for (let i = 0; i < j.length; i++) {
			let stream = j[i].name
			let user = j[i].username

			let template = `<div class="stream-box box navigable" tabindex="0" data="${stream}">
                <img src="img/thumbnail.png">
                <div class="stream-details">
                    ${stream} | ${user}
                </div>
            </div>`

            html += template
		}

		document.getElementsByClassName('home-main')[0].innerHTML = html;
		naviBoard.setNavigation('home-main')
	})
	.catch(err => {
		console.log('Error while fetching data from django server.')
	})


// Move to the show-stream.
function onBoxClick(data) {
	let url = '/show-stream.html?stream=' + data
	window.location.href = url
}

var classname = document.getElementsByClassName("stream-box");
for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', onBoxClick, false);
}

window.addEventListener('keyup', function(event) {
	if(event.key == 'Enter') {
		onBoxClick(naviBoard.getActiveElement().attributes[0].nodeValue)
	}
}, true)

function openNav() {
    document.getElementById("sideNavigation").style.width = "150px";
    naviBoard.setNavigation('sideNavigation')
}
 
function closeNav() {
    document.getElementById("sideNavigation").style.width = "0";
    naviBoard.setNavigation('home-main')
}

window.addEventListener('keyup', function(event) {
	if(event.key == 'SoftLeft') {
		if (document.getElementById("sideNavigation").style.width == "0px")
			openNav()
		else
			closeNav()
	}
}, true)

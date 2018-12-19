function openNav() {
    document.getElementById("sideNavigation").style.width = "150px";
}
 
function closeNav() {
    document.getElementById("sideNavigation").style.width = "0";
}

window.addEventListener('keyup', function(event) {
	if(event.key == 'SoftLeft') {
		if (document.getElementById("sideNavigation").style.width == "0")
			openNav()
		else
			closeNav()
	}
}, true)

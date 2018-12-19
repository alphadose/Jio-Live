window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  var translate = navigator.mozL10n.get;
  navigator.spatialNavigationEnabled = true;
  naviBoard.setNavigation('index-options')

  window.addEventListener("keydown", function(event) {
		if(event.key === 'Enter') {
			console.log(naviBoard.getActiveElement().attributes)
			switch(naviBoard.getActiveElement().attributes[2].value) {
			case "login": window.location.href = '/home.html';
						break;
			case "signup": window.location.href = '/home.html';
						break;

			default: console.log("Illegal.")
		}
	}
  }, true);
});

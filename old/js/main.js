
var fs = 0;
var graphPoints = [];
var swipePos = 0;

$(document).ready(function() {
    $(window).resize(onResize);
	onResize();
	
	//$('#menubtn').click(changeMenu);
	//$('#locationbtn').click(changeMenu);
	//$('#filterbtn').click(changeMenu);
	//$('#datebtn').click(changeMenu);
	//$('#menuOk').click(changeMenu);
	//$('#menuCancel').click(changeMenu);
	
	
	$('#menubtn').on('click', onMenuBtn);
	$('#filterbtn').on('click', changeMenu);
	$('#datebtn').on('click', changeMenu);
	$('#menuApply').on('click', changeMenu);
	$('#filternmenu button').on('click', onFilterBtn);	
	$('#mainmenu').on('click', onMainMenu);
	
	$('#menubtn').on('touchstart', onMenuBtn);
	$('#filterbtn').on('touchstart', changeMenu);
	$('#datebtn').on('touchstart', changeMenu);
	$('#menuApply').on('touchstart', changeMenu);
	$('#filternmenu button').on('touchstart', onFilterBtn);
	
	
	//$('.teetimes').click(flip);
	$('.teetimes').on('swipeleft', flip);
	$('.teetimes').on('swiperight', flipRight);
	$('#flipcard').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', flipDone);
	
	//$('#locSearchResults').show('focusin', locSearchFocus);
	//$('#firstrow').on('focusout', locSearchFocusOut);
	
	
	$('.ui.search')
	  .search({
		source: content,
		onSearchQuery: searchResultsOpen
		
		//Remove desktop only 
		//onSearchQuery: searchResultsOpen,
		//onResultsClose: searchResultsClose
	  });
	  
	$(function() {
    	//$( "#datepicker" ).datepicker();
		$( "#datepicker" ).datepicker({ 
			minDate: 0, 
			maxDate: "+1M", 
			dateFormat: "DD M d",
		    onSelect: function(dateText) {
			  $('#datebtnlabel').html(dateText);
			  $('#menuCTA').hide();
			  $('#filtermenuwrap').slideUp(200);
			  
			}
		});
  	});
	
	getData();
	
});

onResize = function() {
	var CW = document.body.clientWidth;
	var CH = screen.height;
	
	if (CW > CH) {
		fs = 10 * (CH)/640;
	}else {
		fs = 10 * (CW)/640;
	}
	
	if (fs > 10) {
		fs = 10;
	}
	
	$("html").css("font-size", fs + "px");
	
	//TODO Remove
	//console.log(viewportWidth(), document.body.clientWidth);
	//$('#locSearch').attr('placeholder', fs + ", " + CW + ", " + CH);
	//console.log(fs);
	
};

function viewportWidth() {
       if (window.innerWidth)
       {
               return window.innerWidth;
       }
       else if (document.body.offsetWidth)
       {
               return document.body.clientWidth;
       }
}

function getData() {
	onData();
}

function onData() {
	var p0 = {time: 6, price: 40, source: "gn"};
	var p1 = {time: 6.5, price: 45, source: "tt"};
	var p2 = {time: 7, price: 50, source: "tt"};
	var p3 = {time: 8, price: 25, source: "cd"}
	var p4 = {time: 9, price: 25, source: "gn"};
	var p5 = {time: 10, price: 50, source: "tt"};
	var p6 = {time: 11, price: 25, source: "cd"}
	var p7 = {time: 12, price: 10, source: "cd"}
	var p8 = {time: 13, price: 40, source: "gn"};
	var p9 = {time: 14, price: 50, source: "cd"};
	var p10 = {time: 15, price: 25, source: "cd"}
	var p11 = {time: 15.5, price: 25, source: "tt"};
	var p12 = {time: 16, price: 30, source: "gn"};
	var p13 = {time: 17.3, price: 25, source: "cd"}
	var p14 = {time: 18, price: 10, source: "cd"}
	
	graphPoints = [p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14];
	
	buildGraph(graphPoints, 0);
}

function buildGraph(points, pos) {
	var c = document.getElementById("tc");
	c.width = 300;
	c.height = 100;
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, 300, 100);
	
	var t = 0;
	var p = 0;
	var c = 0;
	var pmax = 0;
	var pts = [];
	
	for (i = 0; i < points.length; i++) { 
    	if (points[i].price > pmax) {
			pmax = points[i].price;
		}
	}
	
	for (i = 0; i < points.length; i++) { 
		if (i > 1) {
			t = 300 * ((points[i-1].time - 6)/12);
			p = 100 - .7 * (100 * (points[i-1].price/pmax));
			ctx.moveTo(t, p);
		}
		t = 300 * ((points[i].time - 6)/12);
		p = 100 - .7 * (100 * (points[i].price/pmax));

		switch(points[i].source) {
			case "gn":
				c = 'rgb(19, 116, 155)';
				break;
			case "tt":
				c = 'rgb(236, 98, 127)';
				break;
			case "cd":
				c = 'rgb(102, 102, 102)';
				break;

			default:
				pt.c = 'rgb(128, 128, 128)';
		}
		
		pts.push({x: t, y: p, c: c});
	}
	drawGraphLines(pts, ctx);
	drawGraphDots(pts, ctx, pos);
}

function drawGraphLines(pts, ctx) {
	ctx.moveTo(pts[0].x, pts[0].y);
	for (i = 0; i < pts.length; i++) { 
		ctx.lineTo(pts[i].x, pts[i].y);
		ctx.strokeStyle = 'rgb(153, 153, 153)';
		ctx.stroke();
	}
}

function drawGraphDots(pts, ctx, pos) {
	for (i = 0; i < pts.length; i++) {
		ctx.beginPath();
		ctx.arc(pts[i].x, pts[i].y, fs, 0, 2 * Math.PI);
		if (i >= pos & i < pos + 4) {
			ctx.fillStyle = pts[i].c; 
		}else {
			ctx.fillStyle = 'rgb(204, 204, 204)';
		}
		ctx.fill();
	}
}

function changeMenu(event) {
	event.preventDefault();
	
	$('#filternmenu').hide();
	$('#datemenu').hide();
	
	if (event.target.id == 'menuApply') {
		$('#menuCTA').hide();
		$('#filtermenuwrap').slideUp(200);
	} else {
		if (event.target.id == 'filterbtn') {
			$('#filternmenu').show();
			$('#menuCTA').show();
		}else if (event.target.id == 'datebtn') {
			$('#datemenu').show();
			$('#menuCTA').show();
		}
		
		$('#filtermenuwrap').slideDown(200);		
	}
}

function onMenuBtn(event) {
	event.preventDefault();
	
	$('#mainmenu').show();

}

function onMainMenu(event) {
	event.preventDefault();

	switch(event.target.id) {
		case "signIn":
			console.log("Call Sign In");
			$('#mainmenu').hide();
			break;
		case "signOut":
			console.log("Call Sign Out");
			$('#mainmenu').hide();
			break;
		case "signUp":
			console.log("Call Sign Up");
			$('#mainmenu').hide();
			break;
		case "settings":
			console.log("Call Settings");
			$('#mainmenu').hide();
			break;
		default:
			$('#mainmenu').hide();
	}
	

}

function onFilterBtn(event) {
	event.preventDefault();
	
	if ($(this).hasClass("selected")){
		$(this).removeClass("selected");
	}else {
		$(this).addClass("selected");
	}

}

// Remove desktop only 
//function searchResultsOpen() {
	
	//$('#locSearchResults').append('<button class="locClearBtn"onclick="onLocClearBtn()"></button>');
	//$('#menubtn').removeClass("menuicon");
	//$('#menubtn').addClass("clearicon");
	
//}

//function searchResultsClose() {
	
	//$('#menubtn').removeClass("clearicon");
	//$('#menubtn').addClass("menuicon");
//}

function searchResultsOpen() {
	
	$('#locSearchResults').append('<button class="locClearBtn"onclick="onLocClearBtn()"></button>');
	
}

function onLocClearBtn(event) {
	
	$('#locSearch').val('');
	$('#locSearch').focus();

}


function flipRight() {
	$('#flipcont').css("visibility", "visible")
	var fPos = $(this).offset().top;
	$('#flipcont').offset({ top: fPos, left: 0 });
	console.log("Flip", fPos);
	$('#flipcard').addClass("flipBack");
	swipePos = swipePos - 4;
	buildGraph(graphPoints, swipePos);
}

function flip() {
	$('#flipcont').css("visibility", "visible")
	var fPos = $(this).offset().top;
	$('#flipcont').offset({ top: fPos, left: 0 });
	console.log("Flip", fPos);
	$('#flipcard').addClass('flipForward');
	swipePos = swipePos + 4;
	buildGraph(graphPoints, swipePos);
}

function flipDone() {
	$('#flipcont').css("visibility", "hidden");
	$('#flipcard').removeClass('flipBack');
	$('#flipcard').removeClass('flipForward');
}

var content = [
	{ title: 'Rio Pinar' },
	{ title: 'Baytree Executive GC' },
	{ title: 'Baytree National' },
	{ title: ' Bella Collina CC' },
	{ title: ' Big Cypress-North' },
	{ title: ' Big Cypress-South' },
	{ title: ' Black Bear GC' },
	{ title: ' CC of Mount Dora' },
	{ title: ' Casselberry GC' },
	{ title: ' Celebration/Non-Resident' },
	{ title: ' Celebration/Residents' },
	{ title: ' Champions Gate CC' },
	{ title: ' Clerbrook Golf' },
	{ title: ' Cocoa Beach-Resident' },
	{ title: ' DeBary CC' },
	{ title: ' Dubsdread' },
	{ title: ' Eagle Creek - Resident' },
	{ title: ' Eagle Creek/Non-Resident' },
	{ title: ' Eagle Dunes' },
	{ title: ' Fairways' },
	{ title: ' Falcons Fire - Non Residents' },
	{ title: ' Falcons Fire - Residents' },
	{ title: ' Four Seasons - Tranquilo' },
	{ title: ' Four Seasons - Tranquilo - Orlando Resident' },
	{ title: ' Grand Cypress - NSE Course' },
	{ title: ' Grand Cypress - New Course' },
	{ title: ' Grande Vista GC' },
	{ title: ' Harbor Hills' },
	{ title: ' Harmony Golf' },
	{ title: ' Hawks Landing' },
	{ title: ' Hawks Landing - Resident' },
	{ title: ' Hidden Lakes' },
	{ title: ' Highlands Reserve - Non Resident' },
	{ title: ' Highlands Reserve - Resident' },
	{ title: ' Hunters Creek - Great Orlando Resident' },
	{ title: ' Hunters Creek - Non Resident' },
	{ title: ' Hunters Creek-FL Resident' },
	{ title: ' Huntington GC' },
	{ title: ' International GC' },
	{ title: ' Kings Ridge - Kings' },
	{ title: ' Kings Ridge - Ridge' },
	{ title: ' Kissimmee - Non FL Resident' },
	{ title: ' Kissimmee Bay CC' },
	{ title: ' Kissimmee Bay CC - Resident' },
	{ title: ' Kissimmee GC - FL Resident' },
	{ title: ' LPGA International - Hills' },
	{ title: ' LPGA International - Hills - Resident' },
	{ title: ' LPGA International - Jones' },
	{ title: ' LPGA International - Jones- Resident' },
	{ title: ' Lakes of Lady Lake' },
	{ title: ' Legends' },
	{ title: ' Marion Oaks CC' },
	{ title: ' Mayfair CC' },
	{ title: ' MetroWest GC' },
	{ title: ' Mission Inn - El Campeon' },
	{ title: ' Mission Inn - Las Colinas' },
	{ title: ' Mount Dora GC' },
	{ title: ' Mystic Dunes GC' },
	{ title: ' New Smyrna GC' },
	{ title: ' Orange Lake - Cranes Bend' },
	{ title: ' Orange Lake Resort-Legends' },
	{ title: ' Orange Lake Resort-Reserve' },
	{ title: ' Orange Lake-Legends Walk' },
	{ title: ' Palisades CC' },
	{ title: ' Red Tail GC' },
	{ title: ' Remington GC - Non Residents' },
	{ title: ' Remington GC - Residents' },
	{ title: ' Ridgewood Lakes' },
	{ title: ' Ridgewood Lakes - Non Resident' },
	{ title: ' Rio Pinar CC' },
	{ title: ' Royal St. Cloud - Blue/Red' },
	{ title: ' Royal St. Cloud - Red/White' },
	{ title: ' Royal St. Cloud - White/Blue' },
	{ title: ' Sanctuary Ridge GC' },
	{ title: ' Sandhill Golf Course' },
	{ title: ' Savannahs' },
	{ title: ' Savannahs - Discount Cardholder' },
	{ title: ' Shady Brook Resort' },
	{ title: ' Shingle Creek GC' },
	{ title: ' Spruce Creek South' },
	{ title: ' Stonegate - Cypress' },
	{ title: ' Stonegate - Oaks' },
	{ title: ' Stoneybrook West' },
	{ title: ' Stoneybrook West - Non Resident' },
	{ title: ' SummerGlen GC' },
	{ title: ' Tiger Point GC' },
	{ title: ' Twin Rivers' },
	{ title: ' Twin Rivers - Foot Golf' },
	{ title: ' Twin Rivers - Student' },
	{ title: ' Venetian Bay' },
	{ title: ' Victoria Hills GC' },
	{ title: ' Walkabout GC' },
	{ title: ' Water Oak CC' },
	{ title: ' Wekiva' },
	{ title: ' Willow Lakes' },
	{ title: ' Willowbrook - Foot Golf' },
	{ title: ' Willowbrook GC' },
	{ title: ' Windermere CC' },
	{ title: ' Zellwood Station' },
];
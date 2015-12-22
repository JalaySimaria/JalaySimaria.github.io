function scroll_to(elem, path) {
	$(".active").removeClass("active");

	if ($("#tab_mobile").is(":visible")) $("#sub_tabs a").eq(elem).addClass("active");
	else $("#tab_full .pull-right li").eq(elem).find("a").addClass("active");

	window.location.hash = path;
}

$(document).ready(function(){
	$('#remove_ad').nextAll().remove();

	$('html, body').animate({scrollTop: 0});
	window.scrollTo(0, 0);

	$("#tab_mobile ul:last").on("click", function(){
		$("#sub_tabs").slideToggle();
	});

	$(".pull-left a").on("click", function(){
		$("html, body").animate({ scrollTop: 0 }, "slow");
	});

	$("#tab_full .pull-right a, #sub_tabs .col-xs-12").on("click", function(){
		$("#sub_tabs").slideUp();

		var tab = $(this).find("span").html(), position = 0;
			
		switch (tab) {
			case "Profile":
				position = ($(this).hasClass("col-xs-12")) ? $(".heading").eq(0).offset().top - 90 : $(".heading").eq(0).offset().top - 120;
				break;
			case "Abilities":
				position = ($(this).hasClass("col-xs-12")) ? $(".heading").eq(1).offset().top - 90 : $(".heading").eq(1).offset().top - 120;
				break;
			case "About":
				position = ($(this).hasClass("col-xs-12")) ? $(".heading").eq(2).offset().top - 90 : $(".heading").eq(2).offset().top - 120;
				break;
			case "Contact":
				position = ($(this).hasClass("col-xs-12")) ? $(".heading").eq(3).offset().top - 90 : $(".heading").eq(3).offset().top - 120;
				break;
			case "Home":
			default:
				position = 0;
		}

		$("html, body").animate({ scrollTop: position }, "slow");
	});
});

$(window).scroll(function(){
	var status = 100 - document.body.scrollTop / (document.body.clientHeight - window.innerHeight) * 100;
	$("#second").css("transform", "translate3d(-" + status + "%, 0px, 0px)");

	$("#sub_tabs").slideUp();

	var scroll = $(window).scrollTop(),
		profile = $(".heading").eq(0).offset().top - 400,
		abilities = $(".heading").eq(1).offset().top - 400,
		about = $(".heading").eq(2).offset().top - 400,
		contact = $(".heading").eq(3).offset().top - 400;

	if (scroll < profile) scroll_to(0, "/home");
	else if (scroll > profile && scroll < abilities) scroll_to(1, "/profile");
	else if (scroll > abilities && scroll < about) scroll_to(2, "/abilities");
	else if (scroll > about && scroll < contact) scroll_to(3, "/about");
	else if (scroll > contact) scroll_to(4, "/contact");
	else console.error("Impossible...!!!");
});

$(window).bind("load", function() {
	$('#remove_ad').nextAll().remove();

	$("body").fadeIn("slow", function(){
		var hash = window.location.href.split("#").pop(),
			selector = ($("#tab_mobile").is(":visible")) ? "#sub_tabs .col-xs-12" : "#tab_full .pull-right a";

		switch (hash) {
			case "/profile":
				$(selector).eq(1).trigger("click");
				break;
			case "/abilities":
				$(selector).eq(2).trigger("click");
				break;
			case "/about":
				$(selector).eq(3).trigger("click");
				break;
			case "/contact":
				$(selector).eq(4).trigger("click");
				break;
			case "/home":
			default:
				$(selector).eq(0).trigger("click");
		}
	});
});

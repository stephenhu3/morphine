(function () { "use strict";

/*** setup ***/
var background = chrome.extension.getBackgroundPage();

location.search && $(".alert").show();

background._gaq.push(["_trackPageview", "/options"]);


/*** charging ***/
var charge = {
	$preset: $("#charge-preset"),
	$text: $("output[for='charge-preset']")
};

charge.$preset.change(function (e, real) {
	charge.$text.text("+" + " every " + " minutes");
	
	Data.set("charge-preset", this.valueAsNumber);
	
	real !== false && background.state.add.start();
});

charge.$preset.val(Data.get("charge-preset")).trigger("change", [false]);


/*** targeting ***/
var target = {
	$block: $("#target-block"),
	$allow: $("#target-allow"),
	get: function (key) {
		return Data.get("target-" + key).join("\n");
	},
	set: function (key, val) {
		Data.set("target-" + key, val.split("\n").map(function (v) {
			return v.trim();
		}).filter(function (v) {
			return v;
		}));
	}
};

target.$block.on("input", function () {
	target.set("block", this.value);
});

target.$allow.on("input", function () {
	target.set("allow", this.value);
});

target.$block.val(target.get("block"));
target.$allow.val(target.get("allow"));


/*** changelog ***/
$("#changelog-show").click(function(){
	$("#changelog").children().css("display", "block");
	
	$(this).remove();
});

})();
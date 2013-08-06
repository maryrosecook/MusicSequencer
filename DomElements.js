;(function(exports) {
  var green = "rgb(0, 128, 0)",
	    red = "rgb(255, 0, 0)",
    	blue = "rgb(0, 0, 255)",
    	highlight = "2px solid white",
      notHighlight = "2px solid black";

  function appendToDomNode (parent, child) {
	  var parentDom = parent.domElement.domNode;
	  var childDom = child.domElement.domNode;
	  parentDom.append(childDom);
  }

  var ButtonDom = function(button) {
	  this.button = button;
	  this.domNode = $("<div class ='button' track = '" + this.button.track.toString() + "' beat = '" + this.button.beat.toString() + "'></div>");
	  var self = this;
	  // Should this click listener be here or in Button.js, or control.js ... hmmmmm
	  this.domNode.click( function () {
		  socket.emit("buttonPress", {track: self.button.track, beat: self.button.beat})
		  self.button.flip();
	  })

    this.getDomNode = function() {
      return this.domNode;
    };
  }
  ButtonDom.width = 50;
  ButtonDom.height = 50;
  ButtonDom.border = 2;
  ButtonDom.widthSpace = ButtonDom.width + 2 * (ButtonDom.border);
  ButtonDom.heightSpace = ButtonDom.height + 2 * (ButtonDom.border);
  ButtonDom.prototype.draw = function() {
	  var color = this.button.on ? red : green;
	  this.domNode.css({"background-color": color});
	  this.domNode.css({"width": "" + ButtonDom.width.toString() + "px"});
	  this.domNode.css({"height": "" + ButtonDom.height.toString() + "px"});
	  this.domNode.css({"float": "left"});
	  this.domNode.css({"border": "" + ButtonDom.border.toString() + "px solid black"});
  }
  ButtonDom.prototype.redraw = function() {
	  var color = this.button.on ? red : green;
	  this.domNode.css({"background-color": color});
  }
  ButtonDom.prototype.highlight = function(state) {
	  var color = state ? highlight : notHighlight;
	  this.domNode.css({"border" : color});
  }

  var SampleDom = function(sample) {
	  this.domNode = $("<div class = 'sample_button' fname = '" + sample.fname.toString() + "'></div>");
	  this.domNode.click(function () {
		  sample.play();
	  });

    this.getDomNode = function() {
      return this.domNode;
    };
  }
  SampleDom.widthSpace = SampleDom.width + 2 * SampleDom.border;
  SampleDom.heightSpace = SampleDom.height + 2 * SampleDom.border;
  SampleDom.prototype.draw = function() {
	  this.domNode.css({"background-color": blue});
	  this.domNode.css({"width": "" + ButtonDom.width.toString() + "px"});
	  this.domNode.css({"height": "" + ButtonDom.height.toString() + "px"});
	  this.domNode.css({"float": "left"});
	  this.domNode.css({"border": "" + ButtonDom.border.toString() + "px solid black"});
  }


  var SampleTrackDom = function(sampleTrack) {
	  this.sampleTrack = sampleTrack;
	  this.domNode = $("<div class ='sample_track' track = '" + this.sampleTrack.track.toString() + "'></div>");

    this.getDomNode = function() {
      return this.domNode;
    };
  }
  SampleTrackDom.prototype.draw = function() {
	  this.domNode.css({"width" : "" + this.width().toString() + "px"});
	  this.domNode.css({"height": "" + this.height().toString() + "px"});
  }
  SampleTrackDom.prototype.width = function () {
	  var numButtons = this.sampleTrack.numBeats;
	  var buttonsWidth = numButtons * ButtonDom.widthSpace;
	  return buttonsWidth + SampleDom.widthSpace;
  }
  SampleTrackDom.prototype.height = function () {
	  return ButtonDom.heightSpace;
  }

  var GridDom = function(grid) {
	  this.grid = grid;
	  this.domNode = $("#grid");

    this.getDomNode = function() {
      return this.domNode;
    };
  }
  GridDom.prototype.draw = function() {
	  this.domNode.css({"width" : "" + this.width().toString() + "px"});
	  this.domNode.css({"height": "" + this.height().toString() + "px"});
  }
  GridDom.prototype.width = function() {
	  return this.grid.tracks[0].domElement.width();
  }
  GridDom.prototype.height = function() {
	  return this.numTracks * this.grid.tracks[0].domElement.height();
  }

  exports.dom = {};
  exports.dom.ButtonDom = ButtonDom;
  exports.dom.SampleTrackDom = SampleTrackDom;
  exports.dom.SampleDom = SampleDom;
  exports.dom.GridDom = GridDom;
  exports.dom.appendToDomNode = appendToDomNode;
}(this));

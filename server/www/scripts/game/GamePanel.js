define([
	"game/components/PitchComponent", 
	"game/components/ActionsComponent", 
	"game/components/InfoComponent", 
	"game/UserAreaController", 
	"game/GameManager"], 
function(PitchComponent, ActionsComponent, InfoComponent, UserAreaController, GameManager) {
	"use strict";

	function GamePanel() {
		this.userAreaController = new UserAreaController();
		this.gameManager = new GameManager(this.userAreaController);

		this.keyPressHandler = function(event) {
			if (event.keyCode === 13) {
				this.gameManager.onTurnEndedByUser();			
			}
		}.bind(this);
	};

	GamePanel.prototype.getElement = function() {
		var infoContainer    = React.createElement("div", {id: "info-container"});
		var pitchContainer   = React.createElement("div", {id: "pitch-container"});
		var actionsContainer = React.createElement("div", {id: "actions-container"});
		var userArea         = React.createElement("div", {id: "user-area"}, [infoContainer, pitchContainer, actionsContainer]);
		//TODO card area component added here
		// var cardArea         = React.createElement("div", {id: "card-area", className: "skeleton red"}, "CARDS");

		return [userArea]; 
	};

	GamePanel.prototype.onShow = function() {
		this.pitchComponent     = new PitchComponent(document.getElementById("pitch-container"), this.userAreaController);
		this.infoComponent      = new InfoComponent(document.getElementById("info-container"), this.userAreaController);
		this.actionshComponent  = new ActionsComponent(document.getElementById("actions-container"), this.userAreaController);
		
		this.gameManager.start();
		document.body.addEventListener("keypress", this.keyPressHandler);
	};

	GamePanel.prototype.onHide = function() {
		document.body.removeEventListener("keypress", this.keyPressHandler);
		this.gameManager.stop();
	};	
	
	GamePanel.prototype.onClose = function() {
	};

	return GamePanel;
});
/*
 * zfs@weapon create constructor
 */
var LuoBoWeaponCreate = {};
/*
 * bottle constructor
 */
LuoBoWeaponCreate.createBottle = function()
{
	var bottle = {};
	
	bottle.disabled = ccui.ImageView.create("Bottle00.png", ccui.Widget.PLIST_TEXTURE);
	bottle.buy =  ccui.ImageView.create("Bottle01.png", ccui.Widget.PLIST_TEXTURE);
	bottle.buy.name = "bottle";
	
	return bottle;
};



/*
 * fire bottle constructor
 */
LuoBoWeaponCreate.createFireBottle = function()
{
	var fireBottle = {};
	fireBottle.name = "fireBottle";
	
	fireBottle.disabled = ccui.ImageView.create("FBottle00.png", ccui.Widget.PLIST_TEXTURE);
	fireBottle.buy = ccui.ImageView.create("FBottle01.png", ccui.Widget.PLIST_TEXTURE);
	
	return fireBottle;
};
/*
 * purple ball constructor
 */
LuoBoWeaponCreate.createBall = function()
{
	var ball = {};
	ball.name = "ball";
	
	ball.disabled = ccui.ImageView.create("Ball00.png", ccui.Widget.PLIST_TEXTURE);
	ball.buy = ccui.ImageView.create("Ball01.png", ccui.Widget.PLIST_TEXTURE);
	
	return ball;
};


























/*
 * zfs@weapon create constructor
 */
var LuoBoWeaponCreate = {};
cc.spriteFrameCache.addSpriteFrames("res/Themes/Towers/TBottle-hd.plist");
cc.spriteFrameCache.addSpriteFrames("res/Themes/Towers/TFireBottle-hd.plist");
cc.spriteFrameCache.addSpriteFrames("res/Themes/Towers/TBall-hd.plist");
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

LuoBoWeaponCreate.createBottleFirst = function()
{
	var first = {};
	first.base = ccui.ImageView.create("Bottle-11.png", ccui.Widget.PLIST_TEXTURE);
	first.firstb = cc.Sprite.createWithSpriteFrameName("Bottle11.png");
	first.animationn = function()
	{
		var animation = [];
		for(var i = 11; i < 14; i++)
		{
			var spriteFrame = cc.spriteFrameCache.getSpriteFrame("Bottle"+i+".png");
			animation.push(spriteFrame);
		}
		var animationn = cc.Animation.create(animation, 0.2);
		var animate = cc.Animate.create(animationn);
		return animate;
	}();
	first.bullet = function()
	{
		var buttle = cc.Sprite.createWithSpriteFrameName("PBottle11.png");
		var animation = [];
		for(var i = 11; i < 14; i++)
		{
			var spriteFrame = cc.spriteFrameCache.getSpriteFrame("PBottle"+i+".png");
			animation.push(spriteFrame);
		}
		var animationn = cc.Animation.create(animation, 0.2);
		var animate = cc.Animate.create(animationn);
		buttle.runAction(animate.repeatForever());
		return buttle;
	}();
	return first;
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


























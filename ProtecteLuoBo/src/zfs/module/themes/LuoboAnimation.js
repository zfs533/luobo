/**
 * air animaton effect
 * @param point
 * @param that
 */
function getAirAnimateion(point, that)
{
	var animation = [];
	var airAnimation = cc.Sprite.createWithSpriteFrameName("air11.png");
	that.addChild(airAnimation, 25);
	airAnimation.setPosition(point);
	for(var i = 11; i < 16; i++)
	{
		var spriteFrame = cc.spriteFrameCache.getSpriteFrame("air"+i+".png");
		animation.push(spriteFrame);
	}
	var animationn = cc.Animation.create(animation, 0.1);
	var animate = cc.Animate.create(animationn);
	var callFunc = cc.callFunc(function()
	{
		airAnimation.removeFromParent();
	}, that);
	var sequence = cc.sequence(animate, callFunc);
	airAnimation.runAction(sequence);
};

/**
 * touch the current local that forbide install the weapon
 * @param point
 * @param that
 */
function getForbideAnimation(point, that)
{
	var forbideAnimation = cc.Sprite.createWithSpriteFrameName("forbidden.png");
	forbideAnimation = cc.Sprite.createWithSpriteFrameName("forbidden.png");
	forbideAnimation.setPosition(point);
	that.addChild(forbideAnimation, 1000);
	var fadeOut = cc.FadeOut.create(0.4);
	var callFunc = cc.callFunc(function()
	{
		forbideAnimation.removeFromParent();
	}, that);
	var sequence = cc.sequence(fadeOut, callFunc);
	forbideAnimation.runAction(sequence);
};

/**
 * select target play the point animate, show current touch target is selected
 * @param point
 * @param target
 * @param that
 */
function getPointAnimate(point, target, that)
{
	if(that.pointAnimate)
	{
		that.pointAnimate.setPosition(cc.p(point.x,point.y+target.height/2));
		return;
	}
	var animation = [];
	that.pointAnimate = cc.Sprite.createWithSpriteFrameName("point01.png");
	that.addChild(that.pointAnimate, 40);
	that.pointAnimate.setPosition(cc.p(point.x,point.y+target.height/2));
	for(var i = 1; i< 4; i++)
	{
		var spriteFrame = cc.spriteFrameCache.getSpriteFrame("point0"+i+".png");
		animation.push(spriteFrame);
	}
	var animationn = cc.Animation.create(animation, 0.2);
	var animate = cc.Animate.create(animationn);
	var delayTime = cc.DelayTime.create(0.5);
	var sequnce = cc.sequence(animate, delayTime);
	that.pointAnimate.runAction(sequnce.repeatForever());
};

/**
 * hide the point animation
 * @param that
 */
function hidePointAnimation(that)
{
	if(that.pointAnimate)
	{
		that.pointTemp = null;
		that.pointAnimate.setPosition(cc.p(5000, 5000));
	}
};

/**
 * when touch empty point on stage, play add shape animate
 * @param point
 * @param that
 */
function getAddWeaponAnimate(point, that)
{
	if(that.addRect)
	{
		that.addRect.setPosition(point);
		return;
	}
	var animation = [];
	that.addRect = cc.Sprite.createWithSpriteFrameName("select_00.png");
	that.addChild(that.addRect, 20);
	that.addRect.setPosition(point);
	for(var i= 0; i < 5; i++)
	{
		var spriteFrame = cc.spriteFrameCache.getSpriteFrame("select_0"+i+".png");
		animation.push(spriteFrame);
	}
	var animationn = cc.Animation.create(animation, 0.1);
	var animate = cc.Animate.create(animationn);
	that.addRect.runAction(animate.repeatForever());
};

/**
 * hide add weapon animation
 * @param that
 */
function hideAddWeaponAnimate(that)
{
	getAddWeaponAnimate(cc.p(5000, 5000), that);
};

/**
 * handle the wenpon shooting range to show
 * @param that
 * @param type
 * @returns
 */
function handleShootingRange(that, type)
{
	var range;
	if ( type === 1 )
	{
		range = cc.Sprite.createWithSpriteFrameName("range_80.png");
	}
	else if ( type === 2 )
	{
		range = cc.Sprite.createWithSpriteFrameName("range_100.png");
	}
	else if ( type === 3 )
	{
		range = cc.Sprite.createWithSpriteFrameName("range_120.png");
	}
	range.scale = 0;
	var scaleTo = cc.scaleTo(0.2, 1, 1);
	range.runAction(scaleTo);
	return range;
};

/**
 * remove range
 * @param that
 * @param range
 */
function hangleRemoveRange(that, range)
{
	if ( range )
	{
		var scaleTo = cc.scaleTo(0.2, 0, 0);
		var callFunc = cc.callFunc(function()
		{
			range.removeFromParent();
		}, that);
		var sequnce = cc.sequence(scaleTo, callFunc);
		range.runAction(sequnce);
	}
};














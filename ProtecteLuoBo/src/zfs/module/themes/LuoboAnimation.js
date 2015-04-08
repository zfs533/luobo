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
 * @param id
 * @returns
 */
function handleShootingRange(that, type, id)
{
	var range;
	for ( var i = 0; i < RangeData.length; i++ )
	{
		if ( type === RangeData[i].type )
		{
			range = cc.Sprite.createWithSpriteFrameName(RangeData[i].range);
			range.scale = 0;
			var scaleTo = cc.scaleTo(0.2, 1, 1);
			range.runAction(scaleTo);
			if ( type === 3 )
			{
				var up = ccui.ImageView.create(RangeData[i].upTexture, ccui.Widget.PLIST_TEXTURE);
				up.addTouchEventListener(function(target,state)
				{
					cancelUpgradeWeapon(target, state, id, that);
				}, that);
			}
			else if ( PlayerData.gold < RangeData[i].up )
			{
				var up = ccui.ImageView.create(RangeData[i].upTexture1, ccui.Widget.PLIST_TEXTURE);
				up.addTouchEventListener(function(target,state)
				{
					cancelUpgradeWeapon(target, state, id, that);
				}, that);
			}
			else
			{
				var up = ccui.ImageView.create(RangeData[i].upTexture, ccui.Widget.PLIST_TEXTURE);
				up.addTouchEventListener(function(target, state)
				{
					upgradeWeapon(target, state ,id, that, RangeData[i].up);
				}, that);
			}
			var sell = ccui.ImageView.create(RangeData[i].sellTexture, ccui.Widget.PLIST_TEXTURE);
			up.x = sell.x = range.width/2;
			up.y = up.height/2 + (up.height +range.height)/2;
			sell.y = range.height/2 - sell.height;
			range.addChild(up, 0);
			range.addChild(sell, 0);
			sell.addTouchEventListener(function(target, state)
			{
				sellWeapon(target, state, id, that, RangeData[i].sell);
			}, that);
			return range;
		}
	}
};

/**
 * 升级武器
 * @param target
 * @param state
 */
function upgradeWeapon(target, state, id, that, gold)
{
	if ( state === ccui.Widget.TOUCH_ENDED )
	{
		PlayerData.weaponType++;
		if ( PlayerData.weaponType > 3 )
		{
			PlayerData.weaponType = 3;
		}
		sellWeapon(target, state, id, that);
		that.handleLuoboWeaponBottle(target.getParent().getPosition());
		PlayerData.gold -= gold;
		that.showGoldNumber();
	}
};

/**
 * 取消升级武器
 * @param target
 * @param state
 */
function cancelUpgradeWeapon(target, state, id, that)
{
	if ( state === ccui.Widget.TOUCH_ENDED )
	{
		that.handleRangeArray();
	}
};

/**
 * 贩卖武器
 * @param target
 * @param state
 */
function sellWeapon(target, state, id, that, gold)
{
	if ( state === ccui.Widget.TOUCH_ENDED )
	{
		for ( var i = 0;i < that.weaponArr.length; i++ )
		{
			if ( that.weaponArr[i].id === id )
			{
				getAirAnimateion(that.weaponArr[i].base.getPosition(), that);
				that.handleRangeArray();
				that.weaponArr[i].base.removeFromParent();
				that.weaponArr[i].firstb.removeFromParent();
				that.weaponArr.splice(i, 1);
				if ( gold )
				{
					PlayerData.gold += gold;
					that.showGoldNumber();
				}
				break;
			}
		}
	}
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

/**
 * 升级提升动画
 */
function showUpgradeAnimation()
{
	var showUA = cc.Sprite.createWithSpriteFrameName("showupgrade01.png");
	showUA.setPosition(p.x, p.y);
	showUA.speed = 3;
	var animation = [];
	for(var i = 1; i < 3; i++)
	{
		var spriteFrame = cc.spriteFrameCache.getSpriteFrame("showupgrade0"+i+".png");
		animation.push(spriteFrame);
	}
	var animationn = cc.Animation.create(animation, 0.2);
	var animate = cc.Animate.create(animationn);
	showUA.runAction(animate.repeatForever());
};












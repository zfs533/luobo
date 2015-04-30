/**
 * zfs@2015/04/05 bottle weapon
 */
var LuoboBottleWeapon = cc.Sprite.extend(
{
	ctor:function(type, point, that)
	{
		this._super();
		this.type = type;
		this.point = point;
		this.that = that;
		this.variable();
		this.setInformation();
		this.handleWeaponAttack();
		this.jugementUpgrade();
	},
	variable:function()
	{
		this.attack = 0;//attack value
		this.id = weaponIndex++;
		this.value = 100;
		this.upGradeValue = 0;
		this.upAnimate = null;// the upgrade hink
		this.isMax = false;//the hightest level
		this.isShooting = false;
	},
	setInformation:function()
	{
		var type = this.type;
		switch (type) 
		{
		case 1:
			this.firstb = cc.Sprite.createWithSpriteFrameName("Bottle11.png");
			break;

		case 2:
			this.firstb = cc.Sprite.createWithSpriteFrameName("Bottle22.png");
			break;

		case 3:
			this.firstb = cc.Sprite.createWithSpriteFrameName("Bottle33.png");
			break;

		default:
			break;
		}
		this.base = ccui.ImageView.create("Bottle-11.png", ccui.Widget.PLIST_TEXTURE);
		this.base.id = this.id;
		this.base.setPosition(this.point);
		this.firstb.setPosition(this.point);
		this.base.addTouchEventListener(this.bottleWeaponfunc, this);
	},
	//upgrade weapon by type
	updateWeaponType:function()
	{
		this.type++;
		if ( this.type > 3 )
		{
			this.type = 3;
		}
		this.handleWeaponAttack();
	},
	//the weapon attack value
	handleWeaponAttack:function()
	{
		switch (this.type) 
		{
		case 1:
			this.upGradeValue = getBottleData(this.type).up;
			this.attack = 15;
			break;
			
		case 2:
			this.upGradeValue = getBottleData(this.type).up;
			this.attack = 45;
			break;
			
		case 3:
			this.upGradeValue = getBottleData(this.type).up;
			this.attack = 60;
			break;
			
		default:
			break;
		}
	},
	bottleWeaponfunc:function(target, state)
	{
		this.that.bottleWeaponfunc(target, state, this.type);
	},
	/**
	 * 
	 * @param weaponType：int 1,2,3
	 * @param angle:number
	 * @param that
	 * @returns {LuoboBottleBullet}
	 */
	createBullet:function(weaponType, angle, that)
	{
		var bullet = new LuoboBottleBullet(this.firstb.getPosition(), weaponType, angle, that, this.attack);
		return bullet;
	},
	/**
	 * 
	 * @param type:int 1,2,3
	 * @param angle:number
	 */
	getBottleAnimation:function(type, angle)
	{
		type = type?type:this.type;
		this.firstb.stopAllActions();
		this.firstb.setRotation(angle);
		var animation = [];
		switch (type) 
		{
		case 1:
			for(var i = 11; i < 14; i++)
			{
				var spriteFrame = cc.spriteFrameCache.getSpriteFrame("Bottle"+i+".png");
				animation.push(spriteFrame);
			}
			var animationn = cc.Animation.create(animation, 0.2);
			var animate = cc.Animate.create(animationn);
			break;

		case 2:
			for(var i = 21; i < 24; i++)
			{
				var spriteFrame = cc.spriteFrameCache.getSpriteFrame("Bottle"+i+".png");
				animation.push(spriteFrame);
			}
			var animationn = cc.Animation.create(animation, 0.2);
			var animate = cc.Animate.create(animationn);
			break;

		case 3:
			for(var i = 31; i < 34; i++)
			{
				var spriteFrame = cc.spriteFrameCache.getSpriteFrame("Bottle"+i+".png");
				animation.push(spriteFrame);
			}
			var animationn = cc.Animation.create(animation, 0.2);
			var animate = cc.Animate.create(animationn);
			break;

		default:
			break;
		}
		this.firstb.runAction(animate);
	},
	/**
	 * jugement the wenpon is or not upgrade
	 */
	jugementUpgrade:function()
	{
		if ( this.isMax ){return;}
		if ( this.upAnimate )
		{
			this.upAnimate.removeFromParent();
			this.upAnimate = null;
			if ( this.type >= 3 )
			{
				this.isMax = true;
				return;
			}
		}
		if ( PlayerData.gold >= this.upGradeValue )
		{
			this.upAnimate = showUpgradeAnimation();
			this.base.addChild(this.upAnimate, 10);
			this.upAnimate.setPosition(this.base.width/2, this.base.height+20);
		}
	}
});


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
		for ( var i = 0, len = that.weaponArr.length; i < len; i++ ) 
		{
			if ( id === that.weaponArr[i].id )
			{
				that.weaponArr[i].updateWeaponType();
				that.weaponArr[i].getBottleAnimation(null, that.weaponArr[i].type);
				break;
			}
		}
		that.handleRangeArray(true);
		PlayerData.gold -= gold;
		that.showGoldNumber();
		if ( that.guidance )
		{
			that.guidance.refreshHandPosition();
		}
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






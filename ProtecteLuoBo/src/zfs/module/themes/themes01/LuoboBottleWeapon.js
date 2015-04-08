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
		this.id = weaponIndex++;
		this.value = 100;
		this.setInformation();
		
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
		this.base.addTouchEventListener(this.bottleWeaponfunc, this.that);
	},
	bottleWeaponfunc:function(target, state)
	{
		this.bottleWeaponfunc(target, state);
	},
	getBottleAnimation:function(type, angle)
	{
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
	}
});








/**
 * zfs@2015/04/05 bullet
 */
var LuoboBottleBullet = cc.Sprite.extend(
{
	/**
	 * 
	 * @param p:cc.p();
	 * @param type:number
	 * @param angle:number
	 * @param that:object
	 * @param attack:number
	 */
	ctor:function(p, type, angle, that, attack)
	{
		this._super();
		this.that = that;
		this.buttle = cc.Sprite.createWithSpriteFrameName("PBottle11.png");
		this.buttle.setPosition(p.x, p.y);
		this.buttle.speed = 3;
		this.buttle.setRotation(angle);
		this.attack = attack;//伤害
		this.buttle.attack = attack;
		var animation = [];
		switch (type) 
		{
		case 1:
			for(var i = 11; i < 14; i++)
			{
				var spriteFrame = cc.spriteFrameCache.getSpriteFrame("PBottle"+i+".png");
				animation.push(spriteFrame);
			}
			var animationn = cc.Animation.create(animation, 0.2);
			var animate = cc.Animate.create(animationn);
			this.buttle.runAction(animate.repeatForever());
			break;

		case 2:
			for(var i = 21; i < 24; i++)
			{
				var spriteFrame = cc.spriteFrameCache.getSpriteFrame("PBottle"+i+".png");
				animation.push(spriteFrame);
			}
			var animationn = cc.Animation.create(animation, 0.2);
			var animate = cc.Animate.create(animationn);
			this.buttle.runAction(animate.repeatForever());
			break;

		case 3:
			for(var i = 31; i < 34; i++)
			{
				var spriteFrame = cc.spriteFrameCache.getSpriteFrame("PBottle"+i+".png");
				animation.push(spriteFrame);
			}
			var animationn = cc.Animation.create(animation, 0.2);
			var animate = cc.Animate.create(animationn);
			this.buttle.runAction(animate.repeatForever());
			break;

		default:
			break;
		}
	}
});











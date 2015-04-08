/**
 * zfs@2015/04/05 bullet
 */
var LuoboBottleBullet = cc.Sprite.extend(
{
	ctor:function(p, type, angle, that)
	{
		this._super();
		this.that = that;
		this.buttle = cc.Sprite.createWithSpriteFrameName("PBottle11.png");
		this.buttle.setPosition(p.x, p.y);
		this.buttle.speed = 3;
		this.buttle.setRotation(angle);
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
//		this.scheduleUpdate();
	},
	//remove bullet
	update:function()
	{
		if( this.buttle.x < 0 || this.buttle.y < 0 || this.buttle.x > Default.windowWidth() || this.buttle.y > Default.windowHeight() )
		{
			this.buttle.removeFromParent();
			this.that.bulletArr.splice(i, 1);
			this.unscheduleUpdate();
			return;
		}
		for(var j = 0,len = this.that.monsterArr.length; j < len; j++)
		{
			if( !this.that.monsterArr[j].monster ){return;}
			var rect2 = this.that.monsterArr[j].monster.getBoundingBox(),
			pp	  = this.buttle.getParent().convertToWorldSpace(this.buttle);
			if( cc.rectContainsPoint(rect2, pp) )
			{
				this.buttle.removeFromParent();
				this.that.bulletArr.splice(i, 1);
				this.that.monsterArr[j].blood.visible = true;
				this.that.monsterArr[j].blood.setPercent(this.that.monsterArr[j].blood.getPercent()-15);
				if( this.that.monsterArr[j].blood.getPercent() <= 0 )
				{
					getAirAnimateion(this.that.monsterArr[j].monster.getPosition(), this);
					this.that.monsterArr[j].monster.removeFromParent();
					this.that.monsterArr.splice(j, 1);
					this.unscheduleUpdate();
				}
				break;
			}
			else
			{
				this.that.monsterArr[j].blood.visible = false;
			}
		}
	},
});











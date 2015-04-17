/**
 * zfs@protected object		2015/04/17
 */
var LuoboProtected = cc.Sprite.extend(
{
	ctor:function(that)
	{
		this._super();
		this.that = that;
		this.zinit();
		this.setInformation();
	},
	zinit:function()
	{
		this.live = 10;
		this.isDead = false;
		this.luobo = cc.Sprite.createWithSpriteFrameName("hlb21.png");
		this.hp = ccui.ImageView.create("BossHP10.png", ccui.Widget.PLIST_TEXTURE);
	},
	setInformation:function()
	{
		this.hp.setPosition(this.luobo.x+this.luobo.width-10, this.luobo.height/2);
		this.luobo.addChild(this.hp);
	},
	playShakeAnimate:function()
	{
		if ( this.live < 10){return;}
		var animation1 = [];
		for(var i = 10; i < 19; i++)
		{
			var spriteFrame = cc.spriteFrameCache.getSpriteFrame("hlb"+i+".png");
			animation1.push(spriteFrame);
		}
		var animation = cc.Animation.create(animation1,0.1);
		var animate = cc.Animate.create(animation);
		var callFunc = cc.callFunc(function()
		{
			this.playBlinkEyeAnimate();
		}, this);
		var sequnce = cc.sequence(animate, callFunc);
		this.luobo.runAction(sequnce);
	},
	playBlinkEyeAnimate:function()
	{
		if ( this.live < 10){return;}
		var animation3 = [];
		var spriteFrame1 = cc.spriteFrameCache.getSpriteFrame("hlb23.png");
		var spriteFrame2 = cc.spriteFrameCache.getSpriteFrame("hlb22.png");
		var spriteFrame3 = cc.spriteFrameCache.getSpriteFrame("hlb21.png");
		animation3.push(spriteFrame1);
		animation3.push(spriteFrame2);
		animation3.push(spriteFrame3);
		var animation = cc.Animation.create(animation3,0.1);
		var animate = cc.Animate.create(animation);
		var delayTime = cc.DelayTime.create(2);
		var sequnce = cc.sequence(animate, delayTime);
		this.luobo.runAction(sequnce);
	},
	playInjuredAnimate:function()
	{
		this.live--;
		var live = this.live;
		if(this.live <= 0)//game is over
		{
			this.live = 0;
			this.isDead = true;
			this.that.overGame();
			return;
		}
		this.hp.loadTexture("BossHP0"+this.live+".png", ccui.Widget.PLIST_TEXTURE);
		if(this.live === 7 || this.live === 5)
		{
			return;
		}
		var animation = [];
		var spriteFrame = cc.spriteFrameCache.getSpriteFrame("hlb"+live+".png");
		animation.push(spriteFrame);
		var animation = cc.Animation.create(animation,0.1);
		var animate = cc.Animate.create(animation);
		this.luobo.runAction(animate);
	}
});












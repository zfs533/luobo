/**
 * zfs@new player guidance(新手引导)	2015/04/22
 */
var LuoboGuidance = cc.Layer.extend(
{
	/**
	 * 
	 * @param point: cc.p();
	 * @param that:this.getParent();
	 */
	ctor:function(that)
	{
		this._super();
		this.that = that;
		this.pointArr= [
		                cc.p(280, 280),
		                cc.p(200, 360),
		                cc.p(280, 280),
		                cc.p(280, 360),
		                cc.p(280, 280),
		                ];
		this.count = 0;
		this.zinit();
		this.setInformation();
	},
	//初始化
	zinit:function()
	{
		this.setContentSize(cc.size(Default.windowWidth(), Default.windowHeight()));
		cc.spriteFrameCache.addSpriteFrames("res/Themes/Items/Items03-hd.plist");
		
		this.bg = cc.Sprite.createWithSpriteFrameName("howtoplay_0.png");
		this.bg.x = this.getContentSize().width-this.bg.width/2;
		this.bg.y = this.getContentSize().height + this.bg.height/2;
		this.addChild(this.bg, 0);
		
		var bgcn = cc.Sprite.createWithSpriteFrameName("howtoplay_0_CN.png");
		bgcn.x = this.bg.width/2;
		bgcn.y = this.bg.height/2;
		this.bg.addChild(bgcn);
		
		var bgJump = cc.Sprite.createWithSpriteFrameName("howtoplay_5.png");
		bgJump.setAnchorPoint(0.5, 1);
		bgJump.scaleY = 0.01;
		bgJump.x = this.bg.width-bgJump.width;
		bgJump.y = 15;
		this.bg.addChild(bgJump);
		var jump = BaseButton.createe("howtoplay_5_CN.png", "howtoplay_5_CN.png", "", ccui.Widget.PLIST_TEXTURE);
		jump.x = bgJump.width/2;
		jump.y = bgJump.height/2+5;
		bgJump.addChild(jump);
		jump.addTouchEventListener(this.jumpOutGuidence, this);
		
		var moveTo = cc.moveTo(0.35, cc.p(this.bg.x, this.getContentSize().height - this.bg.height/2))
		this.bg.runAction(moveTo);
		var delayTime = cc.delayTime(0.35);
		var scaleTo = cc.scaleTo(0.1, 1, 1);
		var sequnce = cc.sequence(delayTime, scaleTo);
		bgJump.runAction(sequnce);   
	},
	//jump out guidence
	jumpOutGuidence:function(target, state)
	{
		if ( state === ccui.Widget.TOUCH_ENDED )
		{
			cc.log("jumpOUt");
		}
	},
	//设置信息
	setInformation:function()
	{
		var step01 = cc.Sprite.createWithSpriteFrameName("howtoplay_3.png");
		step01.x = this.bg.width/2;
		step01.y = this.bg.height/3;
		this.bg.addChild(step01, 100);
		
		var say01 = cc.Sprite.createWithSpriteFrameName("howtoplay_3_CN.png");
		say01.x = this.bg.width/2;
		say01.y = this.bg.height/3; 
		this.bg.addChild(say01, 101);

		var target = cc.Sprite.createWithSpriteFrameName("howtoplay_1.png"); 
		target.setPosition(this.pointArr[this.count]);
		this.addChild(target);
		var fadeTo = cc.FadeTo.create(0.5, 100);
		var fadeBy = cc.FadeTo.create(0.5, 155);
		var sequnce = cc.sequence(fadeTo, fadeBy);
		target.runAction(sequnce.repeatForever());
		this.hand = target;
		this.addListenerr(target, this);
		
		var hand = cc.Sprite.createWithSpriteFrameName("howtoplay_2.png");
		hand.x = target.width+30; 
		hand.y = 0;
		target.addChild(hand);
		var moveTo = cc.moveTo(0.5, cc.p(hand.x-20, hand.y+20));
		var moveTo_re = cc.moveTo(0.5, cc.p(hand.x, hand.y));
		var sequnce1 = cc.sequence(moveTo, moveTo_re);
		hand.runAction(sequnce1.repeatForever());
		
	},
	refreshHandPosition:function(point)
	{
		this.hand.setPosition(point);
	},
	addListenerr:function(sp, that)
	{
		var listener = cc.EventListener.create(
		{
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan:function(touch, event)
			{
				var target = event.getCurrentTarget();
				var p = target.convertToNodeSpace(touch.getLocation());
				var rect = cc.rect(0, 0, target.width, target.height);
				if ( cc.rectContainsPoint(rect, p) )
				{
					that.count++;
					that.refreshHandPosition(that.pointArr[that.count]);
					return true;
				}
				return false;
			}
		});
		cc.eventManager.addListener(listener, sp);
	},
	//进入结点
	onEnter:function()
	{
		this._super();
		cc.spriteFrameCache.removeSpriteFramesFromFile("res/Themes/Items/Items03-hd.plist");
	},
	//离开完成
	onExit:function()
	{
		this._super();
	},
	//进入结点完成
	onEnterTransitionDidFinish:function()
	{
		this._super();
	},
	//预备离开
	onExitTransitionDidStart:function()
	{
		this._super();
	}
});
/**
 * zfs@new player guidance(新手引导)	2015/04/22
 */
var LuoboGuidance = ccui.Layout.extend(
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
		this.stepObjArr = [];
		this.isJumpOut = false;
		this.step01Func();
	},
	//初始化
	zinit:function()
	{
		this.setSize(cc.size(Default.windowWidth(), Default.windowHeight()));
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
		
		var moveTo = cc.moveTo(1, cc.p(this.bg.x, this.getContentSize().height - this.bg.height/2))
		var ease_M = cc.EaseElasticOut.create(moveTo, 1);
		this.bg.runAction(ease_M);
		
		var delayTime = cc.delayTime(0.8);
		var scaleTo = cc.scaleTo(0.1, 1, 1);
		var sequnce = cc.sequence(delayTime, scaleTo);
		bgJump.runAction(sequnce);   
	},
	//jump out guidence
	jumpOutGuidence:function(target, state)
	{
		if ( state === ccui.Widget.TOUCH_ENDED )
		{
			this.that.guidence = null;
			this.hand.removeFromParent();
			this.step05Func();
			this.isJumpOut = true;
		}
	},
	//game step 
	step01Func:function()
	{
		var step01 = cc.Sprite.createWithSpriteFrameName("howtoplay_3.png");
		step01.x = this.bg.width/2;
		step01.y = this.bg.height/3;
		this.bg.addChild(step01, 100);
		
		var say01 = cc.Sprite.createWithSpriteFrameName("howtoplay_3_CN.png");
		say01.x = step01.x;
		say01.y = this.bg.height/3; 
		this.bg.addChild(say01, 101);
		this.stepObjArr.push(step01);
		this.stepObjArr.push(say01);

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
	step02Func:function()
	{
		var say01 = cc.Sprite.createWithSpriteFrameName("howtoplay_6_CN.png");//哇哦
		say01.x = this.bg.width/2;
		say01.y = this.bg.height/2 - 20;
		this.bg.addChild(say01);
		say01.scale = 3;
		var scale = cc.scaleTo(0.5, 1, 1);
		var easeE = cc.EaseElasticOut.create(scale, 0.5);
		say01.runAction(easeE);

		var say02 = cc.Sprite.createWithSpriteFrameName("howtoplay_7_CN.png");//现在你得到了
		say02.x = say01.x;
		var yy = say01.y - say02.height;
		this.bg.addChild(say02);
		say02.setOpacity(0);
		var fadeIn = cc.fadeIn(0.2);
		var moveTo = cc.moveTo(0.2, cc.p(say01.x, say01.y - say02.height));
		var delay = cc.delayTime(0.1);
		var sqwan = cc.spawn(fadeIn, moveTo);
		var sequnce = cc.sequence(delay, sqwan);
		say02.runAction(sequnce);
		
		var say03 = cc.Sprite.createWithSpriteFrameName("howtoplay_8_CN.png");//一个瓶子炮塔
		say03.x = say02.x;
//		say03.y = say02.y - say03.height/1.5;
		this.bg.addChild(say03);
		say03.setOpacity(0);
		var fadeIn = cc.fadeIn(0.2);
		var moveTo = cc.moveTo(0.2, cc.p(say02.x, yy - say03.height/1.5));
		var delay = cc.delayTime(0.1);
		var sqwan = cc.spawn(fadeIn, moveTo);
		var sequnce1 = cc.sequence(delay, sqwan);
		say03.runAction(sequnce1);
		
		this.stepObjArr.push(say01);
		this.stepObjArr.push(say02);
		this.stepObjArr.push(say03);
		
		this.scheduleOnce(function()
		{
			this.removeStepObj();
			this.step03Func();
		}, 2)
	},
	step03Func:function()
	{
		var step01 = cc.Sprite.createWithSpriteFrameName("howtoplay_4.png");//升级
		step01.x = this.bg.width/2;
		step01.y = this.bg.height/3;
		this.bg.addChild(step01, 100);
		
		var say01 = cc.Sprite.createWithSpriteFrameName("howtoplay_4_CN.png");//升级
		say01.x = step01.x;
		say01.y = this.bg.height/3; 
		this.bg.addChild(say01, 101);
		this.stepObjArr.push(step01);
		this.stepObjArr.push(say01);
	},
	step04Func:function()
	{
		var say01 = cc.Sprite.createWithSpriteFrameName("howtoplay_9_CN.png");//升级成功
		say01.x = this.bg.width/2;
		say01.y = this.bg.height/2 - 20;
		this.bg.addChild(say01);
		say01.scale = 3;
		var scale = cc.scaleTo(0.5, 1, 1);
		var easeE = cc.EaseElasticOut.create(scale, 0.5);
		say01.runAction(easeE);

		var say02 = cc.Sprite.createWithSpriteFrameName("howtoplay_10_CN.png");//你已经掌握了
		say02.x = say01.x;
		var yy = say01.y - say02.height;
		this.bg.addChild(say02);
		
		var fadeIn = cc.fadeIn(0.2);
		var moveTo = cc.moveTo(0.2, cc.p(say01.x, say01.y - say02.height));
		var delay = cc.delayTime(0.1);
		var sqwan = cc.spawn(fadeIn, moveTo);
		var sequnce = cc.sequence(delay, sqwan);
		say02.runAction(sequnce);

		var say03 = cc.Sprite.createWithSpriteFrameName("howtoplay_11_CN.png");//基本操作，开始冒险吧
		say03.x = say02.x;
		say03.y = say02.y - say03.height/1.5;
		this.bg.addChild(say03);
		var fadeIn = cc.fadeIn(0.2);
		var moveTo = cc.moveTo(0.2, cc.p(say02.x, yy - say03.height/1.5));
		var delay = cc.delayTime(0.1);
		var sqwan = cc.spawn(fadeIn, moveTo);
		var sequnce1 = cc.sequence(delay, sqwan);
		say03.runAction(sequnce1);

		this.stepObjArr.push(say01);
		this.stepObjArr.push(say02);
		this.stepObjArr.push(say03);
		this.hand.removeFromParent();
		this.scheduleOnce(this.step05Func, 2);
	},
	step05Func:function()
	{
		var moveTo = cc.moveTo(0.3, cc.p(this.bg.x, this.getContentSize().height + this.bg.height/2));
		var callBack = cc.callFunc(function()
		{
			this.that.countDown();
			this.removeFromParent();
		}, this);
		var sequnce = cc.sequence(moveTo, callBack);
		this.bg.runAction(sequnce);
	},
	refreshHandPosition:function()
	{
		if ( this.isJumpOut )
		{
			return;
		}
		this.count++;
		this.hand.setPosition(this.pointArr[this.count]);
		if ( this.count === 1 )
		{
			this.that.getWeaponLayout(this.pointArr[this.count-1]);
		}
		if ( this.count === 2 )
		{
			this.removeStepObj();
			this.step02Func();
		}
		if ( this.count === 4 )
		{
			this.removeStepObj();
			this.step04Func();
			this.that.guidance = null;
		}
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
					that.refreshHandPosition();
					return true;
				}
				return false;
			}
		});
		cc.eventManager.addListener(listener, sp);
	},
	removeStepObj:function()
	{
		for ( var i = 0; i < this.stepObjArr.length; i++ )
		{
			this.stepObjArr[i].removeFromParent();
		}
		this.stepObjArr.splice(0);
	},
	//进入结点
	onEnter:function()
	{
		this._super();
	},
	//离开完成
	onExit:function()
	{
		this._super();
		cc.spriteFrameCache.removeSpriteFramesFromFile("res/Themes/Items/Items03-hd.plist");
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
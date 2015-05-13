/**
 * zfs@get new weapon then play effect 		2015/05/07
 */
var LuoboGetNewWeapon = ccui.Layout.extend(
{
	ctor:function(data, that)
	{
		this.data = data;
		this.that = that;
		this._super();
		this.zinit();
		this.setInformation();
		this.playEnterAction();
	},
	zinit:function()
	{
		cc.spriteFrameCache.addSpriteFrames("res/Themes/scene/darkbg-hd.plist");
		cc.spriteFrameCache.addSpriteFrames("res/Themes/Items/Items04-hd.plist");
		cc.spriteFrameCache.addSpriteFrames("res/Themes/Items/Items05-hd.plist");
		this.setSize(cc.size(Default.windowWidth(),Default.windowHeight()));
		var bg = cc.Sprite.createWithSpriteFrameName("darkbg.png");
		bg.ignoreAnchorPointForPosition(true);
		this.addChild(bg);
	},
	setInformation:function()
	{
		var rbg = cc.Sprite.createWithSpriteFrameName("NT-5.png");
		rbg.setPosition(Default.windowWidth()/2, Default.windowHeight()/2);
		this.addChild(rbg, 1);
		this.rbg = rbg;
		
//		var ntArr = ["NT3_CN.png","NT4_CN.png","NT5_CN.png"];
		var rbg_n = cc.Sprite.createWithSpriteFrameName(this.data);
		rbg_n.setPosition(rbg.width/2, rbg.height/2);
		rbg.addChild(rbg_n, 10);
		
		var rbg_n = cc.Sprite.createWithSpriteFrameName("NT-5_CN.png");
		rbg_n.setPosition(rbg.width/2, rbg.height/2);
		rbg.addChild(rbg_n, 10);
		
		var okBtn = BaseButton.createe("NT-1.png", "NT-2.png", "", ccui.Widget.PLIST_TEXTURE);
		okBtn.setPosition(rbg.width/2, okBtn.height);
		rbg.addChild(okBtn, 10);
		
		var ok_n = cc.Sprite.createWithSpriteFrameName("NT-1_CN.png");
		ok_n.setPosition(rbg.width/2, okBtn.height);
		rbg.addChild(ok_n, 10);
		
		okBtn.addTouchEventListener(this.okBtnFunc, this);
		
		var link = cc.Sprite.createWithSpriteFrameName("NT-3.png");
		link.setPosition(rbg.width/2, rbg.height/2);
		rbg.addChild(link, -1);
		
		var link1 = cc.Sprite.createWithSpriteFrameName("NT-3.png");
		link1.setPosition(link.width/2, link.height/2);
		link1.scaleX = -1;
		link.addChild(link1, 1);
		this.link = link;
		this.link1 = link1;
		
		var bg = cc.Sprite.createWithSpriteFrameName("NT-4.png");
		bg.setAnchorPoint(1, 0);
		bg.setPosition(rbg.width, 0 );
		rbg.addChild(bg, -2);
		this.bg1 = bg;
		
		var bg = cc.Sprite.createWithSpriteFrameName("NT-4.png");
		bg.setAnchorPoint(1, 0);
		bg.setPosition(rbg.width, 40 );
		rbg.addChild(bg, -3);
		this.bg2 = bg;

		var bg = cc.Sprite.createWithSpriteFrameName("NT-4.png");
		bg.setAnchorPoint(1, 0);
		bg.setPosition(rbg.width+20, -10 );
		rbg.addChild(bg, -2);
		this.bg3 = bg;
		
	},
	playEnterAction:function()
	{
		var scale = 1.5;
		this.rbg.scale = 0;
		var scaleTo1 = cc.scaleTo(0.3, scale, scale);
		var rotate = cc.rotateTo(0.3, 720, 720);
		var spw = cc.spawn(scaleTo1, rotate);
		
		var scaleTo = cc.scaleTo(0.3, 1, 1);
		var callF = cc.callFunc(this.playAction, this);
		var ease = cc.EaseElasticInOut.create(scaleTo, 1);
		var seqence = cc.sequence(spw, scaleTo, callF);

		this.rbg.runAction(seqence);
	},
	
	playAction:function()
	{
		this.setLinkAction(this.link, false);
		this.setLinkAction(this.link1, true);
		
		var rotate = cc.rotateTo(0.5, -4);
		this.bg1.runAction(rotate);
		
		var rotate = cc.rotateTo(0.5, -8);
		this.bg2.runAction(rotate);
		
		var rotate = cc.rotateTo(0.5, 2);
		this.bg3.runAction(rotate);
	},
	
	setLinkAction:function(target, type)
	{
		var t = 0.5;
		target.setColor(cc.color.YELLOW);
		var fadeTo = cc.FadeTo.create(t, 50);
		var fadeTo1 = cc.FadeTo.create(t, 255);
		if ( type )
		{
			var scaleTo = cc.scaleTo(t, -1.01,1.01);
			var scaleTo1 = cc.scaleBy(t, 1, 1);
		}
		else
		{
			var scaleTo = cc.scaleTo(t, 1.01,1.01);
			var scaleTo1 = cc.scaleBy(t, 1, 1);
		}
		var a1 = cc.spawn(fadeTo, scaleTo);
		var a2 = cc.spawn(fadeTo1, scaleTo1);
		var sequence = cc.sequence(a1, a2);
		target.runAction(sequence.repeatForever());
	},
	okBtnFunc:function(target, state)
	{
		if ( state === ccui.Widget.TOUCH_ENDED )
		{
			this.that.startGame();
			this.removeFromParent();
		}
	},
	onExit:function()
	{
		this._super();
//		cc.spriteFrameCache.removeSpriteFramesFromFile("res/Themes/scene/darkbg-hd.plist");
//		cc.spriteFrameCache.removeSpriteFramesFromFile("res/Themes/Items/Items04-hd.plist");
//		cc.spriteFrameCache.removeSpriteFramesFromFile("res/Themes/Items/Items05-hd.plist");
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






















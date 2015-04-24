/**
 * zfs@bottom weixing buttom 	2015/04/16pm
 */
var LuoboBottomWeibo = ccui.Layout.extend(
{
	ctor:function()
	{
		this._super();
		this.zinit();
		this.addUI();
		this.setInformation();
	},
	//初始化
	zinit:function()
	{
		this.setSize(cc.size(Default.windowWidth(),104));
		cc.spriteFrameCache.addSpriteFrames("res/Themes/scene/weibo-hd.plist");
	},
	//加载控件
	addUI:function()
	{
		var bg = cc.Sprite.createWithSpriteFrameName("share_bg.png");
		bg.setPosition(this.getSize().width/2, this.getSize().height/2);
		this.addChild(bg);
		
		var bg_cn = cc.Sprite.createWithSpriteFrameName("share_bg_CN.png");
		bg_cn.setPosition(this.getSize().width/2, this.getSize().height/2);
		this.addChild(bg_cn);
		
		//tweibo
		var weibo = BaseButton.createe("share_tweibo_normal.png", "share_tweibo_press.png", "share_wechat_disable.png", ccui.Widget.PLIST_TEXTURE);
		weibo.setPosition(bg.x + weibo.width-20, 25);
		this.addChild(weibo, 1);
		//weixing
		var wechat = BaseButton.createe("share_wechat_normal.png", "share_wechat_press.png", "", ccui.Widget.PLIST_TEXTURE);
		wechat.setPosition(bg.x - wechat.width+20, weibo.y);
		this.addChild(wechat, 1);
		
		//weibo
		var weiboo = BaseButton.createe("share_weibo_normal.png", "share_weibo_press.png", "", ccui.Widget.PLIST_TEXTURE);
		weiboo.setPosition(bg.x, weibo.y);
		this.addChild(weiboo, 1);
		
		weibo.addTouchEventListener(this.tweiboEvent, this);
		wechat.addTouchEventListener(this.wechatEvent, this);
		weiboo.addTouchEventListener(this.weibooEvent, this);
		
	},
	tweiboEvent:function(target, state)
	{
		if ( state === ccui.Widget.TOUCH_ENDED )
		{
			cc.log("tweiboEvent");
		}
	},
	wechatEvent:function(target, state)
	{
		if ( state === ccui.Widget.TOUCH_ENDED )
		{
			cc.log("wechatEvent");
		}
	},
	weibooEvent:function(target, state)
	{
		if ( state === ccui.Widget.TOUCH_ENDED )
		{
			cc.log("weibooEvent");
		}
	},
	//设置信息
	setInformation:function()
	{
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
		cc.spriteFrameCache.removeSpriteFramesFromFile("res/Themes/scene/weibo-hd.plist");
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
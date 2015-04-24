/**
 * zfs@ the countdown userInformance(倒计时界面) 	2015/04/21
 */
var LuoboCountDown = ccui.Layout.extend(
{
	ctor:function(that)
	{
		this._super();
		this.that = that;
		this.zinit();
		this.addUI();
		this.setInformation();
	},
	//初始化
	zinit:function()
	{
		this.setSize(cc.size(Default.windowWidth(),Default.windowHeight()));
	},
	//加载控件
	addUI:function()
	{
		this.circle = ccui.ImageView.create("countdown_11.png", ccui.Widget.PLIST_TEXTURE);
		this.circle.setPosition(Default.windowWidth()/2, Default.windowHeight()/2);
		this.addChild(this.circle);
		
		this.fireRoad = ccui.ImageView.create("countdown_12.png", ccui.Widget.PLIST_TEXTURE);
		this.fireRoad.setPosition(Default.windowWidth()/2, Default.windowHeight()/2);
		this.addChild(this.fireRoad);
		this.fireRoad.setPosition(Default.windowWidth()/2, Default.windowHeight()/2);
		this.addChild(this.fireRoad);
		var rotate = cc.rotateBy(1, -360, -360);
		this.fireRoad.runAction(rotate.repeatForever());
		
		this.countNumb = ccui.ImageView.create("countdown_01.png", ccui.Widget.PLIST_TEXTURE);
		this.countNumb.setPosition(Default.windowWidth()/2, Default.windowHeight()/2);
		this.addChild(this.countNumb);
		this.countNumb.scale = 0.01;
		var scaleTo = cc.scaleTo(0.1, 1.2, 1.2);
		this.countNumb.runAction(scaleTo);
		
		
		this.count = 1;
		this.schedule(this.countDownFunc, 1);
	},
	//the countdown
	countDownFunc:function()
	{
		this.count++;
		if ( this.count >3 )
		{
			this.unschedule(this.countDownFunc);
			this.fireRoad.setOpacity(0);
			this.countNumb.loadTexture("countdown_13.png", ccui.Widget.PLIST_TEXTURE);
			var scaleTo = cc.scaleTo(0.1, 0.01, 0.01);
			var rotate  = cc.rotateTo(0.1, 180, 90);
			var span = cc.spawn(scaleTo, rotate);
			var callFunc = cc.callFunc(function()
			{
				this.that.menuBtn.setTouchEnabled(true);
				this.that.pauseBtn.setTouchEnabled(true);
				this.that.speedBtn.setTouchEnabled(true);
				this.that.registerScheduel();
				this.removeFromParent();
			}, this);
			var sequnce = cc.sequence(span, callFunc);
			this.countNumb.runAction(sequnce);
			this.circle.runAction(span.clone());
			return;
		}
		this.countNumb.loadTexture("countdown_0"+ this.count +".png", ccui.Widget.PLIST_TEXTURE);
		this.countNumb.scale = 0.01;
		var scaleTo = cc.scaleTo(0.1, 1.2, 1.2);
		this.countNumb.runAction(scaleTo);
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
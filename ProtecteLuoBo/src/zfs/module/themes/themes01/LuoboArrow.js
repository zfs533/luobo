/**
 * zfs@ the arrow animation		2015/04/21
 */
var LuoboArrow = cc.Layer.extend(
{
	/**
	 * 
	 * @param that
	 * @param callBack
	 * @param data
	 * {"name":"Obj9","x":0,"width":240,"height":80,"y":480}
	 * the object for tmxObjectGroups that in order to setting arrow position
	 */
	ctor:function(data, that)
	{
		this._super();
		this.data = data;
		this.that = that;
		this.zinit();
		this.addUI();
		this.controlLanguage();
		this.setInformation();
	},
	//初始化
	zinit:function()
	{
		this.setContentSize(cc.size(Default.windowWidth(),Default.windowHeight()));
		this.count = 0;
		this.arrowArr = [];
		for ( var i = 0; i < 3; i++ )
		{
			var arrow = ccui.ImageView.create("arrow.png", ccui.Widget.PLIST_TEXTURE);
			arrow.setRotation(90);
			arrow.x = this.data.x + this.data.width/2;
			arrow.y = this.data.y - this.data.height/2*i - 50;
			arrow.setOpacity(0);
			this.addChild(arrow);
			this.arrowArr.push(arrow);
		}
	},
	//加载控件
	addUI:function()
	{
		var fadeIn01 = cc.fadeIn(0.3);
		var callFunc = cc.callFunc(function()
		{
			var fadeIn01 = cc.fadeIn(0.3);
			var callFunc = cc.callFunc(function()
			{
				var fadeIn01 = cc.fadeIn(0.3);
				var callFunc = cc.callFunc(function()
				{
					for ( var i = 0; i < this.arrowArr.length; i++ )
					{
						this.arrowArr[i].setOpacity(0);
					}
					this.count++;
					if ( this.count > 4 )
					{
						this.removee();
						return;
					}
					this.addUI();
				}, this);
				var sequnce = cc.sequence(fadeIn01, callFunc);
				this.arrowArr[2].runAction(sequnce);
			}, this);
			var sequnce = cc.sequence(fadeIn01, callFunc);
			this.arrowArr[1].runAction(sequnce);
		}, this);
		var sequnce = cc.sequence(fadeIn01, callFunc);
		this.arrowArr[0].runAction(sequnce);
	},
	removee:function()
	{
		this.that.registerScheduel();
		this.removeFromParent();
	},
	//标签字符串显示控制
	controlLanguage:function()
	{
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
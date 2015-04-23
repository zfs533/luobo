/**
 * zfs@ weapon panel 	2015/04/23
 */
var LuoboWeaponPanel = ccui.Layout.extend(
{
	ctor:function(that)
	{
		this._super();
		this.that = that;
		this.zinit();
	},
	//初始化
	zinit:function()
	{
		this.setSize(cc.size(260, 80));
		
		this.bottle = LuoBoWeaponCreate.createBottle();
		this.bottle.disabled.setPosition(this.bottle.disabled.width/2, this.bottle.disabled.height/2);
		this.bottle.buy.setPosition(this.bottle.buy.width/2, this.bottle.buy.height/2);
		this.bottle.disabled.visible = false;

		this.addChild(this.bottle.disabled, 0);
		this.addChild(this.bottle.buy, 0);

		this.fireBottle = LuoBoWeaponCreate.createFireBottle();
		this.fireBottle.disabled.setPosition(this.bottle.buy.x+this.fireBottle.disabled.width, this.fireBottle.disabled.height/2);
		this.fireBottle.buy.setPosition(this.fireBottle.disabled.x, this.fireBottle.disabled.y);
		this.fireBottle.disabled.visible = false;

		this.addChild(this.fireBottle.buy, 0);
		this.addChild(this.fireBottle.disabled, 0);

		this.ball = LuoBoWeaponCreate.createBall();
		this.ball.disabled.setPosition(this.fireBottle.disabled.x+this.ball.disabled.width, this.ball.disabled.height/2);
		this.ball.buy.setPosition(this.ball.disabled.x, this.ball.disabled.y);
		this.ball.disabled.visible = false;
		this.addChild(this.ball.disabled, 0);
		this.addChild(this.ball.buy, 0);

		for(var i = 0; i < this.getChildren().length; i++)
		{
			this.getChildren()[i].scale = 0;
			this.getChildren()[i].addTouchEventListener(this.that.weaponLayoutEventFunc, this.that);
		}

		var scaleTo = cc.scaleTo(0.2, 1, 1);
		for(var i = 0; i < this.getChildren().length; i++)
		{
			this.getChildren()[i].runAction(scaleTo.clone());
		}
	},
	refreshPosition:function(point)
	{
		for(var i = 0; i < this.getChildren().length; i++)
		{
			this.getChildren()[i].scale = 0;
		}

		this.setPosition(point);
		var scaleTo = cc.scaleTo(0.2, 1, 1);
		for(var i = 0; i < this.getChildren().length; i++)
		{
			this.getChildren()[i].runAction(scaleTo.clone());
		}
	},
	hidePanel:function()
	{
		var scaleTo = cc.scaleTo(0.2, 0, 0);
		for(var i = 0; i < this.getChildren().length; i++)
		{
			this.getChildren()[i].runAction(scaleTo.clone());
		}
		this.scheduleOnce(function()
		{
			this.setPosition(5000, 5000);
		}, 0.3);
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
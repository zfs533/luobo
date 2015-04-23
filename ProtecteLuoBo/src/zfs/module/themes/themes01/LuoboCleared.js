/**
 * zfs@ all tools cleared 	2015/04/23
 */
var LuoboCleared = cc.Layer.extend(
{
	ctor:function()
	{
		this._super();
		this.setContentSize(cc.size(Default.windowWidth(),88));
		var bg = cc.Sprite.createWithSpriteFrameName("targetscleard_CN.png");
		bg.setAnchorPoint(0.5, 0);
		bg.setOpacity(0);
		bg.x = Default.windowWidth()/2;
		this.addChild(bg);
		
		var moveTo = cc.moveTo(0.3, cc.p(bg.x, bg.height));
		var fadeIn = cc.fadeIn(0.3);
		var spaw = cc.spawn(moveTo, fadeIn);
		var delay = cc.delayTime(1);
		var moveTo_ = cc.moveTo(0.3, cc.p(bg.x, bg.height*2));
		var fadeOut = cc.fadeOut(0.3);
		var spaw1 = cc.spawn(moveTo_, fadeOut);
		var callB = cc.callFunc(function()
		{
			this.removeFromParent();
		}, this);
		var sequnce = cc.sequence(spaw, delay, spaw1, callB);
		bg.runAction(sequnce);
	}
});
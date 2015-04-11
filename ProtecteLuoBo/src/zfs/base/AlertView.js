/*
 * zfs@警告框
 */
var AlertView = cc.Layer.extend(
{
	ctor:function(data)//data为需要显示的字符串提升信息
	{
		this._super();
		this.data = data;
		this.zinit();
		this.showInfo();
	},
	showInfo:function()
	{
		var time = 0.3;
		var len = (this.data.length+1)*30;
		var bg = cc.Sprite.create("res/herolist.png");
		bg.setPosition(Default.windowSize().width/2, 100);
		bg.setScale(len/bg.width, 70/bg.height);
		this.addChild(bg, 1);
		
		var text = cc.LabelTTF.create(this.data, "", 25);
		text.setColor(cc.color.YELLOW);
		text.x = Default.windowSize().width/2;
		text.y = bg.y;
		this.addChild(text, 1);

		bg.opacity = text.opacity = 0;
		var moveTo = cc.moveTo(time,cc.p(Default.windowSize().width/2, Default.windowSize().height/2));
		var delayTime = cc.DelayTime.create(1.2);
		var moveTo1 = cc.moveTo(time, cc.p(Default.windowSize().width/2, Default.windowSize().height/2 + 200));


		var fadeIn = cc.FadeIn.create(time);
		var fadeOut = cc.FadeOut.create(time);

		var spa1 = cc.Spawn.create(moveTo, fadeIn);
		var spa2 = cc.Spawn.create(moveTo1, fadeOut);

		var callFunc = cc.callFunc(function(){this.removeFromParent();}, this);
		var sequence = cc.sequence(spa1, delayTime, spa2, callFunc);
		bg.runAction(sequence);
		text.runAction(sequence.clone());
	},
	zinit:function()
	{
		this.setContentSize(Default.windowSize());
	}
});
/*
 * @param data:String;
 * @param parentt:添加警告框的this指针
 */
AlertView.show = function(data, parentt)
{
	var theLayer = new AlertView(data);
	var node = parentt || cc.director.getRunningScene();
	node.addChild(theLayer, 9999);
};

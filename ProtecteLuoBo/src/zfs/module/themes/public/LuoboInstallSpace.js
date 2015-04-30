/**
 * zfs@显示可以安放炮台的方格提示 		2015/04/30
 */
var LuoboInstallSpace = cc.Layer.extend(
{
	/**
	 * 
	 * @param data:Array
	 */
	ctor:function(data)
	{
		this._super();
		this.tmxObjArr = data;
		this.shwoCanInstallSpace();
		this.zinit();
	},
	zinit:function()
	{
		this.setContentSize(Default.windowSize());
	},
	//show the space that cound install weapon
	shwoCanInstallSpace:function()
	{
		var tempArr = [];
		for ( var i = 0; i < this.tmxObjArr.length; i++ )
		{
			var temp = this.tmxObjArr[i];
			var ww = temp.width;
			var yy = temp.height;
			var tt = 80;

			var mm = Math.floor(ww/tt);
			for ( var j = 0; j < mm; j++ )
			{
				var space = cc.Sprite.createWithSpriteFrameName("select_00.png");
				space.x = temp.x + tt/2 + tt*j;
				space.y = temp.y + tt/2;
				this.addChild(space, 1);
				tempArr.push(space);
			}

			var nn = Math.floor(yy/tt);
			for ( var j = 0; j < nn; j++ )
			{
				var space = cc.Sprite.createWithSpriteFrameName("select_00.png");
				space.x = temp.x + tt/2
				space.y = temp.y + tt/2 + tt*j;
				this.addChild(space, 1);
				tempArr.push(space);
			}
		}
		for ( var i = 0; i < tempArr.length; i++ )
		{
			var fadeIn = cc.FadeTo.create(0.2, 250);
			var fadeOut = cc.FadeTo.create(0.2, 180);
			var sequence = cc.sequence(fadeIn, fadeOut);
			tempArr[i].runAction(sequence.repeatForever());
		}
		this.scheduleOnce(function()
		{
			for ( var i = 0; i < tempArr.length; i++ )
			{
				tempArr[i].removeFromParent();
			}
			this.removeFromParent();
		}, 3);
	}
});
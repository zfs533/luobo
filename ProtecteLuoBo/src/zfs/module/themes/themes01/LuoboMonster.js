/**
 * zfs@怪物 		2015/04/11
 */
var LuoboMonster = cc.Sprite.extend(
{
	ctor:function(that,type)
	{
		this._super();
		this.that = that
		this.type = type;
		this.zinit();
		this.handleMonster();
	},
	zinit:function()
	{
		this.monster = null;
		this.bloodBar = null;
		this.gold = 0;
		this.textureArr = MasterData;
	},
	//create monster according to the type
	handleMonster:function()
	{
		if ( this.type > this.textureArr.length - 1 )
		{
			this.type = this.textureArr.length - 1;
		}
		var monster = this.getMonster(this.textureArr[this.type].texture1, this.textureArr[this.type].texture2);
		this.gold = this.textureArr[this.type].value;
		this.monster = monster.monster;
		this.blood = monster.blood;
	},
	//getted monster
	getMonster:function(texture01, texture02)
	{
		var animation3 = [];
		var spriteFrame1 = cc.spriteFrameCache.getSpriteFrame(texture01);
		var spriteFrame2 = cc.spriteFrameCache.getSpriteFrame(texture02);
		animation3.push(spriteFrame1);
		animation3.push(spriteFrame2);
		var animation = cc.Animation.create(animation3,0.3);
		var animate = cc.Animate.create(animation);

		var monster = cc.Sprite.createWithSpriteFrameName(texture01);
		monster.setPosition(this.that.roadArr[0].x,this.that.roadArr[0].y);
		monster.runAction(cc.RepeatForever.create(animate));
		this.that.addChild(monster, 20);

		var bloodBar = ccui.Slider.create();
		bloodBar.loadProgressBarTexture("MonsterHP01.png", ccui.Widget.PLIST_TEXTURE);
		bloodBar.loadBarTexture("MonsterHP02.png", ccui.Widget.PLIST_TEXTURE);
		bloodBar.setPercent(100);
		bloodBar.setPosition(monster.width/2+5, monster.height+10);
		bloodBar.visible = false;
		monster.addChild(bloodBar, 10);

		var monsterOb = {monster:monster, blood:bloodBar};
		return monsterOb;
	},
	//开始移动
	startMove:function(n, flay)
	{ 
		flay = this.monster;
		var n = n||0;
		var dur = 3;
		if(n ===3 || n === 5)
		{
			dur = 1;
		}
		var moveTo = cc.moveTo(dur, this.that.roadArr[n]);
		var callFunc = cc.callFunc(function()
		{
			if(n > this.that.roadArr.length-2)
			{
				return;
			}
			n++;
			this.startMove(n,flay);
		}, this);
		var sequnce = cc.sequence(moveTo, callFunc);
		flay.runAction(sequnce);
	},  
	//show the blood progress
	showBlood:function(sub)
	{
		this.blood.visible = true;
		this.blood.setPercent(this.blood.getPercent() - sub);
	},
	//hide the blood progress
	hideBlood:function()
	{
		this.blood.visible = false;
	}
});












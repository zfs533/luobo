/**
 * zfs@怪物 		2015/04/11
 */
var LuoboMonster = cc.Sprite.extend(
{
	ctor:function(that)
	{
		this._super();
		this.that = that
		this.zinit();
		this.handleMonster();
	},
	updatePosition:function()
	{
		cc.log("88888888")
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
		var type = Math.floor(Math.random()*this.textureArr.length);
		if ( this.textureArr[type].type > 1)
		{
			this.handleMonster();
			return;
		}
		var monster = this.getMonster(this.textureArr[type].texture1, this.textureArr[type].texture2);
		this.gold = this.textureArr[type].value;
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
	},
	//play monster enter state animation
	playEnterAnimation:function()
	{
		var animation = [];
		var spriteFrame1 = cc.spriteFrameCache.getSpriteFrame("mcm01.png");
		var spriteFrame2 = cc.spriteFrameCache.getSpriteFrame("mcm02.png");
		animation.push(spriteFrame1);
		animation.push(spriteFrame2);
		var animation = cc.Animation.create(animation, 0.1);
		var animate = cc.Animate.create(animation);

		var startSprite = cc.Sprite.createWithSpriteFrameName("mcm01.png");
		startSprite.setPosition(this.that.roadArr[0].x,this.that.roadArr[0].y);
		this.that.addChild(startSprite, 10);
		var callFunc = cc.callFunc(function()
		{
			startSprite.removeFromParent();
		}, this);
		var sequence = cc.sequence(animate, callFunc);
		startSprite.runAction(sequence.repeatForever());
	}
});












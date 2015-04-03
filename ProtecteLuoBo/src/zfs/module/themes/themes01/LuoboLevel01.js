/*
 * @zfs theme01 level1 2015/1/8
 */
var LuoboLevel01 = ccui.Layout.extend(
{
	ctor:function()
	{
		this._super();
		this.zinit();
		this.handleTMXtileMap();
		this.setToolLayer();
		this.setSpriteLayer();
		this.findLuoboRoad();
//		this.playStartEffect();//the monster start move effect
		this.scheduleUpdate();
		this.moveMonster();
		this.addTouchEventListener(this.touchLayerFunc, this);
		this.bulletArr = [];
		this.weaponArr = [];
		this.rangeArr  = [];
		this.tempWeapon = null;
		this.handleShooting();//handle shooting
//		var img = ccui.ImageView.create("upgrade_-180.png", ccui.Widget.PLIST_TEXTURE);
//		img.x = img.y  = 300;
//		this.addChild(img, 100);
	},
	//tmxtiled map
	handleTMXtileMap:function()
	{
		this.tmxTiled = cc.TMXTiledMap.create("res/Themes/Theme1/BG1/BGPath.tmx");
		this.addChild(this.tmxTiled, 100);
		this.tmxObjectGroups = this.tmxTiled.getObjectGroups()[0];//cc.TMXObjectGroup
		this.tmxOGArr = this.tmxObjectGroups.getObjects();//array
		for( var mm in this.tmxObjectGroups.getObject("Obj1"))
		{
//			cc.log(mm);
		}
		cc.log(this.tmxOGArr[10].width+" 4565456 "+this.tmxObjectGroups.getObject("Obj1").height);
	},
	//find luobo road
	findLuoboRoad:function()
	{
		var gap = 40;
		var roadArr = [];
		for(var i= 1; i < 9; i++)
		{
			var point = cc.p(this.tmxObjectGroups.getObject("PT"+i).x +gap,this.tmxObjectGroups.getObject("PT"+i).y -gap);
			roadArr.push(point);
		}
		this.roadArr = roadArr;
	},
	//the monster start move effect
	playStartEffect:function()
	{
		var animation = [];
		var spriteFrame1 = cc.spriteFrameCache.getSpriteFrame("mcm01.png");
		var spriteFrame2 = cc.spriteFrameCache.getSpriteFrame("mcm02.png");
		animation.push(spriteFrame1);
		animation.push(spriteFrame2);
		var animation = cc.Animation.create(animation, 0.5);
		var animate = cc.Animate.create(animation);

		var startSprite = cc.Sprite.createWithSpriteFrameName("mcm01.png");
		startSprite.setPosition(this.roadArr[0].x,this.roadArr[0].y);
		this.addChild(startSprite, 10);
		
		var callFunc = cc.callFunc(function()
		{
			startSprite.removeFromParent();
		}, this);
		var sequence = cc.sequence(animate, callFunc);
		startSprite.runAction(sequence);
	},
	// instance monster
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
		monster.setPosition(this.roadArr[0].x,this.roadArr[0].y);
		monster.runAction(cc.RepeatForever.create(animate));
		this.addChild(monster, 20);
		
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
	//monster move to stage road
	moveMonster:function()
	{
		this.dispatchMonster = false;
		this.monsterArr = [];
		var monster = this.getMonster("fly_yellow01.png", "fly_yellow02.png");
		this.startMove(1,monster.monster);
		this.monsterArr.push(monster);
		this.schedule(function()
		{
			var monster = this.getMonster("fly_yellow01.png", "fly_yellow02.png");
			this.startMove(1,monster.monster);
			this.monsterArr.push(monster);
		}, 1, 5);
	},
	startMove:function(n, flay)
	{ 
		var n = n||0;
		var dur = 3;
		if(n ===3 || n === 5)
		{
			dur = 1;
		}
		var moveTo = cc.moveTo(dur, this.roadArr[n]);
		var callFunc = cc.callFunc(function()
		{
			if(n > this.roadArr.length-2)
			{
				return;
			}
			n++;
			this.startMove(n,flay);
		}, this);
		var sequnce = cc.sequence(moveTo, callFunc);
		flay.runAction(sequnce);
	},  
	//sprite layer
	setSpriteLayer:function()
	{
		var spriteLayer = cc.Layer.create();
		spriteLayer.setContentSize(Default.windowSize());
		this.addChild(spriteLayer, 20);
		
		//door
		var obj1 = this.tmxObjectGroups.getObject("Obj9");
		var cloud01 = ccui.ImageView.create("start01.png", ccui.Widget.PLIST_TEXTURE);
		cloud01.setPosition(obj1.x+obj1.width/2, obj1.y);
		spriteLayer.addChild(cloud01, 0);
		
		var obj1 = this.tmxObjectGroups.getObject("Obj13");
//		this.luobo = cc.Sprite.createWithSpriteFrameName("hlb21.png");
		this.luobo = cc.Sprite.createWithSpriteFrameName("hlb"+2+".png");
		this.luobo.runAction(cc.RepeatForever.create(this.getLuoboAnimation(3)));
		this.luobo.setPosition(obj1.x+50, obj1.y);
		spriteLayer.addChild(this.luobo, 0);
	},
	/**
	 * set luobo animation
	 * @param:type:Number animation type
	 * @param:index:Number
	 */
	getLuoboAnimation:function(type, index)
	{
		//animation 01  shake
		{
			var animation1 = [];
			for(var i = 10; i < 19; i++)
			{
				var spriteFrame = cc.spriteFrameCache.getSpriteFrame("hlb"+i+".png");
				animation1.push(spriteFrame);
			}
			var animation = cc.Animation.create(animation1,0.1);
			var animate = cc.Animate.create(animation);
			var callFunc = cc.callFunc(function()
			{
				this.luobo.runAction(cc.RepeatForever.create(this.getLuoboAnimation(3)));
			}, this);
			var sequnce = cc.sequence(animate, callFunc);
		}
		if(type === 1)
		{
			return sequnce;
		}
		//animation 03 normal
		{
			var animation3 = [];
			var spriteFrame1 = cc.spriteFrameCache.getSpriteFrame("hlb23.png");
			var spriteFrame2 = cc.spriteFrameCache.getSpriteFrame("hlb22.png");
			var spriteFrame3 = cc.spriteFrameCache.getSpriteFrame("hlb21.png");
			animation3.push(spriteFrame1);
			animation3.push(spriteFrame2);
			animation3.push(spriteFrame3);
			var animation = cc.Animation.create(animation3,0.1);
			var animate = cc.Animate.create(animation);
			var delayTime = cc.DelayTime.create(2);
			var sequnce = cc.sequence(animate, delayTime);
		}
		if(type === 3)
		{
			return sequnce;
		}
	},
	//the luobo is injured state by monster
	getInjuredAnimate:function(state)
	{
		function getAnimate(currentState)
		{
			var animation = [];
			var spriteFrame = cc.spriteFrameCache.getSpriteFrame("hlb"+currentState+".png");
			animation.push(spriteFrame);
			var animation = cc.Animation.create(animation,0.1);
			var animate = cc.Animate.create(animation);
			return animate;
		};
		switch (state) 
		{
			case 9:
				return getAnimate(state);
				break;
	
			case 8:
				return getAnimate(state);
				break;
				
			case 6:
				return getAnimate(state);
				break;
				
			case 4:
				return getAnimate(state);
				break;
				
			case 3:
				return getAnimate(state);
				break;
				
			case 2:
				return getAnimate(state);
				break;
				
			case 1:
				return getAnimate(state);
				break;
				
			case 0://game is over
				break;

			default:
				break;
		}
	},
	//check every frame
	update:function()
	{
		this.checkCollision();
		this.refreshPointAnimationPos();
		this.checkBulletCollision();
		if( this.monsterArr.length < 1 && !this.dispatchMonster )
		{
			this.dispatchMonster = true;
			this.scheduleOnce(function()
			{
				this.moveMonster();
			}, 3);
		}
	},
	//check collision
	checkCollision:function()
	{
		var rect1 = this.luobo.getBoundingBox();
		rect1.y += 50;
		for(var i = 0; i < this.monsterArr.length; i++)
		{
			var rect2 = this.monsterArr[i].monster.getBoundingBox();
			if(rect1.x < rect2.x && rect1.x+rect1.width > rect2.x)
			{
				if(rect1.y >= rect2.y && rect1.y < rect2.y + rect2.height)
				{
					if(this.pointTemp == this.monsterArr[i].monster)
					{
						getPointAnimate(cc.p(5000, 5000), this.monsterArr[i].monster, this);
						this.pointTemp = null;
					}
					this.monsterArr[i].monster.removeFromParent();
					this.monsterArr.splice(i, 1);
					this.setLuoboInjured();
				}
			}
		}
	},
	//check collision luobo is injured and handle the indjured state
	setLuoboInjured:function()
	{
		this.luoboState--;
		if(this.luoboState === 7 || this.luoboState === 5)
		{
			this.luoboState--;
		}
		else if(this.luoboState === 0)//game is over
		{
			this.getInjuredAnimate(this.luoboState);
			return;
		}
		this.luobo.stopAllActions();
		this.luobo.runAction(this.getInjuredAnimate(this.luoboState));
	},
	//goods layer
	setToolLayer:function()
	{
		var toolLayer = cc.Layer.create();
		toolLayer.setContentSize(Default.windowSize());
		this.addChild(toolLayer, 10);
		//small cloud
		var obj1 = this.tmxObjectGroups.getObject("1Ob1");
		var cloud01 = ccui.ImageView.create("cloud01.png", ccui.Widget.PLIST_TEXTURE);
		cloud01.setPosition(obj1.x+40, obj1.y+40);
		toolLayer.addChild(cloud01, 0);
		var obj1 = this.tmxObjectGroups.getObject("1Ob2");
		var cloud01 = ccui.ImageView.create("cloud01.png", ccui.Widget.PLIST_TEXTURE);
		cloud01.setPosition(obj1.x+40, obj1.y+40);
		toolLayer.addChild(cloud01, 0);
		//bigger cloud
		var obj5 = this.tmxObjectGroups.getObject("5Ob1");
		var cloud01 = ccui.ImageView.create("cloud05.png", ccui.Widget.PLIST_TEXTURE);
		cloud01.setPosition(obj5.x+obj5.width/2, obj5.y+obj5.height/2);
		toolLayer.addChild(cloud01, 0);
		
		var obj5 = this.tmxObjectGroups.getObject("5Ob2");
		var cloud01 = ccui.ImageView.create("cloud05.png", ccui.Widget.PLIST_TEXTURE);
		cloud01.setPosition(obj5.x+obj5.width/2, obj5.y+obj5.height/2);
		toolLayer.addChild(cloud01, 0);
		//cai hong
		var obj4 = this.tmxObjectGroups.getObject("4Ob1");
		var cloud01 = ccui.ImageView.create("cloud04.png", ccui.Widget.PLIST_TEXTURE);
		cloud01.setPosition(obj4.x+obj4.width/2, obj4.y+obj4.height/2);
		toolLayer.addChild(cloud01, 0);
		//qi qiu
		var obj4 = this.tmxObjectGroups.getObject("7Ob1");
		var cloud01 = ccui.ImageView.create("cloud07.png", ccui.Widget.PLIST_TEXTURE);
		cloud01.setPosition(obj4.x+obj4.width/2, obj4.y+obj4.height/2);
		toolLayer.addChild(cloud01, 0);
		
		//yu zhou
		var obj4 = this.tmxObjectGroups.getObject("3Ob1");
		var cloud01 = ccui.ImageView.create("cloud03.png", ccui.Widget.PLIST_TEXTURE);
		cloud01.setPosition(obj4.x+obj4.width/2, obj4.y+obj4.height/2);
		toolLayer.addChild(cloud01, 0);
		var obj4 = this.tmxObjectGroups.getObject("3Ob2");
		var cloud01 = ccui.ImageView.create("cloud03.png", ccui.Widget.PLIST_TEXTURE);
		cloud01.setPosition(obj4.x+obj4.width/2, obj4.y+obj4.height/2);
		toolLayer.addChild(cloud01, 0);
		
		this.toolArr = toolLayer.getChildren();
		
		for(var i = 0; i < this.toolArr.length; i++)
		{
			this.toolArr[i].addTouchEventListener(this.toolLayerChildTouchFunc, this);
		}
	},
	// touch eventlistener for tool layer children
	toolLayerChildTouchFunc:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			this.handleRangeArray();
			if(this.pointTemp)
			{
				if(this.pointTemp != target)
				{
					getPointAnimate(target.getPosition(), target, this);
					this.pointTemp = target;
				}
				else//hide the pointAnimation
				{
					hidePointAnimation(this);
				}
			}
			else
			{
				getPointAnimate(target.getPosition(), target, this);
				this.pointTemp = target;
			}
			hideAddWeaponAnimate(this);//hide the add animation
			this.hideWeaponLayout();//hide the weapon layout
		}
	},
	//refresh point animation current position
	refreshPointAnimationPos:function()
	{
		if(this.pointTemp)
		{
			getPointAnimate(this.pointTemp.getPosition(), this.pointTemp, this);
		}
	},
	// touch eventlistener for this 
	touchLayerFunc:function(target, state)
	{
		if(state === ccui.Widget.TOUCH_ENDED)
		{
			this.handleRangeArray();
			var p = this.getTouchStartPos();
			var xx = Math.floor(p.x/80)*80+40;
			var yy = Math.floor(p.y/80)*80+40;
			//play luobo snake animation
			var rect = this.luobo.getBoundingBox();
			if(state == ccui.Widget.TOUCH_ENDED)
			{
				if(cc.rectContainsPoint(rect, p))
				{
					this.hideWeaponLayout();
					hideAddWeaponAnimate(this);
					this.luobo.stopAllActions();
					this.luobo.runAction(this.getLuoboAnimation(1));
					return;
				}
			}
			//if touch the monster
			for(var i = 0; i < this.monsterArr.length; i++)
			{
				var rect1 = this.monsterArr[i].monster.getBoundingBox();
				if(cc.rectContainsPoint(rect1, p))
				{
					this.hideWeaponLayout();
					this.toolLayerChildTouchFunc(this.monsterArr[i].monster, 2);
					return;
				}
			}
			
			//hide add weapon animation
			if(this.addRect)
			{
				var recta = this.addRect.getBoundingBox();
				if(cc.rectContainsPoint(recta, p))
				{
					hideAddWeaponAnimate(this);
					this.hideWeaponLayout();
					return;
				}
			}

			//show add weapon animation
			for(var i = 0; i < this.tmxOGArr.length; i++)
			{
				var rect2 = cc.rect(this.tmxOGArr[i].x,this.tmxOGArr[i].y,this.tmxOGArr[i].width,this.tmxOGArr[i].height);
				if(cc.rectContainsPoint(rect2, p))
				{
					getAddWeaponAnimate(cc.p(xx, yy), this);
					this.getWeaponLayout(cc.p(xx, yy));
					return;
				}
				else if(i === this.tmxOGArr.length-1)
				{
					hideAddWeaponAnimate(this);
					this.hideWeaponLayout();
					getForbideAnimation(cc.p(xx, yy), this);
				}
			}
		}
	},
	//init scene 
	zinit:function()
	{
		this.setSize(Default.windowSize());
		
		var background = cc.Sprite.createWithSpriteFrameName("BG1.png");
		background.setPosition(this.width/2, this.height/2);
		this.addChild(background, 0);

		var path = cc.Sprite.createWithSpriteFrameName("Path.png");
		path.setPosition(this.width/2, this.height/2);
		this.addChild(path, 0);
		
		var menuBG = cc.Sprite.createWithSpriteFrameName("MenuBG.png");
		menuBG.setPosition(this.width/2, this.height-menuBG.height/2);
		this.addChild(menuBG, 0);
		
		//monster wave nuber background
		this.menuCenter = cc.Sprite.createWithSpriteFrameName("MenuCenter_01_CN.png");
		this.menuCenter.setPosition(this.width/2, this.height-this.menuCenter.height/2);
		this.addChild(this.menuCenter, 0);
//		this.menuCenter.setOpacity(0);
		
		//pause background
		this.menuCenterBg = cc.Sprite.createWithSpriteFrameName("MenuCenter_02_CN.png");
		this.menuCenterBg.setPosition(this.width/2, this.height-this.menuCenterBg.height/2);
		this.addChild(this.menuCenterBg, 0);
		this.menuCenterBg.setOpacity(0);
		
		//control move speed rate
		this.speedBtn = BaseButton.createe("speed11.png", "speed12.png", "", ccui.Widget.PLIST_TEXTURE);
		this.speedBtn.setPosition(this.width/2+200, this.height-this.speedBtn.height/2);
		this.isAddSpeed = false;
		this.speedBtn.addTouchEventListener(this.speedBtnTouchEvent, this);
		this.addChild(this.speedBtn, 0);
		
		//control pause or play
		this.pauseBtn = BaseButton.createe("pause01.png", "pause02.png", "", ccui.Widget.PLIST_TEXTURE);
		this.pauseBtn.setPosition(this.width/2+320, this.height-this.pauseBtn.height/2);
		this.isPause = false;
		this.pauseBtn.addTouchEventListener(this.pauseBtnTouchEvent, this);
		this.addChild(this.pauseBtn, 0);
		
		//luobo current state or injured
		this.luoboState = 10;
		//weapon/bullet/monster/tool all collision layer
		this.collisionLayer = cc.Layer.create();
		this.collisionLayer.setContentSize(Default.windowSize());
		this.addChild(this.collisionLayer, 30);
	},
	//level01 weapon
	getWeaponLayout:function(point)
	{
		point = this.handleWeaponPoint(point);
		if(this.weaponLayout)
		{
			for(var i = 0; i < this.weaponLayout.getChildren().length; i++)
			{
				this.weaponLayout.getChildren()[i].scale = 0;
			}

			this.weaponLayout.setPosition(point);
			var scaleTo = cc.scaleTo(0.2, 1, 1);
			for(var i = 0; i < this.weaponLayout.getChildren().length; i++)
			{
				this.weaponLayout.getChildren()[i].runAction(scaleTo.clone());
			}
			return;
		}
		this.weaponLayout = ccui.Layout.create();
		this.weaponLayout.setSize(cc.size(260, 80));
		this.weaponLayout.setPosition(point);
		this.addChild(this.weaponLayout, 40);

		this.bottle = LuoBoWeaponCreate.createBottle();
		this.bottle.disabled.setPosition(this.bottle.disabled.width/2, this.bottle.disabled.height/2);
		this.bottle.buy.setPosition(this.bottle.buy.width/2, this.bottle.buy.height/2);
		this.bottle.disabled.visible = false;
		
		this.weaponLayout.addChild(this.bottle.disabled, 0);
		this.weaponLayout.addChild(this.bottle.buy, 0);

		this.fireBottle = LuoBoWeaponCreate.createFireBottle();
		this.fireBottle.disabled.setPosition(this.bottle.buy.x+this.fireBottle.disabled.width, this.fireBottle.disabled.height/2);
		this.fireBottle.buy.setPosition(this.fireBottle.disabled.x, this.fireBottle.disabled.y);
		this.fireBottle.disabled.visible = false;

		this.weaponLayout.addChild(this.fireBottle.buy, 0);
		this.weaponLayout.addChild(this.fireBottle.disabled, 0);

		this.ball = LuoBoWeaponCreate.createBall();
		this.ball.disabled.setPosition(this.fireBottle.disabled.x+this.ball.disabled.width, this.ball.disabled.height/2);
		this.ball.buy.setPosition(this.ball.disabled.x, this.ball.disabled.y);
		this.ball.disabled.visible = false;
		this.weaponLayout.addChild(this.ball.disabled, 0);
		this.weaponLayout.addChild(this.ball.buy, 0);

		for(var i = 0; i < this.weaponLayout.getChildren().length; i++)
		{
			this.weaponLayout.getChildren()[i].scale = 0;
			this.weaponLayout.getChildren()[i].addTouchEventListener(this.weaponLayoutEventFunc, this);
		}

		var scaleTo = cc.scaleTo(0.2, 1, 1);
		for(var i = 0; i < this.weaponLayout.getChildren().length; i++)
		{
			this.weaponLayout.getChildren()[i].runAction(scaleTo.clone());
		}
	},
	//hide weapon layout
	hideWeaponLayout:function()
	{
		if(!this.weaponLayout){return;}
		var scaleTo = cc.scaleTo(0.2, 0, 0);
		for(var i = 0; i < this.weaponLayout.getChildren().length; i++)
		{
			this.weaponLayout.getChildren()[i].runAction(scaleTo.clone());
		}
		this.scheduleOnce(function()
		{
			this.weaponLayout.setPosition(5000, 5000);
		}, 0.3);
	},
	//touch and select weapon
	weaponLayoutEventFunc:function(target, state)
	{
		if(state === ccui.Widget.TOUCH_ENDED)
		{
			getAirAnimateion(this.addRect.getPosition(), this);
			this.installWeapon(target.name);
			this.hideWeaponLayout();
			hideAddWeaponAnimate(this);
		}
	},
	//handle weapon point that can show weapon layout all when its stay left/right/top/bottom
	handleWeaponPoint:function(point)
	{
		if(point.x < 100)
		{
			point.x -= 40;
		}
		else if(point.x > Default.windowWidth()-100)
		{
			point.x -= 220;
		}
		else
		{
			point.x -= 120;
		}

		if(point.y > Default.windowHeight()-160)
		{
			point.y -= 120;
		}
		else
		{
			point.y += 40;
		}

		return point;
	},
	//control pause or play
	pauseBtnTouchEvent:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			this.handleRangeArray();
			if(this.isPause)
			{
				this.isPause = false;
				target.loadTextures("pause01.png","pause01.png","",ccui.Widget.PLIST_TEXTURE);
				this.menuCenter.setOpacity(250);
				this.menuCenterBg.setOpacity(0);
			}
			else
			{
				this.menuCenter.setOpacity(0);
				this.menuCenterBg.setOpacity(250);
				this.isPause = true;
				target.loadTextures("pause11.png","pause12.png","",ccui.Widget.PLIST_TEXTURE);
			} 
		}
	},
	//control move speed rate
	speedBtnTouchEvent:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			this.handleRangeArray();
			if(this.isAddSpeed)
			{
				this.isAddSpeed = false;
				target.loadTextures("speed11.png","speed12.png","",ccui.Widget.PLIST_TEXTURE);
			}
			else
			{
				this.isAddSpeed = true;
				target.loadTextures("speed21.png","speed22.png","",ccui.Widget.PLIST_TEXTURE);
			} 
		}
	},
	/**
	 * install weapon with name
	 * @param:weaponName:string, the weapon name
	 */
	installWeapon:function(weaponName)
	{
		if(weaponName == "bottle")
		{
			this.handleLuoboWeaponBottle();
		}
	},
	/**
	 * handle the luobo weapon actions;for example rotate/shoot/sell
	 * @param;parent:LuoboLevel01 class
	 */
	handleLuoboWeaponBottle:function()
	{
		var point = this.addRect.getPosition();
		var bottleWeapon = LuoBoWeaponCreate.createBottleFirst();
		bottleWeapon.base.setPosition(point);
		bottleWeapon.base.id = bottleWeapon.id;
		bottleWeapon.base.addTouchEventListener(this.bottleWeaponfunc, this);
		bottleWeapon.firstb.setPosition(point);
		this.collisionLayer.addChild(bottleWeapon.base, 100);
		this.collisionLayer.addChild(bottleWeapon.firstb, 100);
		this.weaponArr.push(bottleWeapon);
		
		
		
		var circle = cc.DrawNode.create();
		var center = point;
		var radius = getBottleData().radius;
		var angle = 0;
		var segments= 300;
		var drawLineToCenter = false;
		var lineWidth = 10;
		var color = cc.color(255, 0, 0, 255);
		circle.drawCircle(center, radius, angle, segments, drawLineToCenter, lineWidth, color);
		this.collisionLayer.addChild(circle, 0);
	},
	//handle touch the bullet base event
	bottleWeaponfunc:function(target, state)
	{
		if( state === ccui.Widget.TOUCH_ENDED )
		{
			this.handleRangeArray();
			if ( this.tempWeapon && this.tempWeapon === target )
			{
				this.handleRangeArray();
				this.tempWeapon = null;
				return;
			}
			var range = handleShootingRange(this, PlayerData.weaponType, target.id);
			this.collisionLayer.addChild(range, 50);
			range.setPosition(target.getPosition());
			this.rangeArr.push(range);
			
			this.tempWeapon = target;
		}
	},
	handleRangeArray:function()
	{
		for ( var i = 0; i < this.rangeArr.length; i++ )
		{
			hangleRemoveRange(this, this.rangeArr[i]);
			this.rangeArr.splice(i, 1);
		}
	},
	//check bullet collision
	checkBulletCollision:function()
	{
		if(this.bulletArr)
		{
			for(var i = 0;i < this.bulletArr.length; i++)
			{
				if( !this.bulletArr[i] ){return;}
				var angle = this.bulletArr[i].getRotation()/180*Math.PI;
				var speed= 5;
				this.bulletArr[i].y+=Math.cos(angle)*speed;
				this.bulletArr[i].x+=Math.sin(angle)*speed;
				//remove bullet
				if( this.bulletArr[i].x < 0 || this.bulletArr[i].y < 0 || this.bulletArr[i].x > Default.windowWidth() || this.bulletArr[i].y > Default.windowHeight() )
				{
					this.bulletArr[i].removeFromParent();
					this.bulletArr.splice(i, 1);
				}
				//check collision of both bullet and monster
				for(var j = 0,len = this.monsterArr.length; j < len; j++)
				{
					if( !this.monsterArr[j].monster ){return;}
					var rect2 = this.monsterArr[j].monster.getBoundingBox(),
						pp	  = this.bulletArr[i].getParent().convertToWorldSpace(this.bulletArr[i]);
					if( cc.rectContainsPoint(rect2, pp) )
					{
						this.bulletArr[i].removeFromParent();
						this.bulletArr.splice(i, 1);
						this.monsterArr[j].blood.visible = true;
						this.monsterArr[j].blood.setPercent(this.monsterArr[j].blood.getPercent()-15);
						if( this.monsterArr[j].blood.getPercent() <= 0 )
						{
							getAirAnimateion(this.monsterArr[j].monster.getPosition(), this);
							this.monsterArr[j].monster.removeFromParent();
							this.monsterArr.splice(j, 1);
						}
						break;
					}
					else
					{
						this.monsterArr[j].blood.visible = false;
					}
				}
			}
		}
		//this.isShooting control shooting rate
		if(this.weaponArr && this.isShooting )
		{
			for(var i = 0; i < this.weaponArr.length; i++)
			{
				this.startRotateWeapon(this.weaponArr[i]);
			}
		}
	},
	//start rotate weapon
	startRotateWeapon:function(weapon)
	{
		for(var i = 0; i < this.monsterArr.length; i++)
		{
			var P1 = this.monsterArr[i].monster.getPosition();
			var P2 = weapon.firstb.getPosition();
			var distance = cc.pDistance(P1,P2);
			if(distance <= getBottleData().radius)
			{
				// fight the first monster
				break;
			}
		}
		if(distance <= getBottleData().radius)
		{
			var angle = Math.atan2(P1.x - P2.x, P1.y - P2.y);
			angle = angle*180/Math.PI;
			weapon.firstb.stopAllActions();
			weapon.firstb.runAction(getBottleAnimation().repeatForever());
			weapon.firstb.setRotation(angle);
			this.shooting(weapon.firstb, angle);
		}
		else
		{
			weapon.firstb.stopAllActions();
		}
	},
	/**
	 * start fire
	 * @param weapon:sprite the weapon
	 * @param angle:number the weapon rotate
	 */
	shooting:function(weapon, angle)
	{
		this.isShooting = false;
		var bullet =new CreateBottleBullet(weapon.getPosition());
		bullet.buttle.setRotation(angle);
		this.collisionLayer.addChild(bullet.buttle, 10);
		this.bulletArr.push(bullet.buttle);
	},
	//handle shooting
	handleShooting:function()
	{
		this.schedule(this.shootingIntervalTime, 0.5);
	},
	//the shooting inverval times 0.5 secound
	shootingIntervalTime:function()
	{
		this.isShooting = true;
	}
});

LuoboLevel01.createScene = function()
{
	var theLayer = new LuoboLevel01();
	var scene = cc.Scene.create();
	scene.addChild(theLayer);
	return scene
};













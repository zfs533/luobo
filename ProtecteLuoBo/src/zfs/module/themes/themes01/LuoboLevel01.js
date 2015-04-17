/*
 * @zfs theme01 level1 2015/1/8
 */
var LuoboLevel01 = ccui.Layout.extend(
{
	/**
	 * @param data
	 * {"isLocked":false,"monsterNum":15,"wave":"ss_waves_15.png","level":1}
	 */
	ctor:function(data)
	{
		this._super();
		this.data = data;
		this.initVariable();
		this.zinit();
		this.handleTMXtileMap();
		this.setToolLayer();
		this.setSpriteLayer();
		this.findLuoboRoad();
		this.scheduleUpdate();
		this.handleShooting();
		this.showGoldNumber();
		this.addTouchEventListener(this.touchLayerFunc, this);
		var img = ccui.ImageView.create("BossHP02.png", ccui.Widget.PLIST_TEXTURE);
		img.x = img.y  = 300;
		this.addChild(img, 100);
	},
	initVariable:function()
	{
		this.monsterWave = this.data.monsterNum;
		this.currentMonsterCount = 0;
		this.dispatchMonster = false;
		this.bulletArr = [];
		this.weaponArr = [];
		this.rangeArr  = [];
		this.monsterArr = [];
		this.tempWeapon = null;
		this.gameIsOver = false;
		this.schedule(function()
		{
			this.luoboPro.playShakeAnimate();
		}, 10);
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
	//monster move to stage road
	moveMonster:function()
	{
		if ( this.gameIsOver )
		{
			return;
		}
		this.currentMonsterCount++;
		if ( this.currentMonsterCount > this.monsterWave )
		{
			this.overGame();
			return;
		}
		if ( this.currentMonsterCount > 9 && this.currentMonsterCount < 20 )
		{
			this.currentMonsterWave1.setString(1);
			this.currentMonsterWave2.setString(this.currentMonsterCount - 10);
		}
		else
		{
			this.currentMonsterWave1.setString(0);
			this.currentMonsterWave2.setString(this.currentMonsterCount);
		}
		
		var monster = new LuoboMonster(this);
		monster.playEnterAnimation();
		monster.startMove(1);
		this.monsterArr.push(monster);
		this.dispatchMonster = false;
		this.schedule(function()
		{
			var monster = new LuoboMonster(this);
			monster.playEnterAnimation();
			monster.startMove(1);
			this.monsterArr.push(monster);
		}, 1, 9);
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
		this.luoboPro = new LuoboProtected(this);
		this.luobo = this.luoboPro.luobo;
		this.luobo.setPosition(obj1.x+50, obj1.y);
		spriteLayer.addChild(this.luobo, 0);//TODO
	},
	//check every frame
	update:function()
	{
		this.checkCollision();
		this.refreshPointAnimationPos();
		this.checkBulletCollision();
		if( this.monsterArr.length < 1 && !this.dispatchMonster )
		{
			cc.log("********************  "+this.monsterArr.length+"  "+this.dispatchMonster)
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
					this.luoboPro.playInjuredAnimate();
				}
			}
		}
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
		if( this.pointTemp )
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
					this.luoboPro.playShakeAnimate();
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
		
		this.pageNumTxt = ccui.TextAtlas.create(PlayerData.gold, "res/Themes/Items/labelatlas.png", 17, 22, "0");
		this.pageNumTxt.setAnchorPoint(0, 0.5);
		this.pageNumTxt.setPosition(cc.p(110, Default.windowHeight() - 30));
		this.addChild(this.pageNumTxt, 10);
		
		//monster wave nuber background
		this.menuCenter = cc.Sprite.createWithSpriteFrameName("MenuCenter_01_CN.png");
		this.menuCenter.setPosition(this.width/2, this.height-this.menuCenter.height/2);
		this.addChild(this.menuCenter, 0);
		
		//怪物波数
		var monsterWaveAll = ccui.TextAtlas.create(PlayerData.gold, "res/Themes/Items/labelatlas.png", 17, 22, "0");
		monsterWaveAll.setAnchorPoint(0, 0);
		monsterWaveAll.setString(this.monsterWave);//TODO
		monsterWaveAll.setPosition(this.menuCenter.x - 10, this.menuCenter.y - 5);
		this.monsterWaveAll = monsterWaveAll;
		this.addChild(monsterWaveAll, 1);
		
		this.currentMonsterWave1 = ccui.TextAtlas.create(PlayerData.gold, "res/Themes/Items/labelatlas.png", 17, 22, "0");
		this.currentMonsterWave1.setAnchorPoint(0.5, 0);
		this.currentMonsterWave1.setString(0);
		this.currentMonsterWave1.setPosition(this.menuCenter.x - 100, monsterWaveAll.y);
		this.addChild(this.currentMonsterWave1, 1);
		
		this.currentMonsterWave2 = ccui.TextAtlas.create(PlayerData.gold, "res/Themes/Items/labelatlas.png", 17, 22, "0");
		this.currentMonsterWave2.setAnchorPoint(0.5, 0);
		this.currentMonsterWave2.setString(0);
		this.currentMonsterWave2.setPosition(this.menuCenter.x - 60, monsterWaveAll.y);
		this.addChild(this.currentMonsterWave2, 1);
		
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
		
		//control continue or change level game
		this.menuBtn = BaseButton.createe("menu01.png", "menu02.png", "", ccui.Widget.PLIST_TEXTURE);
		this.menuBtn.setPosition(this.pauseBtn.x + 100, this.pauseBtn.y);
		this.menuBtn.addTouchEventListener(this.menuBtnTouchEvent, this);
		this.addChild(this.menuBtn, 0);
		
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
	
	//control coutinue or change level of game
	menuBtnTouchEvent:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			this.handleRangeArray();
			var me = new LuoboMenu(this.data);
			this.addChild(me, 100);
		}
	},
	//control pause or play
	pauseBtnTouchEvent:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			var that = this;
			this.handleRangeArray();
			if(this.isPause)
			{
				this.scheduleUpdate();
				for ( var i = 0; i < this.monsterArr.length; i++ )
				{
//					this.monsterArr[i].monster.resumeAllActions();
				}
				this.monsterWaveAll.visible = true;
				this.currentMonsterWave1.visible = true;
				this.currentMonsterWave2.visible = true;
				this.isPause = false;
				target.loadTextures("pause01.png","pause01.png","",ccui.Widget.PLIST_TEXTURE);
				this.menuCenter.setOpacity(250);
				this.menuCenterBg.setOpacity(0);
			}
			else
			{
				this.unscheduleUpdate();
				for ( var i = 0; i < this.monsterArr.length; i++ )
				{
//					this.monsterArr[i].monster.stopAllActions();
				}
				this.monsterWaveAll.visible = false;
				this.currentMonsterWave1.visible = false;
				this.currentMonsterWave2.visible = false;
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
		if ( PlayerData.gold < 100 )
		{
			AlertView.show("金币不足");
			return;
		}
		getAirAnimateion(this.addRect.getPosition(), this);
		var point = this.addRect.getPosition();
		var bottleWeapon = new LuoboBottleWeapon(PlayerData.weaponType, point, this);
		this.collisionLayer.addChild(bottleWeapon.base, 100);
		this.collisionLayer.addChild(bottleWeapon.firstb, 100);
		this.weaponArr.push(bottleWeapon);
		PlayerData.gold -= bottleWeapon.value;
		this.showGoldNumber();
		
		
//		var circle = cc.DrawNode.create();
//		var center = point;
//		var radius = getBottleData(bottleWeapon.type).radius;
//		var angle = 0;
//		var segments= 300;
//		var drawLineToCenter = false;
//		var lineWidth = 10;
//		var color = cc.color(255, 0, 0, 255);
//		circle.drawCircle(center, radius, angle, segments, drawLineToCenter, lineWidth, color);
//		this.collisionLayer.addChild(circle, 0);
	},
	//handle touch the bullet base event
	bottleWeaponfunc:function(target, state, weaponType)
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
			var range = new handleShootingRange(this, weaponType, target.id);
			this.collisionLayer.addChild(range, 50);
			range.setPosition(target.getPosition());
			this.rangeArr.push(range);
			this.tempWeapon = target;
		}
	},
	handleRangeArray:function(param)
	{
		if ( param )
		{
			this.tempWeapon = null;
		}
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
					if( !this.monsterArr[j].monster || !this.bulletArr[i] ){return;}
					var rect2 = this.monsterArr[j].monster.getBoundingBox(),
					pp	  = this.bulletArr[i].getParent().convertToWorldSpace(this.bulletArr[i]);
					if( cc.rectContainsPoint(rect2, pp) )
					{
						this.monsterArr[j].showBlood(this.bulletArr[i].attack);
						this.bulletArr[i].removeFromParent();
						this.bulletArr.splice(i, 1);
						if( this.monsterArr[j].blood.getPercent() <= 0 )
						{
							getAirAnimateion(this.monsterArr[j].monster.getPosition(), this);
							PlayerData.gold += Math.floor(this.monsterArr[j].gold);//消灭怪物获得金币
							this.showGoldNumber();
							if( this.monsterArr[i].monster && this.pointTemp == this.monsterArr[i].monster )
							{
								getPointAnimate(cc.p(5000, 5000), this.monsterArr[i].monster, this);
								this.pointTemp = null;
							}
							this.monsterArr[j].monster.removeFromParent();
							this.monsterArr.splice(j, 1);
						}
						break;
					}
					else
					{
						this.monsterArr[j].hideBlood();
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
			if(distance <= getBottleData(weapon.type).radius)
			{
				// fight the first monster
				break;
			}
		}
		if(distance <= getBottleData(weapon.type).radius)
		{
			var angle = Math.atan2(P1.x - P2.x, P1.y - P2.y);
			angle = angle*180/Math.PI;
			weapon.getBottleAnimation(weapon.type, angle);
			this.shooting(weapon, angle, weapon.type);
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
	 * @param weaponType:number the weapon level
	 */
	shooting:function(weapon, angle, weaponType)
	{
		this.isShooting = false;
		var bullet = weapon.createBullet(weaponType, angle, this);
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
	},
	//show the gold number for player
	showGoldNumber:function()
	{
		if ( PlayerData.gold <= 0 )
		{
			this.pageNumTxt.setString(0);
		}
		this.pageNumTxt.setString(PlayerData.gold);
		this.jugementWenponUpgradeAn();
	},
	jugementWenponUpgradeAn:function()
	{
		for ( var i = 0; i < this.weaponArr.length; i++ )
		{
			this.weaponArr[i].jugementUpgrade();
		}
	},
	//pass level
	overGame:function()
	{
		//data {wave:15, passWave:15, isWin:true, level:1}
		if ( this.currentMonsterCount < this.monsterWave )
		{
			var data = {wave:this.monsterWave, passWave:this.currentMonsterCount, isWin:false,level:this.data.level};
		}
		else
		{
			var data = {wave:this.monsterWave, passWave:this.currentMonsterCount, isWin:true,level:this.data.level};
		}
		var mm = new LuoboOverLevel(data, this);
		this.addChild(mm, 100);
		this.gameIsOver = true; 
		this.unscheduleUpdate();
		this.removeAllMonster();
	},
	removeAllMonster:function()
	{
		for ( var i = 0; i < this.monsterArr.length; i++ )
		{
			this.monsterArr[i].monster.removeFromParent();
		}
	}
});

LuoboLevel01.createScene = function(data)
{
	var theLayer = new LuoboLevel01(data);
	var scene = cc.Scene.create();
	scene.addChild(theLayer);
	return scene
};













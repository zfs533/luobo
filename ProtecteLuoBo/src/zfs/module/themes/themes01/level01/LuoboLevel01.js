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
		this.handleShooting();
		this.showGoldNumber();
//		this.playArrowAnimate();
		this.addGuidance();
		this.addTouchEventListener(this.touchLayerFunc, this);
//		var img = ccui.ImageView.create("targetscleard_CN.png", ccui.Widget.PLIST_TEXTURE);
//		img.x = img.y  = 300;
//		this.addChild(img, 100);
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
		this.tmxObjArr = [];
		this.tempWeapon = null;
		this.gameIsOver = false;
		this.weaponLayout = null;//weapon panel
		this.guidance = null;//new player guidance
		this.isCleared = false;
		this.selectedTarget = null;
		this.schedule(function()
		{
			this.luoboPro.playShakeAnimate();
		}, 10);
		cc.spriteFrameCache.addSpriteFrames("res/Themes/Theme1/Items/Object01-hd.plist");
		cc.spriteFrameCache.addSpriteFrames("res/Themes/Theme1/BG1/BG-hd.plist");
	},
	//new player guidance
	addGuidance:function()
	{
		this.guidance = new LuoboGuidance(this);
		this.addChild(this.guidance, 9);
	},
	//tmxtiled map
	handleTMXtileMap:function()
	{
		this.tmxTiled = cc.TMXTiledMap.create("res/Themes/Theme1/BG1/BGPath.tmx");
		this.addChild(this.tmxTiled, 1);
		this.tmxObjectGroups = this.tmxTiled.getObjectGroups()[0];//cc.TMXObjectGroup
		this.tmxOGArr = this.tmxObjectGroups.getObjects();//array
		for ( var i = 0; i < this.tmxOGArr.length; i++ )
		{
			//1Ob1
			var reg01 = /Obj\d/g;
			if ( this.tmxOGArr[i].name.match(reg01) )
			{
				this.tmxObjArr.push(this.tmxOGArr[i]);
			}
		}
	},
	//find luobo road
	findLuoboRoad:function()
	{
		var gap = 40;
		var roadArr = [];
		for(var i= 1; i < 9; i++)
		{
			var point = cc.p(this.tmxObjectGroups.getObject("PT"+i).x +gap,this.tmxObjectGroups.getObject("PT"+i).y - gap/2);
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
			this.currentMonsterCount = this.monsterWave;
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
		monster.startMove01(1);
		this.monsterArr.push(monster);
		this.dispatchMonster = false;
		this.schedule(function()
		{
			var monster = new LuoboMonster(this);
			monster.playEnterAnimation();
			monster.startMove01(1);
			this.monsterArr.push(monster);
		}, 1, 4);
	},
	//sprite layer
	setSpriteLayer:function()
	{
		var spriteLayer = cc.Layer.create();
		spriteLayer.setContentSize(Default.windowSize());
		this.addChild(spriteLayer, 2);
		
		//door
		var obj1 = this.tmxObjectGroups.getObject("Obj9");
		var cloud01 = ccui.ImageView.create("start01.png", ccui.Widget.PLIST_TEXTURE);
		cloud01.setPosition(obj1.x+obj1.width/2, obj1.y);
		spriteLayer.addChild(cloud01, 0);
		
		var obj1 = this.tmxObjectGroups.getObject("Obj13");
		this.luoboPro = new LuoboProtected(this);
		this.luobo = this.luoboPro.luobo;
		this.luobo.setPosition(obj1.x+50, obj1.y);
		spriteLayer.addChild(this.luobo, 0);
	},
	playArrowAnimate:function()
	{
		//door
		var obj1 = this.tmxObjectGroups.getObject("Obj9");
		var arrow = new LuoboArrow(obj1, this);
		arrow.type01();
		this.addChild(arrow, 30);
	},
	registerScheduel:function()
	{
		this.scheduleUpdate();
	},
	//check every frame
	update:function()
	{
		this.checkCollision();
		this.refreshPointAnimationPos();
		this.checkShooting();
		this.checkBulletCollision();
		this.checkClearFinish();
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
	checkClearFinish:function()
	{
		if ( this.toolArr.length === 0 && !this.isCleared )
		{
			var clear = new LuoboCleared();
			this.addChild(clear, 100);
			this.isCleared = true;
		}
	},
	//check collision
	checkCollision:function()
	{
		var rect1 = this.luobo.getBoundingBox();
		rect1.y += 50;
		for(var i = 0; i < this.monsterArr.length; i++)
		{
			if(!this.monsterArr[i].monster){return;}
			var rect2 = this.monsterArr[i].monster.getBoundingBox();
			if(rect1.x < rect2.x && rect1.x+rect1.width > rect2.x)
			{
				if(rect1.y >= rect2.y && rect1.y < rect2.y + rect2.height)
				{
					if(this.pointTemp == this.monsterArr[i].monster)
					{
						hidePointAnimation(this);
					}
					this.monsterArr[i].monster.removeFromParent();
					this.monsterArr.splice(i, 1);
					this.luoboPro.playInjuredAnimate();
				}
			}
		}
	},
	getToolBlood:function(monster)
	{
		var bloodBar = ccui.Slider.create();
		bloodBar.loadProgressBarTexture("MonsterHP01.png", ccui.Widget.PLIST_TEXTURE);
		bloodBar.loadBarTexture("MonsterHP02.png", ccui.Widget.PLIST_TEXTURE);
		bloodBar.setPercent(100);
		bloodBar.setPosition(monster.width/2, monster.height-10);
		bloodBar.visible = false;
		monster.blood = bloodBar;
		monster.addChild(bloodBar, 10);
	},
	//goods layer
	setToolLayer:function()
	{
		var toolLayer = cc.Layer.create();
		toolLayer.setContentSize(Default.windowSize());
		this.addChild(toolLayer, 1);
		//small cloud
		var obj1 = this.tmxObjectGroups.getObject("1Ob1");
		var cloud01 = ccui.ImageView.create("cloud01.png", ccui.Widget.PLIST_TEXTURE);
		cloud01.setPosition(obj1.x+40, obj1.y+40);
		toolLayer.addChild(cloud01, 0);
		this.getToolBlood(cloud01);
		
		var obj1 = this.tmxObjectGroups.getObject("1Ob2");
		var cloud01 = ccui.ImageView.create("cloud01.png", ccui.Widget.PLIST_TEXTURE);
		cloud01.setPosition(obj1.x+40, obj1.y+40);
		toolLayer.addChild(cloud01, 0);
		this.getToolBlood(cloud01);
		
		//bigger cloud
		var obj5 = this.tmxObjectGroups.getObject("5Ob1");
		var cloud01 = ccui.ImageView.create("cloud05.png", ccui.Widget.PLIST_TEXTURE);
		cloud01.setPosition(obj5.x+obj5.width/2, obj5.y+obj5.height/2);
		toolLayer.addChild(cloud01, 0);
		this.getToolBlood(cloud01);
		
		var obj5 = this.tmxObjectGroups.getObject("5Ob2");
		var cloud01 = ccui.ImageView.create("cloud05.png", ccui.Widget.PLIST_TEXTURE);
		cloud01.setPosition(obj5.x+obj5.width/2, obj5.y+obj5.height/2);
		toolLayer.addChild(cloud01, 0);
		this.getToolBlood(cloud01);
		//cai hong
		var obj4 = this.tmxObjectGroups.getObject("4Ob1");
		var cloud01 = ccui.ImageView.create("cloud04.png", ccui.Widget.PLIST_TEXTURE);
		cloud01.setPosition(obj4.x+obj4.width/2, obj4.y+obj4.height/2);
		toolLayer.addChild(cloud01, 0);
		this.getToolBlood(cloud01);
		//qi qiu
		var obj4 = this.tmxObjectGroups.getObject("7Ob1");
		var cloud01 = ccui.ImageView.create("cloud07.png", ccui.Widget.PLIST_TEXTURE);
		cloud01.setPosition(obj4.x+obj4.width/2, obj4.y+obj4.height/2);
		toolLayer.addChild(cloud01, 0);
		this.getToolBlood(cloud01);
		
		//yu zhou
		var obj4 = this.tmxObjectGroups.getObject("3Ob1");
		var cloud01 = ccui.ImageView.create("cloud03.png", ccui.Widget.PLIST_TEXTURE);
		cloud01.setPosition(obj4.x+obj4.width/2, obj4.y+obj4.height/2);
		toolLayer.addChild(cloud01, 0);
		this.getToolBlood(cloud01);
		var obj4 = this.tmxObjectGroups.getObject("3Ob2");
		var cloud01 = ccui.ImageView.create("cloud03.png", ccui.Widget.PLIST_TEXTURE);
		cloud01.setPosition(obj4.x+obj4.width/2, obj4.y+obj4.height/2);
		toolLayer.addChild(cloud01, 0);
		this.getToolBlood(cloud01);
		
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
					hidePointAnimation(this);
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
					hidePointAnimation(this);
//					this.toolLayerChildTouchFunc(this.monsterArr[i].monster, 2);
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
		this.addChild(menuBG, 60);
		
		this.topInfo = new LuoboTopInfo(this.data, this);
		this.addChild(this.topInfo, 60);
		this.pageNumTxt = this.topInfo.pageNumTxt
		//all monster wave number
		this.monsterWaveAll = this.topInfo.monsterWaveAll;
		this.currentMonsterWave1 = this.topInfo.currentMonsterWave1;
		this.currentMonsterWave2 = this.topInfo.currentMonsterWave2;
		//control move speed rate
		this.speedBtn = this.topInfo.speedBtn
		//control pause or play
		this.pauseBtn = this.topInfo.pauseBtn;
		//control continue or change level game
		this.menuBtn = this.topInfo.menuBtn;
		this.menuBtn.setTouchEnabled(false);
		this.pauseBtn.setTouchEnabled(false);
		this.speedBtn.setTouchEnabled(false);
		//weapon/bullet/monster/tool all collision layer
		this.collisionLayer = cc.Layer.create();
		this.collisionLayer.setContentSize(Default.windowSize());
		this.addChild(this.collisionLayer, 10);
	},
	//level01 weapon
	getWeaponLayout:function(point)
	{
		point = this.handleWeaponPoint(point);
		if(this.weaponLayout)
		{
			this.weaponLayout.refreshPosition(point);
			return;
		}
		this.weaponLayout = new LuoboWeaponPanel(this);
		this.weaponLayout.setPosition(point);
		this.addChild(this.weaponLayout, 60);
	},
	//hide weapon layout
	hideWeaponLayout:function()
	{
		if(!this.weaponLayout){return;}
		this.weaponLayout.hidePanel();
	},
	//touch and select weapon
	weaponLayoutEventFunc:function(target, state)
	{
		if(state === ccui.Widget.TOUCH_ENDED)
		{
			this.installWeapon(target.name);
			this.hideWeaponLayout();
			hideAddWeaponAnimate(this);
			if ( this.guidance )
			{
				this.guidance.refreshHandPosition();
			}
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
		}
	},
	//control pause or play
	pauseBtnTouchEvent:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			this.handleRangeArray();
			if(this.isPause)
			{
				this.scheduleUpdate();
				this.isPause = false;
				for ( var i = 0; i < this.monsterArr.length; i++ )
				{
//					var spd = cc.Speed.create(this.monsterArr[i].actions.clone(), 1);
//					this.monsterArr[i].monster.runAction(spd);
				}
			}
			else
			{
				this.unscheduleUpdate();
				this.isPause = true;
				for ( var i = 0; i < this.monsterArr.length; i++ )
				{
//					var spd = cc.Speed.create(this.monsterArr[i].actions, -1);
//					this.monsterArr[i].monster.runAction(spd);
				}
			} 
		}
	},
	//control move speed rate
	speedBtnTouchEvent:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			this.handleRangeArray();
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
		
		var point =this.addRect?this.addRect.getPosition():cc.p(280, 280);
		getAirAnimateion(point, this);
		var bottleWeapon = new LuoboBottleWeapon(PlayerData.weaponType, point, this);
		this.collisionLayer.addChild(bottleWeapon.base, 10);
		this.collisionLayer.addChild(bottleWeapon.firstb, 10);
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
	bottleWeaponfunc:function(target, state, weaponType)//TODO
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
			this.collisionLayer.addChild(range, 0);
			range.setPosition(target.getPosition());
			this.rangeArr.push(range);
			this.tempWeapon = target;
			if ( this.guidance )
			{
				cc.log("zhoufangsheng88888888888888888888888888")
				this.guidance.refreshHandPosition();
			}
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
	checkBulletCollision:function()//TODO
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
				//check collision of both bullet and tools
				if ( this.selectedTarget != null )
				{
					var rect1 = this.selectedTarget.getBoundingBox();
					if ( !this.bulletArr[i] ){break;}
					var bp = this.bulletArr[i].getParent().convertToWorldSpace(this.bulletArr[i]);
					if ( cc.rectContainsPoint(rect1, bp) )
					{
						this.selectedTarget.blood.visible = true;
						this.selectedTarget.blood.setPercent(this.selectedTarget.blood.getPercent()-this.bulletArr[i].attack);
						if ( this.selectedTarget.blood.getPercent() <=0 )
						{
							for ( var m = 0; m < this.toolArr.length; m++ )
							{
								if ( this.toolArr[m] === this.selectedTarget )
								{
									this.toolArr.splice(m, 1);
								}
							}
							getAirAnimateion(this.selectedTarget.getPosition(), this);
							this.selectedTarget.removeFromParent();
							hidePointAnimation(this);
						}
						this.bulletArr[i].removeFromParent();
						this.bulletArr.splice(i, 1);
						return;
					}
					else
					{
						this.selectedTarget.blood.visible = false;
					}
				}
				
				//check collision both bullet and monster
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
							if( this.monsterArr[j].monster && this.pointTemp == this.monsterArr[j].monster )
							{
								hidePointAnimation(this);
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
	},
	//this.isShooting control shooting rate
	checkShooting:function()
	{
		if(this.weaponArr && this.isShooting )
		{
			for( var i = 0; i < this.weaponArr.length; i++ )
			{
				//priority in selected target
				if ( this.selectedTarget && this.jugementDistanceForTool(this.weaponArr[i]) )
				{
					this.startRotateWeapon01(this.weaponArr[i]);
				}
				else
				{
					this.startRotateWeapon(this.weaponArr[i]);
				}
			}
		}
	},
	//start rotate weapon
	startRotateWeapon:function(weapon)//TODO
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
	//start rotate weapon for tool
	startRotateWeapon01:function(weapon)
	{
		var P1 = this.selectedTarget.getPosition();
		var P2 = weapon.firstb.getPosition();
		var distance = cc.pDistance(P1,P2);
		if( distance <= getBottleData(weapon.type).radius )
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
	//jugement is or not shooting current selected tool
	jugementDistanceForTool:function(weapon)
	{
		var P1 = this.selectedTarget.getPosition();
		var P2 = weapon.firstb.getPosition();
		var distance = cc.pDistance(P1,P2);
		if( distance <= getBottleData(weapon.type).radius )
		{
			return true;
		}
		return false
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
	//进入结点
	onEnter:function()
	{
		this._super();
//		var countDown = new LuoboCountDown(this);
//		this.addChild(countDown, 100);
	},
	countDown:function()
	{
		var countDown = new LuoboCountDown(this);
		this.addChild(countDown, 100);
		this.playArrowAnimate();
	},
	onExit:function()
	{
		this._super();
		cc.spriteFrameCache.removeSpriteFramesFromFile("res/Themes/Theme1/BG1/BG-hd.plist");
		cc.spriteFrameCache.removeSpriteFramesFromFile("res/Themes/Theme1/Items/Object01-hd.plist");
	},
	removeAllMonster:function()
	{
		for ( var i = 0; i < this.monsterArr.length; i++ )
		{
			this.monsterArr[i].monster.removeFromParent();
			this.monsterArr.splice(i, 1);
		}
	},
	//show the space that cound install weapon
	shwoCanInstallSpace:function()
	{
		var install = new LuoboInstallSpace(this.tmxObjArr);
		this.addChild(install, 1);
	}
});

LuoboLevel01.createScene = function(data)
{
	var theLayer = new LuoboLevel01(data);
	var scene = cc.Scene.create();
	scene.addChild(theLayer);
	return scene
};












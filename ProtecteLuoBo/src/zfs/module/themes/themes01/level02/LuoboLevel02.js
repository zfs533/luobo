/**
 * @zfs theme01 level2 2015/04/24
 */
var LuoboLevel02 = ccui.Layout.extend(
{
	/**
	 * 
	 * @param data
	 * {"isLocked":false,"monsterNum":15,"wave":"ss_waves_15.png","level":2}
	 */
	ctor:function(data)
	{
		this._super();
		this.variable(data);
		this.initLayer();
		this.zinit();
		this.getTopInfoInstance();
		this.addTools();
		this.addDoor();
		this.getRoadLine();
		this.addLuobo();
		this.shwoCanInstallSpace();
		this.controlShooring();
		this.initWeaponInstail();
		this.addTouchEventListener(this.touchLayerFunc, this);
	},
	variable:function(data)
	{
		this.data = data;
		this.data.monsterNum = data.num;
		this.tmxObArr = [];
		this.tmxObjArr = [];
		this.tmxPtArr = [];
		this.tmxTArr = [];
		this.tmxOGArr = [];
		this.toolArr = [];
		this.roadArr = [];
		this.weaponArr = [];
		this.monsterArr = [];
		this.rangeArr = [];
		this.bulletArr = [];
		this.luoboPro = null;
		this.topInfo = null;
		this.luobo = null;
		this.addRect = null;
		this.tempWeapon = null;
		this.weaponLayout = null;
		this.pointTemp = null;
		this.pointAnimate = null;
		this.selectedTarget = null;
		this.isShooting = true;
		this.isCleared = false;
		this.dispatchMonster = false;
		this.gameIsOver = false;
		this.monsterWave = this.data.monsterNum;
		this.currentMonsterCount = 0;
		
		cc.spriteFrameCache.addSpriteFrames("res/Themes/Theme1/BG2/BG-hd.plist");
		cc.spriteFrameCache.addSpriteFrames("res/Themes/Theme1/Items/Object01-hd.plist");
	},
	initLayer:function()
	{
		this.backgroundLayer = cc.Layer.create();
		this.addChild(this.backgroundLayer, 0);

		this.toolLayer = cc.Layer.create();
		this.addChild(this.toolLayer, 1);

		this.collisionLayer = cc.Layer.create();
		this.addChild(this.collisionLayer,15);

		this.topInfoLayer	= cc.Layer.create();
		this.addChild(this.topInfoLayer, 20);
	},
	//initailize scene
	zinit:function()
	{
		this.setSize(cc.size(Default.windowWidth(), Default.windowHeight()));
		var background = cc.Sprite.createWithSpriteFrameName("BG1.png");
		background.ignoreAnchorPointForPosition(true);
		this.backgroundLayer.addChild(background, 0);
		
		this.topInfo = new LuoboTopInfo(this.data, this);
		this.topInfoLayer.addChild(this.topInfo, 60);

		var path = cc.Sprite.createWithSpriteFrameName("Path.png");
		path.ignoreAnchorPointForPosition(true);
		this.backgroundLayer.addChild(path, 1);
		
		var tmxTiled = cc.TMXTiledMap.create("res/Themes/Theme1/BG2/BGPath.tmx");
		this.backgroundLayer.addChild(tmxTiled, 2);
		this.tmxObjectGroups = tmxTiled.getObjectGroup("PATH");//cc.TMXObjectGroup
		var tmxOGarr = this.tmxObjectGroups.getObjects();//array
		this.tmxOGArr = tmxOGarr;
		for ( var i = 0; i < tmxOGarr.length; i++)
		{
			//1Ob1
			var reg01 = /\dOb\d/;
			if ( tmxOGarr[i].name.match(reg01) )
			{
				this.tmxObArr.push(tmxOGarr[i]);
			}
			//Obj1
			var reg02 = /Obj\d/g;
			if ( tmxOGarr[i].name.match(reg02) )
			{
				this.tmxObjArr.push(tmxOGarr[i]);
			}
			//Pt1
			var reg03 = /PT\d/g;
			if ( tmxOGarr[i].name.match(reg03) )
			{
				this.tmxPtArr.push(tmxOGarr[i]);
			}
			//3T1
			var reg04 = /\dT\d/g;
			if ( tmxOGarr[i].name.match(reg04) )
			{
				this.tmxTArr.push(tmxOGarr[i]);
			}
		}
	},
	//install initailize weapon
	initWeaponInstail:function()//TODO
	{
		for ( var i = 0; i < this.tmxTArr.length; i++ )
		{
			var p = cc.p(this.tmxTArr[i].x, this.tmxTArr[i].y);
			var xx = Math.floor(p.x/80)*80 + 40;
			var yy = Math.floor(p.y/80)*80 + 40;
			var point = cc.p(xx, yy);
			var bottleWeapon = new LuoboBottleWeapon(PlayerData.weaponType, point, this);
			this.addChild(bottleWeapon.base, 30);
			this.addChild(bottleWeapon.firstb, 30);
			this.weaponArr.push(bottleWeapon);
		}
	},
	//the bloodBar for tools
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
	//install tools
	addTools:function()
	{
		for ( var i = 0; i < this.tmxObArr.length; i++ )
		{
			//normal yu zhou
			var reg01 = /3Ob\d/;
			if ( this.tmxObArr[i].name.match(reg01) )
			{
				var cloud01 = ccui.ImageView.create("cloud03.png", ccui.Widget.PLIST_TEXTURE);
				cloud01.x = this.tmxObArr[i].x + this.tmxObArr[i].width/2;
				cloud01.y = this.tmxObArr[i].y + this.tmxObArr[i].height/2;
				this.toolLayer.addChild(cloud01, 0);
				this.getToolBlood(cloud01);
			}
			//qi qiu
			var reg02 = /7Ob\d/;
			if ( this.tmxObArr[i].name.match(reg02) )
			{
				var cloud01 = ccui.ImageView.create("cloud07.png", ccui.Widget.PLIST_TEXTURE);
				cloud01.x = this.tmxObArr[i].x + this.tmxObArr[i].width/2;
				cloud01.y = this.tmxObArr[i].y + this.tmxObArr[i].height/2;
				this.toolLayer.addChild(cloud01, 0);
				this.getToolBlood(cloud01);
			}
			//cai hong
			var reg03 = /4Ob\d/;
			if ( this.tmxObArr[i].name.match(reg03) )
			{
				var cloud01 = ccui.ImageView.create("cloud04.png", ccui.Widget.PLIST_TEXTURE);
				cloud01.x = this.tmxObArr[i].x + this.tmxObArr[i].width/2;
				cloud01.y = this.tmxObArr[i].y + this.tmxObArr[i].height/2;
				this.toolLayer.addChild(cloud01, 0);
				this.getToolBlood(cloud01);
			}
			//small cloud
			var reg04 = /1Ob\d/;
			if ( this.tmxObArr[i].name.match(reg04) )
			{
				var cloud01 = ccui.ImageView.create("cloud01.png", ccui.Widget.PLIST_TEXTURE);
				cloud01.x = this.tmxObArr[i].x + this.tmxObArr[i].width/2;
				cloud01.y = this.tmxObArr[i].y + this.tmxObArr[i].height/2;
				this.toolLayer.addChild(cloud01, 0);
				this.getToolBlood(cloud01);
			}
			//red yu zhou
			var reg05 = /2Ob\d/;
			if ( this.tmxObArr[i].name.match(reg05) )
			{
				var cloud01 = ccui.ImageView.create("cloud02.png", ccui.Widget.PLIST_TEXTURE);
				cloud01.x = this.tmxObArr[i].x + this.tmxObArr[i].width/2;
				cloud01.y = this.tmxObArr[i].y + this.tmxObArr[i].height/2;
				this.toolLayer.addChild(cloud01, 0);
				this.getToolBlood(cloud01);
			}
			//song shu
			var reg06 = /6Ob\d/;
			if ( this.tmxObArr[i].name.match(reg06) )
			{
				var cloud01 = ccui.ImageView.create("cloud06.png", ccui.Widget.PLIST_TEXTURE);
				cloud01.x = this.tmxObArr[i].x + this.tmxObArr[i].width/2;
				cloud01.y = this.tmxObArr[i].y + this.tmxObArr[i].height/2;
				this.toolLayer.addChild(cloud01, 0);
				this.getToolBlood(cloud01);
			}
		}
		this.toolArr = this.toolLayer.getChildren();
		
		for ( var i = 0; i < this.toolArr.length; i++ )
		{
			this.toolArr[i].addTouchEventListener(this.toolLayerChildTouchFunc, this);
		}
	},
	// touch eventlistener for tool layer children
	toolLayerChildTouchFunc:function(target, state)
	{
		if ( state === ccui.Widget.TOUCH_ENDED )
		{
			this.handleRangeArray();
			if ( this.pointTemp )
			{
				if ( this.pointTemp != target )
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
	//getInstance for topInfo
	getTopInfoInstance:function()
	{
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
	},
	speedBtnTouchEvent:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			cc.log("speed");
		}
	},
	//control pause or play
	pauseBtnTouchEvent:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			cc.log("pause");
		}
	},
	//control coutinue or change level of game
	menuBtnTouchEvent:function(target, state)
	{
		if(state == ccui.Widget.TOUCH_ENDED)
		{
			cc.log("menubtn");
		}
	},
	addDoor:function()
	{
		var obj = this.tmxObjectGroups.getObject("2Ob1");
		var door = ccui.ImageView.create("start01.png", ccui.Widget.PLIST_TEXTURE);
		door.x = obj.x + obj.width/2;
		door.y = obj.y + obj.height*2;
		this.backgroundLayer.addChild(door, 1);
	},
	playArrowAnimate:function()
	{
		var obj = this.tmxObjectGroups.getObject("2Ob1");
		var arrow = new LuoboArrow(obj, this);
		arrow.type02();
		this.backgroundLayer.addChild(arrow, 10);
	},
	//get monster move lines point
	getRoadLine:function()
	{
		var gap = 40;
		for ( var i = 0; i < this.tmxPtArr.length; i++ )
		{
			this.roadArr.push(cc.p(this.tmxPtArr[i].x + gap,this.tmxPtArr[i].y - gap/2 ));
		}
	},
	//start set monster move
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
		monster.startMove02(1);
		this.monsterArr.push(monster);
		this.dispatchMonster = false;
		this.schedule(function()
		{
			var monster = new LuoboMonster(this);
			monster.playEnterAnimation();
			monster.startMove02(1);
			this.monsterArr.push(monster);
		}, 1, 4);
	},
	//luobo
	addLuobo:function()
	{
		var obj = this.tmxObjectGroups.getObject("PT7");
		this.luoboPro = new LuoboProtected(this);
		this.luobo = this.luoboPro.luobo;
		this.luobo.setPosition(obj.x - 30, obj.y + 10);
		this.addChild(this.luobo, 10);
	},
	//show the space that cound install weapon
	shwoCanInstallSpace:function()
	{
		var install = new LuoboInstallSpace(this.tmxObjArr);
		this.addChild(install, 1);
	},
	//control shooting frame rate
	controlShooring:function()
	{
		this.schedule(function()
		{
			this.isShooting = true;
		}, 0.5);
	},
	//touch eventlistener for this 
	touchLayerFunc:function(target, state)
	{
		if(state === ccui.Widget.TOUCH_ENDED)
		{
			var p = this.getTouchStartPos();
			var xx = Math.floor(p.x/80)*80 + 40;
			var yy = Math.floor(p.y/80)*80 + 40;
			//play luobo snake animation
			var rect = this.luobo.getBoundingBox();
			if ( cc.rectContainsPoint(rect, p) )
			{
				this.luobo.stopAllActions();
				this.luoboPro.playShakeAnimate();
				hidePointAnimation(this);
				this.hideWeaponLayout();
				hideAddWeaponAnimate(this);
				return;
			}
			
			//if touch the monster
			for ( var i = 0; i < this.monsterArr.length; i++ )
			{
				var rect1 = this.monsterArr[i].monster.getBoundingBox();
				if ( cc.rectContainsPoint(rect1, p) )
				{
					this.hideWeaponLayout();
					hidePointAnimation(this);
//					this.toolLayerChildTouchFunc(this.monsterArr[i].monster, 2);
					return;
				}
			}
			
			if ( this.addRect )
			{
				var recta = this.addRect.getBoundingBox();
				if ( cc.rectContainsPoint(recta, p) )
				{
					hideAddWeaponAnimate(this);
					this.hideWeaponLayout();
					return;
				}
			}
			//show add weapon animation
			for ( var i = 0; i < this.tmxOGArr.length; i++)
			{
				var rect2 = cc.rect(this.tmxOGArr[i].x, this.tmxOGArr[i].y, this.tmxOGArr[i].width, this.tmxOGArr[i].height);
				if ( cc.rectContainsPoint(rect2, p) )
				{
					getAddWeaponAnimate(cc.p(xx, yy), this);
					this.getWeaponLayout(cc.p(xx, yy));
					return;
				}
				else if ( i === this.tmxOGArr.length - 1 )
				{
					hideAddWeaponAnimate(this);
					getForbideAnimation(cc.p(xx, yy), this);
					this.hideWeaponLayout();
				}
			}
		}
	},
	getWeaponLayout:function( point )
	{
		point = this.handleWeaponPoint(point);
		if ( this.weaponLayout )
		{
			this.weaponLayout.refreshPosition(point);
			return;
		}
		this.weaponLayout = new LuoboWeaponPanel(this);
		this.weaponLayout.setPosition(point);
		this.addChild(this.weaponLayout, 60);
	},
	//touch and select weapon
	weaponLayoutEventFunc:function(target, state)
	{
		if ( state === ccui.Widget.TOUCH_ENDED )
		{
			this.hideWeaponLayout();
			this.installWeapon(target.name);
			hideAddWeaponAnimate(this);
		}
	},
	//install weapon 
	installWeapon:function( weaponName )
	{
		cc.log(weaponName);;
		if(weaponName == "bottle")
		{
			this.handleLuoboWeaponBottle();
		}
	},
	//create bottle weapon
	handleLuoboWeaponBottle:function()
	{
		if ( PlayerData.gold < 100 )
		{
			AlertView.show("金币不足");
			return;
		}
		var point = this.addRect.getPosition();
		getAirAnimateion(point, this);
		var bottleWeapon = new LuoboBottleWeapon(PlayerData.weaponType, point, this);
		this.addChild(bottleWeapon.base, 30);
		this.addChild(bottleWeapon.firstb, 30);
		this.weaponArr.push(bottleWeapon);
		PlayerData.gold -= bottleWeapon.value;
		this.showGoldNumber();
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
	//hide weapon layout
	hideWeaponLayout:function()
	{
		if(!this.weaponLayout){return;}
		this.weaponLayout.hidePanel();
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
			this.addChild(range, 50);
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
	registerScheduel:function()
	{
		this.scheduleUpdate();
	},
	update:function()
	{
		this.checkMonsAndLuoCollision();
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
	//check both the monster and the luobo collision
	checkMonsAndLuoCollision:function()
	{
		var rect1 = this.luobo.getBoundingBox();
		for ( var i = 0; i < this.monsterArr.length; i++ )
		{
			if ( !this.monsterArr[i].monster ){return;}
			var rect2 = this.monsterArr[i].monster.getBoundingBox();
			var p = this.monsterArr[i].monster.getPosition();
			if ( cc.rectContainsPoint(rect1, p) )
			{
				this.monsterArr[i].monster.removeFromParent();
				this.monsterArr.splice(i, 1);
				this.luoboPro.playInjuredAnimate();
			}
		}
	},
	//refresh the point animation position
	refreshPointAnimationPos:function()
	{
		if ( this.pointTemp )
		{
			getPointAnimate(this.pointTemp.getPosition(), this.pointTemp, this);
		}
	},
	//check is or not to shooting
	checkShooting:function()
	{
		if ( this.weaponArr && this.isShooting )
		{
			for ( var i = 0; i < this.weaponArr.length; i++ )
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
	//start rotate weapon.change the rotation
	startRotateWeapon:function(weapon)
	{
		for ( var i = 0; i < this.monsterArr.length; i++ )
		{
			var p1 = this.monsterArr[i].monster.getPosition();
			var p2 = weapon.firstb.getPosition();
			var distance = cc.pDistance(p1, p2);
			if ( distance <= getBottleData(weapon.type).radius )
			{
				break;
			}
		}
		if ( distance <= getBottleData(weapon.type).radius )
		{
			var angle = Math.atan2(p1.x-p2.x, p1.y-p2.y);
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
	//start shoot the currenttarget monster
	shooting:function(weapon, angle, weaponType)
	{
		this.isShooting = false;
		var bullet = weapon.createBullet(weaponType, angle, this);
		this.collisionLayer.addChild(bullet.buttle, 10);
		this.bulletArr.push(bullet.buttle);
	},
	//check bullet collision that with others
	checkBulletCollision:function()
	{
		if ( this.bulletArr )
		{
			for ( var i = 0; i < this.bulletArr.length; i++ )
			{
				if ( !this.bulletArr[i] ){return;}
				var angle = this.bulletArr[i].getRotation()/180*Math.PI;
				var speed = 5;
				this.bulletArr[i].y += Math.cos(angle)*speed;
				this.bulletArr[i].x += Math.sin(angle)*speed;
				if ( this.bulletArr[i].x < 0 || this.bulletArr[i].y < 0 || this.bulletArr[i].x > Default.windowWidth() || this.bulletArr[i].y > Default.windowHeight() )
				{
					this.bulletArr[i].removeFromParent();
					this.bulletArr.splice(i, 1);
				}
				//check collision both bullet and tools
				if ( this.selectedTarget )
				{
					var rect1 = this.selectedTarget.getBoundingBox();
					if ( !this.bulletArr[i] ){break;}
					var bp = this.bulletArr[i].getParent().convertToWorldSpace(this.bulletArr[i]);
					if ( cc.rectContainsPoint(rect1, bp) )
					{
						this.selectedTarget.blood.visible = true;
						this.selectedTarget.blood.setPercent(this.selectedTarget.blood.getPercent()-this.bulletArr[i].attack);
						if ( this.selectedTarget.blood.getPercent() <= 0 )
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
				for ( var j = 0; j < this.monsterArr.length; j++ )
				{
					if ( !this.monsterArr[j].monster || !this.bulletArr[i] ){return;}
					var rect2 = this.monsterArr[j].monster.getBoundingBox(),
					pp = this.bulletArr[i].getParent().convertToWorldSpace(this.bulletArr[i]);
					if ( cc.rectContainsPoint(rect2, pp) )
					{
						this.monsterArr[j].showBlood(this.bulletArr[i].attack);
						this.bulletArr[i].removeFromParent();
						this.bulletArr.splice(i, 1);
						if ( this.monsterArr[j].blood.getPercent() <= 0 )
						{
							getAirAnimateion(this.monsterArr[j].monster.getPosition(), this);
							PlayerData.gold += Math.floor(this.monsterArr[j].gold);
							this.showGoldNumber();
							if ( this.monsterArr[j].monster && this.pointTemp == this.monsterArr[j].monster )
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
	//
	checkClearFinish:function()
	{
		if ( this.toolArr.length === 0 && !this.isCleared )
		{
			var clear = new LuoboCleared();
			this.addChild(clear, 1000);
			this.isCleared = true;
		}
	},
	//进入结点
	onEnter:function()
	{
		this._super();
		if ( this.data.newW )
		{
			var newW = new LuoboGetNewWeapon(this.data.newW, this);
			this.addChild(newW, 100);
		}
		else
		{
			this.startGame();
		}
	},
	startGame:function()
	{
		var countDown = new LuoboCountDown(this);
		this.addChild(countDown, 100);
		this.playArrowAnimate();
	},
	//game is over
	overGame:function()
	{
		if ( this.currentMonsterCount < this.monsterWave )
		{
			var data = {id:this.data.id, wave:this.monsterWave, passWave:this.currentMonsterCount, 
					isWin:false,level:this.data.level, live:this.luoboPro.live, clear:this.isCleared};
		}
		else
		{
			var data = {id:this.data.id, wave:this.monsterWave, passWave:this.currentMonsterCount, 
					isWin:true,level:this.data.level, live:this.luoboPro.live, clear:this.isCleared};
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
			this.monsterArr.splice(i, 1);
		}
	},
	//离开完成
	onExit:function()
	{
		this._super();
		cc.spriteFrameCache.removeSpriteFramesFromFile("res/Themes/Theme1/BG2/BG-hd.plist");
		cc.spriteFrameCache.removeSpriteFramesFromFile("res/Themes/Theme1/Items/Object01-hd.plist");
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

LuoboLevel02.createScene = function(data)
{
	var theLayer = new LuoboLevel02(data);
	var scene = cc.Scene.create();
	scene.addChild(theLayer);
	return scene
};
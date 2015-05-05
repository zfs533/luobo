/**
 * zfs@ the themes pages component 	  2015/05/05
 */
var LuoboThemesPage = ccui.Layout.extend(
{
	/**
	 * 
	 * @param data
	 * {map:"ss_map10.png", locked:true, tower:"ss_towers_10.png", level:10, wave:"ss_waves_25.png", num:25}
	 */
	ctor:function(data, that)
	{
		this._super();
		this.that = that;
		this.setSize(cc.size(Default.windowWidth(), 440));
		this.getPageInstance(data);
	},
	getPageInstance:function(maps)
	{
		var map = ccui.ImageView.create(maps.map,ccui.Widget.PLIST_TEXTURE);
		this.isLocked = maps.locked;
		this.monsterNum = maps.num;
		this.wave = maps.wave;
		this.level = maps.level;
		map.setPosition(this.width/2, this.height/2);
		this.addChild(map, 5);

		var tower = ccui.ImageView.create(maps.tower,ccui.Widget.PLIST_TEXTURE);
		tower.setPosition(this.width/2, map.y - map.height/2-tower.height/2+10);
		this.addChild(tower, 5);

		if(this.isLocked)
		{
			var lockedIco = ccui.ImageView.create("ss_locked_icon.png", ccui.Widget.PLIST_TEXTURE);
			lockedIco.setPosition(map.x+130, lockedIco.height-30);
			lockedIco.addTouchEventListener(this.pageViewEventFunc, this);
			this.addChild(lockedIco, 5);
		}
		map.addTouchEventListener(this.pageViewEventFunc, this);
		tower.addTouchEventListener(this.pageViewEventFunc, this);
	},
	pageViewEventFunc:function(target,state)
	{

		switch (state) 
		{
		case ccui.Widget.TOUCH_BEGAN:
			cc.log("began")
			var lock = this.that.page.getPage((this.that.page.getCurPageIndex())).isLocked;
			this.that.waveNum.loadTexture(this.that.page.getPage((this.that.page.getCurPageIndex())).wave, ccui.Widget.PLIST_TEXTURE);
			this.that.jugementLevelState(!lock);
			break;

		case ccui.Widget.TOUCH_ENDED:
			var lock = this.that.page.getPage((this.that.page.getCurPageIndex()));
			if(lock.isLocked)
			{
				var theme01 = new LuoBoLockLayout("themes01");
				theme01.setPosition(this.that.width-theme01.width>>1,this.that.height-theme01.height>>1);
				this.that.addChild(theme01, 100);
			}
			else
			{
				this.that.gotoCurrentLevel(lock);
			}
			break;

		case ccui.Widget.TOUCH_CANCELED:
			break;

		default:
			break;
		}

	}
});



















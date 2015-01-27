/*
 *  2015/1/4
 */
var Default = 
{
	windowWidth:function()// window base width 
	{
		return 960;
	},
	windowHeight:function()// window base height 640
	{
		if(!Default._height)
		{
			Default._height = cc.director.getWinSize().height / Default.widowScale();
		}
		return 640;
	},
	widowScale:function()// window scale 
	{
		if(!Default._winscale)
		{
			Default._winscale = cc.director.getWinSize().width / Default.windowWidth();
		}
		return Default._winscale;
	},
	windowSize:function()// window size cc.size
	{
		var size = cc.size(Default.windowWidth(), Default.windowHeight());
		return size;
	},
	platform:function()// get platform number <string>
	{
		return cc.sys.os;
	}
};

function print(data)
{
	if(typeof data == "object")
	{
		cc.log(JSON.stringify(data));
	}
	else
	{
		cc.log(data);
	}
};

//change scene times, transition animation time
var changeSceneTime = 0.2;

//check date modules function
function typeOf(obj)
{
	if(!obj)
	{
		return (obj === null?"null":typeof(obj));
	}
	var str = obj.constructor.toString();
	var regexp = /\s\w*/;
	var objType = str.match(regexp);
	return objType;
};




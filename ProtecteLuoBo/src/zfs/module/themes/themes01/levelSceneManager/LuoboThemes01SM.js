/**
 * zfs@ theme01 scence manager	2015/04/24
 */
var Themes01LevelManager = {};

Themes01LevelManager.playLevel01 = function(lock)
{
	var level01 = LuoboLevel01.createScene(lock);
	cc.director.runScene(cc.TransitionProgressInOut.create(changeSceneTime, level01));
};

Themes01LevelManager.playLevel02 = function(lock)
{
	var level02 = LuoboLevel02.createScene(lock);
	cc.director.runScene(cc.TransitionProgressInOut.create(changeSceneTime, level02));
};

Themes01LevelManager.playLevel03 = function(lock)
{
	var level03 = LuoboLevel03.createScene(lock);
	cc.director.runScene(cc.TransitionProgressInOut.create(changeSceneTime, level03));
};


/**
 * 	怪物id	  怪物名称		怪物类型	怪物数量	怪物移动速度		怪物血量		怪物价格		怪物动画纹理1					怪物动画纹理1
 * {"id":1000,"name":1,"type":1,"num":7,"speed":1,"blood":100,"value":50,"texture1":"fly_yellow01.png","texture2":"fly_yellow02.png"}
 */
var MasterData = cc.loader.getRes("src/zfs/dataManager/data/monster.json");//主题一怪物配置

/**
 * 	炮台等级	炮台攻击范围		炮台升级价格	炮台卖出价格		炮台攻击范围纹理			炮台升级纹理						炮台升级纹理（金币不足）				炮台卖出纹理
 * {type:1, radius:120, up:180, sell:80, range:"range_80.png", upTexture:"upgrade_180.png",upTexture1:"upgrade_-180.png",sellTexture:"sell_80.png"},
 */
var BottleData = cc.loader.getRes("src/zfs/dataManager/data/bottle.json");//瓶子炮台配置
var RangeData = BottleData;
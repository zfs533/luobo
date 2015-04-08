var PlayerData = 
{
	weaponType:1,
	gold:1000
};

function getBottleData()
{
	for ( var i = 0;  i < RangeData.length; i++ )
	{
		if ( RangeData[i].type === PlayerData.weaponType )
		{
			return RangeData[i];
		}
	}
};
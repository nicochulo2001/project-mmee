var CheckLoreLine=function(target,mlc) {
        var loreContent = target.getItemInHand().getItemMeta().getLore();
        var loreTextVal = mlc.getString("loretext");
        loreTextVal = loreTextVal.replace(/<&sp>/g, ' ');
        loreTextVal = loreTextVal.replace(/<target.name>/g, target.getName());
        if(loreContent === null || loreContent.size() <= mlc.getString("lorenum")) {
                return false;
        }
	else {
                var loreLine = loreContent.get(mlc.getString("lorenum"))
                var detectedLoreLine = '"' + loreLine + '"'
		if(detectedLoreLine === loreTextVal) {
			return true;
                }
                else {
                        return false;
             	}
        }
        return false;
}

var ReplaceLoreLine=function(data,target,mlc) {
	var metaContent = target.getItemInHand().getItemMeta()
        var loreContent = metaContent.getLore();
	if(loreContent.size() > mlc.getString("lorenum")) {
		loreReplace = mlc.getString("loretext");
		loreReplace = loreReplace.replace(/<&sp>/g, ' ');
		loreReplace = loreReplace.substring(1,loreReplace.length - 1);
		loreContent[mlc.getString("lorenum")] = loreReplace;
		Bukkit.getServer().broadcastMessage(loreContent);
		metaContent.setLore(loreContent);
		target.getItemInHand().setItemMeta(metaContent);
		return true;
	}
}

var CompareLoreDate=function(target,mlc) {
	var metaContent = target.getItemInHand().getItemMeta();
        var loreContent = metaContent.getLore();
	var currentDate = new Date();
	var currentDateMs = currentDate.getTime();
	var itemDateSource = loreContent[0];
	var itemDate = new Date(itemDateSource);
	var itemDateMs = itemDate.getTime();
	var dateThreshold = mlc.getString("threshold");
	if(currentDateMs - dateThreshold > itemDateMs) {
		loreContent[0] = currentDate.toString();
		metaContent.setLore(loreContent);
		target.getItemInHand().setItemMeta(metaContent);
		return true;
	}
	else {
		return false;
	}	
}

var BasicAirCondition=function(target,mlc) {
	var airValue = target.getRemainingAir();
	var operation = mlc.getString("checktype");
	var airCheckValue = mlc.getString("checkvalue");
	switch (operation) {
		case '>':
			if(airValue > airCheckValue) {
				return true;
			}
			else {
				return false;
			}
			break;
		case '=':
			if(airValue == airCheckValue) {
				return true;
			}
			else {
				return false;
			}
			break;
		case '<':
			if(airValue < airCheckValue) {
				return true;
			}
			else {
				return false;
			}
			break;
		default:
			return false;
			break;
	}
}

var BasicHungerCondition=function(target,mlc) {
	var foodValue = target.getFoodValue();
	var operation = mlc.getString("checktype");
	var foodCheckValue = mlc.getString("checkvalue");
	switch (operation) {
		case '>':
			if(foodValue > foodCheckValue) {
				return true;
			}
			else {
				return false;
			}
			break;
		case '=':
			if(foodValue == foodCheckValue) {
				return true;
			}
			else {
				return false;
			}
			break;
		case '<':
			if(foodValue < foodCheckValue) {
				return true;
			}
			else {
				return false;
			}
			break;
		default:
			return false;
			break;
	}
}

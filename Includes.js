function slotParser(target,chosenslot) {
	switch (chosenslot) {
		case 'HAND':
			return target.getItemInHand();
			break;
		case 'OFFHAND':
			return target.getInventory().getItem(40);
			break;
		case 'HELMET':
			return target.getInventory().getItem(39);
			break;
		case 'CHESTPLATE':
			return target.getInventory().getItem(38);
			break;
		case 'LEGGINGS':
			return target.getInventory().getItem(37);
			break;
		case 'BOOTS':
			return target.getInventory().getItem(36);
			break;
		default:
			if(isNaN(chosenslot) !== true) { return target.getInventory().getItem(chosenslot); }
			else { return target.getItemInHand(); }
	}
}

function metadataGenerate(target,key,value) {
	try {
		var entityByBukkit = mythicmobs.worldManager.getEntity(target.getUniqueId());
		var metadataSet = entityByBukkit.setMetadata(key,value);
		return true;
	}
	catch(err) { }
}

function metadataReceive(target,key) {
	var entityByBukkit = mythicmobs.worldManager.getEntity(target.getUniqueId());
	return entityByBukkit.getMetadata(key);
}

var CheckLoreLine=function(target,mlc) {
	var baseContent = slotParser(target,mlc.getString("slot"));
        var loreContent = baseContent.getItemMeta().getLore();
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
	var baseContent = slotParser(target,mlc.getString("slot"));
	var metaContent = baseContent.getItemMeta();
        var loreContent = metaContent.getLore();
	if(loreContent.size() > mlc.getString("lorenum")) {
		loreReplace = mlc.getString("loretext");
		loreReplace = loreReplace.replace(/<&sp>/g, ' ');
		loreReplace = loreReplace.substring(1,loreReplace.length - 1);
		loreContent[mlc.getString("lorenum")] = loreReplace;
		metaContent.setLore(loreContent);
		baseContent.setItemMeta(metaContent);
		return true;
	}
}

var CompareLoreDate=function(target,mlc) {
	var baseContent = slotParser(target,mlc.getString("slot"));
	var metaContent = baseContent.getItemMeta();
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
		baseContent.setItemMeta(metaContent);
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
	var foodValue = target.getFoodLevel();
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

var GetCraftingInv=function(target,mlc) {
	var baseContent = target.getOpenInventory().getItem(mlc.getString("slot"));
	var metaContent = baseContent.getItemMeta();
	var materialVar = mlc.getString("material");
	var amountVar = mlc.getString("amount");
	var nameVar = mlc.getString("name");
	var materialContent = baseContent.getType();
	if(materialVar !== null) {
		if(materialContent != materialVar) { return false; };
	}
	if(amountVar !== null) {
		var amountContent = baseContent.getAmount();
		if(amountContent != amountVar) { return false; };
	}
	if(nameVar !== null) {
		if(metaContent === null) { return false; };
		if(metaContent.hasDisplayName() === false) { return false; };
		nameVar = nameVar.replace(/<&sp>/g, ' ');
		nameVar = nameVar.substring(1,nameVar.length - 1);
		var nameContent = metaContent.getDisplayName();
		if(nameContent != nameVar) { return false; };
	}
	return true;
}

var SetCraftingInv=function(data,target,mlc) {
	try {
		var baseMetaContent = mythicmobs.getItemManager().getItemStack(mlc.getString("material"));
		baseMetaContent.setAmount(mlc.getString("amount"));
		target.getOpenInventory().setItem(mlc.getString("slot"), baseMetaContent);
	}
	catch(err) { }
}

var SetItemColor=function(data,target,mlc) {
	var Color = org.bukkit.Color;
	var baseContent = slotParser(target,mlc.getString("slot"));
	var metaContent = baseContent.getItemMeta();
	var inputContent = mlc.getString("color");
	var redColor = parseInt(inputContent.substring(0,2), 16);
	var greenColor = parseInt(inputContent.substring(2,4), 16);
	var blueColor = parseInt(inputContent.substring(4,6), 16);
	metaContent.setColor(Color.fromRGB(redColor, greenColor, blueColor));
	baseContent.setItemMeta(metaContent);
	return true;
}

var EntityNearNamed=function(target,mlc) {
	var Nearby = target.getNearbyEntities(mlc.getString("radius"),mlc.getString("radius"),mlc.getString("radius"));
	if(mlc.getString("input") !== null) {
		var check = mlc.getString("input");
	}
	if(mlc.getString("inputM") !== null) {
		var check = metadataReceive(target,mlc.getString("inputM"));
	}
	for(i = 0; i < Nearby.length; i++) {
		if(Nearby[i].getName() === check) {
			if(mlc.getString("type") === null || mlc.getString("type") === String(Nearby[i].getType())) {
				Bukkit.getServer().broadcastMessage("Success");
				return true;
			}
		}
	}
	Bukkit.getServer().broadcastMessage("None Success");
	return false;
}

var SetEntityMetadataC=function(target,mlc) {
	try {
		var processedValue = mlc.getString("value");
		processedValue = processedValue.replace(/<&sp>/g, ' ');
		processedValue = processedValue.substring(1,processedValue.length - 1);
		var metadataSet = metadataGenerate(target,mlc.getString("key"),processedValue);
		return true;
	}
	catch(err) { }
}

var SetEntityMetadataS=function(data,target,mlc) {
	try {
		var processedValue = mlc.getString("value");
		processedValue = processedValue.replace(/<&sp>/g, ' ');
		processedValue = processedValue.substring(1,processedValue.length - 1);
		var metadataSet = metadataGenerate(target,mlc.getString("key"),processedValue);
		return true;
	}
	catch(err) { }
}

var RetrieveEntityMetadataC=function(target,mlc) {
	var metadataGet = metadataReceive(target,mlc.getString("key"));
	Bukkit.getServer().broadcastMessage(metadataGet.get());
	return true;
}

var RetrieveEntityMetadataS=function(data,target,mlc) {
	var metadataGet = metadataReceive(target,mlc.getString("key"));
	Bukkit.getServer().broadcastMessage(metadataGet.get());
	return true;
}

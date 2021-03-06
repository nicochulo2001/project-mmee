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

function dataretrieveParser(target,retrieve) {
	switch (retrieve) {
		case 'name':
			return target.getName();
			break;
		case 'type':
			return target.getType();
			break;
		case 'oxygen':
			return target.getRemainingAir();
			break;
		case 'hunger':
			return target.getFoodLevel();
			break;
		case 'date':
			return new Date();
			break;
		default:
			return "Not Found";
	}
}

var CheckLoreLine=function(target,mlc) {
	var baseContent = slotParser(target,mlc.getString("slot"));
	var loreContent = baseContent.getItemMeta().getLore();
	if(mlc.getString("loretext") !== null) {
		var loreTextVal = mlc.getString("loretext");
		loreTextVal = loreTextVal.replace(/<&sp>/g, ' ');
		loreTextVal = loreTextVal.substring(1,loreTextVal.length - 1);
	}
	else if(mlc.getString("loretextM") !== null) {
		var loreTextVal = metadataReceive(target,mlc.getString("loretextM"));
	}
	loreTextVal = loreTextVal.replace(/<target.name>/g, target.getName());
	if(loreContent === null || loreContent.size() <= mlc.getString("lorenum")) {
		return false;
	}
	else {
		var loreLine = loreContent.get(mlc.getString("lorenum"))
		if(loreLine === loreTextVal) {
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
		if(mlc.getString("loretext") !== null) {
			loreReplace = mlc.getString("loretext");
			loreReplace = loreReplace.replace(/<&sp>/g, ' ');
			loreReplace = loreReplace.substring(1,loreReplace.length - 1);
		}
		else if(mlc.getString("loretextM") !== null) {
			loreReplace = metadataReceive(target,mlc.getString("loretextM"));
		}
		loreContent[mlc.getString("lorenum")] = loreReplace;
		metaContent.setLore(loreContent);
		baseContent.setItemMeta(metaContent);
		return true;
	}
}

var AppendLoreLine=function(data,target,mlc) {
	var baseContent = slotParser(target,mlc.getString("slot"));
	var metaContent = baseContent.getItemMeta();
	var loreContent = metaContent.getLore();
	if(loreContent.size() > mlc.getString("lorenum")) {
		if(mlc.getString("loretext") !== null) {
			loreReplace = mlc.getString("loretext");
			loreReplace = loreReplace.replace(/<&sp>/g, ' ');
			loreReplace = loreReplace.substring(1,loreReplace.length - 1);
		}
		else if(mlc.getString("loretextM") !== null) {
			loreReplace = metadataReceive(target,mlc.getString("loretextM"));
		}
		loreContent[mlc.getString("lorenum")] = loreContent[mlc.getString("lorenum")] + loreReplace;
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

var BasicXPCondition=function(target,mlc) {
	var XPValue = target.getLevel();
	var operation = mlc.getString("checktype");
	var XPCheckValue = mlc.getString("checkvalue");
	switch (operation) {
		case '>':
			if(XPValue > XPCheckValue) {
				return true;
			}
			else {
				return false;
			}
			break;
		case '=':
			if(XPValue == XPCheckValue) {
				return true;
			}
			else {
				return false;
			}
			break;
		case '<':
			if(XPValue < XPCheckValue) {
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

var MetaToVariable=function(data,target,mlc) {
	var metadataGet = metadataReceive(target,mlc.getString("key"));
	var newVariable = data.variables.putString(mlc.getString("varname"), metadataGet);
}

var TransmuteItem=function(data,target,mlc) {
	var baseContent = target.getInventory();
	var invContent = baseContent.getContents();
	var transmuteAmount = mlc.getString("amount");
	var baseMaterial = mythicmobs.getItemManager().getItemStack(mlc.getString("base"));
	var transmuteMaterial = mythicmobs.getItemManager().getItemStack(mlc.getString("result"));
	transmuteMaterial.setAmount(transmuteAmount);
	for(i = 0; i < invContent.length; i++) {
		if(invContent[i] !== null && invContent[i].isSimilar(baseMaterial)) {
			var matchAmount = invContent[i].getAmount();
			if(matchAmount - transmuteAmount >= 0) {
				invContent[i].setAmount(matchAmount - transmuteAmount);
				baseContent.setItem(i, invContent[i]);
				baseContent.addItem(transmuteMaterial);
				return true;
			}
		}
	}
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
				return true;
			}
		}
	}
	return false;
}

var CheckItemNear=function(target,mlc) {
	var Nearby = target.getNearbyEntities(mlc.getString("radius"),mlc.getString("radius"),mlc.getString("radius"));
	var check = mlc.getString("material");
	var checkAmount = mlc.getString("amount");
	for(i = 0; i < Nearby.length; i++) {
		if(String(Nearby[i].getType()) === "DROPPED_ITEM") {
			var materialType = Nearby[i].getItemStack().getType();
			var matchStack = Nearby[i].getItemStack();
			var checkStack = mythicmobs.getItemManager().getItemStack(check);
			checkStack.setAmount(checkAmount);
			if((String(materialType) === check && matchStack.getAmount() === parseInt(checkAmount)) || checkStack.equals(matchStack)) {
				return true;
			}
		}
	}
	return false;
}

var DeleteItemNear=function(data,target,mlc) {
	var Nearby = target.getNearbyEntities(mlc.getString("radius"),mlc.getString("radius"),mlc.getString("radius"));
	var check = mlc.getString("material");
	var checkAmount = mlc.getString("amount");
	for(i = 0; i < Nearby.length; i++) {
		if(String(Nearby[i].getType()) === "DROPPED_ITEM") {
			var materialType = Nearby[i].getItemStack().getType();
			var matchStack = Nearby[i].getItemStack();
			var checkStack = mythicmobs.getItemManager().getItemStack(check);
			checkStack.setAmount(checkAmount);
			if((String(materialType) === check && matchStack.getAmount() === parseInt(checkAmount)) || checkStack.equals(matchStack)) {
				matchStack.setAmount(0);
				return true;
			}
		}
	}
	return false;
}

var CheckLoreLength=function(target,mlc) {
	var operation = mlc.getString("checktype");
	var baseContent = slotParser(target,mlc.getString("slot"));
	var metaContent = baseContent.getItemMeta();
	var loreContent = metaContent.getLore();
	var loreCheckSize = mlc.getString("checkvalue");
	if(loreContent === null) {
		var loreSize = 0;
	}
	else {
		var loreSize = loreContent.size();
	}
	switch (operation) {
		case '>':
			if(loreSize > loreCheckSize) {
				return true;
			}
			else {
				return false;
			}
			break;
		case '=':
			if(loreSize == loreCheckSize) {
				return true;
			}
			else {
				return false;
			}
			break;
		case '<':
			if(loreSize < loreCheckSize) {
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

var CompareEntityMetas=function(target,mlc) {
	var firstMeta = metadataReceive(target,mlc.getString("key1"));
	var secondMeta = metadataReceive(target,mlc.getString("key2"));
	Bukkit.getServer().broadcastMessage(firstMeta);
	Bukkit.getServer().broadcastMessage(secondMeta);
	if(String(firstMeta) === String(secondMeta)) {
		return true;
	}
	else {
		return false;
	}
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

var RemoveLoreLineStringS=function(data,target,mlc) {
	var baseContent = slotParser(target,mlc.getString("slot"));
	var loreContent = baseContent.getItemMeta().getLore();
	var loreHay = mlc.getString("loretext");
	loreHay = loreHay.replace(/<&sp>/g, ' ');
	loreHay = loreHay.substring(1,loreHay.length - 1);
	Bukkit.getServer().broadcastMessage(loreHay);
	if(loreContent === null || loreContent.size() <= mlc.getString("lorenum")) {
		return false;
	}
	else {
		var loreLine = loreContent.get(mlc.getString("lorenum"));
		if(loreLine.contains(loreHay)) {
			loreLine = loreLine.replace(loreHay,'');
			var metadataSet = metadataGenerate(target,mlc.getString("key"),loreLine);
			return true;
		}
		else {
			return false;
		}
	}
	return false;
}

var RemoveLoreLineStringC=function(target,mlc) {
	var baseContent = slotParser(target,mlc.getString("slot"));
	var loreContent = baseContent.getItemMeta().getLore();
	var loreHay = mlc.getString("loretext");
	loreHay = loreHay.replace(/<&sp>/g, ' ');
	loreHay = loreHay.substring(1,loreHay.length - 1);
	if(loreContent === null || loreContent.size() <= mlc.getString("lorenum")) {
		return false;
	}
	else {
		var loreLine = loreContent.get(mlc.getString("lorenum"));
		if(loreLine.contains(loreHay)) {
			loreLine = loreLine.replace(loreHay,'');
			var metadataSet = metadataGenerate(target,mlc.getString("key"),loreLine);
			return true;
		}
		else {
			return false;
		}
	}
	return false;
}

var RetrieveAsMetaS=function(data,target,mlc) {
	var retrieveContent = dataretrieveParser(target,mlc.getString("retrieve"));
	var metadataSet = metadataGenerate(target,mlc.getString("key"),retrieveContent);
	return true;
}

var RetrieveAsMetaC=function(target,mlc) {
	var retrieveContent = dataretrieveParser(target,mlc.getString("retrieve"));
	var metadataSet = metadataGenerate(target,mlc.getString("key"),retrieveContent);
	return true;
}

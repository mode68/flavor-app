export const copyObject = (obj) => {
	let updatedObj = null;
	if (obj instanceof Array) {
		updatedObj = [...obj];
	} else if (obj instanceof Object) {
		updatedObj = { ...obj };
	} else if (obj instanceof Date) {
		let dateCopy = new Date();
		dateCopy.setTime(obj.getTime());
		return dateCopy;
	} else {
		return obj;
	}
	const props = Object.keys(updatedObj);
	for (let i = 0; i < props.length; i++) {
		updatedObj[props[i]] = copyObject(updatedObj[props[i]]);
	}
	return updatedObj;
};

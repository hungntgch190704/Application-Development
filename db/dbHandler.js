function checkExisted(collection_name, name) {
    const result = collection_name.findOne({name: name});
    
    return result;
    //return result != null;
}

module.exports = {checkExisted}
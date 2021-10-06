const Region = function (
    id, name
){
    this.id = id;
    this.gouvernerat = name;
}

Region.fromJson = ( object ) =>{
    return new Region(
        object["$"]["value"],
        object["_"],
    )
}


module.exports = { Region }
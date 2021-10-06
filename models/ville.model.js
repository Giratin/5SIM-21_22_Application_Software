
const Ville = function (id,name){
    this.id = id;
    this.ville = name;
}

Ville.fromJson = (object) => {
    return new Ville( object["$"]["value"], object["_"] );
} 

module.exports = { Ville }
/**
 * Function for getting the valid trash types
 * @returns {Array<TrashType>} - All valid trash types
 */
export function getTrashTypes() {
  return [
    new TrashType("bag", "bag of trash", 1, require("../../../assets/trashTypesImages/bittrashbag.png")),
    new TrashType("battery", "battery", 0.2, require("../../../assets/trashTypesImages/bitbattery.jpg")),
    new TrashType("cigarette", "cigarette butt", 0.02, require("../../../assets/trashTypesImages/bitcigarette.jpg")),
    new TrashType("candyWrapper", "candy wrapper", 0.02, require("../../../assets/trashTypesImages/bitcandywrapper.png")),
    new TrashType("metalCan", "metal can", 0.1, require("../../../assets/trashTypesImages/bitmetalcan.png")),
  ];
}

/**
 * Constructor for objects representing a type of trash the user can collect
 */
function TrashType(id, name, value, image) {
  this.id = id;
  this.name = name;
  this.value = value;
  this.image = image;
}

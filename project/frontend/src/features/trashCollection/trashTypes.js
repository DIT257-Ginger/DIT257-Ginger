
/**
 * Function for getting the valid trash types
 * @returns {Array<TrashType>} - All valid trash types 
 */
export function getTrashTypes() {
  return [  
    new TrashType("bag", "bag of trash", 1),
    new TrashType("battery", "battery", 0.2),
    new TrashType("cigarette", "cigarette butt", 0.02),
    new TrashType("candyWrapper", "candy wrapper", 0.02),
    new TrashType("metalCan", "metal can", 0)
  ]
}

/**
 * Constructor for trash type objects
 */
function TrashType(id, name, value) {
  this.id = id;
  this.name = name;
  this.value = value;
}
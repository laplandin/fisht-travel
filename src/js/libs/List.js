class List {
  constructor () {
    this.listSize = 0;
    this.pos = 0;
    this.dataStorage = [];
  }

  clear () {
    delete this.dataStorage;
    this.dataStorage = [];
    this.listSize = this.pos = 0;
  }

  find (element) {
    for (let i = 0; i < this.dataStorage.length; i++) {
      if (this.dataStorage[i] === element) {
        return i;
      }
    }
    return -1;
  }

  // EDIT LIST

  remove (element) {
    let foundAt = this.find(element);
    if (foundAt > -1) {
      this.dataStorage.splice(foundAt, 1);
      --this.listSize;
      return true;
    }
    return false;
  }

  get length () {
    return this.listSize;
  }

  toString () {
    return this.dataStorage;
  }

  insertAfterElement (element, after) {
    let insertPos = this.find(after);
    if (insertPos > -1) {
      this.dataStorage.splice(insertPos + 1, 0, element);
      ++this.listSize;
      return true;
    }
    return false;
  }

  insertAfterIndex (element, index) {
    this.dataStorage.splice(index, 0, element);
  }

  append (element) {
    this.dataStorage[this.listSize++] = element;
  }

  prepend (element) {
    this.dataStorage.unshift(element);
    --this.listSize;
  }

  // TRAVERSING LIST

  front () {
    this.pos = 0;
  }

  end () {
    this.pos = this.listSize -1;
  }

  prev () {
    if (this.pos > 0) {
      --this.pos;
    }
  }
  next () {
    if (this.pos < this.listSize -1) {
      ++this.pos;
    }
  }

  get currentPos () {
    return this.pos;
  }

  moveTo (position) {
    this.pos = position;
  }

  getElement () {
    return this.dataStorage[this.pos];
  }
}

module.exports = List;

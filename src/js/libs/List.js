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

  removeTail () {
    return this.dataStorage.splice(this.pos);
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
    return this;
  }

  prepend (element) {
    this.dataStorage.unshift(element);
    --this.listSize;
    return this;
  }

  // TRAVERSING LIST

  front () {
    this.pos = 0;
    return this;
  }

  end () {
    this.pos = this.listSize -1;
    return this;
  }

  prev () {
    if (this.pos > 0) {
      --this.pos;
    }
    return this;
  }
  next () {
    if (this.pos < this.listSize -1) {
      ++this.pos;
    }
    return this;
  }

  get currentPos () {
    return this.pos;
  }

  moveTo (position) {
    this.pos = position;
    return this;
  }

  get currentElement () {
    return this.dataStorage[this.pos];
  }
}

module.exports = List;

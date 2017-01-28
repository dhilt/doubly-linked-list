const Node = require('./node');

Number.isInteger = Number.isInteger || function(value) {
    return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};

class LinkedList {
    // assign 0 to this.length
    constructor() {
        this.clear();
    }

    isValidIndex(index) {
        return this.length && Number.isInteger(index) && index >= 0 && index < this.length;
    }

    // should assign any nodes to this._head and this._tail if list is empty
    append(data) {
        let node = new Node(data);

        if (this.length) {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        } else {
            this._head = node;
            this._tail = node;
        }

        this.length++;

        return this;
    }

    // should return data from the this.head
    head() {
        return this._head ? this._head.data : this._head;
    }

    // should return data from the this.tail
    tail() {
        return this._tail ? this._tail.data : this._tail;
    }

    // should return Node.data by index
    at(index, data) {
        if (!this.isValidIndex(index)) {
            console.log('error at');
            return;
        }

        let node = this._head;

        for (let i = 0; i < index; i++) {
            node = node.next;
        }

        return !data ? node.data : node;
    }

    // should insert data by index
    insertAt(index, data) {
        if (!this.isValidIndex(index)) {
            console.log('error insertAt');
            return;
        }

        let node = this.at(index, true);

        node.data = data;

        return node.data;
    }

    // should return true if list is empty
    isEmpty() {
        return !this.length;
    }

    // should clear the list
    clear() {
        this.length = 0;
        this._head = null;
        this._tail = null;

        return this;
    }

    // should delete element by index
    deleteAt(index) {
        if (!this.isValidIndex(index)) {
            console.log('error deleteAt');
            return;
        }

        let nodeToDelete = this.at(index, true);

        if (nodeToDelete.prev) {
            if (nodeToDelete.next) {
                nodeToDelete.prev.next = nodeToDelete.next;
            } else {
                this._tail = nodeToDelete.prev;
                nodeToDelete.prev.next = null;
            }
        }

        if (nodeToDelete.next) {
            if (nodeToDelete.prev) {
                nodeToDelete.next.prev = nodeToDelete.prev;
            } else {
                this._head = nodeToDelete.next;
                nodeToDelete.next.prev = null;
            }
        }

        this.length--;

        return this;
    }

    // should reverse the list
    reverse() {
        let newList = new LinkedList();

        for(let i = 0, node = this._tail; i < this.length; i++) {
            newList.append(node.data);
            node = node.prev;
        }

        this._head = newList._head;
        this._tail = newList._tail;

        return this;
    }

    // should return index of element if data is found
    indexOf(data) {
        for (let i = 0; i < this.length; i++) {
            if (this.at(i) === data) {
                return i;
            }
        }

        return -1;
    }
}

module.exports = LinkedList;

const Node = require('./node');

class LinkedList {
    // assign 0 to this.length
    constructor() {
        this.length = 0;
        this._head = null;
        this._tail = null;
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
        let node = this._head;

        if (this.length === 0 || index < 0 || index > this.length) {
            console.log('error at');

            return;
        }

        for (let i = 0; i < index; i++) {
            node = node.next;
        }

        return !data ? node.data : node;
    }

    // should insert data by index
    insertAt(index, data) {
        if (!this.length) {
            return;
        }

        let node = this.at(index, true);

        node.data = data;

        return node.data;
    }

    // should return true if list is empty
    isEmpty() {
        return this.length ? false : true;
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
        let nodeToDelete = this.at(index, true);

        if (this.length == 0) {
            console.log('deleteAt error');
            return;
        }

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
        this._head = this._tail;
        this._head.next = this._head.prev;
        this._head.prev = null;

        for (let i = 1; i < this.length; i++) {
            let node = this.at(i, true)

            if (node.prev) {
                let nextNode = node.next;
                node.next = node.prev;
                node.prev = nextNode;
            } else {
                node.prev = node.next;
                node.next = null;
                this._tail = node;
            }
        }

        return this;
    }

    // should return index of element if data is found
    indexOf(data) {
        let index = -1;

        for (let i = 0; i < this.length; i++) {
            if (this.at(i) == data) {
                index = i;
                break;
            }
        }

        return index;
    }
}

module.exports = LinkedList;

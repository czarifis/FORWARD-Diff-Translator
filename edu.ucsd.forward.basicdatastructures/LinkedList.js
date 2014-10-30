"use strict";
/**
 * Created by Costas Zarifis on 10/29/14.
 */

/*
 * Utility methods
 */

function assert(condition, message) {
    if (!condition) {
        throw message;
    }
}

function assertDefined(x) {
    assert((x !== undefined),'Undefined value');
}

function assertNonNull(x) {
    assert((x !== undefined && x !== null),x+' is either undefined or null');
}

function assertType(x, type) {
    assert((typeof(x) === type),'Incorrect type of object:'+x+' it should be a '+type+' but it\'s a '+typeof(x));
}

function assertNumber(x) {
    assertNonNull(x);
    assertType(x, 'number');
}

function assertObject(x) {
    assertNonNull(x);
    assertType(x, 'object');
}



/*
 * This defines the doubly linked list node
 */

function LinkedListNode() {
    this.id = null;
    this.data = null;
    this.next = null;
    // this.annotation = null; // Not sure if we have to keep annotations at this level...
    this.previous = null;
}

/*
 * This defines the doubly linked list
 */

function LinkedList() {

    // Head of list
    this.head = null;

    // Tail of list
    this.tail = null;

    // size of list
    this.size = 0;

}

// ################################## //
// functions supported by Linked List //


// Return the size of the linked list

LinkedList.prototype.getLength = function(){
    return this.size;
};

// Return the size of the linked list
LinkedList.prototype.getSize = function(){
    return this.size;
};


// Pushes a node with the given data at the end of this linked list
LinkedList.prototype.pushData = function(data){

    // asserting...
    assertDefined(data);
    assertNonNull(data);
    assertObject(data);
    assert(data.hasOwnProperty('id'),'data does not have property: id');


    // check performed... Let's create a node and push it to the linked list

    var newNode = new LinkedListNode();
    newNode.data = data;
    newNode.id = data.id;
    newNode.next = null;
    newNode.previous = null;
    this.size++;
    if(this.head===null){
        this.head = newNode;
        this.tail = newNode;
    }
    else{
        this.tail.next = newNode;
        newNode.previous = this.tail;
        this.tail = newNode;
    }

};

// Inserts a node into the linked list right before the node with id: soonToBeNextID
LinkedList.prototype.addDataBeforeID = function(soonToBeNextID, data){

    //asserting

    assertDefined(data);
    assertNonNull(data);
    assertObject(data);
    assertDefined(soonToBeNextID);
    assertNonNull(soonToBeNextID);
    assertNumber(soonToBeNextID);
    assert(data.hasOwnProperty('id'),'data does not have property: id');


    // check performed... Let's add data before node with id: soonToBeNextID
    var newNode = new LinkedListNode();
    newNode.data = data;
    newNode.id = data.id;

    // Linked List is empty so there is no such ID
    if(this.head===null){
        return undefined;
    }

    var nextNode = this.searchForID(soonToBeNextID);

    // Checking if there is no node with the given ID
    if(nextNode===null){
        return undefined;
    }
    newNode.next = nextNode;

    // Our new node is gonna be at the beginning of the list
    if(nextNode.previous!==null) {
        nextNode.previous.next = newNode;
    }
    else{
        this.head = newNode;

    }
    newNode.previous = nextNode.previous;
    nextNode.previous = newNode;
    this.size++;
};

// Inserts a node into the linked list right after the node with id: soonToBePrevID
LinkedList.prototype.addDataAfterID = function(soonToBePrevID, data){

    //asserting

    assertDefined(data);
    assertNonNull(data);
    assertObject(data);
    assertDefined(soonToBePrevID);
    assertNonNull(soonToBePrevID);
    assertNumber(soonToBePrevID);
    assert(data.hasOwnProperty('id'),'data does not have property: id');

    // check performed... Let's add data after node with id: soonToBePrevID
    var newNode = new LinkedListNode();
    newNode.data = data;
    newNode.id = data.id;

    // Linked List is empty so there is no such ID
    if(this.head===null) {
        return undefined;
    }

    var prevNode = this.searchForID(soonToBePrevID);

    // Checking if there is no node with the given ID
    if(prevNode===null){
        return undefined;
    }

    newNode.previous = prevNode;
    prevNode.next.previous = newNode;
    newNode.next = prevNode.next;
    prevNode.next = newNode;

    this.size++;

};


// Delete a node with a specific ID from the linked list
LinkedList.prototype.addDataAfterID = function(delID) {
    assertDefined(delID);
    assertNonNull(delID);
    assertNumber(delID);

    //checking if linked list is empty
    if(this.head===null){
        return undefined;
    }


    var aboutToGetDeleted = this.searchForID(delID);

    // Checking if there is no node with the given ID
    if(aboutToGetDeleted===null){
        return undefined;
    }
    if(this.size===1){
        this.head=null;
        this.tail=null;
        this.size=null;
        return;
    }





};










/**
 * IT WOULD BE OPTIMAL O(1) IF WE HAD A HASHMAP[ID]->NODE INSTEAD...
 * @param givenID
 * @returns {null|*}
 */
// Searches for node with a given ID
LinkedList.prototype.searchForID = function(givenID){

    //asserting

    assertDefined(givenID);
    assertNonNull(givenID);
    assertNumber(givenID);


    var curr = this.head;
    while(curr !== null){
        if(curr.id==givenID){
            console.log('Found it!');
            return curr;
        }
        curr = curr.next;
    }
    return null;

};



// Prints the whole linked list
LinkedList.prototype.printLinkedList = function(){
    var curr = this.head;

    console.log('length is:'+this.getLength());
    while(curr !== null){
        console.log('curr:',curr);
        curr = curr.next
    }
};




// ##### Don't mind us we're just a previous version #####

//    // ################################## //
//    // functions supported by Linked List //
//
//
//    // Return the size of the linked list
//    this.getLength = function(){
//      return this.size;
//    };
//
//    // Return the size of the linked list
//    this.getSize = function(){
//        return this.size;
//    };
//
//    // Pushes a node with the given data at the end of this linked list
//    this.pushData = function(data){
//
//        // asserting...
//        assertDefined(data);
//        assertNonNull(data);
//        assertObject(data);
//
//        // check performed...
//
//        var newNode = new LinkedListNode();
//        newNode.data = data;
//        newNode.id = data.id;
//
//        newNode.next = null;
//        newNode.previous = null;
//        this.size++;
//        if(this.head==null){
//            this.head = newNode;
//            this.tail = newNode;
//        }
//        else{
//            this.tail.next = newNode;
//            newNode.previous = this.tail;
//            this.tail = newNode;
//        }
//
//    };
//
//    this.addDataBeforeID = function(soonToBeNextID, data){
//
//        //asserting
//
//        assertDefined(data);
//        assertNonNull(data);
//        assertObject(data);
//        assertDefined(soonToBeNextID);
//        assertNonNull(soonToBeNextID);
//        assertNumber(soonToBeNextID);
//
//
//        // check performed...
//        var newNode = new LinkedListNode();
//        newNode.data = data;
//        newNode.id = data.id;
//
//        // Linked List is empty so there is no such ID
//        if(this.head==null){
//            return undefined;
//        }
//
//        var nextNode = this.searchForID(soonToBeNextID);
//        newNode.next = nextNode;
//        nextNode.previous.next = newNode;
//        newNode.previous = nextNode.previous;
//        nextNode.previous = newNode;
//        this.size++;
//
//
//    };
//
//
//
//    // searches for a given ID within this linked list
//    this.searchForID = function(givenID){
//
//        //asserting
//
//        assertDefined(givenID);
//        assertNonNull(givenID);
//        assertNumber(givenID);
//
//
//        var curr = this.head;
//        while(curr != null){
//            if(curr.id==givenID){
//                console.log('Found it!');
//                return curr;
//            }
//            curr = curr.next;
//        }
//
//    };
//
//
//    // prints every node that exists in this linked list
//    this.printLinkedList = function(){
//        var curr = this.head;
//
//        while(curr != null){
//            console.log('curr:',curr);
//            curr = curr.next
//        }
//
//    };

//
//
//}
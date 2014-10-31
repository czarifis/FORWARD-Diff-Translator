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
    assert((x !== null),'Value is null');
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

    // The ID of a node is the same as the id of the data(treeNode) that is getting hung under it
    this.id = null;

    // Will be used to hang the treeNode
    this.data = null;

    // next sibling
    this.next = null;

    // previous sibling
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

    this.llHashTable = new LLHashTable();

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
    if(newNode.data.id!==null) // check if primitive
        this.llHashTable.add(newNode);

};

// Inserts a node into the linked list right before the node with id: nextID
LinkedList.prototype.addDataBeforeID = function(nextID, data){

    //asserting

    assertDefined(data);
    assertNonNull(data);
    assertObject(data);
    assertDefined(nextID);
    assertNonNull(nextID);
    assertNumber(nextID);
    assert(data.hasOwnProperty('id'),'data does not have property: id');


    // check performed... Let's add data before node with id: nextID
    var newNode = new LinkedListNode();
    newNode.data = data;
    newNode.id = data.id;

    // Linked List is empty so there is no such ID
    if(this.head===null){
        throw 'Linked list is empty so given ID could not be found'
    }

    var nextNode = this.searchForID(nextID);

    // Checking if there is no node with the given ID
    if(nextNode===null){
        throw 'Given ID was not found';
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

    this.llHashTable.add(newNode);
};

// Inserts a node into the linked list right after the node with id: prevID
LinkedList.prototype.addDataAfterID = function(prevID, data){

    //asserting

    assertDefined(data);
    assertNonNull(data);
    assertObject(data);
    assertDefined(prevID);
    assertNonNull(prevID);
    assertNumber(prevID);
    assert(data.hasOwnProperty('id'),'data does not have property: id');

    // check performed... Let's add data after node with id: prevID
    var newNode = new LinkedListNode();
    newNode.data = data;
    newNode.id = data.id;

    // Linked List is empty so there is no such ID
    if(this.head===null) {
        throw 'Linked list is empty so given ID could not be found';
    }

    var prevNode = this.searchForID(prevID);

    // Checking if there is no node with the given ID
    if(prevNode===null){
        throw 'Given ID was not found';
    }

    newNode.previous = prevNode;

    // If this is the last element update the Linked list's tail.
    if(prevNode.next!==null)
        prevNode.next.previous = newNode;
    else
        this.tail=newNode;
    newNode.next = prevNode.next;
    prevNode.next = newNode;


    this.size++;

    this.llHashTable.add(newNode);

};


// Delete a node with a specific ID from the linked list
LinkedList.prototype.delDataWithID = function(delID) {
    assertDefined(delID);
    assertNonNull(delID);
    assertNumber(delID);

    //checking if linked list is empty
    if(this.head===null){
        throw 'Linked list is empty so given ID could not be found';
    }

    var deletedNode = this.searchForID(delID);

    // Checking if there is no node with the given ID
    if(deletedNode===null){
        throw 'Given ID could not be found';
    }
    if(this.size===1){
        deletedNode.data = null;
        deletedNode.id =null;
        this.head=null;
        this.tail=null;
        this.size--;
        return;
    }

    // deleting element from the head
    if(this.head.id===deletedNode.id){
        deletedNode.data = null;
        deletedNode.id = null;
        this.head = deletedNode.next;
        deletedNode.next.previous=null;
        deletedNode.next = null;

    }else if(this.tail.id===deletedNode.id){ // deleting element from the tail
        deletedNode.data = null;
        deletedNode.id = null;
        this.tail = deletedNode.previous;
        deletedNode.previous.next = null;
        deletedNode.previous = null;

    }else{ // deleting an intermediate element
        deletedNode.previous.next = deletedNode.next;
        deletedNode.next.previous = deletedNode.previous;

        deletedNode.id = null;
        deletedNode.data = null;
        deletedNode.next = null;
        deletedNode.previous=null;
    }
    this.llHashTable.remove(delID);
    this.size--;



};


// returns the I'th element
LinkedList.prototype.get = function(i){

    if(i>=this.size){
        throw 'Index out of bounds'
    }

    var counter = 0;

    var curr = this.head;
    while(curr !== null){
        if(counter==i){
//            console.log('Found it!');
            return curr;
        }
        counter++;
        curr = curr.next;
    }
    return null;

};






// Searches for node with a given ID
LinkedList.prototype.searchForID = function(givenID){

    //asserting

    assertDefined(givenID);
    assertNonNull(givenID);
    assertNumber(givenID);

    console.log('Yay searched linked list node using the LinkedListHastTable');
    return this.llHashTable.get(givenID);

//
//    var curr = this.head;
//    while(curr !== null){
//        if(curr.id==givenID){
//            console.log('Found it!');
//            return curr;
//        }
//        curr = curr.next;
//    }
//    return null;

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
//    this.addDataBeforeID = function(nextID, data){
//
//        //asserting
//
//        assertDefined(data);
//        assertNonNull(data);
//        assertObject(data);
//        assertDefined(nextID);
//        assertNonNull(nextID);
//        assertNumber(nextID);
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
//        var nextNode = this.searchForID(nextID);
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
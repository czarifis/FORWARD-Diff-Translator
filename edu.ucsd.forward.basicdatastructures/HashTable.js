/**
 * Created by Costas Zarifis on 10/29/14.
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
 * HashTable Class
 */

function HashTable() {
    this.m_table = {};
}

HashTable.prototype.getVal = function(key) {
    assertNonNull(key);
    assertDefined(key);
    assertNumber(key);
    if (this.m_table.hasOwnProperty(key)) {
        return this.m_table[key];
    } else {
        return null;
    }
};

HashTable.prototype.addVal = function(key, value) {
    assertNonNull(key);
    assertDefined(key);
    assertNumber(key);
    assertNonNull(value);
    assertDefined(value);
    this.m_table[key] = value;
};

HashTable.prototype.removeKey = function(key) {
    assertNonNull(key);
    assert(this.m_table.hasOwnProperty(key));
    delete this.m_table[key];
};

/*
 * Linked List Hash Table Class
 */

function LLHashTable(){
    HashTable.call(this);
}

LLHashTable.prototype = new HashTable();

LLHashTable.prototype.get = function(id){
    assertNumber(id);

    return this.getVal(id);
};

LLHashTable.prototype.add = function(listNode){
    assertObject(listNode);
//    assertNumber(listNode.id);
    assertDefined(listNode.data);
    assertNonNull(listNode.data);
    assertObject(listNode.data);
    assertDefined(listNode.next);
    assertDefined(listNode.previous);


    // it might be a an internal object without an id
    if(listNode.id!==undefined)
        this.addVal(listNode.id, listNode);
};

LLHashTable.prototype.remove = function(id){
    assertDefined(id);
    assertNonNull(id);
    assertNumber(id);
    this.removeKey(id);

};


/*
 * Tree Hash Table Class
 *
 * Might need to get changed after we finalize the tree node!
 */

function TreeHashTable(){
    HashTable.call(this);
}

TreeHashTable.prototype.getTreeNode = function(id){
    assertNumber(id);

    return this.getVal(id);
};

TreeHashTable.prototype.add = function(treeNode){
    assertObject(treeNode);
    assertNumber(treeNode.id);

    this.addVal(treeNode.id, treeNode);
};

TreeHashTable.prototype.remove = function(id){
    assertDefined(id);
    assertNonNull(id);
    assertNumber(id);
    this.removeKey(id);
};




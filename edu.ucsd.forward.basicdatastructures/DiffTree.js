"use strict";
/**
 * Created by Costas Zarifis on 10/30/14.
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
 * This defines the tree node
 */

function TreeNode() {

    // The ID of a node
    this.id = null;

    // the name of the node/edge
    this.label = null;

    // the value of the node if it's a leaf
    this.value = null;

    // The parent of the current node
    this.parent = null;

    // children
    this.children = null;

    // is leaf?
    this.isLeaf = false;

    // available annotations
    this.annotations = [];

}

function Tree(){

    // The root of the tree
    this.root = null;

    // The height of the tree
//    this.height = 0;

    this.TreeHashTable = new TreeHashTable();
}



/*
 * This is an implementation of the BFS algorithm
 * so that we would be able to print per level thus
 * easier visualizing the tree
 */
Tree.prototype.printBFS = function(){

    console.log('tree:',this);
    if(this.root!==null) {

        console.log('### BFS Printing ###');

        var stack = [];
        var depth = [];
        stack.push(this.root);
        depth.push(0);
        while (stack.length != 0) {
            var len = stack.length;
            for (var i = 0; i < len; i++) {
                var temp = stack.shift();
                var depthVar = depth.shift();
                var tab = '';
                for (var j = 0; j < depthVar; j++)
                    tab = tab + '\t';

                if (depthVar !== 0)
                    console.log(tab + 'Node:', temp, 'depth:', depthVar);
                else
                    console.log('\nNode:', temp, 'depth:', depthVar);

                if (temp.children === null) {
                    break;
                }
                for (var j = 0; j < temp.children.size; j++) {
                    depth.push((depthVar + 1));
                    var child = temp.children.get(j).data;
                    stack.push(child);
                }
            }
        }
    }
};



/*
 * This is an implementation of the BFS algorithm
 * so that we would be able to print per level thus
 * easier visualizing the tree. The tree traversal
 * will begin from the given TreeNode
 */
Tree.prototype.printBFSstartingFromNode = function(branch){

    console.log('tree:',this);
    if(this.root!==null) {

        console.log('### BFS Printing starting from:',branch,' ###');

        var stack = [];
        var depth = [];
        stack.push(branch);
        depth.push(0);
        while (stack.length != 0) {
            var len = stack.length;
            for (var i = 0; i < len; i++) {
                var temp = stack.shift();
                var depthVar = depth.shift();
                var tab = '';
                for (var j = 0; j < depthVar; j++)
                    tab = tab + '\t';

                if (depthVar !== 0)
                    console.log(tab + 'Node:', temp, 'depth:', depthVar);
                else
                    console.log('\nNode:', temp, 'depth:', depthVar);

                if (temp.children === null) {
                    break;
                }
                for (var j = 0; j < temp.children.size; j++) {
                    depth.push((depthVar + 1));
                    var child = temp.children.get(j).data;
                    stack.push(child);
                }
            }
        }
    }
};


/**
 * Given a node traverse the entire subtree and delete the
 * appropriate nodes from the hash table
 */
Tree.prototype.BFSHashDeallocation = function(branch){

    if(this.root!==null) {

        console.log('### BFS Printing starting from:',branch,' ###');

        var stack = [];
        stack.push(branch);
        while (stack.length != 0) {
            var len = stack.length;
            for (var i = 0; i < len; i++) {
                var temp = stack.shift();
                console.log('About to delete:',temp);
                this.TreeHashTable.remove(temp.id);
                var tab = '';

                if (temp.children === null) {
                    break;
                }
                for (var j = 0; j < temp.children.size; j++) {
                    var child = temp.children.get(j).data;
                    stack.push(child);
                }
            }
        }
    }
};

/**
 * This function prints the hash table stored in the tree.
 */
Tree.prototype.printHashTable = function(){

    console.log('Tree Hash Table:', this.TreeHashTable);
};


/**
 * Given one JSON file (with the structure we defined)
 * this function hangs it under the corresponding subtree.
 * @param parent
 * @param jsonSubtree
 * @param labelIfPrimitive
 */


Tree.prototype.addSubtreeV2 = function(parent, jsonSubtree,labelIfPrimitive,list_predecessor){
//    console.log('arguments:','parent:',parent,'node:',jsonSubtree);

    if (typeof jsonSubtree == 'object') {
        // Input is an object

//        console.log('input is an object');
        // the root of the jsonSubtree holds an element...
        if (jsonSubtree.length === undefined) {

            // asserting...
            assertDefined(jsonSubtree);
            assertNonNull(jsonSubtree);
            assertObject(jsonSubtree);

            var prevID=null;
            if (jsonSubtree.hasOwnProperty('children')) {
                // it's an internal node
                var newTreeNode = new TreeNode();
                newTreeNode.children = new LinkedList();

                newTreeNode.id = jsonSubtree.id;
                if(labelIfPrimitive===null)
                    newTreeNode.label = jsonSubtree.label;
                else
                    newTreeNode.label = labelIfPrimitive;

                // loop through each child and create a node

                for (var att in jsonSubtree.children) {
                    if (jsonSubtree.children.hasOwnProperty(att)) {

                        if (jsonSubtree.children[att].hasOwnProperty('children')) {
                            this.addSubtreeV2(newTreeNode, jsonSubtree.children[att],att,null);
                        }else{
                            var newChild = new TreeNode();
                            newChild.label = att;
                            newChild.isLeaf = true;
                            newChild.value = jsonSubtree.children[att].value;
                            newChild.id = jsonSubtree.children[att].id;
                            this.TreeHashTable.add(newChild);
                            newTreeNode.children.addDataAfterID(prevID,newChild);
                            prevID = newChild.id;
                            newChild.parent = newTreeNode;

                        }
                    }
                }
                if(newTreeNode.children!==null) {
                    // This Tree Node is going to be attached to the root
                    if (parent === null) {
                        // parent is null so the current node is the head
                        this.root = newTreeNode;
                        this.TreeHashTable.add(newTreeNode);
                    } else {
                        // TODO: Modify this part appropriately...
                        //                if(parent.children===null) // The current node is the first child of the parent
                        //                    parent.children = new LinkedList();
                        newTreeNode.parent = parent;
                        this.TreeHashTable.add(newTreeNode);
                        parent.children.addDataAfterID(list_predecessor,newTreeNode);
                    }
                }
            }
        }

    } else {
        //input is a primitive
        console.log('You can\'t have a primitive as an input');
        assert(true,'You can\'t have a primitive as an input');

    }

};


/**
 * Given one JSON file (with the structure we defined)
 * This function generates the entire tree.
 * @param JSON
 */
Tree.prototype.generateTree = function(JSON){
    this.addSubtreeV2(null,JSON,null,null)
};


/**
 * DEPRECATED!
 *
 * Detaches branch starting with node with id:JSON.id from the tree.
 *
 * At the moment I don't traverse the whole subtree to delete each node
 * and I don't clear the corresponding key-values from the hash
 * @param JSON
 */
Tree.prototype.deleteSubtree = function(JSON){
    // asserting...
    assertDefined(JSON);
    assertNonNull(JSON);
    assertObject(JSON);
    assert(JSON.hasOwnProperty('id'),'JSON does not have property: id');
    this.deleteSubtreeWithID(JSON.id);




};


/**
 * This function deletes a node with a specific id
 * @param id
 */
Tree.prototype.deleteSubtreeWithID = function(id){
    var curr = this.TreeHashTable.getTreeNode(id);
    console.log("about to delete node:",curr);
    this.BFSHashDeallocation(curr);
    if(curr.parent===null){
        // About to delete the root
        this.root = null;
//        this.
//        delete this.head
    } else {
        curr.parent.children.delDataWithID(id)
    }
};

/**
 * DEPRECATED!
 * This function updates the value of a single node given a JSON
 * @param JSON
 */
Tree.prototype.updateNode = function(JSON){

        // asserting...
        assertDefined(JSON);
        assertNonNull(JSON);
        assertObject(JSON);
        assert(JSON.hasOwnProperty('id'),'JSON does not have property: id');
        this.updateNodeUsingID(JSON.id,JSON.payload);


};

Tree.prototype.updateNodeUsingID =  function(id,payload){

    assertNumber(id);
    assertDefined(payload);
    assertNonNull(payload);
    assertObject(payload);

    var curr = this.TreeHashTable.getTreeNode(id);
    console.log("about to update node:",curr);
    curr.value = payload.value;

};


/**
 * DEPRECATED!
 * Given a JSON file insert a node
 * @param JSON
 */


Tree.prototype.insertNode = function(JSON){

    // asserting...
    assertDefined(JSON);
    assertNonNull(JSON);
    assertObject(JSON);
    assert(JSON.hasOwnProperty('id'),'JSON does not have property: id');
    this.insertNodeUsingID(JSON.id,JSON.payload,JSON.listPredecessor);


};

Tree.prototype.insertNodeUsingID = function(id, payload, listPredecessor){

    assertNumber(id);
    assertDefined(payload);
    assertNonNull(payload);
    assertObject(payload);
    var parent = this.TreeHashTable.getTreeNode(id);

    var newChild = new TreeNode();
    newChild.id = payload.id;
    newChild.label = payload.label;
    newChild.parent = parent;
    newChild.value = payload.value;

    console.log("about to add node:",newChild,'below:',parent,'after node with id:',listPredecessor);

    // children
    if(parent.children === null){
        // the parent is a leaf we need to add children to it
        newChild.isLeaf = true;
        parent.children = new LinkedList();
        parent.children.pushData(newChild);
        parent.isLeaf = false;
    }
    else{
        parent.children.addDataAfterID(listPredecessor,newChild);

    }

};

/**
 * This function applies the diff to the already created tree structure.
 * It identifies the diff using the op, performs some checks and calls
 * the corresponding function that applies the diff.
 *
 * @param diff
 */
Tree.prototype.applyDiff = function(diff){
    assertNumber(diff.id);
    assertDefined(diff.id);
    assertNonNull(diff.id);


    // identify the op of the diff perform the appropriate checks
    // and call the corresponding function.
    console.log(diff.op);
    switch (diff.op) {
        case 'insert':
            assertDefined(diff.payload);
            assertNonNull(diff.payload);
            assertDefined(diff.list_predecessor);

            this.insertNodeUsingID(diff.id,diff.payload,diff.list_predecessor);
            break;
        case 'update':
            assertDefined(diff.payload);
            assertNonNull(diff.payload);
            assert(diff.list_predecessor===null,'listPredecessor is not permitted on update diffs');
            assert(diff.payload.label===undefined, 'label is not permitted on updates');
            this.updateNodeUsingID(diff.id,diff.payload);
            break;
        case 'delete':
            assert(diff.payload===null,'Payload is not permitted on deletes');
            assert(diff.list_predecessor===null,'listPredecessor is not permitted on delete diffs');
            this.deleteSubtreeWithID(diff.id);


            break;
        default :
            assert(false,'diff op not identified');
            break;
    }


};






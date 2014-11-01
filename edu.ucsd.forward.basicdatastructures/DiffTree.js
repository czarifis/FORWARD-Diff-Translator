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


/**
 * Given one JSON file (with the structure we defined)
 * this function hangs it under the corresponding subtree.
 * @param parent
 * @param jsonSubtree
 * @param labelIfPrimitive
 */


Tree.prototype.addSubtreeV2 = function(parent, jsonSubtree,labelIfPrimitive){
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
                            this.addSubtreeV2(newTreeNode, jsonSubtree.children[att],att);
                        }else{
                            var newChild = new TreeNode();
                            newChild.label = att;
                            newChild.isLeaf = true;
                            newChild.value = jsonSubtree.children[att].value;
                            newChild.id = jsonSubtree.children[att].id;
                            this.TreeHashTable.add(newChild);
                            newTreeNode.children.pushData(newChild);
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
                        parent.children.pushData(newTreeNode);
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
    this.addSubtreeV2(null,JSON,null)
};


Tree.prototype.deleteSubtree = function(JSON){{
    var curr = this.TreeHashTable.getTreeNode(JSON.id);
    console.log("about to delete node:",curr);
    if(curr.parent===null){
        // About to delete the root
        this.root = null;
//        this.
//        delete this.head
    } else {
        curr.parent.children.delDataWithID(JSON.id)
    }


}};








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
    this.height = null;

    this.TreeHashTable = new TreeHashTable();
}

Tree.prototype.generateTree = function(jsonFile){

return null
};

Tree.prototype.attachLabel = function(id, label){

};

Tree.prototype.printTree = function(){
    console.log('#### Printing Tree ####');

    var currNode = this.root;

    while (currNode.children!==null){
        console.log(currNode);
        currNode.children.printLinkedList();
        currNode = currNode.children.head;
    }

//    this.root.children

};

/*
 * This is an implementation of the BFS algorithm
 * so that we would be able to print per level thus
 * easier visualizing the tree
 */
Tree.prototype.printBFS = function(){


    console.log('### BFS Printing ###');
    var stack = [];
    var depth = [];
    stack.push(this.root);
    depth.push(0);
    while(stack.length!=0) {
        var len = stack.length;
        for (var i = 0; i < len; i++) {
            var temp = stack.shift();
            var depthVar = depth.shift();
            console.log('Node:',temp,'depth:',depthVar);
            if (temp.children === null) {
                break;
            }
            for (var j=0; j < temp.children.size; j++) {
                depth.push((depthVar+1));
                var child = temp.children.get(j).data;
                stack.push(child);
            }
        }
    }
};

/**
 * This function takes a JSON file and generates a tree.
 *
 *
 * @param parent should be null the first time you run this
 * @param jsonSubtree this is the actual JSON file
 * @param labelIfPrimitive If the current jsonSubtree is a primitive also provide the label.
 */

Tree.prototype.addSubtree = function(parent, jsonSubtree,labelIfPrimitive){
    console.log('arguments:','parent:',parent,'node:',jsonSubtree);


    var newTreeNode = new TreeNode();
    if (typeof jsonSubtree == 'object') {
        // Input is an object

        console.log('input is an object');
        // the root of the jsonSubtree holds an element...
        if (jsonSubtree.length === undefined) {

            // asserting...
            assertDefined(jsonSubtree);
            assertNonNull(jsonSubtree);
            assertObject(jsonSubtree);
//            assert(jsonSubtree.hasOwnProperty('id'),'data does not have property: id');
//            assert(jsonSubtree.hasOwnProperty('label'),'data does not have property: id');


            console.log(jsonSubtree);


            newTreeNode.id = jsonSubtree.id;
            newTreeNode.label = jsonSubtree.label;
            newTreeNode.children = new LinkedList();

            // create a Tree Node for each child

            for (var att in jsonSubtree) {
                if (jsonSubtree.hasOwnProperty(att)) {
                    if((att!=='id') && (att!=='label')) {

                        var newChild = new TreeNode();
                        var isChildPrimitive = false;

                        if (typeof jsonSubtree[att] == 'object') {
                            console.log('child is object');
                            newChild.label = att;
//                            newChild.id = jsonSubtree[att].id;
                        }
                        else{
                            console.log('child is primitive');
                            newChild.isLeaf = true;
                            newChild.label = att;
                            newChild.value = jsonSubtree[att];
                            isChildPrimitive = true;
                        }

                        newChild.parent = newTreeNode;
                        console.log(att, " -> ", jsonSubtree[att]);
                        console.log('new child created:',newChild);
                        newTreeNode.children.pushData(newChild);

                        if(!isChildPrimitive){
                            this.addSubtree(newChild,jsonSubtree[att]);
                        }
                    }
                }
            }


            // jsonSubtree is going to be attached to the root
            if(parent===null) {
                // parent is null so this is the head
                this.root = newTreeNode;
            } else {
                // TODO: Modify this part appropriately...
                if(parent.children===null) // The current node is the first child of the parent
                    parent.children = new LinkedList();

                newTreeNode.parent = parent;
//                parent.children = new LinkedList();
//                parent.children.pushData(newTreeNode);
//                newTreeNode.parent = parent;
                parent.children.pushData(newTreeNode);


            }
        }
        else {

            // This is an array!

            console.log('This is an array');
            // the root of the jsonSubtree holds an array of elements
            for (var i = 0; i < jsonSubtree.length; i++) {
                console.log(jsonSubtree[i]);




                // create a Tree Node for each child

                for (var att2 in jsonSubtree[i]) {


                    if (jsonSubtree[i].hasOwnProperty(att2)) {
//                        newTreeNode.id = jsonSubtree[i].id;
                        newTreeNode.label = att2;
                        newTreeNode.children = new LinkedList();
                        if((att2!=='id') && (att2!=='label')) {

                            var newChild2 = new TreeNode();
                            var isChildPrimitive2 = false;

                            for (var att3 in jsonSubtree[i][att2]) {

                                if((att3!=='id') && (att3!=='label')) {
                                    if (jsonSubtree[i][att2].hasOwnProperty(att3)) {
                                        if (typeof jsonSubtree[i][att2][att3] == 'object') {
                                            console.log('child is object');
                                            newChild2.label = att3;
                                            //                                newChild2.id = jsonSubtree[i][att2].id;

                                        }
                                        else {
                                            console.log('child is primitive');
                                            newChild2.isLeaf = true;
                                            newChild2.label = jsonSubtree[i][att2].label;
                                            newChild2.value = jsonSubtree[i][att2][att3];
                                            isChildPrimitive2 = true;
                                        }

                                        newChild2.parent = newTreeNode;
                                        console.log(att3, " -> ", jsonSubtree[i][att2][att3]);
                                        console.log('new child created:', newChild2);
                                        newTreeNode.children.pushData(newChild2);

                                        if (!isChildPrimitive2) {
                                            this.addSubtree(newChild2, jsonSubtree[i][att2][att3]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }



                // jsonSubtree is going to be attached to the root
                if(parent===null) {
                    // parent is null so this is the head
                    this.root = newTreeNode;
                } else {
                    // TODO: Modify this part appropriately...
                    if(parent.children===null) // The current node is the first child of the parent
                        parent.children = new LinkedList();

                    newTreeNode.parent = parent;

                    parent.children.pushData(newTreeNode);


                }




            }
        }
    } else {
        //input is a primitive
        console.log('input is a primitive');


        // asserting...
        assertDefined(labelIfPrimitive);
        assertNonNull(labelIfPrimitive);



        console.log(labelIfPrimitive);

        newTreeNode.value = jsonSubtree;
        newTreeNode.isLeaf = true;
        newTreeNode.label = labelIfPrimitive;

        // jsonSubtree is going to be attached to the root
        if(parent===null) {
            // parent is null so this is the head
            this.root = newTreeNode;
        } else {
            // TODO: Modify this part appropriately...
            newTreeNode.parent = parent;

        }

    }





};
/**
 * Created by Costas Zarifis on 10/30/14.
 */

var guid = function() {
    return Math.floor((1 + Math.random()) * 0x1000000000);

};

function addNodesToTree1(){
    var tree = new Tree();
    var d = {
        id : guid(),
        label : 'marker',
        nestedOne: {
            id : guid(),
            label : 'nestedLbl',
            nested: {
                id : guid(),
                label : 'nestedInner',
                more: 'nestedInnersibling'
            },
            nested2: {
                id : guid(),
                label : 'nestedInner2',
                more: 'nestedInnersibling2'
            }
        },
        one: 'OneItem',
        two: 'twoItem'

    };

    tree.addSubtree(null, d);
    tree.printBFS();
}

function addNodesToTree2(){
    var tree = new Tree();

    var d = {
        id: guid(),
        label: 'marker',
        one: 'OneItem',
        two: 'twoItem',
        nestedOne: {
            id : guid(),
            label : 'nested',
            nested: 'one'
        }
    };
    tree.addSubtree(null, d);
    tree.printBFS();

}


function addNodesWithArraysToTree(){

    var tree = new Tree();
    var d = {
        id : guid(),
        label : 'marker',
//        nestedOne: {
//            id : guid(),
//            label : 'nestedLbl',
//            nested: {
//                id : guid(),
//                label : 'nestedInner',
//                more: 'nestedInnersibling'
//            },
//            nested2: {
//                id : guid(),
//                label : 'nestedInner2',
//                more: 'nestedInnersibling2'
//            }
//        },
//
//        one: 'OneItem',
//        two: 'twoItem',

        nestedArr:[
            {
                nested1: {
                    id: guid(),
                    label: 'nestedInner1',
                    actual: 'value1'
                }
            },
            {
                nested2: {
                    id: guid(),
                    label: 'nestedInner2',
                    actual: 'value2'
                }
            }

        ]
    };

    tree.addSubtree(null, d);
    tree.printBFS();
}

function addNodesWithArraysToTree2(){

    var tree = new Tree();
    var d = {
        id : guid(),
        label : 'marker',
        nestedArr:[
            {
                nested1: {
                    label: 'nestedInner1'
                }
            },
            {
                nested2: {
                    label: 'nestedInner2'
                }
            }

        ]
    };

    tree.addSubtree(null, d);
    tree.printBFS();
}

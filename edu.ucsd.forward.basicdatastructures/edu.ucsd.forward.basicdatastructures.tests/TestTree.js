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
    tree.addSubtree(null, d,null);
    tree.printBFS();
}


function addComplexObjects(){
    var tree = new Tree();
    var map = {
        id:1,
        label:'map',
        children:{
            zoom:{
                id:2,
                label:'zoom',
                value :8
            },
            markers:{
                id:3,
                label:'markers',
                children:[
                    {
                        id:10,
                        label:0,
                        children:{
                            coords: {
                                id: 100,
                                label: 'coords',
                                children: {
                                    latitude: {
                                        id: 1000,
                                        label: 'latitude',
                                        value: 40
                                    },
                                    longitude: {
                                        id: 1001,
                                        label: 'longitude',
                                        value: 40
                                    }

                                }
                            }
                        }
                    },
                    {
                        id:11,
                        label:1,
                        children:{
                            coords: {
                                id: 110,
                                label: 'coords',
                                children: {
                                    latitude: {
                                        id: 1100,
                                        label: 'latitude',
                                        value: 40
                                    },
                                    longitude: {
                                        id: 1101,
                                        label: 'longitude',
                                        value: 40
                                    }

                                }
                            }
                        }
                    },
                    {
                        id:12,
                        label:2,
                        children:{
                            coords: {
                                id: 120,
                                label: 'coords',
                                children: {
                                    latitude: {
                                        id: 1200,
                                        label: 'latitude',
                                        value: 40
                                    },
                                    longitude: {
                                        id: 1201,
                                        label: 'longitude',
                                        value: 40
                                    }

                                }
                            }
                        }
                    },
                    {
                        id:13,
                        label:3,
                        children:{
                            coords: {
                                id: 130,
                                label: 'coords',
                                children: {
                                    latitude: {
                                        id: 1300,
                                        label: 'latitude',
                                        value: 40
                                    },
                                    longitude: {
                                        id: 1301,
                                        label: 'longitude',
                                        value: 40
                                    }

                                }
                            }
                        }
                    }



                ]
            }

        }
    };
    tree.addSubtreeV2(null, map ,null);
    tree.printBFS();

}



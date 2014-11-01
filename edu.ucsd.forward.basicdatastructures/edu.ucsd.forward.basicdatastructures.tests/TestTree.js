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
        value:{
            zoom:{
                id:2,
                label:'zoom',
                value :8
            },
            markers:{
                id:3,
                label:'markers',
                value:[
                    {
                        id:10,
                        label:0,
                        value:{
                            id:100,
                            label:'marker',
                            value:{
                                id: 1000,
                                label: 'coords',
                                value: {
                                    latitude: {
                                        id: 10000,
                                        label: 'latitude',
                                        value: 40
                                    },
                                    longitude:{
                                        id: 10001,
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
                        value:{
                            id:110,
                            label:'marker',
                            value:{
                                id: 1100,
                                label: 'coords',
                                value: {
                                    latitude: {
                                        id: 11000,
                                        label: 'latitude',
                                        value: 35
                                    },
                                    longitude:{
                                        id: 11001,
                                        label: 'longitude',
                                        value: 35
                                    }

                                }
                            }

                        }
                    },                   {
                        id:12,
                        label:2,
                        value:{
                            id:120,
                            label:'marker',
                            value:{
                                id: 1200,
                                label: 'coords',
                                value: {
                                    latitude: {
                                        id: 12000,
                                        label: 'latitude',
                                        value: 25
                                    },
                                    longitude:{
                                        id: 12001,
                                        label: 'longitude',
                                        value: 25
                                    }

                                }
                            }

                        }
                    }


                ]
            }

        }
    };
    tree.addSubtree(null, map ,null);
    tree.printBFS();

}



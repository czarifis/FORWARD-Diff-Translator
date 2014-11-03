'use strict';
/**
 * Created by Costas Zarifis on 10/30/14.
 */

var guid = function() {
    return Math.floor((1 + Math.random()) * 0x1000000000);

};

/**
 * Function called to generate a tree with arrays
 */
function addComplexObjectsWithArrays(){
    var tree = new Tree();
    var map = {
        id:1,
        label:'map',
        children:{
            zoom:{
                id:2,
                value :8
            },
            markers:{
                id:3,
                children:[
                    {
                        id:10,
                        children:{
                            coords: {
                                id: 100,
                                children: {
                                    latitude: {
                                        id: 1000,
                                        value: 40
                                    },
                                    longitude: {
                                        id: 1001,
                                        value: 40
                                    }

                                }
                            }
                        }
                    },
                    {
                        id:11,
                        children:{
                            coords: {
                                id: 110,
                                children: {
                                    latitude: {
                                        id: 1100,
                                        value: 40
                                    },
                                    longitude: {
                                        id: 1101,
                                        value: 40
                                    }

                                }
                            }
                        }
                    },
                    {
                        id:12,
                        children:{
                            coords: {
                                id: 120,
                                children: {
                                    latitude: {
                                        id: 1200,
                                        value: 40
                                    },
                                    longitude: {
                                        id: 1201,
                                        value: 40
                                    }

                                }
                            }
                        }
                    },
                    {
                        id:13,
                        children:{
                            coords: {
                                id: 130,
                                children: {
                                    latitude: {
                                        id: 1300,
                                        value: 40
                                    },
                                    longitude: {
                                        id: 1301,
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
    tree.generateTree(map);
    tree.printBFS();
    tree.printHashTable();
    return tree;

}

/**
 * Function called to generate a tree with tuples
 */
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
                children: {
                    'lb0': {
                        id: 10,
                        label: 0,
                        children: {
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
                    'lb1': {
                        id: 11,
                        label: 1,
                        children: {
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
                    'lb2': {
                        id: 12,
                        label: 2,
                        children: {
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
                    'lb3': {
                        id: 13,
                        label: 3,
                        children: {
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

                }


            }

        }
    };
    tree.generateTree(map);
    tree.printBFS();
    tree.printHashTable();
    return tree;

}

/**
 * Function called from the view to generate a tree and delete a node
 */
function addComplexObjectsAndDeleteOneOfThem(){
    var t = addComplexObjects();

    // create diff
    var diff = new Diff();
    diff.id = 100;
    diff.op = 'delete';

    console.log(diff);
    t.applyDiff(diff);

    t.printBFS();
    t.printHashTable();
    t.printDiffs();
}

/**
 * Function called from the view to generate a tree and update a node
 */
function addComplexObjectsAndUpdateOneOfThem(){
    var t = addComplexObjects();

    // create diff
    var diff = new Diff();
    diff.id = 10;
    diff.op = 'update';
    diff.payload = {
        newMarker: {
            id: 321,
            label: 'newMarker',
            children: {
                coords: {
                    id: 3210,
                    label: 'coords',
                    children: {
                        latitude: {
                            id: 32100,
                            label: 'latitude',
                            value: 40
                        },
                        longitude: {
                            id: 32101,
                            label: 'longitude',
                            value: 40
                        }

                    }
                }
            }
        }
    };

    console.log(diff);
    t.applyDiff(diff);

    t.printBFS();
    t.printHashTable();
    t.printDiffs();
}

/**
 * Function called from the view to generate a tree and then insert a leaf
 */
function addComplexObjectsAndInsertOneMoreUnderaLeaf() {
    var t = addComplexObjects();


    var diff = new Diff();
    diff.id = 1001;
//    diff.list_predecessor = 12;
    diff.op = 'insert';
    diff.payload = {
        newMarker: {
            id: 321,
            label: 'newMarker',
            children: {
                coords: {
                    id: 3210,
                    label: 'coords',
                    children: {
                        latitude: {
                            id: 32100,
                            label: 'latitude',
                            value: 40
                        },
                        longitude: {
                            id: 32101,
                            label: 'longitude',
                            value: 40
                        }

                    }
                }
            }
        }
    };

    console.log(diff);
    t.applyDiff(diff);
    t.printBFS();
    t.printHashTable();
    t.printDiffs();
}


/**
 * Function called from the view to generate a tree and then insert an internal node
 */
function addComplexObjectsAndInsertOneMoreUnderanInternal(){
    var t = addComplexObjectsWithArrays();
    var diff = new Diff();
    diff.id = 3;
    diff.list_predecessor = 12;
    diff.op = 'insert';
    diff.payload = {
        newMarker: {
            id: 321,
            label: 'newMarker',
            children: {
                coords: {
                    id: 3210,
                    label: 'coords',
                    children: {
                        latitude: {
                            id: 32100,
                            label: 'latitude',
                            value: 40
                        },
                        longitude: {
                            id: 32101,
                            label: 'longitude',
                            value: 40
                        }

                    }
                }
            }
        }
    };

    console.log(diff);
    t.applyDiff(diff);
    t.printBFS();
    t.printHashTable();
    t.printDiffs();

}


function addComplexObjectsAndInsertOneMoreUnderanInternalAtTheBeginningOfTheLinkedList(){
    var t = addComplexObjects();

    var diff = new Diff();
    diff.id = 3;
//    diff.list_predecessor = 12;
    diff.op = 'insert';
    diff.payload = {
        newMarker: {
            id: 321,
            label: 'newMarker',
            children: {
                coords: {
                    id: 3210,
                    label: 'coords',
                    children: {
                        latitude: {
                            id: 32100,
                            label: 'latitude',
                            value: 40
                        },
                        longitude: {
                            id: 32101,
                            label: 'longitude',
                            value: 40
                        }

                    }
                }
            }
        }
    };

    console.log(diff);
    t.applyDiff(diff);
    t.printBFS();
    t.printHashTable();
    t.printDiffs();

}



// TODO: Need another array that stores all entering diffs

// TODO: About markers example
// 500 trucks and we move 10% of them - Measure time
// For the time:
// * Use stop watch
// * chrome developer tools find if there's a stopwatch for the rendering...






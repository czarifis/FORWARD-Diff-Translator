/**
 * Created by Costas Zarifis on 10/30/14.
 */

var guid = function() {
    return Math.floor((1 + Math.random()) * 0x1000000000);

};


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

}



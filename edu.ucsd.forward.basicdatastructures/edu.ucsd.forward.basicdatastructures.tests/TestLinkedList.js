/**
 * Created by Costas zarifis on 10/29/14.
 */



var guid = function() {
    return Math.floor((1 + Math.random()) * 0x1000000000);

};


function addSingleElementTest(){
    var ll = new LinkedList();

    var d = {
        id : guid(),
        one: 'oneItem',
        two: 'twoItem',
        nestedOne: {
            nested:'one'
        }
    };
    ll.pushData(d);
    ll.printLinkedList();
}

function addMultipleElementsTest(){
    var ll = new LinkedList();


    var d1 = {
        id : guid(),
        one: 'oneItem1',
        two: 'twoItem1',
        nestedOne: {
            nested:'one1'
        }
    };
    ll.pushData(d1);

    var d2 = {
        id : guid(),
        one: 'oneItem2',
        two: 'twoItem2',
        nestedOne: {
            nested:'one2'
        }
    };
    ll.pushData(d2);


    var d3 = {
        id : guid(),
        one: 'oneItem3',
        two: 'twoItem3',
        nestedOne: {
            nested:'one3'
        }
    };
    ll.pushData(d3);

    ll.printLinkedList();

    console.log('getLength',ll.getLength());
}


function addMultipleElementsAndinsertAnElementBeforeSpecifiedIDTest(){

    var ll = new LinkedList();
    var IDArr = [];

    for(var i=0; i<10;i++){
        var ActualID = guid();
        IDArr.push(ActualID);
        var d = {
            id : ActualID,
            one: 'oneItem'+i,
            two: 'twoItem'+i,
            nestedOne: {
                nested:'one'+i
            }
        };
        ll.pushData(d);
    }


    var data = {
        id : guid(),
        one: 'oneItem',
        two: 'twoItem',
        nestedOne: {
            nested:'one'
        }
    };

    ll.printLinkedList();

    var searchingForId = IDArr[4];
    console.log('inserting before element with ID:',searchingForId);

    ll.addDataBeforeID(searchingForId,data);
    console.log('final Linked List:');
    ll.printLinkedList();
}


function addMultipleElementsAndinsertAnElementAfterSpecifiedIDTest(){

    var ll = new LinkedList();
    var IDArr = [];

    for(var i=0; i<10;i++){
        var ActualID = guid();
        IDArr.push(ActualID);
        var d = {
            id : ActualID,
            one: 'oneItem'+i,
            two: 'twoItem'+i,
            nestedOne: {
                nested:'one'+i
            }
        };
        ll.pushData(d);
    }


    var data = {
        id : guid(),
        one: 'oneItem',
        two: 'twoItem',
        nestedOne: {
            nested:'one'
        }
    };

    ll.printLinkedList();

    var searchingForId = IDArr[9];
    console.log('inserting element:',data.id,'after element with ID:',searchingForId);

    ll.addDataAfterID(searchingForId,data);
    console.log('final Linked List:');
    ll.printLinkedList();
}



function addMultipleElementsAndDeleteSomeTest(){

    var ll = new LinkedList();
    var IDArr = [];

    for(var i=0; i<10;i++){
        var ActualID = guid();
        IDArr.push(ActualID);
        var d = {
            id : ActualID,
            one: 'oneItem'+i,
            two: 'twoItem'+i,
            nestedOne: {
                nested:'one'+i
            }
        };
        ll.pushData(d);
    }

    ll.printLinkedList();

    var searchingForId = IDArr[3];
    console.log('Deleting element with ID:',searchingForId);

    ll.delDataWithID(searchingForId)
    console.log('final Linked List:');
    ll.printLinkedList();
}




















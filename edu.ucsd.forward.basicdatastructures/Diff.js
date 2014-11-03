/**
 * Created by Costas Zarifis on 11/1/14.
 */


/**
 * This is a constructor of the Diff
 * @constructor
 */
function Diff() {

    // The ID of the node where the diff is going to be applied
    this.id = null;

    // The type of the diff (insert/update/delete)
    this.op = null;

    // the payload of the diff
    this.payload = null;

    // The predecessor of the node if the insertion happens on an internal node
    this.list_predecessor = null;

}



function DiffList(){
        this.diffs = [];

}

DiffList.prototype.getDiff = function(i) {
    assertNonNull(i);
    assertDefined(i);
    assertNumber(i);
    if (i<this.diffs.length) {
        return this.diffs[i];
    } else {
        return null;
    }
};

DiffList.prototype.pushDiff = function(diff) {
    assertNonNull(diff);
    assertDefined(diff);
    assertObject(diff);
    this.diffs.push(diff);
};

DiffList.prototype.popDiff = function() {

    this.diffs.pop();
};

DiffList.prototype.shift = function(){
    this.diffs.shift();
};

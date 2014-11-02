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
/* http://www.zixi.org/post/26 */
function adjustOffset(el, offset) {
    /* From http://stackoverflow.com/a/8928945/611741 */
    var val = el.value, newOffset = offset;
    if (val.indexOf("\r\n") > -1) {
        var matches = val.replace(/\r\n/g, "\n").slice(0, offset).match(/\n/g);
        newOffset += matches ? matches.length : 0;
    }
    return newOffset;
}

$.fn.setCursorPosition = function(position){
    /* From http://stackoverflow.com/a/7180862/611741 */
    if(this.lengh == 0) return this;
    return $(this).setSelection(position, position);
}

$.fn.setSelection = function(selectionStart, selectionEnd) {
    /* From http://stackoverflow.com/a/7180862/611741 
       modified to fit http://stackoverflow.com/a/8928945/611741 */
    if(this.lengh == 0) return this;
    input = this[0];

    if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    } else if (input.setSelectionRange) {
        input.focus();
        selectionStart = adjustOffset(input, selectionStart);
        selectionEnd = adjustOffset(input, selectionEnd);
        input.setSelectionRange(selectionStart, selectionEnd);
    }

    return this;
}

$.fn.focusEnd = function(){
    /* From http://stackoverflow.com/a/7180862/611741 */
    this.setCursorPosition(this.val().length);
}

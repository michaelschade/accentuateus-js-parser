var process = null;

var ot = "";

/*
    Chunk: {
        elem:   // source/destination element
        old:    // old text
        lifted: // new text
        // later add clues for intelligent updating
    }
*/
function Chunk(elem, oldText, newText) {
    return {elem: elem, old: oldText, lifted: newText};
}

$(document).ready(function() {
    /* Extract text from source + one context word on each side */
    function extract(chunk) {
        /*
        Regex: \w+\s+text
        */
        var re      = RegExp('\\w*\\s*\\w*' + chunk.old +'\\w*\\s*\\w*', 'g');
        chunk.old   = re.exec(chunk.elem.value)[0];
        return chunk;
    }
    /* Intelligently update input with chunk */
    function update(chunk) {
        chunk.elem.value = chunk.elem.value.replace(chunk.old, chunk.lifted);
    }
    function post(chunk) {
        var data = {
              call:     "charlifter.lift"
            , lang:     "ht"
            , locale:   "en-US"
            , text:     chunk.old
        };
        $.ajax({
              url:      "http://ht.api.accentuate.us:8080/"
            , type:     "POST"
            , data:     $.toJSON(data)
            , success:  function(rsp) {
                chunk.lifted = rsp.text;
                update(chunk);
                $("#output").append(rsp.text + "<br />");
            } , contentType: "application/json; charset=utf-8"
        });
    }
    var str = "";
    process = function() {
        if (str != "") {
            post(extract(Chunk(document.getElementById("text"), str, '')));
            str = "";
        }
    }
    var re = /[.!?,]/
    $("input").bind("keypress", function(evt) {
        if (!(evt.altKey || evt.ctrlKey || evt.metaKey)) {
            var key = String.fromCharCode(evt.which);
            str += key;
            if (re.test(key)) {
                process();
            }
            clearTimeout(j);
            j = setTimeout("process();", 500);
        }
    });
    var j = setTimeout("process();", 500);
});

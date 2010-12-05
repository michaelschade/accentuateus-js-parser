var process = null;

var ot = "";

/*
    Chunk: {
        old:    // old text
        lifted: // new text
        // later add clues for intelligent updating
    }
*/
function Chunk(oldText, newText) {
    return {old: oldText, lifted: newText};
}

$(document).ready(function() {
    /* Extract text from source + one context word on each side */
    function extract(source, text) {
        /*
        Regex: \w+\s+text
        */
        var re  = RegExp('\\w*\\s*\\w*' + text +'\\w*\\s*\\w*', 'g');
        ot      = re.exec(source.value)[0];
        return ot;
    }
    /* Intelligently update input with chunk */
    function update(destination, chunk) {
        destination.value = destination.value.replace(chunk.old, chunk.lifted);
    }
    function post(text) {
        var data = {
              call:     "charlifter.lift"
            , lang:     "ht"
            , locale:   "en-US"
            , text:     text
        };
        $.ajax({
              url:      "http://ht.api.accentuate.us:8080/"
            , type:     "POST"
            , data:     $.toJSON(data)
            , success:  function(rsp) {
                update(document.getElementById("text"), Chunk(ot, rsp.text));
                $("#output").append(rsp.text + "<br />");
            } , contentType: "application/json; charset=utf-8"
        });
    }
    var str = "";
    process = function() {
        if (str != "") {
            ot = str;
            post(extract(document.getElementById("text"), str));
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

var process = null;

$(document).ready(function() {
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
                $("#output").append(rsp.text);
            } , contentType: "application/json; charset=utf-8"
        });
    }
    var str = "";
    process = function() {
        if (str != "") {
            post(str);
            str = "";
        }
    }
    var re = /[.!?]/
    $("input").bind("keypress", function(evt) {
        var key = String.fromCharCode(evt.which);
        str += key;
        if (re.test(key)) {
            process();
        }
        clearTimeout(j);
        j = setTimeout("process();", 500);
    });
    var j = setTimeout("process();", 500);
});

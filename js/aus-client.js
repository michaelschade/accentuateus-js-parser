var x = null;

$(document).ready(function() {
    function post(data) {
        $.post("http://ht.api.accentuate.us:8080/"
            , {js: $.toJSON(data)}
            , function(rsp) {
                window.alert(rsp);
                $("#output").append(rsp.text);
            }, "json"
        );
    }
    var str = "";
    var process = function() {
        if (str != "") {
            $("#output").append(str + "<br/>");
            str = "";
        }
    }
    x = process;
    var re = /[.!?]/
    $("input").bind("keypress", function(evt) {
        var key = String.fromCharCode(evt.which);
        str += key;
        if (re.test(key)) {
            process();
        }
        clearTimeout(j);
        j = setTimeout("x();", 1000);
    });
    var j = setTimeout("x();", 1000);
});

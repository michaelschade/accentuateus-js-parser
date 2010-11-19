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
    /*
    post({
          "call":   "charlifter.langs"
        , "locale": "en-US"
        , "lang":   "ht"
        , "text":   "Bon, la fe sa apre demen pito, le la we mwen andey."
    });
    */
});

var argv = process.argv;
if (argv.length != 4) {
    console.error("Usage:\nnode md2html <from.markdown> <to.html>");
    process.exit();
}
var from = argv[2];
var to = argv[3];
var cssfile = "markdown.css";

var fs = require("fs");
var showdown = require("./showdown");

fs.readFile(cssfile, "utf8", function(err, css) {
    if (err) {
        console.error("failed to read file " + cssfile);
        return;
    }
    fs.readFile(from, "utf8", function(err, data) {
        if (err) {
            console.error("failed to read file " + from);
            return;
        }
        var body = (new showdown.Showdown.converter()).makeHtml(data);
        var m = body.match(/.*<h2>(.*)<\/h2>.*/);
        var title = m ? m[1] : "";

        var html =
        '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
        + '<html>'
            + '<head>'
                + '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'
                + '<title>'
                + title
                + '</title>'
                + '<style>'
                    + css
                + '</style>'
            + '</head>'
            + '<body>'
            + body
            + '</body>'
        + '</html>';
        fs.writeFile(to, html, function(err) {
            if (err) {
                console.error("error writing file " + to);
                return;
            }
        });
    });
});


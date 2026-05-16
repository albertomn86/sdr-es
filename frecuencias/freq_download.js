function generate() {
    var list = document.getElementsByClassName("table-container").item(0).getElementsByTagName("tr");

    var doc = document.implementation.createDocument("", "", null);
    var main = doc.createElement("ArrayOfMemoryEntry");
    main.setAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
    main.setAttribute("xmlns:xsd", "http://www.w3.org/2001/XMLSchema");

    for (var i = 1; i < list.length; i++) {
        var t_row = list[i].getElementsByTagName("td");
        var freq = parseFloat(t_row[0].textContent.replace(".","").replace(",",".")) * 1000;
        var name = t_row[1].textContent;
        var mode = t_row[3].textContent;
        var bw = parseFloat(t_row[4].textContent.replace(",",".")) * 1000;

        var item = doc.createElement("MemoryEntry");
        item.appendChild(doc.createElement("IsFavourite")).appendChild(document.createTextNode("true"));
        item.appendChild(doc.createElement("Name")).appendChild(document.createTextNode(name));
        item.appendChild(doc.createElement("GroupName")).appendChild(document.createTextNode("Frecuencias HF"));
        item.appendChild(doc.createElement("Frequency")).appendChild(document.createTextNode(freq));
        item.appendChild(doc.createElement("DetectorType")).appendChild(document.createTextNode(mode));
        item.appendChild(doc.createElement("Shift")).appendChild(document.createTextNode("0"));
        item.appendChild(doc.createElement("FilterBandwidth")).appendChild(document.createTextNode(bw));
        main.appendChild(item);
    }

    doc.appendChild(main);
    return formatXml("<?xml version=\"1.0\"?>" + doc.documentElement.outerHTML);
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("download_button").addEventListener("click", download);
});


function download() {
    var pom = document.createElement('a');
    var data = generate();
    pom.setAttribute('href', 'data:application/xml;charset=utf-8,' + encodeURIComponent(data));
    pom.setAttribute('download', "frequencies.xml");

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}


/*
The MIT License (MIT)

Copyright (c) 2016 Stuart Powers

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
function formatXml(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    jQuery.each(xml.split('\r\n'), function(index, node) {
        var indent = 0;
        if (node.match( /.+<\/\w[^>]*>$/ )) {
            indent = 0;
        } else if (node.match( /^<\/\w/ )) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match( /^<\w([^>]*[^\/])?>.*$/ )) {
            indent = 1;
        } else {
            indent = 0;
        }

        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '  ';
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });

    return formatted;
}

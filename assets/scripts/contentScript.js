console.log("uwu - Content Script is Running");

let uwuified = false;

document.addEventListener('click', function(e) {    
    // shouldn't trigger on link click, else 
    // every mouseclick has a chance to uwuify your webpage
    let href = e.target.href;
    if (!href && !uwuified) {
        rouletteInit();
    }
}, false);


// function gets called on mouseclick
const rouletteInit = () => {
    const number = Math.floor(Math.random() * 5);
    if (number === 1) {
        imagefy();
        walk(document.body);
        showPopup();
        uwuified = true;
    }
};

const walk = (node) => {
    let ignore = { "STYLE":0, "SCRIPT":0, "NOSCRIPT":0, "IFRAME":0, "OBJECT":0, "PRE":0 };
    // I stole this function from here:
    // http://is.gd/mwZp7E
    let child, next;

    if (node.nodeName.toLowerCase() == 'input' || node.nodeName.toLowerCase() == 'textarea' || (node.classList && node.classList.contains('ace_editor')) || (node.tagName in ignore)) {
        return;
    };

    switch ( node.nodeType ) {
        case 1:  // Element
        case 9:  // Document
        case 11: // Document fragment
            child = node.firstChild;
            while ( child ) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;
        case 3: // Text node
            handleText(node);
            break;
    };
};

const handleText = (textNode) => {
    let v = textNode.nodeValue;

	v = v.replace(/(?:r|l)/g, "w");
    v = v.replace(/(?:R|L)/g, "W");
	v = v.replace(/n([aeiou])/g, 'ny$1');
	v = v.replace(/N([aeiou])/g, 'Ny$1');
	v = v.replace(/N([AEIOU])/g, 'Ny$1');
	v = v.replace(/ove/g, "uv");

	textNode.nodeValue = v;
};

const showPopup = () => {
    var myWindow = window.open("", "MsgWindow", "width=700,height=600");
    myWindow.document.write("<head><title>u have been uwu'd!</title></head>");
    myWindow.document.write("<iframe autoplay width='100%' height='100%' src='https://www.youtube.com/embed/0NL9R5pGakc?autoplay=1' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>");
};

const imagefy = () => {
    const imgs = document.getElementsByTagName('img');
    const fileNames = ['uwu.png','uwu1.jpg','uwu2.png','uwu3.jpg','owo.png','uwu4.jpg','uwu5.jpg','uwu6.gif'];
    // replace image with random uwu face from fileNames
    for (img of imgs) {
        const r = Math.floor(Math.random() * fileNames.length);
        let fileName = 'assets/images/' + fileNames[r];
        let url = chrome.extension.getURL(fileName);
        img.src = url;
    };
};
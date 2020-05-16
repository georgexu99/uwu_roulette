console.log("uwu - Content Script is Running");


const rouletteInit = () => {
    const number = Math.floor(Math.random() * 5);
    console.log('NUMBERIS' + number);
    window.alert("sometext");
    if (number === 1) {
        imagefy();
        textify();
    }
};

const textify = () => {
    let observer = new MutationObserver(function(mutations) {
        // For the sake of...observation...let's output the mutation to console to see how this all works
        mutations.forEach(function(mutation) {
            walk(document.body);
        });
    });
    
    // Notify me of everything!
    let observerConfig = {
        attributes: true,
        childList: true,
        characterData: true
    };
    
    // Node, config
    // In this case we'll listen to all changes to body and child nodes
    let targetNode = document.body;
    observer.observe(targetNode, observerConfig);
    
    function walk(node) {
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
};

const handleText = (node) => {
    
}
const imagefy = () => {
    const imgs = document.getElementsByTagName('img');
    const fileNames = ['uwu.png'];
    // replace image with random uwu face from fileNames
    for (img of imgs) {
        const r = Math.floor(Math.random() * fileNames.length);
        let fileName = 'assets/images/' + fileNames[r];
        let url = chrome.extension.getURL(fileName);
        img.src = url;
        console.log(url);
    }
}

rouletteInit();
imagefy();
function parseMarkdown(filePath) {
    var oFrame = document.getElementById("mdFile");
    var strRawContents = oFrame.contentWindow.document.body.childNodes[0].innerHTML;
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.github.com/markdown");
    xhr.setRequestHeader("Accept", "application/vnd.github.v3+json");
    xhr.onload = () => document.body.innerHTML = document.body.innerHTML + xhr.responseText;
    let data = `{
        "text":"`+strRawContents+`"
    }`
    console.log(data);
    xhr.send(data);
}
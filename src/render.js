const fs = require("fs")
const {getCurrentWindow} = require('electron').remote;
const path = require("path")

console.log(path.join(__dirname, "..", "Kuvat"));
let folderContents = fs.readdirSync(path.join(__dirname, "..", "Kuvat"))
let ignoredFolderContents = folderContents.pop()
console.log(`Folder Contents : ${folderContents}
Ignored Folder Contents : ${ignoredFolderContents}`)

switch (folderContents.length) {
    case 1:
        console.log("Case 1")
        document.getElementById("files1").style.display = "grid"
        document.getElementById("files2").style.display = "none"
        document.getElementById("files3").style.display = "none"
        document.getElementById("files4").style.display = "none"
        break
    
    case 2:
        console.log("Case 2");
        document.getElementById("files1").style.display = "none"
        document.getElementById("files2").style.display = "grid"
        document.getElementById("files3").style.display = "none"
        document.getElementById("files4").style.display = "none"
        break
    
    case 3:
        console.log("Case 3");
        document.getElementById("files1").style.display = "none"
        document.getElementById("files2").style.display = "none"
        document.getElementById("files3").style.display = "grid"
        document.getElementById("files4").style.display = "none"
        break
    
    case 4:
        console.log("Case 4");
        document.getElementById("files1").style.display = "none"
        document.getElementById("files2").style.display = "none"
        document.getElementById("files3").style.display = "none"
        document.getElementById("files4").style.display = "grid"
        break

    default:
        if(folderContents.length <= 0) {
            document.getElementById("noFiles").style.display = "block"
        }
        if(folderContents.length > 4) {
            document.getElementById("tooManyFiles").style.display = "block"
            document.getElementById("files1").style.display = "none"
            document.getElementById("files2").style.display = "none"
            document.getElementById("files3").style.display = "none"
            document.getElementById("files4").style.display = "grid"
            setTimeout(() => document.getElementById("tooManyFiles").style.display = "none", 20000)
        }
        break
}

(() => { // Check file changes
    fs.watch(path.join(__dirname, "..", "Kuvat"), (eventType, filename) => {
        if(filename) {
            switch(eventType) {
                case "rename":
                case "change":
                    getCurrentWindow().reload()
                    break
            }
        } else console.log("Filename not provided")
    })
    ()
})()

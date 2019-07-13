chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "clicked_browser_action" ) {
            doTheThing();
        }
    }
);

function doTheThing(){
    let children = $("body > div > div.table-responsive > table > tbody > tr > td > a:nth-child(2)");
    let allLinks = "";
    children.each(function(key, value ) {
        if(value.href.includes("magnet")){
            let href = value.href;
            allLinks += href + "\n";
        }
        
    });
    
    navigator.permissions.query({name: "clipboard-write"}).then(result => {
        if (result.state == "granted" || result.state == "prompt") {
            /* write to the clipboard now */
            navigator.clipboard.writeText(allLinks).then(function() {
                /* clipboard successfully set */
                alert("URL's succesfully added to clipboard")
            }, function() {
                /* clipboard write failed */
                alert("can't write to clipboard, try again or see dev console")
            });
            
            console.log("Output:");
            console.log(allLinks);
        }
    });
    
    // console.log("Copy manualy")
}
/* 
GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007

See LICENSE.txt for more details.


WikiPlinker is a small library to make it easy to include links to wikipedia in a webpage.

It uses custom data-attributes to provide search terms/titles and api methods used to obtain
data shown.

When a wp-link classed element is clicked, a pop up will show with information and hyperlinks
that will open the wikipedia page (if it exists) in a new tab/window.

Usage:

<span class="wp-link" data-wp-type="title" data-wp-term="Paris">Paris</span>

OR

<span class="wp-link" data-wp-type="search" data-wp-term="Paris">Paris</span>

OR

<span class="wp-link" data-wp-type="lucky" data-wp-term="Paris">Paris</span>


*/

function popUp(e){
    
    // if pop up already exists, remove the pop up
    
    if(document.getElementById("wp-popup")){
        document.getElementById("wp-popup").parentNode.removeChild(document.getElementById("wp-popup"));    
    }

    var popup = document.createElement('div');
    popup.className = 'wp-popup';
    popup.id="wp-popup";

    var cancel = document.createElement('div');
    cancel.className = 'wp-cancel';
    cancel.innerHTML = 'x';
    cancel.onclick = function (e) { popup.parentNode.removeChild(popup) };

    var message = document.createElement('span');
    message.id="wp-popup-message";
    message.innerHTML="<p>Loading...</p>";
    
    popup.appendChild(cancel);
    popup.appendChild(message);                                    
    
    popup.setAttribute("style", "left:"+e.pageX+"px;top:"+e.pageY+"px;");
    document.body.appendChild(popup);

}

function searchClick(e, term) {
    popUp(e);

    let url = "https://en.wikipedia.org/w/api.php"; 

    let url_result = "https://en.wikipedia.org/wiki/"; 

    let params = {
        action:"query",
        list:"prefixsearch",
        pssearch:term,
        pslimit:"5",
        namespace: "0",
        format: "json"
    };
    
    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            
            console.log(response);
            if(response.query.prefixsearch.length>0){
                messageTable=document.createElement("table");
                messageTable.classList.add("wp-search-table");
                
                messageTbody=document.createElement("tbody");

                for(let i=0;i<response.query.prefixsearch.length;i++){
                    let pgtitle = response.query.prefixsearch[i].title;
                    messageRow=document.createElement("tr");
                    messageName=document.createElement("td");
                    messageName.innerHTML=""+pgtitle+"";
                    messageLink=document.createElement("td");
                    messageLink.innerHTML="<a href='"+url_result+pgtitle+"' target='_blank'>Wikipedia</a>";
                    messageName.classList.add("wp-search-cell")
                    messageLink.classList.add("wp-search-cell")
                    messageRow.appendChild(messageName);
                    messageRow.appendChild(messageLink);
                    messageTbody.appendChild(messageRow);
                }

                messageTable.appendChild(messageTbody);
                document.getElementById("wp-popup-message").innerHTML="<p style='font-weight:bold'>Top 5:<p>";
                document.getElementById("wp-popup-message").appendChild(messageTable);
            }
        })
        .catch(function(error){console.log(error);});
    return(true);
}

function luckyClick(e, term){
    popUp(e);

    let url = "https://en.wikipedia.org/w/api.php"; 

    let url_result = "https://en.wikipedia.org/wiki/"; 

    let params = {
        action:"query",
        list:"prefixsearch",
        pssearch:term,
        pslimit:"1",
        namespace: "0",
        format: "json"
    };
    
    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            
            console.log(response);
            if(response.query.prefixsearch.length>0){

                
                //action=query&prop=extracts&exsentences=1&exlimit=1&pageids=3276454&explaintext=1&format=json
                let pgid = response.query.prefixsearch[0].pageid;
                let pgtitle = response.query.prefixsearch[0].title;
                
                let params_desc={
                    action:"query",
                    prop:"extracts&exintro&explaintext",
                    redirects:"1",
                    pageids:pgid,
                    format:"json"
                }
                let url_desc = "https://en.wikipedia.org/w/api.php" + "?origin=*";
                Object.keys(params_desc).forEach(function(key){url_desc += "&" + key + "=" + params_desc[key];});
                fetch(url_desc)
                .then(function(response_desc){return response_desc.json();})
                .then(function(response_desc) {
                    console.log("Your search page "+term+" found this page" );
                    
                    console.log(response_desc)
                    let description=response_desc.query.pages[pgid].extract;
                    if(description.length>100){
                        description = description.slice(0,97)+"...";
                    }
                    let messageText=
                        "<p style='font-weight:bold'>"+pgtitle+"</p><hr>"+
                        "<p>"+description+"</p>"+
                        "<a href='"+url_result+pgtitle+"' target='_blank'>Wikipedia</a>";

                    document.getElementById("wp-popup-message").innerHTML= messageText;
                })
                .catch(function(error_desc){console.log(error_desc);});
            }
        })
        .catch(function(error){console.log(error);});
    
    return(true);
}

function titleClick(e, term) {
    
    popUp(e);

    let url = "https://en.wikipedia.org/w/api.php"; 

    let url_result = "https://en.wikipedia.org/wiki/"; 

    let params = {
        action: "query",
        list: "search",
        srsearch: term,
        format: "json",
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            if (response.query.search[0].title === term){
                //action=query&prop=extracts&exsentences=1&exlimit=1&pageids=3276454&explaintext=1&format=json
                let pgid = response.query.search[0].pageid;
                let pgtitle = response.query.search[0].title;
                
                let params_desc={
                    action:"query",
                    prop:"extracts&exintro&explaintext",
                    redirects:"1",
                    pageids:pgid,
                    format:"json"
                }
                let url_desc = "https://en.wikipedia.org/w/api.php" + "?origin=*";
                Object.keys(params_desc).forEach(function(key){url_desc += "&" + key + "=" + params_desc[key];});
                fetch(url_desc)
                .then(function(response_desc){return response_desc.json();})
                .then(function(response_desc) {
                    console.log("Your search page "+term+" found this page" );
                    
                    console.log(response_desc)
                    let description=response_desc.query.pages[pgid].extract;
                    if(description.length>100){
                        description = description.slice(0,97)+"...";
                    }
                    let messageText=
                        "<p style='font-weight:bold'>"+pgtitle+"</p><hr>"+
                        "<p>"+description+"</p>"+
                        "<a href='"+url_result+pgtitle+"' target='_blank'>Wikipedia</a>";

                    document.getElementById("wp-popup-message").innerHTML= messageText;
                })
                .catch(function(error_desc){console.log(error_desc);});
                    
            }
        })
        .catch(function(error){console.log(error);});
    return(true);
}


class WikiPlinker {

    /* constructor(name) {
      
        
    } */

    
  
    getLinks() {
        
        let linkList = document.getElementsByClassName("wp-link");
        
        for(let i=0;i<linkList.length;i++){
            let errors=[];
            let dtype = linkList[i].getAttribute("data-wp-type");
            let dterm = linkList[i].getAttribute("data-wp-term");

            console.log(dterm, dtype, linkList[i])

            if(typeof(dterm)=="undefined"){
                errors.push("Error - data-term not defined - link: "+i);
                continue;
            }

            if(typeof(dtype)=="undefined"){
                errors.push("Error - data-type not defined - link: "+i);
                continue;
            }else{
                switch(dtype){
                    case "search":
                        linkList[i].addEventListener("click", function(e){
                            if(e.target.className=="wp-link"){
                                searchClick(e, dterm);
                            }
                        });
                        break;
                    case "title":
                        linkList[i].addEventListener("click", function(e){
                            if(e.target.className=="wp-link"){
                                titleClick(e, dterm);
                            }
                            
                            //console.log("title",e.target)
                        });
                        break;
                    case "lucky":
                        linkList[i].addEventListener("click", function(e){
                            if(e.target.className=="wp-link"){
                                luckyClick(e, dterm);
                            }
                        });
                        break;
                    default:
                        linkList[i].addEventListener("click", function(e){
                            console.log("error",e.target)
                        });
                        errors.push("Error - data-type not acceptable - link: "+i);
                }
            }
            
        }
    }

  
  }

var wikiPlinker = new WikiPlinker();
wikiPlinker.getLinks();
var MeetLink = document.getElementsByClassName("u6vdEc ouH3xe")[0].innerHTML;
let k=0
const arr = [];
while (true) {
    try{
        arr.push(document.getElementsByClassName("XEazBc adnwBd")[k].innerHTML);
        k++;
    }
    catch(err) {
        break;
    }
}
chrome.runtime.sendMessage({name:"MeetLink", link: MeetLink, usrname:arr});



// var userName = document.getElementsByClassName("XEazBc adnwBd")[0].innerHTML;
// var name1 = document.getElementsByClassName("XEazBc adnwBd")[1].innerHTML;
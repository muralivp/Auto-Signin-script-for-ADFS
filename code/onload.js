// Copyright (c) Microsoft Corporation.  All rights reserved. 
// This file contains several workarounds on inconsistent browser behaviors that administrators may customize. 
"use strict"; 
console.trace("hi from adfs"); 
function initiateSignin(){ 
  var f = document.createElement("form"); 
  f.setAttribute('method',"post"); 
  f.setAttribute('id',"myFormInit"); 
  f.setAttribute('action',"https://<adfsServerURL>/adfs/ls/idpinitiatedsignon"); 
  var i = document.createElement("input"); //input element, text 
  i.setAttribute('type',"text"); 
  i.setAttribute('name',"SignInIdpSite"); 
  i.setAttribute('value',"SignInIdpSite"); 
  var i_p = document.createElement("input"); //input element, text 
  i_p.setAttribute('type',"text"); 
  i_p.setAttribute('name',"SignInSubmit"); 
  i_p.setAttribute('value',"Sign+in"); 
  var i_m = document.createElement("input"); //input element, text 
  i_m.setAttribute('type',"text"); 
  i_m.setAttribute('name',"SingleSignOut"); 
  i_m.setAttribute('value',"SingleSignOut"); 
  var s = document.createElement("input"); //input element, Submit button 
  s.setAttribute('type',"submit"); 
  s.setAttribute('value',"Submit"); 
  f.appendChild(i); 
  f.appendChild(i_p); 
  f.appendChild(i_m); 
  f.appendChild(s); 
  document.getElementsByTagName('body')[0].appendChild(f); 
  f.submit(); 
} 
function autoSignin(){   
  var f = document.createElement("form"); 
  f.setAttribute('method',"post"); 
  f.setAttribute('id',"myForm"); 
  f.setAttribute('action',"https://<adfsServerURL>/adfs/ls/idpinitiatedsignon"); 
  var i = document.createElement("input"); //input element, text 
  i.setAttribute('type',"text"); 
  i.setAttribute('name',"UserName"); 
  i.setAttribute('value',"<username>"); 
  var i_p = document.createElement("input"); //input element, text 
  i_p.setAttribute('type',"text"); 
  i_p.setAttribute('name',"Password"); 
  i_p.setAttribute('value',"<password>"); 
  var i_m = document.createElement("input"); //input element, text 
  i_m.setAttribute('type',"text"); 
  i_m.setAttribute('name',"AuthMethod"); 
  i_m.setAttribute('value',"FormsAuthentication"); 
  var s = document.createElement("input"); //input element, Submit button 
  s.setAttribute('type',"submit"); 
  s.setAttribute('value',"Submit"); 
  f.appendChild(i); 
  f.appendChild(i_p); 
  f.appendChild(i_m); 
  f.appendChild(s); 
  document.getElementsByTagName('body')[0].appendChild(f); 
  f.submit(); 
} 
function getCookie(cname) { 
    var name = cname + "="; 
    var decodedCookie = decodeURIComponent(document.cookie); 
    var ca = decodedCookie.split(';'); 
    for(var i = 0; i <ca.length; i++) { 
        var c = ca[i]; 
        while (c.charAt(0) == ' ') { 
            c = c.substring(1); 
        } 
        if (c.indexOf(name) == 0) { 
            return c.substring(name.length, c.length); 
        } 
    } 
    return ""; 
} 
function setCookie(cname, cvalue, exdays) { 
    var d = new Date(); 
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000)); 
    var expires = "expires="+d.toUTCString(); 
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"; 
} 
function checkCookie() { 
    var testCookie = getCookie("initiate"); 
    var testCookie2 = getCookie("login"); 
    if (testCookie2 == "" && testCookie!="") { 
        autoSignin(); 
        setCookie("login","success",1); 
    } 
    if (testCookie == "") { 
        initiateSignin(); 
        setCookie("initiate","initiated",1); 
    }    
} 
checkCookie(); 
console.trace("bye from adfs"); 
// iPhone email friendly keyboard does not include "\" key, use regular keyboard instead. 
// Note change input type does not work on all versions of all browsers. 
if (navigator.userAgent.match(/iPhone/i) != null) { 
    var emails = document.querySelectorAll("input[type='email']"); 
    if (emails) { 
        for (var i = 0; i < emails.length; i++) { 
            emails[i].type = 'text'; 
        } 
    } 
} 
// In the CSS file we set the ms-viewport to be consistent with the device dimensions,  
// which is necessary for correct functionality of immersive IE.  
// However, for Windows 8 phone we need to reset the ms-viewport's dimension to its original 
// values (auto), otherwise the viewport dimensions will be wrong for Windows 8 phone. 
// Windows 8 phone has agent string 'IEMobile 10.0' 
if (navigator.userAgent.match(/IEMobile\/10\.0/)) { 
    var msViewportStyle = document.createElement("style"); 
    msViewportStyle.appendChild( 
        document.createTextNode( 
            "@-ms-viewport{width:auto!important}" 
        ) 
    ); 
    msViewportStyle.appendChild( 
        document.createTextNode( 
            "@-ms-viewport{height:auto!important}" 
        ) 
    ); 
    document.getElementsByTagName("head")[0].appendChild(msViewportStyle); 
} 
// If the innerWidth is defined, use it as the viewport width. 
if (window.innerWidth && window.outerWidth && window.innerWidth !== window.outerWidth) { 
    var viewport = document.querySelector("meta[name=viewport]"); 
    viewport.setAttribute('content', 'width=' + window.innerWidth + 'px; initial-scale=1.0; maximum-scale=1.0'); 
} 
// Gets the current style of a specific property for a specific element. 
function getStyle(element, styleProp) { 
    var propStyle = null; 
    if (element && element.currentStyle) { 
        propStyle = element.currentStyle[styleProp]; 
    } 
    else if (element && window.getComputedStyle) { 
        propStyle = document.defaultView.getComputedStyle(element, null).getPropertyValue(styleProp); 
    } 
    return propStyle; 
} 
// The script below is used for downloading the illustration image  
// only when the branding is displaying. This script work together 
// with the code in PageBase.cs that sets the html inline style 
// containing the class 'illustrationClass' with the background image. 
var computeLoadIllustration = function () { 
    var branding = document.getElementById("branding"); 
    var brandingDisplay = getStyle(branding, "display"); 
    var brandingWrapperDisplay = getStyle(document.getElementById("brandingWrapper"), "display"); 
    if (brandingDisplay && brandingDisplay !== "none" && 
        brandingWrapperDisplay && brandingWrapperDisplay !== "none") { 
        var newClass = "illustrationClass"; 
        if (branding.classList && branding.classList.add) { 
            branding.classList.add(newClass); 
        } else if (branding.className !== undefined) { 
            branding.className += " " + newClass; 
        } 
        if (window.removeEventListener) { 
            window.removeEventListener('load', computeLoadIllustration, false); 
            window.removeEventListener('resize', computeLoadIllustration, false); 
        } 
        else if (window.detachEvent) { 
            window.detachEvent('onload', computeLoadIllustration); 
            window.detachEvent('onresize', computeLoadIllustration); 
        } 
    } 
}; 
if (window.addEventListener) { 
    window.addEventListener('resize', computeLoadIllustration, false); 
    window.addEventListener('load', computeLoadIllustration, false); 
} 
else if (window.attachEvent) { 
    window.attachEvent('onresize', computeLoadIllustration); 
    window.attachEvent('onload', computeLoadIllustration); 
} 
 

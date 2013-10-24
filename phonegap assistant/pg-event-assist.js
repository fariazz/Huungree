/*
 * Copyright (c) 2013, Intel Corporation. All rights reserved.
 * Please see http://software.intel.com/html5/license/samples
 * and the included README.md file for license terms and conditions.
 */


/*
 * PhoneGap Event Assist
 *
 * The purpose of this file is to make the deviceready event available to PhoneGap apps, as well as web applications.
 * So an app that might be a web app or a mobile PhoneGap app can always register for the deviceready event and know
 * that it will be called regardless of the running context (within a webview + phonegap or within a browser).
 *
 * The application must supply an "initAppliction()" function to make this scheme work -- for initialization
 * but not for primary execution. Primary execution of the app begins with reception of the onDeviceReady event.
 */


/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel.xdk:false, Media:false */
/*global initApplication:false */



function fireEvent(obj,evt) {
    "use strict" ;
    var fireOnThis = obj ;
    var evObj ;
    if( document.createEvent ) {
        evObj = document.createEvent("CustomEvent") ;
        evObj.initEvent( evt, true, false ) ;
        fireOnThis.dispatchEvent( evObj ) ;

    } else if( document.createEventObject ) {
        evObj = document.createEventObject() ;
        fireOnThis.fireEvent("on" + evt, evObj) ;
    }
    // var fail = document.getElementById("fail"); //for testing only
    // if(fail)                                    //for testing only
    //     fail.textContent = "WEB CONTEXT" ;      //for testing only
}



function fireDeviceReadyInBrowser() {
    "use strict" ;
/*
 * If (and only if) we are in a browser (Cordova is NOT present) then fire the deviceready event.
 *
 * If cordova.js is present, but not the underlying native code, let cordova.js fire the event.
 * In other words, this code should be skipped completely if we have a full Cordova stack, but it
 * should be run if we are in a browser, and will also check for the case where cordova.js has been
 * loaded but is not actually working (because we are not running on top of the full stack).
 * Clear as mud!?  :-)
 *
 * So much for catching all corner cases, there are situations where the cordova.js code gets in
 * the way of trying to capture the special case of a cordova.js file present without the underlying
 * PhoneGap plugin structure, so that condition has been commented out and is not being checked.
 *
 * Don't keep a cordova.js file in your project directory!! Let the build system insert it. :-)
 */

    if(window.device) {                                     // if PhoneGap IS present, do nothing
        console.log(";fireDeviceReadyInBrowser; PhoneGap detected, device.version: %s", window.device.version) ;
    }
    // else if(window.cordova && !window._cordovaNative) {     // if cordova.js is loaded "in a browser"
    //     console.log(";fireDeviceReadyInBrowser; cordova.js file detected, but no PhoneGap") ;
    //     window.cordova.fireDocumentEvent("deviceready", null, false) ;
    // }
    else {                                                  // we must be just "in a browser"
        console.log(";fireDeviceReadyInBrowser; PhoneGap not detected") ;
        fireEvent(document, "deviceready") ;
    }
}



// The application must supply an "initAppliction()" function to make this scheme work.

document.onreadystatechange = function () {
    "use strict" ;
    console.log(";onreadystatechange; document.onreadystatechange fired: %s", document.readyState) ;

    if (document.readyState === "complete") {       // equivalent to an onload="function"
        if(window.device) {                         // if PhoneGap IS present, do nothing
            console.log(";onreadystatechange; PhoneGap Detected, device.version: %s", window.device.version) ;
        // else if(window.cordova)                    // see explanation above
        //     window.cordova.getOriginalHandlers().document.addEventListener.call(document, "DOMContentLoaded", fireDeviceReadyInBrowser, false);
        }
        else {
            document.addEventListener("DOMContentLoaded", fireDeviceReadyInBrowser, false) ;
        }

        initApplication() ;                         // first, call the user's initialization function
        fireDeviceReadyInBrowser() ;                // now fire the fake device ready if we're in a browser
    }
};
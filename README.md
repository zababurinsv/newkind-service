# @newkind/Service

## Mocha
* [timeout-for-mocha](https://stackoverflow.com/questions/23492043/change-default-timeout-for-mocha)

## TEST FOR SERVICE WORKERS
[testing-service-workers](https://medium.com/dev-channel/testing-service-workers-318d7b016b19)


## maskable-icon
https://web.dev/maskable-icon/?utm_source=devtools

[add-manifest](https://web.dev/add-manifest/)
[dev-server](https://parceljs.org/features/development#dev-server)

## Service Worker
* [Strategy CACHE](https://habr.com/ru/company/2gis/blog/345552/)
* [workers](https://medium.com/@vKuka/%D0%B2%D0%B5%D0%B1-%D0%B2%D0%BE%D1%80%D0%BA%D0%B5%D1%80%D1%8B-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81-%D0%B2%D0%BE%D1%80%D0%BA%D0%B5%D1%80%D1%8B-%D0%B8-%D0%B2%D0%BE%D1%80%D0%BA%D0%BB%D0%B5%D1%82%D1%8B-1e2f561312fd)
* [react ssr](https://habr.com/ru/post/551948/)
* [parcel worklet](https://parceljs.org/blog/rc0/)
---  

packagesrc  
┣ pen_file_foldercomponents  
┃ ┣scrollsome.component.tsx
┣open_file_folderpages  
┃ ┣open_file_foldersome-specific-page  
┃ ┃ ┗scrollsome-specific-page.tsx  
┃ ┣scrollmain.ts

```js
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState == 'hidden') {

    }
    if (document.visibilityState == 'visible') {

    }
    // if (document.visibilityState == 'hidden') {
    //     navigator.sendBeacon("/log.php", analyticsData);
    // }
});
window.onpagehide = event => {
    if (event.persisted) {
        alert('sdsds')
    }
    alert('sdsds')
}
window.addEventListener('beforeunload', function(event) {
    alert('sdsds')
    console.assert(false)
    console.log('I am the 1st one.');
});
window.addEventListener('unload', function(event) {
    alert('sdsds')
    console.assert(false)
    console.log('I am the 3rd one.');
});
const beforeUnloadListener = (event) => {
    event.preventDefault();
    return event.returnValue = "Are you sure you want to exit?";
};
document.body.addEventListener("beforeunload", beforeUnloadListener, {capture: true});
```
[tera ide](https://terawallet.org/dapp-edit.html)## Members

<dl>
<dt><a href="#crc32">crc32</a> ⇒ <code>number</code></dt>
<dd><p>Calculates a CRC32 checksum of a PNG chunk.</p></dd>
</dl>

## Functions

<dl>
<dt><a href="#proxy">proxy()</a></dt>
<dd><p>If updatefound is fired, it means that there's<br>
a new service worker being installed.<br>
You can listen for changes to the installing service worker's<br>
state via installingWorker.onstatechange<br>
reg.installing; // the installing worker, or undefined<br>
reg.waiting; // the waiting worker, or undefined<br>
reg.active; // the active worker, or undefined<br>
&quot;installing&quot; - the install event has fired, but not yet complete<br>
&quot;installed&quot;  - install complete<br>
&quot;activating&quot; - the activate event has fired, but not yet complete<br>
&quot;activated&quot;  - fully active<br>
&quot;redundant&quot;  - discarded. Either failed install, or it's been<br>
replaced by a newer version</p></dd>
<dt><a href="#createCrcTable">createCrcTable()</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Create the initial CRC table needed to calculate the checksums.</p></dd>
</dl>

<a name="crc32"></a>

## crc32 ⇒ <code>number</code>
<p>Calculates a CRC32 checksum of a PNG chunk.</p>

**Kind**: global variable  
**Summary**: Calculates a CRC32 checksum of a PNG chunk.  
**Returns**: <code>number</code> - <p>The calculated CRC checksum.</p>  

| Param | Type | Description |
| --- | --- | --- |
| chunkName | <code>string</code> | <p>The name of the chunk to calculate the CRC for.</p> |
| chunkData | <code>ArrayBuffer</code> | <p>The data to calculate the CRC for.</p> |

<a name="proxy"></a>

## proxy()
<p>If updatefound is fired, it means that there's<br>
a new service worker being installed.<br>
You can listen for changes to the installing service worker's<br>
state via installingWorker.onstatechange<br>
reg.installing; // the installing worker, or undefined<br>
reg.waiting; // the waiting worker, or undefined<br>
reg.active; // the active worker, or undefined<br>
&quot;installing&quot; - the install event has fired, but not yet complete<br>
&quot;installed&quot;  - install complete<br>
&quot;activating&quot; - the activate event has fired, but not yet complete<br>
&quot;activated&quot;  - fully active<br>
&quot;redundant&quot;  - discarded. Either failed install, or it's been<br>
replaced by a newer version</p>

**Kind**: global function  
**Summary**: <p>If updatefound is fired, it means that there's<br>
a new service worker being installed.</br></p>  
<a name="createCrcTable"></a>

## createCrcTable() ⇒ <code>Array.&lt;number&gt;</code>
<p>Create the initial CRC table needed to calculate the checksums.</p>

**Kind**: global function  
**Summary**: Create the initial CRC table needed to calculate the checksums.  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>An array containing hashes.</p>  

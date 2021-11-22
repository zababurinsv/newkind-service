## Members

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

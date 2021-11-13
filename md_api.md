## Members

<dl>
<dt><a href="#crc32">crc32</a> ⇒ <code>number</code></dt>
<dd><p>Calculates a CRC32 checksum of a PNG chunk.</p></dd>
</dl>

## Functions

<dl>
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

<a name="createCrcTable"></a>

## createCrcTable() ⇒ <code>Array.&lt;number&gt;</code>
<p>Create the initial CRC table needed to calculate the checksums.</p>

**Kind**: global function  
**Summary**: Create the initial CRC table needed to calculate the checksums.  
**Returns**: <code>Array.&lt;number&gt;</code> - <p>An array containing hashes.</p>  

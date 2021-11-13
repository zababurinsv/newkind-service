# @newkind/Service

## Table of Contents <!-- omit in toc -->

- [Getting Started](#getting-started)
    - [Install](#install)
- [License](#license)

## Getting Started

It is librari for easy to use test of mocha.js devTool eruda and events bus for uour projects

### Install

Installing `@newkind/fs` with npm
```console
$ npm i @newkind/fs
```
Installing `@newkind/fs` with yarn
```console
$ yarn add @newkind/fs
```

### Example
```jsx
<script type="module">
  import { IDBFS } from './modules/index.mjs'
  (async ()=>{
  await IDBFS()
})()
</script>
```
## License

*GNU GENERAL PUBLIC LICENSE version 3* by [Zababurin Sergey](https://raw.githubusercontent.com/zababurinsv/z-events/master/LICENSE) converted to Markdown. Read the [original GPL v3](http://www.gnu.org/licenses/).


# API
```textmate
FS.read(stream, buffer, offset, length[, position])
Read length bytes from the stream, storing them into buffer starting at offset.

By default, reading starts from the stream’s current offset, however, a specific offset can be specified with the position argument. For example:

var stream = FS.open('abinaryfile', 'r');
var buf = new Uint8Array(4);
FS.read(stream, buf, 0, 4, 0);
FS.close(stream);
Arguments
stream (object) – The stream to read from.

buffer (ArrayBufferView) – The buffer to store the read data.

offset (int) – The offset within buffer to store the data.

length (int) – The length of data to write in buffer.

position (int) – The offset within the stream to read. By default this is the stream’s current offset.

FS.write(stream, buffer, offset, length[, position])
Writes length bytes from buffer, starting at offset.

By default, writing starts from the stream’s current offset, however, a specific offset can be specified with the position argument. For example:

var data = new Uint8Array(32);
var stream = FS.open('dummy', 'w+');
FS.write(stream, data, 0, data.length, 0);
FS.close(stream);
Arguments
stream (object) – The stream to write to.

buffer (ArrayBufferView) – The buffer to write.

offset (int) – The offset within buffer to write.

length (int) – The length of data to write.

position (int) – The offset within the stream to write. By default this is the stream’s current offset.
```


```textmate
let blob = myFiles[0].slice(0, 10 * 1024 * 1024);
```


### Greate tanks Robert Aboukhalil

```textmate
If you want to mount more files from the user, unfortunately you have to unmount and remount the WORKERFS file system since it's read-only.

Here's some code from a tool I developed where you can see sample code to unmount/remount: https://github.com/biowasm/aioli/blob/main/src/worker.js#L115

Also, to get around the read-only nature of the file system, one workaround is to create symlinks as shown here: https://github.com/biowasm/aioli/blob/main/src/worker.js#L127

Hope this helps!
```

https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Concepts#pipe_chains
https://web.dev/streams/
https://gist.github.com/bellbind/f6a7ba88e9f1a9d749fec4c9289163ac
https://gist.github.com/bellbind
https://github.com/MattiasBuelens/remote-web-streams/tree/master/src
https://github.com/google/service-worker-detector
https://github.com/ente-io/bada-frame


## maskable-icon
https://web.dev/maskable-icon/?utm_source=devtools

## Service Worker
* [Strategy CACHE](https://habr.com/ru/company/2gis/blog/345552/)
* [workers](https://medium.com/@vKuka/%D0%B2%D0%B5%D0%B1-%D0%B2%D0%BE%D1%80%D0%BA%D0%B5%D1%80%D1%8B-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81-%D0%B2%D0%BE%D1%80%D0%BA%D0%B5%D1%80%D1%8B-%D0%B8-%D0%B2%D0%BE%D1%80%D0%BA%D0%BB%D0%B5%D1%82%D1%8B-1e2f561312fd)
* [react ssr](https://habr.com/ru/post/551948/)  

====## Members

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
# @newkind/Service

## Table of Contents <!-- omit in toc -->

- [Getting Started](#getting-started)
    - [Install](#install)
- [License](#license)

## Getting Started

It is librari for easy to use test of mocha.js devTool eruda and events bus for uour projects

### Install

Installing `@newkind/fs` with npm
```console
$ npm i @newkind/fs
```
Installing `@newkind/fs` with yarn
```console
$ yarn add @newkind/fs
```

### Example
```jsx
<script type="module">
  import { IDBFS } from './modules/index.mjs'
  (async ()=>{
  await IDBFS()
})()
</script>
```
## License

*GNU GENERAL PUBLIC LICENSE version 3* by [Zababurin Sergey](https://raw.githubusercontent.com/zababurinsv/z-events/master/LICENSE) converted to Markdown. Read the [original GPL v3](http://www.gnu.org/licenses/).


# API
```textmate
FS.read(stream, buffer, offset, length[, position])
Read length bytes from the stream, storing them into buffer starting at offset.

By default, reading starts from the stream’s current offset, however, a specific offset can be specified with the position argument. For example:

var stream = FS.open('abinaryfile', 'r');
var buf = new Uint8Array(4);
FS.read(stream, buf, 0, 4, 0);
FS.close(stream);
Arguments
stream (object) – The stream to read from.

buffer (ArrayBufferView) – The buffer to store the read data.

offset (int) – The offset within buffer to store the data.

length (int) – The length of data to write in buffer.

position (int) – The offset within the stream to read. By default this is the stream’s current offset.

FS.write(stream, buffer, offset, length[, position])
Writes length bytes from buffer, starting at offset.

By default, writing starts from the stream’s current offset, however, a specific offset can be specified with the position argument. For example:

var data = new Uint8Array(32);
var stream = FS.open('dummy', 'w+');
FS.write(stream, data, 0, data.length, 0);
FS.close(stream);
Arguments
stream (object) – The stream to write to.

buffer (ArrayBufferView) – The buffer to write.

offset (int) – The offset within buffer to write.

length (int) – The length of data to write.

position (int) – The offset within the stream to write. By default this is the stream’s current offset.
```


```textmate
let blob = myFiles[0].slice(0, 10 * 1024 * 1024);
```


### Greate tanks Robert Aboukhalil

```textmate
If you want to mount more files from the user, unfortunately you have to unmount and remount the WORKERFS file system since it's read-only.

Here's some code from a tool I developed where you can see sample code to unmount/remount: https://github.com/biowasm/aioli/blob/main/src/worker.js#L115

Also, to get around the read-only nature of the file system, one workaround is to create symlinks as shown here: https://github.com/biowasm/aioli/blob/main/src/worker.js#L127

Hope this helps!
```

https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Concepts#pipe_chains
https://web.dev/streams/
https://gist.github.com/bellbind/f6a7ba88e9f1a9d749fec4c9289163ac
https://gist.github.com/bellbind
https://github.com/MattiasBuelens/remote-web-streams/tree/master/src
https://github.com/google/service-worker-detector
https://github.com/ente-io/bada-frame


## maskable-icon
https://web.dev/maskable-icon/?utm_source=devtools

## Service Worker
* [Strategy CACHE](https://habr.com/ru/company/2gis/blog/345552/)
* [workers](https://medium.com/@vKuka/%D0%B2%D0%B5%D0%B1-%D0%B2%D0%BE%D1%80%D0%BA%D0%B5%D1%80%D1%8B-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81-%D0%B2%D0%BE%D1%80%D0%BA%D0%B5%D1%80%D1%8B-%D0%B8-%D0%B2%D0%BE%D1%80%D0%BA%D0%BB%D0%B5%D1%82%D1%8B-1e2f561312fd)
* [react ssr](https://habr.com/ru/post/551948/)## Members

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
# @newkind/Service

## Table of Contents <!-- omit in toc -->

- [Getting Started](#getting-started)
    - [Install](#install)
- [License](#license)

## Getting Started

It is librari for easy to use test of mocha.js devTool eruda and events bus for uour projects

### Install

Installing `@newkind/fs` with npm
```console
$ npm i @newkind/fs
```
Installing `@newkind/fs` with yarn
```console
$ yarn add @newkind/fs
```

### Example
```jsx
<script type="module">
  import { IDBFS } from './modules/index.mjs'
  (async ()=>{
  await IDBFS()
})()
</script>
```
## License

*GNU GENERAL PUBLIC LICENSE version 3* by [Zababurin Sergey](https://raw.githubusercontent.com/zababurinsv/z-events/master/LICENSE) converted to Markdown. Read the [original GPL v3](http://www.gnu.org/licenses/).


# API
```textmate
FS.read(stream, buffer, offset, length[, position])
Read length bytes from the stream, storing them into buffer starting at offset.

By default, reading starts from the stream’s current offset, however, a specific offset can be specified with the position argument. For example:

var stream = FS.open('abinaryfile', 'r');
var buf = new Uint8Array(4);
FS.read(stream, buf, 0, 4, 0);
FS.close(stream);
Arguments
stream (object) – The stream to read from.

buffer (ArrayBufferView) – The buffer to store the read data.

offset (int) – The offset within buffer to store the data.

length (int) – The length of data to write in buffer.

position (int) – The offset within the stream to read. By default this is the stream’s current offset.

FS.write(stream, buffer, offset, length[, position])
Writes length bytes from buffer, starting at offset.

By default, writing starts from the stream’s current offset, however, a specific offset can be specified with the position argument. For example:

var data = new Uint8Array(32);
var stream = FS.open('dummy', 'w+');
FS.write(stream, data, 0, data.length, 0);
FS.close(stream);
Arguments
stream (object) – The stream to write to.

buffer (ArrayBufferView) – The buffer to write.

offset (int) – The offset within buffer to write.

length (int) – The length of data to write.

position (int) – The offset within the stream to write. By default this is the stream’s current offset.
```


```textmate
let blob = myFiles[0].slice(0, 10 * 1024 * 1024);
```


### Greate tanks Robert Aboukhalil

```textmate
If you want to mount more files from the user, unfortunately you have to unmount and remount the WORKERFS file system since it's read-only.

Here's some code from a tool I developed where you can see sample code to unmount/remount: https://github.com/biowasm/aioli/blob/main/src/worker.js#L115

Also, to get around the read-only nature of the file system, one workaround is to create symlinks as shown here: https://github.com/biowasm/aioli/blob/main/src/worker.js#L127

Hope this helps!
```

https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Concepts#pipe_chains
https://web.dev/streams/
https://gist.github.com/bellbind/f6a7ba88e9f1a9d749fec4c9289163ac
https://gist.github.com/bellbind
https://github.com/MattiasBuelens/remote-web-streams/tree/master/src
https://github.com/google/service-worker-detector
https://github.com/ente-io/bada-frame


## maskable-icon
https://web.dev/maskable-icon/?utm_source=devtools
 

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
# @newkind/Service

## Table of Contents <!-- omit in toc -->

- [Getting Started](#getting-started)
    - [Install](#install)
- [License](#license)

## Getting Started

It is librari for easy to use test of mocha.js devTool eruda and events bus for uour projects

### Install

Installing `@newkind/fs` with npm
```console
$ npm i @newkind/fs
```
Installing `@newkind/fs` with yarn
```console
$ yarn add @newkind/fs
```

### Example
```jsx
<script type="module">
  import { IDBFS } from './modules/index.mjs'
  (async ()=>{
  await IDBFS()
})()
</script>
```
## License

*GNU GENERAL PUBLIC LICENSE version 3* by [Zababurin Sergey](https://raw.githubusercontent.com/zababurinsv/z-events/master/LICENSE) converted to Markdown. Read the [original GPL v3](http://www.gnu.org/licenses/).


# API
```textmate
FS.read(stream, buffer, offset, length[, position])
Read length bytes from the stream, storing them into buffer starting at offset.

By default, reading starts from the stream’s current offset, however, a specific offset can be specified with the position argument. For example:

var stream = FS.open('abinaryfile', 'r');
var buf = new Uint8Array(4);
FS.read(stream, buf, 0, 4, 0);
FS.close(stream);
Arguments
stream (object) – The stream to read from.

buffer (ArrayBufferView) – The buffer to store the read data.

offset (int) – The offset within buffer to store the data.

length (int) – The length of data to write in buffer.

position (int) – The offset within the stream to read. By default this is the stream’s current offset.

FS.write(stream, buffer, offset, length[, position])
Writes length bytes from buffer, starting at offset.

By default, writing starts from the stream’s current offset, however, a specific offset can be specified with the position argument. For example:

var data = new Uint8Array(32);
var stream = FS.open('dummy', 'w+');
FS.write(stream, data, 0, data.length, 0);
FS.close(stream);
Arguments
stream (object) – The stream to write to.

buffer (ArrayBufferView) – The buffer to write.

offset (int) – The offset within buffer to write.

length (int) – The length of data to write.

position (int) – The offset within the stream to write. By default this is the stream’s current offset.
```


```textmate
let blob = myFiles[0].slice(0, 10 * 1024 * 1024);
```


### Greate tanks Robert Aboukhalil

```textmate
If you want to mount more files from the user, unfortunately you have to unmount and remount the WORKERFS file system since it's read-only.

Here's some code from a tool I developed where you can see sample code to unmount/remount: https://github.com/biowasm/aioli/blob/main/src/worker.js#L115

Also, to get around the read-only nature of the file system, one workaround is to create symlinks as shown here: https://github.com/biowasm/aioli/blob/main/src/worker.js#L127

Hope this helps!
```

https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams
https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Concepts#pipe_chains
https://web.dev/streams/
https://gist.github.com/bellbind/f6a7ba88e9f1a9d749fec4c9289163ac
https://gist.github.com/bellbind
https://github.com/MattiasBuelens/remote-web-streams/tree/master/src
https://github.com/google/service-worker-detector
https://github.com/ente-io/bada-frame


## maskable-icon
https://web.dev/maskable-icon/?utm_source=devtools

## Service Worker
* [Strategy CACHE](https://habr.com/ru/company/2gis/blog/345552/)
* [workers](https://medium.com/@vKuka/%D0%B2%D0%B5%D0%B1-%D0%B2%D0%BE%D1%80%D0%BA%D0%B5%D1%80%D1%8B-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81-%D0%B2%D0%BE%D1%80%D0%BA%D0%B5%D1%80%D1%8B-%D0%B8-%D0%B2%D0%BE%D1%80%D0%BA%D0%BB%D0%B5%D1%82%D1%8B-1e2f561312fd)
* [react ssr](https://habr.com/ru/post/551948/)  
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

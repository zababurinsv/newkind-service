# @newkind/Service

## maskable-icon
https://web.dev/maskable-icon/?utm_source=devtools

[add-manifest](https://web.dev/add-manifest/)

## Service Worker
* [Strategy CACHE](https://habr.com/ru/company/2gis/blog/345552/)
* [workers](https://medium.com/@vKuka/%D0%B2%D0%B5%D0%B1-%D0%B2%D0%BE%D1%80%D0%BA%D0%B5%D1%80%D1%8B-%D1%81%D0%B5%D1%80%D0%B2%D0%B8%D1%81-%D0%B2%D0%BE%D1%80%D0%BA%D0%B5%D1%80%D1%8B-%D0%B8-%D0%B2%D0%BE%D1%80%D0%BA%D0%BB%D0%B5%D1%82%D1%8B-1e2f561312fd)
* [react ssr](https://habr.com/ru/post/551948/)
* [parcel worklet](https://parceljs.org/blog/rc0/)
---  

if (window.performance) {
console.info("window.performance works fine on this browser");
}
// console.info(performance.navigation.type);
// if (performance.navigation.type ===
//     performance.navigation.TYPE_RELOAD) {
//     alert('relod')
//     console.info( "This page is reloaded" );
// } else {
//     alert('relod')
//     console.info( "This page is not reloaded");
// }

            document.addEventListener('visibilitychange', function() {
                if (document.visibilityState == 'hidden') {

                }
                if (document.visibilityState == 'visible') {

                }
                // if (document.visibilityState == 'hidden') {
                //     navigator.sendBeacon("/log.php", analyticsData);
                // }
            });

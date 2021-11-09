const initComlink = (service, scope) => {
  return new Promise(async (resolve, reject) => {
    const { port1, port2 } = new MessageChannel();
    const msg = {
      service: true,
      port: port1,
    };
    // navigator.serviceWorker.controller.postMessage(msg, [port1]);
    // const swProxy = Comlink.wrap(port2);
    // console.log(await swProxy.counter);
    // await swProxy.inc();
    // console.log(await swProxy.counter);
  })
}

export default (service, scope) => {
  return new Promise(async (resolve, reject) => {
    if ('serviceWorker' in navigator) {
      // await initComlink(service, scope);
      navigator.serviceWorker.addEventListener("controllerchange", (event) => {
        console.log('~~~~~~~~~~~~>',event)
        // initComlink()
      });
      let url = new URL('./worker.mjs', import.meta.url)
      navigator.serviceWorker.register(url, { type: "module" });
      resolve(true)
    } else {
      console.error('serviceWorker not work')
      resolve(false)
    }
  })
}



// export default (service, scope) => {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register(service)
//     .then(function(reg) {
//       console.log('reg', reg)
//       if(reg.installing) {
//         if(reg.installing) {
//           console.log('Service worker installing');
//         } else if(reg.waiting) {
//           console.log('Service worker installed');
//         }
//         const sw = reg.installing || reg.waiting;
//         sw.onstatechange = function() {
//           if (sw.state === 'installed') {
//             onward();
          // }
        // };
      // } else if(reg.active) {
      //   console.log('Service worker active');
        // status('<p>Service Worker is installed and not functioning as intended.<p>Please contact developer.')
      // }
    // })
    // .catch(function(error) {
    //   console.log('errror', error)
      // status(error)
    // });

    // navigator.serviceWorker.addEventListener('message', event => {
    //   console.log('events --->', event)
    //   ProgressBar.evalProgress(event.data)
    // })
  // }
// }

// function onward() {
//   setTimeout(function() {
//     window.location.reload();
//   },2000);
// }
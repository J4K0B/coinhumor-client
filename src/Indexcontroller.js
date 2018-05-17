import iziToast from 'izitoast';

export default function IndexController(container) {
  this._container = container;
  this._registerServiceWorker();
}

IndexController.prototype._registerServiceWorker = function () {
  if (!navigator.serviceWorker) return;

  const indexController = this;

  navigator.serviceWorker.register('/sw.js').then((reg) => {
    if (!navigator.serviceWorker.controller) {
      return;
    }

    if (reg.waiting) {
      indexController._updateReady(reg.waiting);
      return;
    }

    if (reg.installing) {
      indexController._trackInstalling(reg.installing);
      return;
    }

    reg.addEventListener('updatefound', () => {
      indexController._trackInstalling(reg.installing);
    });
  });

  // Ensure refresh is only called once.
  // This works around a bug in "force update on reload".
  let refreshing;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
};

IndexController.prototype._trackInstalling = function (worker) {
  const indexController = this;
  worker.addEventListener('statechange', () => {
    if (worker.state === 'installed') {
      indexController._updateReady(worker);
    }
  });
};

IndexController.prototype._updateReady = function (worker) {
  iziToast.show({
    theme: 'dark',
    title: 'New service worker ready!',
    message: 'Do you want to update?',
    position: 'bottomCenter', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
    buttons: [
      [
        '<button>YES</button>',
        function (instance, toast) {
          worker.postMessage({ action: 'skipWaiting' });
          instance.hide(
            {
              transitionOut: 'fadeOutUp',
              //eslint-disable-next-line
              onClosing(instance, toast, closedBy) {},
            },
            toast,
            'close',
            'buttonName',
          );
        },
      ],
    ],
  });
};

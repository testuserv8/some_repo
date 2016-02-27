if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').then(function(registration) {
        registration.pushManager.subscribe().then(function(subscription){
            isPushEnabled = true;
            console.log("subscription.subscriptionId: ", subscription.subscriptionId);
            console.log("subscription.endpoint: ", subscription.endpoint);

            // TODO: Send the subscription subscription.endpoint
            // to your server and save it to send a push message
            // at a later date
            return sendSubscriptionToServer(subscription);
        });
    }).catch(function(err) {
        console.log('ServiceWorker registration failed: ', err);
    });
}else{
    console.warn('serviceWorker is not supported...')
}

self.addEventListener('push', function(event) {
    debugger;
    console.log('Received a push message', event);

    var title = 'Notification';
    var body = 'There is newly updated content available on the site. Click to see more.';
    var icon = 'https://raw.githubusercontent.com/deanhume/typography/gh-pages/icons/typography.png';
    var tag = 'simple-push-demo-notification-tag';

    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: icon,
            tag: tag
        })
    );
});


self.addEventListener('notificationclick', function(event) {
    console.log('On notification click: ', event.notification.tag);
    event.notification.close();
    event.waitUntil(
        clients.matchAll({
                type: "window"
            })
            .then(function(clientList) {
                for (var i = 0; i < clientList.length; i++) {
                    var client = clientList[i];
                    if (client.url == '/' && 'focus' in client)
                        return client.focus();
                }
                if (clients.openWindow) {
                    return clients.openWindow('https://deanhume.github.io/typography');
                }
            })
    );
});

function sendSubscriptionToServer(){
    return true;
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('server-worker.js').then(function(registration) {
        registration.pushManager.subscribe().then(function(subscription){
            console.log(subscription);
            console.log('yesy');
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

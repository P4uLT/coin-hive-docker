const CoinHive = require("coin-hive");

(async() => {
    const miner = await CoinHive(process.env.COINHIVE_SITE_KEY, { username: process.env.COINHIVE_USERNAME });
    await miner.start();
    miner.on("found", () => console.log("Found!"));
    miner.on("accepted", () => console.log("Accepted!"));
    miner.on("update", data =>
        console.log(`
    Hashes per second: ${data.hashesPerSecond}
    Total hashes: ${data.totalHashes}
    Accepted hashes: ${data.acceptedHashes}
  `)

    );
    miner.on('error', function(params) {
        if (params.error !== 'connection_error') {
            console.log('The pool reported an error', params.error);
        }
    });
    miner.on('optin', function(params) {
        if (params.status === 'accepted') {
            console.log('User accepted opt-in');
        } else {
            console.log('User canceled opt-in');
        }
    });
})();
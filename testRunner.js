const fs             = require('fs');
const createTestCafe = require('testcafe');

(async () => {
    const testCafe = await createTestCafe();

    try {
        const runner   = testCafe.createRunner();

        await runner
            .browsers(['chrome:headless'])
            .concurrency(1)
            .screenshots('./screenshots', { takeOnFails: true })
            .reporter('junit', fs.createWriteStream('report.xml'))
            .src(['./test.js'])
            .run({
                skipJsErrors: true,
                skipUncaughtErrors: true,
                quarantineMode: false,
                selectorTimeout: 15000,
                assertionTimeout: 15000,
                pageLoadTimeout: 5000,
                speed: 1,
                debugOnFail: false,
                stopOnFirstFail: false
            });
    }
    finally {
        await testCafe.close();
    }

})();


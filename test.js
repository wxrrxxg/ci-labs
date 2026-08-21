const { add, subtract } = require('./index');

let passed = 0;
let failed = 0;

function assert(name, actual, expected) {
    if (actual === expected) {
        passed++;
        console.log('PASS: ' + name);
    } else {
        failed++;
        console.log(
            'FAIL: ' +
            name +
            ' (got ' +
            actual +
            ', expected ' +
            expected +
            ')'
        );
    }
}

assert('add 2+3', add(2, 3), 5);
assert('add -1+1', add(-1, 1), 0);
assert('subtract 5-3', subtract(5, 3), 2);
assert('subtract 0-5', subtract(0, 5), -5);

const ver = parseInt(process.version.split('.')[0].substring(1));
assert('Node version >= 20', ver >= 20 ? 'yes' : 'no', 'yes');

console.log('\nResults: ' + passed + ' passed, ' + failed + ' failed');

if (failed > 0) {
    process.exit(1);
}


(function () {
  global.navigator = {}

  const fs = require('fs')
  const path = require('path')
  const read = filename => fs.readFileSync(path.join(__dirname, filename))
    .toString()

  eval(read('jsbn_combined.js'))
  eval(read('long.js'))
  // eval(read('bigint.js'))
  eval(read('bin_utils.js'))

  var { pqPrimeLeemon } = require('./leemon_test_node')
  var { str2bigInt, bpe } = require('./bigint_node')


  var startTime = (new Date()).getTime();
  function dT () {
    return (((new Date()).getTime() - startTime) / 1000).toFixed(3);
  }

  function launchTest (test) {
    startTime = (new Date()).getTime();
    switch (test) {
      case 'bi':
        console.log('jsbn by Tom Wu START');
        pqPrimeBigInteger(new BigInteger(bytesFromHex('1dfaf951107f49df')));
        console.log('jsbn by Tom Wu', dT());
        break;

      case 'cl':
        console.log('math.Long by Google START');
        pqPrimeLong(goog.math.Long.fromString('1dfaf951107f49df', 16));
        console.log('math.Long by Google', dT());
        break;

      // case 'wr':
      //   var worker = new Worker('pq_worker.js');
      //   worker.onmessage = function (e) {
      //     console.log('worker', dT());
      //   };
      //   worker.postMessage([29, 250, 249, 81, 16, 127, 73, 223]);
      //   return;

      case 'na':
        console.log('native bigint START');
        pqPrimeNative(0x1dfaf951107f49dfn);
        console.log('native bigint', dT());
        break;

      default:
        console.log('leemon START');
        pqPrimeLeemon(str2bigInt('1dfaf951107f49df', 16, Math.ceil(64 / bpe) + 1));
        console.log('leemon', dT());
    }
  }

  // launchTest('bi')
  // launchTest('cl')
  // launchTest('le')
  launchTest('na')

  // ---

  // console.log((new BigInteger('54')).gcd(new BigInteger('24')).toString())
  // console.log(gcdNative(54n, 24n))

  // const longA = goog.math.Long.fromInt(54)
  // const longB = goog.math.Long.fromInt(24)
  // console.log(gcdLong(longA, longB).toString())
})()

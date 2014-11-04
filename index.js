var ms = require("ms"),
    cli = require("command-line-args")([
  { name: "interval", type: String, alias: "t", description: "Interval to average the values at e.g. 2s" },
  { name: "help", type: Boolean, description: "Print usage instructions" }
]);

var options = cli.parse();

if (options.help) {
  console.log(cli.getUsage({
      header: "Average values from stdout over a given interval",
      footer: "For more information, visit https://github.com/TabDigital/cli-average"
  }));
}

var interval = ms(options.interval || "1s"),
    data = [];

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(buffer) {
  data.push(Number(buffer));
});

var writeAverage = function() {
  if(data.length > 0) {
    var sum = data.reduce(function(acc, datum) {
      return acc + datum;
    })
    var average = sum/data.length;
    process.stdout.write(average.toFixed(2) + '\n');
  }
  else {
    process.stdout.write(0 + '\n');
  }
  data = [];
}

setInterval(writeAverage, interval);

# cli-average

Average values from stdout over a given interval

```
npm install -g cli-average
```

## Usage

Say you have the following shell script that outputs numbers on `stdout`

```bash
for i in {1..50}; do
  echo $RANDOM;
  sleep 0.3;
done
```

You can pipe it into `avg` to generate averages of those values over a given time interval

```bash
./random.sh | avg
```

## Arguments

- `avg -t 10s`: time interval to average the values over

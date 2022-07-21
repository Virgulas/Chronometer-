self.addEventListener("message", run);

function run(e) {
  let values = [e.data[0], e.data[1], e.data[2]];
  setInterval(() => {
    values[0] += 4;
    if (values[0] >= 999) values[1]++, (values[0] = 0);
    if (values[1] >= 60) values[2]++, (values[1] = 0);
    postMessage(values);
  }, 0);
}

function solution(D) {
  const day_names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const day_sums = {};

  for (const [date_str, value] of Object.entries(D)) {
    const date_obj = new Date(date_str + "T00:00:00");
    const day_index = date_obj.getDay() == 0 ? 6 : date_obj.getDay() - 1;

    if (!(day_index in day_sums)) {
      day_sums[day_index] = 0;
    }

    day_sums[day_index] += value;
  }

  for (let i = 0; i < 7; i++) {
    if (!(i in day_sums)) {
      // Find the previous known day (going backwards, wrapping around)
      let prev_index = (i - 1 + 7) % 7;
      let steps_back = 1;
      while (!(prev_index in day_sums) && steps_back < 7) {
        prev_index = (prev_index - 1 + 7) % 7;
        steps_back++;
      }

      // Find the next known day (going forwards, wrapping around)
      let next_index = (i + 1) % 7;
      let steps_forward = 1;
      while (!(next_index in day_sums) && steps_forward < 7) {
        next_index = (next_index + 1) % 7;
        steps_forward++;
      }

      // Calculate using linear interpolation
      if (prev_index in day_sums && next_index in day_sums) {
        const prev_value = day_sums[prev_index];
        const next_value = day_sums[next_index];

        // Total steps between prev and next (including missing days)
        const total_steps = steps_back + steps_forward;

        // Interpolate: prev + (next - prev) * (steps_back / total_steps)
        const interpolated =
          prev_value + ((next_value - prev_value) * steps_back) / total_steps;
        day_sums[i] = Math.floor(interpolated);
      }
    }
  }

  const result = {};

  for (let i = 0; i < 7; i++) {
    result[day_names[i]] = day_sums[i] !== undefined ? day_sums[i] : 0;
  }

  // console.log(result);
  return result;
}

// solution({
//   "2020-01-01": 6, //wed
//   "2020-01-02": 4, //thu
//   "2020-01-03": 6, //fri
//   "2020-01-04": 12, //sat
//   "2020-01-05": 14, //sun
//   "2020-01-06": 2, //mon
//   "2020-01-07": 4, //tue
//   "2020-01-08": -2, //wed
// });

module.exports = solution;

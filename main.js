function solution(D) {
  const day_names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  // let ans = {
  //   Mon: NaN,
  //   Tue: NaN,
  //   Wed: NaN,
  //   Thu: NaN,
  //   Fri: NaN,
  //   Sat: NaN,
  //   Sun: NaN,
  // };

  const day_sums = {};

  for (const [date_str, value] of Object.entries(D)) {
    const date_obj = new Date(date_str + "T00:00:00");
    const day_index = date_obj.getDay() == 0 ? 6 : date_obj.getDay() - 1;

    if (!(day_index in day_sums)) {
      day_sums[day_index] = 0;
    }

    day_sums[day_index] += value;
  }

  // console.log(day_sums);

  // const entries = Object.entries(ans);

  // for (let i = 0; i < 7; i++) {
  //   const [date_str, value] = entries[i];
  //   if (isNaN(value)) {
  //     const prev_value =
  //       i == 0
  //         ? !isNaN(entries[6][1])
  //           ? entries[6][1]
  //           : 0
  //         : entries[(i % 7) - 1][1];
  //     console.log("prev_value is: " + prev_value);

  //     const next_value =
  //       i == 6
  //         ? !isNaN(entries[0][1])
  //           ? entries[0][1]
  //           : 0
  //         : !isNaN(entries[(i % 7) + 1][1])
  //           ? entries[(i % 7) + 1][1]
  //           : 0;
  //     console.log("next_value is: " + next_value);
  //     entries[i][1] = Math.floor((next_value + prev_value) / 2);
  //   }
  // }

  // console.log(entries);

  //   return ans;

  const result = {};

  for (let i = 0; i < 7; i++) {
    if (i in day_sums) {
      result[day_names[i]] = day_sums[i];
    } else {
      const prev_day = (i - 1 + 7) % 7;
      const next_day = (i + 1) % 7;

      const prev_value = day_sums[prev_day] || 0;
      const next_value = day_sums[next_day] || 0;

      result[day_names[i]] = Math.floor((prev_value + next_value) / 2);
    }
  }

  console.log(result);
  
}

solution({
  "2020-01-01": 6, //wed
  // "2020-01-02": 4, //thu
  // "2020-01-03": 6, //fri
  "2020-01-04": 12, //sat
  "2020-01-05": 14, //sun
  "2020-01-06": 2, //mon
  "2020-01-07": 4, //tue
  // "2020-01-08": -2, //wed
});

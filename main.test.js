const solution = require("./main");

describe("Day of Week Aggregation", () => {
  describe("Basic Functionality", () => {
    test("should aggregate values by day of week", () => {
      const input = {
        "2020-01-06": 10, // Mon
        "2020-01-07": 20, // Tue
        "2020-01-12": 30, // Sun
      };

      const result = solution(input);

      expect(result.Mon).toBe(10);
      expect(result.Tue).toBe(20);
      expect(result.Sun).toBe(30);
    });

    test("should sum multiple dates on same day of week", () => {
      const input = {
        "2020-01-06": 10, // Mon
        "2020-01-13": 5, // Mon (one week later)
        "2020-01-20": -3, // Mon (two weeks later)
      };

      const result = solution(input);

      expect(result.Mon).toBe(12); // 10 + 5 + (-3) = 12
    });

    test("should return all 7 days of the week", () => {
      const input = {
        "2020-01-06": 10, // Mon
        "2020-01-12": 20, // Sun
      };

      const result = solution(input);
      const expectedDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

      expectedDays.forEach((day) => {
        expect(result).toHaveProperty(day);
        expect(typeof result[day]).toBe("number");
      });
    });
  });

  describe("Linear Interpolation for Missing Days", () => {
    test("should interpolate single missing day", () => {
      const input = {
        "2020-01-06": 10, // Mon
        "2020-01-08": 14, // Wed
        "2020-01-12": 20, // Sun
      };

      const result = solution(input);

      expect(result.Mon).toBe(10);
      expect(result.Tue).toBe(12); // (10 + 14) / 2 = 12
      expect(result.Wed).toBe(14);
    });

    test("should interpolate consecutive missing days", () => {
      const input = {
        "2020-01-01": 6, // Wed
        "2020-01-04": 12, // Sat
        "2020-01-05": 14, // Sun
        "2020-01-06": 2, // Mon
        "2020-01-07": 4, // Tue
      };

      const result = solution(input);

      expect(result.Mon).toBe(2);
      expect(result.Tue).toBe(4);
      expect(result.Wed).toBe(6);
      expect(result.Thu).toBe(8); // Linear interpolation
      expect(result.Fri).toBe(10); // Linear interpolation
      expect(result.Sat).toBe(12);
      expect(result.Sun).toBe(14);
    });

    test("should handle maximum missing days (5 days)", () => {
      const input = {
        "2020-01-06": 0, // Mon
        "2020-01-12": 12, // Sun
      };

      const result = solution(input);

      expect(result.Mon).toBe(0);
      expect(result.Tue).toBe(2);
      expect(result.Wed).toBe(4);
      expect(result.Thu).toBe(6);
      expect(result.Fri).toBe(8);
      expect(result.Sat).toBe(10);
      expect(result.Sun).toBe(12);
    });
  });

  describe("Edge Cases", () => {
    test("should handle negative values", () => {
      const input = {
        "2020-01-06": -100, // Mon
        "2020-01-12": 200, // Sun
      };

      const result = solution(input);

      expect(result.Mon).toBe(-100);
      expect(result.Sun).toBe(200);
    });

    test("should handle boundary values", () => {
      const input = {
        "2020-01-06": 1000000, // Mon (max value)
        "2020-01-12": -1000000, // Sun (min value)
      };

      const result = solution(input);

      expect(result.Mon).toBe(1000000);
      expect(result.Sun).toBe(-1000000);
    });

    test("should handle zero values", () => {
      const input = {
        "2020-01-06": 0, // Mon
        "2020-01-07": 0, // Tue
        "2020-01-12": 0, // Sun
      };

      const result = solution(input);

      expect(result.Mon).toBe(0);
      expect(result.Tue).toBe(0);
      expect(result.Sun).toBe(0);
    });

    test("should handle dates across different years", () => {
      const input = {
        "2020-12-28": 100, // Mon
        "2021-01-04": 50, // Mon (next year)
        "2021-01-10": 75, // Sun
      };

      const result = solution(input);

      expect(result.Mon).toBe(150); // 100 + 50
      expect(result.Sun).toBe(75);
    });

    test("should handle earliest date range (1970)", () => {
      const input = {
        "1970-01-05": 100, // Mon
        "1970-01-11": 200, // Sun
      };

      const result = solution(input);

      expect(result.Mon).toBe(100);
      expect(result.Sun).toBe(200);
    });
  });

  describe("Problem Statement Examples", () => {
    test("should match example 1 from problem statement", () => {
      const input = {
        "2020-01-01": 4,
        "2020-01-02": 4,
        "2020-01-03": 6,
        "2020-01-04": 8,
        "2020-01-05": 2,
        "2020-01-06": -6,
        "2020-01-07": 2,
        "2020-01-08": -2,
      };

      const expected = {
        Mon: -6,
        Tue: 2,
        Wed: 2,
        Thu: 4,
        Fri: 6,
        Sat: 8,
        Sun: 2,
      };

      expect(solution(input)).toEqual(expected);
    });

    test("should match example 2 from problem statement", () => {
      const input = {
        "2020-01-01": 6,
        "2020-01-04": 12,
        "2020-01-05": 14,
        "2020-01-06": 2,
        "2020-01-07": 4,
      };

      const expected = {
        Mon: 2,
        Tue: 4,
        Wed: 6,
        Thu: 8,
        Fri: 10,
        Sat: 12,
        Sun: 14,
      };

      expect(solution(input)).toEqual(expected);
    });
  });

  describe("Data Validation", () => {
    test("should handle empty object", () => {
      const input = {};

      // This might fail if Mon & Sun are required
      // Adjust based on your error handling
      expect(() => solution(input)).not.toThrow();
    });

    test("should handle single date entry", () => {
      const input = {
        "2020-01-06": 100, // Mon
      };

      const result = solution(input);

      expect(result.Mon).toBe(100);
    });
  });
});

import _ from "lodash";

export function getSum(transaction, type) {
  // ⭐️ Group the same type items together
  let sum = _(transaction)
    .groupBy("type")
    .map((objs, key) => {
      // TODO: Uncaught (in promise) TypeError: Cannot convert undefined or null to object
      //   // solution I
      //   Object.keys(objs || {});

      //   // solution II
      //   objs.keys({ key: "value" });
      //   if (window.UndefinedVariable) {
      //     objs.assign(window.UndefinedVariable, {});
      //   }

      if (!type) return _.sumBy(objs, "amount"); // sumBy all the objects by the amount, i.e. [300, 350, 500] sum of all these values
      return {
        type: key,
        color: objs[0].color,
        total: _.sumBy(objs, "amount"),
      };
    })
    .value();
  return sum;
}

export function getLabels(transaction) {
  // percentage
  let amountSum = getSum(transaction, "type");
  let Total = _.sum(getSum(transaction));

  let percent = _(amountSum)
    .map((objs) => _.assign(objs, { percent: (100 * objs.total) / Total }))
    .value();

  return percent;
}

export function chart_Data(transaction, custom) {
  let dataVale = getSum(transaction);
  let bg = _.map(transaction, (a) => a.color);
  bg = _.uniq(bg);

  const config = {
    data: {
      datasets: [
        {
          // // Tips1: can start with hardcode data and modify it later after connecting to the dataset
          data: dataVale,
          backgroundColor: bg,
          hoverOffset: 4,
          borderRadius: 30,
          spacing: 10,
        },
      ],
    },
    options: {
      cutout: 115,
    },
  };
  return custom ?? config;
}

export function getTotal(transaction) {
  return _.sum(getSum(transaction));
}

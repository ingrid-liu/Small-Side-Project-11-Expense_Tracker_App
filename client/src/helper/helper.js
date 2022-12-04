import _ from "lodash";

export function getSum(transaction, type) {
  // ⭐️ Group the same type items together
  let sum = _(transaction)
    .groupBy("type")
    .map((objs, key) => {
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

module.exports = class DataAggregation {
  constructor(data, column = "name") {
    this.data = data;
    this.column = column;
  }

  aggregateSort(aggregation) {
    let sort = {};
    sort[this.column] = 1;
    return aggregation.collation({ locale: "id" }).sort(sort); // In order to sort string based on bahasa
  }

  aggregateFilter(aggregation, filter = {}) {
    if (filter) {
      return aggregation.match(filter);
    }
    return aggregation;
  }

  countData(filter = {}) {
    let aggregation = this.data.aggregate();
    aggregation = this.aggregateSort(aggregation);
    aggregation = this.aggregateFilter(aggregation, filter);
    return aggregation.count("count").exec();
  }

  getData(limit, skip, filter = {}) {
    let aggregation = this.data.aggregate();
    aggregation = this.aggregateSort(aggregation);
    aggregation = this.aggregateFilter(aggregation, filter);
    return aggregation
      .skip(skip)
      .limit(limit)
      .exec();
  }
};

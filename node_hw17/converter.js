var Converter = function(buy, sell, dealCommission) {
    this.baseUsSell = sell;
    this.baseUsBuy = buy;
    this.dealCommission = (100 - dealCommission) / 100;
};

Converter.prototype.roundTwoDecimals = function(amount) {
    return Math.round(amount * 100) / 100;
};

Converter.prototype.sellUs = function(currency) {
    return this.roundTwoDecimals(currency * this.baseUsBuy) * this.dealCommission;
};

Converter.prototype.buyUs = function(currency) {
    return this.roundTwoDecimals(currency / this.baseUsSell) * this.dealCommission;
};

module.exports = Converter;
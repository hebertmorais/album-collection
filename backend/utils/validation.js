module.exports = function () {
    //Valida mm/dd/yyyy extraido de https://stackoverflow.com/a/6178341
    this.isValidDate = function (dateString) {
        var regex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;

        return regex.test(dateString);
    };

    this.formatDate = function (input) {
        //var date = input.split('/');
        //return date[2] + '-' + date[1] + '-' + date[0];
        return input;
    }
}
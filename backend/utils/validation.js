module.exports = function () {
    //Valida mm/dd/yyyy extraido de https://stackoverflow.com/a/6178341
    this.isValidDate = function (dateString) {
        var regex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

        return regex.test(dateString);
    };

    this.formatDate = function (input) {
        var date = input.split('/');
        return date[2] + '-' + date[1] + '-' + date[0];
    }
}
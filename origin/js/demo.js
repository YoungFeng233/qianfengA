function createAjax(ajaxOptions) {
    return new Promise(function (resolve, reject) {
        ajaxOptions.success = function (data) {
            resolve(data);
        };

        ajaxOptions.error = function (err) {
            reject(err);
        }

        $.ajax(ajaxOptions);
    });
}



/**
 * $.ajax({
 *   url: "xxx",
 *   type: "GET",
 *   data: {    },
 *   success: function() {}
 * })
 */
/**
 * JS function file
 *
 * @url /js/js-func-file/user?uid=233
 *
 * GET: Request method and parameter
 *   uid This is the requested userID
 *
 * Here you can write a detailed description
 * of the parameters of the information.
 */
module.exports = function(req) {
  var uid = req.query.uid;

  if (!uid) {
    return {
      code: -1,
      msg: "no uid"
    };
  }

  return {
    code: 0,
    data: {
      uid: +uid,
      name: "@name",
      "age|20-30": 1,
      email: "@email",
      date: "@date"
    }
  };
};

const sshTask = require("./tasks/ssh");
const extendShipit = require("./extendShipit");

module.exports = shipit => {
    extendShipit(shipit);
};

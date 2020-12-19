const _ = require("lodash");

function run1(data) {
    let index = 0;
    const rules = {};

    while (data[index] !== "") {
        const line = data[index].split(": ");
        const ruleId = parseInt(line[0]);
        if (line[1].startsWith("\"")) {
            rules[ruleId] = line[1][1];
        } else {
            rules[ruleId] = line[1].split(" | ").map(
                (subRule) =>
                    subRule.split(" ").map(
                        (ruleId) => parseInt(ruleId)
                    )
            );
        }

        index++;
    }

    index++;
    let result = 0;

    while (data[index]) {
        if (checkRule(data[index], rules[0]) === "") {
            result++;
        }
        index++;
    }

    return result;

    function checkRule(string, rule) {
        //console.log({string, rule});

        if (typeof rule === "string") {
            if (string[0] === rule) {
                return string.substring(1);
            } else {
                return false;
            }
        } else if (typeof rule === "number") {
            return checkRule(string, rules[rule]);
        } else if (typeof rule[0] === "number") {
            for (let subRuleIndex = 0; subRuleIndex < rule.length; subRuleIndex++) {
                string = checkRule(string, rule[subRuleIndex]);
                if (string === false) {
                    return false;
                }
            }
            return string;
        } else {
            if (rule.length === 1) {
                return checkRule(string, rule[0]);
            } else {
                const tryOne = checkRule(string, rule[0]);
                if (tryOne !== false) {
                    return tryOne;
                }
                return checkRule(string, rule[1]);
            }
        }
    }
}

function run2(data) {
    let index = 0;
    const rules = {};

    while (data[index] !== "") {
        const line = data[index].split(": ");
        const ruleId = parseInt(line[0]);
        if (line[1].startsWith("\"")) {
            rules[ruleId] = line[1][1];
        } else {
            rules[ruleId] = line[1].split(" | ").map(
                (subRule) =>
                    subRule.split(" ").map(
                        (ruleId) => parseInt(ruleId)
                    )
            );
        }

        index++;
    }

    rules[8] = [[42], [42, 8]];
    rules[11] = [[42, 31], [42, 11, 31]];

    index++;
    let result = 0;


    while (data[index]) {
        let response = checkRule(data[index], rules[0]);
        response = _.flattenDeep(response);

        if (typeof response === "string") {
            if (response === "") {
                result++;
            }
        } else {
            if (response.includes("")) {
                result++;
            }
        }
        index++;
    }

    return result;

    function checkRule(string, rule) {
        //console.log({string, rule});

        if (string === false) {
            return false;
        }

        if (typeof string === "object") {
            if (string[0] === false) {
                return checkRule(string[1], rule);
            } else if (string[1] === false) {
                return checkRule(string[0], rule);
            } else {
                return [checkRule(string[0], rule), checkRule(string[1], rule)];
            }
        }

        if (string === "") {
            return false;
        }

        if (typeof rule === "string") {
            if (string[0] === rule) {
                return string.substring(1);
            } else {
                return false;
            }
        } else if (typeof rule === "number") {
            return checkRule(string, rules[rule]);
        } else if (typeof rule[0] === "number") {
            const newRule = [...rule];
            string = checkRule(string, newRule.shift());

            if (newRule.length > 0) {
                return checkRule(string, newRule);
            } else {
                return string;
            }

        } else {
            if (rule.length === 0) {
                return string;
            } else if (rule.length === 1) {
                return checkRule(string, rule[0]);
            } else {
                const tryOne = checkRule(string, rule[0]);
                const tryTwo = checkRule(string, rule[1]);

                if (tryOne !== false && tryTwo !== false) {
                    return [tryOne, tryTwo];
                }
                if (tryOne !== false) {
                    return tryOne;
                }
                return tryTwo;
            }
        }
    }
}

module.exports = {run1, run2};

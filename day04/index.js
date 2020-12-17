function run1(data) {
    data.push("");
    let keys = [];
    const validKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
    let count = 0;

    for (const line of data)
    {
        if (line === "")
        {
            count += valid(keys)
            keys = [];
        }
        else
        {
            const values = line.split(" ");
            for (const value of values)
            {
                const data = value.split(":");
                switch(data[0])
                {
                    case "byr":
                        if (data[1].length === 4 && parseInt(data[1]) >= 1920 && parseInt(data[1]) <= 2002)
                        {
                            keys.push(data[0]);
                        }
                        break;
                    case "iyr":
                        if (data[1].length === 4 && parseInt(data[1]) >= 2010 && parseInt(data[1]) <= 2020)
                        {
                            keys.push(data[0]);
                        }
                        break;
                    case "eyr":
                        if (data[1].length === 4 && parseInt(data[1]) >= 2020 && parseInt(data[1]) <= 2030)
                        {
                            keys.push(data[0]);
                        }
                        break;
                    case "hgt":
                        if (data[1].endsWith("cm") && parseInt(data[1]) >= 150 && parseInt(data[1]) <= 193)
                        {
                            keys.push(data[0]);
                        }
                        if (data[1].endsWith("in") && parseInt(data[1]) >= 59 && parseInt(data[1]) <= 76)
                        {
                            keys.push(data[0]);
                        }
                        break;
                    case "hcl":
                        if (data[1].match(/^#[0-9a-f]{6}$/i))
                        {
                            keys.push(data[0]);
                        }
                        break;
                    case "ecl":
                        if (["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(data[1]))
                        {
                            keys.push(data[0]);
                        }
                        break;
                    case "pid":
                        if (data[1].match(/^[0-9]{9}$/i))
                        {
                            keys.push(data[0]);
                        }
                        break;
                }
            }
        }
    }

    return count;

    function valid(keys)
    {
        return validKeys.every(k => keys.includes(k)) ? 1 : 0;
    }
}

function run2(data) {
}

module.exports = {run1, run2};

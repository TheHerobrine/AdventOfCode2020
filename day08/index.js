function run1(data) {

    const program = readProgram(data);
    const memory = {position: 0, accumulator: 0};

    while (program[memory.position].executed === 0) {
        executeLine(memory, program);
    }

    return memory.accumulator;
}

function run2(data) {
    const program = readProgram(data);



    for (let lineToChange=0; lineToChange< data.length; lineToChange++)
    {
        const memory = {position: 0, accumulator: 0};
        resetProgram(program);
        if(isFiniteByChangingLine(program, memory, lineToChange))
        {
            return memory.accumulator;
        }
    }
}

function isFiniteByChangingLine(program, memory, line) {
    if (program[line].operation === "acc") {
        return false;
    }

    while (program[memory.position].executed === 0) {
        if (memory.position === line) {
            executeAlterLine(memory, program);
        } else {
            executeLine(memory, program);
        }

        if (memory.position === program.length) {
            return true;
        }
        if (memory.position > program.length) {
            return false;
        }
    }

    return false;
}

function readProgram(data) {
    const program = [];

    for (const line of data) {
        const instruction = line.split(" ");
        const operation = instruction[0];
        const argument = parseInt(instruction[1]);

        program.push({operation, argument, executed: 0});
    }

    return program;
}

function executeLine(memory, program) {
    program[memory.position].executed++;
    switch (program[memory.position].operation) {
        case "nop":
            memory.position++;
            break;
        case "jmp":
            memory.position += program[memory.position].argument;
            break;
        case "acc":
            memory.accumulator += program[memory.position].argument;
            memory.position++;
            break;
    }
}

function executeAlterLine(memory, program) {
    program[memory.position].executed++;
    switch (program[memory.position].operation) {
        case "jmp":
            memory.position++;
            break;
        case "nop":
            memory.position += program[memory.position].argument;
            break;
        case "acc":
            memory.accumulator += program[memory.position].argument;
            memory.position++;
            break;
    }
}

function resetProgram(program)
{
    for (const line of program)
    {
        line.executed = 0;
    }
}

module.exports = {run1, run2};

import { IOperatorIndexes } from "../models";
import { equalsKey, result } from "./elements";
import { equate } from "./equations";
import state from "./state";

export const handleKeyPress = (event: MouseEvent) => {
    const button = (event.target as HTMLButtonElement);
    const isOperator = button.getAttribute("data-operator") !== null;
    const character: string = button.innerText.trim();

    if (isOperator) {
        equalsKey.disabled = true;

        if (!state.values.length) {
            state.values.push(0);
            state.operators.push(character);

            result.innerHTML = `0 ${state.operators[state.operators.length - 1]}`;
        } else if (state.operators.length === state.values.length) {
            state.operators[state.operators.length - 1] = character;
            result.innerHTML = `${result.innerHTML.slice(0, -1)} ${character}`;
        } else {
            state.operators.push(character);
            result.innerHTML += ` ${state.operators[state.operators.length - 1]}`;
        }
    } else {
        if (!state.values.length) {
            state.values.push(Number(character));

            if (state.operators.length) {
                equalsKey.disabled = false;
            }

            result.innerHTML = state.values[0].toString();
        } else if (state.values.length >= state.operators.length + 1) {
            state.values[state.values.length - 1] = Number(`${state.values[state.values.length - 1]}${character}`);
            result.innerHTML = `${result.innerHTML.slice(0, -1)} ${state.values[state.values.length - 1]}`;
        } else {
            state.values.push(Number(character));
            equalsKey.disabled = false;
            result.innerHTML += ` ${state.values[state.values.length - 1]}`;
        }
    }
};

export const handleEquals = () => {
    const operatorIndexes: IOperatorIndexes = {
        "/": [],
        "*": [],
        "+": [],
        "-": [],
    };

    let tempValue = 0;

    state.operators.forEach((operator, index) => {
        if (operator === "/") operatorIndexes["/"].push(index);
        if (operator === "*") operatorIndexes["*"].push(index);
        if (operator === "+") operatorIndexes["+"].push(index);
        if (operator === "-") operatorIndexes["-"].push(index);
    });

    Object.keys(operatorIndexes).forEach((key: "/" | "*" | "+" | "-") => {
        operatorIndexes[key].forEach((index: number) => tempValue = equate(key, tempValue, state.values[index - 1]))
    });

    let tempNumber = state.operators.reduce((accumulator, current, index) => (
        equate(current, accumulator, state.values[index + 1])
    ), state.values[0]);

    result.innerHTML = tempNumber.toString();
    state.values = [tempNumber];
    state.operators = [];
    equalsKey.disabled = true;
};

export const handleClear = () => {
    state.values = [];
    state.operators = [];
    result.innerHTML = "0";
};

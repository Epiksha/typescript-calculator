import { IOperatorIndexes } from "../models";
import { equalsKey, result } from "./elements";

export const equate = (
    operator: string,
    firstValue: number,
    secondValue: number
) => {
    if (operator === "+") return firstValue + secondValue;
    if (operator === "-") return firstValue - secondValue;
    if (operator === "*") return firstValue * secondValue;
    if (operator === "/") return firstValue / secondValue;
};
import { clearKey, equalsKey, keys } from "./libs/elements";
import { handleClear, handleEquals, handleKeyPress } from "./libs/handlers";
import "./scss/entry.scss";

keys.forEach((key: HTMLButtonElement) => key.addEventListener("click", handleKeyPress));
clearKey.addEventListener("click", handleClear);
equalsKey.addEventListener("click", handleEquals);
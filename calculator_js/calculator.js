window.addEventListener("load", e => {
    const expressionText = document.getElementById("expression-text");
    const numberPanel = document.getElementById("number-panel");
    const operatorPanel = document.getElementById("operator-panel");

    function createNumberCallback(i) {
        return e => {
            expressionText.value += i;
        };
    }

    function createOperatorCallback(op) {
        return e => {
            expressionText.value += " " + op + " ";
        };
    }

    function addButton(panel, text, classVal, callback) {
        var button = document.createElement("button");

        button.setAttribute("class", classVal);
        button.innerHTML = text;
        button.addEventListener("click", callback);

        panel.appendChild(button);
    }

    function addNumberButtons() {
        for (let i = 1; i <= 10; ++i)
            addButton(numberPanel, i % 10, "number-button",
                createNumberCallback(i % 10));
    }

    function addOperatorButtons() {
        operators = "+-*/";
        for (let op of operators.split(""))
            addButton(operatorPanel, op, "operator-button",
                createOperatorCallback(op));
    }


    addNumberButtons();
    addOperatorButtons();

    addButton(numberPanel, "=", "number-button", e => {
        var result;

        try {
            result = eval(expressionText.value); //Greatest cheat known to programmer kind.
            if (result === undefined) throw 1;
        } catch (e) {
            result = "Invalid expression."
        }

        expressionText.value = result;
    });

    addButton(numberPanel, "cls", "number-button", e => {
        expressionText.value = "";
    });
});

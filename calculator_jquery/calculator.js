$(document).ready((e) => {
    const expressionText = $("#expression-text");
    const numberPanel = $("#number-panel");
    const operatorPanel = $("#operator-panel");

    function createNumberCallback(i) {
        return () => {
            let value = expressionText.val();
            expressionText.val(value + i);
        };
    }

    function createOperatorCallback(op) {
        return () => {
            let value = expressionText.val();
            expressionText.val(value + " " + op + " ");
        };
    }

    function addButton(panel, text, classVal, callback) {
        panel.append($("<button/>")
            .addClass(classVal)
            .html(text)
            .click(callback));
    }

    function addNumberButtons() {
        for (let i = 1; i <= 10; ++i)
            addButton(numberPanel, i % 10, "number-button",
                createNumberCallback(i % 10));
    }

    function addOperatorButtons() {
        operators = "+-*/()";
        for (let op of operators.split(""))
            addButton(operatorPanel, op, "operator-button",
                createOperatorCallback(op));
    }

    addNumberButtons();
    addOperatorButtons();

    addButton(numberPanel, "=", "number-button", e => {
        var result;

        try {
            result = eval(expressionText.val()); //Greatest cheat known to programmer kind.
            if (result === undefined) throw 1;
        } catch (e) {
            result = "Invalid expression."
        }

        expressionText.val(result);
    });

    addButton(numberPanel, "cls", "number-button", () => {
        expressionText.val("");
    });
});

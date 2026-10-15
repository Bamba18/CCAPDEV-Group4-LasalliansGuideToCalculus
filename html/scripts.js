// ==========================================
// SEPARATE CONFIGURATION FOR GRAPH 1
// ==========================================
const elt1 = document.getElementById('calculator1');
const calc1 = Desmos.GraphingCalculator(elt1, {
    expressions: false,
    settingsMenu: false,
    trace: true,
    solutions: true
});

calc1.setExpression({
    id: "f1",
    latex: "f(x) = \\frac{2x^2 + x}{x}",
    color: Desmos.Colors.BLUE
});
calc1.setMathBounds({ left: -1, right: 1, bottom: 0, top: 2 });
calc1.resize();


// ==========================================
// SEPARATE CONFIGURATION FOR GRAPH 2
// ==========================================
const elt2 = document.getElementById('calculator2');
const calc2 = Desmos.GraphingCalculator(elt2, {
    expressions: false,
    settingsMenu: false,
    trace: true,
    solutions: true
});

calc2.setExpression({
    id: "f2",
    latex: "f(x) = \\left\\{x < 0: 0, x > 0: 1\\right\\}", // Note the double backslashes for JS strings
    color: Desmos.Colors.BLUE
});
calc2.setMathBounds({ left: -2, right: 2, bottom: -1.5, top: 2.5 });
calc2.resize();

// ==========================================
// SEPARATE CONFIGURATION FOR GRAPH 3
// ==========================================
const elt3 = document.getElementById('calculator3');
const calc3 = Desmos.GraphingCalculator(elt3, {
    expressions: false,
    settingsMenu: false,
    trace: true,
    solutions: true
});

// 1. Plot the rational curve f(x) = 1/(x-1)^2
calc3.setExpression({
    id: "f3-curve",
    latex: "f(x) = \\frac{1}{(x - 1)^2}",
    color: Desmos.Colors.BLUE
});

// 2. Replicate your \draw[dotted, red] vertical asymptote line at x = 1
calc3.setExpression({
    id: "f3-asymptote",
    latex: "x = 1",
    color: Desmos.Colors.RED,
    lineStyle: Desmos.Styles.DASHED
});

// 3. Map your exact TikZ dimensions: xmin=-3, xmax=5, ymin=-2, ymax=4
calc3.setMathBounds({ left: -3, right: 5, bottom: -2, top: 6 });
calc3.resize();

// ==========================================
// SEPARATE CONFIGURATION FOR GRAPH 4
// ==========================================
const elt4 = document.getElementById('calculator4');
const calc4 = Desmos.GraphingCalculator(elt4, {
    expressions: false,
    settingsMenu: false,
    trace: true,
    solutions: true
});

calc4.setExpression({
    id: "f4",
    latex: "f(x) = x^2",
    color: Desmos.Colors.BLUE
});
calc4.setMathBounds({ left: -4, right: 4, bottom: -4, top: 4 });
calc4.resize();

// ==========================================
// SEPARATE CONFIGURATION FOR GRAPH 5
// ==========================================
const elt5 = document.getElementById('calculator5');
const calc5 = Desmos.GraphingCalculator(elt5, {
    expressions: false,
    settingsMenu: false,
    trace: true,
    solutions: true
});

calc5.setExpression({
    id: "f5",
    latex: "y^2 = x",
    color: Desmos.Colors.BLUE
});
calc5.setMathBounds({ left: -1, right: 7, bottom: -4, top: 4 });
calc5.resize();

// ==========================================
// SEPARATE CONFIGURATION FOR GRAPH 6
// ==========================================
const elt6 = document.getElementById('calculator6');
const calc6 = Desmos.GraphingCalculator(elt6, {
    expressions: false,
    settingsMenu: false,
    trace: true,
    solutions: true
});

calc6.setExpression({
    id: "f6",
    latex: "f(x) = x^2 - x - 1",
    color: Desmos.Colors.BLUE
});
calc6.setMathBounds({ left: 0.5, right: 2.5, bottom: -1, top: 1 });
calc6.resize();

// ==========================================
// SEPARATE CONFIGURATION FOR GRAPH 7
// ==========================================
const elt7 = document.getElementById('calculator7');
const calc7 = Desmos.GraphingCalculator(elt7, {
    expressions: false,
    settingsMenu: false,
    trace: true,
    solutions: true
});

calc7.setExpression({
    id: "f7",
    latex: "f(x) = -x^2 + 2",
    color: Desmos.Colors.BLUE
});
calc7.setMathBounds({ left: -3, right: 3, bottom: -3, top: 3 });
calc7.resize();
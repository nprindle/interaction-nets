import { do_reduction } from "abstract-algorithm-demo";

function handleInput() {
    const contents = document.getElementById('lambda-code').value.trim();
    if (contents === '') {
        return;
    }
    const report = document.getElementById('reductions-report');
    const input_named = document.getElementById('input-named');
    const input_db = document.getElementById('input-db');
    const reduced_db = document.getElementById('reduced-db');
    const reduced_named = document.getElementById('reduced-named');
    const numeric_result = document.getElementById('numeric-result');
    try {
        report.style = 'color: black';
        const res = do_reduction(contents);
        input_named.textContent = res.named_lambda;
        input_db.textContent = res.debruijn_lambda;
        reduced_db.textContent = res.reduced_debruijn_lambda;
        reduced_named.textContent = res.reduced_named_lambda;
        if (res.numeric_result === undefined) {
            numeric_result.textContent = 'none';
        } else {
            numeric_result.textContent = res.numeric_result;
        }
        report.textContent = `Performed ${res.reductions} reductions (${res.betas} betas)`;
    } catch (e) {
        report.textContent = e;
        report.style = 'color: red';
        input_named.textContent = '';
        input_db.textContent = '';
        reduced_db.textContent = '';
        reduced_named.textContent = '';
        numeric_result.textContent = '';
    }
}

document.getElementById('reduce-button').onclick = () => handleInput();
document.getElementById('lambda-code').onkeydown = (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.keyCode == 13 || e.keyCode == 10)) {
        handleInput();
    }
};

document.getElementById('lambda-code').textContent = `// local variables can be defined with let:
let x = 5;

// number literals are just syntax sugar for Church naturals

// lambdas can be defined using 'λ' or '\\':
let add = λm n s z. m s (n s z);

// the program must end in a single expression to evaluate:
add x x
`;

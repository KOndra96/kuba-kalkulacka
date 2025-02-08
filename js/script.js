const resultsContainer = document.querySelector('.results');

if (resultsContainer) {
    resultsContainer.innerHTML = `
    <div class="non-counted">
        <header>
            <img src="./assets/images/illustration-empty.svg" alt="Empty form image">
            <h2>KUBO, TADY BUDOU VÝSLEDKY</h2>
        </header>
        <p><b><span style="color: hsl(61, 70%, 52%);">Vyplň formulář.</span></b> Asi používej jen tu "Splátkovou hypotéku", protože to druhý mi přijde jako nějaká píčovina, vzorec, psalo to AI a nějak mi nesedí, proč bys něco takového využíval.</p>
        <div class="attribution">
            Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
            Coded by <a href="https://github.com/KOndra96">KOndra96</a>.
        </div>
    </div>
    `;
}

const button = document.querySelector('button[type=submit]');

button.addEventListener('click', (event) => {
    const amount = document.getElementById('amount').value;
    const term = document.getElementById('term').value;
    const rate = document.getElementById('rate').value;

    const type = document.getElementsByName('type');
    let typeValue = false;

    for (let i = 0; i < type.length; i++) {
        if (type[i].checked) {
            typeValue = type[i].value;
            break;
        }
    }

    if (!amount || !term || !rate || !typeValue) {
    } else {
        let floatAmount = parseFloat(amount);
        let years = Number(term);
        let floatInterest = parseFloat(rate);

        let numberOfPayments = years * 12; //yes

        let monthlyInterest = (floatInterest / 100 / 12); //yes

        let monthlyRepayment;
        let totalRepayment;
        let willContinue = false;

        if (typeValue === 'repayment') {
            monthlyRepayment = (floatAmount * monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments) / (Math.pow(1 + monthlyInterest, numberOfPayments) - 1));
            willContinue = true;

        } else if (typeValue === 'interest-only') {
            monthlyRepayment = floatAmount * monthlyInterest + (floatAmount / numberOfPayments);
            willContinue = true;

        } else {
            console.log('ERROR: Unknown typeValue selected! (E-typeValue 01)');

        }

        if (willContinue) {
            if (resultsContainer) {
                totalRepayment = (monthlyRepayment * numberOfPayments);
                resultsContainer.innerHTML = `
                <div class="counted">
                    <header>
                        <h2>Tvé výsledky</h2>
                    </header>
                    <p>Tvé výsledky se zobrazí níže na základě zadaných údajů. Pro úpravu změň vyplněné údaje ve formuláři a znovu stiskni "Spočítat splátky".</p>
                    <div class="result-box">
                        <p>Tvá měsíční splátka<br>
                        <span class="monthly">${monthlyRepayment.toFixed(2)} Kč</span></p>
                        <hr>
                        <p>Celkově zaplatíš<br>
                        <span class="total">${totalRepayment.toFixed(2)} Kč</span>
                        </p>
                    </div>
                    <div class="attribution">
                        Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
                        Coded by <a href="https://github.com/KOndra96">KOndra96</a>.
                    </div>
                </div>
                `;
                willContinue = false;
            }
        }
    }
});

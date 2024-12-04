function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    const loanMonths = parseInt(document.getElementById('loanMonths').value);
    const startDate = new Date(document.getElementById('startDate').value);

    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanMonths) || !startDate || loanMonths <= 0) {
        alert('Please enter valid inputs.');
        return;
    }

    const monthlyPayment = loanAmount * interestRate / (1 - Math.pow(1 + interestRate, -loanMonths));
    const totalPayment = monthlyPayment * loanMonths;
    const totalInterest = totalPayment - loanAmount;

    document.getElementById('result').style.display = 'block';
    document.getElementById('monthlyPayment').textContent = `Monthly Payment: $${monthlyPayment.toFixed(2)}`;
    document.getElementById('totalPayment').textContent = `Total Payment: $${totalPayment.toFixed(2)}`;
    document.getElementById('totalInterest').textContent = `Total Interest: $${totalInterest.toFixed(2)}`;

    const paymentScheduleBody = document.getElementById('paymentSchedule').querySelector('tbody');
    paymentScheduleBody.innerHTML = '';

    let remainingBalance = loanAmount;
    let currentDate = new Date(startDate);

    for (let i = 1; i <= loanMonths; i++) {
        const interestPayment = remainingBalance * interestRate;
        const principalPayment = monthlyPayment - interestPayment;
        remainingBalance -= principalPayment;

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const paymentDate = currentDate.toLocaleDateString(undefined, options);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i}</td>
            <td>${paymentDate}</td>
            <td>${monthlyPayment.toFixed(2)}</td>
            <td>${interestPayment.toFixed(2)}</td>
            <td>${principalPayment.toFixed(2)}</td>
            <td>${remainingBalance.toFixed(2)}</td>
            <td><div class="signature"></div></td>
            <td><div class="signature"></div></td>
        `;
        paymentScheduleBody.appendChild(row);

        currentDate.setMonth(currentDate.getMonth() + 1);
    }
}
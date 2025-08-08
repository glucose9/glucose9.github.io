document.addEventListener('DOMContentLoaded', () => {
    let totalFunds = 0;

    // --- Funding Management Elements and Logic ---
    const addFundsBtn = document.getElementById('add-funds-btn');
    const addFundsInput = document.getElementById('add-funds-input');
    const totalFundsDisplay = document.getElementById('total-funds-display');

    // Function to update the total funds display, formatted as Korean Won
    const updateTotalFundsDisplay = () => {
        totalFundsDisplay.textContent = `${totalFunds.toLocaleString('ko-KR')}원`;
    };

    addFundsBtn.addEventListener('click', () => {
        const amount = parseInt(addFundsInput.value, 10);
        if (!isNaN(amount) && amount > 0) {
            totalFunds += amount;
            updateTotalFundsDisplay();
            addFundsInput.value = ''; // Clear the input field
        } else {
            alert('유효한 금액을 입력해주세요.');
        }
    });

    // --- Portfolio Management Elements and Logic ---
    const addEntryBtn = document.getElementById('add-entry-btn');
    const portfolioEntries = document.getElementById('portfolio-entries');

    addEntryBtn.addEventListener('click', () => {
        // 새로운 입력 필드 그룹을 담을 div 생성
        const newEntry = document.createElement('div');
        newEntry.classList.add('portfolio-entry');

        // 새로운 입력 필드 HTML 내용
        newEntry.innerHTML = `
            <input type="text" placeholder="자선단체 이름" class="charity-name" required>
            <input type="number" placeholder="비율 (%)" class="allocation" min="0" max="100" required>
        `;

        // 폼에 새로운 입력 필드 그룹 추가
        portfolioEntries.appendChild(newEntry);
    });

    // --- Form Submission and Donation Logic ---
    const portfolioForm = document.getElementById('portfolio-form');
    const dataDisplay = document.getElementById('data-display');

    portfolioForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Stop form from submitting the traditional way

        const entries = document.querySelectorAll('.portfolio-entry');
        let portfolio = [];
        let totalPercentage = 0;

        // Collect and validate all portfolio entries
        entries.forEach(entry => {
            const nameInput = entry.querySelector('.charity-name');
            const allocationInput = entry.querySelector('.allocation');
            const name = nameInput.value.trim();
            const allocation = parseFloat(allocationInput.value);

            if (name && !isNaN(allocation) && allocation > 0) {
                portfolio.push({ name, allocation });
                totalPercentage += allocation;
            }
        });

        // --- Validation Checks ---
        if (portfolio.length === 0) {
            alert('기부할 단체를 하나 이상 입력해주세요.');
            return;
        }

        if (Math.round(totalPercentage) !== 100) {
            alert(`비율의 총합이 100%가 되어야 합니다. 현재 총합: ${totalPercentage.toFixed(2)}%`);
            return;
        }

        if (totalFunds <= 0) {
            alert('기부할 자금이 없습니다. 먼저 자금을 추가해주세요.');
            return;
        }

        // --- Execute Donation Logic ---
        let resultMessage = '<h2>자동 기부 실행 완료</h2><ul>';
        portfolio.forEach(item => {
            const donationAmount = (item.allocation / 100) * totalFunds;
            resultMessage += `<li><strong>${item.name}</strong>: ${donationAmount.toLocaleString('ko-KR')}원 (${item.allocation}%)</li>`;
        });
        resultMessage += '</ul>';
        dataDisplay.innerHTML = resultMessage;

        // --- Reset State ---
        totalFunds = 0;
        updateTotalFundsDisplay();

        // Clear all portfolio entries and leave one blank one
        while (portfolioEntries.children.length > 1) {
            portfolioEntries.removeChild(portfolioEntries.lastChild);
        }
        const firstEntryName = portfolioEntries.querySelector('.charity-name');
        const firstEntryAllocation = portfolioEntries.querySelector('.allocation');
        if(firstEntryName) firstEntryName.value = '';
        if(firstEntryAllocation) firstEntryAllocation.value = '';
    });
});

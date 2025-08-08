document.addEventListener('DOMContentLoaded', () => {
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

    // 폼 제출 이벤트 처리 (향후 기능 확장용)
    const portfolioForm = document.getElementById('portfolio-form');
    portfolioForm.addEventListener('submit', (event) => {
        event.preventDefault(); // 기본 폼 제출 동작 방지
        console.log('포트폴리오가 승인되었습니다.');
        // 여기에 폼 데이터를 서버로 보내는 로직을 추가할 수 있습니다.
    });
});

function goToHitomi() {
    let number = document.getElementById("hitomiNumber").value.trim();
    if (number && !isNaN(number)) {
        let url = `https://hitomi.la/reader/${number}.html`;
        window.open(url, "_blank");
    } else {
        alert("올바른 번호를 입력해주세요!");
    }
}

// 확률적으로 앞쪽 페이지가 더 잘 뽑히도록 가중치 적용 (조정된 버전)
function weightedRandomPage() {
    let totalPages = 3417;
    let sumWeights = 0;
    let weights = [];

    for (let i = 1; i <= totalPages; i++) {
        let weight;
        if (i <= 1000) {
            weight = 1 - ((i - 1) / 2000); // 1~1000번은 점진적으로 감소
        } else if (i <= 3000) {
            weight = 0.5 - ((i - 1000) / 4000); // 1001~3000번은 급격히 감소
        } else {
            weight = 0.1 - ((i - 3000) / 40000); // 3001~3417번은 매우 낮음
        }
        weights.push(weight);
        sumWeights += weight;
    }

    let rand = Math.random() * sumWeights;
    let cumulativeSum = 0;

    for (let i = 0; i < totalPages; i++) {
        cumulativeSum += weights[i];
        if (rand < cumulativeSum) {
            return i + 1; // 페이지 번호 반환 (1~3417)
        }
    }

    return 1; // 기본적으로 1번 페이지 반환 (안정성 확보)
}

function randomSearch() {
    let randomPage = weightedRandomPage();
    let url = `https://hitomi.la/index-korean.html?page=${randomPage}`;
    window.open(url, "_blank");
}

document.getElementById("hitomiNumber").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        goToHitomi();
    }
});
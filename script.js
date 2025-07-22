// script.js

function goToHitomi() {
    let number = document.getElementById("hitomiNumber").value.trim();
    if (number && !isNaN(number)) {
        let url = `https://hitomi.la/reader/${number}.html`;
        window.open(url, "_blank");
    } else {
        alert("올바른 번호를 입력해주세요!");
    }
}

function weightedRandomPage() {
    let totalPages = 3417;
    let sumWeights = 0;
    let weights = [];

    for (let i = 1; i <= totalPages; i++) {
        let weight;
        if (i <= 1000) {
            weight = 1 - ((i - 1) / 2000);
        } else if (i <= 3000) {
            weight = 0.5 - ((i - 1000) / 4000);
        } else {
            weight = 0.1 - ((i - 3000) / 40000);
        }
        weights.push(weight);
        sumWeights += weight;
    }

    let rand = Math.random() * sumWeights;
    let cumulativeSum = 0;

    for (let i = 0; i < totalPages; i++) {
        cumulativeSum += weights[i];
        if (rand < cumulativeSum) {
            return i + 1;
        }
    }

    return 1;
}

function randomSearch() {
    let randomPage = weightedRandomPage();
    let url = `https://hitomi.la/index-korean.html?page=${randomPage}`;
    window.open(url, "_blank");
}

// 엔터 키 입력 시 번호 검색 실행
document.getElementById("hitomiNumber").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        goToHitomi();
    }
});

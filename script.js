<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Hitomi 검색 도구</title>
    <style>
        body {
            font-family: sans-serif;
            padding: 20px;
        }
        h2 {
            margin-top: 30px;
        }
        input, button {
            margin: 5px;
            padding: 10px;
            font-size: 16px;
        }
        .tag-buttons button {
            margin-right: 10px;
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <h1>📚 Hitomi 검색기</h1>

    <input type="text" id="hitomiNumber" placeholder="작품 번호 입력">
    <button onclick="goToHitomi()">작품으로 이동</button>
    <button onclick="randomSearch()">랜덤 페이지</button>

    <h2>🏷️ 태그</h2>
    <div class="tag-buttons">
        <button onclick="goToTag('yuri')">Yuri</button>
        <button onclick="goToTag('yuri/fullcolor')">Yuri / Fullcolor</button>
        <button onclick="goToTag('futanari')">Futanari</button>
        <button onclick="goToTag('futanari/fullcolor')">Futanari / Fullcolor</button>
    </div>

    <script>
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

        document.getElementById("hitomiNumber").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                goToHitomi();
            }
        });

        function goToTag(tag) {
            let base = "https://hitomi.la/search.html?language%3Akorean%20female%3A";
            let url = "";

            if (tag === "yuri") {
                url = base + "yuri";
            } else if (tag === "yuri/fullcolor") {
                url = base + "yuri%20tag%3Afull_color";
            } else if (tag === "futanari") {
                url = base + "futanari";
            } else if (tag === "futanari/fullcolor") {
                url = base + "futanari%20tag%3Afull_color";
            }

            if (url) {
                window.open(url, "_blank");
            }
        }
    </script>
</body>
</html>

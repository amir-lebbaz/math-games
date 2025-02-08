function startGame() {
    const studyTime = document.getElementById('studyTime').value;
    const rewardMessage = document.getElementById('rewardMessage');
    
    if (studyTime >= 1) {
        rewardMessage.innerText = `لقد درست لمدة ${studyTime} ساعة! حان وقت المكافأة!`;
    } else {
        rewardMessage.innerText = "لم تحدد عدد الساعات بعد!";
    }
}

function startMultiplication() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const result = num1 * num2;
    
    const multiplicationResult = document.getElementById('multiplicationResult');
    multiplicationResult.innerText = `ما هو ناتج ضرب ${num1} × ${num2}؟`;
    
    setTimeout(() => {
        const answer = prompt(`إجابة السؤال: ${num1} × ${num2} = ?`);
        if (parseInt(answer) === result) {
            alert("إجابة صحيحة! أحسنت!");
        } else {
            alert("إجابة خاطئة. حاول مرة أخرى!");
        }
    }, 2000);
}
let currentAnswer = 0; // لتخزين الإجابة الحالية

// بدء لعبة الجمع
function startAddition() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    currentAnswer = num1 + num2;
    
    document.getElementById('question-text').innerText = `ما هو ناتج جمع ${num1} + ${num2}?`;
    showQuestion();
}

// بدء لعبة الطرح
function startSubtraction() {
    const num1 = Math.floor(Math.random() * 20) + 10;
    const num2 = Math.floor(Math.random() * 10) + 1;
    currentAnswer = num1 - num2;
    
    document.getElementById('question-text').innerText = `ما هو ناتج طرح ${num1} - ${num2}?`;
    showQuestion();
}

// بدء لعبة القسمة
function startDivision() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    currentAnswer = num1 / num2;
    
    document.getElementById('question-text').innerText = `ما هو ناتج قسمة ${num1} ÷ ${num2}?`;
    showQuestion();
}

// إظهار السؤال
function showQuestion() {
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('result-message').innerText = ''; // إعادة تعيين الرسالة السابقة
}

// التحقق من الإجابة
function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById('answer').value);
    const resultMessage = document.getElementById('result-message');
    
    if (userAnswer === currentAnswer) {
        resultMessage.innerText = "إجابة صحيحة! أحسنت!";
        resultMessage.style.color = "green";
    } else {
        resultMessage.innerText = "إجابة خاطئة. حاول مرة أخرى!";
        resultMessage.style.color = "red";
    }
}

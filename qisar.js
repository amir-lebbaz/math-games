let score = 0;
let streak = 0;
let level = "برونزي 🥉";
let timer;
let timeLeft = 30;
let stars = 0;
let secretLevelUnlocked = false;

const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const resultElement = document.getElementById('result');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const streakElement = document.getElementById('streak');
const progressBar = document.getElementById('progress');
const starsElement = document.getElementById('stars');
const submitBtn = document.getElementById('submitBtn');

const backgroundMusic = {
    easy: 'easy_level.mp3',
    medium: 'medium_level.mp3',
    hard: 'hard_level.mp3',
    secret: 'secret_level.mp3'
};

let currentMusic = new Audio();
let correctAnswer = generateQuestion();

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    questionElement.textContent = `${num1} × ${num2} = ?`;
    return num1 * num2;
}

function checkAnswer() {
    const userAnswer = parseInt(answerElement.value);
    if (userAnswer === correctAnswer) {
        if (Math.random() > 0.5) {
            resultElement.textContent = getRandomEncouragement();
        } else {
            resultElement.textContent = "إجابة صحيحة! 🎉";
        }
        resultElement.className = "correct";
        score += 10;
        streak += 1;
        stars += 1;

        if (streak === 5) switchToMediumLevel();
        if (streak === 10) switchToHardLevel();

        playSound('correct');
    } else {
        resultElement.textContent = "إجابة خاطئة، حاول مرة أخرى!";
        resultElement.className = "wrong";
        streak = 0;
        handleWrongAnswer();
        playSound('wrong');
    }

    updateScore();
    correctAnswer = generateQuestion();
    answerElement.value = "";
    resetTimer();
    checkSecretLevelAccess();
}

function handleWrongAnswer() {
    level = 'سهل';
    levelElement.textContent = `المستوى: سهل`;
    changeBackgroundMusic('easy');
    changeBackgroundImage('easy');
    showLevelChangeMessage("لقد عدت إلى المستوى السهل بسبب إجابة خاطئة. حاول مرة أخرى! 😢");
    changeButtonStyle();
}

function switchToMediumLevel() {
    level = "متوسط 🥈";
    levelElement.textContent = `المستوى: ${level}`;
    changeBackgroundMusic('medium');
    changeBackgroundImage('medium');
    showLevelChangeMessage("تهانينا! لقد وصلت إلى المستوى المتوسط!");
    changeButtonStyle();
}

function switchToHardLevel() {
    level = "صعب 🥇";
    levelElement.textContent = `المستوى: ${level}`;
    changeBackgroundMusic('hard');
    changeBackgroundImage('hard');
    showLevelChangeMessage("رائع! لقد وصلت إلى المستوى الصعب!");
    changeButtonStyle();
}

function changeBackgroundImage(level) {
    const backgrounds = {
        easy: "url('easy_background.jpg')",
        medium: "url('medium_background.jpg')",
        hard: "url('hard_background.jpg')",
        secret: "url('secret_background.jpg')"
    };

    document.body.style.backgroundImage = backgrounds[level];
    console.log(`تم تغيير الخلفية إلى: ${level}`);
}

function showLevelChangeMessage(message) {
    const messageBox = document.createElement('div');
    messageBox.className = 'level-message';
    messageBox.textContent = message;
    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.remove();
    }, 5000);
}

function changeBackgroundMusic(level) {
    if (currentMusic) {
        currentMusic.pause();
        currentMusic.currentTime = 0;
    }

    currentMusic = new Audio(backgroundMusic[level]);
    currentMusic.loop = true;
    currentMusic.play();
}

function getRandomEncouragement() {
    const messages = [
        "أنت الأفضل!", "أنت رائع!", "أحسنت!", "تابع هكذا!", "السرعة والذكاء في يدك!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

function updateScore() {
    scoreElement.textContent = `النقاط: ${score}`;
    streakElement.textContent = `الإجابات المتتالية: ${streak}`;
    starsElement.textContent = `النجوم: ⭐️ ${stars}`;

    if (score >= 0 && score <= 50) {
        level = "برونزي 🥉";
    } else if (score > 50 && score <= 150) {
        level = "فضي 🥈";
    } else if (score > 150 && score <= 300) {
        level = "ذهبي 🥇";
    } else {
        level = "ماسي 💎";
    }

    levelElement.textContent = `المستوى: ${level}`;
    progressBar.style.width = `${(score % 100)}%`;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `الوقت المتبقي: ${timeLeft} ثواني`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            resultElement.textContent = "انتهى الوقت!";
            resultElement.className = "wrong";
            streak = 0;
            updateScore();
            correctAnswer = generateQuestion();
            answerElement.value = "";
            resetTimer();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timerElement.textContent = `الوقت المتبقي: ${timeLeft} ثواني`;
    startTimer();
}

function playSound(type) {
    const audio = new Audio(type === 'correct' ? 'correct.mp3' : 'wrong.mp3');
    audio.play();
}

function checkSecretLevelAccess() {
    if (streak >= 15 && !secretLevelUnlocked) {
        secretLevelUnlocked = true;
        alert("لقد فتحت المرحلة السرية! 🎉");
        startSecretLevel();
    }
}

function startSecretLevel() {
    document.body.style.backgroundImage = "url('secret_background.jpg')";
    changeBackgroundMusic('secret');
    alert("أنت الآن في المرحلة السرية! حظًا سعيدًا!");
}

function changeButtonStyle() {
    if (level === "سهل") {
        submitBtn.style.backgroundColor = "#4CAF50"; // أخضر
    } else if (level === "متوسط") {
        submitBtn.style.backgroundColor = "#FF9800"; // برتقالي
    } else {
        submitBtn.style.backgroundColor = "#F44336"; // أحمر
    }
}

function updateStreakReward() {
    if (streak % 5 === 0) {
        stars += streak; // مكافأة الإجابات المتتالية
        alert(`لقد حصلت على ${streak} نجوم كمكافأة للإجابات المتتالية! ⭐️`);
    }
}
updateStreakReward();
function adjustDifficulty() {
    if (streak >= 5) {
        timeLeft = 20; // تقليل الوقت المتبقي
        timerElement.textContent = `الوقت المتبقي: ${timeLeft} ثواني`;
    }
}
adjustDifficulty();
function addFriend(friendName) {
    const friendsList = JSON.parse(localStorage.getItem('friends')) || [];
    friendsList.push(friendName);
    localStorage.setItem('friends', JSON.stringify(friendsList));
    alert(`تمت إضافة ${friendName} إلى قائمة الأصدقاء!`);
}
addFriend("صديقك");
function animateResult(isCorrect) {
    if (isCorrect) {
        resultElement.style.animation = "celebrate 1s ease";
    } else {
        resultElement.style.animation = "shake 0.5s ease";
    }
}
animateResult(userAnswer === correctAnswer);
function generateSpecialQuestion() {
    if (Math.random() < 0.1) { // 10% فرصة لظهور سؤال خاص
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 20) + 1;
        questionElement.textContent = `سؤال خاص: ${num1} × ${num2} = ?`;
        return num1 * num2;
    }
    return generateQuestion();
}
correctAnswer = generateSpecialQuestion();
function generateBossQuestion() {
    if (Math.random() < 0.05) { // 5% فرصة لظهور سؤال زعيم
        const num1 = Math.floor(Math.random() * 50) + 1;
        const num2 = Math.floor(Math.random() * 50) + 1;
        questionElement.textContent = `سؤال زعيم: ${num1} × ${num2} = ?`;
        return num1 * num2;
    }
    return generateQuestion();
}
correctAnswer = generateBossQuestion();
function generateCreativeQuestion() {
    const sum = Math.floor(Math.random() * 20) + 1;
    const num1 = Math.floor(Math.random() * sum);
    const num2 = sum - num1;
    questionElement.textContent = `ما هو ناتج ضرب عددين مجموعهما ${sum}؟`;
    return num1 * num2;
}
correctAnswer = generateCreativeQuestion();
function showExplanation() {
    if (Math.random() < 0.2) { // 20% فرصة لشرح السؤال
        alert(`لحل هذا السؤال، اضرب ${num1} في ${num2}.`);
    }
}
function generateVisualQuestion() {
    const apples = Math.floor(Math.random() * 10) + 1;
    questionElement.innerHTML = `<img src="apples.png" alt="تفاح"> كم عدد التفاحات؟`;
    return apples;
}
correctAnswer = generateVisualQuestion();

// تحسين الدوال الرئيسية
function checkAnswer() {
    const userAnswer = parseInt(answerElement.value);
    if (userAnswer === correctAnswer) {
        if (Math.random() > 0.5) {
            resultElement.textContent = getRandomEncouragement();
        } else {
            resultElement.textContent = "إجابة صحيحة! 🎉";
        }
        resultElement.className = "correct";
        score += 10;
        streak += 1;
        stars += 1;

        if (streak === 5) switchToMediumLevel();
        if (streak === 10) switchToHardLevel();

        playSound('correct');
        updateStreakReward(); // تحديث المكافآت المتتالية
        adjustDifficulty(); // تعديل الصعوبة
    } else {
        resultElement.textContent = "إجابة خاطئة، حاول مرة أخرى!";
        resultElement.className = "wrong";
        streak = 0;
        handleWrongAnswer();
        playSound('wrong');
    }

    updateScore();
    correctAnswer = generateQuestion(); // إعادة تعيين السؤال
    answerElement.value = "";
    resetTimer();
    checkSecretLevelAccess();
    animateResult(userAnswer === correctAnswer); // تحريك النتيجة
}

// تحسين الدوال المساعدة
function updateStreakReward() {
    if (streak % 5 === 0) {
        stars += streak;
        showMessage(`لقد حصلت على ${streak} نجوم كمكافأة للإجابات المتتالية! ⭐️`);
    }
}

function adjustDifficulty() {
    if (streak >= 5) {
        timeLeft = 20;
        timerElement.textContent = `الوقت المتبقي: ${timeLeft} ثواني`;
    }
}

function showMessage(message) {
    const messageBox = document.createElement('div');
    messageBox.className = 'level-message';
    messageBox.textContent = message;
    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.remove();
    }, 3000);
}

// تحسين الدوال الأخرى
function generateSpecialQuestion() {
    if (Math.random() < 0.1) {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 20) + 1;
        questionElement.textContent = `سؤال خاص: ${num1} × ${num2} = ?`;
        return num1 * num2;
    }
    return generateQuestion();
}

function generateBossQuestion() {
    if (Math.random() < 0.05) {
        const num1 = Math.floor(Math.random() * 50) + 1;
        const num2 = Math.floor(Math.random() * 50) + 1;
        questionElement.textContent = `سؤال زعيم: ${num1} × ${num2} = ?`;
        return num1 * num2;
    }
    return generateQuestion();
}

function generateCreativeQuestion() {
    const sum = Math.floor(Math.random() * 20) + 1;
    const num1 = Math.floor(Math.random() * sum);
    const num2 = sum - num1;
    questionElement.textContent = `ما هو ناتج ضرب عددين مجموعهما ${sum}؟`;
    return num1 * num2;
}

function generateVisualQuestion() {
    const apples = Math.floor(Math.random() * 10) + 1;
    questionElement.innerHTML = `<img src="apples.png" alt="تفاح"> كم عدد التفاحات؟`;
    return apples;
}
function generateQuestion() {
    const random = Math.random();
    let num1, num2;

    if (random < 0.05) { // 5% لسؤال الزعيم
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        questionElement.textContent = `سؤال زعيم: ${num1} × ${num2} = ?`;
    } else if (random < 0.15) { // 10% لسؤال خاص
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        questionElement.textContent = `سؤال خاص: ${num1} × ${num2} = ?`;
    } else { // 85% لأسئلة عادية
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        questionElement.textContent = `${num1} × ${num2} = ?`;
    }
    
    return num1 * num2;
}
function resetTimer() {
    clearInterval(timer);
    timeLeft = level.includes("صعب") ? 20 : 30;
    timerElement.textContent = `الوقت المتبقي: ${timeLeft} ثواني`;
    startTimer();
}
function animateResult(isCorrect) {
    resultElement.style.animation = 'none';
    void resultElement.offsetHeight; // إعادة تحفيز الرسوم المتحركة
    resultElement.style.animation = isCorrect ? 
        "celebrate 1s ease" : 
        "shake 0.5s ease";
}
document.getElementById("answerInput").addEventListener("input", function(event) {
    this.value = this.value.replace(/[^0-9]/g, ''); // منع الحروف
});
document.querySelector("button").addEventListener("touchstart", function() {
    this.style.transform = "scale(0.95)";
});

document.querySelector("button").addEventListener("touchend", function() {
    this.style.transform = "scale(1)";
});
document.querySelector("button").addEventListener("click", function() {
    document.activeElement.blur();
});

// بدء اللعبة
startTimer();                 
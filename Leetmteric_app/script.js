document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-btn');
    const userNameInput = document.getElementById('user-input');
    const statsContainer = document.querySelector('.stats-container');
    const easyProgressCircle = document.querySelector('.easy-progress');
    const mediumProgressCircle = document.querySelector('.medium-progress');
    const hardProgressCircle = document.querySelector('.hard-progress');
    const easyLabel = document.querySelector('#easy-label');
    const mediumLabel = document.querySelector('#medium-label');
    const hardLabel = document.querySelector('#hard-label');
    const cardStatsContainer = document.querySelector('.stats-card');

    // Log the elements to check if they are correctly selected
    // console.log('easyLabel:', easyLabel);
    // console.log('mediumLabel:', mediumLabel);
    // console.log('hardLabel:', hardLabel);

    function validateUserName(username){
        if(username.trim() === ''){
            alert('Please enter a valid username');
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatch = regex.test(username);
        if(!isMatch){
            alert('Please enter a valid username');
        }
        return isMatch;
    }

    async function fetchUserDetails(username) {
        try {
            searchBtn.textContent = 'Searching...';
            searchBtn.disabled = true;
            statsContainer.style.setProperty('display', 'none');

            const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            // Turn on demo server at this site: https://cors-anywhere.herokuapp.com/corsdemo
            const targetUrl = 'https://leetcode.com/graphql/';
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");

            const graphql = JSON.stringify({
                query: "\n query userSessionProgress ($username: String!) {\n allQuestionsCount {\n difficulty\n count\n}\n matchedUser(username: $username) {\n submitStats {\n acSubmissionNum {\n difficulty\n count\n submissions\n}\n totalSubmissionNum {\n difficulty\n count\n submissions\n}\n}\n}\n}\n",
                variables: { "username": `${username}` }
            });
            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
                redirect: "follow"
            };
            const response = await fetch(proxyUrl + targetUrl, requestOptions);

            if (!response.ok) {
                throw new Error('Unable to fetch User details...!');
            }
            const parsedData = await response.json();
            console.log("Logging parsedData: ", parsedData);

            displayUserData(parsedData);

        } catch (error) {
            console.error("Error fetching user details: ", error);
            statsContainer.innerHTML = `<p>No parsedData Found</p>`;
        } finally {
            searchBtn.textContent = 'Search';
            searchBtn.disabled = false;
            statsContainer.style.setProperty('display', 'inline');
        }
    }

    function updateProgress(solved, total, label, circle){
        const progressDegree = (solved/total) * 100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(parsedData){
        const totalQuestions = parsedData.data.allQuestionsCount[0].count;
        const totalEasyQuestions = parsedData.data.allQuestionsCount[1].count;
        const totalMediumQuestions = parsedData.data.allQuestionsCount[2].count;
        const totalHardQuestions = parsedData.data.allQuestionsCount[3].count;

        const solvedTtlQuestions = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;
        const solvedTtlEasyQuestions = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const solvedTtlMediumQuestions = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const solvedTtlHardQuestions = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;

        updateProgress(solvedTtlEasyQuestions, totalEasyQuestions, easyLabel, easyProgressCircle);
        updateProgress(solvedTtlMediumQuestions, totalMediumQuestions, mediumLabel, mediumProgressCircle);
        updateProgress(solvedTtlHardQuestions, totalHardQuestions, hardLabel, hardProgressCircle);

        const cardData = [
            {label: "Overall Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions},
            {label: "Easy Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[1].submissions},
            {label: "Medium Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[2].submissions},
            {label: "Hard Submissions", value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[3].submissions},
        ]

        console.log(cardData);

        cardStatsContainer.innerHTML = cardData.map(data => {
            return `
            <div class="card">
                <h4>${data.label}</h4>
                <p>${data.value}</p>
            </div>
            `
        }).join('');
        
    }

    searchBtn.addEventListener('click', function () {
        const username = userNameInput.value;
        // console.log(username);
        if (validateUserName(username)) {
            fetchUserDetails(username)
        }
    })

});
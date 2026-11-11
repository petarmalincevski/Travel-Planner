var surveyForm = document.getElementById("survey-form");

if (surveyForm) {

    surveyForm.addEventListener("submit", function(event) {

        event.preventDefault();

        var favoriteCity = document.getElementById("favorite-city").value;
        var vacation = document.querySelector('input[name="vacation"]:checked').value;
        var company = document.querySelector('input[name="company"]:checked').value;
        var duration = document.getElementById("duration").value;
        var budget = document.getElementById("budget").value;
        var comments = document.getElementById("comments").value;

        var activities = [];

        var selectedActivities = document.querySelectorAll('input[name="activities"]:checked');

        selectedActivities.forEach(function(activity) {
            activities.push(activity.value);
        });

        var surveyResponse = {
            favoriteCity: favoriteCity,
            vacation: vacation,
            company: company,
            activities: activities,
            duration: duration,
            budget: budget,
            comments: comments
        };

        var responses = JSON.parse(localStorage.getItem("surveyResponses")) || [];

        responses.push(surveyResponse);

        localStorage.setItem("surveyResponses", JSON.stringify(responses));

        var message = document.getElementById("survey-message");

        message.textContent = "Thank you! Your answers have been submitted successfully.";
        message.style.color = "lightgreen";

        surveyForm.reset();

    });

}
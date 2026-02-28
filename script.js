// Replace 'username' and 'repository' with your GitHub username and repository name
const username = "Sinclair-Speccy";
const repository = "sinclair-speccy.github.io";

// GitHub API endpoint for getting the latest commit
const apiUrl = `https://api.github.com/repos/${username}/${repository}/commits?per_page=1`;

// Function to format date nicely
const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Ensure the DOM is loaded before running the fetch
window.addEventListener('DOMContentLoaded', () => {
  // Fetch the latest commit from GitHub API
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.length === 0) {
        throw new Error("No commits found in the repository");
      }
      const lastCommitDate = data[0].commit.author.date;
      document.getElementById("lastUpdated").textContent = formatDate(lastCommitDate);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      document.getElementById("lastUpdated").textContent = "Error fetching data";
    });
});